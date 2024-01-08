import React, { Component } from 'react';

const echarts = window.echarts;

export default class Chart extends Component {
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById(this.props.id), null, {
      renderer: 'svg'
    });
    window.addEventListener('resize', this.onResize, false);
    this.showData(this.props.data);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.data !== nextProps.data) {
      this.showData(nextProps.data);
    }
  }

  showData = (data) => {
    const arr = data.map((item) => {
      return {
        name: '占用',
        type: 'pie',
        radius: item.radius || ['90%', '100%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: item.surplus,
            itemStyle: {
              color: '#F0F2F5'
            }
          },
          {
            value: item.total,
            itemStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: item.colors[0] || '#75C6FF' },
                  { offset: 1, color: item.colors[1] || '#2E6CFF' }
                ],
                globalCoord: false
              }
            }
          }
        ]
      };
    });
    const option = {
      series: arr
    };
    this.myChart.setOption(option, true);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  onResize = () => {
    setTimeout(() => {
      this.myChart && this.myChart.resize();
    }, 20);
  };

  render() {
    return <div id={this.props.id} style={{ height: '100%' }} />;
  }
}
