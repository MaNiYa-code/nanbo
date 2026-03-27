// NANBOアプリアイコン生成スクリプト
// Burgundy(#70191D) 背景 + な 文字(#FECD6D) のアイコンをPNGで生成

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
mkdirSync('./public/icons', { recursive: true });

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size * 0.18;

  // 角丸背景
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();

  // グラデーション背景
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#970A12');
  grad.addColorStop(1, '#70191D');
  ctx.fillStyle = grad;
  ctx.fill();

  // 「な」文字
  ctx.fillStyle = '#FECD6D';
  ctx.font = `bold ${size * 0.52}px "Hiragino Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('な', size / 2, size / 2 + size * 0.03);

  writeFileSync(`./public/icons/icon-${size}x${size}.png`, canvas.toBuffer('image/png'));
  console.log(`✅ icon-${size}x${size}.png`);
}
console.log('🎉 全アイコン生成完了！');
