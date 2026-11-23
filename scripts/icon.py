from PIL import Image, ImageDraw
import os
os.makedirs('assets', exist_ok=True)
S = 1024
fg = Image.new('RGBA', (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(fg)
d.rounded_rectangle((250, 360, 774, 450), 14, fill='white')
d.rectangle((440, 450, 584, 660), fill='white')
d.polygon([(250, 540), (350, 540), (300, 630)], fill='#ffd54a')
d.line((250, 700, 774, 700), fill='#ffd54a', width=14)
bg = Image.new('RGBA', (S, S), '#0b6bcb')
bg.alpha_composite(fg)
bg.save('assets/icon-only.png')
fg.save('assets/icon-foreground.png')
