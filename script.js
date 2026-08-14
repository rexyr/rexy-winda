const scriptURL ="https://script.google.com/macros/s/AKfycbxCrC7exTwOwC9WMUTnUPKlyhow7iXqIHmHvdKl14k4E4RDTqTaZs9MzO3fkyq1ee6Wlg/exec";
document.addEventListener("DOMContentLoaded", () => {

    // 1. Ambil Nama Tamu dari URL Parameter (?to=Nama)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        const guestNameEl = document.getElementById('guest-name');
        if (guestNameEl) guestNameEl.innerText = guestParam;
    }

    // 2. Animasi Character Bounce Typing
    function runBounceAnimation(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const lines = container.querySelectorAll(".line");
        let globalCharIndex = 0;
        const typingSpeed = 45;

        lines.forEach((line) => {
            const text = line.textContent.trim();
            line.textContent = "";
            text.split("").forEach((char) => {
                const span = document.createElement("span");
                if (char === " ") {
                    span.className = "space";
                } else {
                    span.className = "char";
                    span.textContent = char;
                    setTimeout(() => {
                        span.classList.add("bounce-in");
                    }, globalCharIndex * typingSpeed);
                    globalCharIndex++;
                }
                line.appendChild(span);
            });
        });
    }

    // Jalankan Animasi Awal Title Cover
    runBounceAnimation("bounce-target-1");
    runBounceAnimation("bounce-couple");
    runBounceAnimation("bounce-guest");


    // 3. Control Buka Undangan & Play Music
    const coverSection = document.getElementById("cover-section");
    const openBtn = document.getElementById("btn-open-invitation");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicControl = document.getElementById("music-control");
    const donutsSvg = document.getElementById("music-icon");
    let isPlaying = false;

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            if (mainContent) mainContent.classList.remove("content-hidden");
            if (musicControl) musicControl.classList.remove("d-none");

            if (coverSection) {
                coverSection.classList.add("fade-out");
                setTimeout(() => {
                    coverSection.style.display = "none";
                }, 600);
            }

            document.body.classList.remove("no-scroll");
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (bgMusic) {
                bgMusic.currentTime = 40;
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (donutsSvg) donutsSvg.classList.add("playing");
                }).catch(e => console.log("Autoplay blocked:", e));
            }

            runBounceAnimation("bounce-target-2");
        });
    }

    // Toggle Music Play/Pause
    if (musicControl) {
        musicControl.addEventListener("click", () => {
            if (bgMusic) {
                if (isPlaying) {
                    bgMusic.pause();
                    if (donutsSvg) donutsSvg.classList.remove("playing");
                } else {
                    bgMusic.play();
                    if (donutsSvg) donutsSvg.classList.add("playing");
                }
                isPlaying = !isPlaying;
            }
        });
    }

    // 4. RSVP Form & Wishes Feed
    // const rsvpForm = document.getElementById("rsvp-form");
    // const wishesContainer = document.getElementById("wishes-container");
    // const dummyWishes = [
    //     { name: "Budi & Sarah", status: "Hadir", msg: "Selamat untuk Rexy dan Winda! Happy wedding!" },
    //     { name: "Rian", status: "Hadir", msg: "Lancar sampai hari H kawan!" }
    // ];

    // function renderWishes() {
    //     if (!wishesContainer) return;
    //     wishesContainer.innerHTML = "";
    //     dummyWishes.forEach(item => {
    //         const card = document.createElement("div");
    //         card.className = "p-2 mb-2 bg-light rounded-3 border-start border-4 border-danger small text-start";
    //         card.innerHTML = `
    //             <div class="d-flex justify-content-between align-items-center">
    //                 <strong class="text-dark">${item.name}</strong>
    //                 <span class="badge ${item.status === 'Hadir' ? 'bg-success' : 'bg-secondary'}">${item.status}</span>
    //             </div>
    //             <p class="mb-0 mt-1 text-muted">${item.msg}</p>
    //         `;
    //         wishesContainer.appendChild(card);
    //     });
    // }
    // renderWishes();

    // if (rsvpForm) {
    //     rsvpForm.addEventListener("submit", (e) => {
    //         e.preventDefault();
    //         const name = document.getElementById("rsvp-name").value;
    //         const status = document.getElementById("rsvp-status").value;
    //         const message = document.getElementById("rsvp-message").value;
    //         dummyWishes.unshift({ name, status, msg: message });
    //         renderWishes();
    //         rsvpForm.reset();
    //     });
    // }

    // 5. Countdown Timer (Target: 6 Sept 2026)
    const eventDate = new Date("September 6, 2026 08:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = eventDate - now;
        if (diff > 0) {
            document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }, 1000);

    // 6. Intersection Observer untuk Scroll Reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.15, 0.25] // Memicu observer saat elemen menyentuh 15% dan 25%
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 2. Gunakan entry.intersectionRatio untuk mengecek persentase riil di layar

            // Jika elemen terlihat 15% atau lebih -> MUNCUL
            if (entry.intersectionRatio >= 0.15) {
                entry.target.classList.add('revealed', 'active');
            }
            // Jika elemen tersisa kurang dari 15% (sudah keluar 85%) -> SEMBUNYI
            else if (entry.intersectionRatio < 0.25) {
                entry.target.classList.remove('revealed', 'active');
            }
        });
    }, observerOptions);

    const scribblePath = document.querySelector(".scribble-path");

    if (scribblePath) {
        // Hitung panjang presisi garis path SVG
        const pathLength = scribblePath.getTotalLength();
        scribblePath.style.strokeDasharray = pathLength;
        scribblePath.style.strokeDashoffset = pathLength;
    }

    // Observer untuk mendeteksi saat elemen date.svg terlihat di layar
    const dateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed", "active");
            }
        });
    }, { threshold: 0.2 });

    const dateContainer = document.querySelector(".date-circle-container");
    if (dateContainer) {
        dateObserver.observe(dateContainer);
    }

    // Daftarkan seluruh elemen target
    const elementsToAnimate = document.querySelectorAll('.scroll-reveal, .std-section-wrapper, .date-circle-container , .disco-wrapper');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));
});

