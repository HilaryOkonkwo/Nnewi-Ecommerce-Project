// Sales Chart
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Sales',
      data: [5000, 7000, 4500, 6000, 8000, 9000, 10000],
      borderColor: '#2c3e50',
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// script.js (for the dashboard)
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
      window.location.href = './index.html'; // Redirect to login if no token
      return;
  }

  // Example of fetching data from a protected endpoint (requires token)
  fetch('/api/data', { // Replace with your API endpoint
      headers: {
          'Authorization': 'Bearer ' + token,
      },
  })
  .then(response => response.json())
  .then(data => {
      console.log('API data:', data);
      // Use the data to populate your dashboard
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      localStorage.removeItem('token'); //remove token if error occurs
      window.location.href = './index.html'; //redirect to login.
  });
  // Chart.js example (replace with your data)
  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
              label: 'Sales',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
          }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
              },
          },
      },
  });

});