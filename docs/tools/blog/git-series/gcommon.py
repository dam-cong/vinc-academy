import sys,os,html
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
from gitlib import *
from lib import box,fig
I='                '
def srcs(items):
    return I+'<ul class="sources">\n'+''.join(I+'    <li><a href="%s" target="_blank" rel="noopener">%s</a></li>\n'%(u,t) for u,t in items)+I+'</ul>\n'
def GD(n,t=None): return ('https://git-scm.com/docs/%s'%n,t or 'Git – %s'%n)
def tbl(head,rows):
    h=''.join('<th>%s</th>'%x for x in head)
    r=''.join('<tr>'+''.join('<td>%s</td>'%x for x in row)+'</tr>\n'+I+'            ' for row in rows)
    return I+'<div class="table-wrap">\n'+I+'    <table>\n'+I+'        <thead>\n'+I+'            <tr>%s</tr>\n'%h+I+'        </thead>\n'+I+'        <tbody>\n'+I+'            '+r.rstrip()+'\n'+I+'        </tbody>\n'+I+'    </table>\n'+I+'</div>\n'
def call(title,items):
    o=I+'<div class="callout">\n'+I+'    <p class="callout-title">%s</p>\n'%title;ul=False
    for x in items:
        if x.startswith('<pre'):
            if ul: o+=I+'    </ul>\n';ul=False
            o+=x+'\n'
        else:
            if not ul: o+=I+'    <ul>\n';ul=True
            o+=I+'        <li>%s</li>\n'%x
    if ul: o+=I+'    </ul>\n'
    return o+I+'</div>\n'
def summ(text): return I+'<div class="callout">\n'+I+'    <p class="callout-title">%s</p>\n'%text[0]+I+'    <p>%s</p>\n'%text[1]+I+'</div>\n'
def cta(vi,t):
    a=t['vi' if vi else 'en'];up='../../' if vi else '../../../'
    return I+'<div class="cta-box">\n'+I+'    <h3>%s</h3>\n'%a[0]+I+'    <p>%s</p>\n'%a[1]+I+'    <div class="cta-actions">\n'+I+'        <a href="%sprogram-detail.html?code=DEV-F">%s</a>\n'%(up,'Xem khóa Developer Foundation' if vi else 'See Developer Foundation')+I+'        <a href="%sindex.html#register" class="ghost">%s</a>\n'%(up,'Nhận tư vấn miễn phí' if vi else 'Get free consultation')+I+'    </div>\n'+I+'</div>\n'
def ul(items): return I+'<ul>\n'+''.join(I+'    <li>%s</li>\n'%x for x in items)+I+'</ul>\n'
def p(x): return I+'<p>%s</p>\n'%x
def h2(i,x): return '\n'+I+'<h2 id="%s">%s</h2>\n'%(i,x)
def write(d,vi,en):
    open(d+'/vi_body.html','w',encoding='utf-8').write(vi);open(d+'/en_body.html','w',encoding='utf-8').write(en)
CTA=dict(vi=('Muốn làm việc nhóm với Git như ở doanh nghiệp?','Khóa Developer Foundation có phần Git &amp; làm việc nhóm: bài tập nhánh, merge request và review code từ mentor.'),en=('Want to work with Git the way companies do?','The Developer Foundation course includes Git and teamwork: branch, merge request and mentor code-review exercises.'))
COURSE0='''from odoo import fields, models


class VincCourse(models.Model):
    _name = 'vinc.course'
    _description = 'Khóa học'

    name = fields.Char(required=True)
    hours = fields.Integer(string='Số giờ')
'''
def base(sb,remote=False):
    """repo vinc_course với 2 commit (khung module + trường hours), cwd trong repo."""
    sb.q('mkdir -p vinc_course/models');sb.cd('vinc_course');sb.q('git init -q')
    sb.w('__manifest__.py',"{\n    'name': 'Vinc Course',\n    'version': '1.0',\n    'depends': ['base'],\n    'data': [],\n    'license': 'LGPL-3',\n}\n")
    sb.w('__init__.py','from . import models\n');sb.w('models/__init__.py','from . import course\n')
    sb.w('models/course.py',COURSE0.replace("    hours = fields.Integer(string='Số giờ')\n",''))
    sb.q('git add .;git commit -qm "[ADD] vinc_course: khung module và model vinc.course"')
    sb.w('models/course.py',COURSE0);sb.q('git commit -qam "[IMP] vinc_course: thêm trường số giờ"')
