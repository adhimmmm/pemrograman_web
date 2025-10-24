// jQuery Navigation
        $(document).ready(function() {
            // Navigation click handler
            $('.nav-link').click(function(e) {
                e.preventDefault();
                var page = $(this).data('page');
                showPage(page);
                
                // Update active nav
                $('.nav-link').removeClass('active');
                $(this).addClass('active');
            });

            // Counter animation (jQuery)
            function animateCounter() {
                $('.counter').each(function() {
                    var $this = $(this);
                    var target = parseInt($this.data('target'));
                    
                    $({ Counter: 0 }).animate({ Counter: target }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter).toLocaleString());
                        },
                        complete: function() {
                            $this.text(target.toLocaleString());
                        }
                    });
                });
            }

            // Trigger counter when home page is active
            if ($('#home').hasClass('active')) {
                setTimeout(animateCounter, 300);
            }

            // Form submission (simulasi PHP)
           // Form submission (Mengganti simulasi dengan AJAX nyata)
            $('#submitBtn').click(function(e) {
                e.preventDefault();
                
                var $btn = $(this);
                var $msg = $('#successMsg'); // Elemen untuk pesan sukses/gagal
                
                var name = $('#name').val();
                var email = $('#email').val();
                var phone = $('#phone').val();
                var message = $('#message').val();

                // Pastikan semua field sudah terisi
                if (name && email && phone && message) {
                    
                    // Menonaktifkan tombol dan menampilkan status loading
                    $btn.text('Mengirim...').prop('disabled', true);
                    // Hapus kelas error dan sembunyikan pesan sebelumnya
                    $msg.hide().removeClass('success-msg-error'); 

                    // Panggilan AJAX
                    $.ajax({
                        url: 'contact.php', // Target file PHP yang baru diperbaiki
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            name: name,
                            email: email,
                            phone: phone,
                            message: message
                        },
                        success: function(response) {
                            if (response.status === 'success') {
                                // Tampilkan pesan sukses
                                $msg.text(response.message).fadeIn();
                                // Reset form
                                $('#name, #email, #phone, #message').val('');
                            } else {
                                // Tampilkan pesan error dari PHP
                                $msg.text(response.message).addClass('success-msg-error').fadeIn();
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            // Tampilkan pesan error koneksi/server
                            $msg.text('Error koneksi server. Silakan coba lagi.').addClass('success-msg-error').fadeIn();
                            console.error("AJAX Error:", textStatus, errorThrown, jqXHR.responseText);
                        },
                        complete: function() {
                            // Reset tombol setelah selesai
                            $btn.text('Kirim Pesan').prop('disabled', false);
                            
                            // Sembunyikan pesan setelah 5 detik
                            setTimeout(function() {
                                $msg.fadeOut();
                            }, 5000);
                        }
                    });

                } else {
                    alert('Mohon lengkapi semua field!');
                }
            });
        });

        // Vanilla JavaScript for page switching
        function showPage(pageName) {
            // Hide all pages
            $('.page').removeClass('active');
            
            // Show selected page
            $('#' + pageName).addClass('active');
            
            // Smooth scroll to top
            $('html, body').animate({ scrollTop: 0 }, 400);
            
            // Re-trigger counter animation if home page
            if (pageName === 'home') {
                setTimeout(function() {
                    $('.counter').each(function() {
                        var $this = $(this);
                        var target = parseInt($this.data('target'));
                        
                        $({ Counter: 0 }).animate({ Counter: target }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.ceil(this.Counter).toLocaleString());
                            }
                        });
                    });
                }, 300);
            }
        }