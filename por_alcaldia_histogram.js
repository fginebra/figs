document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('por_alcaldia_histogram').getContext('2d');
    let chart;

    function updateHistogram() {
        const alcaldiaData = {
            "Iztapalapa": 82203,
            "Gustavo A. Madero": 56041,
            "Cuauhtémoc": 52164,
            "Venustiano Carranza": 37134,
            "Coyoacán": 36888,
            "Tlalpan": 36751,
            "Benito Juárez": 36091,
            "Álvaro Obregón": 33795,
            "Miguel Hidalgo": 31892,
            "Iztacalco": 23846,
            "Azcapotzalco": 20582,
            "Xochimilco": 19757,
            "Tláhuac": 14980,
            "Cuajimalpa de Morelos": 9770,
            "La Magdalena Contreras": 7672,
            "Milpa Alta": 3581
        };

        const labels = Object.keys(alcaldiaData);
        const data = Object.values(alcaldiaData);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Conteo de Incidentes',
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',  // Add this line to switch axes
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes viales por alcaldía'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Conteo'
                        },
                        beginAtZero: true
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Alcaldía'
                        }
                    }
                }
            }
        });
    }

    window.updateHistogram = updateHistogram;
    updateHistogram();
});
