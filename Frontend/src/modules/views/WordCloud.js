import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud';

function WordCloud(props) {
    const data =  [
        ...props.prob
    ];

    // const maskImage = new Image();

    const option = {
        backgroundColor:'rgba(0,0,0,0)',
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
            {
                type: 'wordCloud',
                gridSize: 1,
                sizeRange: [25, 75],
                rotationRange: [0,0],
                // maskImage: maskImage,
                textStyle: {
                    normal: {
                        fontFamily: '"Roboto", sans-serif',
                        color: function() {
                            return 'rgb(' +
                            Math.round(Math.random() * 255) +
                            ', ' + Math.round(Math.random() * 255) +
                            ', ' + Math.round(Math.random() * 255) + ')'
                        }
                    }
                },
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                data:[
                    ...data
                ]
        }]
    }
    return (
        <ReactEcharts option={option}/>
    );
}

export default WordCloud;