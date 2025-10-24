    <?php
    try {
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $message = $_POST['message'];
            
            // Insert ke database
            $sql = "INSERT INTO contacts (name, email, phone, message, created_at) 
                    VALUES (:name, :email, :phone, :message, NOW())";
            
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':message', $message);
            
            if ($stmt->execute()) {
                // Kirim email notifikasi
                $to = "admin@rsharapansehat.com";
                $subject = "Pesan Baru dari Website";
                $body = "Nama: $name\nEmail: $email\nPhone: $phone\nPesan: $message";
                $headers = "From: noreply@rsharapansehat.com";
                
                mail($to, $subject, $body, $headers);
                
                echo json_encode(['status' => 'success', 'message' => 'Pesan berhasil dikirim']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Gagal mengirim pesan']);
            }
        }
    } catch(PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    ?>