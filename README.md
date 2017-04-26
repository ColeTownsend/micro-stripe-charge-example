# Micro Stripe Charge

Expects to receive a data object in a `POST` request from something like `checkout.js`. See the Stripe docs for more.

```
{
  "amount": 100,
  "currency": "usd",
  "source": "tok_FAKE1241", # generated token from card
  "description": "This is a description."
}
```

It takes the token and applies a charge with the amount from the POST request.

[Read the in depth tutorial](https://medium.com/@twnsndco/accept-payments-on-your-site-with-nextjs-stripe-and-micro-371de95b22d5)

## How to use:

### Deploying the back end
Steps to deploy the server that creates the charge given a json body like above.

1. `cd` into the `/api` folder and run `yarn install`.
2. Create an `.env` file matching `sample.env` with your Stripe secret key (test or otherwise).
3. Go to line 9 in `posts.js` and change `res.setHeader('Access-Control-Allow-Origin', 'https://micro-stripe.twnsnd.co');` to the origin of your choosing.
4. Run `now deploy --dotenv` to deploy this server
5. Copy down the domain

The microservice instance is now up and running. This works best with domains using [zeit.world](zeit.world) etc. because you need to know both the api domain and the static client side domain in order to make a secure `origin`. Otherwise you can just set the `Access-Control-Allow-Origin` to `'*'` but this allows any domain to make a request and is not as secure.

### Deploying the front end
Steps to deploy the static site that using Stripe's api to generate a token given card input. This example using the brand new [Stripe Elements](https://stripe.com/docs/elements) which allows you to customize your inputs but reap all the benefits of their error checking.

5. `cd` into the `/app` folder
6. Change the stripe token on `Line 219` to your Stripe public key
7. Change the ajax url on `Line 280` to the domain of the microservice you just deployed
6. Run `now` to deploy this static site
