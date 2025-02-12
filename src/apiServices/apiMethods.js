import ApiService from "./apiServices";

const fetchData = async (endpoint) => {
  try {
    const response = await ApiService.get(endpoint);

    return response;
  } catch (error) {
    return error;
  }
};

const fetchDataAuth = async (endpoint) => {
  try {
    const response = await ApiService.get(endpoint, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createData = async (endpoint, data) => {
  try {
    const response = await ApiService.post(endpoint, data, {
      withCredentials: true,
    });

    return response;
  } catch (error) {

    return error;
  }
};

const updateData = async (endpoint, data) => {
  try {
    const response = await ApiService.put(endpoint, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {

    return error;
  }
};

const updatePatchData = async (endpoint, data) => {
  try {
    const response = await ApiService.patch(endpoint, data, {
      withCredentials: true,
    });

    return response;
  } catch (error) {

    // console.log(error, "error");
    return error;
  }
};

const updatePatchDataDelete = async (
  endpoint,
  data
) => {
  try {
    const response = await ApiService.patch(endpoint, data, {
      withCredentials: true,
    });


    return response;
  } catch (error) {

    return error;
  }
};

const deleteData = async (endpoint) => {
  try {
    const response = await ApiService.delete(endpoint,
      {
        withCredentials: true,
      });
    return response;
  } catch (error) {
    return error;
  }
};

const api = {
  fetchData,
  fetchDataAuth,
  createData,
  updateData,
  deleteData,
  updatePatchData,
  updatePatchDataDelete,
};

export default api;
