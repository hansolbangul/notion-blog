"""Extract the owner's original poses; remove edge-connected paper only.
Run with Python + Pillow. Do not use the generated checkerboard image.
"""
from collections import deque
from pathlib import Path
from PIL import Image, ImageFilter
root = Path(__file__).resolve().parents[1]
source = root / 'apps/blog/public/brand/chibi-poses-v1.png'
out = root / 'apps/blog/public/brand/chibi'
out.mkdir(exist_ok=True)
im = Image.open(source).convert('RGBA')
w,h = im.size
pixels = im.load()
background = bytearray(w*h)
queue = deque()
def offer(x,y):
    i=y*w+x
    if background[i]: return
    r,g,b,_=pixels[x,y]
    if min(r,g,b) >= 140 and max(r,g,b)-min(r,g,b) <= 90:
        background[i]=255
        queue.append((x,y))
for x in range(w): offer(x,0); offer(x,h-1)
for y in range(h): offer(0,y); offer(w-1,y)
# The spiral annotation has enclosed paper holes, outside the character silhouette.
for y in range(720, 844):
    for x in range(420, 770): offer(x,y)
while queue:
    x,y=queue.popleft()
    if x: offer(x-1,y)
    if y: offer(x,y-1)
    if x+1<w: offer(x+1,y)
    if y+1<h: offer(x,y+1)
alpha = Image.frombytes('L',(w,h),bytes(255-v for v in background))
# A subpixel feather retains the original ink outline without jagged edges.
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.35))
im.putalpha(alpha)
im.save(out/'poses-transparent.png', optimize=True)
regions = {
 'standing': (50,95,380,615), 'coding': (430,155,815,615),
 'thinking': (850,90,1210,615), 'excited': (30,660,390,1140),
 'crouching': (420,720,770,1145), 'resting': (790,820,1240,1110),
 'avatar': (65,100,375,410),
}
for name,box in regions.items():
    pose = im.crop(box)
    if name != 'avatar':
        bounds = pose.getbbox()
        pose = pose.crop(bounds)
        padded = Image.new('RGBA',(pose.width+12,pose.height+12))
        padded.paste(pose,(6,6))
        pose=padded
    pose.save(out/f'{name}.png', optimize=True)
    print(name,pose.size,'transparent pixels',pose.getchannel('A').histogram()[0])
# Inspection contact sheet on charcoal makes remaining paper conspicuous.
preview = Image.new('RGBA',(1254,1254),'#242723')
preview.alpha_composite(im)
preview.convert('RGB').save('/tmp/chibi-alpha-check.jpg')
