/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-20 14:26:44
 * @LastEditTime: 2023-10-20 15:42:07
 */
import { useEffect } from "react"
import "@/assets/style/follow.css"
export default function FollowMouse() {
  useEffect(() => {
    // 获取要拖动的元素
    var element = document.getElementById('myDiv');

    // 定义变量来保存鼠标位置和元素偏移量
    var mouseX = 0;
    var mouseY = 0;
    var offsetX = 0;
    var offsetY = 0;

    // 监听鼠标按下事件
    element.addEventListener('mousedown', function (event) {
      // 计算鼠标位置和元素偏移量
      mouseX = event.clientX;
      mouseY = event.clientY;
      offsetX = mouseX - element.offsetLeft;
      offsetY = mouseY - element.offsetTop;

      // 监听鼠标移动事件
      document.addEventListener('mousemove', moveElement);
    });

    // 监听鼠标松开事件
    document.addEventListener('mouseup', function () {
      // 停止监听鼠标移动事件
      document.removeEventListener('mousemove', moveElement);
    });

    // 移动元素的函数
    function moveElement(event) {
      // 计算鼠标的新位置
      var newMouseX = event.clientX;
      var newMouseY = event.clientY;

      // 计算元素的新位置
      var newElementX = newMouseX - offsetX;
      var newElementY = newMouseY - offsetY;

      // 更新元素的位置
      element.style.left = newElementX + 'px';
      element.style.top = newElementY + 'px';
    }
  })
  return (
    <>
      <div className="my-btn" id="myDiv" >移动按钮</div>
    </>
  )
}