// Fungsi Salin Rekening
function copyRekening(accNo, btn) {
    navigator.clipboard.writeText(accNo).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check me-1"></i> Tersalin`;
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });

}

function initBounceTyping(container) {
    if (!container || container.dataset.bounceInit) return;
    container.dataset.bounceInit = "true"; // Mencegah duplikasi inisialisasi

    // Cari baris teks (baik dengan kelas .line maupun .typing-line)
    const lines = container.querySelectorAll(".line, .typing-line");
    let globalCharIndex = 0;
    const typingSpeed = 50; // Kecepatan muncul per karakter (ms)

    lines.forEach((line) => {
        const rawText = line.textContent.trim();
        line.textContent = "";

        rawText.split("").forEach((char) => {
            const span = document.createElement("span");
            if (char === " ") {
                span.className = "space";
            } else {
                span.className = "char";
                span.textContent = char;
                setTimeout(() => {
                    span.classList.add("bounce-in");
                }, globalCharIndex * typingSpeed);
                globalCharIndex++;
            }
            line.appendChild(span);
        });
    });
}

// 2. Intersection Observer Terpadu
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed", "active");

            // Jika elemen yang terlihat memiliki wrapper teks typing, jalankan animasinya
            const typingWrapper = entry.target.querySelector(".std-text-wrapper") ||
                (entry.target.classList.contains("std-text-wrapper") ? entry.target : null);
            if (typingWrapper) {
                initBounceTyping(typingWrapper);
            }
        }
    });
}, { threshold: 0.2 });

// Daftarkan seluruh container animasi
const elementsToAnimate = document.querySelectorAll(
    '.scroll-reveal, .std-section-wrapper, .date-circle-container, .disco-wrapper'
);
elementsToAnimate.forEach(el => scrollObserver.observe(el));

const bounceWrappers = document.querySelectorAll('.std-text-wrapper');

const bounceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Saat elemen terlihat di layar: jalankan animasi
            entry.target.classList.add('animate');
        } else {
            // Saat elemen keluar dari layar: reset class agar siap beranimasi lagi saat di-scroll balik
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.2 // Dipicu saat 20% bagian teks terlihat
});

bounceWrappers.forEach(wrapper => bounceObserver.observe(wrapper));


  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCrC7exTwOwC9WMUTnUPKlyhow7iXqIHmHvdKl14k4E4RDTqTaZs9MzO3fkyq1ee6Wlg/exec";

