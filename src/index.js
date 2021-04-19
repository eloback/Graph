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
let Grafo = [A, B, C, D, F];

/* var Grafo = []; */

function printGrafo(grafo) {
  let return_string = "";
  grafo.map((aresta) => {
    return_string += aresta.printValue();
  });
  return return_string;
}

function PRIM() {
  let size = Grafo.length;
  const MST = [];
  if (size === 0) {
    return MST;
  }
  let nodeAtual = Grafo[0];
  let queue = new Queue();
  let explored = [];
  // Take the smallest edge and add that to the new graph
  while (size - 1 != MST.length || !nodeAtual) {
    queue.fillQueue(nodeAtual);
    explored.push(nodeAtual);
    let minValue = queue.getMin(explored);
    if (minValue) {
      /* let entry = MSF.find((element) => element.value == v.value);
      let dest = new Vertice(vertice.value, new LinkedList());
      if (!entry) {
        entry = new Vertice(v.value, new LinkedList());
        MST.push(entry);
      }
      MST.push(dest);
      entry.adicionarArco(dest, node.linkValue); */
      MST.push({
        link: [minValue.Origem.value, minValue.Destino.value],
        link_value: minValue.Link_Value,
      });
      nodeAtual = minValue.Destino;
    }
  }
  //console.log(MST);
  return MST;
}

function BFS(saida) {
  let queue = new Queue();
  let result = [];
  let node;
  if(saida) node = Grafo.find((vertice) => vertice.value == saida);
  else node = Grafo[0];
  let explored = [];
  explored.push(node);
  queue.enqueue(node);
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

const app = express();
app.use(express.static("public"));
//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(app.get("views") + "/index.html")));
});

app.get("/api/get", (req, res) => {
  res.send([
    Grafo.map((vertice) => {
      return {
        value: vertice.value,
        x: vertice.x,
        y: vertice.y,
        links: vertice.getLinks(),
      };
    }),
    Grafo.map((vertice) => {
      return { value: vertice.value, x: vertice.x, y: vertice.y };
    }),
  ]);
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
    let VeP = Grafo.find((aresta) => aresta.value == Ve.value);
    let Ve2P = Grafo.find((aresta) => aresta.value == Ve2.value);
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

  res.redirect("/");
});

app.post("/api/remove", (req, res) => {
  const originName = req.body.Oname;
  const targetName = req.body.Dname;
  const tipo = req.body.tipo;
  const removeVertice = req.body.delete_type; // Aresta/arco ou vertice
  let Ve = Grafo.find((aresta) => aresta.value == originName);
  if (removeVertice) {
    if (Ve) {
      Grafo.map((aresta) => aresta.links.delete(Ve.value));
      Grafo = Grafo.filter((aresta) => aresta !== Ve);
    }
  } else {
    let Ve2 = Grafo.find((aresta) => aresta.value == targetName);
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

app.post("/api/calcular", (req, res) => {
  let value = req.body.value;
  let algoritimo = req.body.algo;
  switch (algoritimo) {
    case "PRIM":
      res.send({'data':PRIM(Grafo),'algoritimo': algoritimo});
      break;
    case "BFS":
      res.send({'data':printGrafo(BFS(value)),'algoritimo': algoritimo});
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
