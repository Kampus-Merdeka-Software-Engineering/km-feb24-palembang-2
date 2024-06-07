document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('doughnut'); // Mengubah ID sesuai dengan yang digunakan dalam file HTML
  
    fetch('./data/mechine.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const uniqueData = _.uniqBy(data, 'Category'); // Filter data duplikat berdasarkan properti 'Location'
            const categoris = uniqueData.map((item) => {
                return item.Category;
            });
            const RCoils = uniqueData.map((item) => {
                return item.RCoil;
            });
  
            // Pastikan data telah terbentuk dengan benar
            console.log(categoris);
            console.log(RCoils);
  
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: categoris,
                    datasets: [{
                        label: 'order per Category',
                        data: RCoils,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching or parsing data:', error);
        });
  });
  