exports.encode = function (argument) { return encode(argument, []) }

function encode (argument, path, key) {
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
      return encode(element, path.concat(index))
    })
  } else /* if (Object.isObject(argument)) */ {
    children = Object.keys(argument)
      .sort()
      .map(function (key) {
        return encode(argument[key], path.concat(key), key)
      })
  }
  var returned = {
    label: {type: type},
    path: path
  }
  if (key) returned.label.key = key
  if (value !== undefined) returned.label.value = value
  if (children) returned.children = children
  return returned
}

exports.decode = function recurse (argument) {
  var label = argument.label
  var type = label.type
  var key = label.key
  var value = label.value
  var children = argument.children
  var recursed
  switch (type) {
    case 'null':
    case 'number':
    case 'string':
    case 'boolean':
      return key ? {key: key, value: value} : value
    case 'array':
      recursed = children.map(recurse)
      return key ? {key: key, value: recursed} : recursed
    case 'object':
      recursed = children.reduce(function (returned, child) {
        var decoded = recurse(child)
        returned[decoded.key] = decoded.value
        return returned
      }, {})
      return key ? {key: key, value: recursed} : recursed
    default:
      throw new Error('invalid type')
  }
}