const form = document.getElementById("rsvp-form");
  const wishesContainer = document.getElementById("wishes-container");
  const submitButton = form.querySelector('button[type="submit"]');

  // Inisialisasi Bootstrap Modal
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  const modalGuestName = document.getElementById('modal-guest-name');

  // Format Tanggal
  function formatDate(rawDate) {
    if (!rawDate) return "";
    const date = new Date(rawDate);
    return isNaN(date.getTime()) 
      ? rawDate 
      : date.toLocaleDateString("id-ID", { 
          day: "numeric", 
          month: "short", 
          year: "numeric", 
          hour: "2-digit", 
          minute: "2-digit" 
        });
  }

  // 1. Ambil Data Ucapan (GET)
  async function loadWishes() {
    wishesContainer.innerHTML = `
      <div class="text-center py-3 text-muted small">
        <div class="spinner-border spinner-border-sm text-secondary mb-2" role="status"></div>
        <p class="mb-0">Memuat ucapan & doa...</p>
      </div>
    `;

    try {
      const response = await fetch(SCRIPT_URL);
      const result = await response.json();

      if (result.status === "success") {
        if (!result.data || result.data.length === 0) {
          wishesContainer.innerHTML = `<p class="text-center text-muted small my-3">Belum ada ucapan. Jadilah yang pertama!</p>`;
          return;
        }

        wishesContainer.innerHTML = result.data.map(item => {
          const isHadir = item.hadir === "Hadir";
          const badgeClass = isHadir 
            ? "bg-success-subtle text-success border border-success-subtle" 
            : "bg-secondary-subtle text-secondary border border-secondary-subtle";

          return `
            <div class="p-3 mb-2 bg-light bg-opacity-75 rounded-3 border">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold text-dark small">${item.nama}</span>
                <span class="badge rounded-pill ${badgeClass}" style="font-size: 0.7rem;">${item.hadir}</span>
              </div>
              <p class="text-secondary small mb-1" style="white-space: pre-line;">${item.ucapan}</p>
              <div class="text-muted" style="font-size: 0.65rem;">
                ${formatDate(item.timestamp)}
              </div>
            </div>
          `;
        }).join("");
      } else {
        wishesContainer.innerHTML = `<p class="text-center text-danger small">Gagal memuat ucapan.</p>`;
      }
    } catch (error) {
      wishesContainer.innerHTML = `<p class="text-center text-danger small">Gagal terhubung ke server.</p>`;
    }
  }

  // 2. Kirim Data Ucapan (POST)
  form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const originalBtnText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Mengirim...`;

  const guestName = document.getElementById("rsvp-name").value.trim();
  const guestStatus = document.getElementById("rsvp-status").value;
  const guestMessage = document.getElementById("rsvp-message").value.trim();

  const payload = {
    nama: guestName,
    hadir: guestStatus,
    ucapan: guestMessage
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });

    const resJson = await response.json();

    if (resJson.status === "success") {
      // 1. Reset Form & Tampilkan Popup Sukses Seketika
      form.reset();
      modalGuestName.textContent = guestName ? `Kak ${guestName}` : "Anda";
      successModal.show();

      // 2. Optimistic Update: Langsung tambahkan ucapan baru ke urutan teratas tanpa GET request
      const isHadir = guestStatus === "Hadir";
      const badgeClass = isHadir 
        ? "bg-success-subtle text-success border border-success-subtle" 
        : "bg-secondary-subtle text-secondary border border-secondary-subtle";

      const newWishCard = `
        <div class="p-3 mb-2 bg-light bg-opacity-75 rounded-3 border">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold text-dark small">${guestName}</span>
            <span class="badge rounded-pill ${badgeClass}" style="font-size: 0.7rem;">${guestStatus}</span>
          </div>
          <p class="text-secondary small mb-1" style="white-space: pre-line;">${guestMessage}</p>
          <div class="text-muted" style="font-size: 0.65rem;">Baru saja</div>
        </div>
      `;

      // Hapus teks 'Belum ada ucapan' jika ada, lalu tempel di posisi paling atas
      if (wishesContainer.innerHTML.includes("Belum ada ucapan")) {
        wishesContainer.innerHTML = newWishCard;
      } else {
        wishesContainer.insertAdjacentHTML("afterbegin", newWishCard);
      }

    } else {
      alert("Gagal mengirim: " + (resJson.message || "Terjadi kesalahan"));
    }
  } catch (error) {
    alert("Terjadi kesalahan koneksi. Silakan coba lagi.");
  } finally {
    // Tombol langsung aktif kembali
    submitButton.disabled = false;
    submitButton.innerHTML = originalBtnText;
  }
});

  // Load awal saat halaman selesai dimuat
  document.addEventListener("DOMContentLoaded", loadWishes);

(function initGallery() {
  const modalEl = document.getElementById("galleryModal");
  const carouselEl = document.getElementById("carouselGallery");

  if (!modalEl || !carouselEl || typeof bootstrap === "undefined") return;

  const bsModal = new bootstrap.Modal(modalEl);
  const bsCarousel = new bootstrap.Carousel(carouselEl, {
    interval: false,
    touch: true
  });

  // 1. Klik foto di grid
  const gridImages = document.querySelectorAll("#gallery-grid [data-bs-slide-to], #gallery-grid img");
  gridImages.forEach((img, idx) => {
    img.addEventListener("click", function (e) {
      e.preventDefault();
      const slideAttr = this.getAttribute("data-bs-slide-to");
      const targetIndex = slideAttr !== null ? parseInt(slideAttr, 10) : idx;

      bsCarousel.to(targetIndex);
      bsModal.show();
    });
  });

  // 2. Touch Swipe di HP
  let touchStartX = 0;
  let touchEndX = 0;

  carouselEl.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselEl.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (diff < -35) bsCarousel.next();
    if (diff > 35) bsCarousel.prev();
  }, { passive: true });
})();