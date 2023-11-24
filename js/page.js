function collapse(element) {
    var before = document.getElementsByClassName("active")[0]               // 기존에 활성화된 버튼
    if (before && document.getElementsByClassName("active")[0] != element) {  // 자신 이외에 이미 활성화된 버튼이 있으면
        before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
        before.classList.remove("active");                  // 버튼 비활성화
    }
    element.classList.toggle("active");         // 활성화 여부 toggle

    var content = element.nextElementSibling;
    if (content.style.maxHeight != 0) {         // 버튼 다음 요소가 펼쳐져 있으면
        content.style.maxHeight = null;         // 접기
    } else {
        content.style.maxHeight = content.scrollHeight + "px";  // 접혀있는 경우 펼치기
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 첫 번째 파이 차트를 그리는 함수 호출
    drawPieChart("pie-chart1", [38, 23, 17, 13, 9], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);
  
    // 두 번째 파이 차트를 그리는 함수 호출
    drawPieChart("pie-chart2", [44, 19, 18, 13, 6], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart3", [47, 43, 6, 3, 1], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart4", [46, 21, 16, 11, 6], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart5", [61, 28, 6, 3, 3], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart6", [61, 16, 11, 6, 6], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart7", [64, 28, 3, 3, 1], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart8", [56, 26, 8, 6, 3], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart9", [36, 35, 20, 7, 3], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart10", [54, 22, 16, 5, 3], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart11", [42, 31, 13, 8, 6], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart12", [55, 16, 14, 12, 3], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart13", [69, 18, 9, 2, 2], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);

    drawPieChart("pie-chart14", [54, 31, 10, 3, 2], ["#C3ABFF33", "#FFC4D733", "#FFF38933", "#D5FF9E33", "#C6DAFF33"]);
  });
  
  // 파이 차트를 그리는 함수
  function drawPieChart(canvasId, data, colors) {
    var canvas = document.getElementById(canvasId);
  
    if (canvas) {
      var ctx = canvas.getContext("2d");
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = Math.min(canvas.width, canvas.height) / 2;
      var totalValue = data.reduce(function (a, b) { return a + b; }, 0);
      var startAngle = 0;
  
      for (var i = 0; i < data.length; i++) {
        var sliceAngle = (2 * Math.PI * data[i]) / totalValue;
        var endAngle = startAngle + sliceAngle;
        var sliceMiddleAngle = startAngle + sliceAngle / 2;

        var textX = centerX + (radius / 2) * Math.cos(sliceMiddleAngle);
        var textY = centerY + (radius / 2) * Math.sin(sliceMiddleAngle);

        drawText(ctx, data[i] + "%", textX, textY);
  
        drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, colors[i]);
  
        startAngle = endAngle;
      }
    } else {
      console.error("Canvas element not found");
    }
  }
  
  // 그림을 그리는 함수
  function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  function drawText(ctx, text, x, y) {
    ctx.fillStyle = "#000"; // 텍스트 색상
    ctx.font = "12px Arial"; // 텍스트 폰트 및 크기
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }