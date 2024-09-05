document.getElementById('runButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const data = JSON.parse(event.target.result);
        loadChartData(data);
    };

    reader.readAsText(file);
});

function loadChartData(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Real-Time Data',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    data: [],
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
            },
        },
    });

    const logContainer = document.getElementById('logList');
    let index = 0;
    const maxDisplayed = 10;
    const interval = setInterval(() => {
        if (index < data.length) {
            // Remove older data beyond the last 10 points
            const displayedData = data.slice(Math.max(0, index - maxDisplayed), index + 1);

            // Update chart data
            chart.data.datasets[0].data = displayedData;
            chart.update();

            // Log data loading
            const li = document.createElement('li');
            li.textContent = `Loaded data: x=${data[index].x}, y=${data[index].y}`;
            logContainer.appendChild(li);

            // Scroll the log to the latest entry
            logContainer.scrollTop = logContainer.scrollHeight;

            index++;
        } else {
            clearInterval(interval);
        }
    }, 50); // Loads data every 500ms (half a second)
}
