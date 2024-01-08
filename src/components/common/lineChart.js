import React, { Component } from 'react';

const echarts = window.echarts;

export default class Chart extends Component {
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById(this.props.id), null, {
      renderer: 'svg'
    });
    window.addEventListener('resize', this.onResize, false);
    this.showData(this.props.data, this.props.dates);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.data !== nextProps.data) {
      this.showData(nextProps.data, nextProps.dates);
    }
  }

  showData = (data, dates) => {
    const option = {
      grid: {
        left: '10%',
        right: 15,
        top: 10,
        bottom: 35
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#cdcdcd',
            width: 1
          }
        },
        axisLabel: {
          fontSize: 10,
          color: '#95A0B8',
          rotate: 30
        },
        data: dates || [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12'
        ]
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#cdcdcd'
          }
        },
        axisLabel: {
          fontSize: 10,
          color: '#95A0B8'
        }
      },
      series: [
        {
          data: (data && data[0]) || [],
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#1583FF',
              width: 2
            }
          }
        },
        {
          data: (data && data[1]) || [],
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#FFD92B',
              width: 2
            }
          }
        },
        {
          data: (data && data[2]) || [],
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#4DD5B8',
              width: 2
            }
          }
        }
      ]
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
