export const setRefreshLinks = () => {
  localStorage.setItem("refreshLinksAt", `${Date.now() + 3600000 * 25} `);
};

export const getRefreshLinks = () => {
  return localStorage.getItem("refreshLinksAt");
};

export const shouldRefreshLinks = () => {
  const currentTime = Date.now();
  const refreshLinksAt = getRefreshLinks();
  return parseInt(refreshLinksAt || "-1") < currentTime;
};
