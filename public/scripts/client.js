/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1648349110471
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1648435510471
//   }
// ];
// const timeago = require('timeago.js');

const renderTweets = function (tweets) {
  // loops through tweets
  for (let tweet of tweets) {
  // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet)
  // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet) 
  } 
}

const createTweetElement = function (tweet) {
  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let handle = tweet.user.handle;
  let message = tweet.content.text;
  let time = tweet.created_at;
  let $tweet = 
      `<article>
        <div class="tweet-header">
          <div><img src="${avatar}">${name}</div>
          <div>${handle}</div>
        </div>
        <div class="text">  
          <p>${message}</p>
        </div>
        <footer>
          <p>${timeago.format(time)}</p>
          <div class="icon-container">
          <i class="fa-solid fa-flag" id="icon1"></i>
          <i class="fa-solid fa-retweet" id="icon2"></i>
          <i class="fa-solid fa-heart" id="icon3"></i>
          </div>
        </footer>
      </article>`;
  return $tweet;
}

$(document).ready(function () {
  $.get('/tweets', renderTweets)

  $("#submit-tweet").submit(function (event) {
    event.preventDefault();
    $.ajax( {
      method: 'POST',
      url: '/tweets',
      data: $("#submit-tweet").serialize()
    })
    .done(function () {
      $.get('/tweets', renderTweets)
    });  
})
})

// $(document).ready(function () {
//   $("#submit-tweet").submit(function (event) {
//     event.preventDefault();
//     $.ajax('/tweets', {
//       method: 'POST',
//       data: $("#submit-tweet").serialize() 
//     })
//       // .then(function (res) {
//       //   console.log(res)
//       // });
//   });
// });

// $(document).ready(function () {
//   $("#submit - tweet").submit(function () {
//     $.ajax('/tweets', {method: 'GET'} )
//       .then(
//         $.getJSON('example.json', (data) => {
//           console.log(data);
//         }))
//       }
// )});