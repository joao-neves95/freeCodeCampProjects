$(document).ready(function () {
  // NEW QUOTE Button:
  $('#get-new-quote').on('click', function () {
    // Quotes On Design API:
    $.ajax({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      success: function (json) {
        var post = json.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-content').html(post.content)
        $('#quote-title').html(post.title)

        // Reset the Twitter Share Button Link:
        document.getElementById('twitter-share-btn').attributes['href'].value = 'https://twitter.com/intent/tweet?hashtags=quotes,quote,shivayl&text='

        // Add the quote content to the Twitter Share Button Link:
        let splitedContent = post.content.split(' ')

          // Remove the paragraph tags from the begininng and end of the quote that comes from the API:
        splitedContent[0] = splitedContent[0].substring(3)
        let lastSplitedContent = splitedContent[splitedContent.length - 1]
        splitedContent[splitedContent.length - 1] = lastSplitedContent.substring(0, lastSplitedContent.length - 5)
        let joinedContent = splitedContent.join('%20')

        document.getElementById('twitter-share-btn').attributes['href'].value += joinedContent

        // If the API Source is unavailable:
        if (typeof post.custom_meta === 'undefined' && typeof post.custom_meta.Source === 'undefined') {
          $('#quote-content').html('The API is unavailable')
          $('#quote-title').html('')
        }
      },
      cache: false
    })

    // Change Theme Color:
    $('body').removeClass().addClass(function () {
      let keys = Object.keys(themes)
      // Get a random key from themes:
      let randomTheme = themes[keys[Math.floor(Math.random() * keys.length)]]
      return randomTheme.BG + ' ' + randomTheme.text
    })
  })
  // End of NEW QUOTE Button.

  // Themes:
  let Theme = function (bgColor, textColor) {
    this.BG = bgColor
    this.text = textColor
  }

  let themes = {
    blueTheme: new Theme('bg-primary', 'text-primary'),
    greenTheme: new Theme('bg-success', 'text-success'),
    redTheme: new Theme('bg-danger', 'text-danger'),
    yellowTheme: new Theme('bg-warning', 'text-warning'),
    lightBlueTheme: new Theme('bg-info', 'text-info'),
    whiteTheme: new Theme('bg-white', 'text-dark'),
    greyTheme: new Theme('bg-secondary', 'text-secondary'),
    darkTheme: new Theme('bg-dark', 'text-dark')
  }
  // End of Themes.
})
