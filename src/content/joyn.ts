(() => {
  let running = false;

  const style = document.createElement("style");
  style.textContent = `
    .overlay-controls { background: none !important; }
    .joyn-title { background: none !important; }
    .joyn-title::before { background: none !important; }
  `;

  /**
   * Calls `console.debug` with the first argument set to `"undim-video"`
   *
   * @param data Arguments to pass through
   */
  function log(...data: any[]) {
    data; /* && console.debug("undim-video", ...data) */
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
   * Tries to get the player UI element
   *
   * @returns The player UI element, or `undefined` if not found
   */
  function getPlayerUi(): HTMLElement | undefined {
    log("Locating player UI");
    const playerUi = document
      .querySelector("glomex-integration, joyn-integration")
      ?.shadowRoot?.querySelector(
        "turbo-glomex-player-ui, turbo-joyn-player-ui",
      );
    if (!(playerUi instanceof HTMLElement)) {
      log("Failed to locate player UI");
      return;
    }
    log("Located player UI");
    return playerUi;
  }

  /**
   * Tries to get the content composition element
   *
   * @param playerUi The ancestor element of the content composition element
   * @returns The content composition element, or `undefined` if not found
   */
  function getContentComposition(
    playerUi: HTMLElement,
  ): HTMLElement | undefined {
    log("Locating content composition");
    const contentComposition = playerUi.shadowRoot?.querySelector(
      ".content-composition",
    );
    if (!(contentComposition instanceof HTMLElement)) {
      log("Failed to locate content composition");
      return;
    }
    log("Located content composition");
    return contentComposition;
  }

  /**
   * Appends {@link style} to the content composition element
   *
   * @param contentComposition The content composition element to append the
   * style to
   */
  function appendStyle(contentComposition: HTMLElement): void {
    contentComposition.appendChild(style);
    log("Appended style", contentComposition);
  }

  function initialize() {
    log("Initializing");
    if (!/^https:\/\/www\.joyn\.(?:at|de)\/play\//.test(String(location))) {
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
      const playerUi = getPlayerUi();
      if (!playerUi) {
        return;
      }
      const contentComposition = getContentComposition(playerUi);
      if (!contentComposition) {
        return;
      }
      appendStyle(contentComposition);
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
