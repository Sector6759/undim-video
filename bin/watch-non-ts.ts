import { watch } from "node:fs";

const src = import.meta.dir + "/../src/";
const dist = import.meta.dir + "/../dist/";

const watcher = watch(src, { recursive: true }, async (_, filename) => {
  if (!filename || filename.endsWith(".ts")) {
    return;
  }
  try {
    const output = Bun.file(dist + filename);
    const input = Bun.file(src + filename);
    if (await input.exists()) {
      await Bun.write(output, input);
      console.log("Copied", filename);
    }
  } catch (error) {
    console.error(error);
  }
});

process.on("SIGINT", () => {
  watcher.close();
  process.exit(0);
});
