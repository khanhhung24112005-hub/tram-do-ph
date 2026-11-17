const FIREBASE_URL = "https://tramdoph-default-rtdb.asia-southeast1.firebasedatabase.app/sensor.json";

// Quản lý giao diện
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').innerText = savedTheme === 'dark' ? '☀️' : '🌙';

document.getElementById('themeToggle').addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  document.getElementById('themeToggle').innerText = newTheme === 'dark' ? '☀️' : '🌙';
  updateChartsTheme(newTheme); 
});

setInterval(() => {
  document.getElementById('clock').innerText = new Date().toLocaleTimeString('vi-VN');
}, 1000);

// Khởi tạo ECharts
const gaugeChart = echarts.init(document.getElementById('gaugeChart'));
gaugeChart.setOption({
  series: [{
    type: 'gauge', startAngle: 180, endAngle: 0, min: 0, max: 14,
    axisLine: { lineStyle: { width: 12, color: [[0.3, '#ff4757'], [0.5, '#2ed573'], [0.7, '#1e90ff'], [1, '#9c88ff']] } },
    pointer: { length: '12%', width: 15, offsetCenter: [0, '-60%'] },
    detail: { fontSize: 40, offsetCenter: [0, '-10%'] },
    data: [{ value: 0, name: 'ĐANG TẢI...' }]
  }]
});

const lineChart = echarts.init(document.getElementById('lineChart'));
let timeData = [], phData = [];
lineChart.setOption({
  xAxis: { type: 'category', data: timeData },
  yAxis: { type: 'value', min: 0, max: 14 },
  series: [{ type: 'line', smooth: true, lineStyle: { color: '#00f2a6', width: 3 }, data: phData }]
});

function updateChartsTheme(theme) {
  const textColor = theme === 'dark' ? '#7b849b' : '#5f6368';
  gaugeChart.setOption({ series: [{ detail: { color: theme === 'dark' ? '#fff' : '#1a1a2e' } }] });
  lineChart.setOption({ xAxis: { axisLine: { lineStyle: { color: textColor } } } });
}
updateChartsTheme(savedTheme);
window.addEventListener('resize', () => { gaugeChart.resize(); lineChart.resize(); });

// Lấy dữ liệu từ Cloud mỗi 2 giây
setInterval(() => {
  fetch(FIREBASE_URL)
    .then(res => res.json())
    .then(data => {
      if (!data) return;
      document.getElementById('connStatus').style.color = '#00f2a6';
      document.getElementById('connStatus').innerText = 'ĐÃ KẾT NỐI CLOUD';
      
      let ph = parseFloat(data.ph);
      let v = parseFloat(data.v);
      
      document.getElementById('voltValue').innerHTML = v.toFixed(3) + '<span>V</span>';
      
      let statusColor = ph < 6.5 ? '#ff4757' : (ph > 8.5 ? '#3742fa' : '#00f2a6');
      gaugeChart.setOption({ series: [{ data: [{ value: ph, name: 'TÍN HIỆU TỐT' }], title: { color: statusColor } }] });

      let t = new Date().toLocaleTimeString('vi-VN');
      if (timeData.length > 20) { timeData.shift(); phData.shift(); }
      timeData.push(t); phData.push(ph);
      lineChart.setOption({ xAxis: { data: timeData }, series: [{ data: phData }] });
    })
    .catch(() => {
      document.getElementById('connStatus').style.color = '#ff4757';
      document.getElementById('connStatus').innerText = 'MẤT KẾT NỐI';
    });
}, 2000);