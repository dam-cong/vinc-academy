import re,html,os
def ins(path,marker,text,before=True,count=1):
    s=open(path,encoding='utf-8').read()
    assert s.count(marker)>=1,(path,marker[:50])
    s=s.replace(marker,(text+marker) if before else (marker+text),count)
    open(path,'w',encoding='utf-8').write(s)
def rep(path,a,b):
    s=open(path,encoding='utf-8').read()
    assert a in s,(path,a[:50]);open(path,'w',encoding='utf-8').write(s.replace(a,b,1))
def words(path):
    t=open(path,encoding='utf-8').read()
    a=re.search(r'<article.*?</article>',t,re.S).group(0)
    a=re.sub(r'<pre.*?</pre>','',a,flags=re.S)
    return len(re.findall(r'\S+',re.sub(r'<[^>]+>',' ',html.unescape(a))))
def box(x,y,w,h,title,sub='',accent=False):
    c='dg-accent' if accent else 'dg-box'
    s='<rect class="%s" x="%d" y="%d" width="%d" height="%d" rx="12" />\n'%(c,x,y,w,h)
    s+='<text class="dg-title" x="%d" y="%d">%s</text>\n'%(x+16,y+28,title)
    if sub: s+='<text class="dg-text" x="%d" y="%d">%s</text>\n'%(x+16,y+h-16,sub)
    return s
def fig(vb,title,body,cap,idn):
    ind='                    '
    body='\n'.join(ind+'    '+l for l in body.strip().split('\n'))
    return '''                <figure class="diagram">
                    <svg viewBox="0 0 %s" role="img" aria-labelledby="%s">
                        <title id="%s">%s</title>
%s
                    </svg>
                    <figcaption>%s</figcaption>
                </figure>

'''%(vb,idn,idn,title,body,cap)
