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
    const colors = this.props.colors || [];
    const option = {
      angleAxis: {
        max: 100,
        // 	clockwise: false, // 逆时针
        // 隐藏刻度线
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      radiusAxis: {
        type: 'category',
        // 隐藏刻度线
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      polar: {
        // center: ['50%', '50%'],
        radius: '180%' //图形大小
      },
      series: [
        {
          type: 'bar',
          data: [
            {
              name: '',
              value: data,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [
                    { offset: 0, color: colors[0] || '#2E6CFF' },
                    { offset: 1, color: colors[1] || '#75C6FF' }
                  ])
                }
              }
            }
          ],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: this.props.width || 12,
          stack: 'A',
          z: 2
        },
        {
          // 灰色环
          type: 'bar',
          data: [
            {
              value: 100,
              itemStyle: {
                color: '#F0F2F5'
              }
            }
          ],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: this.props.width || 12,
          barGap: '-100%',
          stack: 'A',
          z: 1
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
