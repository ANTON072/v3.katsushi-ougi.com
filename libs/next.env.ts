export const canUseServerSideFeatures = (): boolean => {
  return process.env.NODE_ENV !== "production";
};
