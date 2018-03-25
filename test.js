var tests = require('./tests')
var tape = require('tape')
var jsonolt = require('./')

tests.forEach(function (test) {
  tape(test.comment, function (t) {
    if (test.olt) {
      t.deepEqual(
        jsonolt.encode(test.json), test.olt,
        'encoding'
      )
    }
    t.deepEqual(
      jsonolt.decode(jsonolt.encode(test.json)),
      test.json,
      'round trip'
    )
    t.end()
  })
})
