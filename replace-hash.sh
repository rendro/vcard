#!/bin/bash
#mkdir -p tmp/error

#appjs=`cat _site/assets/javascripts/app.min.js`
#sed "s/{appjs}/<script>$appjs<\/script>/g" index.html > tmp/index.html
#sed "s/{appjs}/<script>$appjs<\/script>/g" error/403.html > tmp/error/403.html
#sed "s/{appjs}/<script>$appjs<\/script>/g" error/404.html > tmp/error/404.html
#sed "s/{appjs}/<script>$appjs<\/script>/g" error/500.html > tmp/error/500.html

hash=`git log --pretty=format:'%h' -n 1`
sed "s/{commit.hash}/$hash/g" index.html > _site/index.html
sed "s/{commit.hash}/$hash/g" error/403.html > _site/error/403.html
sed "s/{commit.hash}/$hash/g" error/404.html > _site/error/404.html
sed "s/{commit.hash}/$hash/g" error/500.html > _site/error/500.html

#rm -rf tmp
