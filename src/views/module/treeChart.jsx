/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-11-29 09:45:00
 * @LastEditTime: 2023-11-29 10:52:32
 */
import { useEffect, useRef } from "react"
import * as $echarts from 'echarts';
export default function TreeChart(props) {
  let myDivRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      initChart()
    }, 1000)
  }, [])
  function initChart() {

    var chartDom = document.getElementById('myDivId');
    var myChart = $echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option;

    myChart.setOption(
      (option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [
              {
                name: 'flare',
                children: [
                  {
                    name: 'sdflljdsf',
                    children: [{ name: 'cljss' }]
                  }
                ]
              }
            ],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    );

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
  }
  return (
    <>
      <div id="myDivId" ref={myDivRef}></div>
    </>
  )
}