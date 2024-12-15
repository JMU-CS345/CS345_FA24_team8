// Create and style the fullscreen button
const createFullscreenButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '⛶';
    button.setAttribute('title', 'Toggle Fullscreen');
    
    // Style the button
    Object.assign(button.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999',
        padding: '8px 12px',
        fontSize: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    });

    // Add hover effect
    button.onmouseover = () => {
        button.style.backgroundColor = '#f0f0f0';
    };
    button.onmouseout = () => {
        button.style.backgroundColor = '#ffffff';
    };

    return button;
};

// Function to handle fullscreen toggling
const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE11
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
    }
};

const initFullscreenToggle = () => {
    const button = createFullscreenButton();
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFullscreen();
    });

    document.addEventListener('fullscreenchange', () => {
        button.innerHTML = document.fullscreenElement ? '⛶' : '⛶';
    });

    document.body.appendChild(button);
};

document.addEventListener('DOMContentLoaded', initFullscreenToggle);