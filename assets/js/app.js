// Twitter-like relative time strings
moment.lang('en', {
	relativeTime : $.extend({}, moment().lang('en').lang()._relativeTime, {
		s: 'secs',
		m: '1 min',
		mm: '%d mins',
		h: '1 hr',
		hh: '%d hrs'
	})
});

var twitterDateFormat = 'YYYY-MM-DD HH:mm Z';

var commafy = function(numbers){
	return (''+numbers).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

var Tweets = Backbone.Collection.extend({
	url: CONFIG.couchdb_db_url + '/_design/tweets/_view/by_created_date',
	parse: function(response){
		return _.map(response.rows, function(row){
			var doc = row.doc;
			doc.key = row.key;
			return doc;
		});
	}
});

var tweets = new Tweets();

var TweetsResults = Backbone.Collection.extend({
	url: CONFIG.couchdb_db_url + '/_design/tweets/_search/tweets',
	parse: function(response){
		var total_rows = this.total = response.total_rows;
		var rows = response.rows;
		this.bookmark = total_rows > 0 && rows.length > 0 && (rows.length + this.length < total_rows ) && response.bookmark;
		return _.map(response.rows, function(row){
			var doc = row.doc;
			return doc;
		});
	}
});

var tweetsResults = new TweetsResults();

var TweetView = Backbone.View.extend({
	tagName: 'li',
	template: TEMPLATES.tweet,
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},
	render: function(){
		var attributes = _.clone(this.model.attributes);

		if (attributes.retweeted_status){
			var originalAttributes = attributes;
			attributes = attributes.retweeted_status;
			attributes.retweeted = true;

			attributes.retweeted_user = originalAttributes.user;
			attributes.retweeted_created_at = originalAttributes.created_at;

			var retweeted_datetime = moment(attributes.retweeted_created_at, twitterDateFormat);
			attributes.retweeted_datetime = retweeted_datetime.format('ddd, D MMM YYYY, h:mm A');
		}

		var datetime = moment(attributes.created_at, twitterDateFormat);
		attributes.datetime = datetime.format('ddd, D MMM YYYY, h:mm A');

		var relative_datetime;
		var now = moment();
		if (now.diff(datetime, 'days') < 1){
			relative_datetime = datetime.fromNow(true);
		} else if (now.year() != datetime.year()){
			relative_datetime = datetime.format('D MMM YY');
		} else {
			relative_datetime = datetime.format('D MMM');
		}
		attributes.relative_datetime = relative_datetime;

		attributes.content = twttr.txt.autoLink(attributes.text, {
			urlEntities: attributes.entities.urls.concat(attributes.entities.media || [])
		});

		var profile_image_url = attributes.user.profile_image_url_https;
		if (window.devicePixelRatio > 1){
			profile_image_url = profile_image_url.replace('_normal.', '_bigger.');
		}
		attributes.user.profile_image_url = profile_image_url;

		this.el.innerHTML = this.template.render(attributes);

		return this;
	}
});

var monthsCount = {};

var TweetNavView = Backbone.View.extend({
	el: $('#tweets-nav'),
	initialize: function(){
		var that = this;
		$.ajax({
			url: CONFIG.couchdb_db_url + '/_design/tweets/_view/monthly_total',
			dataType: 'jsonp',
			data: {
				group: true
			},
			success: function(response){
				if (!response || !response.rows || !response.rows.length) return;
				var html = '';
				var tpl = TEMPLATES.month;
				var rows = response.rows;
				var max = _.max(rows, function(r){
					return r.value;
				}).value;
				var total = 0;

				_.forEach(rows.reverse(), function(r){
					var key = r.key;
					var value = r.value;
					total += value;
					html += tpl.render({
						key: key,
						url: '#/' + key,
						month_year: moment(key, 'YYYY-MM').format('MMMM YYYY'),
						total: commafy(value),
						total_width: (value/max*100) + '%'
					});
					monthsCount[key] = value;
				});
				monthsCount.total = total;
				that.$el.find('.months-list').append(html);
				that.$el.find('.total-tweets').text(commafy(total));

				// Only start history after this months list is done
				Backbone.history.start();
			}
		});
	},
	toggle: function(){
		this.$el.toggleClass('hidden');
		this.trigger(this.$el.hasClass('hidden') ? 'hide' : 'show');
	},
	hide: function(){
		this.$el.addClass('hidden');
		this.trigger('hide');
	}
});

