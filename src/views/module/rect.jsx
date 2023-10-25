/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-16 14:27:06
 * @LastEditTime: 2023-10-20 13:54:43
 * 功能：创建一个矩形SVG
 */
import { useState, useEffect } from 'react'
import { generateHexColor } from '@/utils/tools.js'
export default function Rect(props) {
  const [color, setColor] = useState("#00ff00")
  const [pathd, setPathd] = useState("M 10 10 H 90 V 90 H 10 Z")
  useEffect(() => {
    setInterval(() => {
      setColor(generateHexColor())

    }, 2000)
  }, [])
  return (
    <>
      {/* <svg
        version="1.1"
        baseProfile="full"
        width="100%" height="100"
        xmlns="http://www.w3.org/2000/svg"
      > */}

      <rect width="100%" height="100%" stroke="black" fill="transparent" stroke-width="4" />

      {/* </svg> */}
    </>
  )
}