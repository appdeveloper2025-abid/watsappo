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
    
    // Get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // Initial variables
    let currentPage = 1;
    let currentCategory = getUrlParameter('category') || 'all';
    let currentSearch = '';
    let isLoading = false;
    
    // Set active category from URL
    if (currentCategory !== 'all') {
        $(`.dropdown-item[data-category="${currentCategory}"]`).addClass('active').siblings().removeClass('active');
        $('#filterDropdown').html(`<i class="fas fa-filter me-2"></i> ${currentCategory}`);
    }
    
    // Load groups
    function loadGroups(reset = false) {
        if (isLoading) return;
        
        isLoading = true;
        $('#loadMoreBtn').prop('disabled', true);
        $('#loadMoreBtn i').removeClass('d-none');
        
        if (reset) {
            currentPage = 1;
            $('#groupsContainer').html('');
        }
        
        // Get filtered groups
        const groups = getFilteredGroups(currentCategory, currentSearch, currentPage);
        
        if (groups.length > 0) {
            renderGroups(groups);
            currentPage++;
            
            if (groups.length < 6) { // Show load more only if we might have more
                $('#loadMoreBtn').hide();
            } else {
                $('#loadMoreBtn').show().prop('disabled', false);
            }
        } else {
            if (currentPage === 1) {
                $('#groupsContainer').html(`
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-users-slash fa-3x text-muted mb-3"></i>
                        <h4>No groups found</h4>
                        <p class="text-muted">Try changing your search or filter criteria</p>
                    </div>
                `);
            }
            $('#loadMoreBtn').hide();
        }
        
        isLoading = false;
        $('#loadMoreBtn i').addClass('d-none');
    }
    
    // Filter groups function
    function getFilteredGroups(category, search, page) {
        const allGroups = [
            // International Groups
            { 
                id: 1, 
                name: "International WhatsApp Group 1", 
                category: "International", 
                members: 180, 
                link: "https://chat.whatsapp.com/JZlTuMOqqJT7r1Htcfd6WG", 
                description: "Connect with friends from around the world for cultural exchange and friendship.", 
                icon: "globe" 
            },
            { 
                id: 2, 
                name: "International WhatsApp Group 2", 
                category: "International", 
                members: 150, 
                link: "https://chat.whatsapp.com/KehYGJYDf8H1UF4qGxe1Gv", 
                description: "Second group for international friends to connect and share experiences.", 
                icon: "globe" 
            },
            { 
                id: 3, 
                name: "International WhatsApp Group 3", 
                category: "International", 
                members: 200, 
                link: "https://chat.whatsapp.com/LYK07Hs0m900xilo479fZa", 
                description: "Global community for cultural exchange and international networking.", 
                icon: "users" 
            },
            { 
                id: 4, 
                name: "International WhatsApp Group 4", 
                category: "International", 
                members: 175, 
                link: "https://chat.whatsapp.com/EWN912uQRQIJbnvTc13l5F", 
                description: "Second international group for global connections and discussions.", 
                icon: "users" 
            },
            
            // Business
            { id: 5, name: "Global Entrepreneurs", category: "Business", members: 245, link: "#", description: "A group for entrepreneurs worldwide to share ideas and opportunities.", icon: "briefcase" },
            
            // Technology
            { id: 6, name: "Tech Enthusiasts", category: "Technology", members: 225, link: "#", description: "Discuss the latest in technology and gadgets.", icon: "microchip" },

            // Astrology & Spiritual Groups
            { 
                id: 7, 
                name: "American Astrology Services", 
                category: "Spiritual", 
                members: 120, 
                link: "https://chat.whatsapp.com/JJ9bteiRYmF4tGfi0yB04u", 
                description: "Group for astrology discussions and services.", 
                icon: "star" 
            },
            { 
                id: 8, 
                name: "Jyotish Upay TV & Gyan ki Baat", 
                category: "Spiritual", 
                members: 95, 
                link: "https://chat.whatsapp.com/Db0OKW5byQ4CQiQCArgZeG", 
                description: "Spiritual discussions and knowledge sharing.", 
                icon: "om" 
            },
            { 
                id: 9, 
                name: "Narayan Shakti By Astrology", 
                category: "Spiritual", 
                members: 110, 
                link: "https://chat.whatsapp.com/I8yoxDseVgR2GzqCiPPp8W", 
                description: "Astrology and spiritual guidance group.", 
                icon: "moon" 
            },

            // UK General & Cultural Groups
            { 
                id: 10, 
                name: "Top WhatsApp Groups", 
                category: "UK", 
                members: 250, 
                link: "https://whatsapp.com/channel/0029Vb5hHU2CHDypaKDWTd1T", 
                description: "Channel for top UK WhatsApp groups.", 
                icon: "crown" 
            },
            { 
                id: 11, 
                name: "UK Chat Connection", 
                category: "UK", 
                members: 180, 
                link: "https://www.whatsapp.com/channel/0029Vb5nMBS0Vyc7ZHRIds0X", 
                description: "Connect with people across the UK.", 
                icon: "comments" 
            },
            { 
                id: 12, 
                name: "London Vibes", 
                category: "UK", 
                members: 200, 
                link: "https://www.whatsapp.com/channel/0029Vb2wvV023n3hKF6hCr43", 
                description: "Experience the vibes of London.", 
                icon: "umbrella-beach" 
            },
            { 
                id: 13, 
                name: "London Calling", 
                category: "UK", 
                members: 150, 
                link: "https://chat.whatsapp.com/EKIW2OyRO6FIWBZ6itOk2O", 
                description: "Group for Londoners to connect.", 
                icon: "phone" 
            },
            { 
                id: 14, 
                name: "UK General Group", 
                category: "UK", 
                members: 220, 
                link: "https://chat.whatsapp.com/invite/83bTVcd62A2EvNtsE9urqz", 
                description: "General UK discussion group.", 
                icon: "users" 
            },
            { 
                id: 15, 
                name: "UK Culture", 
                category: "UK", 
                members: 175, 
                link: "https://chat.whatsapp.com/invite/83bTVcd62A2EvNtsE9urqz", 
                description: "Discuss UK culture and traditions.", 
                icon: "landmark" 
            },
            { 
                id: 16, 
                name: "Albion Insights", 
                category: "UK", 
                members: 130, 
                link: "https://chat.whatsapp.com/invite/83bTVcd62A2EvNtsE9urqz", 
                description: "Insights about UK life and culture.", 
                icon: "lightbulb" 
            },
            { 
                id: 17, 
                name: "British Wit", 
                category: "UK", 
                members: 190, 
                link: "https://chat.whatsapp.com/invite/IPEPIxx067F40ADzzSrH2q", 
                description: "Group for British humor and discussions.", 
                icon: "laugh" 
            },

            // UK Community & Religious Groups
            { 
                id: 18, 
                name: "UK Muslim WhatsApp Group", 
                category: "UK", 
                members: 160, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#uk-muslim-whatsapp-group-links", 
                description: "Muslim community group in the UK.", 
                icon: "mosque" 
            },
            { 
                id: 19, 
                name: "Pakistani in UK", 
                category: "UK", 
                members: 140, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#pakistani-in-uk-whatsapp-group-links", 
                description: "Group for Pakistanis living in the UK.", 
                icon: "flag-pakistan" 
            },
            { 
                id: 20, 
                name: "Indian in UK", 
                category: "UK", 
                members: 210, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#indian-in-uk-whatsapp-group-links", 
                description: "Group for Indians living in the UK.", 
                icon: "flag-india" 
            },

            // UK Jobs & Business Groups
            { 
                id: 21, 
                name: "London Jobs", 
                category: "Jobs", 
                members: 300, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#london-jobs-whatsapp-group-link", 
                description: "Job opportunities in London.", 
                icon: "briefcase" 
            },
            { 
                id: 22, 
                name: "UK Jobs", 
                category: "Jobs", 
                members: 275, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#uk-jobs-whatsapp-group-links", 
                description: "Job opportunities across the UK.", 
                icon: "suitcase" 
            },
            { 
                id: 23, 
                name: "Amazon UK", 
                category: "Jobs", 
                members: 180, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#amazon-uk-whatsapp-group-links", 
                description: "Group for Amazon UK opportunities.", 
                icon: "amazon" 
            },

            // UK Student Groups
            { 
                id: 24, 
                name: "UK Student WA Group", 
                category: "Education", 
                members: 195, 
                link: "https://chat.whatsapp.com/3FuL7VEfIMjD5X2BFPi255", 
                description: "Group for students in the UK.", 
                icon: "graduation-cap" 
            },
            { 
                id: 25, 
                name: "Indian Students in UK", 
                category: "Education", 
                members: 165, 
                link: "https://chat.whatsapp.com/invite/AcevSLgCS1ZFKrbt0zFgE7", 
                description: "Group for Indian students in the UK.", 
                icon: "user-graduate" 
            },
            { 
                id: 26, 
                name: "Muslim Students in UK", 
                category: "Education", 
                members: 145, 
                link: "https://chat.whatsapp.com/invite/CDmhRNS9pIH8UDtje58001", 
                description: "Group for Muslim students in the UK.", 
                icon: "book-quran" 
            },
            { 
                id: 27, 
                name: "Pakistani Students in UK", 
                category: "Education", 
                members: 155, 
                link: "https://chat.whatsapp.com/EoYMsESy9MdKDiG5Fkqlb4", 
                description: "Group for Pakistani students in the UK.", 
                icon: "school" 
            },

            // Other Miscellaneous Groups
            { 
                id: 28, 
                name: "UK Aunty Mom Group", 
                category: "Community", 
                members: 125, 
                link: "https://justgroup.link/uk-whatsapp-group-links/#uk-aunty-mom-whatsapp-group-links", 
                description: "Group for mothers and aunties in the UK.", 
                icon: "user-friends" 
            }
        ];
        
        // Filter by category
        let filtered = category === 'all' 
            ? allGroups 
            : allGroups.filter(group => group.category === category);
        
        // Filter by search term
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(group => 
                group.name.toLowerCase().includes(searchLower) || 
                group.description.toLowerCase().includes(searchLower)
            );
        }
        
        // Simulate pagination
        const start = (page - 1) * 6;
        const end = start + 6;
        return filtered.slice(start, end);
    }
    
    // Render groups function
    function renderGroups(groups) {
        let html = '';
        
        groups.forEach(group => {
            // Verify the link is properly formatted
            const whatsappLink = group.link.startsWith('https://chat.whatsapp.com/') 
                ? group.link 
                : `https://chat.whatsapp.com/${group.link.replace(/^[\/]+/, '')}`;
            
            html += `
                <div class="col-md-6 col-lg-4">
                    <div class="group-card card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <span class="badge bg-success">${group.category}</span>
                                <span class="text-muted small"><i class="fas fa-users me-1"></i> ${group.members}</span>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <div class="group-icon me-3">
                                    <i class="fas fa-${group.icon}"></i>
                                </div>
                                <h5 class="card-title mb-0">${group.name}</h5>
                            </div>
                            <p class="card-text text-muted">${group.description}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <a href="${whatsappLink}" target="_blank" class="btn btn-success w-100">
                                <i class="fab fa-whatsapp me-2"></i> Join Group
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        $('#groupsContainer').append(html);
    }
    
    // Category filter
    $('.dropdown-item').click(function(e) {
        e.preventDefault();
        currentCategory = $(this).data('category');
        currentPage = 1;
        
        $(this).addClass('active').siblings().removeClass('active');
        $('#filterDropdown').html(`<i class="fas fa-filter me-2"></i> ${currentCategory === 'all' ? 'All Categories' : currentCategory}`);
        
        loadGroups(true);
    });
    
    // Search form
    $('#searchForm').submit(function(e) {
        e.preventDefault();
        currentSearch = $('#searchInput').val().trim();
        currentPage = 1;
        
        loadGroups(true);
    });
    
    // Load more button
    $('#loadMoreBtn').click(function() {
        loadGroups();
    });
    
    // Initial load
    loadGroups();
});