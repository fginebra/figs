document.addEventListener('DOMContentLoaded', function () {
    const ctxIncidente = document.getElementById('por_incidente_histogram').getContext('2d');
    let incidenteChart;

    function updateIncidenteHistogram() {
        const incidenteData = {
            "Choque sin lesionados": 231050,
            "Choque con lesionados": 147683,
            "Atropellado": 52750,
            "Vehiculo desbarrancado ": 50557,
            "Motociclista": 50294,
            "Volcadura": 9040,
            "Ciclista": 6603,
        };

        const labels = Object.keys(incidenteData);
        const data = Object.values(incidenteData);

        if (incidenteChart) {
            incidenteChart.destroy();
        }

        incidenteChart = new Chart(ctxIncidente, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Conteo de Incidentes',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(199, 199, 199)'
                    ],
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes viales por tipo'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    window.updateIncidenteHistogram = updateIncidenteHistogram;
});
