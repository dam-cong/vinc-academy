"""Tạo hub chủ đề git (VI+EN) từ hub Odoo. Chạy một lần từ gốc repo: python3 -I docs/tools/blog/make_hub_git.py"""
import re,json,os
B="https://vinc-academy.vercel.app"
CARDS=[("Git là gì, cài đặt và cấu hình lần đầu","Cài Git, đặt tên và email, chọn editor và hiểu ba vùng làm việc của Git.","What Git is, installing and first-time setup","Install Git, set your name and email, pick an editor and understand Git's three areas."),
("Commit đầu tiên: status, add, log và .gitignore","Vòng lặp hằng ngày trên repo vinc_course và cách loại file không nên theo dõi.","Your first commits: status, add, log and .gitignore","The daily loop on the vinc_course repo and how to keep unwanted files out."),
("Nhánh và merge","Tạo nhánh cho từng tính năng, gộp lại và hiểu fast-forward với merge commit.","Branches and merging","Create a branch per feature, merge it back and tell fast-forward from merge commits."),
("Remote: clone, fetch, pull, push và SSH","Làm việc với GitLab: SSH key, upstream và vì sao nên fetch trước khi pull.","Remotes: clone, fetch, pull, push and SSH","Work with GitLab: SSH keys, upstream branches and why to fetch before you pull."),
("Quy trình Merge Request trên GitLab","Từ nhánh tính năng đến review, approve và merge vào nhánh được bảo vệ.","The merge request workflow on GitLab","From feature branch to review, approval and merging into a protected branch."),
("Giải quyết xung đột (conflict)","Đọc dấu <<<<<<<, sửa tay, kiểm tra rồi hoàn tất merge hoặc hủy để làm lại.","Resolving merge conflicts","Read the <<<<<<< markers, fix by hand, verify, then finish the merge or abort."),
("Hoàn tác an toàn: restore, reset, revert, reflog","Chọn đúng lệnh khi lỡ sửa, lỡ commit hoặc lỡ đẩy, và cứu lại commit tưởng đã mất.","Undoing safely: restore, reset, revert, reflog","Pick the right command after a bad edit, commit or push, and rescue commits you thought were lost."),
("Rebase và làm gọn lịch sử","Rebase nhánh lên bản mới, gộp commit lẻ bằng interactive rebase và quy tắc vàng.","Rebase and tidy history","Rebase onto fresh work, squash small commits interactively and follow the golden rule."),
("Stash, cherry-pick và tag","Cất việc dở để sửa hotfix, nhặt một commit sang nhánh khác và gắn tag phát hành.","Stash, cherry-pick and tags","Shelve unfinished work for a hotfix, pick one commit onto another branch and tag a release."),
("Quy ước commit và chiến lược nhánh","Cách đặt tên nhánh, viết commit message và chọn GitLab Flow, trunk-based cho nhóm.","Commit conventions and branching strategies","Name branches, write commit messages and choose between GitLab Flow and trunk-based work."),
("Git hook và GitLab CI cho module Odoo","Chặn lỗi trước khi commit bằng pre-commit và chạy kiểm tra tự động trong pipeline.","Git hooks and GitLab CI for Odoo modules","Catch mistakes before commit with hooks and run automatic checks in a pipeline."),
("Blame, bisect và dự án tổng hợp","Tìm ai/commit nào gây lỗi, rồi chạy trọn một chu kỳ hotfix và phát hành.","Blame, bisect and a capstone project","Find who and which commit caused a bug, then run a full hotfix and release cycle.")]
CFG={'vi':dict(src='blog/odoo/index.html',out='blog/git/index.html',up='../../',alt='../../en/blog/git/index.html',lang='vi',locale='vi_VN',
 title='Git thực chiến cho nhóm phát triển | Vinc Academy',desc='Học Git cơ bản qua quy trình làm việc thực tế trong doanh nghiệp: commit, nhánh, merge request, xung đột, hoàn tác, rebase, tag và CI. Miễn phí, từ Vinc Academy.',
 ogt='Git thực chiến cho nhóm phát triển',tag='Chủ đề · Miễn phí',h1='Git',lead='Học Git vừa đủ để đi làm: mỗi bài dùng repo của dự án quản lý khóa học vinc_course trên GitLab, đi theo quy trình nhóm thật từ commit đến merge request và phát hành. Ít lý thuyết, mọi lệnh đều chạy thật.',
 st='Series: Git thực chiến cho nhóm phát triển',sd='12 bài từ cài đặt, commit, nhánh, remote, merge request, xung đột, hoàn tác, rebase đến hook, CI và một dự án tổng hợp.',
 num='Bài',soon='Sắp ra mắt',crumb='Git',url=B+'/blog/git/',alt_url=B+'/en/blog/git/',cta=('Muốn học làm việc nhóm với Git cùng mentor?','Khóa Developer Foundation có phần Git &amp; làm việc nhóm với bài tập thực tế và review code.','Xem khóa Developer Foundation','Nhận tư vấn miễn phí'),
 disc='Nội dung thuộc bản quyền của Vinc Academy. Git là nhãn hiệu của Software Freedom Conservancy; GitLab là nhãn hiệu của GitLab Inc.; Odoo là nhãn hiệu của Odoo S.A. Vinc Academy là đơn vị đào tạo độc lập, không liên kết chính thức với các tổ chức này.'),
 'en':dict(src='en/blog/odoo/index.html',out='en/blog/git/index.html',up='../../../',alt='../../../blog/git/index.html',lang='en',locale='en_US',
 title='Practical Git for Development Teams | Vinc Academy',desc='Learn core Git through real company workflows: commits, branches, merge requests, conflicts, undoing, rebase, tags and CI. Free from Vinc Academy.',
 ogt='Practical Git for Development Teams',tag='Topic · Free',h1='Git',lead='Learn just enough Git to start work: every part uses the vinc_course course management repository on GitLab and follows a real team workflow from commit to merge request and release. Little theory, every command really run.',
 st='Series: Practical Git for Development Teams',sd='12 parts from installing and committing to branches, remotes, merge requests, conflicts, undoing, rebase, hooks, CI and a capstone project.',
 num='Part',soon='Coming soon',crumb='Git',url=B+'/en/blog/git/',alt_url=B+'/blog/git/',cta=('Want to learn teamwork with Git alongside a mentor?','The Developer Foundation course covers Git and team workflow with real exercises and code review.','See Developer Foundation','Get free consultation'),
 disc='This content is copyrighted by Vinc Academy. Git is a trademark of Software Freedom Conservancy; GitLab is a trademark of GitLab Inc.; Odoo is a trademark of Odoo S.A. Vinc Academy is an independent training provider and is not officially affiliated with these organizations.')}
