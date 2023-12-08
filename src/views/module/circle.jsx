/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-16 14:27:15
 * @LastEditTime: 2023-11-28 10:23:08
 */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalVariable from '@/config/init'
import { useStore } from 'react-redux'
export default function Circle(props) {
  const [stroke, setStroke] = useState(globalVariable.defaultCircle.circleStrokeColor)
  const [fill, setFill] = useState(globalVariable.defaultCircle.circleFillColor)
  const store = useStore()
  const [cx, setCx] = useState(globalVariable.defaultCircle.circleCx)
  const [cy, setCy] = useState(globalVariable.defaultCircle.circleCy)
  const [r, setR] = useState(globalVariable.defaultCircle.circleR)
  useEffect(() => {
    // console.log('圆的一开始加载', props)

    if (props.initCircleValue?.strokeActiveColor) {
      setStroke(props.initCircleValue.strokeActiveColor)

    }
    if (props.initCircleValue?.circleCx) {
      setCx(props.initCircleValue.circleCx)
      setCy(props.initCircleValue.circleCy)

    }
  }, [props.initCircleValue])


  return (
    <>
      <g style={{ cursor: 'move' }}>
        <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} stroke-width="4" data-circleid={props.circleId} />
      </g>
    </>
  )
}
Circle.propTypes = {
  initCircleValue: PropTypes.object.isRequired
}