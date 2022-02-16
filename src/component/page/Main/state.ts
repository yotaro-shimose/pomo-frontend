import { UserId } from "domain/value";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const rawUserIdState = atom<UserId | null>({
  key: "rawUserId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userIdState = selector<UserId>({
  key: "userId",
  get: ({ get }) => {
    const userId = get(rawUserIdState);
    if (userId) {
      return userId;
    } else {
      throw Error("User has not yet been logged in");
    }
  },
  set: ({ set }, newValue) => set(rawUserIdState, newValue),
})

export const isLoggedInState = selector<boolean>({
  key: "isLoggedIn",
  get: ({ get }) => {
    if (get(rawUserIdState)) {
      return true;
    } else {
      return false;
    }
  },
});
