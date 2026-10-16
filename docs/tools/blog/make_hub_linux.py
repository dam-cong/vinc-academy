"""Tạo hub chủ đề linux (VI+EN) từ hub Odoo, và sinh ảnh OG. Chạy một lần từ gốc repo:
python3 -I docs/tools/blog/make_hub_linux.py
Hub chỉ có phần giới thiệu (chưa có bài), theo phong cách các hub khác."""
import re,json,os,subprocess,urllib.parse,html as html_lib
HERE=os.path.dirname(os.path.abspath(__file__))
B="https://vinc-academy.vercel.app"
CFG={'vi':dict(src='blog/odoo/index.html',out='blog/linux/index.html',up='../../',alt='../../en/blog/linux/index.html',lang='vi',locale='vi_VN',
 title='Linux &amp; Shell: dòng lệnh thực chiến cho lập trình viên | Vinc Academy',
 desc='Học Linux và dòng lệnh từ con số không: quản lý file, quyền, tiến trình, pipe, biến môi trường và viết script Bash phục vụ công việc lập trình. Miễn phí, từ Vinc Academy.',
 ogt='Linux &amp; Shell: dòng lệnh thực chiến',tag='Chủ đề · Miễn phí',h1='Linux &amp; Shell',crumb='Linux &amp; Shell',
 url=B+'/blog/linux/',
 lead='Làm chủ dòng lệnh Linux vừa đủ để làm việc: di chuyển và quản lý file, quyền truy cập, tiến trình, pipe và script Bash — những thứ bạn dùng mỗi ngày khi làm việc với server, Git và triển khai Odoo.',
 p1='Phần lớn server chạy Linux, và hầu hết công việc triển khai, gỡ lỗi hay tự động hóa đều bắt đầu từ một cửa sổ terminal. Biết dòng lệnh giúp bạn đọc log, tìm file, kiểm tra tiến trình và viết script thay vì làm thủ công từng bước.',
 p2='Series này đang được biên soạn theo phong cách của các chủ đề khác tại Vinc Academy: ít lý thuyết, ví dụ chạy thật trên Linux (WSL, máy ảo hoặc server), mỗi lệnh đều có kết quả kèm theo. Hãy để lại lời nhắn nếu bạn muốn được thông báo khi bài đầu tiên lên sóng.',
 cta=('Muốn học Linux &amp; dòng lệnh cùng mentor?','Các khóa tại Vinc Academy có bài tập thực tế trên môi trường Linux và review trực tiếp.','Xem khóa Developer Foundation','Nhận tư vấn miễn phí'),
 disc='Nội dung thuộc bản quyền của Vinc Academy. Linux là nhãn hiệu của Linus Torvalds; Bash và các công cụ GNU thuộc dự án GNU. Vinc Academy là đơn vị đào tạo độc lập, không liên kết chính thức với các tổ chức này.',
 og=dict(t='CHỦ ĐỀ · LINUX & SHELL',h='Linux & Shell',p='Dòng lệnh thực chiến cho lập trình viên')),
 'en':dict(src='en/blog/odoo/index.html',out='en/blog/linux/index.html',up='../../../',alt='../../../blog/linux/index.html',lang='en',locale='en_US',
 title='Linux &amp; Shell: Practical Command Line for Developers | Vinc Academy',
 desc='Learn Linux and the command line from scratch: files, permissions, processes, pipes, environment variables and Bash scripting for development work. Free from Vinc Academy.',
 ogt='Linux &amp; Shell: Practical Command Line',tag='Topic · Free',h1='Linux &amp; Shell',crumb='Linux &amp; Shell',
 url=B+'/en/blog/linux/',
 lead='Master just enough Linux command line to get work done: moving around and managing files, permissions, processes, pipes and Bash scripts — the things you use every day with servers, Git and Odoo deployments.',
 p1='Most servers run Linux, and nearly all deployment, debugging or automation work starts in a terminal window. Knowing the command line lets you read logs, find files, inspect processes and write scripts instead of doing things by hand.',
 p2='This series is being written in the style of the other Vinc Academy topics: little theory, examples really run on Linux (WSL, a virtual machine or a server), each command with its output. Leave a message if you would like to hear when the first part goes live.',
 cta=('Want to learn Linux &amp; the command line with a mentor?','Vinc Academy courses include hands-on exercises on a Linux environment and live code review.','See Developer Foundation','Get free consultation'),
 disc='This content is copyrighted by Vinc Academy. Linux is a trademark of Linus Torvalds; Bash and the GNU tools belong to the GNU Project. Vinc Academy is an independent training provider and is not officially affiliated with these organizations.',
 og=dict(t='TOPIC · LINUX & SHELL',h='Linux & Shell',p='Practical command line for developers'))}
