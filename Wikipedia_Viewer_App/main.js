/* API Documentation: https://www.mediawiki.org/wiki/API:Main_page & https://www.mediawiki.org/wiki/API:Search & https://www.mediawiki.org/wiki/API:Search_and_discovery
      Query Parameters I can use:
      prop=extracts [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bextracts]
      prop=pageviews [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bpageviews]
      list=search [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bsearch]
*/
$('#search-form, #about-page').hide()
$(document).ready(function () {

  function showSearchForm () {
    $('#search-form').slideDown()
    $('#search-btn-container').addClass('active')
  }

  function hideSearchForm () {
    $('#search-form').slideUp()
    $('#search-btn-container').removeClass('active')
  }

  function showAboutPage () {
    $('#about-page').slideDown()
    $('#about-btn-container').addClass('active')
  }
  function hideAboutPage () {
    $('#about-page').hide()
    $('#about-btn-container').removeClass('active')
  }

  // SEARCH BUTTON:
  $('#search-btn').click(function () {
    if ($('#search-btn-container').hasClass('active')) {
      hideSearchForm()
    } else {
      hideAboutPage()
      $('main').show()
      showSearchForm()
    }
  })

  // On ENTER keypress: Search Input + Wiki API:
  $('#search-input').on('keypress', function (e) {
    if (e.keyCode === 13) {
      // Clean the Wiki Cards Holder inner HTML:
      document.getElementById('wiki-cards-holder').innerHTML = ''
      let searchInput = document.getElementById('search-input').value
      // API Call:
        // Test Link: https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=hello&format=json
      let APIlink = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=' + searchInput + '&format=json'
      $.ajax(APIlink, {
        dataType: 'json',
        data: {
          origin: '*'
        },
        type: 'GET',
        success: function (json) {
          // Add the Wiki Cards, each one with their content, to the Wiki Cards Holder inner HTML:
          for (let i = 0; i < json.query.search.length; i++) {
            document.getElementById('wiki-cards-holder').innerHTML += '<a target="_blank" href="https://en.wikipedia.org/wiki/Hello">' +
                                                                        '<div class="col m12">' +
                                                                          '<article class="card horizontal z-depth-2 hoverable magictime vanishIn">' +
                                                                            '<div class="card-content">' +
                                                                              '<div class="card-title">' +
                                                                                '<h4 id="wiki-title">' + json.query.search[i].title + '</h4>' +
                                                                              '</div>' +
                                                                              '<p class="wiki-content">' +
                                                                                json.query.search[i].snippet +
                                                                              '</p>' +
                                                                            '</div>' +
                                                                          '</article>' +
                                                                        '</div>' +
                                                                      '</a>'
          }
        }
      })
    }
  })

  // ABOUT BUTTON:
  $('#about-btn').click(function () {
    if ($('#about-btn-container').hasClass('active')) {
      hideAboutPage()
      $('main').show()
    } else {
      $('main').hide()
      hideSearchForm()
      showAboutPage()
    }
  })
})
