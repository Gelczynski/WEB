import axios from "axios";
import { useAxios, baseUrl } from "./axios";
import { useAuthHeader } from "./useAuthHeader";

export const FavoriteShop = async (shopId) => {
  const api = useAxios();
  const header = useAuthHeader();

  return await api
    .post(`users/favorite-shops/${shopId}`, {}, header)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const GetShops = async () => {
  return await axios
    .get(`${baseUrl}/shops`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const GetShopById = async (shopId) => {
  return await axios
    .get(`${baseUrl}/shops/${shopId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const CreateShop = async (shop) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .post(`${baseUrl}/shops`, shop, authHeader)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const UpdateShopById = async (shopId, shop) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .patch(`${baseUrl}/shops/${shopId}`, shop, authHeader)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const UpdateShopFlavorsById = async (shopId, flavors) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .patch(`${baseUrl}/shops/${shopId}/flavors`, flavors, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const DeleteShopById = async (shopId) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .delete(`${baseUrl}/shops/${shopId}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};
