// dataGenerator.js
function generateData() {
    const data = [];
    let yValue = 0;

    for (let i = 0; i < 100; i++) {
        yValue += Math.floor(Math.random() * 10) + 1; // Random increasing value
        data.push({ x: i, y: yValue });
    }

    // Download data as JSON file
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
}

// Call this function to generate and download the data.json file
generateData();
