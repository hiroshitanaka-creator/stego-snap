# Limitations

This project prioritizes demonstrable privacy behavior in browser-only workflows, not strong cryptographic secrecy in all environments.

## Known Break Modes

1. **LSB fragility (`index.html`)**
   - Recompression (SNS upload), resizing, and many filters can destroy LSB payloads.
2. **Vision-first tools (`noise.html`, `prism.html`)**
   - Encoding is present, but in-page decode roundtrip is not fully integrated.
3. **Prototype risk (`animated-prism.html`)**
   - The current file is a prototype and may not be production-runnable end to end.
4. **Browser variability**
   - Canvas/image APIs can behave differently across browsers/devices.

## Non-goals

- Resistance against nation-state adversaries
- Guaranteed secrecy after arbitrary image transformation pipelines
- Custom cryptography as a substitute for vetted standards

## Operational Guidance

- Prefer PNG for workflows that depend on exact pixel values.
- Keep plaintext assumptions conservative; do not treat this as a replacement for audited secure messaging.
