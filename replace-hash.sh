#!/bin/bash
hash=`git log --pretty=format:'%h' -n 1`

sed "s/{commit.hash}/$hash/g" index.html > _site/index.html
sed "s/{commit.hash}/$hash/g" error/403.html > _site/error/403.html
sed "s/{commit.hash}/$hash/g" error/404.html > _site/error/404.html
sed "s/{commit.hash}/$hash/g" error/500.html > _site/error/500.html

# for i in \
#     _site/index.html \
#     _site/error/403.html \
#     _site/error/404.html \
#     _site/error/500.html
# do
#     sed "s/{commit.hash}/$hash/g" $i > $i
# done
