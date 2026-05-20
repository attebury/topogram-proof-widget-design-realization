# Topogram Widget Design Realization Proof

> This proof shows how one semantic widget maps to web, iOS, and Android component refs through a design contract and widget-first realization set.

Status: current
Audience: designers, front-end leads, and coding agents evaluating Topogram UI mapping
Use when: you want a small proof of `design_contract`, `design_realization_set`, `ui-design-coverage`, and widget slices.

This repo is intentionally focused. It does not generate an app or prove pixel
parity. It proves that Topogram can keep semantic UI, design-system scope, and
platform component mappings separate while still giving agents reviewable proof
commands.

Run:

```bash
npm install
npm run verify
```

`npm run verify` checks path hygiene, Topogram validation, design coverage,
UI realization reporting, widget slice context, proof metadata, and clean
worktree state.

## What To Inspect

- `topo/widgets/widget-data-grid.tg`: semantic widget.
- `topo/design-contracts/design-company-web.tg`: design-system/platform header.
- `topo/design-contracts/realization-set-company-web-widgets.tg`: widget-first
  platform component mappings.
- `proof/STEP.md`: current proof checkpoint.
- `proof/artifacts/`: generated report and slice artifacts.

The important statuses are `rendered`, `contract_only`,
`implementation_owned`, and `unsupported`. They are review states for
developers and agents; they are not hidden behind generic fallback UI.
