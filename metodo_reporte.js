document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('metodo_reporte').getContext('2d');
    let chart;

    function updateMetodoReporte() {
        const metodoData = {
            "LLAMADA DEL 911": 235203,
            "RADIO": 17342,
            "BOTÓN DE AUXILIO": 15285,
            "CÁMARA": 970,
            "REDES": 632,
            "APLICATIVOS": 463,
            "LLAMADA APP911": 35
        };

        const labels = Object.keys(metodoData);
        const data = Object.values(metodoData);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Conteo de Reportes',
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Métodos de Reporte de Accidentes'
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
                            text: 'Método'
                        }
                    }
                }
            }
        });
    }

    window.updateMetodoReporte = updateMetodoReporte;
    updateMetodoReporte();
});
