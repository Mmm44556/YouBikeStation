import { create } from "zustand";
import { devtools } from 'zustand/middleware'


const setCity = (city, content) => {
  return content

}


const useCurrCity = create(devtools((set) => ({
  city: '選擇縣市',
  setCity(content) {
    set((state) => ({
      ...state,
      city: setCity(state.city, content)
    }))
  }
})))

export default useCurrCity