let originX = null;
let originY = null;
let targetX = null;
let targetY = null;
let grafos = null;

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}

function draw_line2(
  ctx,
  center1_x,
  center1_y,
  radius1,
  center2_x,
  center2_y,
  radius2,
  linkValue,
  color
) {
  var betweenVec = new vec2(center2_x - center1_x, center2_y - center1_y);
  betweenVec.normalize();

  var p1x = center1_x + radius1 * betweenVec.x;
  var p1y = center1_y + radius1 * betweenVec.y;

  var p2x = center2_x - radius2 * betweenVec.x;
  var p2y = center2_y - radius2 * betweenVec.y;

  if(color)ctx.strokeStyle = color;
  ctx.beginPath();
  canvas_arrow(ctx, p1x, p1y, p2x, p2y);
  ctx.stroke();
  if(!color){ctx.font = "15px Arial";
  ctx.strokeText(linkValue, p1x + (p2x -p1x)/2, p1y + (p2y - p1y)/2);}
}

function vec2(x, y) {
  this.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.normalize = function() {
    var scale = this.length();
    this.x /= scale;
    this.y /= scale;
  };
  this.x = x;
  this.y = y;
}

let radius = 20;

function getGrafo() {
  $.ajax({
    type: "GET",
    url: "/api/get",
    success: function(result) {
      const [grafo, vertices] = result;
      grafos = result;
      desenhaGrafo(grafo, vertices);
    },
  });
}

function desenhaGrafo(grafo, vertices) {
  var c = document.getElementById("grafo-canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  grafo.map((vertice) => {
    ctx.beginPath();
    ctx.arc(vertice.x, vertice.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#03fce3";
    ctx.fill();
    ctx.stroke();
    ctx.font = "15px Arial";
    ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
    vertice.links.map((element) => {
      draw_line2(
        ctx,
        vertice.x,
        vertice.y,
        radius,
        element.x,
        element.y,
        radius,
        element.linkValue
      );
    });
  });
}