for k,c in CFG.items():
    h=open(c['src'],encoding='utf-8').read()
    h=re.sub(r'<title>.*?</title>','<title>%s</title>'%c['title'],h,count=1)
    h=re.sub(r'(<meta name="description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    for a,v in [('canonical" href',c['url'])]:
        h=re.sub(r'(rel="canonical" href=")[^"]*',lambda m:m.group(1)+v,h)
    vi=B+'/blog/git/';en=B+'/en/blog/git/'
    h=re.sub(r'(hreflang="vi" href=")[^"]*',lambda m:m.group(1)+vi,h);h=re.sub(r'(hreflang="en" href=")[^"]*',lambda m:m.group(1)+en,h);h=re.sub(r'(hreflang="x-default" href=")[^"]*',lambda m:m.group(1)+vi,h)
    h=re.sub(r'(og:title" content=")[^"]*',lambda m:m.group(1)+c['ogt'],h);h=re.sub(r'(og:description" content=")[^"]*',lambda m:m.group(1)+c['desc'],h)
    h=re.sub(r'(og:url" content=")[^"]*',lambda m:m.group(1)+c['url'],h);h=re.sub(r'(og:image" content=")[^"]*',lambda m:m.group(1)+B+'/image/og/git-hub'+('-en' if k=='en' else '')+'.png',h)
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
