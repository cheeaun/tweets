Tweets
======

An off-site archive of tweets from Twitter.

Setup
-----

 1. Set up the database. Go to [github.com/cheeaun/tweet-couch](http://github.com/cheeaun/tweet-couch), do everything there, come back here.
 2. Fork or `git clone` or download this repo. Everything is pure client-side, so you can host it on any static web hosts, like [GitHub Pages](http://pages.github.com/).
 3. Modify `config.js`. Should be self-explanatory.
 4. Test it on local to see if everything works.

		cd tweets/
		npm install
		grunt connect

 5. Load `locahost:8000`.
 6. If everything is okay, upload to GitHub pages or any server you like.
 7. Done.

Development setup
-----------------

- Buckle up.

		npm install

- [Bower](https://github.com/twitter/bower) for package management.

		bower install

- [Grunt](http://gruntjs.com/) for running tasks.

	- Concatenate and minify all JS files.

			grunt uglify

	- Compile the Mustache templates in `templates/` folder.

			grunt hogan

	- Do both `uglify` and `hogan` tasks.

			grunt build

	- JSHint the JS.

			grunt jshint

	- Start a local server.

			grunt connect

Notes
-----

- Favicon image is from Adam Whitcroft's [Batch](http://adamwhitcroft.com/batch/) icon set.
- The design and layout pretty much follows Twitter's [Developer Display Requirements](https://dev.twitter.com/terms/display-requirements).
- Some parts of the design are inspired by Andy Graulund's [Tweet Nest](http://pongsocket.com/tweetnest/) as well.

License
-------

Licensed under the [MIT License](http://cheeaun.mit-license.org/).