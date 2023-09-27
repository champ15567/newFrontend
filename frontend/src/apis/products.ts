export const apiProducts = {
  createProduct: {
    method: "post",
    url: "http://localhost:4000/product",
  },
  getAllProduct: {
    method: "get",
    url: "http://localhost:4000/product",
  },
  getOneProduct: {
    method: "get",
    url: "http://localhost:4000/product/",
  },
  editProduct: {
    method: "put",
    url: "http://localhost:4000/product/",
  },
  deleteProduct: {
    method: "delete",
    url: "http://localhost:4000/product/",
  },
};
