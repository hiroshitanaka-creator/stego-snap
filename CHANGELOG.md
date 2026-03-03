# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-03

### Added
- Release governance docs for v1.0:
  - `SECURITY.md` for vulnerability reporting policy and disclosure workflow.
  - `LIMITATIONS.md` to explicitly document known break modes and non-goals.
  - `THREAT_MODEL.md` to define assumptions, assets, and attacker model.
- Community templates:
  - GitHub Issue templates for bug report and feature request.
  - Pull request template to require reproducibility and README/implementation consistency checks.
- README tool status matrix (`Stable` / `Experimental`) with explicit criteria.

### Changed
- Release documentation now treats implementation as source of truth:
  - README claims were aligned to currently implemented behavior.
  - Tool maturity is now explicitly versioned rather than implied.
- Release process materialized for v1.0 with release notes under `docs/releases/v1.0.0.md`.

### Fixed
- Documentation gap where project-level security reporting and disclosure policy was previously undefined.

## [0.x] - 2024-2025

### Added
- Core browser tools:
  - `index.html` (Stego Snap: LSB encode/decode)
  - `noise.html` (Noise Talk: binary grid encoder)
  - `prism.html` (Prism Code: UTF-16 hex color encoder)
  - `multi-layer-stego.html` (multi-layer stego with optional AES-GCM)
  - `animated-prism.html` (animated Prism prototype)
  - `disaster-mesh-complete.html` (crypto messaging experiment)
- Initial README, license, and roadmap milestone document.

[1.0.0]: https://github.com/hiroshitanaka-creator/stego-snap/releases/tag/v1.0.0
