import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", getUser);

export default userRouter;