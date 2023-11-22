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

var canvas = document.getElementById("pie-chart");
var ctx = canvas.getContext("2d");

// Function to draw a pie chart segment
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

// Data for the pie chart
var data = [38, 23, 17, 13, 9]; // Values for each segment (total should be 100%)

// Draw the pie chart
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = Math.min(canvas.width, canvas.height) / 2;

var totalValue = data.reduce(function (a, b) { return a + b; }, 0);
var startAngle = 0;

// Colors for each segment
var colors = ["#FF5733", "#33FF57", "#3357FF", "#FF3357", "#57FF33"];

for (var i = 0; i < data.length; i++) {
  var sliceAngle = (2 * Math.PI * data[i]) / totalValue;
  var endAngle = startAngle + sliceAngle;

  drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, colors[i]);

  startAngle = endAngle;
}