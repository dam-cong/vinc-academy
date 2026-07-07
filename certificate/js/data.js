// Mock database for Vinc Academy Certificates
const certificatesDatabase = {
    "VINC-2026-PY01": {
        id: "VINC-2026-PY01",
        fullName: "Đàm Công Hiến",
        courseNameVi: "Python Cơ Bản",
        courseNameEn: "Python Fundamentals",
        issueDate: "17/07/2026",
        studyHours: 40,
        gradeVi: "Xuất Sắc",
        gradeEn: "Excellent",
        instructor: "ĐÀM CÔNG HIẾN",
        instructorTitleVi: "Giám đốc Đào tạo",
        instructorTitleEn: "Director of Education"
    },
    "VINC-2026-OD02": {
        id: "VINC-2026-OD02",
        fullName: "Nguyễn Hoàng Hải",
        courseNameVi: "Lập Trình Odoo Chuyên Nghiệp",
        courseNameEn: "Odoo Developer",
        issueDate: "05/07/2026",
        studyHours: 60,
        gradeVi: "Giỏi",
        gradeEn: "Very Good",
        instructor: "ĐÀM CÔNG HIẾN",
        instructorTitleVi: "Giám đốc Đào tạo",
        instructorTitleEn: "Director of Education"
    },
    "VINC-2026-GIT03": {
        id: "VINC-2026-GIT03",
        fullName: "Trần Thị Mai",
        courseNameVi: "Làm Chủ Git & GitLab",
        courseNameEn: "Mastering Git & GitLab",
        issueDate: "20/06/2026",
        studyHours: 24,
        gradeVi: "Khá",
        gradeEn: "Good",
        instructor: "ĐÀM CÔNG HIẾN",
        instructorTitleVi: "Giám đốc Đào tạo",
        instructorTitleEn: "Director of Education"
    }
};

// Export for commonJS (Node) testing if needed, or bind to window for frontend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { certificatesDatabase };
} else {
    window.certificatesDatabase = certificatesDatabase;
}
