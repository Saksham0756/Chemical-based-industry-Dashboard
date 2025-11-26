// --- 1. Enhanced Data Simulation (from previous response) ---
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CHART_COLORS = {
    blue: 'rgba(0, 123, 255, 1)',
    lightBlue: 'rgba(0, 123, 255, 0.6)',
    teal: 'rgba(23, 162, 184, 1)',
    red: 'rgba(220, 53, 69, 1)',
    green: 'rgba(40, 167, 69, 1)',
};

// ... (safetyData definition remains the same)
const safetyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Incidents',
        data: [5, 3, 7, 2],
        backgroundColor: [CHART_COLORS.red, CHART_COLORS.teal, CHART_COLORS.blue, CHART_COLORS.green],
        hoverOffset: 10,
    }]
};

// Calculate total incidents for the center text
function calculateTotalIncidents() {
    return safetyData.datasets[0].data.reduce((sum, current) => sum + current, 0);
}

// --- 2. Initialize Charts (Safety Chart with Plugin) ---

// **Chart.js Plugin for Centered Doughnut Text **
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        if (chart.config.type === 'doughnut') {
            const ctx = chart.ctx;
            const total = calculateTotalIncidents();
            
            ctx.restore();
            const fontSize = (chart.height / 120).toFixed(2);
            ctx.font = `bolder ${fontSize}em Montserrat, sans-serif`;
            ctx.textBaseline = "middle";
            
            const text = total;
            const textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
            const textY = chart.height / 2;
            
            ctx.fillStyle = CHART_COLORS.blue;
            ctx.fillText(text, textX, textY - 10); // Center count

            ctx.font = `300 ${(fontSize / 2).toFixed(2)}em Roboto, sans-serif`;
            ctx.fillStyle = '#666';
            ctx.fillText("Total Incidents", textX - 25, textY + 20); // Label
            
            ctx.save();
        }
    }
};

// ... (productionChart initialization remains the same)

// Initialize Safety Chart (using the plugin)
const safetyChart = new Chart(document.getElementById('safetyChart'), {
    type: 'doughnut',
    data: safetyData,
    options: {
        // ... (existing options remain)
        cutout: '80%', // Increased cutout for text visibility
    },
    // ** Register the new plugin **
    plugins: [centerTextPlugin],
});

// ... (salesChart and envChart initializations remain the same)

// --- 3. Custom Functions (buyProduct remains the same) ---
function buyProduct(product) {
    alert(`Thank you for your interest in ${product} from ChemTech Industries! A sales representative will contact you shortly.\n\nPlease email: sales@chemtechindustries.com for immediate assistance.`);
}


// --- 4. UI/UX Enhancements ---

// ** Intersection Observer for Scroll Animations ** (remains the same)
const observer = new IntersectionObserver(/* ... */);
// ... (observer setup remains the same)

// ** Navbar Scroll Effect **
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ** Smart Real-time Production Update Simulation (Optimized) **
let isDashboardVisible = false;
let animationFrameId;

// New Intersection Observer for the entire Dashboard section
const dashboardObserver = new IntersectionObserver((entries) => {
    isDashboardVisible = entries[0].isIntersecting;
    if (isDashboardVisible) {
        // Start animation loop only if it's visible AND not already running
        if (!animationFrameId) {
            animateProductionUpdate();
        }
    } else {
        // Stop animation loop when dashboard scrolls out of view
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
}, { threshold: 0.1 });

// Observe the dashboard section
dashboardObserver.observe(document.getElementById('dashboard'));


function animateProductionUpdate() {
    // Only update if 'All Years' is selected (default, simulated stream)
    if (document.getElementById('filterSelect').value === 'all') {
        // Update data once every ~60 frames (~1 second at 60fps)
        if (performance.now() % 60 < 1) { 
            const lastIndex = productionData.datasets[0].data.length - 1;
            // Introduce a subtle, small random variation
            const fluctuation = (Math.random() - 0.5) * 50; 
            productionData.datasets[0].data[lastIndex] = Math.max(1000, productionData.datasets[0].data[lastIndex] + fluctuation);
            productionChart.update('none'); // Use 'none' for instant update within the frame
        }
    }
    
    // Request the next frame
    if (isDashboardVisible) {
        animationFrameId = requestAnimationFrame(animateProductionUpdate);
    } else {
         animationFrameId = null;
    }
}
