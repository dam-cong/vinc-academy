"""Tạo ảnh bìa nhẹ (WebP 960×504) từ ảnh OG và chèn <figure class="post-cover"> vào bài blog.
Chạy từ gốc repo: python3 -I docs/tools/blog/covers.py            (mọi bài, bỏ qua bài đã có)
                  python3 -I docs/tools/blog/covers.py <file.html>... (chỉ các bài chỉ định)
Cần Pillow: pip install pillow (hoặc đặt COVER_LIBS=<thư mục chứa Pillow>)."""
import os,re,sys,glob
if os.environ.get('COVER_LIBS'): sys.path.insert(0,os.environ['COVER_LIBS'])
from PIL import Image
def cover(name):
    src='image/og/%s.png'%name;dst='image/cover/%s.webp'%name
    os.makedirs('image/cover',exist_ok=True)
    if not os.path.exists(dst) or os.path.getmtime(dst)<os.path.getmtime(src):
        Image.open(src).convert('RGB').resize((960,504),Image.LANCZOS).save(dst,'WEBP',quality=78,method=6)
    return dst
def add(path):
    s=open(path,encoding='utf-8').read()
    if 'class="post-cover"' in s: return False
    m=re.search(r'og:image" content="[^"]*/image/og/([^"/]+)\.png"',s)
    if not m or '<header class="post-header">' not in s: return False
    cover(m.group(1))
    up='../../../' if path.startswith('en/') else '../../'
    fig='\n        <figure class="post-cover"><img src="%simage/cover/%s.webp" alt="" width="960" height="504" decoding="async"></figure>\n'%(up,m.group(1))
    s=s.replace('</header>',"</header>\n"+fig,1) if False else re.sub(r'(<header class="post-header">.*?</header>)',lambda x:x.group(1)+fig,s,count=1,flags=re.S)
    open(path,'w',encoding='utf-8').write(s);return True
if __name__=='__main__':
    files=sys.argv[1:] or sorted(f for f in glob.glob('blog/*/*.html')+glob.glob('en/blog/*/*.html') if not f.endswith('/index.html'))
    n=sum(add(f) for f in files);print('đã thêm bìa vào',n,'bài')
