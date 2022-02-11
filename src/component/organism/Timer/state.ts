import { atom } from "recoil";

export const openState = atom<boolean>({
  key: "openDialog",
  default: false,
});