exports.encode = function (argument) { return encode(argument, []) }

function encode (argument, path) {
  var type = typeof argument
  var children, value
  if (argument === null) {
    type = 'null'
    value = null
  } else if (
    type === 'number' ||
    type === 'string' ||
    type === 'boolean'
  ) {
    value = argument
  } else if (Array.isArray(argument)) {
    type = 'array'
    children = argument.map(function (element, index) {
      return {
        label: {
          type: 'index',
          value: index
        },
        path: path,
        children: [
          encode(argument[index], path.concat(index))
        ]
      }
    })
  } else /* if (Object.isObject(argument)) */ {
    children = Object.keys(argument)
      .sort()
      .map(function (key) {
        return {
          label: {
            type: 'key',
            value: key
          },
          path: path,
          children: [
            encode(argument[key], path.concat(key))
          ]
        }
      })
  }
  var returned = {
    label: {type: type},
    path: path
  }
  if (value !== undefined) returned.label.value = value
  if (children) returned.children = children
  return returned
}

exports.decode = function recurse (argument) {
  var label = argument.label
  var type = label.type
  var value = label.value
  var children = argument.children
  switch (type) {
    case 'null':
    case 'number':
    case 'string':
    case 'boolean':
      return value
    case 'array':
      return children.map(function (indexChild) {
        return recurse(indexChild.children[0])
      })
    case 'object':
      return children.reduce(function (returned, keyChild) {
        var key = keyChild.label.value
        var decoded = recurse(keyChild.children[0])
        returned[key] = decoded
        return returned
      }, {})
    default:
      throw new Error('invalid type')
  }
}
