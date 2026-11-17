const gaugeChart = echarts.init(document.getElementById('gaugeChart'));
gaugeChart.setOption({
  series: [{
    type: 'gauge',
    startAngle: 180, endAngle: 0,
    min: 0, max: 14,
    radius: '90%', 
    center: ['50%', '65%'], // Nâng toàn bộ khối cung tròn lên trên
    axisLine: {
      lineStyle: {
        width: 15,
        color: [[0.3, '#ff4757'], [0.5, '#2ed573'], [0.7, '#1e90ff'], [1, '#9c88ff']]
      }
    },
    pointer: { 
      length: '55%', width: 5, 
      offsetCenter: [0, '-5%'] // Giữ kim ở nửa trên
    },
    axisLabel: {
      distance: 20, // QUAN TRỌNG: Số dương đẩy các mốc (0..14) ra HẲN BÊN NGOÀI viền màu
      color: '#7b849b',
      fontSize: 12
    },
    detail: {
      fontSize: 45,
      offsetCenter: [0, '25%'], // Hạ con số bự hiển thị pH xuống dưới kim
      formatter: '{value}',
      color: 'auto'
    },
    title: {
      offsetCenter: [0, '55%'], // Hạ chữ "pH HIỆN TẠI" xuống dưới đáy
      fontSize: 13,
      color: '#7b849b'
    },
    data: [{ value: 0, name: 'pH HIỆN TẠI' }]
  }]
});