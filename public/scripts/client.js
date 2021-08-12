/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  // iterating through initial data and rendering
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').append($newTweet);
    }
  };

  // appending new tweets function
  const createTweetElement = function(tweetData) {
    const $newTweet = `
    <article class="tweet">
    <header class="tweet">
      <div class="tweet">
        <img height="50px" width="50px" class="avatars" src="${tweetData.user.avatars}">
        <p>${tweetData.user.name}</p>
      </div>
      <p class="handle">${tweetData.user.handle}</p>
    </header>

    <main class="content">
      ${tweetData.content.text}
    </main>

    <footer class="tweet">
      <p class="created_at">${timeago.format(tweetData.created_at)}</p>
      <div class="icons">
        <div class="flag"><i class="fas fa-flag"></i></div>
        <div class="retweet"><i class="fas fa-retweet"></i></div>
        <div class="like"><i class="fas fa-heart"></i></div>  
      </div>
    </footer>

    </article>
    `;
    return $newTweet;
  };

  renderTweets(data);
});