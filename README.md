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
    path: [],
    label: {type: 'object'},
    children: [
      {
        path: ['a'],
        label: {key: 'a', type: 'string', value: 'x'}
      },
      {
        path: ['b'],
        label: {key: 'b', type: 'null', value: null}
      },
      {
        path: ['c'],
        label: {key: 'c', type: 'array'},
        children: [
          {
            path: ['c', 0],
            label: {type: 'number', 'value': 42}
          }
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

This package is free to use in open source under the terms of [Parity Public License](./LICENSE).

Licenses for use in closed software are available via [licensezero.com](https://licensezero.com).

[![licensezero.com pricing](https://licensezero.com/projects/070801d5-59f1-46ed-bb38-f5aaaa459fb8/badge.svg)][https://licensezero.com/projects/070801d5-59f1-46ed-bb38-f5aaaa459fb8]