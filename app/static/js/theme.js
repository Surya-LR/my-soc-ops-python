/**
 * Theme toggle functionality
 * Persists theme preference to localStorage
 */

const THEME_KEY = 'soc-ops-theme';
const THEME_COZY = 'cozy';
const THEME_ORIGINAL = 'original';

function setTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        const color = theme === THEME_COZY ? '#d2691e' : '#2563eb';
        metaThemeColor.setAttribute('content', color);
    }
    
    console.log('Theme changed to:', theme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || THEME_COZY;
    console.log('Current theme:', currentTheme);
    
    const newTheme = currentTheme === THEME_COZY ? THEME_ORIGINAL : THEME_COZY;
    console.log('Switching to:', newTheme);
    
    setTheme(newTheme);
}

// Initialize on load
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || THEME_COZY;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Only update if different
    if (currentTheme !== savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    console.log('Theme initialized:', savedTheme);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Re-sync after HTMX swaps
if (typeof htmx !== 'undefined') {
    document.addEventListener('htmx:afterSwap', initTheme);
}

// Expose globally
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;

// Debug: log that script loaded
console.log('Theme script loaded. Current theme:', document.documentElement.getAttribute('data-theme'));



