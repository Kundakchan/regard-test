function parseObject (record) {
  if (Array.isArray(record)) {
    return record.map(item => booleanToInt(item))
  } else {
    return Object.keys(record).reduce((acc, curr) => {
      acc[curr] = booleanToInt(record[curr])
      return acc
    }, {})
  }
}

export function booleanToInt (record) {
  switch (typeof record) {
    case 'boolean':
      return Number(record)
    case 'object':
      return parseObject(record)
    default:
      return record
  }
}


function getData(record, keys) {
  if (Array.isArray(record)) {
    return structuredClone([record[keys[0]]])
  } else {
    return structuredClone ({ [keys[0]]: record[keys[0]] })
  }
}

function trimString(str) {
  return str
    .split('.')
    .filter((item, index) => index > 0)
    .join('.')
}

export function copy (record, keys) {
  if (!keys || !keys.length) return
  if (typeof record !== 'object') return record
  if(keys.length === 1 && keys[0] && typeof keys[0] === 'string') {
    if (keys[0].length === 1) {
      return getData(record, keys)
    } else if (keys[0].length > 1) {
      const property = keys[0][0]
      const param = trimString(keys[0])
      return { [property]: copy(record[property], [param])}
    }
  }
  const data = {}
  keys.forEach(key => {
    if (key.length === 1) {
      data[key] = copy(record[key], [key])
    } else if (key.length > 1) {
      const property = key[0] 
      const param = trimString(key)
      data[property] = copy(record[property], [param])
    }
  })

  return data
}