(() => {
  let running = false;

  const style = document.createElement("style");
  style.textContent = `
    .overlay-controls { background: none !important; }
    .joyn-title { background: none !important; }
    .joyn-title::before { background-image: none !important; }
  `;

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
   * Tries to append {@link style} to the content streamer composition element,
   * which is the common ancestor of the regular player and the ad player
   *
   * @returns `false` if the content streamer composition element could not be
   * located, `true` otherwise
   */
  function appendStyle(): boolean {
    log("Locating content streamer composition");
    const streamerComposition = document
      .querySelector("glomex-integration")
      ?.shadowRoot?.querySelector("turbo-player-ui")
      ?.shadowRoot?.querySelector(".content-streamer-composition");
    if (!(streamerComposition instanceof HTMLElement)) {
      log("Failed to locate content streamer composition");
      return false;
    }
    log("Located content streamer composition");
    streamerComposition.appendChild(style);
    log("Appended style");
    return true;
  }

  function initialize() {
    log("Initializing");
    if (!`${location}`.startsWith("https://www.joyn.de/play/")) {
      log("Not on /play/ path, aborting initialize");
      running = false;
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
      if (!appendStyle()) {
        return;
      }
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
