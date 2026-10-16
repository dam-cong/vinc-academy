"""usage: python3 -I docs/tools/blog/publish.py <spec.py> [rebuild]  (chạy từ gốc repo).
spec.py định nghĩa SPEC (n, topic='odoo'|'python', prev, next, vi, en); thân bài ở <thư mục spec>/{vi,en}_body.html."""
import re,json,html,urllib.parse,sys,os,subprocess
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
from topics import TOPICS
B="https://vinc-academy.vercel.app"; D="2026-10-16"
spec={}; exec(open(sys.argv[1],encoding='utf-8').read(),spec); S=spec['SPEC']
REB=len(sys.argv)>2 and sys.argv[2]=='rebuild'
n=S['n']; NN='%02d'%n; TP=TOPICS[S.get('topic','odoo')]; TD=TP['dir']
TPL={'vi':'blog/odoo/tao-module-odoo-dau-tien.html','en':'en/blog/odoo/first-odoo-module.html'}
DIR={'vi':'blog/%s/'%TD,'en':'en/blog/%s/'%TD}
STR={'vi':dict(home='Trang chủ',kn='Kiến thức',upd='Cập nhật: ',date='16/10/2026',by='Đội ngũ Vinc Academy',tocname='Mục lục',share='Chia sẻ:',sn='Điều hướng series',tagp='Bài %d · '+TP['vi']['tag'],prevl='← Bài trước',nxtl='Bài tiếp theo →',hub=TP['vi']['series'],hubl='Về series →',hubb='← Về series',pub='Đã xuất bản',soon='Sắp ra mắt',num='Bài',mins='%d phút đọc',og='BÀI %s · '+TP['vi']['og'],tname=TP['vi']['name']),
 'en':dict(home='Home',kn='Knowledge',upd='Updated: ',date='October 16, 2026',by='Vinc Academy Team',tocname='Contents',share='Share:',sn='Series navigation',tagp='Part %d · '+TP['en']['tag'],prevl='← Previous',nxtl='Next →',hub=TP['en']['series'],hubl='Back to series →',hubb='← Back to series',pub='Published',soon='Coming soon',num='Part',mins='%d min read',og='PART %s · '+TP['en']['og'],tname=TP['en']['name'])}
def rw(p,f):
    s=open(p,encoding='utf-8').read();t=f(s);assert t!=s,(p,'unchanged');open(p,'w',encoding='utf-8').write(t)
