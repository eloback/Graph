const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const PORT = process.env.PORT || 3000;

const { ListNode, LinkedList, Vertice } = require("./list");
/*  Como Criar um Grafo
  let A = new Vertice('A', new LinkedList())
  let B = new Vertice('B', new LinkedList())
  let C = new Vertice('C', new LinkedList())
  let D = new Vertice('D', new LinkedList())

  A.adicionarArco(B)
  A.adicionarArco(C)
  B.adicionarArco(C)
  D.adicionarArco(C)

  let graph = [A, B, C, D] */
var Grafo = new LinkedList();

function printGrafo(grafo) {
  let return_string = "";
  let lastNode = Grafo.head;
  if (lastNode) {
    while (lastNode) {
      return_string += lastNode.data.printValue();
      lastNode = lastNode.next;
    }
  }
  return return_string;
}

/* function PRIM(grafo){
  let Gsize = grafo.size();
  const MST = new LinkedList();
   if (Gsize === 0) {
      return MST;
   }


   // Select first node as starting node
   let s = grafo.getFirst()


   // Create a Priority Queue and explored set
   let edgeQueue = new PriorityQueue(Gsize * Gsize);
   let explored = new Set();
   explored.add(s);
   MST.push(s);


   // Add all edges from this starting node to the PQ taking weights as priority
  let node = grafo.getFirst().data.links.getFirst();
  while (node) {
    edgeQueue.push([s, node.data], node.linkValue);
    node = node.next;
  }


   // Take the smallest edge and add that to the new graph
   let currentMinEdge = edgeQueue.dequeue();
   while (!edgeQueue.isEmpty()) {


      // COntinue removing edges till we get an edge with an unexplored node
      while (!edgeQueue.isEmpty() && explored.has(currentMinEdge.data[1])) {
         currentMinEdge = edgeQueue.dequeue();
      }
      let nextNode = currentMinEdge.data[1];


      // Check again as queue might get empty without giving back unexplored element
      if (!explored.has(nextNode)) {
         MST.addNode(nextNode);
         MST.addEdge(currentMinEdge.data[0], nextNode, currentMinEdge.priority);
         // Again add all edges to the PQ
         this.edges[nextNode].forEach(edge => {
            edgeQueue.enqueue([nextNode, edge.node], edge.weight);
         });


         // Mark this node as explored explored.add(nextNode);
         s = nextNode;
      }
   }
   return MST;
} */


const app = express();
//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(app.get("views") + "/index.html")));
});

app.get("/api/get", (req, res) => {
  res.send([printGrafo(Grafo), Grafo.view()]);
});

app.post("/api/insert", (req, res) => {
  //Utiliza Origin/target já existente?
  let usingOrigin = false;
  let usingTarget = false;
  // body parser do request
  const originName = req.body.Oname;
  const targetName = req.body.Dname;
  const value = req.body.value;
  const tipo = req.body.tipo;
  const valorado = req.body.valorado;
  // declara Vertices
  let Ve = new Vertice(originName, new LinkedList());
  let Ve2 = new Vertice(targetName, new LinkedList());
  if (Grafo) {
    //////////////////////////////////  Verifica se vertice já existe no array
    let VeP = Grafo.searchVertice(Ve.value);
    let Ve2P = Grafo.searchVertice(Ve2.value);
    if (VeP) {
      usingOrigin = true;
      Ve = VeP;
    }
    if (Ve2P) {
      usingTarget = true;
      Ve2 = Ve2P;
    }
  }

  //criação das arestas arcos e inserção no Grafo
  if (Ve.value != "" && Ve2.value != "") {
    ////////////////  se nenhum dos vertices é vazio cria uma aresta/arco
    if (valorado != "true") {
      console.log("not Valorado")
      if (tipo == "true") Ve.adicionarArco(Ve2);
      else Ve.adicionarAresta(Ve2);
    }else{
      console.log("Valorado")
      if (tipo == "true") Ve.adicionarArco(Ve2, value);
      else Ve.adicionarAresta(Ve2, value);
    }
  }
  console.log(Ve)
  if (!usingOrigin && Ve.value != "") Grafo.push(Ve); ////  se não existe e não é vazio adiciona no array
  if (!usingTarget && Ve2.value != "") Grafo.push(Ve2);

  /*  let node = Grafo.getFirst();
  console.log(Grafo.size());
  while (node) {
    if (node.data.links)
      console.log(node.data.value + " " + node.data.links.size());
    else console.log("fail " + node.data.value);
    node = node.next;
  } */

  res.redirect("/");
});

app.post("/api/remove", (req, res) => {
  const originName = req.body.Oname;
  const targetName = req.body.Dname;
  const tipo = req.body.tipo;
  const removeVertice = req.body.delete_type; // Aresta/arco ou vertice
  let Ve = Grafo.searchVertice(originName);
  if (removeVertice) {
    if (Ve) {
      let node = Grafo.getFirst();
      while (node) {
        node.data.links.delete(Ve.value);
        node = node.next;
      }
      Grafo.delete(Ve.value);
    }
  } else {
    let Ve2 = Grafo.searchVertice(targetName);
    if (Ve2) {
      if (tipo) {
        Ve.links.delete(Ve2.value);
      } else {
        Ve.links.delete(Ve2.value);
        Ve2.links.delete(Ve.value);
      }
    }
  }
  res.redirect("/");
});

app.get("/api/reset", (req, res) => {
  Grafo = new LinkedList();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Listening in port 3000");
});
