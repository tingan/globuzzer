$(function () {
  $dropdown = $('#country-dropdown');
  $videoTitle = $('#video-title');
  $youtube = {'Sweden':'g9QpC7QwnRU', 'Denmark': 'ejMa4qKmSVo', 'Finland': 'QOQWN9Q95oE', 'Norway': 'uXyy7lgDj9k'};
  function loadIframe(country_name) {
    var $iframe = $('#youtube-video');
    $youtubeURL = 'https://www.youtube.com/embed/';
    if ($iframe.length) {
      $iframe.attr('src', $youtubeURL + $youtube[country_name] + '?rel=0');
      $videoTitle.text('Visit ' + country_name);
      return false;
    }
    return true;
  }

  $(".img-gallery-item").on('mouseenter', function () {
    chooseCountry($(this).next().find('h5').text());
  });

  function chooseCountry(country_name) {
    $('.img-gallery-item').removeClass('bd-red');
    $('.img-gallery-' + country_name).addClass('bd-red');
    $('.img-gallery-item').next().find('.btn-choose').hide();
    $('.img-gallery-' + country_name).next().find('.btn-choose').show();
    loadIframe(country_name)
  }

  $('#currency-dropdown a').on('click', function () {
    $(this).parent().parent().find('.dropdown-text').html($(this).html());
  });


  $('.datepicker').datepicker();


  $('#country-dropdown').on('click', 'a', function () {
    var country_name = $(this).html();
    $(this).parent().parent().find('.dropdown-text').html(country_name);
    loadIframe(country_name);
    chooseCountry(country_name);
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

  $('.video-thumbnail').on('mouseover', function() {
    var country_name = $(this).attr('alt');
    chooseCountry(country_name);
    loadIframe(country_name);
  });


});