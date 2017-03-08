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
