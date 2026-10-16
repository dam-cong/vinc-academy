import sys,os;sys.path.insert(0,'..')
from gcommon import *
try:
    import yaml  # pip install pyyaml (chỉ để kiểm tra cú pháp YAML mẫu)
except ImportError:
    yaml=None
SRC=srcs([GD('githooks','Git – githooks'),GD('git-config','Git – git-config (core.hooksPath)'),GD('git-commit','Git – git-commit (--no-verify)'),('https://docs.gitlab.com/ci/quick_start/','GitLab Docs – Get started with GitLab CI/CD'),('https://docs.gitlab.com/ci/yaml/','GitLab Docs – CI/CD YAML syntax reference'),('https://www.odoo.com/documentation/20.0/developer/reference/backend/testing.html','Odoo 20 – Testing Odoo'),('https://www.odoo.com/documentation/20.0/developer/reference/cli.html','Odoo 20 – Command-line interface (CLI)')])
PRE='''#!/bin/sh
# Chặn commit chứa file bí mật, dấu xung đột hoặc Python sai cú pháp
for f in $(git diff --cached --name-only --diff-filter=ACM); do
  case "$f" in
    odoo.conf|.env) echo "pre-commit: không được commit $f" >&2; exit 1 ;;
    *.py)
      err=$(python3 -c "import ast,sys; ast.parse(open(sys.argv[1], encoding='utf-8').read())" "$f" 2>&1) || {
        echo "pre-commit: lỗi cú pháp trong $f" >&2; echo "$err" | tail -n 1 >&2; exit 1; } ;;
  esac
done
git diff --cached --check || exit 1
'''
MSG='''#!/bin/sh
# Tiêu đề phải dạng [TAG] module: mô tả (cho phép Merge/Revert tự sinh)
head -n 1 "$1" | grep -Eq '^(\\[(ADD|IMP|FIX|REF|REM|REV|MOV|MERGE|REL|I18N|PERF|CLN|LINT)\\] [a-z0-9_]+: .+|Merge |Revert )' || {
  echo "commit-msg: tiêu đề phải có dạng [TAG] module: mô tả" >&2
  echo "            ví dụ: [FIX] vinc_course: sửa nhãn số giờ" >&2
  exit 1; }
'''
CI='''stages: [lint, test]

lint-python:
  stage: lint
  image: python:3.12
  script:
    - python -m compileall -q .
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

no-secrets:
  stage: lint
  image: alpine:3
  script:
    - test ! -e odoo.conf
    - '! grep -rIn "admin_passwd" --include="*.py" --include="*.xml" .'
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

odoo-tests:
  stage: test
  image: registry.example.com/vinc/odoo-ci:20.0   # image nội bộ có sẵn Odoo 20 và PostgreSQL
  script:
    - odoo-bin -d ci_db -i vinc_course --test-tags /vinc_course --stop-after-init
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
'''
if yaml:
    d=yaml.safe_load(CI);assert set(d)=={'stages','lint-python','no-secrets','odoo-tests'},d.keys();assert d['no-secrets']['script'][1].startswith('! grep')
def dia(vi):
    t=('Hook trên máy bạn và pipeline trên GitLab là hai lớp kiểm tra' if vi else 'Hooks on your machine and the pipeline on GitLab are two layers of checks','Sơ đồ do Vinc Academy biên soạn.' if vi else 'Diagram by Vinc Academy.','dg-%s-g11'%('vi' if vi else 'en'))
    items=[(4,(['git commit'],['git commit']),('hook chạy ở đây','hooks run here'),False),(170,(['git push'],['git push']),('nhánh lên GitLab','branch to GitLab'),False),(336,(['Pipeline'],['Pipeline']),('lint, test trong MR','lint, tests in the MR'),True),(502,(['Merge'],['Merge']),('chỉ khi xanh','only when green'),False)]
    b=''
    for x,ti,su,ac in items:
        b+='<rect class="%s" x="%d" y="45" width="134" height="80" rx="12" />\n'%('dg-accent' if ac else 'dg-box',x)
        for i,l in enumerate(ti[0 if vi else 1]): b+='<text class="dg-title" x="%d" y="%d">%s</text>\n'%(x+14,68+i*18,l)
        b+='<text class="dg-text" x="%d" y="115">%s</text>\n'%(x+14,su[0 if vi else 1])
    for x,l in [(138,'hook'),(304,'.gitlab-ci.yml'),(470,'review')]:
        b+='<path class="dg-arrow" d="M%d 85 h22 m-8 -6 l8 6 l-8 6" /><text class="dg-text" text-anchor="middle" x="%d" y="34">%s</text>\n'%(x,x+14,l)
    b+='<text class="dg-text" x="4" y="150">%s</text>\n'%('Hook bắt lỗi sớm nhưng bỏ qua được bằng --no-verify; pipeline mới là chốt chặn chung của cả nhóm.' if vi else 'Hooks catch mistakes early but --no-verify skips them; the pipeline is the team\'s shared gatekeeper.')
    return fig('640 162',t[0],b,t[1],t[2])
