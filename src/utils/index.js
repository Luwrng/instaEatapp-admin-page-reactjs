export const formatPrice = (val) => {
  return val.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
