export const createSlug = (name) => {
  return name.toLowerCase().split(" ").join("-");
};
