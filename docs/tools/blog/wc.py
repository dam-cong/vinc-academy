import sys,glob,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from lib import words
TD=os.environ.get('TOPIC','odoo')
for f in sorted(glob.glob('blog/%s/*.html'%TD)+glob.glob('en/blog/%s/*.html'%TD)):
    if f.endswith('index.html'):continue
    print('%-60s %d'%(f,words(f)))
