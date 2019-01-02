$(function () {
  $dropdown = $('#country-dropdown');
  $videoTitle = $('#video-title');

  function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    $youtubeURL = 'https://www.youtube.com/embed/';
    if ($iframe.length) {
      $iframe.attr('src', $youtubeURL + url + '?rel=0');
      return false;
    }
    return true;
  }

  $('#currency-dropdown a').on('click', function () {
    $(this).parent().parent().find('.dropdown-text').html($(this).html());
  });


  $('.datepicker').datepicker();


  $('#country-dropdown').on('click', 'a', function () {
    $(this).parent().parent().find('.dropdown-text').html($(this).html());
    switch ($(this).html()) {
      case 'Sweden':
        loadIframe('youtube-video', 'g9QpC7QwnRU');
        $videoTitle.text('Visit Sweden');
        break;
      case 'Denmark':
        loadIframe('youtube-video', 'ejMa4qKmSVo');
        $videoTitle.text('Visit Denmark');
        break;
      case 'Finland':
        loadIframe('youtube-video', 'QOQWN9Q95oE');
        $videoTitle.text('Visit Finland');
        break;
      case 'Norway':
        loadIframe('youtube-video', 'uXyy7lgDj9k');
        $videoTitle.text('Visit Norway');
        break;
    }


  });
  $.ajax({
    url: "http://localhost:3000/countries",
    type: "GET",
  })
    .done(function (data, textStatus, jqXHR) {
      $dropdown.empty();
      $.each(data, function () {
        $dropdown.append($("<a class='dropdown-item' />").text(this.country_name));
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // If express server is not running, then use backup data.
      var data = [{"id": 1, "country_name": "Sweden", "country_code": "SE"},
        {"id": 2, "country_name": "Denmark", "country_code": "DK"},
        {"id": 3, "country_name": "Finland", "country_code": "FI"},
        {"id": 4, "country_name": "Norway", "country_code": "NO"}];

      $.each(data, function () {
        $dropdown.append($("<a class='dropdown-item' />").text(this.country_name));
      });
    });


});