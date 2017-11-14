/* API Documentation: https://www.mediawiki.org/wiki/API:Main_page & https://www.mediawiki.org/wiki/API:Query & https://www.mediawiki.org/wiki/API:Search & https://www.mediawiki.org/wiki/API:Search_and_discovery
      Query Parameters I can use:
      prop=extracts [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bextracts]
      prop=pageviews [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bpageviews]
      list=search [https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bsearch]

      Learn about redirects.

      How MediaWiki search works (read later):

        It searches all pages on the wiki with some restrictions.

        The article content is searched in its raw (wikitext) form - i.e.,
          it searches the text that appears in the edit box when you click "edit",
          not the rendered page. This means that content coming from an included
          template will not be picked up, but the target of piped links will be.

        The search is not case-sensitive, so 'MediaWiki', 'mediawiki' and 'MEDIAWIKI' all give the same result.

        The search functionality can be considered to operate on whole words, separated by spaces or other
          punctuation marks. So if your search term includes the word 'book', the results will not include
          pages that only have the word 'books' or 'booklet'. And if your search term includes the term 'inter',
          the results will not include pages that only have the word 'international', but they may include pages
          that have the term 'inter-national'.

        The results will only include pages that contain all the words in your search.
        You can search for a phrase using double quotes. A phrase can be considered to consist of whole words
          (case-insensitive), so the phrase 'Prime Minister' will not be found by a search for "ime Min",
          but it will be found by a search for "pRIME mINISTER".

*/
$('#search-form, #about').hide()
$(document).ready(function () {
  // SEARCH BUTTON:
  $('#search-btn').click(function () {
    if ($('#search-btn-container').hasClass('active')) {
      $('#search-form').slideUp()
      $('#search-btn-container').removeClass('active')
    } else {
      $('#about').hide()
      $('#about-btn-container').removeClass('active')
      $('#search-form').slideDown()
      $('#search-btn-container').addClass('active')
      $('main').show()
    }
  })
  // Search Input (ENTER keypress) + Wiki API:
  $('#search-input').on('keypress', function (e) {
    if (e.keyCode === 13) {
      let searchInput = document.getElementById('search-input').value
      console.log(searchInput)
      // API Call:
      let wikiTitle
      let wikiContent
      // Test Link: https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
      let APIlink = 'https://en.wikipedia.org/w/api.php' + '&format=json'
      $.ajax( {
        url: APIlink,
        data: queryData,
        dataType: 'json',
        type: 'POST',
        headers: { 'Api-User-Agent': 'Wikipedia-Viewer-freeCodeCamp/0.0' },
        success: function (json) {
        },
        error: function () {
          console.log('ERROR MESSAGE')
        }
    } );

      let wikiCard = {
        title: wikiTitle,
        content: wikiContent
      }
    }
  })

  // ABOUT BUTTON:
  $('#about-btn').click(function () {
    if ($('#about-btn-container').hasClass('active')) {
      $('#about').hide()
      $('#about-btn-container').removeClass('active')
      $('main').show()
    } else {
      $('main').hide()
      $('#search-form').slideUp()
      $('#search-btn-container').removeClass('active')
      $('#about').slideDown()
      $('#about-btn-container').addClass('active')
    }
  })
})
