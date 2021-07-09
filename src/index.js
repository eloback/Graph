const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const PORT = process.env.PORT || 3000;

const {
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
  shortestPath,
  savings,
} = require("./list");

/// Como Criar um Grafo
let Grafo = [];
//Test Roy 1
/* let A = new Vertice("A", new LinkedList());
let B = new Vertice("B", new LinkedList());
let C = new Vertice("C", new LinkedList());
let D = new Vertice("D", new LinkedList());
let E = new Vertice("E", new LinkedList());

A.adicionarArco(B, 3);

B.adicionarArco(C, 7);
B.adicionarArco(D, 2);
C.adicionarArco(D, 6);
D.adicionarArco(B, 2);
D.adicionarArco(E, 10);
E.adicionarArco(A, 5);
let Grafo = [A, B, C, D, E]; */
//Test Roy 2
/* let A = new Vertice("A", new LinkedList());
let B = new Vertice("B", new LinkedList());
let C = new Vertice("C", new LinkedList());
let D = new Vertice("D", new LinkedList());
let E = new Vertice("E", new LinkedList());
let F = new Vertice("F", new LinkedList());
let G = new Vertice("G", new LinkedList());
let H = new Vertice("H", new LinkedList());

A.adicionarArco(B);

B.adicionarArco(E);
B.adicionarArco(G);
C.adicionarArco(A);
C.adicionarArco(D);
D.adicionarArco(F);
E.adicionarArco(H);
F.adicionarArco(E);
G.adicionarArco(A);
G.adicionarArco(C);
G.adicionarArco(H);
H.adicionarArco(D);
let Grafo = [A, B, C, D, E, F, G, H]; */
/* var Grafo = []; */

const returnMapa = () => {
  Grafo = [];
  // let A = new Vertice("Foz do Iguaçu", new LinkedList(), 50, 400, null, 25.5163, 54.5854);
  // let B = new Vertice("Cascavel", new LinkedList(), 100, 340,null, 24.9578, 53.4595);
  // let C = new Vertice("Toledo", new LinkedList(), 80, 280,null, 24.7251, 53.7417);
  // let D = new Vertice("Umuarama", new LinkedList(), 140, 200,null, 23.7661, 53.3206);
  // let E = new Vertice("Maringa", new LinkedList(), 230, 170,null, 23.4210, 51.9331);
  // let F = new Vertice("Londrina", new LinkedList(), 300, 195,null, 23.3045, 51.1696);
  // let G = new Vertice("Ponta Grossa", new LinkedList(), 300, 320,null, 25.0994, 50.1583);
  // let H = new Vertice("Curitiba", new LinkedList(), 360, 350,null, 25.4290, 49.2671);
  // let I = new Vertice("Paranaguá", new LinkedList(), 420, 380,null, 25.5201, 48.5099);
  // let J = new Vertice("Guarapuva", new LinkedList(), 230, 350,null, 25.3907, 51.4628);
  // let K = new Vertice("São Mateus do Sul", new LinkedList(), 390, 420,null, 25.8682, 50.3842);
  // let L = new Vertice("Francisco Beltrão", new LinkedList(), 120, 440,null, 26.0779, 53.0520);
  // A.adicionarAresta(B, 143);
  // B.adicionarAresta(C, 50);
  // C.adicionarAresta(D, 126);
  // D.adicionarAresta(E, 190);
  // E.adicionarAresta(F, 114);
  // F.adicionarAresta(G, 273);
  // E.adicionarAresta(G, 314);
  // G.adicionarAresta(H, 114);
  // H.adicionarAresta(I, 90);
  // G.adicionarAresta(J, 165);
  // J.adicionarAresta(B, 250);
  // H.adicionarAresta(K, 157);
  // K.adicionarAresta(L, 354);
  // L.adicionarAresta(B, 186);
  // Grafo = [A, B, C, D, E, F, G, H, I, J, K, L];
  Grafo.push(new Vertice("A"/*0*/, new LinkedList(), 40, 150));
  Grafo.push(new Vertice("B"/*1*/, new LinkedList(), 250, 90));
  Grafo.push(new Vertice("C"/*2*/, new LinkedList(), 470, 150));
  Grafo.push(new Vertice("D"/*3*/, new LinkedList(), 400, 340));
  Grafo.push(new Vertice("E"/*4*/, new LinkedList(), 150, 340));
  Grafo.push(new Vertice("O"/*5*/, new LinkedList(), 250, 200));
  Grafo[0].adicionarAresta(Grafo[1], 10);
  Grafo[0].adicionarAresta(Grafo[2], 12);
  Grafo[0].adicionarAresta(Grafo[3], 18);
  Grafo[0].adicionarAresta(Grafo[4], 10);
  Grafo[0].adicionarAresta(Grafo[5], 10);
  Grafo[1].adicionarAresta(Grafo[2], 7);
  Grafo[1].adicionarAresta(Grafo[3], 12);
  Grafo[1].adicionarAresta(Grafo[4], 12);
  Grafo[1].adicionarAresta(Grafo[5], 5);
  Grafo[2].adicionarAresta(Grafo[3], 8);
  Grafo[2].adicionarAresta(Grafo[4], 12);
  Grafo[2].adicionarAresta(Grafo[5], 5);
  Grafo[3].adicionarAresta(Grafo[4], 10);
  Grafo[3].adicionarAresta(Grafo[5], 10);
  Grafo[4].adicionarAresta(Grafo[5], 10);
  
}


