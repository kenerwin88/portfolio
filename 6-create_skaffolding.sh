#!/bin/bash

# create directories
mkdir _includes
mkdir _includes/partials
mkdir about
mkdir projects
mkdir resume
mkdir blog
mkdir contact

# create .eleventy.js and package.json files
echo "module.exports = function(eleventyConfig) {
  // Add your configuration here
};" > .eleventy.js

echo '{
  "name": "my-portfolio",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npx eleventy --serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@11ty/eleventy": "^0.12.1"
  }
}' > package.json

# create layout.njk file
echo '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{ title }}</title>
</head>
<body>
  {% include "partials/header.njk" %}
  {{ content | safe }}
  {% include "partials/footer.njk" %}
</body>
</html>' > _includes/layout.njk

# create empty header.njk and footer.njk files
touch _includes/partials/header.njk
touch _includes/partials/footer.njk

# create index.md files with front matter and placeholder content
for dir in about projects resume blog contact .; do
  echo '---
layout: layout.njk
title: Page Title
---

# Page Title

This is a placeholder for the page content.' > $dir/index.md
done

# create README.md
echo '# My Portfolio

This is my personal portfolio website, built with [11ty](https://www.11ty.dev/).' > README.md

# initialize npm
npm init -y

# install 11ty
npm install --save-dev @11ty/eleventy
