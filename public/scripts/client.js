/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// DOCUMENT READY
$(document).ready(function() {

  // ESCAPE FUNCTION TO PREVENT XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // AJAX GET / LOADING TWEETS
  const fetchTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        console.log('Initial data posting :', data);
        renderTweets(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  };
  fetchTweets();

  // AJAX POST / SUBMIT
  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const $tweetText = $('#tweet-text');
    const tweetLength = $tweetText.val().length;

    if (tweetLength > 140) {
      $('#empty-tweet').slideUp();
      $('#exceed-max-tweet').slideDown();
    } else if ($tweetText.val() === '') {
      $('#empty-tweet').slideDown();
      $('#exceed-max-tweet').slideUp();
    } else {
      $.post('/tweets', serializedData, (response) => {
        console.log('THE FORM IS SUBMITTED!!!');
        console.log('This is the serialized data: ', serializedData);
        console.log('success', response);
        $('#errors').slideUp('fast');
        $tweetText.val('').empty();
        fetchTweets();
      });
    }
  });
  
  // ITERATE AND RENDER TWEETS IN HTML FORMAT
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($newTweet);
    }
  };

  // RETURNING HTML FORMAT BASED ON THE DATA
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
      ${escape(tweetData.content.text)}
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

});