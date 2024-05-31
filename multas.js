document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('multas_chart').getContext('2d');
    let chart;

    function updateMultasChart() {
        const incidentesData = {
            "Iztapalapa": 15.831361,
            "Cuauhtémoc": 11.600166,
            "Gustavo A. Madero": 11.504070,
            "Venustiano Carranza": 7.377505,
            "Benito Juárez": 7.259519,
            "Tlalpan": 7.180119,
            "Coyoacán": 6.939693,
            "Álvaro Obregón": 6.310802,
            "Miguel Hidalgo": 5.755745,
            "Iztacalco": 4.795156,
            "Azcapotzalco": 4.173685,
            "Xochimilco": 3.824920,
            "Tláhuac": 3.222742,
            "Cuajimalpa de Morelos": 2.083318,
            "La Magdalena Contreras": 1.347571,
            "Milpa Alta": 0.793627
        };

        const infraccionesData = {
            "Miguel Hidalgo": 35.294260,
            "Cuauhtémoc": 15.898183,
            "Álvaro Obregón": 15.869973,
            "Iztapalapa": 9.213452,
            "Benito Juárez": 7.414673,
            "Venustiano Carranza": 7.177484,
            "Gustavo A. Madero": 4.179581,
            "Iztacalco": 1.538205,
            "Coyoacán": 1.320688,
            "Azcapotzalco": 0.666098,
            "La Magdalena Contreras": 0.481802,
            "Tlalpan": 0.363765,
            "Cuajimalpa de Morelos": 0.198029,
            "Xochimilco": 0.159611,
            "Tláhuac": 0.158126,
            "Milpa Alta": 0.061988,
            "Desconocido": 0.004083
        };

        const labels = Object.keys(incidentesData);
        const sortedLabels = labels.sort(); // Sort labels alphabetically
        const incidentesValues = sortedLabels.map(label => incidentesData[label]);
        const infraccionesValues = sortedLabels.map(label => infraccionesData[label]);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedLabels,
                datasets: [
                    {
                        label: 'Incidentes reportados por alcaldía',
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgb(75, 192, 192)',
                        data: incidentesValues,
                        borderWidth: 1
                    },
                    {
                        label: 'Infracciones de tránsito reportadas por alcaldía',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: infraccionesValues.map(value => -value), // Negative values for reverse direction
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes vs. Infracciones por Alcaldía'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += Math.abs(context.raw).toFixed(6); // Adjusted to show full decimal places
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Valor'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Math.abs(value);
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Alcaldía'
                        },
                        stacked: true
                    }
                }
            }
        });
    }

    window.updateMultasChart = updateMultasChart;
    updateMultasChart();
});
