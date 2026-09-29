(() => {
  let running = false;
  const AD_PLAYER_OBSERVED_ATTRIBUTE = "overlay-visible";
  const observer = new MutationObserver((records) => {
    const lastRecord = records.at(-1);
    if (!(lastRecord?.target instanceof HTMLElement)) {
      return;
    }
    if (
      lastRecord.oldValue === null &&
      lastRecord.target.hasAttribute(AD_PLAYER_OBSERVED_ATTRIBUTE)
    ) {
      lastRecord.target.removeAttribute(AD_PLAYER_OBSERVED_ATTRIBUTE);
      log("Removed attribute", AD_PLAYER_OBSERVED_ATTRIBUTE);
    }
  });

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
   * Tries to get the ad player element
   *
   * @param playerUi The ancestor element of the ad player element
   * @returns The ad player element, or `undefined` if not found
   */
  function getAdPlayer(playerUi: HTMLElement): HTMLElement | undefined {
    log("Locating ad player");
    const adPlayer = playerUi.querySelector(".ad-player");
    if (!(adPlayer instanceof HTMLElement)) {
      log("Failed to locate ad player");
      return;
    }
    log("Located ad player");
    return adPlayer;
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

  /**
   * Connects {@link observer} to the ad player element to watch for changes to
   * its `overlay-visible` attribute to prevent ads being shown
   *
   * @param adPlayer The ad player element to connect the observer to
   */
  function connectObserver(adPlayer: HTMLElement): void {
    observer.observe(adPlayer, {
      attributeFilter: [AD_PLAYER_OBSERVED_ATTRIBUTE],
      attributeOldValue: true,
    });
    log("Connected observer", adPlayer);
  }

  function initialize() {
    log("Initializing");
    if (!/^https:\/\/www\.joyn\.(?:at|de)\/play\//.test(String(location))) {
      log("Not on /play/ path, aborting initialize");
      running = false;
      observer.disconnect();
      log("Disconnected observer");
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
      const adPlayer = getAdPlayer(playerUi);
      if (!adPlayer) {
        return;
      }
      appendStyle(contentComposition);
      connectObserver(adPlayer);
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
