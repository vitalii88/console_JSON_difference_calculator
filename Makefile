lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

install:
	npm install

publish:
	npm publish --dry-run

test:
	npm run test

test-watch:
	npm run test:watch
