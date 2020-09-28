class _Node {
    constructor(value, next) {
        this.value = value;
        this.DELETED = false;
        this.next = next;
    }
}

module.exports = _Node;