for k,c in CFG.items():
    h=open(c['src'],encoding='utf-8').read()
    h=re.sub(r'<title>.*?</title>','<title>%s</title>'%c['title'],h,count=1)
    h=re.sub(r'(<meta name="description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    h=re.sub(r'(rel="canonical" href=")[^"]*',lambda m:m.group(1)+c['url'],h)
    vi=B+'/blog/linux/';en=B+'/en/blog/linux/'
    h=re.sub(r'(hreflang="vi" href=")[^"]*',lambda m:m.group(1)+vi,h);h=re.sub(r'(hreflang="en" href=")[^"]*',lambda m:m.group(1)+en,h);h=re.sub(r'(hreflang="x-default" href=")[^"]*',lambda m:m.group(1)+vi,h)
    h=re.sub(r'(og:title" content=")[^"]*',lambda m:m.group(1)+c['ogt'],h);h=re.sub(r'(og:description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    h=re.sub(r'(og:url" content=")[^"]*',lambda m:m.group(1)+c['url'],h);h=re.sub(r'(og:image" content=")[^"]*',lambda m:m.group(1)+B+'/image/og/linux-hub'+('-en' if k=='en' else '')+'.png',h)
    h=re.sub(r'data-alt="[^"]*"','data-alt="%s"'%c['alt'],h)
    ld=('{\n        "@context": "https://schema.org",\n        "@type": "CollectionPage",\n        "name": "%s",\n        "description": "%s",\n        "url": "%s",\n        "inLanguage": "%s",\n        "publisher": { "@type": "EducationalOrganization", "name": "Vinc Academy", "url": "%s/" },\n        "hasPart": [\n        ]\n    }')%(c['ogt'],c['desc'],c['url'],c['lang'],B)
    h=re.sub(r'(<script type="application/ld\+json">\s*).*?(\s*</script>)',lambda m:m.group(1)+ld+m.group(2),h,count=1,flags=re.S)
    up=c['up']
    main=('<main class="blog-wrap">\n        <ol class="breadcrumb">\n            <li><a href="%sindex.html">%s</a></li>\n            <li><a href="../index.html">%s</a></li>\n            <li aria-current="page">%s</li>\n        </ol>\n\n        <header class="hub-hero">\n            <span class="section-tag">%s</span>\n            <h1>%s</h1>\n            <p class="post-lead">%s</p>\n        </header>\n\n        <div class="prose" style="max-width:none">\n            <p>%s</p>\n            <p>%s</p>\n            <div class="cta-box">\n                <h3>%s</h3>\n                <p>%s</p>\n                <div class="cta-actions">\n                    <a href="%sprogram-detail.html?code=DEV-F">%s</a>\n                    <a href="%sindex.html#register" class="ghost">%s</a>\n                </div>\n            </div>\n        </div>\n\n        <p class="disclaimer">%s</p>\n    </main>')%(up,'Trang chủ' if k=='vi' else 'Home','Kiến thức' if k=='vi' else 'Knowledge',c['crumb'],c['tag'],c['h1'],c['lead'],c['p1'],c['p2'],c['cta'][0],c['cta'][1],up,c['cta'][2],up,c['cta'][3],c['disc'])
    h=re.sub(r'<main class="blog-wrap">.*?</main>',lambda m:main,h,count=1,flags=re.S)
    os.makedirs(os.path.dirname(c['out']),exist_ok=True)
    open(c['out'],'w',encoding='utf-8').write(h)
    print(c['out'])
    # OG (textContent không decode HTML entity -> unescape trước, rồi quote từng giá trị)
    def Q(s):
        return urllib.parse.quote(html_lib.unescape(s), safe='')
    og = 't=%s&h=%s&p=%s&b=%s' % (Q(c['og']['t']), Q(c['og']['h']), Q(c['og']['p']), Q('Vinc Academy'))
    U = og
    tmp='/tmp/vinc-og-linux.html';open(tmp,'w',encoding='utf-8').write(open(HERE+'/og.html',encoding='utf-8').read().replace('__REPO__',os.getcwd()))
    img='linux-hub'+('-en' if k=='en' else '')+'.png'
    subprocess.run(['google-chrome','--headless=new','--no-sandbox','--disable-gpu','--allow-file-access-from-files','--hide-scrollbars','--window-size=1200,630','--virtual-time-budget=4000','--screenshot=%s/image/og/%s'%(os.getcwd(),img),'file://%s?%s'%(tmp,U)],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    print('image/og/'+img)
