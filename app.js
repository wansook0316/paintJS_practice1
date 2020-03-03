// 해야 되는 것
// 1. 그리는 것 구현 o
// 선 굵기 변경 구현 o
// 색 바꾸는 것 구현 o
// 채우는 것 구현 o
// 저장 구현

const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

// 상수 설정
const INITIAL_SIZE = 700;
const INITIAL_COLOR = "black";

// 내가 그릴 캔버스의 크기 설정
canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;

// 초기 페인팅 값 세팅
let painting = false;
let filling = false;

// 초기 선 길이 세팅
ctx.lineWidth = 3;

// 초기 색상 세팅
ctx.fillStyle = "white";
ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasFilling(event) {
  if (filling === true) {
    ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // canvas안에 들어왔을 때 마우스가 움직이는 이벤트
  canvas.addEventListener("mousedown", startPainting); // canvas안에 들어왔음을 알려주는 이벤트
  canvas.addEventListener("mouseup", stopPainting); // canvas 밖에 나갔음을 알려주는 이벤트
  canvas.addEventListener("click", handleCanvasFilling);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleRangeToLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

if (range) {
  range.addEventListener("input", handleRangeToLineWidth);
}

function handleColorChanging(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

Array.from(colors).forEach(item => {
  item.addEventListener("click", handleColorChanging);
});

function handleModeClick(event) {
  if (filling === false) {
    filling = true; // 채워라 모드
    event.target.innerText = "Paint!"; // 모드는 채워라, 보이는 건 그려라
  } else {
    filling = false; // 채워라 모드
    event.target.innerText = "Fill!"; // 모드는 채워라, 보이는 건 그려라
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(event) {
  const imgAsDataURL = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.download = "PaintJs_img";
  link.href = imgAsDataURL;
  link.click();
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
