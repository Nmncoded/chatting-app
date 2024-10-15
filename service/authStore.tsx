import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from './storage';


interface authState {
  user : Record<string, any> | null
  setUser : (user:any) => void;
  logout : () => void;
  deviceTokenAdded: boolean;
  setDeviceTokenStatus: (value: boolean) => void;
}


export const useAuthStore = create<authState>()(
  persist(
    (set,get) => ({
      user: null,
      deviceTokenAdded: false,
      setUser : (data:Record<string,any>) => set({user: data}),
      logout : () => set({user: null, deviceTokenAdded : false}),
      setDeviceTokenStatus : (value: boolean) => set({deviceTokenAdded : value}),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => mmkvStorage), // (optional) by default, 'localStorage' is used
    }
  ),
);