var AppView = Backbone.View.extend({
	el: $('#tweets-app'),
	tweetsLimit: 21,
	events: {
		'click #tweets-more': 'more',
		'click #results-more': 'moreResults',
		'click .toggle-tweets-nav': 'toggleNav',
		'click .tweets-list a': 'patchLinks'
	},
	initialize: function(){
		this.$tweets = $('#tweets-list');
		this.$more = $('#tweets-more');
		this.$results = $('#results-list');
		this.$moreResults = $('#results-more');
		this.$resultsNada = $('#results-nada');
		this.$nav = $('#tweets-nav');
		this.$heading = this.$el.find('.heading-text');

		document.title = TEMPLATES.title.render({screen_name: CONFIG.screen_name});
		$('#heading').html(TEMPLATES.heading.render({screen_name: CONFIG.screen_name}));

		if (CONFIG.github_project_url) $('#github-link').removeClass('hide').attr('href', CONFIG.github_project_url);

		if (CONFIG.couchdb_search) $('#search-form').removeClass('hide');

		this.listenTo(tweets, 'reset', this.reset);
		this.listenTo(tweets, 'add', this.add);
		this.listenTo(tweetsResults, 'reset', this.resetResults);
		this.listenTo(tweetsResults, 'add', this.addResult);

		this.navView = new TweetNavView();
		var $toggle = this.$el.find('.toggle-tweets-nav');
		this.navView.bind('show', function(){
			$toggle.addClass('open');
		}).bind('hide', function(){
			$toggle.removeClass('open');
		});

		var that = this;
		$(window).scroll(function(){
			if (window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop) >= document.body.offsetHeight){
				setTimeout(function(){
					$('.more-link:not(.hide)').trigger('click');
				}, 300);
			}
		});

		var $searchForm = this.$searchForm = $('#search-form');
		var $searchField = this.$searchField = $searchForm.find('.search-query');
		$searchForm.submit(function(e){
			e.preventDefault();
			var q = $searchField.val();
			location.hash = '/search/' + encodeURIComponent(q);
			if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)){
				// Force the keyboard to go away after 'enter'
				$searchField.blur();
			}
		});

		var $lightboxCover = $('#lightbox-cover');
		var $lightbox = $('#lightbox');
		$lightboxCover.on('click', function(){
			$lightboxCover.removeClass('show');
			$lightbox.empty().removeClass('show');
		});
		$lightbox.on('click', function(){
			$lightboxCover.trigger('click');
		});
		$('.tweets-container').on('click', '.media-content a', function(e){
			e.preventDefault();
			var img = $(this).find('img');
			if (!img.length) return;
			var _img = img.clone();
			$lightbox.empty().css('transform', 'translateY(' + $(document).scrollTop() + 'px)').append(_img).addClass('show');
			$lightboxCover.addClass('show');
		});
	},
	toggleNav: function(e){
		e.preventDefault();
		this.navView.toggle();
	},
	renderTweets: function(year, month){
		var that = this;
		var data = {
			limit: that.tweetsLimit,
			include_docs: true,
			descending: true
		};
		if (year && month){
			data.descending = false;
			var y = parseInt(year, 10);
			var m = parseInt(month, 10);
			data.startkey = '[' + y + ',' + m + ',1,0,0,0]';
			data.endkey = '[' + y + ',' + m + ',31,24,60,60]';
		}
		this.$tweets.addClass('loading');
		tweets.fetch({
			reset: true,
			dataType: 'jsonp',
			data: data,
			complete: function(){
				that.$tweets.removeClass('loading');
			}
		});
		this.data = data;
	},
	renderSearch: function(query){
		var that = this;
		var data = {
			limit: that.tweetsLimit-1,
			include_docs: true,
			q: query,
			sort: '"-created_at"'
		};
		this.$results.addClass('loading');
		this.$resultsNada.addClass('hide');
		tweetsResults.fetch({
			reset: true,
			dataType: 'jsonp',
			data: data,
			success: function(){
				var count = tweetsResults.total;
				that.$heading.find('small').html(TEMPLATES.count.render({
					count: commafy(count),
					count_one: count == 1
				}));
				that.$results.removeClass('loading');
				if (count <= 0){
					that.$resultsNada.removeClass('hide');
				}
			}
		});
		this.searchData = data;
		this.updateSearchField();
	},
	updateSearchField: function(query){
		this.$searchField.val(query || '');
	},
	add: function(tweet){
		var view = new TweetView({model: tweet});
		this.$tweets.append(view.render().el);
	},
	addAll: function(){
		this.renderMore(tweets);
		var container = document.createDocumentFragment();
		tweets.each(function(tweet){
			var view = new TweetView({model: tweet});
			container.appendChild(view.render().el);
		}, this);
		this.$tweets.append(container);
	},
	addResult: function(tweet){
		var view = new TweetView({model: tweet});
		this.$results.append(view.render().el);
	},
	addAllResults: function(){
		this.renderMore(tweetsResults);
		var container = document.createDocumentFragment();
		tweetsResults.each(function(tweet){
			var view = new TweetView({model: tweet});
			container.appendChild(view.render().el);
		}, this);
		this.$results.append(container);
	},
	reset: function(){
		this.$tweets.empty();
		this.addAll();
	},
	resetResults: function(){
		this.$results.empty();
		this.addAllResults();
	},
	moreBusy: false,
	more: function(e){
		e.preventDefault();
		if (this.moreBusy) return;
		this.moreBusy = true;
		this.$more.addClass('loading');
		var startkey = this.$more.data('startkey');
		var data = this.data;
		data.startkey = startkey;
		var that = this;
		tweets.fetch({
			silent: true,
			dataType: 'jsonp',
			data: data,
			success: function(){
				that.addAll();
			},
			complete: function(){
				that.moreBusy = false;
				that.$more.removeClass('loading');
			}
		});
	},
	moreResultsBusy: false,
	moreResults: function(e){
		e.preventDefault();
		if (this.moreResultsBusy) return;
		this.moreResultsBusy = true;
		this.$moreResults.addClass('loading');
		var bookmark = this.$moreResults.data('bookmark');
		var data = this.searchData;
		data.bookmark = bookmark;
		var that = this;
		tweetsResults.fetch({
			silent: true,
			dataType: 'jsonp',
			data: data,
			success: function(){
				that.addAllResults();
			},
			complete: function(){
				that.moreResultsBusy = false;
				that.$moreResults.removeClass('loading');
			}
		});
	},
	renderMore: function(collection){
		this.$more.addClass('hide');
		this.$moreResults.addClass('hide');

		if (collection.bookmark){
			this.$moreResults.data('bookmark', collection.bookmark);
			this.$moreResults.removeClass('hide');
		} else if (collection.length >= this.tweetsLimit){
			var lastTweet = collection.pop();
			this.$more.data('startkey', JSON.stringify(lastTweet.get('key')));
			this.$more.removeClass('hide');
		}
	},
	updateState: function(route, routeArgs){
		// Reset all active states
		var nav = this.$nav;
		nav.find('li').removeClass('active');

		// Set the value for search field
		if (route == 'search'){
			this.updateSearchField(decodeURIComponent(routeArgs[0]));
		} else {
			this.updateSearchField('');
		}

		// Show/hide Home icon
		var $home = $('#home-link');
		if (route == 'index'){
			$home.addClass('hide');
		} else {
			$home.removeClass('hide');
		}

		// Update the sub-heading
		var links = nav.find('a');
		var headingHTML = '';
		var tpl = TEMPLATES['sub-heading-' + route];
		var count;
		if (route == 'index'){
			count = monthsCount.total;
			headingHTML = tpl.render({
				count: commafy(count),
				count_one: count == 1
			}, {
				count_tpl: TEMPLATES.count
			});
			nav.find('.route-index').addClass('active');
		} else if (route == 'month'){
			var year = routeArgs[0];
			var month = routeArgs[1];
			count = monthsCount[year + '-' + month];
			headingHTML = tpl.render({
				month: moment().month(parseInt(month, 10)-1).format('MMM'),
				year: year,
				count: commafy(count),
				count_one: count == 1
			}, {
				count_tpl: TEMPLATES.count
			});
			nav.find('.route-month-' + year + '-' + month).addClass('active');
		} else if (tpl){
			headingHTML = tpl.render();
		}
		if (!headingHTML) headingHTML = route.replace(/\b[a-z]/g, function(match){
			return match.toUpperCase(); // Capitalize
		});

		this.$heading.html(headingHTML);
	},
	patchLinks: function(e){
		var $el = $(e.target);
		if (!$el.is('a')) $el = $el.parents('a');
		if ($el.data('screen-name')){
			e.preventDefault();
			var screen_name = $el.data('screen-name');
			app.openTwitterUserIntent(screen_name);
		} else if (!$el.attr('target')){
			e.preventDefault();
			window.open($el.attr('href'));
		}
	},
	openTwitterUserIntent: function(screen_name){
		var url = 'https://twitter.com/intent/user?screen_name=' + screen_name,
			windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
			width = 550,
			height = 420,
			winHeight = screen.height,
			winWidth = screen.width,
			left = Math.round((winWidth / 2) - (width / 2)),
			top = 0;
		if (winHeight > height) {
			top = Math.round((winHeight / 2) - (height / 2));
		}
		window.open(url, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
	}
});

var app = new AppView();

var Workspace = Backbone.Router.extend({
	routes: {
		'': 'index',
		'search/:query': 'search',
		'*notfound': 'notfound'
	},
	initialize: function(){
		this.route(/(\d{4})-(\d{2})/i, 'month');
	},
	index: function(){
		$('#tweets-container').removeClass('hide');
		$('#results-container').addClass('hide');
		app.renderTweets();
	},
	month: function(year, month){
		$('#tweets-container').removeClass('hide');
		$('#results-container').addClass('hide');
		app.renderTweets(year, month);
	},
	search: function(query){
		$('#tweets-container').addClass('hide');
		$('#results-container').removeClass('hide');
		app.renderSearch(decodeURIComponent(query));
	},
	notfound: function(){
		location.hash = '#'; // Go back to home, no 404 page
	}
});

var router = new Workspace();

router.bind('route', function(route, args){
	this.currentRoute = route;
	app.navView.hide();
	app.updateState.apply(app, arguments);
	window.scrollTo(0, 0);
});
