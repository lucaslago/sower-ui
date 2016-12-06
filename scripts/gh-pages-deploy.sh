#!/bin/bash
set -o errexit

rm -rf build
mkdir build

# config
git config --global user.email "wneto@thoughtworks.com"
git config --global user.name "Travis CI"

# build
npm run build

# deploy
cd build
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
