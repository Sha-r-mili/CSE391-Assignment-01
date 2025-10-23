window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('introPage').classList.remove('hidden');
  document.getElementById('journalPages').classList.remove('active');
  document.getElementById('closedBook').classList.add('hidden');
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

function openJournal() {
    document.getElementById('introPage').classList.add('hidden');
    document.getElementById('journalPages').classList.add('active');
}

function closeJournal() {
    document.getElementById('journalPages').classList.remove('active');
    document.getElementById('introPage').classList.remove('hidden');
}

function openClosedBook() {
  document.getElementById('introPage').classList.add('hidden');
  document.getElementById('closedBook').classList.remove('hidden');
}


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

function backToIntro() {
  document.getElementById('closedBook').classList.add('hidden');
  document.getElementById('introPage').classList.remove('hidden');
}
