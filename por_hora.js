document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('por_hora').getContext('2d');
    let chart;

    function updateChart(data, dayLabel) {
        const horas = data.map(row => row["hora_usable"]);
        const folios = data.map(row => parseInt(row["folio"], 10));

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: horas,
                datasets: [{
                    label: 'Cantidad de Folios por Hora',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: folios,
                    fill: false,
                    lineTension: 0
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Hora del día'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cantidad de Folios'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución Horaria de Folios - ' + dayLabel
                    },
                    legend: {
                        display: true
                    }
                }
            }
        });
    }

    function loadData(filename) {
        const dayMap = {
            'hora_total.csv': 'General',
            'hora_lunes.csv': 'Lunes',
            'hora_martes.csv': 'Martes',
            'hora_miercoles.csv': 'Miércoles',
            'hora_jueves.csv': 'Jueves',
            'hora_viernes.csv': 'Viernes',
            'hora_sabado.csv': 'Sábado',
            'hora_domingo.csv': 'Domingo'
        };
        const dayLabel = dayMap[filename];

        Papa.parse(`por_hora/${filename}`, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                if (results.data.length > 0) {
                    updateChart(results.data, dayLabel);
                } else {
                    console.log('No data to display.');
                }
            }
        });
    }

    document.getElementById('selector-dia-aux').addEventListener('change', function () {
        loadData(this.value);
    });

    window.loadPorHoraData = loadData;

    // Cargar datos iniciales con el archivo general
    loadData('hora_total.csv');
});
