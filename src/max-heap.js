const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeNumber = 0;
	}

	push(data, priority) {
		var node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.sizeNumber++;
	}

	pop() {
		if (!this.root) return false;

		let detach = this.detachRoot();
		
		this.restoreRootFromLastInsertedNode(detach);
		this.shiftNodeDown(this.root);
		this.sizeNumber--;
		return detach.data;
	}

	detachRoot() {
		let position = this.parentNodes.indexOf(this.root);
		if(position !== -1) this.parentNodes.splice(position, 1);
		var detach = this.root;
		this.root = null;
		return detach;
	}

	restoreRootFromLastInsertedNode(detached) {
		let indexLastNode = this.parentNodes.length-1;
		let lastNode = this.parentNodes[indexLastNode];
		if(!lastNode) return false;
		let parentLastNode = (lastNode) ? lastNode.parent : null;
		lastNode.remove();
		lastNode.left = detached.left;
		lastNode.right = detached.right;
		if(lastNode.left) lastNode.left.parent = lastNode;
		if(lastNode.right) lastNode.right.parent = lastNode;
		this.parentNodes.splice(indexLastNode,1);
		this.root = lastNode;
		if(this.root.right === null) this.parentNodes.unshift(this.root);
		if(parentLastNode && parentLastNode.parent !== null) this.parentNodes.unshift(parentLastNode);
	}

	size() {
		return this.sizeNumber;
	}

	isEmpty() {
		return (this.root === null) ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeNumber = 0;
	}

	insertNode(node) {
		this.parentNodes.push(node);
		if (this.root == null) {
			this.root = node;
		}else{
			let firstParent = this.parentNodes[0];
			firstParent.appendChild(node);
			if(firstParent.right !== null){
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if(node.parent) {
			if (node.parent.priority < node.priority) {
				if(node.right === null){
					let curentParentIndex = this.parentNodes.indexOf(node);
					let parentParentIndex = this.parentNodes.indexOf(node.parent);
					if(parentParentIndex !== -1){
						this.parentNodes[curentParentIndex] = this.parentNodes[parentParentIndex];
						this.parentNodes[parentParentIndex] = node;
					}else if(curentParentIndex !== -1){
						this.parentNodes[curentParentIndex] = node.parent;
					}
				}
			
			node.swapWithParent();
			this.shiftNodeUp(node);
			}
		}else {
			this.root = node;
		}
	}
	shiftNodeDown(node) {
		let leftChild = (node) ? node.left : null;
		let rightChild = (node) ? node.right : null;
			/*
		let checkArr = [node];
		if(leftChild) checkArr.push(leftChild);
		if(rightChild) checkArr.push(rightChild);
		checkArr.sort((a,b)=>(a.priority - b.priority > 0) ? -1 : 1);
		if(checkArr[0] == node) return false;

		this.correctParent(checkArr[0], node);
		checkArr[0].swapWithParent();
		this.shiftNodeDown(node);
*/
	
		if(leftChild && rightChild){
			if(leftChild.priority > rightChild.priority && leftChild.priority > node.priority){
				if(node.parent === null){
					this.root = node.left;
				}
				this.correctParent(leftChild, node);
				leftChild.swapWithParent();
				this.shiftNodeDown(node);
			} 
			if(rightChild.priority > leftChild.priority && rightChild.priority > node.priority){
				if(node.parent === null){
					this.root = rightChild;
				}
				this.correctParent(rightChild, node);
				rightChild.swapWithParent();
				this.shiftNodeDown(node);
			}
		}else{
			if(leftChild && leftChild.priority > node.priority){
				if(node.parent === null){
					this.root = node.left;
				}
				this.correctParent(leftChild, node);
				leftChild.swapWithParent();
				this.shiftNodeDown(node);
			} 
			if(rightChild && rightChild.priority > node.priority){
				if(node.parent === null){
					this.root = rightChild;
				}
				this.correctParent(rightChild, node);
				rightChild.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
	correctParent(node , parent){
		let positionNode = this.parentNodes.indexOf(node);
		let positionParent = this.parentNodes.indexOf(parent);
		if(positionNode !== -1 && positionParent !== -1){
				this.parentNodes[positionParent] = node;
				this.parentNodes[positionNode] = parent;
		}else if(positionNode !== -1){
			this.parentNodes[positionNode] = parent;
		}
	}
}
module.exports = MaxHeap;
