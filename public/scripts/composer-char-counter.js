// jQuery()
// jQuery === $

$(document).ready(function () {
  // --- our code goes here ---
  // make sure jquary is work.
  console.log('jQuary is works');

  // count the length of elements typing
  $('#tweet-text').on('input', function (elements) { 
    const input = elements.target.value.length;
    $(".counter").text(140 - input)
  //if the input more than 140, the count change to red 
    if (140 - input < 0) {
      $(".counter").addClass("red")
    }
    else {
      $(".counter").removeClass("red")
    }
  });
});

