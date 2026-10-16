"""Kiểm tra sơ đồ SVG: chữ không được cắt ngang khung/chồng khung, không tràn viewBox.
Chạy từ gốc repo: python3 -I docs/tools/blog/svgcheck.py [file.html ...]  (mặc định: mọi bài có figure.diagram)"""
import re,sys,glob,os,subprocess,json,tempfile
files=sys.argv[1:] or sorted(f for f in glob.glob('blog/*/*.html')+glob.glob('en/blog/*/*.html') if 'figure class="diagram"' in open(f,encoding='utf-8').read())
css=open('blog.css',encoding='utf-8').read()
figs=[]
for f in files:
    for m in re.findall(r'<figure class="diagram">.*?</figure>',open(f,encoding='utf-8').read(),re.S): figs.append((f,m))
body=''.join('<div data-f="%s" style="width:%dpx">%s</div>'%(f,w,m) for f,m in figs for w in (1000,))
js='''<script>document.fonts.ready.then(()=>{const out=[];document.querySelectorAll('div[data-f]').forEach(d=>{const s=d.querySelector('svg'),vb=s.viewBox.baseVal,rects=[...s.querySelectorAll('rect')].map(r=>r.getBBox());
 s.querySelectorAll('text').forEach(t=>{const b=t.getBBox(),tx=t.textContent.slice(0,30);
  if(b.x<-1||b.y<-1||b.x+b.width>vb.width+1||b.y+b.height>vb.height+1) out.push([d.dataset.f,'ngoài viewBox',tx]);
  rects.forEach(r=>{const ix=Math.min(b.x+b.width,r.x+r.width)-Math.max(b.x,r.x),iy=Math.min(b.y+b.height,r.y+r.height)-Math.max(b.y,r.y);
   if(ix>1&&iy>1){const inside=b.x>=r.x-1&&b.x+b.width<=r.x+r.width-8&&b.y>=r.y-1&&b.y+b.height<=r.y+r.height+1;if(!inside) out.push([d.dataset.f,'chữ cắt khung',tx,Math.round(b.x+b.width-r.x-r.width)])}})})});
 document.title='DONE';document.body.setAttribute('data-r',JSON.stringify(out))})</script>'''
html='<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap" rel="stylesheet"><style>%s</style>%s%s'%(css,body,js)
tmp=os.path.join(tempfile.gettempdir(),'vinc-svgchk.html');open(tmp,'w',encoding='utf-8').write(html)
o=subprocess.run(['google-chrome','--headless=new','--no-sandbox','--disable-gpu','--virtual-time-budget=8000','--dump-dom','file://'+tmp],capture_output=True,text=True).stdout
m=re.search(r'data-r="([^"]*)"',o)
res=json.loads(__import__('html').unescape(m.group(1))) if m else None
print('figures',len(figs));
if res is None: print('không đọc được kết quả')
else:
    for r in res: print(*r)
    print('LỖI' if res else 'OK',len(res))
