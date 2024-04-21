import { create } from "zustand";
import { devtools } from 'zustand/middleware'


const textChanger = (text, content) => {
  return content

}


const useContent = create(devtools((set) => ({
  text: '',
  textChanger(content) {
    set((state) => ({
      ...state,
      text: textChanger(state.text, content)
    }))
  }
})))

export default useContent