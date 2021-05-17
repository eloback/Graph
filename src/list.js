var max = 485;
var min = 15;

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

  percorre(função){
    let node = this.getFirst();
    while (node) {
      função(node);
      node = node.next;
    }
  }

  push(value){
    if (this.head)
        this.getLast().next = new ListNode(value);
    else this.head = new ListNode(value);
  }
  push(vertice, value){
    if (this.head)
        this.getLast().next = new ListNode(vertice, value);
    else this.head = new ListNode(vertice, value);
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
}

class Vertice {
  constructor(value, list, x = Math.random() * (max - min) + min, y= Math.random() * (max - min) + min) {
    this.value = value;
    this.links = list;
    this.x = x;
    this.y = y;
  }

  adicionarArco(vertice) {
      if (!this.links.searchNode(vertice))
        this.links.push(vertice);
  }
  adicionarArco(vertice, value) {
      if (!this.links.searchNode(vertice))
        this.links.push(vertice, value);
  }
  adicionarAresta(vertice) {
      if (!this.links.searchNode(vertice)) {
        this.links.push(vertice);
        vertice.adicionarAresta(this);
      }
  }
  adicionarAresta(vertice, value) {
      if (!this.links.searchNode(vertice)) {
        this.links.push(vertice, value);
        vertice.adicionarAresta(this, value);
      }
  }

  getLinks(){
    let arestas = []
    let lastNode = this.links.getFirst();
    while(lastNode){
      arestas.push({'value':lastNode.data.value, 'x':lastNode.data.x, 'y':lastNode.data.y, 'linkValue':lastNode.linkValue});
      lastNode = lastNode.next;
    }
    return arestas;
  }

  printValue(){
    let return_string = "";
    let lastNode = this.links.head;
      while (lastNode) {
        if(lastNode.linkValue)return_string += "("+this.value+","+lastNode.data.value+")["+lastNode.linkValue+"], ";
        else return_string += "("+this.value+lastNode.data.value+"), ";
        lastNode = lastNode.next;
      }
    return return_string;
  }
}

class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  // enqueue function
  enqueue(element) {
    // adding element to the queue
    this.items.push(element);
  }

  // dequeue function
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  // front function
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }

  // printQueue function
  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }


  remove(itemTarget){
    if (this.isEmpty() || !itemTarget) return null;
    this.items = this.items.filter((item)=>item.Destino.value!=itemTarget.value);
    return itemTarget;
  }

  clear(explored){
    this.items.forEach((item) => {
        explored.forEach((aresta)=>{
          if(item.Destino.value == aresta.value) this.remove(item.Destino);
        })
    });
  }

  fillQueue(vertice) { // Value / Links // Links = {data, linkValue, next}
    let node = vertice?.links.getFirst();
    while (node) {
      if(!this.items.forEach((item)=>{
        if(item.value == node.data.value){
          return false;
        }
      })){
      this.enqueue({
        Origem: vertice,
        Destino: node.data,
        Link_Value: node.linkValue,
      });
      }
      node = node.next;
    }
  }
  getMin(explored) {  // [ {Value / Links}, ... ] //
    let min;
    this.clear(explored);
    this.items.map((item) => {
        if (!min) min = item;
        else if (item.Link_Value < min.Link_Value)min = item;
    });
    return this.remove(min);
  }
}

function arrayTransformer(vertice){
  return {
    'value':vertice.value,
    'x':vertice.x,
    'y':vertice.y,
    'links': vertice.getLinks(),
  };
}

function printGrafo(grafo) {
  let return_string = "";
  grafo.map((aresta) => {
    return_string += aresta.printValue();
  });
  return return_string;
}

function PRIM(Grafo) {
  let size = Grafo.length;
  const MST = [];
  if (size === 0) {
    return MST;
  }
  let nodeAtual = Grafo[0];
  let queue = new Queue();
  let explored = [];
  // Take the smallest edge and add that to the new graph
  while (size != MST.length || !nodeAtual) {
    queue.fillQueue(nodeAtual);
    explored.push(nodeAtual);
    let minValue = queue.getMin(explored);
    if (minValue) {
      let entry = MST.find((element) => element.value == minValue.Origem.value);
      let dest = new Vertice(minValue.Destino.value, new LinkedList());
      if (!entry) {
        entry = new Vertice(minValue.Origem.value, new LinkedList());
        MST.push(entry);
      }
      MST.push(dest);
      entry.adicionarArco(dest, minValue.Link_Value);
      /* MST.push({
        link: [minValue.Origem.value, minValue.Destino.value],
        link_value: minValue.Link_Value,
      }); */
      nodeAtual = minValue.Destino;
    }
  }
  return MST;
}

