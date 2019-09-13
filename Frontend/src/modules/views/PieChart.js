import React from 'react';
import ReactEcharts from 'echarts-for-react';

function PieChart(props) {
    const data =  [
        ...props.prob
    ]

    console.log(data);

    const option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: false,
            min: 0,
            max: 1,
            inRange: {
                colorLightness: [0, 0.7]
            }
        },
        series : [
            {
                name:'Probability',
                type:'pie',
                radius : '90%',
                center: ['50%', '50%'],
                data:[
                    ...data
                ].sort(function (a, b) { return a.value - b.value; }),
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

  return (
    <ReactEcharts option={option}/>
  );
}


export default PieChart;