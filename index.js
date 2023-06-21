const inputFile = document.querySelector("#inputFile");
const outputJson = document.querySelector("#outputJson");

inputFile.addEventListener('change', convertCsvToJson);

function convertCsvToJson(event){
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;

        const lines = content.split('\n');
        const header = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length -1; i++) {
            const columns = lines[i].split(',');
            const obj = {};

            for (let j = 0; j < header.length; j++) {
                obj[header[j]] = columns[j];
            }

            data.push(obj);
        }

        console.log(data);
        outputJson.innerHTML = JSON.stringify(data);  
        
    };

    reader.readAsText(file);
}


