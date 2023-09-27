import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";

// Controllers

// Middleware
import authMiddleWare from "./middleware/authMiddleWare";

// User
import createUserController from "./controllers/Users/createUserController";
import loginUserController from "./controllers/Users/loginUserController";

//Product
import createProductController from "./controllers/Product/createProductController";
import getAllProductController from "./controllers/Product/getAllProductController";
import getOneProductController from "./controllers/Product/getOneProductController";
import editProductController from "./controllers/Product/editProductController";
import deleteProductController from "./controllers/Product/deleteProductController";

//Product Type
import createP_TypeController from "./controllers/P_Type/createP_TypeController";
import getAllP_TypeController from "./controllers/P_Type/getAllP_TypeController";
import getOneP_TypeController from "./controllers/P_Type/getOneP_TypeController";
import editP_typeController from "./controllers/P_Type/editP_typeController";
import deleteP_TypeController from "./controllers/P_Type/deleteP_TypeController";

const app = express();

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://champ:1234@cluster32.evjrvbz.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Users Routes
app.post("/login", loginUserController);
app.post("/users", createUserController);

// Products Routes
app.get("/product", authMiddleWare, getAllProductController);
app.get("/product/:code", authMiddleWare, getOneProductController);
app.post("/product", authMiddleWare, createProductController);
app.put("/product/:code", authMiddleWare, editProductController);
app.delete("/product/:code", authMiddleWare, deleteProductController);

// Products Type Routes
app.get("/ptype", authMiddleWare, getAllP_TypeController);
app.get("/ptype/:code", authMiddleWare, getOneP_TypeController);
app.post("/ptype", authMiddleWare, createP_TypeController);
app.put("/ptype/:code", authMiddleWare, editP_typeController);
app.delete("/ptype/:code", authMiddleWare, deleteP_TypeController);

app.listen(4000, () => console.log("Server is running...port 4001"));
