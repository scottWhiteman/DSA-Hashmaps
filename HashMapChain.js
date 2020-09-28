const Node = require('./Node');

class HashMapChain {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key Error');
    }
    return this._hashTable[index].value;
  }
  set(key, value) {
    const index = this._findSlot(key);

    let newNode = this._findNode(this._hashTable[index]);
    this.length++;
    if (newNode === undefined) {
      newNode = new Node(value, null);
      this._hashTable[index] = newNode;
    } else {
      newNode.next = new Node(value, null);
    }
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    const start = hash % this._capacity;
    return start;
  }
  _findNode(slot) {
    let curr = slot;
    if (curr === undefined) {
      return;
    }
    while (curr.next !== null) {
      curr = curr.next;
    }
    return curr;
  }
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
        if (slot !== undefined && !slot.DELETED) {
            this.set(slot.key, slot.value);
        }
    }
  }
}

module.exports = HashMapChain;