import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from './storage';



interface UserStore{
  requests: any[];
  setRequests: (data: any) => void;
  clearUserStore: () => void;
}


export const useUserStore = create<UserStore>()(
  persist(
    (set,get) => ({
      requests: [],
      setRequests : (data) => set({requests: data}),
      clearUserStore : () => set({requests: []}),
    }),
    {
      name: 'users-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => mmkvStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);