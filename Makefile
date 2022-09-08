.PHONY: all
all:help

.PHONY: process # run squid processor
process: migrate
	@node -r dotenv/config lib/processor.js

.PHONY: serve # run graphql server
serve:
	@npx squid-graphql-server --subscriptions

.PHONY: migrate # run migrate
migrate:
	@npx squid-typeorm-migration apply

.PHONY: createdb # create db
createdb:
	@npx sqd db create

.PHONY: build # build typescript files
build:
	@npm run build

.PHONY: build-processor-image # build processor Docker image
build-processor-image:
	@docker build . --target processor -t squid-processor

.PHONY: build-query-node-image # build query node Docker image
build-query-node-image:
	@docker build . --target query-node -t query-node

.PHONY: build-images # build all Docker images
build-images: build-processor-image build-query-node-image

.PHONY: codegen # generate TypeORM classes from schema.graphql
codegen:
	@npx squid-typeorm-codegen

.PHONY: typegen # generate type-safe wrappers for events, calls and storage items
typegen:
	@npx squid-substrate-typegen typegen.json

.PHONY: up # run docker-compose up
up:
	@docker-compose up -d

.PHONY: down # run docker-compose down
down:
	@docker-compose down

.PHONY: help # Generate list of targets with descriptions
help:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1	\2/' | expand -t20
