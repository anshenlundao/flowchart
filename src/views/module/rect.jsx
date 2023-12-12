/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-16 14:27:06
 * @LastEditTime: 2023-12-12 15:03:57
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

  useEffect(() => {
    // if (props.initCircleValue?.circleCx) {
    //   setCx(props.initCircleValue.circleCx)
    //   setCy(props.initCircleValue.circleCy)

    // }
  }, [])
  return (
    <>
      <g style={{ cursor: 'move' }}>
        <rect x={x} y={y} width={width} height={height} stroke="black" fill="blue" stroke-width="4" />
      </g>


    </>
  )
}