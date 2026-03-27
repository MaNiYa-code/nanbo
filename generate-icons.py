#!/usr/bin/env python3
"""NANBOアプリアイコン生成 - 純粋なPNGバイナリ生成（外部ライブラリ不要）"""
import zlib, struct, os

def make_png(size):
    """Burgundy(#970A12→#70191D)グラデーション + 「な」の代わりにN文字の幾何学アイコン"""

    # カラー定義
    BG1  = (0x97, 0x0A, 0x12)   # Chinese Red
    BG2  = (0x70, 0x19, 0x1D)   # Burgundy
    GOLD = (0xFE, 0xCD, 0x6D)   # Lunar Yellow

    pixels = []
    cx, cy = size // 2, size // 2
    r_outer = size * 0.42
    r_inner = size * 0.28
    stroke  = max(2, size // 24)

    for y in range(size):
        row = []
        for x in range(size):
            # グラデーション背景色
            t = (x + y) / (2 * size)
            r = int(BG1[0] + (BG2[0] - BG1[0]) * t)
            g = int(BG1[1] + (BG2[1] - BG1[1]) * t)
            b = int(BG1[2] + (BG2[2] - BG1[2]) * t)

            # 円形アイコン形状（角丸の代わりに円）
            dist = ((x - cx)**2 + (y - cy)**2) ** 0.5

            if dist > r_outer:
                # 外側は透明
                row += [0, 0, 0, 0]
                continue

            # ゴールドのリング
            if r_inner - stroke < dist < r_inner + stroke:
                row += [GOLD[0], GOLD[1], GOLD[2], 220]
                continue

            # 「N」の縦線・斜め線を描画
            nx, ny = x - cx, y - cy
            letter_size = size * 0.22
            # 左縦線
            if -letter_size * 0.9 <= nx <= -letter_size * 0.4 and -letter_size <= ny <= letter_size:
                if abs(nx + letter_size * 0.65) < size * 0.045:
                    row += [GOLD[0], GOLD[1], GOLD[2], 255]
                    continue
            # 右縦線
            if letter_size * 0.4 <= nx <= letter_size * 0.9 and -letter_size <= ny <= letter_size:
                if abs(nx - letter_size * 0.65) < size * 0.045:
                    row += [GOLD[0], GOLD[1], GOLD[2], 255]
                    continue
            # 斜め線 (左上→右下)
            expected_nx = -letter_size * 0.65 + (ny + letter_size) / (2 * letter_size) * letter_size * 1.3
            if abs(nx - expected_nx) < size * 0.055 and -letter_size <= ny <= letter_size:
                if -letter_size * 0.9 <= nx <= letter_size * 0.9:
                    row += [GOLD[0], GOLD[1], GOLD[2], 255]
                    continue

            row += [r, g, b, 255]
        pixels.append(row)

    # PNG エンコード
    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        return c + struct.pack('>I', zlib.crc32(name + data) & 0xffffffff)

    sig   = b'\x89PNG\r\n\x1a\n'
    ihdr  = chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))

    raw = b''
    for row in pixels:
        raw += b'\x00' + bytes(row)
    idat = chunk(b'IDAT', zlib.compress(raw, 9))
    iend = chunk(b'IEND', b'')

    return sig + ihdr + idat + iend

os.makedirs('public/icons', exist_ok=True)
sizes = [72, 96, 128, 144, 152, 192, 384, 512]
for s in sizes:
    png = make_png(s)
    path = f'public/icons/icon-{s}x{s}.png'
    with open(path, 'wb') as f:
        f.write(png)
    print(f'✅ {path} ({len(png):,} bytes)')

# apple-touch-icon (180x180)
png = make_png(180)
with open('public/apple-touch-icon.png', 'wb') as f:
    f.write(png)
print('✅ public/apple-touch-icon.png')
print('🎉 全アイコン生成完了！')
