class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null){
			this.left = node;
			node.parent = this;
		}else if(this.right === null){
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node){
			this.left = null;
			node.parent = null;
		}else if(this.right === node){
			this.right = null;
			node.parent = null;
		}else{
			throw new Error("Incorrect node"); // вылетит в консоль
		}
	}

	remove() {
		if(this.parent === null) return false;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent === null) return false;
		let oldParent = this.parent;
		let oldParentParent = this.parent.parent;
		let oldParentLeft = this.parent.left;
		let oldParentRight = this.parent.right;
		this.parent.parent = this;
		this.parent = oldParentParent;
		
		oldParent.left = this.left;
		oldParent.right = this.right;

		if(oldParentLeft == this){
			this.left = oldParent;
			this.right = oldParentRight;
		}else{
			this.left = oldParentLeft;
			this.right = oldParent;
		}
		if(this.left) this.left.parent = this;
		if(this.right) this.right.parent = this;
		if(this.parent !== null){
			if(this.parent.left == oldParent){
				this.parent.left = this;
			}else{
				this.parent.right = this;
			}
		}
	}
}

module.exports = Node;
