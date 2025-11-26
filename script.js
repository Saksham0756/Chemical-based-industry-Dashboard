// --- 1. Enhanced Data Simulation ---
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CHART_COLORS = {
    blue: 'rgba(0, 123, 255, 1)',
    lightBlue: 'rgba(0, 123, 255, 0.6)',
    teal: 'rgba(23, 162, 184, 1)',
    red: 'rgba(220, 53, 69, 1)',
    green: 'rgba(40, 167, 69, 1)',
};

let productionData = {
    labels: MONTHS.slice(0, 6),
    datasets: [{
        label: '2022 Production (Tons)',
        data: [1200, 1350, 1100, 1400, 1300, 1500],
        backgroundColor: CHART_COLORS.lightBlue,
        borderColor: CHART_COLORS.blue,
        borderWidth: 2,
        borderRadius: 5,
    }]
};

const safetyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Incidents',
        data: [5, 3, 7, 2],
        backgroundColor: [CHART_COLORS.red, CHART_COLORS.teal, CHART_COLORS.blue, CHART_COLORS.green],
        hoverOffset: 10,
    }]
};

function calculateTotalIncidents() {
    return safetyData.datasets[0].data.reduce((sum, current) => sum + current, 0);
}

// --- 2. Initialize Charts with Center Text Plugin ---

// **Chart.js Plugin for Centered Doughnut Text **
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        if (chart.config.type === 'doughnut') {
            const ctx = chart.ctx;
            const total = calculateTotalIncidents();
            
            ctx.restore();
            const fontSize = (chart.height / 120).toFixed(2);
            ctx.textBaseline = "middle";

            // Draw Total Count (large text)
            ctx.font = `bolder ${fontSize * 1.5}em Montserrat, sans-serif`;
            const text = total;
            const textWidth = ctx.measureText(text).width;
            ctx.fillStyle = CHART_COLORS.blue;
            ctx.fillText(text, (chart.width - textWidth) / 2, chart.height / 2 - 10); 

            // Draw Label (smaller text)
            ctx.font = `300 ${fontSize * 0.7}em Roboto, sans-serif`;
            const label = "Total Incidents";
            const labelWidth = ctx.measureText(label).width;
            ctx.fillStyle = '#666';
            ctx.fillText(label, (chart.width - labelWidth) / 2, chart.height / 2 + 20); 
            
            ctx.save();
        }
    }
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            cornerRadius: 6,
        }
    },
    animation: {
        duration: 2000,
        easing: 'easeOutQuart'
    },
    scales: {
        y: { beginAtZero: true }
    }
};

const productionChart = new Chart(document.getElementById('productionChart'), {
    type: 'bar',
    data: productionData,
    options: { ...chartOptions }
});

const safetyChart = new Chart(document.getElementById('safetyChart'), {
    type: 'doughnut', 
    data: safetyData,
    options: {
        ...chartOptions,
        cutout: '80%', 
        scales: { y: { display: false } } // Hide scales for doughnut
    },
    plugins: [centerTextPlugin],
});

// ... (other charts remain the same)

// --- 3. Custom Functions ---

function filterChart() {
    const filter = document.getElementById('filterSelect').value;
    if (filter === '2023') {
        productionData.datasets[0].data = [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500];
        productionData.labels = MONTHS;
        productionData.datasets[0].label = '2023 Production (Tons)';
    } else if (filter === '2022') {
        productionData.datasets[0].data = [1200, 1350, 1100, 1400, 1300, 1500, 1600, 1700, 1550, 1800, 1900, 2000];
        productionData.labels = MONTHS;
        productionData.datasets[0].label = '2022 Production (Tons)';
    } else {
        // Real-time mode (last 6 months, for simulation)
        productionData.datasets[0].data = [1200, 1350, 1100, 1400, 1300, 1500]; // Revert to initial simulation data
        productionData.labels = MONTHS.slice(0, 6);
        productionData.datasets[0].label = 'Real-time Production (Tons)';
    }
    productionChart.update();
}

function buyProduct(product) {
    alert(`Thank you for your interest in ${product} from ChemTech Industries! A sales representative will contact you shortly.\n\nPlease email: sales@chemtechindustries.com for immediate assistance.`);
}


// --- 4. UI/UX Enhancements ---

// ** Preloader Logic **
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        mainContent.style.opacity = '1';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            document.body.style.opacity = '1';
        }, 500); 
    }, 1000); 
});

// ** Intersection Observer for Scroll Animations **
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 }); 

document.querySelectorAll('.slide-up-1, .slide-up-2, .slide-up-3, .slide-up-4, .slide-up-5, .slide-up-6, .slide-left-1, .slide-left-2, .slide-left-3, .slide-right-1, .slide-right-2, .fade-in').forEach(element => {
    observer.observe(element);
});

// ** Navbar Scroll Effect **
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ** Optimized Real-time Production Update Simulation **
let isDashboardVisible = false;
let animationFrameId;
const dashboardElement = document.getElementById('dashboard');

const dashboardObserver = new IntersectionObserver((entries) => {
    isDashboardVisible = entries[0].isIntersecting;
    if (isDashboardVisible) {
        if (!animationFrameId) {
            animateProductionUpdate();
        }
    } else {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
}, { threshold: 0.1 });

if (dashboardElement) {
    dashboardObserver.observe(dashboardElement);
}

function animateProductionUpdate() {
    if (document.getElementById('filterSelect').value === 'all') {
        // Update data approximately once per second
        if (performance.now() % 60 < 1) { 
            const lastIndex = productionData.datasets[0].data.length - 1;
            // Get the current value, add small fluctuation, ensure minimum floor
            const currentValue = productionData.datasets[0].data[lastIndex];
            const fluctuation = (Math.random() - 0.5) * 50; 
            productionData.datasets[0].data[lastIndex] = Math.max(1000, currentValue + fluctuation);
            productionChart.update('none'); 
        }
    }
    
    if (isDashboardVisible) {
        animationFrameId = requestAnimationFrame(animateProductionUpdate);
    } else {
         animationFrameId = null;
    }
}
