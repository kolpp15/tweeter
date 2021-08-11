/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const initData = {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1628546254537
};

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
      <p class="created_at">${tweetData.created_at}</p>
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

  const $newTweet = createTweetElement(initData);

  $('#tweets-container').append($newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});