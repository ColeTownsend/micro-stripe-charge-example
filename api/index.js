require('dotenv').config();
const {send, json} = require('micro');
const post = require('./post');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = post(async (req, res) => {
  const data = await json(req);

  stripe.charges.create(data, (err, resp) => {
    if (err) {
      send(res, 400, {message: `Charge could not be created.`})
    }
    else {
      send(res, 200, {message: `Charge created.`})
    }
  })
})
