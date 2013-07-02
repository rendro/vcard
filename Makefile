dist:
	make clean
	make static
	make css
	make js
	make html

static:
	mkdir -p _site/assets/images
	mkdir -p _site/error
	cp -R assets/images/ _site/assets/images/
	cp favicon.ico _site/favicon.ico
	cp .htaccess _site/.htaccess

js:
	mkdir -p _site/assets/javascripts/ext
	closure-compiler assets/javascripts/ext/modernizr.js > _site/assets/javascripts/ext/modernizr.js
	closure-compiler assets/javascripts/app.js > _site/assets/javascripts/app.min.js

css:
	mkdir -p _site/assets/stylesheets
	lessc assets/stylesheets/app.less > _site/assets/stylesheets/app.css
	lessc --yui-compress assets/stylesheets/app.less > _site/assets/stylesheets/app.min.css

html:
	./replace-hash.sh

clean:
	rm -rf _site

.PHONY: dist
