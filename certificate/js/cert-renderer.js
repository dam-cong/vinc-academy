// JavaScript to render certificate details and handle interactivity

document.addEventListener("DOMContentLoaded", () => {
    // Get certificate ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get("id");

    if (certId) {
        renderCertificate(certId);
    } else {
        showError("Không tìm thấy mã chứng nhận trong liên kết.");
    }

    // Set up button event listeners
    setupInteractions(certId);
});

// Render the certificate details in DOM
function renderCertificate(id) {
    const cert = window.certificatesDatabase ? window.certificatesDatabase[id] : null;

    if (!cert) {
        showError(`Không tìm thấy chứng nhận với mã: "${id}"`);
        return;
    }

    // Update Page Title
    document.title = `Chứng chỉ - ${cert.fullName} - ${cert.courseNameVi}`;

    // Update DOM fields
    document.getElementById("cert-id").innerText = cert.id;
    document.getElementById("cert-recipient").innerText = cert.fullName;
    
    document.getElementById("cert-course-vi").innerHTML = `Đã hoàn thành khoá học <strong class="cert-course-name">“${cert.courseNameVi}”</strong>`;
    document.getElementById("cert-course-en").innerHTML = `Has successfully completed the course <strong class="cert-course-name">“${cert.courseNameEn}”</strong>`;

    document.getElementById("cert-hours-vi").innerText = cert.studyHours;
    document.getElementById("cert-hours-en").innerText = cert.studyHours;
    
    document.getElementById("cert-grade-vi").innerText = cert.gradeVi;
    document.getElementById("cert-grade-en").innerText = cert.gradeEn;

    document.getElementById("cert-date-vi").innerText = `Hà Nội, ngày ${cert.issueDate}`;
    document.getElementById("cert-date-en").innerText = `Ha Noi, ${formatDateEn(cert.issueDate)}`;

    // Set instructor details
    document.getElementById("cert-instructor-name").innerText = cert.instructor;
    document.getElementById("cert-instructor-title-vi").innerText = cert.instructorTitleVi;
    document.getElementById("cert-instructor-title-en").innerText = cert.instructorTitleEn;

    // Generate online verification link
    const verifyUrl = `../#verify`;
    const certRefElement = document.getElementById("cert-verification-ref");
    certRefElement.innerText = `Xác nhận tại: ${verifyUrl}`;

    // Render dynamic SVG Stamp
    const stampContainer = document.getElementById("cert-stamp-container");
    if (stampContainer) {
        stampContainer.innerHTML = getStampSVG();
    }

    // Render dynamic SVG Signature
    const signatureContainer = document.getElementById("cert-signature-container");
    if (signatureContainer) {
        signatureContainer.innerHTML = getSignatureSVG();
    }
}

// Format date to English (e.g. 17/07/2026 -> July 17, 2026)
function formatDateEn(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return dateStr;
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const year = parts[2];
    
    return `${months[monthIndex]} ${day}, ${year}`;
}

// Show error screen if certificate not found
function showError(message) {
    const container = document.querySelector(".cert-outer-container");
    if (container) {
        container.innerHTML = `
            <div style="background-color: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 500px; margin: 4rem auto; border-top: 5px solid #FF6B6B;">
                <div style="font-size: 3.5rem; color: #FF6B6B; margin-bottom: 1.5rem;">⚠️</div>
                <h2 style="color: #0E2247; margin-bottom: 1rem; font-weight: 700;">Không tìm thấy chứng nhận</h2>
                <p style="color: #495057; margin-bottom: 2rem; font-size: 0.95rem;">${message}</p>
                <a href="index.html" style="display: inline-block; background: #0E2247; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.2s;">Quay lại trang chủ</a>
            </div>
        `;
    }
    // Disable action buttons
    const printBtn = document.getElementById("print-btn");
    const shareBtn = document.getElementById("share-btn");
    if (printBtn) printBtn.disabled = true;
    if (shareBtn) shareBtn.disabled = true;
}

// Setup Print, Share, Download actions
function setupInteractions(certId) {
    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }

    const shareBtn = document.getElementById("share-btn");
    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            const verifyUrl = `certificate.html?id=${certId}`;
            
            // Attempt to use Web Share API
            if (navigator.share) {
                navigator.share({
                    title: 'Chứng nhận hoàn thành khóa học Vinc Academy',
                    text: `Xem chứng chỉ hoàn thành khoá học của Vinc Academy`,
                    url: verifyUrl,
                }).catch(err => {
                    console.log("Error sharing:", err);
                });
            } else {
                // Fallback to copying URL to clipboard
                navigator.clipboard.writeText(verifyUrl).then(() => {
                    showToast("Đã sao chép liên kết chứng nhận vào clipboard!");
                }).catch(err => {
                    console.error("Unable to copy", err);
                });
            }
        });
    }
}

// Display toast message
function showToast(message) {
    const toast = document.getElementById("toast-message");
    if (toast) {
        toast.innerText = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

// Return SVG structure for Vinc Academy Stamp Seal
function getStampSVG() {
    return `
        <svg class="cert-stamp" viewBox="0 0 110 110" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <circle cx="55" cy="55" r="42" fill="none" stroke="#C62828" stroke-width="2.5" />
            <circle cx="55" cy="55" r="38" fill="none" stroke="#C62828" stroke-width="0.8" />
            <text x="55" y="30" font-family="'Outfit', sans-serif" font-size="14" fill="#C62828" text-anchor="middle">★★★</text>
            <text x="55" y="58" font-family="'Outfit', sans-serif" font-size="20" font-weight="900" fill="#C62828" text-anchor="middle" font-style="italic">VINC ACADEMY</text>
            <text x="55" y="85" font-family="'Outfit', sans-serif" font-size="14" fill="#C62828" text-anchor="middle">★★★</text>
        </svg>
    `;
}

// Return SVG structure for Director Signature
function getSignatureSVG() {
    return `
        <svg class="cert-signature-img" viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg">
            <!-- Simulated stylized signature for 'Do Van Khac' -->
            <path d="M 20 48 C 30 25, 45 10, 50 35 C 55 55, 60 55, 65 38 C 70 20, 80 15, 85 30 C 90 45, 95 50, 105 25 C 115 5, 125 15, 135 22" 
                  fill="none" stroke="#0F2C59" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            
            <!-- Embellishments / underlining stroke -->
            <path d="M 35 38 Q 75 32, 130 35" fill="none" stroke="#0F2C59" stroke-width="1.8" stroke-linecap="round" />
        </svg>
    `;
}
