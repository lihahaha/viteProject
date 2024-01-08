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
    let times = [];
    let datas = [];
    data &&
      data.forEach((item) => {
        times.push(item.date);
        datas.push(item.total);
      });
    const option = {
      grid: {
        left: '10%',
        right: 17,
        top: 10,
        bottom: 26
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#cdcdcd'
          }
        },
        axisLabel: {
          fontSize: 10,
          color: '#909090',
          rotate: 20
        },
        data: times
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
          color: '#909090'
        }
      },
      series: [
        {
          data: datas,
          type: 'bar',
          barMaxWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#6D9FFE' },
                { offset: 1, color: '#4883F9' }
              ])
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
