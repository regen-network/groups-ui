CHAIN_HOME=$(HOME)/.regenlocal
CHAIN_ID=regenlocal
COIN_DENOM=uregen
GENESIS_ACCT_ADDR=regen1kdzkazludrnmnzchcxgs6znsjph5ugx4u45w4n
GENESIS_ACCT_NAME=alice
MONIKER=regenlocal1
USER_ADDR=regen106ljn6kds9vegaux0w4jnend97fdm50yx6le6y
USER_NAME=user1

NOW=$(shell date +%s%3)
UNAME=$(shell uname)

ifeq ($(UNAME), Linux)
	sed=sed -i
endif
ifeq ($(UNAME), Darwin) # MacOS
	sed=sed -i ""
endif

ifeq ($(UNAME), Linux)
	base64=base64 -w 0
endif
ifeq ($(UNAME), Darwin) # MacOS
	base64=base64
endif


.PHONY: local-clean
local-clean:
	rm -rf $(CHAIN_HOME) && rm -rf $(HOME)/.regenlocal

.PHONY: local-keys
local-keys:
	regenlocal keys show $(GENESIS_ACCT_NAME) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "earn noble employ useful space craft staff blast exact pluck siren physical biology short suit oval open legend humble pill series devote wealth hungry") | regenlocal keys add $(GENESIS_ACCT_NAME) --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	regenlocal keys show $(USER_NAME) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "high return silly coyote skin trumpet stock bicycle enjoy common exact sure") | regenlocal keys add $(USER_NAME) --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: local-init
local-init: local-clean local-keys
	regenlocal init $(MONIKER) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
	$(sed) "s/stake/$(COIN_DENOM)/" $(CHAIN_HOME)/config/genesis.json
	regenlocal add-genesis-account $(GENESIS_ACCT_NAME) 10000000000000000000000001$(COIN_DENOM) --home $(CHAIN_HOME) --keyring-backend test
	regenlocal gentx $(GENESIS_ACCT_NAME) 1000000000$(COIN_DENOM) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	regenlocal collect-gentxs --home $(CHAIN_HOME)
	$(sed) "s/prometheus = false/prometheus = true/" $(CHAIN_HOME)/config/config.toml
	$(sed) "s/cors_allowed_origins = \[\]/cors_allowed_origins = [\"*\"]/" $(CHAIN_HOME)/config/config.toml
	$(sed) "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" $(CHAIN_HOME)/config/config.toml
	cat $(CHAIN_HOME)/config/app.toml | tr '\n' '\r' | sed "s/# Enable defines if the API server should be enabled.\renable = false/# Enable defines if the API server should be enabled.\renable = true/" | tr '\r' '\n' > /tmp/app.toml.tmp && mv /tmp/app.toml.tmp $(CHAIN_HOME)/config/app.toml
	$(sed) "s/swagger = false/swagger = true/" $(CHAIN_HOME)/config/app.toml
	$(sed) "s/enabled-unsafe-cors = false/enabled-unsafe-cors = true/" $(CHAIN_HOME)/config/app.toml
	$(sed) "s/enable-unsafe-cors = false/enable-unsafe-cors = true/" $(CHAIN_HOME)/config/app.toml
	$(sed) "s/minimum-gas-prices = \"\"/minimum-gas-prices = \"0.0$(COIN_DENOM)\"/" $(CHAIN_HOME)/config/app.toml

.PHONY: local-start
local-start:
	regenlocal start --home $(CHAIN_HOME) --log_level debug

# .PHONY: query-balance
# query-balance:
# 	regenlocal q bank balances $(GENESIS_ACCT_ADDR) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
# 	regenlocal q bank balances $(USER_ADDR) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)

.PHONY: keys-list
keys-list:
	regenlocal keys list --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: bank-send
bank-send:
	regenlocal tx bank send $(GENESIS_ACCT_ADDR) $(USER_ADDR) 1000000000000000$(COIN_DENOM) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
