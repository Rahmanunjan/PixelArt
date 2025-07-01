// Pixel Smile program

// Global image variables
const imageWidth = 20;
const imageHeight = 8;
const imageData = createImageData();

// Draw head (rectangle outline)
drawRectangle(0, 0, 20, 8);

// Draw eyes
drawDot(7, 2);
drawDot(12, 2);

// Draw smile
drawDot(4, 4);
drawHorizontalLine(4, 5, 12);
drawDot(15, 4);

// Draw circle (optional extra effect)
drawCircle(10, 4, 3);

// Output the image to console
outputImage();

/**
 * Draws a rectangle outline starting at (x, y) with given width and height.
 */
function drawRectangle(
  x: number,
  y: number,
  width: number,
  height: number
) {
  // top
  drawHorizontalLine(x, y, width);
  // bottom
  drawHorizontalLine(x, y + height - 1, width);
  // left
  drawVerticalLine(x, y, height);
  // right
  drawVerticalLine(x + width - 1, y, height);
}

/**
 * Draws a single pixel (dot) at (x, y) if within image bounds.
 */
function drawDot(x: number, y: number) {
  if (isPointInImage(x, y)) {
    const index = y * imageWidth + x;
    imageData[index] = true;
  }
}

/**
 * Draws a horizontal line starting at (x, y) spanning 'length' pixels.
 */
function drawHorizontalLine(x: number, y: number, length: number) {
  for (let i = 0; i < length; i++) {
    drawDot(x + i, y);
  }
}

/**
 * Draws a vertical line starting at (x, y) spanning 'length' pixels.
 */
function drawVerticalLine(x: number, y: number, length: number) {
  for (let i = 0; i < length; i++) {
    drawDot(x, y + i);
  }
}

/**
 * Draws a circle centered at (cx, cy) with specified radius.
 */
function drawCircle(cx: number, cy: number, radius: number) {
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      if (x * x + y * y <= radius * radius) {
        drawDot(cx + x, cy + y);
      }
    }
  }
}

/**
 * Draws a line between (x0, y0) and (x1, y1) using Bresenham's algorithm.
 */
function drawLine(x0: number, y0: number, x1: number, y1: number) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    drawDot(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

/**
 * Returns true if the point (x, y) is within the image bounds.
 */
function isPointInImage(x: number, y: number) {
  return x >= 0 && x < imageWidth && y >= 0 && y < imageHeight;
}

/**
 * Outputs the current image data to the console.
 * @param onChar Character to display for an "on" pixel. Default: "X"
 * @param offChar Character to display for an "off" pixel. Default: " "
 */
function outputImage(onChar = "X", offChar = " ") {
  const lines: string[] = [];
  for (let y = 0; y < imageHeight; y++) {
    let line = "";
    for (let x = 0; x < imageWidth; x++) {
      const idx = y * imageWidth + x;
      line += imageData[idx] ? onChar : offChar.repeat(2);
    }
    lines.push(line);
  }
  console.log(lines.join("\n"));
}

/**
 * Creates an initial image data array of booleans (all false).
 */
function createImageData(): boolean[] {
  const length = imageWidth * imageHeight;
  return new Array(length).fill(false);
}
