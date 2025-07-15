const SHEET_ID = '1ijTLNwv3vFiQJWaGiJqPRsF4GroAVKutP2CJxPUzlEg';
const API_KEY = 'AIzaSyDQ0XmRLJv23FhPECw1xAJEw0MAIGO037E';
const RANGE = 'Sheet1!A2:F';
let allData = [];

function loadSheetData() {
  gapi.client.init({ apiKey: API_KEY }).then(() => {
    return gapi.client.request({
      path: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`
    });
  }).then(response => {
    allData = response.result.values || [];
    displayData(allData);
  });
}

function displayData(data) {
  const tbody = document.querySelector('#deviceTable tbody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

let knownIps = [];

function displayData(data) {
  const tbody = document.querySelector('#deviceTable tbody');
  tbody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);

    const ip = row[5]; // kolom ke-6 (IP)
    if (ip && !knownIps.includes(ip)) {
      knownIps.push(ip);
      alert(`🔔 IP baru terdeteksi: ${ip}`);
    }
  });
}


function generateDeviceId(info) {
  return btoa(info.device + info.os + info.browser + info.screen);
}


function applyFilter() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allData.filter(row =>
    row.some(cell => cell.toLowerCase().includes(keyword))
  );
  displayData(filtered);
}

gapi.load('client', loadSheetData);

setInterval(() => {
  console.log("⏳ Memuat ulang data otomatis...");
  loadSheetData();
}, 30000);

window.applyFilter = applyFilter;
