

_resetdb:
	npx wrangler d1 execute $(DB_NAME) --file ./script/drop.sql $(OPTIONS)
	make -s _migrate DB_NAME=$(DB_NAME) OPTIONS="$(OPTIONS)"

resetdb:
	make -s _resetdb DB_NAME=hono-app OPTIONS=--local

resetdb-dev:
	make -s _resetdb DB_NAME=hono-app OPTIONS=--remote
