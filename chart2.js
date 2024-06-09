document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('doughnut');
  
    fetch('./data/mechine.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const uniqueData = _.uniqBy(data, 'Category');
            const categories = uniqueData.map((item) => item.Category);
            const RCoils = uniqueData.map((item) => item.RCoil);
  
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'order per Category',
                        data: RCoils,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        datalabels: {
                            color: '#fff',
                            formatter: (value, ctx) => {
                                let datasets = ctx.chart.data.datasets;
                                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                                    let percentage = Math.round((value / sum) * 100) + '%';
                                    return percentage;
                                } else {
                                    return '';
                                }
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels] 
            });
        })
        .catch((error) => {
            console.error('Error fetching or parsing data:', error);
        });
});
