export const useGetShop = () => {
  const shop = window.location.host.split(".")[0];

  return shop === "lunacommerce" ? "" : shop;
};
