import { create } from 'zustand';

const usePopupStore = create((set) => ({
  orderPopupDisplay: false,
  requestPopupDisplay: false,
  jobPopupDisplay: false,
  thanksPopupDisplay: false,
  serviceValue: false,
  jobValue: false,

  setOrderPopupDisplay: (value) => set({ orderPopupDisplay: value }),
  setRequestPopupDisplay: (value) => set({ requestPopupDisplay: value }),
  setJobPopupDisplay: (value) => set({ jobPopupDisplay: value }),
  setThanksPopupDisplay: (value) => set({ thanksPopupDisplay: value }),
  setServiceValue: (value) => set({ serviceValue: value }),
  setJobValue: (value) => set({ jobValue: value }),
}));

export default usePopupStore;
