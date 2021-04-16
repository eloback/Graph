class ListNode {
  constructor(data , value = null) {
    this.data = data;
    this.linkValue = value;
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
  searchVertice(value) { /// Search in links
    let node = this.head;
    while (node) {
      if (value === node.data.value) return node.data;
      node = node.next;
    }
    return false;
  }
  getByValue(value){ // Search in Lists
    let node = this.head;
    while (node) {
      if(node.linkValue === value) return node;
      node = node.next;
    }
    return false;
  }
  getMinLink(explored){
    let node = this.head;
    let min;
    while (node) {
      if(!(min) && !explored.contains(node.linkValue)) min = node
      else if(node.linkValue < min && !explored.contains(node.linkValue)) min = node;
      node = node.next;
    }
    return min;
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
  adicionarArco(vertice, value) {
    if (this.links.head)
      if (!this.links.searchNode(vertice))
        this.links.getLast().next = new ListNode(vertice, value);
      else this.links.head = new ListNode(vertice, value);
    else{
      this.links.head = new ListNode(vertice, value);
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
  adicionarAresta(vertice, value) {
    if (this.links.head) {
      if (!this.links.searchNode(vertice)) {
        this.links.getLast().next = new ListNode(vertice, value);
        vertice.adicionarAresta(this, value);
      }
    } else {
      this.links.head = new ListNode(vertice, value);
      vertice.adicionarAresta(this, value);
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

  printValue(){
    let return_string = "";
    let lastNode = this.links.head;
    if (lastNode) {
      while (lastNode) {
        if(lastNode.linkValue)return_string += "("+this.value+","+lastNode.data.value+")["+lastNode.linkValue+"], ";
        else return_string += "("+this.value+lastNode.data.value+"), ";
        lastNode = lastNode.next;
      }
    }
    return return_string;
  }
}
module.exports = { ListNode, LinkedList, Vertice };
