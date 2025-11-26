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
        label: 'Production (Tons)',
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

const salesData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
        label: 'Sales (₹ Cr)',
        data: [50, 45, 60, 70, 80],
        borderColor: CHART_COLORS.green,
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        tension: 0.3, // Smoother line
        fill: true,
        pointBackgroundColor: CHART_COLORS.green,
        pointRadius: 5,
        pointHoverRadius: 7
    }]
};

const envData = {
    labels: MONTHS.slice(0, 6),
    datasets: [{
        label: 'CO2 Emissions (Tons)',
        data: [200, 180, 220, 190, 210, 170],
        backgroundColor: CHART_COLORS.teal,
        borderColor: 'rgba(23, 162, 184, 0.8)',
        borderWidth: 1,
        borderRadius: 5,
    }]
};

// --- 2. Initialize Charts ---
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
        y: {
            beginAtZero: true
        }
    }
};

const productionChart = new Chart(document.getElementById('productionChart'), {
    type: 'bar',
    data: productionData,
    options: {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            tooltip: {
                ...chartOptions.plugins.tooltip,
                callbacks: {
                    label: (context) => context.parsed.y + ' Tons',
                }
            }
        }
    }
});

new Chart(document.getElementById('safetyChart'), {
    type: 'doughnut', // Changed to doughnut for visual appeal
    data: safetyData,
    options: {
        ...chartOptions,
        cutout: '70%',
        plugins: {
            ...chartOptions.plugins,
            tooltip: {
                ...chartOptions.plugins.tooltip,
                callbacks: {
                    label: (context) => context.label + ': ' + context.parsed + ' Incidents',
                }
            }
        }
    }
});

new Chart(document.getElementById('salesChart'), {
    type: 'line',
    data: salesData,
    options: {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            tooltip: {
                ...chartOptions.plugins.tooltip,
                callbacks: {
                    label: (context) => '₹' + context.parsed.y + ' Cr',
                }
            }
        },
        scales: {
            y: { beginAtZero: false } // For better line chart presentation
        }
    }
});

new Chart(document.getElementById('envChart'), {
    type: 'bar',
    data: envData,
    options: {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            tooltip: {
                ...chartOptions.plugins.tooltip,
                callbacks: {
                    label: (context) => context.parsed.y + ' Tons',
                }
            }
        }
    }
});

// --- 3. Custom Functions ---

// Filter chart function
function filterChart() {
    const filter = document.getElementById('filterSelect').value;
    if (filter === '2023') {
        productionData.datasets[0].data = [1400, 1500, 1600, 1700, 1800, 1900];
        productionData.labels = MONTHS.slice(6, 12);
        productionData.datasets[0].label = '2023 Production (Tons)';
    } else {
        productionData.datasets[0].data = [1200, 1350, 1100, 1400, 1300, 1500];
        productionData.labels = MONTHS.slice(0, 6);
        productionData.datasets[0].label = '2022 Production (Tons)';
    }
    productionChart.update();
}

// Buy product function with enhanced alert
function buyProduct(product) {
    // A more user-friendly, non-blocking modal/toast would be better in a real app
    alert(`Thank you for your interest in ${product} from ChemTech Industries! A sales representative will contact you shortly.\n\nPlease email: sales@chemtechindustries.com for immediate assistance.`);
}


// --- 4. UI/UX Enhancements ---

// ** Preloader Logic **
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    // Fade out preloader after a small delay to ensure assets load
    setTimeout(() => {
        preloader.style.opacity = '0';
        mainContent.style.opacity = '1';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            document.body.style.opacity = '1'; // Show body content after preloader hides
        }, 500); // Wait for the fade out to finish
    }, 1000); // 1 second delay for aesthetic effect
});

// ** Intersection Observer for Scroll Animations **
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            // Stop observing once it's visible
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Observe all elements with animation classes
document.querySelectorAll('.slide-up-1, .slide-up-2, .slide-up-3, .slide-up-4, .slide-up-5, .slide-up-6, .slide-left-1, .slide-left-2, .slide-left-3, .slide-right-1, .slide-right-2, .fade-in').forEach(element => {
    observer.observe(element);
});

// ** Real-time Production Update Simulation **
setInterval(() => {
    // Only update if 'All Years' is selected (default, simulated stream)
    if (document.getElementById('filterSelect').value === 'all') {
        // Randomly update the last data point
        const lastIndex = productionData.datasets[0].data.length - 1;
        productionData.datasets[0].data[lastIndex] = Math.floor(Math.random() * 800) + 1200;
        productionChart.update();
    }
}, 5000);
