import axiosInstance from "./axiosInstance";

const todoService = () => {
  const createTodo = async (payload) => {
    try {
      const res = await axiosInstance.post("/", payload);
      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }
    } catch (e) {
      console.error("Error in service:", e.message);
      throw new Error(e.message);
    }
  };
  const getAllTodo = async () => {
    try {
      const res = await axiosInstance.get("/");
      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }
    } catch (e) {
      console.error("Error in service:", e.message);
      throw new Error(e.message);
    }
  };

  const updateTodo = async (payload) => {
    try {
      const res = await axiosInstance.patch(`/${payload.id}`, payload.data);
      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }
    } catch (e) {
      console.error("Error in service:", e.message);
      throw new Error(e.message);
    }
  };

  const deleteTodo = async (payload) => {
    try {
      const res = await axiosInstance.delete(`/${payload}`);
      if (res.status == 200) {
        return res.data.message;
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }
    } catch (e) {
      console.error("Error in service:", e.message);
      throw new Error(e.message);
    }
  };

  return {
    createTodo,
    getAllTodo,
    updateTodo,
    deleteTodo,
  };
};

export default todoService;
