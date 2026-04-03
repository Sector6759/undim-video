# Undim Video

Many video players dim the video when moving the mouse across the player or when pausing the video. This browser extension removes that dimming effect.

## Supported web sites/players

Currently, the following websites are supported.

- [Joyn](https://www.joyn.de/)
- [RTL+](https://beta.plus.rtl.de/)
  - Only the beta website is supported, as the player of the non-beta website does not have any dimming effect

If you want this extension to support more sites, [email me](mailto:twosixninesoft@idtu.page) or [create an issue on GitHub](https://github.com/Sector6759/undim-video/issues/new).

## How to build

### Prerequisites

- A Linux system with support for the following commands:
  - `rsync` with the `-a` and `--exclude` flag
  - `rm` with the `-r` and `-f` flag
- The latest version of [bun](https://bun.com/)

### Dependencies

To install the required dependencies, run

```sh
bun install
```

### Building

To build the extension, run

```sh
bun run build
```
