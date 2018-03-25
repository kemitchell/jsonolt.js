var examples = require('./tests')
var tape = require('tape')
var jsonolt = require('./')

examples.forEach(function (example) {
  tape(example.comment, function (t) {
    t.deepEqual(
      jsonolt.decode(
        jsonolt.encode(
          example.value
        )
      ),
      example.value
    )
    t.end()
  })
})
