"""Cấu hình chủ đề blog dùng chung cho publish.py / check.py / wc.py."""
TOPICS = {
    'odoo': dict(
        dir='odoo', total=14, deps='Odoo 20, Python 3.12+, PostgreSQL 16+', handoff='docs/odoo-series-handoff.md',
        vi=dict(name='Odoo', series='Lập trình Odoo 20 từ A–Z', tag='Series Lập trình Odoo 20', og='LẬP TRÌNH ODOO 20'),
        en=dict(name='Odoo', series='Odoo 20 Development A–Z', tag='Odoo 20 Development Series', og='ODOO 20 DEVELOPMENT')),
    'python': dict(
        dir='python', total=14, deps='Python 3.12+', handoff='docs/python-series-handoff.md',
        vi=dict(name='Python', series='Python thực chiến cho lập trình viên Odoo', tag='Series Python thực chiến', og='PYTHON THỰC CHIẾN',
                disc='Bài viết thuộc bản quyền của Vinc Academy. Vui lòng ghi rõ nguồn và dẫn link khi trích dẫn. Python là nhãn hiệu của Python Software Foundation; Odoo là nhãn hiệu của Odoo S.A. Vinc Academy là đơn vị đào tạo độc lập, không liên kết chính thức với các tổ chức này.'),
        en=dict(name='Python', series='Practical Python for Odoo Developers', tag='Practical Python Series', og='PRACTICAL PYTHON',
                disc='This article is copyrighted by Vinc Academy. Please credit and link the source when quoting. Python is a trademark of the Python Software Foundation; Odoo is a trademark of Odoo S.A. Vinc Academy is an independent training provider and is not officially affiliated with these organizations.')),
    'git': dict(
        dir='git', total=12, deps='Git 2.30+', handoff='docs/git-series-handoff.md',
        vi=dict(name='Git', series='Git thực chiến cho nhóm phát triển', tag='Series Git thực chiến', og='GIT THỰC CHIẾN',
                disc='Bài viết thuộc bản quyền của Vinc Academy. Vui lòng ghi rõ nguồn và dẫn link khi trích dẫn. Git là nhãn hiệu của Software Freedom Conservancy; GitLab là nhãn hiệu của GitLab Inc.; Odoo là nhãn hiệu của Odoo S.A. Vinc Academy là đơn vị đào tạo độc lập, không liên kết chính thức với các tổ chức này.'),
        en=dict(name='Git', series='Practical Git for Development Teams', tag='Practical Git Series', og='PRACTICAL GIT',
                disc='This article is copyrighted by Vinc Academy. Please credit and link the source when quoting. Git is a trademark of Software Freedom Conservancy; GitLab is a trademark of GitLab Inc.; Odoo is a trademark of Odoo S.A. Vinc Academy is an independent training provider and is not officially affiliated with these organizations.')),
}
