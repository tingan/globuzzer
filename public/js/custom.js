$(function () {
  $('.dropdown-menu a').on('click', function () {
    $(this).parent().parent().find('.dropdown-text').html($(this).html());
  });

  $('.datepicker').datepicker();



});