const inputFile = document.querySelector("#input-file");
const outputJson = document.querySelector("#output-json");

inputFile.addEventListener('change', readCsvFile);

function convertCsvToJson(lines, header) {
  const data = lines.slice(1, -1).map(line => {
    const columns = line.split(',');
    return header.reduce((object, columnName, index) => {
      object[columnName] = columns[index];
      return object;
    }, {});
  });

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
