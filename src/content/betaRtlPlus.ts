(() => {
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
   * Tries to apply the style changes needed to remove the dimming effect
   *
   * @returns `true` if the style changes were applied, `false` if the element
   * to which the changes should be applied to could not be located
   */
  function applyStyleChanges() {
    log("Locating dimmer");
    const div = document.querySelector("#player-block > div:nth-child(2)");
    if (!(div instanceof HTMLElement)) {
      log("Failed to locate dimmer");
      return false;
    }
    log("Located dimmer");
    div.style.opacity = "0";
    log("Applied style changes");
    return true;
  }

  function initialize() {
    log("Initializing");
    const url = new URL(`${location}`);
    if (
      url.hostname !== "beta.plus.rtl.de" ||
      !url.pathname.includes("/video/")
    ) {
      log("Not on /video/ path, aborting initialize");
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
      if (!applyStyleChanges()) {
        return;
      }
      stopInverval(interval);
    }, 1000);
    log("Set inverval", interval);
    log("Initialized");
  }

  navigation.addEventListener("currententrychange", ({ navigationType }) => {
    if (navigationType) {
      initialize();
    }
  });

  initialize();
})();
