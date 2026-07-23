const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
};

const scoreColor = (score) => {
  if (score >= 70) return "#C97E28";
  if (score >= 45) return "#5F8474";
  return "#9A4531";
};

export const generateReportImage = (analysis) => {
  const { pincode, business, score, recommendation, pros, cons, summary, costEstimate } =
    analysis;

  const W = 900;
  const H = 1180;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#F7F5F0";
  ctx.fillRect(0, 0, W, H);

  // Subtle grid texture
  ctx.strokeStyle = "rgba(18,64,59,0.05)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx < W; gx += 28) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, H);
    ctx.stroke();
  }
  for (let gy = 0; gy < H; gy += 28) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
  }

  const marginX = 56;
  let cursorY = 90;

  // Header
  ctx.fillStyle = "#C97E28";
  ctx.font = "600 13px monospace";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("BUSINESS LOCATION ANALYZER · FIELD REPORT", marginX, cursorY);

  cursorY += 48;
  ctx.fillStyle = "#12403B";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText(`${business}`, marginX, cursorY);

  cursorY += 32;
  ctx.font = "16px monospace";
  ctx.fillStyle = "#3E7167";
  ctx.fillText(`Pincode ${pincode}`, marginX, cursorY);

  // Card panel
  cursorY += 40;
  const cardTop = cursorY;
  const cardHeight = 190;
  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#CFE0DC";
  ctx.lineWidth = 1.5;
  const radius = 16;
  ctx.beginPath();
  ctx.moveTo(marginX + radius, cardTop);
  ctx.arcTo(W - marginX, cardTop, W - marginX, cardTop + cardHeight, radius);
  ctx.arcTo(W - marginX, cardTop + cardHeight, marginX, cardTop + cardHeight, radius);
  ctx.arcTo(marginX, cardTop + cardHeight, marginX, cardTop, radius);
  ctx.arcTo(marginX, cardTop, W - marginX, cardTop, radius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Score circle
  const gaugeCx = marginX + 90;
  const gaugeCy = cardTop + cardHeight / 2;
  const gaugeR = 62;
  ctx.beginPath();
  ctx.arc(gaugeCx, gaugeCy, gaugeR, 0, Math.PI * 2);
  ctx.strokeStyle = "#EAF1EF";
  ctx.lineWidth = 12;
  ctx.stroke();

  const pct = Math.max(0, Math.min(100, score)) / 100;
  ctx.beginPath();
  ctx.arc(gaugeCx, gaugeCy, gaugeR, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2);
  ctx.strokeStyle = scoreColor(score);
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.fillStyle = "#0A2622";
  ctx.font = "700 34px monospace";
  ctx.textAlign = "center";
  ctx.fillText(String(score), gaugeCx, gaugeCy + 10);
  ctx.font = "11px monospace";
  ctx.fillStyle = "#3E7167";
  ctx.fillText("OUT OF 100", gaugeCx, gaugeCy + 30);
  ctx.textAlign = "left";

  // Recommendation badge
  const badgeX = marginX + 200;
  ctx.font = "600 22px Georgia, serif";
  ctx.fillStyle = "#0A2622";
  ctx.fillText("Recommendation", badgeX, cardTop + 50);

  ctx.font = "600 15px sans-serif";
  const badgeText = recommendation;
  const badgeWidth = ctx.measureText(badgeText).width + 28;
  ctx.fillStyle = scoreColor(score) + "22";
  ctx.strokeStyle = scoreColor(score);
  ctx.lineWidth = 1.2;
  const by = cardTop + 68;
  const bh = 34;
  ctx.beginPath();
  ctx.moveTo(badgeX + 14, by);
  ctx.arcTo(badgeX + badgeWidth, by, badgeX + badgeWidth, by + bh, 14);
  ctx.arcTo(badgeX + badgeWidth, by + bh, badgeX, by + bh, 14);
  ctx.arcTo(badgeX, by + bh, badgeX, by, 14);
  ctx.arcTo(badgeX, by, badgeX + badgeWidth, by, 14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = scoreColor(score);
  ctx.fillText(badgeText, badgeX + 14, by + 23);

  if (costEstimate) {
    ctx.font = "12px monospace";
    ctx.fillStyle = "#3E7167";
    ctx.fillText(`Rent: ${costEstimate.monthlyRent}`, badgeX, cardTop + 135);
    ctx.fillText(`Setup: ${costEstimate.setupCost}`, badgeX, cardTop + 155);
  }

  cursorY = cardTop + cardHeight + 50;

  // Pros / Cons
  const colWidth = (W - marginX * 2 - 30) / 2;

  ctx.font = "600 20px Georgia, serif";
  ctx.fillStyle = "#0A2622";
  ctx.fillText("Pros", marginX, cursorY);
  ctx.fillText("Cons", marginX + colWidth + 30, cursorY);
  cursorY += 30;

  ctx.font = "15px sans-serif";
  let leftY = cursorY;
  let rightY = cursorY;

  ctx.fillStyle = "#5F8474";
  pros.forEach((point) => {
    ctx.fillStyle = "#0A2622";
    leftY = wrapText(ctx, `+  ${point}`, marginX, leftY, colWidth, 22) + 6;
  });

  cons.forEach((point) => {
    ctx.fillStyle = "#0A2622";
    rightY = wrapText(ctx, `–  ${point}`, marginX + colWidth + 30, rightY, colWidth, 22) + 6;
  });

  cursorY = Math.max(leftY, rightY) + 20;

  // Summary
  ctx.font = "600 20px Georgia, serif";
  ctx.fillStyle = "#0A2622";
  ctx.fillText("Summary", marginX, cursorY);
  cursorY += 28;
  ctx.font = "15px sans-serif";
  ctx.fillStyle = "#2A4A44";
  cursorY = wrapText(ctx, summary, marginX, cursorY, W - marginX * 2, 22);

  // Footer
  ctx.font = "12px monospace";
  ctx.fillStyle = "#7A9E8E";
  ctx.fillText(
    `Generated by Market Gap Finder · ${new Date().toLocaleDateString("en-IN")}`,
    marginX,
    H - 40
  );

  return canvas.toDataURL("image/png");
};
