# Cosmos Groups UI

UI for Cosmos groups module

# Local Setup

1. `yarn install`
2. `yarn dev` to run the repo

## Install Cosmos-SDK

`git clone https://github.com/cosmos/cosmos-sdk` and within that directory:

1. `git checkout release/v0.46.x` (or current 0.46 release branch)
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

TODO

## Library Resources

- [MUI](https://mui.com/) - UI Components
- [Valtio](https://valtio.pmnd.rs/) - global state
- [Zod](https://github.com/colinhacks/zod) - form validation

## Linting

`yarn lint` - format with Prettier, fix linting errors
