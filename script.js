// Khởi tạo ECharts
const gaugeChart = echarts.init(document.getElementById('gaugeChart'));
gaugeChart.setOption({
  series: [{
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    min: 0,
    max: 14,
    radius: '95%', // Mở rộng vòng cung ra sát viền để thoáng hơn
    center: ['50%', '75%'], // Đẩy trọng tâm xuống dưới
    axisLine: {
      lineStyle: {
        width: 15,
        color: [
          [0.3, '#ff4757'], // Đỏ (Axit)
          [0.5, '#2ed573'], // Xanh lá (Trung tính)
          [0.7, '#1e90ff'], // Xanh dương (Kiềm nhẹ)
          [1, '#9c88ff']    // Tím (Kiềm mạnh)
        ]
      }
    },
    pointer: {
      icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z', // Đổi kim thành hình kim nhọn chuẩn
      length: '40%', // Rút ngắn kim lại để không đè số
      width: 6,
      offsetCenter: [0, '-40%'], // Nâng kim lên cao
      itemStyle: {
        color: 'auto' // Kim đổi màu theo vùng nó chỉ vào
      }
    },
    axisTick: {
      length: 10,
      lineStyle: { color: 'auto', width: 2 }
    },
    splitLine: {
      length: 15,
      lineStyle: { color: 'auto', width: 3 }
    },
    axisLabel: {
      color: '#7b849b', // Đổi màu số cho dễ nhìn
      distance: -40, // Đẩy số ra xa kim
      fontSize: 12
    },
    detail: {
      fontSize: 45, // Chữ số bự lên
      offsetCenter: [0, '-5%'],
      valueAnimation: true,
      formatter: '{value}',
      color: 'inherit'
    },
    data: [{ 
      value: 0, 
      name: 'pH HIỆN TẠI' // Đổi tên cho hợp lý
    }],
    title: {
      offsetCenter: [0, '20%'], // Hạ chữ xuống dưới cùng
      fontSize: 14,
      color: '#7b849b'
    }
  }]
});