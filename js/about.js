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
    
    // Animate stats counting
    $('.stat-number').each(function() {
        const $this = $(this);
        const countTo = $this.attr('data-count');
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        },
        {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = $('.feature-card, .team-card, .testimonial-card');
        
        $(window).scroll(function() {
            elements.each(function() {
                const elementPosition = $(this).offset().top;
                const scrollPosition = $(window).scrollTop() + $(window).height();
                
                if (scrollPosition > elementPosition + 100) {
                    $(this).addClass('animate__animated animate__fadeInUp');
                }
            });
        });
        
        // Trigger once on page load
        elements.each(function() {
            const elementPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height();
            
            if (scrollPosition > elementPosition + 100) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
});