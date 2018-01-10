const moment = require('moment')

module.exports = {
  
  getTimestamp (req, res) {
    let unixTimestamp
    let naturalDate
    let status

    if (moment(req.params.date * 1000).isValid() || moment(req.params.date).isValid()) {
      status = 'Success.'

      // Calculate timestamp from natural dates:
      unixTimestamp = Math.floor(new Date(req.params.date.toString()) / 1000)

        // If the user input is a unix timestamp, serve the input instead:
        if (!unixTimestamp)
          unixTimestamp = Number(req.params.date)

      // Calculate natural date from unix timestamps:
      naturalDate = new Date(req.params.date * 1000).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
        // If the user input is a natural date, serve the input instead:
        if (naturalDate === 'Invalid Date' || naturalDate === 'Invalid date')
          naturalDate = moment(req.params.date).format('MMMM DD, YYYY')
    } else {
      status = 'Error: Please, input a valid unix timestamp or a natural language date (example: January 10, 2018).'
      unixTimestamp = null   
      naturalDate = null
    }

    res.send({
      "status": status,
      "input": req.params.date,
      "response": {
        "unix": unixTimestamp,
        "natural": naturalDate
      }
    })
  }
  
}