function insertVertice() {
  var data = {};
  data.Oname = document.getElementById("Oname").value;
  data.Dname = document.getElementById("Dname").value;
  data.value = document.getElementById("value").value;
  data.tipo = document.getElementById("tipo").checked;
  data.valorado = document.getElementById("type").checked;
  data.latitude = document.getElementById("latValue").value;
  data.longitude = document.getElementById("longValue").value;
  data.originX = originX;
  data.originY = originY;
  data.targetX = targetX;
  data.targetY = targetY;
  $.ajax({
    type: "POST",
    url: "/api/insert",
    data: data,
    success: function() {
      getGrafo();
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function deleteVertice() {
  var data = {};
  data.Oname = document.getElementById("Oname").value;
  data.Dname = document.getElementById("Dname").value;
  data.tipo = document.getElementById("tipo").checked;
  data.delete_type = document.getElementById("type").checked;
  $.ajax({
    type: "POST",
    url: "/api/remove",
    data: data,
    success: function() {
      getGrafo();
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function reset() {
  $.ajax({
    type: "get",
    url: "/api/reset",
    success: function() {
      getGrafo();
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function mapa() {
  $.ajax({
    type: "get",
    url: "/mapa",
    success: function() {
      getGrafo();
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function calcular() {
  var data = {};
  data.algo = $("#algoritimo").prop("value");
  data.value = $("#algoritimo-input").prop("value");
  data.destino = $("#algoritimo-destino").prop("value");
  $.ajax({
    type: "post",
    url: "/api/calcular",
    data: data,
    success: function(result) {
      var c = document.getElementById("algoritimo-canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      if(result.algoritimo == "A*"){
        console.log(result.data);
        result.data.tabela.map((vertice) => {
          ctx.beginPath();
          ctx.arc(vertice.x, vertice.y, radius, 0, 2 * Math.PI);
          if(!result.data.caminho.find((e)=>e.value===vertice.value) && vertice.value != result.data.caminho[0].parent.value)
              ctx.fillStyle =  "#03fce3";
          else ctx.fillStyle = "red";
          ctx.fill();
          ctx.stroke();
          ctx.font = "15px Arial";
          ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
          vertice.links.forEach((element) => {
            ctx.stroke();
            ctx.font = "15px Arial";
            draw_line2(
              ctx,
              vertice.x,
              vertice.y,
              radius,
              element.x,
              element.y,
              radius,
              element.linkValue,
            );
          });
        });

        $("#pathfind").html(()=>{
          return `<thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">h(x)</th>
            </tr>
          </thead>
          <tbody>
          ${
            result.data.tabela.map((vertice)=>{
            return `<tr>
              <th scope="row">${vertice.value}</th>
              <td>${vertice.h}</td>
            </tr>`
            })}
          </tbody>`
        });
      }
      else if (result.algoritimo == "Welsh Powell") {
        result.data.map((vertice) => {
          ctx.beginPath();
          ctx.arc(vertice.x, vertice.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = vertice.color;
          ctx.fill();
          ctx.stroke();
          ctx.font = "15px Arial";
          ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
          vertice.links.forEach((element) => {
            ctx.stroke();
            ctx.font = "15px Arial";
            draw_line2(
              ctx,
              vertice.x,
              vertice.y,
              radius,
              element.x,
              element.y,
              radius,
              element.linkValue
            );
          });
        });
      } else if (result.algoritimo != "Roy") {
        result.data[0].x = 250;
        result.data[0].y = 35;
        let fila = [];
        vertice = result.data[0];
        while (vertice) {
          let N = vertice.links.length / 2 - 1;
          let T = 30;
          let D = 70;
          let Dy = 100;
          let TiR = T - (T - D) / 2;
          xi = (D + T) * N + TiR;
          xi = vertice.x - xi;
          vertice.links.forEach((link) => {
            ve = result.data.find((v) => v.value == link.value);
            ve.x = xi + D * fila.length;
            ve.y = vertice.y + Dy;
            draw_line2(ctx, vertice.x, vertice.y, radius, ve.x, ve.y, radius);
            fila.push(ve);
          });
          ctx.beginPath();
          ctx.arc(vertice.x, vertice.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = "#03fce3";
          ctx.fill();
          ctx.stroke();
          ctx.font = "15px Arial";
          ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
          vertice = fila.shift();
        }
      } else {
        ctx.font = "15px Arial";
        console.log(result.data);
        result.data.forEach((grafo) => {
          ctx.strokeText(grafo, 0, c.height / 2);
        });
      }
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function changeType() {
  $("#tipo-div").removeClass("invisible");
  $("#dest-input").removeClass("invisible");
  $("#value").val("");
  if ($("#li-insert").hasClass("active")) {
    $("#type-text").text("Valorado");
    if (!$("#type").prop("checked")) $("[id=value-div]").addClass("invisible");
    else $("[id=value-div]").removeClass("invisible");
  } else {
    $("#value-div").addClass("invisible");
    if ($("#type").prop("checked")) {
      $("#tipo-div").addClass("invisible");
      $("#dest-input").addClass("invisible");
      $("#Dname").val("");
    }
    $("#type-text").text("Vertice");
  }
}

window.addEventListener("DOMContentLoaded", function() {
  $("#tipo").prop("checked", false);
  $("#type").prop("checked", false);
  changeType();
  $("#enviar").on("click", insertVertice);
  getGrafo();
  algoritimoChange();
  let canvasElem = document.getElementById("grafo-canvas");
  canvasElem.addEventListener("mousedown", function(e) {
    selectArea(canvasElem, e);
  });
});

$("#insert").on("click", function() {
  $("#li-insert").addClass("active");
  changeType();
  event.preventDefault();
  $("#li-delete").removeClass("active");
  $("#enviar").unbind("click");
  $("#enviar").attr("onclick", "insertVertice()");
});

$("#delete").on("click", function() {
  $("#li-insert").removeClass("active");
  changeType();
  event.preventDefault();
  $("#li-delete").addClass("active");
  $("#enviar").unbind("click");
  $("#enviar").attr("onclick", "deleteVertice()");
});

function algoritimoChange() {
  $("#algoritimo").prop("size", 1);
  let newAlgo = $("#algoritimo").prop("value");
  $("#calcular").text("Calcular " + newAlgo);
}

function selectArea(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  var ctx = canvas.getContext("2d");
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  if (originX == null || (originX != null && targetX != null)) {
    var [grafo, vertice] = grafos;
    desenhaGrafo(grafo, vertice);
    originX = x;
    originY = y;
    targetX = targetY = null;
    ctx.fillStyle = "#ff0000";
  } else {
    targetX = x;
    targetY = y;
    ctx.fillStyle = "#0000ff";
    draw_line2(
      ctx,
      originX,
      originY,
      radius,
      x,
      y,
      radius
    );
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

}
