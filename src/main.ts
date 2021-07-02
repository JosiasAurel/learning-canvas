import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.style.width = "600px";
canvas.style.height = "600px";

function main(): void {
  let context: CanvasRenderingContext2D = canvas.getContext("2d");

  // draw a box on the screen
  context.fillStyle = "#ffffaa";
  context.fillRect(0, 0, 100, 100);

  // add text
  context.fillStyle = "#000000";
  context.font = "20px monospace";

  context.fillText("Hello World", 89, 89);

  // draw an image on the canvas
  const helloImage: HTMLImageElement = new Image();
  helloImage.addEventListener("load", () => {
    context.drawImage(helloImage, 10, 10);
  });
  helloImage.src = "./androidparty.png";

  // draw a stroke box (box with no fill)
  context.strokeStyle = "#000000";
  context.strokeRect(0, 0, 101, 101);
}

main();
canvas.innerHTML = "Your browser does not support canvas element";
app.appendChild(canvas);