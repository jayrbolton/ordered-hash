# js ordered hash

An efficient ordered hash for javascript. Unlike with objects, each entry in the hash has an index. All methods are O(1) except for `remove`, which is an optimized O(n).

## create()

Create a new empty hash

```js
var Ohash = require('ordered-hash')
var h = Ohash.create()
```

O(1)

# Adding data

## push(key, val, hash), hash.push(key, val)

Insert a new key/value pair at the end of the hash. Throws an exception if the key already exists. Returns the hash.

```js
h.push('x', 'a')
Ohash.push('y', 'b', h)
```

O(1)

## unshift(key, val, hash), hash.unshift(key, val)

Insert a new key/value pair at the beginning. Will get index of 0. Unlike with arrays, this is O(1). Throws an exception if the key already exists. Returns the hash

```js
h.unshift('x', 'a')
Ohash.unshift('x', 'a', h)
```

O(1)

## set(key, val, hash), hash.set(key, val)

Set an existing key/value pair to a new value. Doesn't affect its index. Throws an exception if the key doesn't exist. Returns the hash

```js
h.set('x', 'b')
Ohash.set('x', 'b', h)
```

O(1)

# Getting data

## get(key, hash), hash.get(key)

Return the value for a key. Throws an exception if the key doesn't exist.

```js
var val = h.get('x')
var val = Ohash.get('x', h)
```

O(1)

## getIndex(key, hash), hash.getIndex(key)

Return the index for a key. Throws an exception if the key doesn't exist.

```js
var idx = h.getIndex('x')
var idx = Ohash.getIndex('x', h)
```

O(1)

## length(hash), hash.length()

Return the length of the hash

```js
var len = h.length()
var len = Ohash.length(h)
```

O(1)

# Moving data

## swap(key1, key2, hash), hash.swap(key1, key2)

Swap the indexes of two keys. Throws an exception if either key doesn't exist. Returns the hash.

```js
h.swap('x', 'y')
Ohash.swap('x', 'y', h)
```

O(1)

# Removing data

## shift(hash), hash.shift()

Remove the first key/value pair in the hash. Unlike with arrays, this is O(1). Throws an exception if the hash is empty. Returns a pair of the key and val.

```js
var [key, val] = h.shift()
var [key, val] = Ohash.shift(h)
```

O(1)

## pop(hash), hash.pop()

Remove the last key/value pair in the hash. Throws an exception if the hash is empty. Returns a pair of the key and val.

```js
var [key, val] = h.pop()
var [key, val] = Ohash.pop(h)
```

O(1)

## remove(key, hash), hash.remove(key)

Remove a key/value pair at any point in the hash. Will adjust the other indexes in the hash. Throws an exception if the key doesn't exist. Returns the val.

```js
var val = h.remove('x')
var val = Ohash.remove('x', h)
```

O(n) where n is the distance from the key's index to either the beginning or end of the hash, whichever is shorter.
