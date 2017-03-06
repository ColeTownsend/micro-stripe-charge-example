require('dotenv').config();
const {send, json} = require('micro');
const post = require('micro-post');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = post(async (req, res) => {
  const data = await json(req);

  stripe.charges.create(data, (err, resp) => {
    if (err) {
      send(res, 400, {error: `Charge could not be created.`})
    }
    else {
      send(res, 200, `It's a POST request!`)
    }
  })
})
