// Simulated data for ChemTech Industries dashboard
let productionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Production (Tons)',
        data: [1200, 1350, 1100, 1400, 1300, 1500],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const safetyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Incidents',
        data: [5, 3, 7, 2],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
    }]
};

const salesData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
        label: 'Sales ($M)',
        data: [50, 45, 60, 70, 80],
        borderColor: '#4bc0c0',
        fill: false,
    }]
};

const envData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'CO2 Emissions (Tons)',
        data: [200, 180, 220, 190, 210, 170],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

// Initialize charts with animations
const productionChart = new Chart(document.getElementById('productionChart'), {
    type: 'bar',
    data: productionData,
    options: {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
        }
    }
});

new Chart(document.getElementById('safetyChart'), {
    type: 'pie',
    data: safetyData,
    options: {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
        }
    }
});

new Chart(document.getElementById('salesChart'), {
    type: 'line',
    data: salesData,
    options: {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
        }
    }
});

new Chart(document.getElementById('envChart'), {
    type: 'bar',
    data: envData,
    options: {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
        }
    }
});

// Filter chart function
function filterChart() {
    const filter = document.getElementById('filterSelect').value;
    if (filter === '2023') {
        productionData.datasets[0].data = [1400, 1500, 1600, 1700, 1800, 1900];
    } else {
        productionData.datasets[0].data = [1200, 1350, 1100, 1400, 1300, 1500];
    }
    productionChart.update();
}

// Buy product function
function buyProduct(product) {
    alert(`Thank you for purchasing ${product} from ChemTech Industries! (Demo alert)`);
}

// Update prices every 10 seconds
setInterval(() => {
    document.getElementById('price1').textContent = Math.floor(Math.random() * 100) + 40;
    document.getElementById('price2').textContent = Math.floor(Math.random() * 100) + 30;
    document.getElementById('price3').textContent = Math.floor(Math.random() * 100) + 50;
}, 10000);

// Simulate real-time production updates
setInterval(() => {
    productionData.datasets[0].data = productionData.datasets[0].data.map(() => Math.floor(Math.random() * 2000) + 1000);
    productionChart.update();
}, 5000);
