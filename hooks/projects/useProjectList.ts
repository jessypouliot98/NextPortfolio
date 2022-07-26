import { useRootSelector } from "../../store/store";

export const useProjectList = () => {
  const projectState =  useRootSelector((state) => state.projectState);

  return projectState;
}
