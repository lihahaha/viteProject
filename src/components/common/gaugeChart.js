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
    const option = {
      series: [
        {
          type: 'gauge',
          clockwise: true,
          radius: '100%',
          min: 100,
          max: 0,
          startAngle: 200,
          endAngle: -20,
          progress: {
            show: true,
            width: 10
          },
          itemStyle: {
            color: '#F0F2F5'
          },
          axisLine: {
            lineStyle: {
              width: 10,
              color: [
                [
                  1,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0.5,
                      color: '#75C6FF'
                    },
                    {
                      offset: 1,
                      color: '#2E6CFF'
                    }
                  ])
                ]
              ]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          axisLabel: {
            show: false,
            distance: 25,
            color: '#999',
            fontSize: 20
          },
          anchor: {
            show: false,
            showAbove: true
          },
          pointer: {
            show: false
          },
          title: {
            show: true,
            fontSize: 14,
            color: '#8F8F8F',
            offsetCenter: [0, '16%']
          },
          detail: {
            valueAnimation: true,
            fontSize: 28,
            fontFamily: 'DINAlternate-Bold, DINAlternate',
            offsetCenter: [0, '-30%'],
            formatter: function (value) {
              return data + '%';
            }
          },
          data: [
            {
              value: data,
              name: '按期结算率'
            }
          ]
        },
        {
          type: 'gauge',
          radius: '80%',
          startAngle: 200,
          endAngle: -20,
          axisLine: {
            lineStyle: {
              color: [[1, '#308DFF']],
              width: 1
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          title: {
            show: false
          },
          anchor: {
            show: false
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
