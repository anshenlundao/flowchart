/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-22 11:52:20
 * @LastEditTime: 2023-10-24 10:38:32
 */

const circleObj=new Map([
  ['r',80],
  ['cx',150],
  ['cy',150]
])
export function initCirclePropsReducer(preStation=circleObj,action){
  if(action.type=='update'){
    debugger;
    circleObj.set(action.data.key,action.data.value)
  }
  return circleObj
}