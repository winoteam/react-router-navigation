MAKEFLAGS = -j1

bootstrap:
	yarn
	lerna bootstrap

format:
	prettier --write \"**/*.{js,json,css,md}\"

test:
	node_modules/.bin/eslint .
	lerna run test

clean:
	trash packages/*/node_modules
	trash examples/*/node_modules
	trash packages/*/node_modules
	trash node_modules