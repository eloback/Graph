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
  radius2
) {
  var betweenVec = new vec2(center2_x - center1_x, center2_y - center1_y);
  betweenVec.normalize();

  var p1x = center1_x + radius1 * betweenVec.x;
  var p1y = center1_y + radius1 * betweenVec.y;

  var p2x = center2_x - radius2 * betweenVec.x;
  var p2y = center2_y - radius2 * betweenVec.y;

  ctx.beginPath();
  canvas_arrow(ctx, p1x, p1y, p2x, p2y);
  ctx.stroke();
}

function vec2(x, y) {
  this.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.normalize = function () {
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
    success: function (result) {
      var c = document.getElementById("grafo-canvas");
      var ctx = c.getContext("2d");
      const [grafo, vertices] = result;

      $("#grafo").text(
        grafo.map((vertice) => {
          return vertice.links.map((element) => {
            draw_line2(
              ctx,
              vertice.x,
              vertice.y,
              radius,
              element.x,
              element.y,
              radius
            );
            if (element.linkValue)
              return (
                " (" +
                vertice.value +
                element.value +
                ")[" +
                element.linkValue +
                "]"
              );
            else return " (" + vertice.value + element.value + ")";
          });
        })
      );
      $("#vertices").text(
        vertices.map((vertice) => {
          ctx.beginPath();
          ctx.arc(vertice.x, vertice.y, 20, 0, 2 * Math.PI);
          ctx.fillStyle = "#03fce3";
          ctx.fill();
          ctx.stroke();
          ctx.font = "15px Arial";
          ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
          return vertice.value;
        })
      );
    },
  });
}

function insertVertice() {
  var data = {};
  data.Oname = document.getElementById("Oname").value;
  data.Dname = document.getElementById("Dname").value;
  data.value = document.getElementById("value").value;
  data.tipo = document.getElementById("tipo").checked;
  data.valorado = document.getElementById("type").checked;
  $.ajax({
    type: "POST",
    url: "/api/insert",
    data: data,
    success: function () {
      getGrafo();
    },
    error: function (err) {
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
    success: function () {
      getGrafo();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function reset() {
  $.ajax({
    type: "get",
    url: "/api/reset",
    success: function () {
      getGrafo();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function calcular() {
  var data = {};
  data.algo = $("#algoritimo").prop("value");
  data.value = $("#algoritimo-input").prop("value");
  $.ajax({
    type: "post",
    url: "/api/calcular",
    data: data,
    success: function (result) {
      if (result.algoritimo == "PRIM") {
        $(".table-result").html( result.data.map((vertices) => {
            return ("<p style='width:100px'>(" +
              vertices.link[0] +
              vertices.link[1] +
              ")[" +
              vertices.link_value +
              "]</p>");
          
        }));
      }
      else $(".table-result").html(result.data);
      /* if (!visitados) {
          visitados.push({ value: links.link[0], layer: layer });
        } else if (visitados.find((vertice) => vertice.value == link[0])) {
        }
        visitados.push({ value: links.link[1], layer: layer });
        layer = visitados[visitados.length - 1].layer;
        ctx.beginPath();
        ctx.arc(250, 50 * layer, 0, 2 * Math.PI);
        ctx.fillStyle = "#03fce3";
        ctx.fill();
        ctx.stroke();
        ctx.font = "15px Arial";
        ctx.strokeText(vertice.value, vertice.x - 5, vertice.y + 5);
        layer++; */
        
      /* draw_line2(
        vertice.x,
        vertice.y,
        radius,
        element.x,
        element.y,
        radius
      ); */
    },
    error: function (err) {
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

window.addEventListener("DOMContentLoaded", function () {
  $("#tipo").prop("checked", false);
  $("#type").prop("checked", false);
  changeType();
  $("#enviar").on("click", insertVertice);
  getGrafo();
  algoritimoChange();
});

$("#insert").on("click", function () {
  $("#li-insert").addClass("active");
  changeType();
  event.preventDefault();
  $("#li-delete").removeClass("active");
  $("#enviar").unbind("click");
  $("#enviar").attr("onclick", "insertVertice()");
});

$("#delete").on("click", function () {
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
