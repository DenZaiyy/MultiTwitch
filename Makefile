.PHONY: build
build:
	npm run build && cp public/.htaccess dist/.htaccess
