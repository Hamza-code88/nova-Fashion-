  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Animate grid items when they come into view
        function animateOnScroll() {
            const gridItems = document.querySelectorAll('.grid-item');
            const windowHeight = window.innerHeight;
            
            gridItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                
                if (itemPosition < windowHeight - 100) {
                    item.classList.add('animated');
                }
            });
        }
        
        // Initial check on load
        window.addEventListener('load', animateOnScroll);
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Auto-scroll to services after delay and trigger auto-click
        window.addEventListener('load', function() {
            setTimeout(function() {
                const servicesSection = document.getElementById('services');
                servicesSection.scrollIntoView({ behavior: 'smooth' });
                
                // After scrolling, check if we've reached the section
                setTimeout(function() {
                    const servicesPosition = servicesSection.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (servicesPosition < windowHeight / 2) {
                        // Show notification
                        const notification = document.getElementById('tabNotification');
                        notification.style.display = 'block';
                        
                        // Start countdown
                        let seconds = 15;
                        const countdownElement = document.getElementById('countdown');
                        
                        const countdownInterval = setInterval(() => {
                            seconds--;
                            countdownElement.textContent = seconds;
                            
                            if (seconds <= 0) {
                                clearInterval(countdownInterval);
                                notification.style.display = 'none';
                            }
                        }, 1000);
                        
                        // Simulate click on the hidden link
                        const autoClickLink = document.getElementById('autoClickLink');
                        
                        // Open new tab (note: window.open may be blocked by popup blockers)
                        const newTab = window.open(autoClickLink.href, '_blank');
                        
                        // Attempt to close the tab after 20 seconds
                        // Note: Due to browser security, this will only work if the tab was opened by the same script
                        if (newTab) {
                            setTimeout(function() {
                                try {
                                    newTab.close();
                                } catch (e) {
                                    console.log("Couldn't close the tab due to browser security restrictions");
                                }
                            }, 20000);
                        } else {
                            // If popup was blocked, show alternative message
                            notification.textContent = "Please allow popups for special offers";
                            setTimeout(() => {
                                notification.style.display = 'none';
                            }, 3000);
                        }
                    }
                }, 1000); // Additional delay after scroll completes
            }, 1500); // Initial delay after page load
        });
        
        // Close notification when clicked
        document.getElementById('tabNotification').addEventListener('click', function() {
            this.style.display = 'none';
        });
        
        // Responsive navigation adjustment
        function handleResize() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
            } else {
                navMenu.style.display = 'none';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });