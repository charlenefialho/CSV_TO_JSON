const inputFile = document.querySelector("#inputFile");
const outputJson = document.querySelector("#outputJson");

inputFile.addEventListener('change', convertCsvToJson);

function convertCsvToJson(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;

    const lines = content.split('\n');
    const header = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length - 1; i++) {
      const columns = lines[i].split(',');
      const obj = {};

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = columns[j];
      }

      data.push(obj);
    }

    console.log(data);
    outputJson.innerHTML = JSON.stringify(data);

    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json';

    downloadLink.dispatchEvent(new MouseEvent('click'));
  };

  reader.readAsText(file);
}
