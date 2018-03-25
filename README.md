# Usage

```javascript
var jsonolt = require('jsonolt')
var assert = require('assert')

var example = {
  a: 'x',
  b: null,
  c: [42]
}

assert.deepStrictEqual(
  jsonolt.encode(example),
  {
    label: {type: 'object'},
    children: [
      {label: {key: 'a', type: 'string', value: 'x'}},
      {label: {key: 'b', type: 'null', value: null}},
      {
        label: {key: 'c', type: 'array'},
        children: [
          {label: {type: 'number', 'value': 42}}
        ]
      }
    ]
  }
)

assert.deepEqual(
  jsonolt.decode(jsonolt.encode(example)),
  example
)
```

# Licensing

This package is to free to use for open source under the terms of the [License Zero Reciprocal Public License](./LICENSE).

Licenses for closed and proprietary use are available [via licensezero.com][project].

[![L0](https://licensezero.com/projects/070801d5-59f1-46ed-bb38-f5aaaa459fb8/badge.svg)][project]

[project]: https://licensezero.com/projects/070801d5-59f1-46ed-bb38-f5aaaa459fb8
