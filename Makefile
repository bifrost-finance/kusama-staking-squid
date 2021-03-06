.PHONY: all
all:help

.PHONY: process # run squid processor
process: migrate
	@node -r dotenv/config lib/processor.js

.PHONY: serve # run graphql server
serve:
	@npx squid-graphql-server

.PHONY: migrate # run migrate
migrate:
	@npx sqd db migrate

.PHONY: createdb # create db
createdb:
	@npx sqd db create

.PHONY: build # build typescript files
build:
	@npm run build

.PHONY: codegen # generate TypeORM classes from schema.graphql
codegen:
	@npx sqd codegen

.PHONY: typegen # generate type-safe wrappers for events, calls and storage items
typegen: explore
	@npx squid-substrate-typegen ./typegen/typegen.json

.PHONY: explore # generate versions.json
explore:
	@npx squid-substrate-metadata-explorer --chain wss://kusama-rpc.polkadot.io --archive https://kusama.archive.subsquid.io/graphql --out ./typegen/versions.json

.PHONY: up # run docker-compose up
up:
	@docker-compose up -d

.PHONY: down # run docker-compose down
down:
	@docker-compose down

.PHONY: help # Generate list of targets with descriptions
help:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1	\2/' | expand -t20
