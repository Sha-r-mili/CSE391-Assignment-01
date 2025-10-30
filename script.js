// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('introPage').classList.remove('hidden');
    document.getElementById('journalPages').classList.remove('active');
    document.getElementById('closedBook').classList.add('hidden');
    document.getElementById('navbar').classList.add('hidden');
});

// Animate flower on load
window.addEventListener('load', () => {
    const flower = document.getElementById('flower');
    if (flower) { 
        flower.style.opacity = '0';
        flower.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            flower.style.opacity = '1';
            flower.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Display page location and last modified date
    displayPageInfo();
});

// Toggle between light and dark theme
function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        toggle.textContent = '🌙';
    } else {
        toggle.textContent = '☀️';
    }
}

// Open the journal pages
function openJournal() {
    document.getElementById('introPage').classList.add('hidden');
    document.getElementById('journalPages').classList.add('active');
    document.getElementById('navbar').classList.remove('hidden');
    
    // Initialize navigation functionality
    initializeNavigation();
    
    // Initialize contact form
    initializeContactForm();
}

// Close journal and return to intro page
function closeJournal() {
    document.getElementById('journalPages').classList.remove('active');
    document.getElementById('introPage').classList.remove('hidden');
    document.getElementById('navbar').classList.add('hidden');
}

// Open the closed book page (when user clicks "No")
function openClosedBook() {
    document.getElementById('introPage').classList.add('hidden');
    document.getElementById('closedBook').classList.remove('hidden');
}

// Return from closed book to intro page
function backToIntro() {
    document.getElementById('closedBook').classList.add('hidden');
    document.getElementById('introPage').classList.remove('hidden');
}

// Scroll to top of the left page
function scrollToTop() {
    const leftPage = document.querySelector('.page-left');
    if (leftPage) {
        leftPage.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(l => l.classList.remove('active'));
    }
}

// Display page information in footer
function displayPageInfo() {
    const pageInfoElement = document.getElementById('pageInfo');
    if (pageInfoElement) {
        const lastModified = new Date(document.lastModified);
        const location = window.location.href;
        pageInfoElement.innerHTML = `
            <small>Page Location: ${location}</small><br>
            <small>Last Modified: ${lastModified.toLocaleString()}</small>
        `;
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get the target section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Determine which page the section is on
                const leftPage = document.querySelector('.page-left');
                const rightPage = document.querySelector('.page-right');
                
                let targetPage;
                if (leftPage.contains(targetSection)) {
                    targetPage = leftPage;
                } else if (rightPage.contains(targetSection)) {
                    targetPage = rightPage;
                }
                
                if (targetPage) {
                    // Calculate the position to scroll to
                    const sectionTop = targetSection.offsetTop;
                    const offset = 20; // Small offset from top
                    
                    // Smooth scroll to the section
                    targetPage.scrollTo({
                        top: sectionTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll spy functionality
    const leftPage = document.querySelector('.page-left');
    const rightPage = document.querySelector('.page-right');
    
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.content-section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            let scrollTop;
            
            // Determine which page the section is on
            if (leftPage.contains(section)) {
                scrollTop = leftPage.scrollTop;
            } else if (rightPage.contains(section)) {
                scrollTop = rightPage.scrollTop;
            }
            
            if (scrollTop >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Add scroll event listeners
    if (leftPage) {
        leftPage.addEventListener('scroll', updateActiveNavOnScroll);
    }
    if (rightPage) {
        rightPage.addEventListener('scroll', updateActiveNavOnScroll);
    }
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Disable submit button
            const submitButton = form.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Simulate email sending (in production, this would call a backend API)
                // For demonstration, we'll use mailto: link or show success message
                await sendEmail(formData);
                
                // Show success message
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully! Thank you for contacting me.';
                
                // Reset form
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                // Show error message
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Failed to send message. Please try again or email me directly at sharmili.prova@gmail.com';
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
}

// Function to send email (simulated)
async function sendEmail(data) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Create mailto link as fallback
            const mailtoLink = `mailto:sharmili.prova@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
                `From: ${data.name} (${data.email})\n\n${data.message}`
            )}`;
            
            // In a real application, you would send this to a backend API
            // For now, we'll just resolve the promise
            console.log('Email data:', data);
            console.log('Mailto link:', mailtoLink);
            
            // Optionally open mailto link
            // window.location.href = mailtoLink;
            
            resolve();
        }, 1500);
    });
}
