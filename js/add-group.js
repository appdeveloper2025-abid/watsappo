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
    $('#addGroupForm').submit(function(e) {
        e.preventDefault();
        
        // Validate form
        const groupName = $('#groupName').val().trim();
        const category = $('#groupCategory').val();
        const whatsappLink = $('#whatsappLink').val().trim();
        const description = $('#groupDescription').val().trim();
        
        // Reset alerts
        $('#successAlert').addClass('d-none');
        $('#errorAlert').addClass('d-none');
        
        // Simple validation
        if (!groupName || !category || !whatsappLink || !description) {
            showError('Please fill in all required fields.');
            return;
        }
        
        if (!isValidUrl(whatsappLink)) {
            showError('Please enter a valid WhatsApp group link.');
            return;
        }
        
        if (!whatsappLink.includes('chat.whatsapp.com')) {
            showError('The link should be a valid WhatsApp group invitation link.');
            return;
        }
        
        if (description.length < 30) {
            showError('Description should be at least 30 characters long.');
            return;
        }
        
        // Show loading state
        $('#submitBtn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i> Submitting...');
        
        // In a real app, this would be an AJAX call to your API
        // For demo purposes, we're using a timeout to simulate API call
        setTimeout(() => {
            // Simulate successful submission
            $('#addGroupForm')[0].reset();
            $('#successAlert').removeClass('d-none').text('Your group has been submitted successfully! It will appear after verification.');
            $('#submitBtn').prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i> Submit Group');
            
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
    
    // Helper function to validate URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;  
        }
    }
    
    // Helper function to show error
    function showError(message) {
        $('#errorAlert').removeClass('d-none').text(message);
        $('html, body').animate({
            scrollTop: $('#errorAlert').offset().top - 100
        }, 500);
    }
});