"""Tạo hub chủ đề python (VI+EN) từ hub Odoo. Chạy một lần từ gốc repo: python3 -I docs/tools/blog/make_hub.py"""
import re,json,os
B="https://vinc-academy.vercel.app"
CARDS=[("Làm quen Python: cài đặt, venv và pip","Cài Python 3.12, tạo môi trường ảo, chạy script và cài thư viện cho dự án Odoo.","Getting started with Python: install, venv and pip","Install Python 3.12, create a virtual environment, run scripts and install libraries for an Odoo project."),
("Biến, kiểu dữ liệu và chuỗi","Số, chuỗi, f-string và ép kiểu qua ví dụ mã khóa học và thông báo log.","Variables, data types and strings","Numbers, strings, f-strings and casting through course codes and log messages."),
("Điều kiện và vòng lặp","if, for, while, match với danh sách khóa học, nền tảng của for record in self.","Conditions and loops","if, for, while and match on a list of courses, the groundwork for for record in self."),
("List, tuple, set và dict","Các cấu trúc dữ liệu bạn gặp trong vals, domain và Command của Odoo.","Lists, tuples, sets and dicts","The data structures you meet in Odoo's vals, domains and Commands."),
("Hàm: tham số, **kwargs và lambda","Viết hàm gọn, dùng tham số mặc định và hiểu default=lambda self: trong Odoo.","Functions: parameters, **kwargs and lambda","Write tidy functions, use default arguments and understand default=lambda self: in Odoo."),
("Comprehension, generator và sorted/filter","Xử lý danh sách gọn như mapped, filtered, sorted của recordset.","Comprehensions, generators and sorted/filter","Process lists as neatly as a recordset's mapped, filtered and sorted."),
("Module, package và import","Cách Python tìm và nạp mã, và vì sao module Odoo có __init__.py.","Modules, packages and imports","How Python finds and loads code, and why Odoo modules have __init__.py."),
("Class và đối tượng","Thuộc tính, method, @property và cách class Python trở thành model Odoo.","Classes and objects","Attributes, methods, @property and how a Python class becomes an Odoo model."),
("Kế thừa, super() và decorator","Hiểu super().create(), @api.depends và tự viết decorator của riêng bạn.","Inheritance, super() and decorators","Understand super().create(), @api.depends and write your own decorators."),
("Xử lý lỗi và câu lệnh with","try/except, raise và exception tùy biến, tương ứng ValidationError, UserError.","Error handling and the with statement","try/except, raise and custom exceptions, mirroring ValidationError and UserError."),
("Làm việc với file, JSON và CSV","Đọc ghi file, pathlib, JSON và CSV để xuất nhập dữ liệu khóa học.","Working with files, JSON and CSV","File I/O, pathlib, JSON and CSV for exporting and importing course data."),
("Ngày giờ và regex","datetime, timedelta, múi giờ và regex để kiểm tra mã khóa học, email.","Dates, times and regex","datetime, timedelta, time zones and regex to validate course codes and emails."),
("Gọi API với requests","Gửi request, đọc JSON, xử lý lỗi và timeout, gọi thử API JSON-2 của Odoo.","Calling APIs with requests","Send requests, read JSON, handle errors and timeouts, try Odoo's JSON-2 API."),
("Debug, logging, test và dự án nhỏ","pdb, logging, unittest, type hints và script nhập khóa học vào Odoo.","Debugging, logging, tests and a small project","pdb, logging, unittest, type hints and a script that imports courses into Odoo.")]
CFG={'vi':dict(src='blog/odoo/index.html',out='blog/python/index.html',up='../../',alt='../../en/blog/python/index.html',lang='vi',locale='vi_VN',
 title='Python thực chiến cho lập trình viên Odoo | Vinc Academy',desc='Học Python cơ bản qua ví dụ thực tế của lập trình viên Odoo: biến, hàm, OOP, decorator, xử lý lỗi, file, API. Miễn phí, từ Vinc Academy.',
 ogt='Python thực chiến cho lập trình viên Odoo',tag='Chủ đề · Miễn phí',h1='Python',lead='Học Python vừa đủ để làm việc: mỗi bài dùng ví dụ từ dự án quản lý khóa học và chỉ ra nó xuất hiện ở đâu trong mã Odoo. Ít lý thuyết, nhiều đoạn code chạy được.',
 st='Series: Python thực chiến cho lập trình viên Odoo',sd='14 bài từ cài đặt môi trường, kiểu dữ liệu, hàm, OOP đến xử lý lỗi, file, API và một dự án nhỏ.',
 num='Bài',soon='Sắp ra mắt',crumb='Python',url=B+'/blog/python/',alt_url=B+'/en/blog/python/',cta=('Muốn học Python bài bản với mentor?','Khóa Developer Foundation có phần Python Fundamentals với bài tập thực tế và review code.','Xem khóa Developer Foundation','Nhận tư vấn miễn phí'),
 disc='Nội dung thuộc bản quyền của Vinc Academy. Python là nhãn hiệu của Python Software Foundation; Odoo là nhãn hiệu của Odoo S.A. Vinc Academy là đơn vị đào tạo độc lập, không liên kết chính thức với các tổ chức này.'),
 'en':dict(src='en/blog/odoo/index.html',out='en/blog/python/index.html',up='../../../',alt='../../../blog/python/index.html',lang='en',locale='en_US',
 title='Practical Python for Odoo Developers | Vinc Academy',desc='Learn core Python through real Odoo developer examples: variables, functions, OOP, decorators, error handling, files and APIs. Free from Vinc Academy.',
 ogt='Practical Python for Odoo Developers',tag='Topic · Free',h1='Python',lead='Learn just enough Python to get work done: every part uses examples from the course management project and shows where it appears in Odoo code. Little theory, lots of runnable code.',
 st='Series: Practical Python for Odoo Developers',sd='14 parts from setting up your environment, data types, functions and OOP to error handling, files, APIs and a small project.',
 num='Part',soon='Coming soon',crumb='Python',url=B+'/en/blog/python/',alt_url=B+'/blog/python/',cta=('Want to learn Python properly with a mentor?','The Developer Foundation course includes a Python Fundamentals module with real exercises and code review.','See Developer Foundation','Get free consultation'),
 disc='This content is copyrighted by Vinc Academy. Python is a trademark of the Python Software Foundation; Odoo is a trademark of Odoo S.A. Vinc Academy is an independent training provider and is not officially affiliated with these organizations.')}
