
    const ctx = document.getElementById('myChart');

    fetch('./data/mechine.json')
      .then((response) => response.json())
      .then((data) => {
        const uniqueData = _.uniqBy(data, 'Location'); // Filter data duplikat berdasarkan properti 'Location'
        const locations = uniqueData.map((item) => {
          return item.Location;
        });
        const RCoils = uniqueData.map((item) => {
          return item.RCoil;
        });
        console.log(locations);
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: locations,
            datasets: [{
              label: 'order per Location',
              data: RCoils,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true, // Add this option
            maintainAspectRatio: false, // Add this option
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
