const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.maxSize === this.size()) throw new Error("MAX SIZE");
		this.heap.push(data, priority);
	}

	shift() {
		if(this.size() === 0) throw new Error("queue is empty");
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
