(function ($) {
	$.fn.getTweets = function (user_options) {

		var options = {
			parent_element: 'ul',
			parent_element_class: '',
			add_element: 'li',
			add_element_class: '',
			tweet_container: 'p',
			username: 'orkut_br',
			count: 5,
			include_rts: true,
			include_entities: true,
			exclude_replies: false,
			rt_class: 'rt',
			rt_element: 'span',
			rt_link_el: 'span',
			rt_link_class: 'rt_content',
			timelapse_element: 'p',
			timelapse_class: 'when',
			show_timelapse: true,
			remove_content: false,
			I18n: {
				seconds: 'less than a minute ago',
				minute: 'a minute ago',
				minutes: '%n% minutes ago',
				hour: 'about an hour ago',
				hours: '%n% hours ago',
				day: '1 day ago',
				days: '%n% days ago'
			}
		};

		if (user_options) {
			$.extend(options, user_options);
		}

		/* transform the @mentions, #hashtags, media links (videos, photos) and links of the tweet */

		function transformTweetLinks(tweet_entities, tweet_text) {
			if(tweet_entities !== undefined){
				$.each(tweet_entities.urls, function (i, link) {
					tweet_text = tweet_text.replace(link.url, '<a href="' + link.url + '" title="' + link.expanded_url + '" target="_blank">' + link.display_url + '</a>');
				});
				if(tweet_entities.media){
					$.each(tweet_entities.media, function (i, media) {
						tweet_text = tweet_text.replace(media.url, '<a href="' + media.url + '" title="' + media.expanded_url + '" target="_blank">' + media.display_url + '</a>');
					});
				}
				$.each(tweet_entities.hashtags, function (i, hashtag) {
					tweet_text = tweet_text.replace('#' + hashtag.text, '#<a href="http://search.twitter.com/search?q=%23' + hashtag.text + '" target="_blank">' + hashtag.text + '</a>');
				});
				$.each(tweet_entities.user_mentions, function (i, user) {
					tweet_text = tweet_text.replace('@' + user.screen_name, '@<a href="http://twitter.com/' + user.screen_name + '" target="_blank">' + user.screen_name + '</a>');
				});
			}
			return tweet_text;
		}

		/* transform the tweet date to difference time in words */

		function dateTransform(date) {
			var tweet_date = Date.parse(date);
			var now = arguments.length > 1 ? arguments[1] : new Date();
			var seconds = parseInt((now.getTime() - tweet_date) / 1000);
			if(seconds < 60) {
				return options.I18n.seconds;
			}
			if(seconds < 120) {	//	2 * 60	(2 minutes)
				return options.I18n.minute;
			}
			if(seconds < 3300) {	//	55 * 60	(55 minutes)
				return options.I18n.minutes.replace("%n%", parseInt(seconds / 60));
			}
			if(seconds < 5400) {	//	90 * 60	(1:30 hours)
				return options.I18n.hour;
			}
			if(seconds < 86400) {	//	24 * 60 * 60	(1 day)
				return options.I18n.hours.replace("%n%", parseInt(seconds / 3600));
			}
			if(seconds < 172800) {	//	48 * 60 * 60	(2 days)
				return options.I18n.day;
			}
			return options.I18n.days.replace("%n%", parseInt(seconds / 86400));
		}


		var tweet_parent_node = $('<' + options.parent_element + ">", {
			class: options.parent_element_class
		});


		$.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=' + options.include_entities + '&include_rts=' + options.include_rts + '&screen_name=' + options.username + '&exclude_replies=' + options.exclude_replies + '&count=' + options.count + '&callback=?', function (data) {
			$.each(data, function (i, tweet) {
				if (options.include_rts && tweet.retweeted_status !== undefined) {
					var tweet_html = $('<' + options.add_element + '>', {
						class: options.add_element_class
					});
					var rt_element = $('<' + options.rt_element + ">", {
						class: options.rt_class
					});
					var rt_link = $('<' + options.rt_link_el + '>', {
						class: options.rt_link_class
					});
					var timelapse = $('<' + options.timelapse_element + '>', {
						class: options.timelapse_class
					});
					rt_element.html('RT @<a href="http://twitter.com/' + tweet.retweeted_status.user.screen_name + '" title="Retweet" target="_blank">' + tweet.retweeted_status.user.screen_name + '</a>: ');
					rt_link.html($('<' + options.tweet_container + '>').html(transformTweetLinks(tweet.retweeted_status.entities, tweet.retweeted_status.text)));
					timelapse.html('<a href="http://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '" target="_blank">' + dateTransform(tweet.created_at));
					rt_element.append(rt_link);
					if(options.show_timelapse) {
						rt_element.append(timelapse);
					}
					tweet_html.append(rt_element);
					tweet_parent_node.append(tweet_html);
				} else {
					var tweet_html = $('<' + options.add_element + '>', {
						class: options.add_element_class
					});
					var timelapse = $('<' + options.timelapse_element + '>', {
						class: options.timelapse_class
					});
					tweet_html.html($('<' + options.tweet_container + '>').html(transformTweetLinks(tweet.entities, tweet.text)));
					timelapse.html('<a href="http://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '" target="_blank">' + dateTransform(tweet.created_at));
					if(options.show_timelapse) {
						tweet_html.append(timelapse);
					}
					tweet_parent_node.append(tweet_html);
				}
			})
		});

		if(options.remove_content) {
			this.empty();
		}

		this.append(tweet_parent_node)

	}
})(jQuery)