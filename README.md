getTweets
=========
This is a jQuery plugin for load your tweets to your site.
Simple with many options!


Basic usage
-----------
* Download ```jQuery.getTweets.js``` or ```jQuery.getTweets.min.js```
* Write some lines in your HTML, like the example below
* Done (:

```html
<script type="text/javascript" charset="utf-8">
  // display @your_twitter tweets with default options
  $("#my_element").getTweets({
    username: "your_twitter"
  });

  // Or you can use options :D
  $("#my_element").getTweets({
    username: "github",
    remove_content: true,
    count: 100,
    I18n: {
      hour: "AN HOUR AGO",
      day: "ONE DAY AGO"
    }
  });
</script>
...
<div id="twitter">
  This content shows if the Javascript is OFF or remove_content = false (default).
</div>
...
```


Example:
--------
```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>@orkut_br 2 last tweets</title>
    <script src="jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="jquery.getTweets.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
      $(document).ready(function(){
        $("#twitter").getTweets({
          username: "orkut_br",
          count: 2
        });
      });
    </script>
  </head>
  <body>
    <div id="twitter">
      This content shows if the Javascript is OFF or remove_content = false (default).
    </div>
  </body>
</html>
```


Will append ```#twitter``` like...


```html
<div id="twitter">
  This content shows if the Javascript is OFF or remove_content = false (default).
  <ul class="">
    <li class="">
      <span class="rt">RT @<a href="http://twitter.com/user_retweeted" title="Retweet" target="_blank">user_retweeted</a>:
        <span class="rt_content">
          <p>It's a RT. This tweet doesn't exist. Link test: <a href="http://t.co/9qzxFBqe" title="http://bit.ly/SwSWIV" target="_blank">bit.ly/SwSWIV</a> mention: @<a href="http://twitter.com/twitter" target="_blank">twitter</a> hashtag: #<a href="http://search.twitter.com/search?q=%23test" target="_blank">test</a></p>
        </span>
        <p class="when">
          <a href="http://twitter.com/orkut_br/status/#tweet_id_goes_here" target="_blank">31 minutes ago</a>
        </p>
      </span>
    </li>
    <li class="">
      <p>Other tweet, not a RT. Just text</p>
      <p class="when">
        <a href="http://twitter.com/orkut_br/status/#tweet_id_goes_here" target="_blank">1 day ago</a>
      </p>
    </li>
  </ul>
</div>
```


Options
-------
Checkout the options:

```
Option name                 Type          Default value               Description

parent_element              String        'ul'                        All tweets node
parent_element_class        String        ''
add_element                 String        'li'                        Individual tweet node
add_element_class           String        ''
tweet_container             String        'p'                         Tweet content node
username                    String        'orkut_br'                  Your twitter username
count                       Integer       5                           Number of tweets
include_rts                 Boolean       true
include_entities            Boolean       true                        Replace links (usernames/hashtags/etc)
exclude_replies             Boolean       false
rt_element                  String        'span'                      "RT @user:" node
rt_class                    String        'rt'
rt_link_el                  String        'span'                      RT content parent node (see the example for understand :P)
rt_link_class               String        'rt_content'
timelapse_element           String        'p'                         Timestamp node
timelapse_class             String        'when'
show_timelapse              Boolean       true                        Show tweet timestamp
remove_content              Boolean       false                       Remove the content before append tweets
I18n.seconds                String        'less than a minute ago'
I18n.minute                 String        'a minute ago'
I18n.minutes                String        '%n% minutes ago'
I18n.hour                   String        'about an hour ago'
I18n.hours                  String        '%n% hours ago'
I18n.day                    String        '1 day ago'
I18n.days                   String        '%n% days ago'
```


Internacionalization
--------------------
* The folder ```I18n``` have some translations, feels free to send other translations (:
* Just replace the relative numbers with ```%n%```


Important
---------
* This plugin works ONLY with Twitter API v1!
* Twitter's API 1.1 doesn't allows unauthenticated requests.


Limitations
-----------
* Only public accounts allowed
* Twitter allows 150 request per hour (for every client).
  If a user request 150 pages in 10 minutes, nothing will display for 50 minutes (for this user. If another user request, tweets will be showed for there)
* Max count is 200.
  **Important**: This count include retweets and replies. If you disable RTs and replies and yours ```x``` (count option) tweets are RT/replies, nothing will displayed
  
    > The value of count is best thought of as a limit to the number of tweets to return because suspended or deleted content is removed after the count has been applied. We include retweets in the count, even if include_rts is not supplied. It is recommended you always send include_rts=1 when using this API method.
      
    > https://dev.twitter.com/docs/api/1/get/statuses/user_timeline


Any ideia?
----------
* Fork
* Make your changes
* Open a pull request
* Wait (: