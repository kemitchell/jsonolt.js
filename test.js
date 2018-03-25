var examples = require('./tests')
var tape = require('tape')
var jsonolt = require('./')

examples.forEach(function (example) {
  tape(example.comment, function (t) {
    if (example.olt) {
      t.deepEqual(
        jsonolt.encode(example.json), example.olt,
        'encoding'
      )
    }
    t.deepEqual(
      jsonolt.decode(jsonolt.encode(example.json)),
      example.json,
      'round trip'
    )
    t.end()
  })
})
