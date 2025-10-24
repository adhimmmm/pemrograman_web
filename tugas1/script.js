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
            $('#submitBtn').click(function(e) {
                e.preventDefault();
                
                var name = $('#name').val();
                var email = $('#email').val();
                var phone = $('#phone').val();
                var message = $('#message').val();

                if (name && email && phone && message) {
                    // Simulasi AJAX ke PHP
                    $('#submitBtn').text('Mengirim...').prop('disabled', true);
                    
                    // Simulasi delay pengiriman
                    setTimeout(function() {
                        // Reset form
                        $('#name, #email, #phone, #message').val('');
                        $('#submitBtn').text('Kirim Pesan').prop('disabled', false);
                        
                        // Show success message
                        $('#successMsg').fadeIn();
                        
                        // Hide after 3 seconds
                        setTimeout(function() {
                            $('#successMsg').fadeOut();
                        }, 3000);
                        
                        // Simulasi data yang akan dikirim ke PHP
                        console.log('Data untuk PHP:', {
                            name: name,
                            email: email,
                            phone: phone,
                            message: message,
                            timestamp: new Date().toISOString()
                        });
                    }, 1000);
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