import apiClient from "./axios";

export const fetchRestaurantService = async (callback) => {
  try {
    const { data } = await apiClient.get("/Restaurant", {
      params: {
        pageSize: 9999,
      },
    });
    callback(data?.items);
  } catch (error) {
    callback([]);
  }
};

export const fetchUserService = async (callback) => {
  try {
    const { data } = await apiClient.get("/Account", {
      params: {
        pageSize: 9999,
      },
    });
    callback(data?.items);
  } catch (error) {
    callback([]);
  }
};

export const fetchPackageService = async (callback) => {
  try {
    const { data } = await apiClient.get("/Package", {
      params: {
        pageSize: 9999,
      },
    });
    callback(data?.items);
  } catch (error) {
    callback([]);
  }
};
