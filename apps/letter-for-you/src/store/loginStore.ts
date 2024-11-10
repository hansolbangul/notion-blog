import { create } from "zustand";

interface LoginStore {
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  setLogin: (isLogin) => set({ isLogin }),
}));
