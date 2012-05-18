jQuery(document).ready(function() {
  $('#twitter-form').submit(function(event){
    callTwitter();
    event.preventDefault();
  });
});

function callTwitter(event) {
  $.ajax({
    url: 'http://search.twitter.com/search.json',
    type: 'GET',
    dataType: 'jsonp',
    data: {
      q: $('#query').val()
    },
    success: function(data, textStatus, xhr) {
      var result = $('<div>').addClass('result');
      console.log(data);
      for (var i = 0, tweet; tweet = data.results[i]; i++) {
        var row = $('<div>').addClass('row');
        row.append(
          $('<div>').addClass('span1 offset1').append(
            $('<img>').attr('src', tweet.profile_image_url)
          ).append($('<br>')).append(
            $('<p>').html(tweet.from_user)
          )
        ).append(
          $('<div>').addClass('span5 offset1').append(
            $('<p>').append(
              $('<strong>').html(tweet.text)
            )
          )
        ).append(
          $('<div>').addClass('span3 offset1').append(
            $('<p>').append(
              $('<em>').html(tweet.created_at)
            )
          ).append(
            $('<p>').html(tweet.iso_language_code)
          ).append(
            $('<p>').html(tweet.geo)
          )
        );
        $(result).append(row);
      }
      $('.result').replaceWith(result);
    }
  });
}