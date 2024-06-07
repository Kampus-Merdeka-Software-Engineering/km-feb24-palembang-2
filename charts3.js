document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('line'); // Mengubah ID sesuai dengan yang digunakan dalam file HTML
  
    fetch('./data/mechine.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const uniqueData = _.uniqBy(data, 'Product'); // Filter data duplikat berdasarkan properti 'Location'
            const products = uniqueData.map((item) => {
                return item.Product;
            });
            const RPrice = uniqueData.map((item) => {
                return item.RPrice;
            });
  
            // Pastikan data telah terbentuk dengan benar
            console.log(products);
            console.log(RPrice);
  
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: products,
                    datasets: [{
                        label: 'order per Products',
                        data:RPrice,
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
  