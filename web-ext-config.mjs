export default {
  ignoreFiles: [
    "src",
    "bun.lock",
    "LICENSE",
    "package.json",
    "README.md",
    "store-assets",
    "tsconfig.json",
    "web-ext-config.mjs",
  ],
  build: {
    overwriteDest: true,
  },
};
