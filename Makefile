lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

install:
	npm install

publish:
	npm publish --dry-run
