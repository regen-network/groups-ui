# Cosmos Groups UI

UI for Cosmos groups module

# Local Setup

1. `yarn install`
2. copy over the config `cp .env.local.example .env.local`
3. `yarn dev` to run the repo

## Install Cosmos-SDK

`git clone https://github.com/cosmos/cosmos-sdk` and within that directory:

1. `git checkout v0.46.1` (or current tagged 0.46 release branch)
2. `make build`

### For Darwin / MacOS:

3. `sudo mv build/simd $GOPATH/bin`
4. `sudo ln -s $GOPATH/bin/simd /usr/local/bin/simd`

### For Linux (untested)

3. `sudo mv build/simd $HOME/go/bin`

## Makefile commands

1. `make local-clean` - wipe prior local data
2. `make local-init` - set up local user wallets / accounts, seed funds
3. `make local-start` - run local node
4. `make bank-send` - send funds to the wallet address listed below

## Keplr

You'll need to import generated wallet info into Keplr in order to test features:

(from `USER2` in the makefile)

```
high return silly coyote skin trumpet stock bicycle enjoy common exact sure
```

## IDE

If you're using VSCode, it's recommended you install the eslint + prettier extensions and copy over the suggested workspace settings:

```sh
cp .vscode/settings.suggested.json .vscode/settings.json
```

# Architecture

This project is organized by [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principals for UI components:

```
📦src
 ┣ 📂components
 ┃ ┣ 📂atoms - elements which can't be reduced to something simpler
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂molecules - collection of atoms
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂organisms - more complex elements made up of atoms, molecules, and (sometimes) other organisms
 ┃ ┗ 📂templates - viewport positioning and layout
 ┗ 📂pages - implementations of templates
```

Some relevant notes / Highlights:

- Outer padding and margin should be set by parents components - ie, an `Atom` should not have `margin` set on the outer element - instead, it would be set by its parent component
- `Atoms` and `Molecules` have `index.ts` barrel files for convenience (ie `import { Box, Button } from '@/atoms'`), but `Organisms`, `Templates`, and `Pages` do not. This is to avoid circular imports which can impact code splitting

## Types

Ledger calls & typescript types are generated using [telescope](https://github.com/osmosis-labs/telescope), and reside in [another package](https://github.com/haveanicedavid/cosmos-groups-ts)

- Because queries are currently handled through REST / LCD clients, property values are `camel_case` - this means the types used in this project won't work on RPC clients (relevant cosmos-sdk [issue](https://github.com/cosmos/cosmos-sdk/issues/8055))
- Some types are manually combined / modified to ease the use in UI. These are prefixed with `UI` (e.g. the `UIGroup` type represnts a sdk `ChainInfo` with typed `metadata` which the UI creates)

## Library Resources

- [Chakra](https://chakra-ui.com/) - UI Components
- [Valtio](https://valtio.pmnd.rs/) - global state
- [React Query](https://tanstack.com/query/v4) - API calls / Query caching
- [Zod](https://github.com/colinhacks/zod) - form validation

## Linting

`yarn lint` - format with Prettier, fix linting errors

## Storybook

Storybook is installed for this project (not all components are inside it yet), but there's currently a [bug with vite](https://github.com/chakra-ui/chakra-ui/issues/6338) Also:
https://stackoverflow.com/questions/73606433/storybook-vite-failed-to-build-with-chakraui-react-18

```
rm -rf node_modules/.cache/storybook/
```
