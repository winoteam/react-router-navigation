MAKEFLAGS = -j1

bootstrap:
	lerna bootstrap

format:
	prettier --write \"**/*.{js,json,css,md}\"

test:
	node_modules/.bin/eslint .

clean:
	trash examples/*/node_modules
	trash packages/*/node_modules
	trash node_modules