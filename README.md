# Vehicle Tracker Dashboard Frontend

Proyek ini adalah implementasi *dashboard* frontend untuk melacak kendaraan dan melihat detail telemetri Dibangun menggunakan React dengan TypeScript dan styling TailwindCSS, serta pengelolaan state dengan Zustand.

## Fitur

* **Daftar Kendaraan (Vehicle List Page):**
    * Menampilkan daftar semua kendaraan dengan nama, status (Active, Inactive, Maintenance), kecepatan, dan waktu pembaruan terakhir.
    * Setiap kartu kendaraan dilengkapi dengan gambar placeholder yang relevan.
    * Fungsionalitas pencarian (berdasarkan nama atau ID kendaraan).
    * Filter berdasarkan status kendaraan (Aktif, Tidak Aktif, Pemeliharaan, Semua).
    * Ringkasan jumlah kendaraan berdasarkan status (Online, Offline, Maintenance).
    * Tampilan peta overview yang menunjukkan lokasi kendaraan yang aktif.
* **Halaman Detail Kendaraan (Vehicle Detail Page):**
    * Menampilkan detail telemetri spesifik untuk kendaraan yang dipilih (odometer, level bahan bakar, kecepatan, lokasi, dan *timestamp*).
    * Indikator level bahan bakar visual.
    * Tampilan peta interaktif yang menunjukkan lokasi persis kendaraan dengan ikon mobil kustom sebagai marker.
* **Pengelolaan State:** Menggunakan Zustand untuk pengelolaan *state* global.
* **Loading & Error Handling:** Menampilkan indikator loading yang menarik dan penanganan error yang anggun.
* **Responsif:** Tata letak yang responsif untuk berbagai ukuran layar menggunakan TailwindCSS.

## Tech Stack

* **Frontend Framework:** React.js (dengan Vite)
* **Bahasa:** TypeScript
* **Styling:** TailwindCSS
* **State Management:** Zustand
* **Pemetaan:** React-Leaflet
* **Ikon:** React-Icons
* **Komponen UI:** ShadCN UI (Button, Card, Input, Select)

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

1.  **Clone Repository:**
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd tes-frontend
    ```
 

2.  **Instal Dependensi:**
    ```bash
    npm install
    ```

## Menjalankan Aplikasi

Setelah instalasi, Anda dapat menjalankan aplikasi di mode pengembangan:

```bash
npm run dev
```

🚀 Live Demo
Anda dapat melihat live demo aplikasi ini di Vercel melalui tautan berikut:
https://tes-frontend-widyarobotics.vercel.app/ 