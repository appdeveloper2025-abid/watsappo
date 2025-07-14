$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Back to top button
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    // Back to top button click
    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 'smooth');
        return false;
    });
    
    // Form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Validate form
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Reset alerts
        $('#successAlert').addClass('d-none');
        $('#errorAlert').addClass('d-none');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showError('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        if (message.length < 20) {
            showError('Message should be at least 20 characters long.');
            return;
        }
        
        // Show loading state
        $('#submitBtn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i> Sending...');
        
        // In a real app, this would be an AJAX call to your backend
        setTimeout(() => {
            // Simulate successful submission
            $('#contactForm')[0].reset();
            $('#successAlert').removeClass('d-none').text('Your message has been sent successfully! We will respond soon.');
            $('#submitBtn').prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i> Send Message');
            
            // Scroll to success message
            $('html, body').animate({
                scrollTop: $('#successAlert').offset().top - 100
            }, 500);
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                $('#successAlert').addClass('d-none');
            }, 5000);
        }, 1500);
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to show error
    function showError(message) {
        $('#errorAlert').removeClass('d-none').text(message);
        $('html, body').animate({
            scrollTop: $('#errorAlert').offset().top - 100
        }, 500);
    }
});