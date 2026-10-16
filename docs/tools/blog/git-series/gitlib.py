"""Chạy lệnh git thật trong sandbox và tạo transcript cho bài viết (deterministic)."""
import os,subprocess,shutil,sys,html
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
ROOT=os.environ.get('GIT_SERIES_TMP','/tmp/git-series-sandbox')
def pre(c): return '<pre><code>'+html.escape(c.rstrip('\n'),quote=False)+'</code></pre>\n'
class SB:
    def __init__(s,name,ident=True,branch='main'):
        s.root=os.path.join(ROOT,name)
        if os.path.exists(s.root): shutil.rmtree(s.root)   # chỉ xóa sandbox tạm của chính script
        os.makedirs(s.root+'/home/work');s.home=s.root+'/home';s.cwd=s.home+'/work';s.t=0
        s.env=dict(os.environ,HOME=s.home,GIT_CONFIG_NOSYSTEM='1',LC_ALL='C.UTF-8',LANG='C.UTF-8',GIT_PAGER='cat',PAGER='cat',GIT_EDITOR='true',GIT_TERMINAL_PROMPT='0',GIT_CONFIG_GLOBAL=s.home+'/.gitconfig')
        s.env.pop('GIT_AUTHOR_NAME',None)
        if ident:
            for a in ('init.defaultBranch '+branch,'user.name Nguyễn Văn An','user.email an.nguyen@example.com'):
                k,v=a.split(' ',1);s.q('git config --global %s "%s"'%(k,v))
    def _date(s):
        s.t+=7;h,m=divmod(9*60+s.t,60);d='2026-10-%02d %02d:%02d:00 +0700'%(12+h//24,h%24,m)
        s.env['GIT_AUTHOR_DATE']=s.env['GIT_COMMITTER_DATE']=d
    def run(s,cmd,cwd=None,shell=True):
        s._date()
        p=subprocess.run(['bash','-c',cmd],cwd=cwd or s.cwd,env=s.env,capture_output=True,text=True)
        return (p.stdout+p.stderr).replace(s.home,'~').replace(s.root,'~').replace('~/gitlab/vinc/','git@gitlab.example.com:vinc/'),p.returncode
    def q(s,cmd,cwd=None):
        o,r=s.run(cmd,cwd);return o
    def w(s,path,content,cwd=None):
        p=os.path.join(cwd or s.cwd,path);os.makedirs(os.path.dirname(p),exist_ok=True);open(p,'w',encoding='utf-8').write(content)
    def cd(s,p):
        s.cwd=os.path.join(s.cwd,p) if not p.startswith('/') else p;os.makedirs(s.cwd,exist_ok=True)
    def T(s,*cmds,sub=None):
        """chạy từng lệnh, trả về transcript '$ cmd\nout'; lệnh bắt đầu '#' chỉ là chú thích hiển thị."""
        out=[]
        for c in cmds:
            if c.startswith('#'): out.append(c);continue
            if c.startswith('cd '): s.cd(c[3:].strip());out.append('$ '+c);continue
            if c.startswith('SEQ '):
                sed,real=c[4:].split(' :: ',1)
                ed=s.home+'/seq.sh';open(ed,'w').write('#!/bin/sh\ngrep -v "^#" "$1" | sed "/^$/d" | sed "s/^/# editor: /" >&2\nsed -i "%s" "$1"\n'%sed);os.chmod(ed,0o755)
                s.env['GIT_SEQUENCE_EDITOR']=ed;o,r=s.run(real);s.env.pop('GIT_SEQUENCE_EDITOR');out.append('$ '+real+('\n'+o.rstrip('\n') if o.strip() else ''));continue
            if c.startswith('@hide '): s.run(c[6:]);continue
            o,r=s.run(c);out.append('$ '+c+('\n'+o.rstrip('\n') if o.strip() else ''))
        return '\n'.join(out)
    def P(s,*cmds): return pre(s.T(*cmds))

def remote_setup(sb):
    """tạo 'GitLab' giả bằng repo bare và viết lại URL git@gitlab.example.com:vinc/ -> thư mục cục bộ."""
    sb.q('mkdir -p ../../gitlab/vinc && git init -q --bare ../../gitlab/vinc/vinc_course.git')
    sb.q('git config --global url."%s/gitlab/vinc/".insteadOf "git@gitlab.example.com:vinc/"'%sb.home)
