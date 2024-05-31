document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('por_alcaldia').getContext('2d');
    let chart;
    let data;

    function updateChart(filteredData, alcaldia, dia) {
        const horas = Object.keys(filteredData[0]).filter(key => key !== 'alcaldia_catalogo' && key !== 'dia_semana');
        const folios = horas.map(hora => filteredData.reduce((sum, row) => sum + parseInt(row[hora]), 0));

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
                        text: `Distribución Horaria de Folios - ${alcaldia}, ${dia}`
                    },
                    legend: {
                        display: true
                    }
                }
            }
        });
    }

    function filterData(alcaldia, dia) {
        return data.filter(row => row.alcaldia_catalogo === alcaldia && row.dia_semana === dia);
    }

    function populateSelectors() {
        const alcaldias = [...new Set(data.map(item => item.alcaldia_catalogo))];
        const dias = [...new Set(data.map(item => item.dia_semana))];

        const alcaldiaSelector = document.getElementById('selector-alcaldia');
        const diaSelector = document.getElementById('selector-dia');

        alcaldias.forEach(alcaldia => {
            const option = document.createElement('option');
            option.value = alcaldia;
            option.text = alcaldia;
            alcaldiaSelector.appendChild(option);
        });

        dias.forEach(dia => {
            const option = document.createElement('option');
            option.value = dia;
            option.text = dia;
            diaSelector.appendChild(option);
        });

        alcaldiaSelector.addEventListener('change', function () {
            const selectedAlcaldia = this.value;
            const selectedDia = diaSelector.value;
            if (selectedAlcaldia && selectedDia) {
                const filteredData = filterData(selectedAlcaldia, selectedDia);
                updateChart(filteredData, selectedAlcaldia, selectedDia);
            }
        });

        diaSelector.addEventListener('change', function () {
            const selectedDia = this.value;
            const selectedAlcaldia = alcaldiaSelector.value;
            if (selectedAlcaldia && selectedDia) {
                const filteredData = filterData(selectedAlcaldia, selectedDia);
                updateChart(filteredData, selectedAlcaldia, selectedDia);
            }
        });

        // Cargar datos iniciales con la primera opción
        if (alcaldias.length > 0 && dias.length > 0) {
            alcaldiaSelector.value = alcaldias[0];
            diaSelector.value = dias[0];
            const initialData = filterData(alcaldias[0], dias[0]);
            updateChart(initialData, alcaldias[0], dias[0]);
        }
    }

    window.loadPorAlcaldiaData = function() {
        Papa.parse('por_alcaldia.csv', {
            download: true,
            header: true,
            complete: function(results) {
                data = results.data;
                populateSelectors();
            }
        });
    };

    loadPorAlcaldiaData();
});