for k in ('vi','en'):
    c=S[k];st=STR[k];slug=c['slug'];out=DIR[k]+slug;alt=DIR['en' if k=='vi' else 'vi']+S['en' if k=='vi' else 'vi']['slug']
    t=open(TPL[k],encoding='utf-8').read()
    esc=lambda s:html.escape(s,quote=True)
    url=B+'/'+out; alturl=B+'/'+alt; vi=url if k=='vi' else alturl; en=alturl if k=='vi' else url
    ogimg=slug.replace('.html','.png')
    t=re.sub(r'<title>.*?</title>','<title>%s</title>'%html.escape(c['title'],quote=False),t,count=1)
    for a,v in [('description',c['desc']),('keywords',c['kw'])]:
        t=re.sub(r'(<meta name="%s" content=")[^"]*'%a,lambda m:m.group(1)+esc(v),t)
    t=re.sub(r'(rel="canonical" href=")[^"]*',lambda m:m.group(1)+url,t)
    t=re.sub(r'(hreflang="vi" href=")[^"]*',lambda m:m.group(1)+vi,t)
    t=re.sub(r'(hreflang="en" href=")[^"]*',lambda m:m.group(1)+en,t)
    t=re.sub(r'(hreflang="x-default" href=")[^"]*',lambda m:m.group(1)+vi,t)
    t=re.sub(r'(og:title" content=")[^"]*',lambda m:m.group(1)+esc(c['title']),t)
    t=re.sub(r'(og:description" content=")[^"]*',lambda m:m.group(1)+esc(c['ogd']),t)
    t=re.sub(r'(og:url" content=")[^"]*',lambda m:m.group(1)+url,t)
    t=re.sub(r'(og:image" content=")[^"]*',lambda m:m.group(1)+B+'/image/og/'+ogimg,t)
    t=re.sub(r'data-alt="[^"]*"','data-alt="%s"'%('../../en/blog/%s/'%TD if k=='vi' else '../../../blog/%s/'%TD)+S['en' if k=='vi' else 'vi']['slug']+'"',t)
    pre='/en' if k=='en' else ''
    names=[st['home'],st['kn'],st['tname'],c['crumb']]
    ld={"@context":"https://schema.org","@graph":[
     {"@type":"TechArticle","headline":c['title'],"description":c['ogd'],"inLanguage":k,"datePublished":D,"dateModified":D,"image":B+'/image/og/'+ogimg,"mainEntityOfPage":url,"proficiencyLevel":S.get('level','Beginner'),"dependencies":TP['deps'],
      "author":{"@type":"Organization","name":"Vinc Academy","url":B+"/"},
      "publisher":{"@type":"EducationalOrganization","name":"Vinc Academy","logo":{"@type":"ImageObject","url":B+"/image/vinc-academy.png"}},
      "copyrightHolder":{"@type":"Organization","name":"Vinc Academy"},"copyrightYear":2026},
     {"@type":"BreadcrumbList","itemListElement":[
       {"@type":"ListItem","position":1,"name":names[0],"item":B+"/"},
       {"@type":"ListItem","position":2,"name":names[1],"item":B+pre+"/blog/"},
       {"@type":"ListItem","position":3,"name":names[2],"item":B+pre+"/blog/"+TD+"/"},
       {"@type":"ListItem","position":4,"name":names[3]}]},
     {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in c['faq']]}]}
    ldtxt=json.dumps(ld,ensure_ascii=False,indent=4); ldtxt='\n'.join('    '+l for l in ldtxt.split('\n'))
    t=re.sub(r'(<script type="application/ld\+json">\s*).*?(\s*</script>)',lambda m:m.group(1)+ldtxt.strip()+m.group(2),t,count=1,flags=re.S)
    faq='<div class="faq-list">\n'+''.join('''                    <div class="faq-item">
                        <div class="faq-q" onclick="toggleFaq(this)"><span>%s</span> <span class="faq-arrow">▾</span></div>
                        <div class="faq-a">%s</div>
                    </div>
'''%(html.escape(q,quote=False),html.escape(a,quote=False)) for q,a in c['faq'])+'                </div>'
    body=open(os.path.dirname(os.path.abspath(sys.argv[1]))+'/%s_body.html'%k,encoding='utf-8').read().replace('{FAQ}',faq)
    ids=re.findall(r'<h2 id="([^"]+)">(.*?)</h2>',body)
    toc=[(i,tt) for i,tt in ids if i not in('nguon','sources')]
    toc='\n'.join('                        <li><a href="#%s">%s</a></li>'%(i,html.unescape(re.sub('<[^>]+>','',tt)) if False else re.sub('<[^>]+>','',tt)) for i,tt in toc)
    disc='<p class="disclaimer">%s</p>'%TP[k]['disc'] if TP[k].get('disc') else re.search(r'<p class="disclaimer">.*?</p>',t,re.S).group(0)
    enc=urllib.parse.quote(url,safe='')
    pv=S['prev'][k] if S.get('prev') else ('index.html',st['hubb'],st['hub'])
    if S.get('next'):
        nx='<span class="next"><small>%s</small>%s</span>'%(('Bài tiếp theo · Sắp ra mắt' if k=='vi' else 'Next · Coming soon'),S['next'][k])
    else:
        nx='<a class="next" href="index.html"><small>%s</small>%s</a>'%(st['hubl'],st['hub'])
    main='''<main class="blog-wrap">
        <ol class="breadcrumb">
            <li><a href="%s">%s</a></li>
            <li><a href="../index.html">%s</a></li>
            <li><a href="index.html">%s</a></li>
            <li aria-current="page">%s</li>
        </ol>

        <header class="post-header">
            <span class="section-tag">%s</span>
            <h1>%s</h1>
            <p class="post-lead">%s</p>
            <div class="post-meta">
                <span><i class="fa-regular fa-calendar"></i> %s<time datetime="%s">%s</time></span>
                <span><i class="fa-regular fa-clock"></i> %s</span>
                <span><i class="fa-solid fa-pen-nib"></i> %s</span>
            </div>
        </header>

        <div class="post-layout">
            <article class="prose">

%s
                <div class="share-row">
                    <span>%s</span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=%s" target="_blank" rel="noopener"><i class="fa-brands fa-facebook"></i> Facebook</a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=%s" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                </div>

                <div class="series-nav" role="navigation" aria-label="%s">
                    <a href="%s"><small>%s</small>%s</a>
                    %s
                </div>

                %s
            </article>

            <aside>
                <details class="toc" open>
                    <summary>%s</summary>
                    <ol>
%s
                    </ol>
                </details>
            </aside>
        </div>
    </main>'''%('../../index.html' if k=='vi' else '../../../index.html',names[0],names[1],names[2],names[3],st['tagp']%n,html.escape(c['h1'],quote=False),c['lead'],st['upd'],D,st['date'],st['mins']%c['mins'],st['by'],body,st['share'],enc,enc,st['sn'],pv[0],st['prevl'],pv[1],nx,disc,st['tocname'],toc)
    t=re.sub(r'<main class="blog-wrap">.*?</main>',lambda m:main,t,count=1,flags=re.S)
    open(out,'w',encoding='utf-8').write(t)
    if REB: continue
    # wiring: hub card, hub JSON-LD, previous article next link
    hub=DIR[k]+'index.html'
    num=r'%s %s'%(st['num'],NN)
    rw(hub,lambda s:re.sub(r'<li><div class="post-card soon">(<span class="post-num">%s</span>.*?)<span class="post-status">%s</span></div></li>'%(num,st['soon']),lambda m:'<li><a class="post-card" href="%s">%s<span class="post-status">%s</span></a></li>'%(slug,m.group(1),st['pub']),s,count=1,flags=re.S))
    item='{ "@type": "TechArticle", "headline": %s, "url": "%s" }'%(json.dumps(c['title'],ensure_ascii=False),url)
    def hp(s):
        if re.search(r'"hasPart": \[\s*\]',s): return re.sub(r'"hasPart": \[\s*\]',lambda m:'"hasPart": [\n            '+item+'\n        ]',s,count=1)
        return re.sub(r'html" \}\n(\s*)\]',lambda m:'html" },\n            '+item+'\n'+m.group(1)+']',s,count=1)
    rw(hub,hp)
    if S.get('prev'): rw(DIR[k]+S['prev'][k][0],lambda s:re.sub(r'<span class="next"><small>[^<]*</small>(.*?)</span>',lambda m:'<a class="next" href="%s"><small>%s</small>%s</a>'%(slug,st['nxtl'],m.group(1)),s,count=1))
    # OG
    og='t=%s&h=%s&p=%s&b=Vinc Academy · Odoo'%(st['og']%NN,c['og_h'],c['og_p'])
    U=urllib.parse.quote(og,safe='=&')
    tmp='/tmp/vinc-og.html';open(tmp,'w',encoding='utf-8').write(open(HERE+'/og.html',encoding='utf-8').read().replace('__REPO__',os.getcwd()))
    subprocess.run(['google-chrome','--headless=new','--no-sandbox','--disable-gpu','--allow-file-access-from-files','--hide-scrollbars','--window-size=1200,630','--virtual-time-budget=4000','--screenshot=%s/image/og/%s'%(os.getcwd(),ogimg),'file://%s?%s'%(tmp,U)],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
if REB: print('rebuilt',n); sys.exit()
# sitemap
viu=B+'/blog/%s/'%TD+S['vi']['slug'];enu=B+'/en/blog/%s/'%TD+S['en']['slug']
def u(loc,pr):return f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{D}</lastmod>\n    <priority>{pr}</priority>\n    <xhtml:link rel="alternate" hreflang="vi" href="{viu}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="{enu}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="{viu}"/>\n  </url>\n'
rw('sitemap.xml',lambda s:s.replace('</urlset>',u(viu,'0.8')+u(enu,'0.6')+'</urlset>'))
# handoff row
def hrow(s):
    s=re.sub(r'\| %s \|[^\n]*\n'%NN,'| %s | `%s` – %s | `%s` | ✅ Đã xuất bản |\n'%(NN,S['vi']['slug'],S['vi']['crumb'],S['en']['slug']),s,count=1)
    nn='%02d'%(n+1)
    s=re.sub(r'(\| %s \|[^\n]*?)\| \| ⏳ \|'%nn,r'\1| | ⏳ Tiếp theo |',s,count=1)
    s=re.sub(r'bài 1–\d+ / 14','bài 1–%d / 14'%n,s)
    return s
if os.path.exists(TP['handoff']): rw(TP['handoff'],hrow)
print('published',n)
