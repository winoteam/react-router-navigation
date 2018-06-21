MAKEFLAGS = -j1

format:
	node_modules/.bin/prettier --write "**/*.js"

test:
	node_modules/.bin/eslint .
	node_modules/.bin/flow --show-all-errors
	node_modules/.bin/jest --projects packages/**

clean:
	trash yarn.lock
	trash packages/*/yarn.lock
	trash examples/*/yarn.lock
	trash packages/*/node_modules
	trash examples/*/node_modules
	trash node_modules

precommit:
	pretty-quick --staged