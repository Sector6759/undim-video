export default {
  ignoreFiles: [
    "bin",
    "src",
    "bun.lock",
    "LICENSE",
    "package.json",
    "README.md",
    "store-assets",
    "tsconfig.app.json",
    "tsconfig.bun.json",
    "tsconfig.json",
    "web-ext-config.mjs",
  ],
  build: {
    overwriteDest: true,
  },
};
