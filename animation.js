const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
        item.classList.toggle('active');
        const target = item.querySelector('.cs-button').getAttribute('data-target');
        document.querySelectorAll('.cs-faq-item').forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
        if (target === 'grafica1') {
            loadPorHoraData(document.getElementById('selector-dia-aux').value);
        } else if (target === 'grafica2') {
            loadPorAlcaldiaData();
        } else if (target === 'grafica3') {
            updateHistogram();
        } else if (target === 'grafica4') {
            updateIncidenteHistogram();
        } else if (target === 'grafica5') {
            updateMetodoReporte();
        } else if (target === 'graficaMultas') {
            updateMultasChart();
        }
    };
    item.querySelector('.cs-button').addEventListener('click', onClick);
}

// Ensure the chart for grafica4 is rendered on page load
window.addEventListener('load', () => {
    document.getElementById('grafica4-tab').querySelector('.cs-button').click();
});
