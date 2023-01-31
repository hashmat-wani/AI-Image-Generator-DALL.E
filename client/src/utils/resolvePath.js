import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";

export const resolvePath = (src) => {
  if (src.startsWith("uploads")) {
    return `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/${src}`;
  }
  return src;
};
