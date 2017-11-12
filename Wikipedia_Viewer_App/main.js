$('#search-form, #about').hide()
$(document).ready(function () {
  // Search Button:
  $('#search-btn').click(function () {
    if ($('#search-btn-container').hasClass('active')) {
      $('#search-form').slideUp()
      $('#search-btn-container').removeClass('active')
    } else {
      $('#search-form').slideDown()
      $('#search-btn-container').addClass('active')
    }
  })
  // About Button:
  $('#about-btn').click(function () {
    $('main').hide()
    $('#about').slideDown()
  })
})
