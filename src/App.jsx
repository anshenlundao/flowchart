/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-14 15:16:42
 * @LastEditTime: 2024-03-23 10:26:38
 * 在React中更新数组中的对象后，界面的更新取决于你如何管理状态和触发重新渲染。

一种常见的做法是使用useState钩子来管理数组的状态，并使用set函数来更新数组。
当你"更新数组"中的对象时，确保创建一个新的"数组副本"，
而不是直接修改原始数组。这样做可以确保React
能够检测到数组的变化并重新渲染组件。

解决动态生成圆，首先执行圆的函数一定要放在useEffect中，
其次要去掉main.jsx中strict模式，strict模式会让useEffect执行两次，
然后获取圆的个数不能直接使用circleList，需要使用getList()
 */
import RectBound from '@/views/module/rect'
import Circle from '@/views/module/circle'
import Rect from '@/views/module/rect'
import { useState, useEffect, useRef } from 'react'
import globalVariable from '@/config/init'
import { followMouseMove } from '@/utils/tools'
import "@/App.css"
import { useStore } from 'react-redux'
import { useGetState } from '@/hooks/setState'
import TreeChart from './views/module/treeChart'
function App(props) {
  const [circleList, setCircleList, getList] = useGetState({
    // circle1: {},
    // circle2: {},
    // circle3: {},
  })
  const [rectList, setRectList, getRectList] = useGetState({
    // rect1: {},
    // rect2: {},
    // rect3: {},
  })

  function createShape({ num, shapeName }) {
    let shapeListObj = {}
    for (let i = 0; i < num; i++) {
      shapeListObj[shapeName + (i + 1)] = {}
    }
    return shapeListObj
  }
  // 生成指定个数的圆,在这里不行，会循环了
  // var circleListObj = createCircle({ num: 10 })

  // setCircleList(circleListObj)

  const svgDomRef = useRef(null)

  var mouseX = 0
  var mouseY = 0
  var offsetX = 0
  var offsetY = 0
  var myDownEvent;
  var shapeId;
  useEffect(() => {
    var circleListObj = createShape({ num: 2, shapeName: 'circle' })
    var rectListObj = createShape({ num: 2, shapeName: 'rect' })
    setCircleList(circleListObj)
    setRectList(rectListObj)

    followMouseMove(svgDomRef.current, {
      downCb: (downEvent) => {
        console.log(downEvent);
        if (downEvent.target.nodeName == 'circle') {
          myDownEvent = downEvent
          handleShape({ ifDown: true, shapeName: 'circle' }, downEvent)
        }
        if (downEvent.target.nodeName == 'rect') {
          myDownEvent = downEvent
          handleShape({ ifDown: true, shapeName: 'rect' }, downEvent)
        }
      }, moveCb: (moveEvent) => {
        if (moveEvent.target.nodeName == 'circle') {
          handleShape({ ifMove: true, shapeName: 'circle' }, moveEvent)

        }
        if (moveEvent.target.nodeName == 'rect') {
          handleShape({ ifMove: true, shapeName: 'rect' }, moveEvent)
        }
      },
      upCb: (upEvent) => {
        handleShape({ ifUp: true }, upEvent)
      }
    })

    // 传入空数组，在非strict模式下，只会在页面加载完成时候触发一次

  }, [])



  // 处理圆的逻辑
  /**
   * 
   * @param { ifDown, ifMove, ifUp }
   * @param myEvent 
   * 
   */
  const handleShape = ({ ifDown, ifMove, ifUp, shapeName }, myEvent) => {

    // 记录点击的操作
    if (typeof ifDown != 'undefined') {
      mouseX = myEvent.clientX;
      mouseY = myEvent.clientY;

      // 这里要获取用户每次点击图形的位置信息
      const shapeInfo = myEvent.target.getBoundingClientRect()

      if (shapeName == 'circle') {
        offsetX = mouseX - (shapeInfo.x + shapeInfo.width / 2)
        offsetY = mouseY - (shapeInfo.y + shapeInfo.height / 2)
        var shapeListCopy = JSON.parse(JSON.stringify(getList()))
        var downEventShapeId = myDownEvent.target.dataset.circleid
        var strokeColor = globalVariable.defaultCircle.circleStrokeColor
        var strokeActiveColor = globalVariable.defaultCircle.activeCircleStrokeColor
        var setShapeList = setCircleList
      }
      if (shapeName == 'rect') {
        offsetX = mouseX - (shapeInfo.x)
        offsetY = mouseY - (shapeInfo.y)
        var shapeListCopy = JSON.parse(JSON.stringify(getRectList()))
        var downEventShapeId = myDownEvent.target.dataset.rectid
        var strokeColor = globalVariable.defaultRect.rectStrokeColor
        var strokeActiveColor = globalVariable.defaultRect.activeRectStrokeColor
        var setShapeList = setRectList
      }
      // 表明点击圆之前上一个也点击了圆,实现点击下一个圆上一个圆颜色去掉
      if (shapeId) {
        shapeListCopy[shapeId] = {
          strokeActiveColor: strokeColor
        }
        setShapeList(shapeListCopy)
      }
      shapeListCopy[downEventShapeId] = {
        strokeActiveColor
      }
      setShapeList(shapeListCopy)

    }
    // 记录移动的操作
    if (typeof ifMove != 'undefined') {
      let newMouseX = myEvent.clientX
      let newMouseY = myEvent.clientY
      // 计算元素的新位置
      let newElementX = newMouseX - offsetX
      let newElementY = newMouseY - offsetY
      if (shapeName == 'circle') {
        var shapeListCopy = JSON.parse(JSON.stringify(getList()))
        var downEventShapeId = myDownEvent.target.dataset.circleid
        var propsObj = {
          circleCx: newElementX,
          circleCy: newElementY
        }
        var setShapeList = setCircleList
      }
      if (shapeName == 'rect') {
        console.log(offsetX);
        var shapeListCopy = JSON.parse(JSON.stringify(getRectList()))
        var downEventShapeId = myDownEvent.target.dataset.rectid
        var propsObj = {
          rectX: newElementX,
          rectY: newElementY
        }
        console.log(propsObj);
        var setShapeList = setRectList
      }

      // 这里传入点击的dom的dataset属性
      shapeListCopy[downEventShapeId] = propsObj
      setShapeList(shapeListCopy)
    }
    if (typeof ifUp != 'undefined') {
      shapeId = myDownEvent ? myDownEvent.target.dataset.circleid || myDownEvent.target.dataset.rectid : ''
      var circleListCopy = JSON.parse(JSON.stringify(getList()))
      var rectListCopy = JSON.parse(JSON.stringify(getRectList()))
      // 实现点击svg元素(圆之外的元素),圆的颜色都去掉
      if (myEvent.target.nodeName == 'svg') {
        Object.keys(circleListCopy).forEach(key => {
          circleListCopy[key].strokeActiveColor = globalVariable.defaultCircle.circleStrokeColor
        })
        setCircleList(circleListCopy)
        Object.keys(rectListCopy).forEach(key => {
          rectListCopy[key].strokeActiveColor = globalVariable.defaultRect.rectStrokeColor
        })
        setRectList(rectListCopy)
      }

    }
  }

  return (
    <>
      <svg
        version="1.1"
        baseProfile="full"
        width="100%" height="100%"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgDomRef}
        id="mySvg"
      >
        {/* <RectBound ></RectBound> */}
        {
          Object.keys(circleList).map((circleKey, idx) => {
            return <Circle key={idx} initCircleValue={circleList[circleKey]} circleId={circleKey}></Circle>
          })
        }
        {
          Object.keys(rectList).map((rectKey, idx) => {
            return <Rect key={idx} initRectValue={rectList[rectKey]} rectId={rectKey}></Rect>
          })
        }
        {/* <Rect initRectValue={}></Rect> */}
      </svg>
      {/* <TreeChart></TreeChart> */}

    </>
  )
}

export default App
