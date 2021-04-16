class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }
  clear() {
    this.head = null;
  }
  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }
  getFirst() {
    return this.head;
  }

  delete(value){
    let node = this.head;
    let nodeAnt;
    while (node) {
      if(node.data.value == value){
        if(nodeAnt){
          nodeAnt.next = null;
          if(node.next){
          nodeAnt.next = node.next;
          }
        }else{
          if(node.next){
            this.head = node.next;
          }else{
            this.head = null;
          }
        }
      }
      nodeAnt = node;
      node = node.next;
    }
  }
  view() {
    let node = this.head;
    let txt = "";
    while (node) {
      txt += node.data.value;
      node = node.next;
    }
    return txt;
  }

  push(value){
    if (this.head)
        this.getLast().next = new ListNode(value);
    else this.head = new ListNode(value);
  }

  searchNode(value) {
    let node = this.head;
    while (node) {
      if (value === node.data) return node;
      node = node.next;
    }
    return false;
  }
  searchVertice(value) {
    let node = this.head;
    while (node) {
      if (value === node.data.value) return node.data;
      node = node.next;
    }
    return false;
  }
}

class Vertice {
  constructor(value, list) {
    this.value = value;
    this.links = list;
  }

  adicionarArco(vertice) {
    if (this.links.head)
      if (!this.links.searchNode(vertice))
        this.links.getLast().next = new ListNode(vertice);
      else this.links.head = new ListNode(vertice);
    else{
      this.links.head = new ListNode(vertice);
    }
  }
  adicionarAresta(vertice) {
    if (this.links.head) {
      if (!this.links.searchNode(vertice)) {
        this.links.getLast().next = new ListNode(vertice);
        vertice.adicionarAresta(this);
      }
    } else {
      this.links.head = new ListNode(vertice);
      vertice.adicionarAresta(this);
    }
  }

  print(){
    let return_string = "";
    let lastNode = this.links.head;
    if (lastNode) {
      while (lastNode) {
        return_string += this.value+lastNode.data.value+", ";
        lastNode = lastNode.next;
      }
    }
    return return_string;
  }
}
module.exports = { ListNode, LinkedList, Vertice };