def build(vi):
    t=lambda a,b:a if vi else b
    sb=SB('a11');base(sb);sb.q('echo __pycache__/ >> .git/info/exclude')
    sb.w('.githooks/pre-commit',PRE);sb.w('.githooks/commit-msg',MSG);os.chmod(sb.cwd+'/.githooks/pre-commit',0o755);os.chmod(sb.cwd+'/.githooks/commit-msg',0o755)
    T1=sb.P('git config core.hooksPath .githooks','git add .githooks','git commit -m "[ADD] vinc_course: hook kiểm tra commit"')
    T2=sb.P('echo "def broken(:" > models/bad.py','git add models/bad.py','git commit -m "[ADD] vinc_course: file lỗi"','git restore --staged models/bad.py','rm models/bad.py')
    T3=sb.P('echo "admin_passwd = secret" > odoo.conf','git add -f odoo.conf','git commit -m "[ADD] vinc_course: cấu hình"','git restore --staged odoo.conf','rm odoo.conf')
    T4=sb.P('echo "# ghi chú" >> models/course.py','git commit -am "update"','git commit -am "[IMP] vinc_course: ghi chú trong model"')
    T5=sb.P('echo "# thêm" >> models/course.py','git commit --no-verify -am "update"')
    T6=sb.P('chmod -x .githooks/pre-commit','echo "# lần nữa" >> models/course.py','git add models/course.py','git commit -m "[IMP] vinc_course: thêm ghi chú"')
    sb.q('chmod +x .githooks/pre-commit')
    T7=sb.P('python3 -m compileall -q . ; echo "exit=$?"','test ! -e odoo.conf && echo "không có odoo.conf"','! grep -rIn "admin_passwd" --include="*.py" --include="*.xml" . ; echo "exit=$?"')
    o=summ((t('Tóm tắt nhanh','In short'),t('<strong>Hook là kịch bản Git tự chạy ở những thời điểm cố định (trước khi commit, khi nhập lời nhắn...) và chặn thao tác nếu kịch bản thoát với mã khác 0.</strong> Bài này viết hai hook thật cho <code>vinc_course</code>: <code>pre-commit</code> chặn file bí mật và Python sai cú pháp, <code>commit-msg</code> bắt buộc tiêu đề dạng <code>[TAG] module: mô tả</code>; chia sẻ chúng cho cả nhóm bằng <code>core.hooksPath</code>. Sau đó là lớp kiểm tra thứ hai chạy trên server: <strong>GitLab CI</strong> với file <code>.gitlab-ci.yml</code> kiểm tra từng merge request, gồm cả bước chạy test của Odoo.','<strong>A hook is a script Git runs by itself at fixed moments (before a commit, when the message is entered...) and blocks the action if the script exits non-zero.</strong> This part writes two real hooks for <code>vinc_course</code>: <code>pre-commit</code> stops secret files and syntactically broken Python, <code>commit-msg</code> enforces a <code>[TAG] module: description</code> header; and shares them with the team through <code>core.hooksPath</code>. Then comes the second layer of checks that runs on the server: <strong>GitLab CI</strong> with a <code>.gitlab-ci.yml</code> file that checks every merge request, including a step that runs Odoo\'s tests.')))
    o+=h2('hook-la-gi',t('Git hook là gì','What a Git hook is'))
    o+=p(t('Quy ước ở bài 10 chỉ có giá trị khi mọi người tuân theo, mà con người thì hay quên lúc gấp. Hook để máy nhắc thay bạn. Theo tài liệu <code>githooks</code>, hook là chương trình nằm trong thư mục <code>hooks</code> của Git (hoặc thư mục bạn chỉ định bằng <code>core.hooksPath</code>) và <strong>phải có quyền thực thi</strong>; tên file chính là tên sự kiện. Nếu hook thoát với mã khác 0, thao tác tương ứng bị hủy.','The conventions of part 10 only matter if everyone follows them, and people forget under pressure. Hooks let the machine remind you. According to the <code>githooks</code> documentation a hook is a program in Git\'s <code>hooks</code> folder (or a folder you set with <code>core.hooksPath</code>) that <strong>must be executable</strong>; the file name is the event name. A non-zero exit cancels the matching action.'))
    o+=tbl([t('Hook','Hook'),t('Chạy khi nào','Runs when'),t('Dùng để','Use it to')],[['<code>pre-commit</code>',t('Trước khi tạo commit, chưa có lời nhắn','Ahead of the commit itself, before any message'),t('Soát file: cú pháp, bí mật, dấu xung đột','Inspect files: syntax, secrets, conflict markers')],['<code>commit-msg</code>',t('Sau khi có lời nhắn, nhận file chứa lời nhắn','After the message is written; receives the message file'),t('Kiểm tra hoặc chuẩn hóa tiêu đề','Validate or normalise the header')],['<code>pre-push</code>',t('Trước khi đẩy lên remote','Before pushing to a remote'),t('Chạy test nhanh trước khi lên GitLab','Run quick tests before reaching GitLab')]])
    o+=p(t('Hai điểm cần nhớ từ tài liệu: <code>pre-commit</code> và <code>commit-msg</code> đều có thể bị bỏ qua bằng <code>git commit --no-verify</code>, và thư mục <code>.git/hooks</code> <strong>không</strong> được commit nên không tự theo repo tới máy đồng nghiệp. Cách chia sẻ: đặt hook trong thư mục của repo (ví dụ <code>.githooks/</code>) rồi mỗi người chạy một lần <code>git config core.hooksPath .githooks</code>.','Two points from the documentation: the first two hooks can be skipped with <code>git commit --no-verify</code>, and the <code>.git/hooks</code> folder is <strong>not</strong> committed so it does not travel with the repo to colleagues. To share them, keep the hooks in a folder of the repo (for example <code>.githooks/</code>) and have everyone run <code>git config core.hooksPath .githooks</code> once.'))
    o+=h2('pre-commit',t('Hook pre-commit: chặn bí mật và code lỗi','The pre-commit hook: stopping secrets and broken code'))
    o+=p(t('Hook dưới đây duyệt từng file đã staging. Gặp <code>odoo.conf</code> hay <code>.env</code> nó từ chối; gặp file <code>.py</code> nó kiểm tra cú pháp bằng Python; cuối cùng <code>git diff --cached --check</code> bắt các dấu xung đột còn sót (bài 6). Lưu thành <code>.githooks/pre-commit</code> và cấp quyền thực thi:','The hook below walks every staged file. On <code>odoo.conf</code> or <code>.env</code> it refuses; on a <code>.py</code> file it checks the syntax with Python; finally <code>git diff --cached --check</code> catches leftover conflict markers (part 6). Save it as <code>.githooks/pre-commit</code> and make it executable:'))
    o+=pre(PRE)
    o+=p(t('Hook thứ hai kiểm tra tiêu đề commit theo mẫu Odoo của bài 10. Git đưa cho nó đường dẫn file chứa lời nhắn (<code>$1</code>); ta chỉ đọc dòng đầu. Các merge commit và revert do Git tự sinh được cho qua:','The second hook checks the commit header against part 10\'s Odoo pattern. Git passes it the path of the file with the message (<code>$1</code>); we read only the first line. Merge and revert commits generated by Git are let through:'))
    o+=pre(MSG)
    o+=p(t('Bật hook cho repo và thử ngay. Lệnh commit đầu tiên chính là commit thêm hai hook, và nó đã phải qua cả hai kiểm tra:','Enable the hooks for the repo and try them. The first commit below adds the two hooks themselves, and it already had to pass both checks:'))
    o+=T1
    o+=h2('thu-hook',t('Thử cho hook chặn','Watching the hooks block'))
    o+=p(t('Python sai cú pháp bị chặn trước khi thành commit; commit không được tạo và file vẫn nằm trong staging để bạn sửa:','Python with a syntax error is stopped before it becomes a commit; no commit is created and the file stays staged for you to fix:'))
    o+=T2
    o+=p(t('Thử commit file cấu hình chứa mật khẩu (đã phải <code>add -f</code> vì <code>.gitignore</code> thường chặn nó):','Try committing a config file holding a password (it needed <code>add -f</code> because <code>.gitignore</code> would normally block it):'))
    o+=T3
    o+=p(t('Rồi đến lời nhắn sai mẫu. Hook <code>commit-msg</code> từ chối, in ví dụ đúng, và khi bạn viết lại cho đúng thì commit đi qua:','Then a message that breaks the pattern. The <code>commit-msg</code> hook refuses, prints a correct example, and once you rewrite it properly the commit goes through:'))
    o+=T4
    o+=h2('bo-qua',t('Hai cách hook không chạy: --no-verify và quyền thực thi','Two ways a hook does not run: --no-verify and the executable bit'))
    o+=p(t('Cờ <code>--no-verify</code> cho phép bỏ qua hook, hợp lý khi bạn cần commit khẩn cấp hay commit tạm trên nhánh riêng. Nhưng chính vì ai cũng làm được, hook không thể là chốt chặn duy nhất:','The <code>--no-verify</code> flag skips the hooks, reasonable for an urgent commit or a temporary one on your own branch. But precisely because anyone can do it, hooks cannot be the only gate:'))
    o+=T5
    o+=p(t('Lỗi thứ hai tinh vi hơn: nếu file hook mất quyền thực thi, Git âm thầm bỏ qua nó và chỉ để lại một dòng gợi ý (<code>hint</code>) ở cuối. Commit vẫn thành công dù kiểm tra không hề chạy:','The second failure is subtler: if the hook file loses its executable bit, Git quietly ignores it and leaves just a <code>hint</code> line at the end. The commit succeeds even though the check never ran:'))
    o+=T6
    o+=h2('gitlab-ci',t('Lớp kiểm tra thứ hai: GitLab CI','The second layer: GitLab CI'))
    o+=dia(vi)
    o+=p(t('Theo tài liệu GitLab, để chạy CI/CD bạn cần hai thứ: một <strong>runner</strong> (tác nhân thực thi job; GitLab.com cung cấp sẵn, còn GitLab nội bộ thì quản trị viên đăng ký) và file <code>.gitlab-ci.yml</code> ở thư mục gốc repo mô tả các job. Khi bạn push, GitLab tạo một <em>pipeline</em> gồm các job chạy theo thứ tự <em>stage</em>; kết quả hiện ngay trong merge request. File cho <code>vinc_course</code> gồm ba job: kiểm tra cú pháp Python, kiểm tra không lọt bí mật, và chạy test của Odoo:','According to GitLab\'s documentation you need two things to run CI/CD: a <strong>runner</strong> (the agent that executes jobs; GitLab.com provides them, while on a self-managed GitLab an admin registers them) and the <code>.gitlab-ci.yml</code> configuration in the repository root describing the jobs. When you push, GitLab creates a <em>pipeline</em> of jobs that run in <em>stage</em> order, and the result shows up in the merge request. The file for <code>vinc_course</code> has three jobs: a Python syntax check, a no-secrets check and a run of Odoo\'s tests:'))
    o+=pre(CI)
    o+=tbl([t('Từ khóa','Keyword'),t('Ý nghĩa (theo tài liệu GitLab)','Meaning (per the GitLab documentation)')],[['<code>stages</code>',t('Tên và thứ tự các stage; job cùng stage chạy song song','Names and order of stages; jobs in one stage run in parallel')],['<code>image</code>',t('Docker image dùng để chạy job','The Docker image the job runs in')],['<code>script</code>',t('Lệnh shell mà runner thực thi; một lệnh thoát khác 0 làm job thất bại','Shell commands the runner executes; a non-zero exit fails the job')],['<code>rules</code>',t('Điều kiện để job được tạo; ở đây chỉ chạy cho pipeline của merge request','Conditions deciding whether the job is created; here only for merge request pipelines')]])
    o+=p(t('Hai job đầu dùng đúng những lệnh bạn có thể chạy thử trên máy trước khi push, và kết quả như dưới đây (không in gì và mã thoát 0 nghĩa là qua):','The first two jobs use exactly the commands you can try on your machine before pushing, with the results below (no output and exit code 0 mean pass):'))
    o+=T7
    o+=p(t('Job thứ ba dùng cờ <code>-i</code> để cài module vào CSDL <code>ci_db</code>, <code>--test-tags /vinc_course</code> để chỉ chạy test của module này (cú pháp <code>[-][tag][/module][:class][.method]</code> trong tài liệu test Odoo) và <code>--stop-after-init</code> để tiến trình thoát sau khi xong; test thất bại làm job thất bại. Tên image ở trên là ví dụ: nhóm bạn tự dựng một image có Odoo 20 và PostgreSQL rồi thay vào.','The third job uses <code>-i</code> to install the module into the <code>ci_db</code> database, <code>--test-tags /vinc_course</code> to run only this module\'s tests (the <code>[-][tag][/module][:class][.method]</code> syntax from the Odoo testing documentation) and <code>--stop-after-init</code> so the process exits when done; a failing test fails the job. The image name above is an example: your team builds an image with Odoo 20 and PostgreSQL and substitutes it.'))
    o+=p(t('Khi quen, bạn sẽ gặp thêm vài từ khóa hữu ích khác trong tài liệu tham chiếu của GitLab:','Once comfortable, you will meet a few more useful keywords in GitLab\'s keyword reference:'))
    o+=tbl([t('Từ khóa','Keyword'),t('Dùng để','Used for')],[['<code>before_script</code>',t('Lệnh chạy trước <code>script</code> của mỗi job, ví dụ cài thư viện','Commands executed ahead of every job\'s <code>script</code>, for example installing libraries')],['<code>cache</code>',t('Giữ lại thư mục (như <code>.venv</code>) giữa các lần chạy để pipeline nhanh hơn','Keep folders (such as <code>.venv</code>) between runs so pipelines are faster')],['<code>artifacts</code>',t('Đính kèm file kết quả của job, ví dụ báo cáo test','Attach a job\'s output files, such as a test report')],['<code>allow_failure</code>',t('Cho phép job lỗi mà không làm hỏng cả pipeline (hợp với kiểm tra cảnh báo)','Let a job fail without failing the pipeline (fits advisory checks)')],['<code>variables</code>',t('Khai báo biến môi trường cho job, ví dụ tên CSDL kiểm thử','Define environment variables for jobs, such as the test database name')]])
    o+=p(t('Một mẹo giữ mọi thứ đồng nhất: đưa các lệnh kiểm tra vào một file trong repo (ví dụ <code>scripts/check.sh</code>) rồi cho cả hook lẫn job CI gọi cùng file đó. Khi muốn thêm một quy tắc, bạn sửa ở một chỗ, và kết quả trên máy bạn khớp với kết quả trên GitLab.','A tip to keep everything consistent: put the check commands in one file inside the repo (for example <code>scripts/check.sh</code>) and have both the hook and the CI job call that same file. To add a rule you edit one place, and the result on your machine matches the one on GitLab.'))
    o+=h2('trong-odoo',t('Đưa vào quy trình nhóm','Fitting it into the team workflow'))
    o+=tbl([t('Bước','Step'),t('Cách làm','How')],[
        [t('Cài hook cho người mới','Hooks for newcomers'),t('Thêm dòng <code>git config core.hooksPath .githooks</code> vào mục “Bắt đầu” của README','Add <code>git config core.hooksPath .githooks</code> to the README\'s “Getting started”')],
        [t('Bảo vệ <code>main</code>','Protect <code>main</code>'),t('Chỉ merge qua MR (bài 5) và yêu cầu pipeline xanh trước khi merge','Merge only through MRs (part 5) and require a green pipeline before merging')],
        [t('Test của module','Module tests'),t('Viết test bằng <code>TransactionCase</code> của Odoo (bài 13 series Odoo) để job <code>odoo-tests</code> có gì để chạy','Write tests with Odoo\'s <code>TransactionCase</code> (the testing part of the Odoo series) so the <code>odoo-tests</code> job has something to run')],
        [t('Tăng dần','Grow gradually'),t('Bắt đầu với lint và kiểm tra bí mật, thêm test và triển khai khi nhóm đã quen','Start with lint and secret checks, add tests and deployment once the team is used to it')]])
    o+=call(t('Lỗi hay gặp khi mới học','Common beginner mistakes'),[
        t('<strong>Hook không chạy mà không ai biết.</strong> Thiếu quyền thực thi, hoặc đồng nghiệp chưa đặt <code>core.hooksPath</code>. Ví dụ ở trên cho thấy Git chỉ in một dòng hint. Hãy ghi bước cài hook vào README và dùng pipeline làm lớp bảo vệ chính.','<strong>A hook not running and nobody noticing.</strong> A missing executable bit, or a colleague who never set <code>core.hooksPath</code>. The example above shows Git printing only a hint line. Document the hook setup in the README and let the pipeline be the main safeguard.'),
        t('<strong>Dùng <code>--no-verify</code> thành thói quen.</strong> Mỗi lần bỏ qua là một lần quy ước bị phá. Chỉ dùng cho trường hợp khẩn, và để pipeline bắt lại.','<strong>Making <code>--no-verify</code> a habit.</strong> Every skip breaks the convention once. Use it only in emergencies and let the pipeline catch what slips by.'),
        t('<strong>Hook quá chậm.</strong> Chạy cả bộ test trong <code>pre-commit</code> khiến mọi người né nó. Giữ hook dưới vài giây (cú pháp, bí mật), dồn việc nặng sang CI.','<strong>Hooks that are too slow.</strong> Running the whole test suite in <code>pre-commit</code> makes everyone avoid it. Keep hooks to a few seconds (syntax, secrets) and move the heavy work to CI.'),
        t('<strong>Job CI treo ở trạng thái chờ.</strong> Thường là chưa có runner hoạt động cho dự án; tài liệu GitLab hướng dẫn kiểm tra runner ở Settings → CI/CD. Hãy hỏi quản trị viên GitLab của công ty.','<strong>A CI job stuck waiting.</strong> Usually no active runner is available for the project; GitLab\'s documentation shows how to check runners under Settings → CI/CD. Ask your company\'s GitLab admin.'),
        t('<strong>Sai thụt lề hoặc dấu nháy trong YAML.</strong> YAML nhạy cảm với khoảng trắng; dòng lệnh bắt đầu bằng <code>!</code> như trong job <code>no-secrets</code> phải đặt trong dấu nháy. Hãy kiểm tra file bằng công cụ lint YAML hoặc trình soạn pipeline trong GitLab trước khi push.','<strong>Wrong indentation or quoting in YAML.</strong> YAML is sensitive to whitespace; a command starting with <code>!</code>, as in the <code>no-secrets</code> job, must be quoted. Check the file with a YAML linter or GitLab\'s pipeline editor before pushing.')])
    o+=h2('tong-ket',t('Tổng kết','Summary'))
    o+=ul([t('Hook là kịch bản chạy tự động; thoát mã khác 0 thì Git hủy thao tác. Cần quyền thực thi.','A hook is an automatic script; a non-zero exit makes Git cancel the action. It must be executable.'),t('<code>pre-commit</code> soát file, <code>commit-msg</code> soát lời nhắn; chia sẻ qua thư mục trong repo và <code>core.hooksPath</code>.','<code>pre-commit</code> inspects files, <code>commit-msg</code> inspects the message; share them via a repo folder and <code>core.hooksPath</code>.'),t('Hook bỏ qua được bằng <code>--no-verify</code> nên cần CI làm lớp bảo vệ chung.','Hooks can be skipped with <code>--no-verify</code>, so CI is needed as the shared safeguard.'),t('<code>.gitlab-ci.yml</code> khai báo <code>stages</code>, job, <code>image</code>, <code>script</code>, <code>rules</code>; runner thực thi và kết quả hiện trong merge request.','<code>.gitlab-ci.yml</code> declares <code>stages</code>, jobs, <code>image</code>, <code>script</code> and <code>rules</code>; a runner executes them and results show in the merge request.')])
    o+=p(t('Bài cuối ghép mọi thứ lại. Bạn sẽ dùng <code>git blame</code> và <code>git bisect</code> để truy ra commit gây lỗi, rồi chạy trọn một chu kỳ làm việc: tính năng, merge request, hotfix và phát hành.','The final part puts it all together. You will use <code>git blame</code> and <code>git bisect</code> to track down the commit that caused a bug, then run a complete working cycle: feature, merge request, hotfix and release.'))
    o+=cta(vi,CTA)
    o+='\n'+I+'<h2 id="faq">'+t('Câu hỏi thường gặp','Frequently asked questions')+'</h2>\n'+I+'{FAQ}\n'
    o+='\n'+I+'<h2 id="nguon">'+t('Nguồn tham khảo','References')+'</h2>\n'+SRC
    return o
write('.',build(True),build(False))
