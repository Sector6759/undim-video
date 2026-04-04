# Undim Video

Many video players dim the video when moving the mouse across the player or when pausing the video. This browser extension removes that dimming effect.

## Supported web sites/players

Currently, the following websites are supported.

- ARD public service broadcasters
  - [ARD Mediathek](https://www.ardmediathek.de/)
  - [tagesschau](https://www.tagesschau.de/)
  - [Sportschau](https://www.sportschau.de/)
  - [KiKA](https://www.kika.de/)
  - [BR](https://www.br.de/)
  - [hr](https://www.hr.de/)
  - [hr1](https://www.hr1.de/)
  - [hr2-kultur](https://www.hr2.de/)
  - [hr3](https://www.hr3.de/)
  - [hr4](https://www.hr4.de/)
  - [hr Bigband](https://www.hr-bigband.de/)
  - [hr INFO](https://www.hr-inforadio.de/)
  - [hr fernsehen](https://www.hr-fernsehen.de/)
  - [hr Sinfonieorchester](https://www.hr-sinfonieorchester.de/)
  - [hr hessenschau](https://www.hessenschau.de/)
  - [hr YOU FM](https://www.you-fm.de/)
  - [MDR](https://www.mdr.de/)
  - [MDR JUMP](https://www.mdrjump.de/)
  - [Radio Bremen](https://www.radiobremen.de/)
  - [Radio Bremen Eins](https://www.bremeneins.de/)
  - [Radio Bremen Zwei](https://www.bremenzwei.de/)
  - [Radio Bremen Vier](https://www.bremenvier.de/)
  - [Radio Bremen NEXT](https://www.bremennext.de/)
  - [Radio Bremen buten un binnen](https://www.butenunbinnen.de/)
  - [NDR](https://www.ndr.de/)
  - [rbb](https://www.rbb-online.de/)
  - [rbb 88.8](https://www.rbb888.de/)
  - [rbb Antenne Brandenburg](https://www.antennebrandenburg.de/)
  - [rbb Fritz](https://www.fritz.de/)
  - [rbb radioeins](https://www.radioeins.de/)
  - [rbb radio3](https://www.radiodrei.de/)
  - [rbb24](https://www.rbb24.de/)
  - [rbb24 Inforadio](https://www.inforadio.de/)
  - [SR](https://www.sr.de/)
  - [SR UNSERDING](https://www.unserding.de/)
  - [SWR](https://www.swr.de/)
  - [SWR3](https://www.swr3.de/)
  - [WDR](https://www1.wdr.de/)
  - [WDR Die Maus](https://www.wdrmaus.de)
- [ARTE](https://www.arte.tv/)
- [Joyn Austria](https://www.joyn.at/)
- [Joyn Germany](https://www.joyn.de/)
- [RTL+](https://beta.plus.rtl.de/)
  - Only the beta website is supported, as the player of the non-beta website does not have any dimming effect

If you want this extension to support more sites, [email me](mailto:twosixninesoft@idtu.page) or [create an issue on GitHub](https://github.com/Sector6759/undim-video/issues/new).

## How to build

### Prerequisites

- A Linux system with support for the following commands:
  - `rsync` with the `-a` and `--exclude` flag
  - `rm` with the `-r` and `-f` flag
- The latest version of [bun](https://bun.com/)
  - Install with `curl -fsSL https://bun.sh/install | bash`

### Source code

To clone the repo, run

```sh
git clone https://github.com/Sector6759/undim-video.git
```

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
