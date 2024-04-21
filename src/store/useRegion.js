import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { regionObjects } from "@/utils/regions";
const regionsArr = regionObjects.map(e => e.name)
const regionsSet = new Set(regionsArr)
const addRegions = (data, regionContent) => {
  data.add(regionContent)
  return data

}

const removeRegions = (data, regionName) => {
  data.delete(regionName)
  return data

}

const useRegion = create(devtools((set) => ({
  regions: regionsSet,
  addRegions(regionContent) {
    set((state) => ({
      ...state,
      regions: addRegions(state.regions, regionContent)
    }))
  },
  removeRegions(regionName) {
    set((state) => ({
      ...state,
      regions: removeRegions(state.regions, regionName)
    }))
  }
})))

export default useRegion