for k,c in CFG.items():
    h=open(c['src'],encoding='utf-8').read()
    h=re.sub(r'<title>.*?</title>','<title>%s</title>'%c['title'],h,count=1)
    h=re.sub(r'(<meta name="description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    for a,v in [('canonical" href',c['url'])]:
        h=re.sub(r'(rel="canonical" href=")[^"]*',lambda m:m.group(1)+v,h)
    vi=B+'/blog/python/';en=B+'/en/blog/python/'
    h=re.sub(r'(hreflang="vi" href=")[^"]*',lambda m:m.group(1)+vi,h);h=re.sub(r'(hreflang="en" href=")[^"]*',lambda m:m.group(1)+en,h);h=re.sub(r'(hreflang="x-default" href=")[^"]*',lambda m:m.group(1)+vi,h)
    h=re.sub(r'(og:title" content=")[^"]*',lambda m:m.group(1)+c['ogt'],h);h=re.sub(r'(og:description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    h=re.sub(r'(og:url" content=")[^"]*',lambda m:m.group(1)+c['url'],h);h=re.sub(r'(og:image" content=")[^"]*',lambda m:m.group(1)+B+'/image/og/python-hub'+('-en' if k=='en' else '')+'.png',h)
    h=re.sub(r'data-alt="[^"]*"','data-alt="%s"'%c['alt'],h)
    ld=('{\n        "@context": "https://schema.org",\n        "@type": "CollectionPage",\n        "name": "%s",\n        "description": "%s",\n        "url": "%s",\n        "inLanguage": "%s",\n        "publisher": { "@type": "EducationalOrganization", "name": "Vinc Academy", "url": "%s/" },\n        "hasPart": [\n        ]\n    }')%(c['ogt'],c['desc'],c['url'],c['lang'],B)
    h=re.sub(r'(<script type="application/ld\+json">\s*).*?(\s*</script>)',lambda m:m.group(1)+ld+m.group(2),h,count=1,flags=re.S)
    cards=''.join('            <li><div class="post-card soon"><span class="post-num">%s %02d</span><h2>%s</h2><p>%s</p><span class="post-status">%s</span></div></li>\n'%(c['num'],i+1,(x[0] if k=='vi' else x[2]).replace('&','&amp;'),(x[1] if k=='vi' else x[3]).replace('&','&amp;'),c['soon']) for i,x in enumerate(CARDS))
    up=c['up'];mn=up[3:]
    main=('<main class="blog-wrap">\n        <ol class="breadcrumb">\n            <li><a href="%sindex.html">%s</a></li>\n            <li><a href="../index.html">%s</a></li>\n            <li aria-current="page">%s</li>\n        </ol>\n\n        <header class="hub-hero">\n            <span class="section-tag">%s</span>\n            <h1>%s</h1>\n            <p class="post-lead">%s</p>\n        </header>\n\n        <h2 class="series-title">%s</h2>\n        <p class="series-desc">%s</p>\n\n        <ol class="post-grid">\n%s        </ol>\n\n        <div class="prose" style="max-width:none">\n            <div class="cta-box">\n                <h3>%s</h3>\n                <p>%s</p>\n                <div class="cta-actions">\n                    <a href="%sprogram-detail.html?code=DEV-F">%s</a>\n                    <a href="%sindex.html#register" class="ghost">%s</a>\n                </div>\n            </div>\n        </div>\n\n        <p class="disclaimer">%s</p>\n    </main>')%(up,'Trang chủ' if k=='vi' else 'Home','Kiến thức' if k=='vi' else 'Knowledge',c['crumb'],c['tag'],c['h1'],c['lead'],c['st'],c['sd'],cards,c['cta'][0],c['cta'][1],up,c['cta'][2],up,c['cta'][3],c['disc'])
    h=re.sub(r'<main class="blog-wrap">.*?</main>',lambda m:main,h,count=1,flags=re.S)
    os.makedirs(os.path.dirname(c['out']),exist_ok=True)
    open(c['out'],'w',encoding='utf-8').write(h)
    print(c['out'])
