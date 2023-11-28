/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-11-24 11:15:44
 * @LastEditTime: 2023-11-24 13:46:42
 */
import { useState, useEffect, useRef } from 'react'
export const useGetState = (initVal) => {
  const [state, setState] = useState(initVal);
  const ref = useRef(initVal);
  const setStateCopy = (newVal) => {
    ref.current = newVal;
    setState(newVal);
  }
  const getState = () => ref.current;
  return [state, setStateCopy, getState];
}

