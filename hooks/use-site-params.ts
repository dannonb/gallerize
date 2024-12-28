import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface SiteParams {
    lastActiveSite: string | null;
    setLastActiveSite: (site: string | null) => void;
}

export const useSiteParams = create<SiteParams>()(
    persist(
        (set) => ({
          lastActiveSite: null,
          setLastActiveSite: (site: string | null) => set({ lastActiveSite: site }),
        }),
        {
          name: 'last-active-site', // name of the item in the storage (must be unique)
          storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
      )
)