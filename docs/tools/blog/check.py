"""usage: TOPIC=python python3 -I docs/tools/blog/check.py vi_slug en_slug src1.txt src2.txt ... (từ gốc repo; mặc định TOPIC=odoo)"""
import re,json,os,html,sys,glob
TD=os.environ.get('TOPIC','odoo')
vs,es=sys.argv[1:3];src=''.join(open(f).read() for f in sys.argv[3:])
w=lambda t:re.findall(r"\w+",t.lower());sw=w(src);sg={tuple(sw[i:i+5]) for i in range(len(sw)-4)}
for f in ['blog/%s/'%TD+vs,'en/blog/%s/'%TD+es]:
    t=open(f,encoding='utf-8').read()
    m=re.search(r'<article.*?</article>',t,re.S).group(0);m=re.sub(r'<pre.*?</pre>','',m,flags=re.S);m=re.sub(r'</t[dh]>',' . ',m);m=re.sub(r'<[^>]+>',' ',html.unescape(m))
    tw=w(m);hits=[' '.join(tw[i:i+5]) for i in range(len(tw)-4) if tuple(tw[i:i+5]) in sg]
    title=html.unescape(re.search(r'<title>(.*?)</title>',t).group(1));d=html.unescape(re.search(r'name="description" content="([^"]*)',t).group(1))
    ld=json.loads(re.search(r'application/ld\+json">(.*?)</script>',t,re.S).group(1))
    fj=[(q['name'],q['acceptedAnswer']['text']) for q in ld['@graph'][2]['mainEntity']]
    fh=[(html.unescape(a),html.unescape(b)) for a,b in re.findall(r'<div class="faq-q"[^>]*><span>(.*?)</span>.*?<div class="faq-a">(.*?)</div>',t,re.S)]
    ids=set(re.findall(r'<h2 id="([^"]+)"',t))|set(re.findall(r'<h3 id="([^"]+)"',t));toc=set(re.findall(r'<li><a href="#([^"]+)"',t.split('<aside>')[1]))
    bad=[u for u in re.findall(r'(?:href|src|data-alt)="([^"#?:]+?)(?:[#?][^"]*)?"',t) if not u.startswith(('http','//')) and not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(f),u)))]
    print(f,'| hits',len(hits),hits,'| title',len(title),'desc',len(d),'| faq',fj==fh,'| toc',toc<=ids,'| 404',bad)
import xml.dom.minidom as m;print('sitemap',len(m.parse('sitemap.xml').getElementsByTagName('url')))
