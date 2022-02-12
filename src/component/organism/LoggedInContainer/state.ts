import { atom, selector, useRecoilRefresher_UNSTABLE } from "recoil";
import { UserConfig, Timer, UserId } from "domain/value";
import { userIdState } from "component/page/Main/state";
import { fetchUserConfig, updateUserConfig } from "infrastructure/backend_api";

const rawUserConfigState = selector<UserConfig | null>({
  key: "rawUserConfig",
  get: async ({ get }) => {
    const userId = get(userIdState);
    const userConfig = await fetchUserConfig(userId);
    return userConfig;
  }
});

export const isConfiguredState = selector<boolean>({
  key: "isConfigured",
  get: ({ get }) => get(rawUserConfigState) !== null,
})

export const userConfigState = selector<UserConfig>({
  key: "userConfig",
  get: ({ get }) => {
    const userConfig = get(rawUserConfigState);
    if (userConfig) {
      return userConfig;
    } else {
      throw Error("User is not yet configured");
    }
  }
})

export const useUpdateUserConfig = (id: UserId) => {
  const refresh = useRecoilRefresher_UNSTABLE();
  const userConfigRefresh = () => refresh(userConfigState);
  return (config: UserConfig) => {
    return updateUserConfig(id, config).then(() => userConfigRefresh()).catch(() => { throw Error("Could not load UserConfig") });
  }

}

export const timerState = atom<Timer | null>({
  key: "timer",
  default: null,
});

export const startTimeState = atom<Date>({
  key: "startTime",
  default: new Date(),
});

export const timerConfigState = atom<number | null>({
  key: "timerConfig",
  default: null,
});

