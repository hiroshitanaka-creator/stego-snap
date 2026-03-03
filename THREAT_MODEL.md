# Threat Model (v1.0)

## Goal
Provide client-side steganography tools that make casual visual reading harder for humans and AI vision-only workflows.

## Assets to Protect

- Secret text embedded into generated images
- User privacy around message intent/content

## Assumed Adversaries

- Casual observer who sees generated images
- AI vision model that attempts interpretation without deterministic decode execution

## Out-of-Scope Adversaries

- Attackers with full computational extraction pipelines and format-specific tooling
- Infrastructure-level or endpoint-compromise attackers

## Assumptions

- User runs tool locally in browser
- No server upload by this project itself
- Generated artifacts may still be transformed by third-party platforms

## Security Properties (Target)

- **Obfuscation/embedding** for practical privacy in social contexts
- **No tracking / no backend dependency** at project level

## Explicit Non-Properties

- Strong confidentiality under all post-processing
- Tamper-proof authenticity across all formats (unless separately signed/encrypted in external workflow)
