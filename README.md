# Sistem Pakar Diagnosis Kerusakan PC

Aplikasi web interaktif berbasis **React + Vite** yang dirancang untuk membantu mendiagnosis masalah atau kerusakan pada perangkat komputer (PC/Laptop) berdasarkan gejala yang dipilih oleh pengguna, lengkap dengan solusi perbaikannya.

---

## Fitur Utama

- **Konsultasi Diagnosis Cepat:** Pilihan gejala interaktif tanpa perlu reload halaman (SPA).
- **Hasil Analisis & Solusi:** Menampilkan kemungkinan kerusakan perangkat beserta langkah perbaikan yang disarankan.
- **Basis Pengetahuan Terstruktur:** Data relasi gejala dan kerusakan disimpan secara rapi di dalam sistem.
- **Antarmuka Responsif & Cepat:** Dibangun dengan performa tinggi berkat Vite.

---

## Teknologi yang Digunakan

- **Framework/Library:** [React.js](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Bahasa:** JavaScript (ES6+)
- **Package Manager:** npm

---

## Panduan Instalasi & Menjalankan

Pastikan di komputermu sudah terpasang [Node.js](https://nodejs.org/) (disarankan versi LTS).

### 1. Clon Repositories
Buka terminal / Command Prompt lalu jalankan:
```bash
git clone https://github.com/CeyyCubaa/Sistem-Pakar-kerusakan-pada-pc.git
cd Sistem-Pakar-kerusakan-pada-pc
```

### 2. Instal Dependensi
Install semua library pendukung dengan perintah:
```bash
npm install
```

### 3. Jalankan Server Development
Jalankan server lokal pengembangan:
```bash
npm run dev
```

Buka browser dan akses alamat lokal yang muncul di terminal (biasanya `http://localhost:5173/`).

---

## Build untuk Produksi

Jika ingin mengompilasi proyek untuk kebutuhan deployment / hosting:
```bash
npm run build
```

---

## Struktur Direktori

```text
Sistem-Pakar-kerusakan-pada-pc/
├── public/          # File statis publik (favicon, gambar umum)
├── src/
│   ├── assets/      # File aset (CSS, gambar, ikon)
│   ├── components/  # Komponen UI (Card, Navbar, Modal, Form)
│   ├── data/        # Data gejala, aturan, & kerusakan (Knowledge Base)
│   ├── App.jsx      # Komponen utama
│   ├── index.css    # Styling global
│   └── main.jsx     # Entry point React
├── index.html       # File HTML template utama
├── package.json     # Daftar dependensi dan script npm
├── vite.config.js   # Konfigurasi Vite
└── README.md        # Dokumentasi proyek
```

---

## Lisensi

Proyek ini dibuat untuk keperluan edukasi dan pengembangan sistem informasi.
