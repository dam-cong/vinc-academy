import re,html,glob,sys,os
D=os.environ.get('DOCS','.')
TD=os.environ.get('TOPIC','odoo')
srcs=''.join(open(f,errors='ignore').read() for f in glob.glob(D+'/*.txt'))
w=lambda t:re.findall(r"\w+",t.lower());sw=w(srcs);sg={tuple(sw[i:i+5]) for i in range(len(sw)-4)}
for f in sorted(glob.glob('en/blog/%s/*.html'%TD)):
    if f.endswith('index.html'):continue
    t=open(f,encoding='utf-8').read();m=re.search(r'<article.*?</article>',t,re.S).group(0)
    m=re.sub(r'<pre.*?</pre>|<table.*?</table>|<h[23][^>]*>.*?</h[23]>|<p class="code-title">.*?</p>',' ',m,flags=re.S);m=re.sub(r'<[^>]+>',' ',html.unescape(m))
    tw=w(m);hits=[' '.join(tw[i:i+5]) for i in range(len(tw)-4) if tuple(tw[i:i+5]) in sg]
    print(os.path.basename(f)[:46],len(hits),hits[:0])
