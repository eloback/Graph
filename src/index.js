const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const PORT = process.env.PORT || 3000;

const { ListNode, LinkedList, Vertice, Queue } = require("./list");

/// Como Criar um Grafo
let A = new Vertice("A", new LinkedList());
let B = new Vertice("B", new LinkedList());
let C = new Vertice("C", new LinkedList());
let D = new Vertice("D", new LinkedList());
let F = new Vertice("F", new LinkedList());

A.adicionarAresta(B, 3);

B.adicionarAresta(C, 7);
C.adicionarAresta(D, 6);
D.adicionarAresta(B, 2);
D.adicionarAresta(F, 10);
F.adicionarAresta(A, 5);
let Grafo = [A, B, C, D, F]

/* var Grafo = []; */


function printGrafo() {
  let return_string = "";
  Grafo.map(aresta=>{
    return_string+= aresta.printValue()
  })
  return return_string;
}

function PRIM() {
  let size = Grafo.length;
  const MST = [];
  if (size === 0) {
    return MST;
  }
  let nodeAtual = Grafo[0];
  let queue = new Queue;
  let explored = [];
  // Take the smallest edge and add that to the new graph
  while (size-1 != MST.length || !nodeAtual) {
    queue.fillQueue(nodeAtual);
    explored.push(nodeAtual);
    let minValue = queue.getMin(explored);
    if (minValue) {
      MST.push({'link':[minValue.Origem.value, minValue.Destino.value], 'link_value':minValue.Link_Value});
      nodeAtual = minValue.Destino;
    }
  }
  //console.log(MST);
  return MST;
}

const app = express();
app.use(express.static("public"));
//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(app.get("views") + "/index.html")));
});

app.get("/api/get", (req, res) => {
  res.send([Grafo.map(vertice=>{
    return {'value':vertice.value, 'x':vertice.x, 'y':vertice.y, 'links':vertice.getLinks()}
  }), Grafo.map(vertice=>{
    return {'value':vertice.value, 'x':vertice.x, 'y':vertice.y}
  })]);
});

app.post("/api/insert", (req, res) => {
  //Utiliza Origin/target já existente?
  let usingOrigin = false;
  let usingTarget = false;
  // body parser do request
  const originName = req.body.Oname;
  const targetName = req.body.Dname;
  const value = Number(req.body.value);
  const tipo = req.body.tipo;
  const valorado = req.body.valorado;
  // declara Vertices
  let Ve = new Vertice(originName, new LinkedList());
  let Ve2 = new Vertice(targetName, new LinkedList());
  if (Grafo) {
    //////////////////////////////////  Verifica se vertice já existe no array
    let VeP = Grafo.find((aresta)=>aresta.value == Ve.value);
    let Ve2P = Grafo.find((aresta)=>aresta.value == Ve2.value);
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
      if (tipo == "true") Ve.adicionarArco(Ve2);
      else Ve.adicionarAresta(Ve2);
    } else {
      if (tipo == "true") Ve.adicionarArco(Ve2, value);
      else Ve.adicionarAresta(Ve2, value);
    }
  }
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
  let Ve = Grafo.find((aresta)=>aresta.value == originName);
  if (removeVertice) {
    if (Ve) {
      Grafo.map((aresta)=>aresta.links.delete(Ve.value))
      Grafo = Grafo.filter((aresta)=>aresta!==Ve);
    }
  } else {
    let Ve2 = Grafo.find((aresta)=>aresta.value == targetName);
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

app.get("/api/calcular/:algo", (req, res) => {
  switch(req.params.algo){
    case 'PRIM':
      res.send(PRIM(Grafo));
      break;
    case 'BFS':
      break;
    default:
      res.send();
  }
});

app.get("/api/reset", (req, res) => {
  Grafo = [];
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Listening in port 3000");
});
