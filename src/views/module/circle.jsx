/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-16 14:27:15
 * @LastEditTime: 2023-11-21 11:05:16
 */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalVariable from '@/config/init'
import { useStore } from 'react-redux'
export default function Circle(props) {
  const [stroke, setStroke] = useState(globalVariable.defaultCircle.circleStrokeColor)
  const [fill, setFill] = useState(globalVariable.defaultCircle.circleFillColor)
  const store = useStore()
  // let circleReducerMap = store.getState().initCirclePropsReducer
  const [cx, setCx] = useState(globalVariable.defaultCircle.circleCx)
  const [cy, setCy] = useState(globalVariable.defaultCircle.circleCy)
  const [r, setR] = useState(globalVariable.defaultCircle.circleR)
  useEffect(() => {
    // console.log('圆的一开始加载', props)

    // console.log('圆的一开始加载store', circleReducerMap)
    if (props.initCircleValue?.strokeActiveColor) {
      setStroke(props.initCircleValue.strokeActiveColor)

    }
    if (props.initCircleValue?.circleCx) {
      setCx(props.initCircleValue.circleCx)
      setCy(props.initCircleValue.circleCy)

    }
  }, [props.initCircleValue])
  // useEffect(() => {
  //   store.subscribe(() => {
  //     circleReducerMap = store.getState().initCirclePropsReducer
  //     setCx(circleReducerMap.get("cx"))
  //     setCy(circleReducerMap.get("cy"))
  //   })
  // })

  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} stroke-width="4" data-circleid={props.circleId} />
    </>
  )
}
Circle.propTypes = {
  initCircleValue: PropTypes.object.isRequired
}