const saveTest = ()=>{
  Grafo = [];
  Grafo.push(new Vertice("1"/*0*/, new LinkedList(), 150, 90));
  Grafo.push(new Vertice("2"/*1*/, new LinkedList(), 300, 90));
  Grafo.push(new Vertice("3"/*2*/, new LinkedList(), 400, 210));
  Grafo.push(new Vertice("4"/*3*/, new LinkedList(), 300, 340));
  Grafo.push(new Vertice("5"/*4*/, new LinkedList(), 150, 340));
  Grafo.push(new Vertice("6"/*5*/, new LinkedList(), 100, 210));
  Grafo[0].adicionarAresta(Grafo[1], 3);
  Grafo[0].adicionarAresta(Grafo[2], 2);
  Grafo[0].adicionarAresta(Grafo[3], 5);
  Grafo[0].adicionarAresta(Grafo[4], 10);
  Grafo[0].adicionarAresta(Grafo[5], 2);
  Grafo[1].adicionarAresta(Grafo[2], 7);
  Grafo[1].adicionarAresta(Grafo[3], 11);
  Grafo[1].adicionarAresta(Grafo[4], 8);
  Grafo[1].adicionarAresta(Grafo[5], 1);
  Grafo[2].adicionarAresta(Grafo[3], 2);
  Grafo[2].adicionarAresta(Grafo[4], 9);
  Grafo[2].adicionarAresta(Grafo[5], 9);
  Grafo[3].adicionarAresta(Grafo[4], 3);
  Grafo[3].adicionarAresta(Grafo[5], 2);
  Grafo[4].adicionarAresta(Grafo[5], 4);
}

/// Alteração de Grafos pre montados:
// returnMapa();
saveTest();


const app = express();
app.use(express.static("public"));
//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(app.get("views") + "/index.html")));
});

app.get("/mapa", (req, res) => {
  returnMapa();
  res.send("Success");
});

app.get("/api/get", (req, res) => {
  res.send([
    Grafo.map((vertice) => {
      return arrayTransformer(vertice);
    }),
    Grafo.map((vertice) => {
      return {
        value: vertice.value,
        x: vertice.x,
        y: vertice.y
      };
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
  const originCord = {
    x: req.body.originX,
    y: req.body.originY
  };
  const targetCord = {
    x: req.body.targetX,
    y: req.body.targetY
  };
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  // declara Vertices
  let Ve = originCord.x ? new Vertice(originName, new LinkedList(), Number(originCord.x), Number(originCord.y)) : new Vertice(originName, new LinkedList());
  if (latitude && longitude) {
    Ve.latitude = latitude;
    Ve.longitude = longitude;
  }
  let Ve2 = targetCord.y ? new Vertice(targetName, new LinkedList(), Number(targetCord.x), Number(targetCord.y)) : new Vertice(targetName, new LinkedList());
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
  if (removeVertice == "true") {
    if (Ve) {
      Grafo.map((aresta) => aresta.links.delete(Ve.value));
      Grafo = Grafo.filter((aresta) => aresta !== Ve);
    }
  } else {
    let Ve2 = Grafo.find((aresta) => aresta.value == targetName);
    if (Ve2) {
      if (tipo == "true") { // true == arco
        Ve.links.delete(Ve2.value);
      } else {
        Ve.links.delete(Ve2.value);
        Ve2.links.delete(Ve.value);
      }
    }
  }
  res.redirect("/");
});

app.post("/api/calcular", (req, res, next) => {
  let value = req.body.value;
  let destino = req.body.destino;
  let algoritimo = req.body.algo;
  let node;
  if (value) node = Grafo.find((vertice) => vertice.value == value);
  else node = Grafo[0];
  if(destino) {destino = Grafo.find((vertice) => vertice.value == destino);
if(!destino) return res.status(400).send(new Error("Destino não encontrado"));
  }
  if (!node) {
    console.log("Saida não encontrada");
    return res.status(400).send(new Error("Saida não encontrada"));
  }

  switch (algoritimo) {
    case "PRIM":
      res.send({
        data: PRIM(Grafo).map(vertice => arrayTransformer(vertice)),
        algoritimo: algoritimo
      });
      break;
    case "BFS":
      res.send({
        data: BFS(node).map(vertice => arrayTransformer(vertice)),
        algoritimo: algoritimo
      });
      break;
    case "DFS":
      res.send({
        data: DFS(node).map(vertice => arrayTransformer(vertice)),
        algoritimo: algoritimo
      });
      break;
    case "Roy":
      res.send({
        data: Roy(node, Grafo).map(solution => {
          return "S: " + printGrafo(solution)
        }),
        algoritimo: algoritimo
      });
      break;
    case "Welsh Powell":
      console.log(WelshPowell(Grafo).map(vertice => arrayTransformer(vertice)));
      res.send({
        data: WelshPowell(Grafo).map(vertice => arrayTransformer(vertice)),
        algoritimo: algoritimo
      });
      break;
    case "A*":
    const {caminho, tabela} = shortestPath(Grafo, node, destino);
      res.send({
        data: {caminho: caminho.map(vertice => arrayTransformer(vertice)), tabela: tabela.map(vertice=> arrayTransformer(vertice))},
        algoritimo: algoritimo
      });
      break;
    case "Savings":
      const grafo = savings(Grafo, Object.assign({}, node)).map(vertice => arrayTransformer(vertice));
      res.send({
        data: grafo,
        algoritimo: algoritimo
      });
      break;
    default:
      console.log(algoritimo);
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
