# Readability

Readability is a small app that calculates some information on given article URLs, such as the [Flesch Reading Ease](http://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests), [Gunning-Fog Index](http://en.wikipedia.org/wiki/Gunning_fog_index) and [Flesch-Kincaid grade level](http://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch.E2.80.93Kincaid_Grade_Level).

This was built to help assist [Clay Cazier's](http://www.claycazier.com/) whitepaper on [Content Length, Readability & Organic Rankings](http://www.pmdigital.com/blog/2014/01/content-length-readability-organic-rankings/)

It is currently only scraping the `body` content and removing unwanted tags (such as script, link, img). A future upgrade may hook into the [Readability](https://www.readability.com/) API to more accurately gauge the content.

## Demo

A demo is up and running on heroku: http://textstatistics.herokuapp.com

## Running

1. git clone `https://github.com/robhurring/readability.git`
2. `npm install`
3. `npm start`
