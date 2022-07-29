import {useRootSelector} from "@/store/store";

export const useLang = () => {
  return useRootSelector((state) => state.applicationState.lang);
}
