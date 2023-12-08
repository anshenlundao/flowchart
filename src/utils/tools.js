/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-11-03 11:05:32
 * @LastEditTime: 2023-12-08 11:16:17
 */
export function generateHexColor() {
  // 生成一个随机的RGB颜色值
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // 将RGB颜色值转换为十六进制
  var hexColor = "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

  return hexColor;
}
// 鼠标点击元素跟随鼠标移动
/**
 * 
 * @param {*} selector 
 * 
 * @param {*} param1 
 */
export function followMouseMove(selector,{downCb,moveCb,upCb}){
  var myDom;
  if(typeof selector=="string"){
     myDom = document.querySelector(selector)
  }else{
     myDom =selector
  }
  myDom.addEventListener('mousedown', (e) => {
    downCb&&downCb(e)
    document.addEventListener('mousemove', moveCb)
    
  })
  document.addEventListener('mouseup', (e) => {
    upCb&&upCb(e)
    document.removeEventListener('mousemove',moveCb)
  })
}