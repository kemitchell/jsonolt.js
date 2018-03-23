exports.encode = function recurse (argument, key) {
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
    children = argument.map(function (element) { return recurse(element) })
  } else /* if (Object.isObject(argument)) */ {
    children = Object.keys(argument).map(function (key) {
      return recurse(argument[key], key)
    })
  }
  return {
    label: {type: type, key: key, value: value},
    children: children
  }
}

exports.decode = function recurse (argument) {
  var label = argument.label
  var type = label.type
  var key = label.key
  var value = label.value
  var children = argument.children
  switch (type) {
  case 'null':
  case 'number':
  case 'string':
  case 'boolean':
    return key ? {key: key, value: value} : value
  case 'array':
    return children.map(recurse)
  case 'object':
    return children.reduce(function (returned, child) {
      var decoded = recurse(child)
      returned[decoded.key] = decoded.value
      return returned
    }, {})
  default:
    throw new Error('invalid type')
  }
}
