<?php
// Set header untuk respons JSON, penting untuk komunikasi AJAX
header('Content-Type: application/json');

// Matikan error reporting agar informasi sensitif tidak bocor ke publik
error_reporting(0);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        // 1. Ambil dan Sanitasi Input
        // Menggunakan operator ?? '' untuk menghindari error jika field POST kosong
        $name = htmlspecialchars(trim($_POST['name'] ?? ''));
        $email = htmlspecialchars(trim($_POST['email'] ?? ''));
        $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
        $message = htmlspecialchars(trim($_POST['message'] ?? ''));

        // 2. Validasi Input Dasar
        if (empty($name) || empty($email) || empty($phone) || empty($message)) {
            // Keluar dan kirim pesan error jika ada field yang kosong
            echo json_encode(['status' => 'error', 'message' => 'Mohon lengkapi semua field: Nama, Email, Telepon, dan Pesan.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Keluar dan kirim pesan error jika format email tidak valid
            echo json_encode(['status' => 'error', 'message' => 'Format email tidak valid.']);
            exit;
        }

        // 3. Aksi Utama: Kirim Email Notifikasi
        // Ganti email tujuan di bawah ini
        $to = "admin@rsharapansehat.com";
        $subject = "Pesan Baru dari Formulir Kontak RS Harapan Sehat";

        // Isi email
        $body = "Anda menerima pesan dari formulir kontak:\n\n";
        $body .= "Nama: " . $name . "\n";
        $body .= "Email: " . $email . "\n";
        $body .= "Telepon: " . $phone . "\n\n";
        $body .= "Pesan:\n" . $message . "\n";

        // Header email
        $headers = "From: Web Contact Form <noreply@rsharapansehat.com>\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Fungsi mail() hanya akan berhasil jika server Anda memiliki konfigurasi email yang benar.
        $mail_sent = mail($to, $subject, $body, $headers);

        if ($mail_sent) {
            echo json_encode(['status' => 'success', 'message' => 'Pesan berhasil dikirim. Kami akan segera menghubungi Anda.']);
        } else {
            // Respons ini diberikan jika fungsi mail() gagal mengirim email
            echo json_encode(['status' => 'error', 'message' => 'Pesan gagal dikirim. (Kemungkinan konfigurasi mail server bermasalah)']);
        }
    } else {
        // Respons jika metode request bukan POST
        echo json_encode(['status' => 'error', 'message' => 'Metode permintaan tidak valid.']);
    }
} catch (Exception $e) {
    // Tangani error umum
    echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server saat memproses data.']);
}
