# Regen Groups UI

[Regen network](https://regen.network/) UI for Cosmos groups module

## Table of Contents

- [Regen Groups UI](#regen-groups-ui)
  - [Table of Contents](#table-of-contents)
- [Local Setup](#local-setup)
  - [Install Regen Ledger](#install-regen-ledger)
    - [For Darwin / MacOS:](#for-darwin--macos)
    - [For Linux (untested)](#for-linux-untested)
  - [Makefile commands](#makefile-commands)
  - [Keplr](#keplr)
  - [IDE](#ide)
- [Architecture](#architecture)
  - [Code Structure](#code-structure)
  - [Types](#types)
  - [Library Resources](#library-resources)
  - [Linting](#linting)

# Local Setup

1. `yarn install`
2. copy over the config `cp .env.local.example .env.local`
3. `yarn dev` to run the repo
4. (optional) `yarn storybook` to

## Install Regen Ledger

`git clone https://github.com/regen-network/regen-ledger/` and **within that directory**:

1. `make build` - build ledger locally
2. `mv build/regen build/regenlocal` - rename to `regenlocal` to avoid conflicts with the `regen` binary

### For Darwin / MacOS:

3. `sudo mv build/regenlocal $GOPATH/bin`
4. `sudo ln -s $GOPATH/bin/regenlocal /usr/local/bin/regenlocal`

### For Linux (untested)

3. `sudo mv build/regenlocal $HOME/go/bin`

## Makefile commands

1. `make local-clean` - wipe prior local data
2. `make local-init` - set up local ledger, user wallets / accounts, seed funds
3. `make local-start` - run local node
4. `make bank-send` - send funds to the wallet address listed below

## Keplr

You'll need to import generated wallet info into Keplr in order to test features:

(from `USER` in the makefile)

```
high return silly coyote skin trumpet stock bicycle enjoy common exact sure
```

## IDE

If you're using VSCode, it's recommended you install the eslint + prettier extensions and copy over the suggested workspace settings:

```sh
cp .vscode/settings.suggested.json .vscode/settings.json
```

# Architecture

## Code Structure

This project is organized by [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principals for UI components:

```
📦src
 ┣ 📂components
 ┃ ┣ 📂atoms - elements which can't be reduced to something simpler
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂molecules - collection of atoms
 ┃ ┣ 📂organisms - more complex elements made up of atoms, molecules, and (sometimes) other organisms
 ┃ ┗ 📂templates - viewport positioning and layout
 ┗ 📂pages - implementations of templates
```

Some relevant notes / Highlights:

- Outer padding and margin should be set by parents components - ie, an `Atom` should not have `margin` set on the outer element - instead, it would be set by its parent component
- `Atoms` have `index.ts` barrel files for convenience (ie `import { Box, Button } from '@/atoms'`), but`Molecules`, `Organisms`, `Templates`, and `Pages` do not. This is to avoid circular imports which can impact code splitting

## Types

Ledger calls & typescript types are generated using [telescope](https://github.com/osmosis-labs/telescope), and reside in [another package](https://github.com/haveanicedavid/cosmos-groups-ts)

- Because queries are currently handled through REST / LCD clients, property values are `camel_case` - this means the types used in this project won't work on RPC clients (relevant cosmos-sdk [issue](https://github.com/cosmos/cosmos-sdk/issues/8055))
- Some types are manually combined / modified to ease the use in UI. These are prefixed with `UI` (e.g. the `UIGroup` type represnts a sdk `ChainInfo` with typed `metadata` which the UI creates)

## Library Resources

- [Chakra](https://chakra-ui.com/) - UI Components
- [Valtio](https://valtio.pmnd.rs/) and [Jotai](https://jotai.org/) - global state
- [React Query](https://tanstack.com/query/v4) - API calls / Query caching
- [Zod](https://github.com/colinhacks/zod) - form validation

## Linting

`yarn lint` - format with Prettier, fix linting errors
