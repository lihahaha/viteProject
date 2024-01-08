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
    let maxData = data.sort((a, b) => {
      return b - a;
    });
    let maxNum = maxData.length ? maxData[0].value : 0;
    const option = {
      series: [
        {
          name: '漏斗图',
          type: 'funnel',
          left: '10%',
          top: 0,
          //x2: 80,
          bottom: 80,
          width: '90%',
          height: 110,
          min: 0,
          max: maxNum,
          minSize: '40%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          color: ['#3177FF', '#55B3FD', '#44E9E9'],
          label: {
            show: true,
            position: 'inside',
            color: '#ffffff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Medium, PingFang SC'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
            // height: 36
          },
          emphasis: {
            label: {
              fontSize: 30
            }
          },
          data
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
