/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
  // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
  // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
  // get data from database
  const name = tweet.user.name;
  const avatar = tweet.user.avatars;
  const handle = tweet.user.handle;
  const message = tweet.content.text;
  const time = tweet.created_at;
  // put the data into webpage
  const $tweet =
      `<span>
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
      </span>`;
  return $tweet;
};

$(document).ready(function() {
  $("a").hide();
  $.get('/tweets', renderTweets);
// prevent the webpage refresher and send the text by ajax
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    //hide the error message again after new tweet comes
    $("a").hide();
    // $("#submit-tweet").serialize().length at least is 5(text=);
    if ($("#submit-tweet").serialize().length > 145) {
      $("#error2").slideDown("slow");
      return;
    }
    if ($("#submit-tweet").serialize().length === 5) {
      $("#error1").slideDown("slow");
      return;
    }
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $("#submit-tweet").serialize()
    })
    .done(function() {
      $.get('/tweets', renderTweets);
    });
    //empty the textarea after tweet successful
    document.getElementById('tweet-text').value = '';
    document.getElementById('tweet-length').value = 140;
  })
});

// $(document).ready(function () {
//   $("#submit - tweet").submit(function () {
//     $.ajax('/tweets', {method: 'GET'} )
//       .then(
//         $.getJSON('example.json', (data) => {
//           console.log(data);
//         }))
//       }
// )});