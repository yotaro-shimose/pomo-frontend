import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Timer } from "domain/value";

const { persistAtom } = recoilPersist();

export const userIdState = atom<string>({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = selector<boolean>({
  key: "isLoggedIn",
  get: ({ get }) => {
    if (get(userIdState)) {
      return true;
    } else {
      return false;
    }
  },
});
