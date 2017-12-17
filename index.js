var OrderedHash = {}
module.exports = OrderedHash

OrderedHash.create = create
function create () {
  var hash = {indexes: {}, vals: {}, keys: {}, last: -1, first: 0, offset: 0}
  hash.push = function (key, val) { return push(key, val, hash) }
  hash.unshift = function (key, val) { return unshift(key, val, hash) }
  hash.pop = function () { return pop(hash) }
  hash.shift = function () { return shift(hash) }
  hash.set = function (key, val) { return set(key, val, hash) }
  hash.get = function (key) { return get(key, hash) }
  hash.getIndex = function (key) { return getIndex(key, hash) }
  hash.swap = function (key1, key2) { return swap(key1, key2, hash) }
  hash.remove = function (key) { return remove(key, hash) }
  hash.length = function () { return length(hash) }
  return hash
}

OrderedHash.push = push
function push (key, val, hash) {
  if (hash.indexes.hasOwnProperty(key)) throw new Error('Already has key: ' + key)
  var idx = hash.last + 1
  hash.indexes[key] = idx
  hash.vals[idx] = val
  hash.keys[idx] = key
  hash.last += 1
  return hash
}

OrderedHash.pop = pop
function pop (hash) {
  if (length(hash) === 0) throw new Error('Hash is empty')
  var idx = hash.last
  hash.last -= 1
  var key = hash.keys[idx]
  var val = hash.vals[idx]
  delete hash.indexes[key]
  delete hash.vals[idx]
  delete hash.keys[idx]
  return val
}

OrderedHash.shift = shift
function shift (hash) {
  if (length(hash) === 0) throw new Error('Hash is empty')
  var idx = hash.first
  hash.first += 1
  hash.offset -= 1
  var key = hash.keys[idx]
  var val = hash.vals[idx]
  delete hash.indexes[key]
  delete hash.vals[idx]
  delete hash.keys[idx]
  return val
}

OrderedHash.unshift = unshift
function unshift (key, val, hash) {
  if (hash.indexes.hasOwnProperty(key)) throw new Error('Already has key: ' + key)
  hash.offset += 1
  var idx = hash.first - 1
  hash.indexes[key] = idx
  hash.vals[idx] = val
  hash.keys[idx] = key
  hash.first -= 1
  return hash
}

OrderedHash.set = set
function set (key, val, hash) {
  if (!hash.indexes.hasOwnProperty(key)) throw new Error('Key does not exist: ' + key)
  var idx = hash.indexes[key]
  hash.vals[idx] = val
  return hash
}

OrderedHash.get = get
function get (key, hash) {
  if (!hash.indexes.hasOwnProperty(key)) throw new Error('Key does not exist: ' + key)
  var idx = hash.indexes[key]
  return hash.vals[idx]
}

OrderedHash.getIndex = getIndex
function getIndex (key, hash) {
  if (!hash.indexes.hasOwnProperty(key)) throw new Error('Key does not exist: ' + key)
  return hash.indexes[key] + hash.offset
}

OrderedHash.swap = swap
function swap (key1, key2, hash) {
  if (!hash.indexes.hasOwnProperty(key1)) throw new Error('Key does not exist: ' + key1)
  if (!hash.indexes.hasOwnProperty(key2)) throw new Error('Key does not exist: ' + key2)
  var idx1 = hash.indexes[key1]
  var idx2 = hash.indexes[key2]
  var val1 = hash.vals[idx1]
  var val2 = hash.vals[idx2]
  hash.indexes[key1] = idx2
  hash.indexes[key2] = idx1
  hash.vals[idx1] = val2
  hash.vals[idx2] = val1
  hash.keys[idx1] = key2
  hash.keys[idx2] = key1
  return hash
}

OrderedHash.remove = remove
function remove (key, hash) {
  if (!hash.indexes.hasOwnProperty(key)) throw new Error('Key does not exist: ' + key)
  var idx = hash.indexes[key]
  delete hash.indexes[key]
  delete hash.vals[idx]
  delete hash.keys[idx]
  var limit
  var incr
  var compare
  if (hash.last - idx < hash.first + idx) {
    // closer to end
    limit = hash.last
    incr = 1
    hash.last -= 1
    compare = function (i) { return i < limit }
  } else {
    // closer to beginning
    limit = hash.first
    incr = -1
    hash.offset -= 1
    hash.first += 1
    compare = function (i) { return i > limit }
  }
  for (var i = idx; compare(i); i += incr) {
    if (hash.vals[i + incr]) {
      hash.vals[i] = hash.vals[i + incr]
      hash.indexes[hash.keys[i + incr]] = i
      hash.keys[i] = hash.keys[i + incr]
    }
  }
  delete hash.vals[limit]
  delete hash.keys[limit]
  return hash
}

OrderedHash.length = length
function length (hash) {
  return hash.last - hash.first + 1
}
