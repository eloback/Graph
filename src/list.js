var max = 485;
var min = 15;

class ListNode {
  constructor(data, value = null) {
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

  delete(value) {
    let node = this.head;
    let nodeAnt;
    while (node) {
      if (node.data.value == value) {
        if (nodeAnt) {
          nodeAnt.next = null;
          if (node.next) {
            nodeAnt.next = node.next;
          }
        } else {
          if (node.next) {
            this.head = node.next;
          } else {
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

  percorre(função) {
    let node = this.getFirst();
    while (node) {
      função(node);
      node = node.next;
    }
  }

  hasColor(cor) {
    let node = this.getFirst();
    while (node) {
      if (node.data.color === cor) return true;
      node = node.next;
    }
    return false;
  }

  push(value) {
    if (this.head)
      this.getLast().next = new ListNode(value);
    else this.head = new ListNode(value);
  }
  push(vertice, value) {
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
  constructor(value, list, x = Math.random() * (max - min) + min, y = Math.random() * (max - min) + min, color = null, latitude = null, longitude = null) {
    this.value = value;
    this.links = list;
    this.color = color;
    this.x = x;
    this.y = y;
    this.latitude = latitude;
    this.longitude = longitude;
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

  getLinks() {
    let arestas = []
    let lastNode = this.links.getFirst();
    while (lastNode) {
      arestas.push({
        'value': lastNode.data.value,
        'x': lastNode.data.x,
        'y': lastNode.data.y,
        'linkValue': lastNode.linkValue
      });
      lastNode = lastNode.next;
    }
    return arestas;
  }

  printValue() {
    let return_string = "";
    let lastNode = this.links.head;
    while (lastNode) {
      if (lastNode.linkValue) return_string += "(" + this.value + "," + lastNode.data.value + ")[" + lastNode.linkValue + "], ";
      else return_string += "(" + this.value + lastNode.data.value + "), ";
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


  remove(itemTarget) {
    if (this.isEmpty() || !itemTarget) return null;
    this.items = this.items.filter((item) => item.Destino.value != itemTarget.value);
    return itemTarget;
  }

  clear(explored) {
    this.items.forEach((item) => {
      explored.forEach((aresta) => {
        if (item.Destino.value == aresta.value) this.remove(item.Destino);
      })
    });
  }

  fillQueue(vertice) { // Value / Links // Links = {data, linkValue, next}
    let node = vertice?.links.getFirst();
    while (node) {
      if (!this.items.forEach((item) => {
          if (item.value == node.data.value) {
            return false;
          }
        })) {
        this.enqueue({
          Origem: vertice,
          Destino: node.data,
          Link_Value: node.linkValue,
        });
      }
      node = node.next;
    }
  }
  getMin(explored) { // [ {Value / Links}, ... ] //
    let min;
    this.clear(explored);
    this.items.map((item) => {
      if (!min) min = item;
      else if (item.Link_Value < min.Link_Value) min = item;
    });
    return this.remove(min);
  }
}

function arrayTransformer(vertice) {
  return {
    'value': vertice.value,
    'x': vertice.x,
    'y': vertice.y,
    'color': vertice.color,
    'links': vertice.getLinks(),
    'h': vertice.h,
    'parent': vertice.parent ? arrayTransformer(vertice.parent) : null,
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

function WelshPowell(Grafo) {
  const colors = ['#eb4034', '#3af0cb', '#df66e8', '#3ade55', '#f0ed30', '#287a3c'];
  Grafo.forEach((ve) => ve.color = null);
  var len = Grafo.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (Grafo[j - 1].links.size() < Grafo[j].links.size()) {
        var temp = Grafo[j - 1];
        Grafo[j - 1] = Grafo[j];
        Grafo[j] = temp;
      }
    }
  }
  var l = 0;
  while (l - 1 < colors.length) {
    Grafo.forEach((vertice) => {
      if (vertice.color === null && !vertice.links.hasColor(colors[l])) vertice.color = colors[l];
    });
    l++;
  }
  return Grafo;
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
  result.forEach(solution => solution.forEach(vertice => {
    vertice.links.percorre((vn => {
      if (!solution.includes(vn.data)) vertice.links.delete(vn.data.value);
    }));
  }));
  return result;
}

function heuristic(pos0, pos1) {
  // This is the Manhattan distance
  var d1 = Math.abs(pos1.x - pos0.x);
  var d2 = Math.abs(pos1.y - pos0.y);
  return d1 + d2;
}

function shortestPath(Grafo, start, target) {
  let open = []
  let closed = []
  Grafo.forEach(vertice=>{
    vertice.h = heuristic({
      x: vertice.latitude,
      y: vertice.longitude
    }, {
      x: target.latitude,
      y: target.longitude
    });
  })
  open.push(Grafo.find((e) => e === start));
  while (open.length > 0) {
    let current = null;
    for (vertice of open) {
      if (current === null) {
        current = vertice;
      }else if(current?.g < vertice?.g){
        current = vertice;
      }
    }
    closed.push(current);
    open = open.filter((e) => e !== current);
    if ((current.latitude === target.latitude) && (current.longitude === target.longitude)) {
      var ret = [];
      while (current.parent) {
        ret.push(current);
        current = current.parent;
      }
      return {
        caminho: ret.reverse(),
        tabela: Grafo
      };
    } // retorna tabela
    current.links.percorre((link) => {
      if (!closed.includes(link.data)) {
        var gScore = (link.data?.g || 0) + link.linkValue; // 1 is the distance from a node to it's neighbor
        var gScoreIsBest = false;
        const isInOpen = open.includes(link.data);
        if (!isInOpen) { // new_path to link is shorter
          gScoreIsBest = true;
          link.data.h = heuristic({
            x: link.data.latitude,
            y: link.data.longitude
          }, {
            x: target.latitude,
            y: target.longitude
          });
          open.push(link.data);
        } else if (gScore < link.data.g) {
          gScoreIsBest = true //set f_cost of link; G = how far it's from start  // H = how far it's from target
          //set parent of link to current
        }
        if (gScoreIsBest) {
          // Found an optimal (so far) path to this node.   Store info on how we got here and
          //  just how good it really is...
          link.data.parent = current;
          link.data.g = gScore;
          link.data.f = link.data.g + link.data.h;
          link.data.debug = "F: " + link.data.f + "<br />G: " + link.data.g + "<br />H: " + link.data.h;
        }
      }
    });
  }
}


module.exports = {
  ListNode,
  LinkedList,
  Vertice,
  Queue,
  PRIM,
  BFS,
  DFS,
  Roy,
  arrayTransformer,
  printGrafo,
  WelshPowell,
  shortestPath
};
