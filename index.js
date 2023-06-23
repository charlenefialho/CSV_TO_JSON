const inputFile = document.querySelector("#input-file");
const outputJson = document.querySelector("#output-json");

inputFile.addEventListener('change', readCsvFile);

function convertCsvToJson(lines, header) {
  const data = [];
  for (let i = 1; i < lines.length - 1; i++) {
    const columns = lines[i].split(',');
    const obj = {};

    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = columns[j];
    }

    data.push(obj);
  }
  outputJson.innerText = JSON.stringify(data);

    downloadJsonFile(createDownloadLink(JSON.stringify(data)));
}


function readCsvFile(event){
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;
    const lines = content.split('\n');
    const header = lines[0].split(',');

    convertCsvToJson(lines, header);
  };
  reader.readAsText(file);

}


function downloadJsonFile(linkDownload){
  linkDownload.dispatchEvent(new MouseEvent('click'));
}

function createDownloadLink(jsonData){
  const blob = new Blob([jsonData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json';

    return downloadLink;
}
