const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');
const http = require('ava-http')
const micro = require('micro');
const post = require('micro-post');

// fake
const testService = micro(async (req, res) => {
  micro.send(res, 200, {
    test: 'woot'
  })
})

test('my fake endpoint', async t => {
  const url = await listen(testService)
  const body = await request(url)

  t.deepEqual(JSON.parse(body).test, 'woot')
})

// fake post
const testPostService = post(async (req, res) => {
  micro.send(res, 200, `It's a POST request!`);
})

test('my fake post endpoint', async t => {
  const url = await listen(testPostService);

  http.post(http.get(url)).then(res => {
    t.is(err.statusCode, 405);
  })
})

// Real deal
// const service = require('./index');

// test('my stripe endpoint', async t => {
//   const url = await listen(service);
//
//   const params = {
//     "amount": 100,
//     "currency": 'usd',
//     "source": 'test'
//   }
//
//   const options = {
//     method: 'POST',
//     uri: url,
//     json: true,
//     body: params,
//   }
//
//   const body = await request(options);
// })
