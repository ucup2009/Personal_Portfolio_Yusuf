// Inisialisasi Animasi AOS
AOS.init({
    duration: 1000,
    once: true
});

// 1. Validasi Form Kontak
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Mencegah reload halaman
        
        const data = new FormData(event.target);
        const submitBtn = document.getElementById('submitBtn');
        
        // Ubah tombol saat loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Mengirim...';

        fetch(event.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerHTML = '<div class="alert alert-success">Terima kasih! Pesan Anda telah terkirim.</div>';
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = `<div class="alert alert-danger">${data["errors"].map(error => error["message"]).join(", ")}</div>`;
                    } else {
                        formStatus.innerHTML = '<div class="alert alert-danger">Ups! Terjadi kesalahan saat mengirim.</div>';
                    }
                });
            }
        }).catch(error => {
            formStatus.innerHTML = '<div class="alert alert-danger">Terjadi kendala koneksi. Silakan coba lagi.</div>';
        }).finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Kirim Pesan';
        });
    });
}

// 2. Tombol Back to Top
const backToTopBtn = document.getElementById('backToTop');
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Ubah Icon
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('bi-moon-stars', 'bi-sun');
    } else {
        icon.classList.replace('bi-sun', 'bi-moon-stars');
    }
});

// 4. Tutup navbar otomatis saat link diklik (untuk mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
        }
    });
});
const dot = document.createElement("div");
dot.className = "cursor-dot";
document.body.appendChild(dot);

window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
});

document.getElementById('btnLoadMore').addEventListener('click', function() {
    // Mengambil semua item proyek yang memiliki kelas 'd-none'
    const hiddenProjects = document.querySelectorAll('#projectContainer .project-item.d-none');
    const button = this;

    if (hiddenProjects.length > 0) {
        // Buka / Tampilkan semua proyek yang tersembunyi
        hiddenProjects.forEach(function(project) {
            project.classList.remove('d-none');
            // Memicu ulang efek AOS agar animasi berjalan saat elemen muncul
            AOS.refresh(); 
        });
        
        // Mengubah teks tombol dan ikon menjadi 'Sembunyikan'
        button.innerHTML = 'Sembunyikan Proyek <i class="bi bi-chevron-up ms-2"></i>';
        button.classList.replace('btn-primary', 'btn-outline-primary');
    } else {
        // Jika diklik lagi saat semua proyek terbuka, sembunyikan kembali dari indeks ke-3 dst.
        const allProjects = document.querySelectorAll('#projectContainer .project-item');
        
        allProjects.forEach(function(project, index) {
            if (index >= 3) { // Angka 3 berarti menyisakan 3 proyek pertama tetap tampil
                project.classList.add('d-none');
            }
        });
        
        // Kembalikan teks tombol semula
        button.innerHTML = 'Tampilkan Lebih Banyak <i class="bi bi-chevron-down ms-2"></i>';
        button.classList.replace('btn-outline-primary', 'btn-primary');
        
        // Scroll otomatis kembali ke atas section project secara mulus
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
});
