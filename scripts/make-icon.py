"""Render assets/icon.png — the plugin-manager tile for dsh-pocket.

The tile is a rounded gradient square with a white phone outline and a
terminal prompt on its screen: "this puts a DSH terminal in your pocket".
Run with the bundled Python (Pillow 12); output is 256x256 RGBA.
"""

from pathlib import Path

from PIL import Image, ImageDraw

SIZE = 1024  # drawn large, downsampled at the end for clean antialiasing
SCALE = 4
OUT = Path(__file__).resolve().parent.parent / "assets" / "icon.png"

TOP = (43, 110, 246, 255)
BOTTOM = (24, 68, 198, 255)


def gradient(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size))
    draw = ImageDraw.Draw(img)
    for y in range(size):
        t = y / (size - 1)
        draw.line(
            [(0, y), (size, y)],
            fill=tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(4)),
        )
    return img


def main() -> None:
    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))

    # Rounded gradient plate. The caller renders the tile at small sizes, so the
    # corner radius is generous enough to read as an app icon, not a photo frame.
    plate = gradient(SIZE)
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), (SIZE - 1, SIZE - 1)], radius=232, fill=255)
    canvas.paste(plate, (0, 0), mask)

    draw = ImageDraw.Draw(canvas)
    white = (255, 255, 255, 255)

    # Phone body: outline only, so the plate colour stays the "screen" and the
    # glyph survives being scaled down to 32px in the plugin list.
    stroke = 62
    draw.rounded_rectangle(
        [(312, 176), (712, 848)],
        radius=104,
        outline=white,
        width=stroke,
    )

    # Earpiece slot, dimmed so it reads as hardware rather than content.
    draw.rounded_rectangle([(462, 248), (562, 268)], radius=10, fill=(255, 255, 255, 150))

    # Terminal prompt ">" over a caret, the same shape the hero screen shows.
    prompt = 46
    draw.line([(404, 470), (528, 556), (404, 642)], fill=white, width=prompt, joint="curve")
    draw.line([(568, 642), (620, 642)], fill=white, width=prompt)

    # Home indicator.
    draw.rounded_rectangle([(452, 756), (572, 780)], radius=12, fill=(255, 255, 255, 150))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.resize((256, 256), Image.LANCZOS).save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
