# RS Harapan Sehat: Profil Perusahaan Rumah Sakit 🏥

## Deskripsi Proyek

Proyek ini adalah implementasi *company profile website* (profil perusahaan) untuk Rumah Sakit Harapan Sehat. Website ini berfungsi sebagai **landing page** yang menyajikan informasi rumah sakit dan menyediakan formulir kontak yang fungsional.

Sistem navigasi dirancang menyerupai **Single Page Application (SPA)** menggunakan **jQuery** untuk transisi halaman yang cepat. Formulir kontak diproses menggunakan **PHP** untuk menjamin keamanan data dan notifikasi real-time.

## Fungsi Kode Utama

| File | Teknologi | Peran Utama | Penjelasan Fungsi |
| :--- | :--- | :--- | :--- |
| **`index.html`** | HTML5 | Struktur & Konten | Menyediakan kerangka dasar halaman web dan seluruh konten statis (teks, gambar, link). |
| **`style.css`** | CSS3 | Estetika & Responsif | Menentukan tata letak, warna, font, dan memastikan tampilan adaptif di semua ukuran layar (*Media Queries*). |
| **`script.js`** | JavaScript (jQuery) | Interaksi Klien | 1. **Navigasi Halaman:** Mengubah konten halaman tanpa *refresh* penuh. 2. **Animasi:** Mengaktifkan efek *counter* pada statistik. 3. **AJAX Form:** Mengirim data formulir kontak secara asinkron ke `contact.php`. |
| **`contact.php`** | PHP | Proses Server | 1. **Validasi:** Menerima data dari `script.js` dan memverifikasi kelengkapan dan format data. 2. **Sanitasi:** Membersihkan input untuk mencegah XSS. 3. **Notifikasi:** Mengirim email yang berisi pesan pengguna ke alamat admin. |

## Fitur Utama

* **Navigasi Cepat**
    Transisi konten halaman yang mulus menggunakan AJAX/jQuery.
* **Formulir Kontak Aman**
    Menggunakan **PHP** untuk *server-side validation* dan pengiriman email notifikasi (tanpa database).
* **Desain Responsif**
    Tampilan yang optimal di perangkat mobile hingga desktop.
* **Animasi Angka**
    Efek animasi *counter* pada bagian statistik di halaman Beranda.

## Panduan Instalasi Lokal

Untuk menguji fungsionalitas pengiriman pesan, Anda memerlukan lingkungan server lokal dengan dukungan PHP (misalnya XAMPP, Laragon, atau MAMP).

### Langkah-Langkah

1.  **Penempatan File:** Pindahkan seluruh folder proyek ke dalam direktori *web root* server lokal Anda.
2.  **Konfigurasi Email:** Buka file **`contact.php`** dan **sesuaikan** alamat email administrator pada variabel `$to`.
3.  **Start Server:** Jalankan layanan Apache server dari aplikasi server lokal Anda.
4.  **Akses:** Buka browser dan kunjungi: `http://localhost/nama_folder_proyek/index.html`.
