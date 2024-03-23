/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-16 14:27:06
 * @LastEditTime: 2023-12-14 16:09:32
 * 功能：创建一个矩形SVG
 */
import { useState, useEffect } from 'react'
// import { generateHexColor } from '@/utils/tools.js'
import globalVariable from '@/config/init'
export default function Rect(props) {
  const [x, setX] = useState(globalVariable.defaultRect.rectX)
  const [y, setY] = useState(globalVariable.defaultRect.rectY)
  const [width, setWidth] = useState(globalVariable.defaultRect.rectWidth)
  const [height, setHeight] = useState(globalVariable.defaultRect.rectHeight)
  const [stroke, setStroke] = useState(globalVariable.defaultRect.rectStrokeColor)
  const [fill, setFill] = useState(globalVariable.defaultRect.rectFillColor)

  useEffect(() => {
    if (props.initRectValue?.strokeActiveColor) {
      setStroke(props.initRectValue.strokeActiveColor)

    }
    // debugger
    if (props.initRectValue?.rectX) {
      setX(props.initRectValue.rectX)
      setY(props.initRectValue.rectY)

    }
  }, [props.initRectValue])
  return (
    <>
      <g style={{ cursor: 'move' }}>
        <rect x={x} y={y} width={width} height={height} stroke={stroke} fill={fill} stroke-width="4" data-rectid={props.rectId} />
      </g>


    </>
  )
}