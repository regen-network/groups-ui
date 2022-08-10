# Cosmos Groups UI

UI for Cosmos groups module

# Architecture

# Design methodology

This project uses Atomic Design methodology. A few notes:

- MUI comopnents should only be imported within `Atoms` and `Molecules`
- Atoms and molecules should only have local state / not directly modify global state
- positioning should set by parent components - no margin or padding on atoms
