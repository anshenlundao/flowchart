/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-14 15:16:42
 * @LastEditTime: 2023-11-21 17:28:14
 * 在React中更新数组中的对象后，界面的更新取决于你如何管理状态和触发重新渲染。

一种常见的做法是使用useState钩子来管理数组的状态，并使用set函数来更新数组。
当你"更新数组"中的对象时，确保创建一个新的"数组副本"，
而不是直接修改原始数组。这样做可以确保React
能够检测到数组的变化并重新渲染组件。
 */
import RectBound from '@/views/module/rect'
import Circle from '@/views/module/circle'
import { useState, useEffect, useRef } from 'react'
import globalVariable from '@/config/init'
import { followMouseMove } from '@/utils/tools'
import "@/App.css"
import { useStore } from 'react-redux'
function App(props) {
  const [circleList, setCircleList] = useState({
    circle1: {},
    circle2: {},
    circle3: {},
    circle4: {},
    circle5: {},
    circle6: {},
    circle7: {},
  })

  function createCircle({ num }) {
    let circleListObj = {}
    for (let i = 0; i < num; i++) {
      circleListObj['circle' + (i + 1)] = {}
    }
    return circleListObj
  }
  // 生成指定个数的圆
  // var circleListObj = createCircle({ num: 10 })

  // setCircleList(circleListObj)

  const svgDomRef = useRef(null)

  var mouseX = 0
  var mouseY = 0
  var offsetX = 0
  var offsetY = 0
  var myDownEvent;
  useEffect(() => {
    var circleListObj = createCircle({ num: 30 })
    // console.log(circleListObj)
    setCircleList(circleListObj)
    console.log(circleList);
    followMouseMove(svgDomRef.current, {
      downCb: (downEvent) => {
        console.log(downEvent);
        if (downEvent.target.nodeName == 'circle') {
          myDownEvent = downEvent
          handleCircle({ ifDown: true }, downEvent)
          // })
        }
      }, moveCb: (moveEvent) => {
        if (moveEvent.target.nodeName == 'circle') {
          handleCircle({ ifMove: true }, moveEvent)

        }
      },
      upCb: () => {
        handleCircle({ ifUp: true })
      }
    })
    // 传入空数组，只会在页面加载完成时候触发一次

  }, [])



  // 处理圆的逻辑
  /**
   * 
   * @param {ifActiveStroke} 
   * true:激活边色 
   * false:不激活边色
   */
  const handleCircle = ({ ifActiveStroke, ifDown, ifMove, ifUp }, myEvent) => {
    // 有才能进入
    if (typeof ifActiveStroke != 'undefined') {
    }
    // 记录点击的操作
    if (typeof ifDown != 'undefined') {
      mouseX = myEvent.clientX;
      mouseY = myEvent.clientY;
      // 这里要获取用户每次点击图形的位置信息
      const circleInfo = myEvent.target.getBoundingClientRect()
      offsetX = mouseX - (circleInfo.x + circleInfo.width / 2)
      offsetY = mouseY - (circleInfo.y + circleInfo.height / 2)
      console.log(mouseX, circleList);
      var circleListCopy = JSON.parse(JSON.stringify(circleList))
      circleListCopy[myDownEvent.target.dataset.circleid] = {
        strokeActiveColor: globalVariable.defaultCircle.activeCircleStrokeColor

      }
      setCircleList(circleListCopy)

    }
    // 记录移动的操作
    if (typeof ifMove != 'undefined') {
      let newMouseX = myEvent.clientX
      let newMouseY = myEvent.clientY
      // 计算元素的新位置
      let newElementX = newMouseX - Math.abs(offsetX)
      let newElementY = newMouseY - Math.abs(offsetY)
      console.log(newElementX);
      console.log(circleList);
      var circleListCopy = JSON.parse(JSON.stringify(circleList))
      // 这里传入点击的dom的dataset属性
      circleListCopy[myDownEvent.target.dataset.circleid] = {
        // strokeActiveColor: circleList[myDownEvent.target.dataset.circleid].strokeActiveColor,
        circleCx: newElementX,
        circleCy: newElementY
      }
      setCircleList(circleListCopy)
    }
    if (typeof ifUp != 'undefined') {
      // debugger
      var circleListCopy = JSON.parse(JSON.stringify(circleList))
      // 这里传入点击的dom的dataset属性
      circleListCopy[myDownEvent.target.dataset.circleid] = {
        strokeActiveColor: globalVariable.defaultCircle.circleStrokeColor,

      }
      setCircleList(circleListCopy)
    }
  }

  return (
    <>
      <svg
        version="1.1"
        baseProfile="full"
        width="100%" height="500"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgDomRef}
        id="mySvg"
      >
        <RectBound ></RectBound>
        {
          Object.keys(circleList).map((circleKey, idx) => {
            return <Circle key={idx} initCircleValue={circleList[circleKey]} circleId={circleKey}></Circle>
          })
        }


      </svg>


    </>
  )
}

export default App
