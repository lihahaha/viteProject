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
      tooltip: {
        trigger: 'item'
      },
      title: {
        fontSize: 0
      },
      graphic: [
        {
          //环形图中间添加文字
          type: 'text',
          left: 'center',
          top: '35%',
          style: {
            text: this.props.centerText || '事件类\n型统计',
            textAlign: 'center',
            fill: '#303336', //文字的颜色
            height: 25,
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'PingFangSC-Medium,PingFang SC'
          }
        }
      ],
      color: ['#FF8C5D', '#FFD92B', '#4888FF', '#17DE9A', '#FB5D5D'],
      label: {
        normal: {
          show: false
          // position: "center", //文字显示在中间
          // align: "center",
          // verticalAlign: "middle",
          // textStyle: {
          //   //设置文字样式
          //   fontSize: "0",
          // },
        },
        emphasis: {
          show: true
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          avoidLabelOverlap: false,
          // hoverAnimation: false,
          radius: ['80%', '100%'],
          center: ['50%', '50%'],
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
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
