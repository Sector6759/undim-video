(() => {
  let observer: MutationObserver | undefined = undefined;
  let running = false;

  /**
   * Calls `console.debug` with the first argument set to `"undim-video"`
   *
   * @param data Arguments to pass through
   */
  function log(...data: any[]) {
    data /* && console.debug("undim-video", ...data) */;
  }

  /**
   * Calls `clearInterval` and logs an appropriate message to the console
   *
   * @param id The interval ID
   */
  function stopInverval(id: number) {
    clearInterval(id);
    log("Cleared interval", id);
  }

  /**
   * Tries to find the content streamer composition element, which is the common
   * ancestor of the regular player and the ad player
   *
   * @returns The `HTMLElement` if found, `undefined` otherwise
   */
  function getStreamerComposition() {
    log("Locating content streamer composition");
    const streamerComposition = document
      .querySelector("glomex-integration")
      ?.shadowRoot?.querySelector("turbo-player-ui")
      ?.shadowRoot?.querySelector(".content-streamer-composition");
    if (!(streamerComposition instanceof HTMLElement)) {
      log("Failed to locate content streamer composition");
      return;
    }
    log("Located content streamer composition");
    return streamerComposition;
  }

  /**
   * Tries to apply the style changes needed to remove the dimming effect
   *
   * @param streamerComposition The value returned by `getStreamerComposition`
   *
   * @returns `true` if the style changes were applied, `false` if the element
   * to which the changes should be applied to could not be located
   */
  function applyStyleChanges(streamerComposition: HTMLElement): boolean {
    log("Locating dimmer");
    const overlayControls =
      streamerComposition.querySelector(".overlay-controls");
    if (!(overlayControls instanceof HTMLElement)) {
      log("Failed to locate dimmer");
      return false;
    }
    log("Located dimmer");
    overlayControls.style.background = "none";
    log("Applied style changes");
    return true;
  }

  /**
   * Observes `streamerComposition` to react to possible ad interruptions
   *
   * @param streamerComposition The value returned by `getStreamerComposition()`
   *
   * @returns The `MutationObserver`, so it can be disconnected later
   */
  function observeStreamerComposition(streamerComposition: HTMLElement) {
    const observer = new MutationObserver((records) => {
      outer: for (const { target, addedNodes } of records) {
        if (target !== streamerComposition) {
          continue;
        }
        for (const addedNode of addedNodes) {
          if (
            !(addedNode instanceof HTMLElement) ||
            !addedNode.classList.contains("content-composition-container")
          ) {
            continue;
          }
          log("Observed addition of content composition container");
          if (applyStyleChanges(streamerComposition)) {
            break outer;
          }
        }
      }
    });
    log("Connecting MutationObserver");
    observer.observe(streamerComposition, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: false,
    });
    return observer;
  }

  function initialize() {
    log("Initializing");
    if (!`${location}`.startsWith("https://www.joyn.de/play/")) {
      log("Not on /play/ path, aborting initialize");
      running = false;
      if (observer) {
        log("Disconnecting MutationObserver");
        observer.disconnect();
        observer = undefined;
      }
      return;
    }
    if (running) {
      log("Already running, aborting initialize");
      return;
    }
    running = true;
    let attempts = 0;
    const interval = setInterval(() => {
      if (attempts++ === 10) {
        log("Maximum attempts reached, aborting");
        stopInverval(interval);
        return;
      }
      log("Attempt", attempts);
      const streamerComposition = getStreamerComposition();
      if (!streamerComposition) {
        return;
      }
      applyStyleChanges(streamerComposition);
      observer = observeStreamerComposition(streamerComposition);
      stopInverval(interval);
    }, 1000);
    log("Set inverval", interval);
    log("Initialized");
  }

  navigation.addEventListener("currententrychange", ({ navigationType }) => {
    // Joyn does a replace immediately after a traverse, so we ignore traverse
    if (navigationType && navigationType !== "traverse") {
      initialize();
    }
  });

  initialize();
})();
