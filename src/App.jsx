/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-14 15:16:42
 * @LastEditTime: 2023-10-26 09:56:04
 */
import RectBound from '@/views/module/rect'
import Circle from '@/views/module/circle'
import { useState, useEffect, useRef, useContext } from 'react'
import globalVariable from '@/config/init'
import { followMouseMove } from '@/utils/tools'
import "@/App.css"
import { useStore } from 'react-redux'
import FollowMouse from '@/views/comps/followMouse'
function App(props) {
  const [circleList, setCircleList] = useState({
    circle1: {},
    circle2: {}
  })
  const [initCircleValue, setInitCircleValue] = useState({
    strokeActiveColor: '',
    circleCx: '',
    circleCy: ''
  })
  const svgDomRef = useRef(null)

  const store = useStore()
  // let circleReducerMap = store.getState().initCirclePropsReducer
  var mouseX = 0
  var mouseY = 0
  var offsetX = 0
  var offsetY = 0
  useEffect(() => {

    followMouseMove(svgDomRef.current, {
      downCb: (downEvent) => {
        console.log(downEvent);
        if (downEvent.target.nodeName == 'circle') {
          // store.subscribe(() => {
          // circleReducerMap = store.getState().initCirclePropsReducer
          handleCircle({ ifDown: true }, downEvent)
          // })
        }
      }, moveCb: (moveEvent) => {
        handleCircle({ ifMove: true }, moveEvent)
      }
    })


  }, [])

  const clickSvg = (e) => {
    console.log('点击svg', e);
    // 如果当前对象是circle
    // debugger
    if (e.target.nodeName == 'circle') {
      handleCircle({ ifActiveStroke: true })

    } else {
      handleCircle({ ifActiveStroke: false })
    }
  }

  // 处理圆的逻辑
  /**
   * 
   * @param {ifActiveStroke} 
   * true:激活边色 
   * false:不激活边色
   */
  const handleCircle = ({ ifActiveStroke, ifDown, ifMove }, myEvent) => {
    // 有才能进入
    if (typeof ifActiveStroke != 'undefined') {
      setInitCircleValue({
        strokeActiveColor: ifActiveStroke ? globalVariable.defaultCircle.activeCircleStrokeColor : globalVariable.defaultCircle.circleStrokeColor
      })
    }
    // 记录点击的操作
    if (typeof ifDown != 'undefined') {
      mouseX = myEvent.clientX;
      mouseY = myEvent.clientY;
      // 这里要获取用户每次点击图形的位置信息
      const circleInfo = myEvent.target.getBoundingClientRect()
      offsetX = mouseX - (circleInfo.x + circleInfo.width / 2)
      offsetY = mouseY - (circleInfo.y + circleInfo.height / 2)
      console.log(mouseX);

    }
    // 记录移动的操作
    if (typeof ifMove != 'undefined') {
      let newMouseX = myEvent.clientX
      let newMouseY = myEvent.clientY
      // 计算元素的新位置
      let newElementX = newMouseX - offsetX
      let newElementY = newMouseY - offsetY
      // store.dispatch({ type: 'update', data: { key: 'cx', value: newElementX } })
      // store.dispatch({ type: 'update', data: { key: 'cy', value: newElementY } })
      console.log(newElementX);
      setInitCircleValue({
        ...initCircleValue,
        circleCx: newElementX,
        circleCy: newElementY
      })
      circleList[myEvent.target.dataset.circleid] = {
        ...initCircleValue,
        circleCx: newElementX,
        circleCy: newElementY
      }
      setCircleList(circleList)
    }
  }

  return (
    <>
      <svg
        version="1.1"
        baseProfile="full"
        width="100%" height="500"
        xmlns="http://www.w3.org/2000/svg"
        onClick={clickSvg}

        ref={svgDomRef}
        id="mySvg"
      >
        <RectBound ></RectBound>
        {
          Object.keys(circleList).map((circleKey, idx) => {
            return <Circle key={idx} initCircleValue={circleList[circleKey]} circleId={circleKey}></Circle>
          })
        }
        {/* <Circle initCircleValue={initCircleValue} circleId='circle1'></Circle>
        <Circle initCircleValue={initCircleValue} circleId='circle2'></Circle> */}
        {/* <Circle initCircleValue={initCircleValue}></Circle> */}

      </svg>
      {/* <FollowMouse></FollowMouse> */}
      <div id='moveTest'>快快快</div>
    </>
  )
}

export default App