function BFS(saida) {
  let queue = new Queue();
  let result = [];
  let explored = [];
  explored.push(saida);
  queue.enqueue(saida);
  while (!queue.isEmpty()) {
    let retorno;
    let v = queue.dequeue();
    v.links.percorre((node) => {
      vertice = node.data;
      if (!explored.find((explorado) => explorado === vertice)) {
        // w não explorado
        let entry = result.find((element) => element.value == v.value);
        let dest = new Vertice(vertice.value, new LinkedList());
        if (!entry) {
          entry = new Vertice(v.value, new LinkedList());
          result.push(entry);
        }
        result.push(dest);
        entry.adicionarArco(dest, node.linkValue);
        queue.enqueue(vertice);
        explored.push(vertice);
      } else {
        // if(v e w) não foi explorada
        //explorar(v, w)
      }
    });
  }
  return result;
}

function DFS_R(result, v, explored) {
  explored.push(v);
  v?.links.percorre((node) => {
    vertice = node.data;
    if (!explored.find((explorado) => explorado === vertice)) {
      // w não explorado
      let entry = result.find((element) => element.value == v.value);
      let dest = new Vertice(vertice.value, new LinkedList());
      if (!entry) {
        entry = new Vertice(v.value, new LinkedList());
        result.push(entry);
      }
      result.push(dest);
      entry.adicionarArco(dest, node.linkValue);
      DFS_R(result, vertice, explored);
    } else {
      // if(v e w) não foi explorada
      //explorar(v, w)
    }
  });
}

function DFS(saida) {
  let result = [];
  let explored = [];
  explored.push(saida);
  let v = saida;
  v.links.percorre((node) => {
    vertice = node.data;
    if (!explored.find((explorado) => explorado === vertice)) {
      // w não explorado
      let entry = result.find((element) => element.value == v.value);
      let dest = new Vertice(vertice.value, new LinkedList());
      if (!entry) {
        entry = new Vertice(v.value, new LinkedList());
        result.push(entry);
      }
      result.push(dest);
      entry.adicionarArco(dest, node.linkValue);
      DFS_R(result, vertice, explored);
    } else {
      // if(v e w) não foi explorada
      //explorar(v, w)
    }
  });
  console.log(result);
  return result;
}

function Roy(value, Grafo) {
  let result = [];
  let grafo = Grafo.slice();
  let vertice = value;

  for (var i = 0; grafo.length > 0; i++) {
    let explored_pos = [];
    let explored_neg = [];
    explored_pos.push(vertice);
    explored_neg.push(vertice);
    let change = true;
    let grafoIteravel = grafo.filter((v) => v != vertice);
    while (change) {
      change = false;
      grafoIteravel.map((ve) => {
        ve.links.percorre((v) => {
          if (!explored_pos.includes(ve)) {
            explored_pos.map((explorado) => {
              if (v.data == explorado) {
                explored_pos.push(ve);
                grafoIteravel = grafo.filter((vg) => vg != ve);
                change = true;
              }
            });
          }
        });
      });
    }
    change = true;
    grafoIteravel = [vertice];
    while (change) {
      change = false;
      grafoIteravel.map((ve) => {
        ve.links.percorre((v) => {
          if (!explored_neg.includes(v.data)) {
            change = true;
            explored_neg.push(v.data);
            grafoIteravel.push(v.data);
          }
        });
        grafoIteravel = grafoIteravel.filter((v) => v != ve);
      });
    }
    result.push(
      explored_pos.filter((vertice) => explored_neg.includes(vertice))
    );

    grafo = grafo.filter((vertice) => !result[i].includes(vertice));
    vertice = grafo[0];
  }
  result.forEach(solution=>solution.forEach(vertice=>{
    vertice.links.percorre((vn=>{
      if(!solution.includes(vn.data)) vertice.links.delete(vn.data.value);
    }));
  }));
  return result;
}


module.exports = { ListNode, LinkedList, Vertice, Queue, PRIM, BFS, DFS, Roy, arrayTransformer, printGrafo };
