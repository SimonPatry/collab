import express from "express";
import { hashPass, authVerif } from "../middlewares/authentification.js"
import { Login } from "../controllers/login.js";
import { SignIn } from "../controllers/signin.js";
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

// paths
router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.post("/login", hashPass, Login);
router.post("/sign_in", hashPass, SignIn);
router.patch("users/:id", authVerif, updateUser)
router.delete("users/:id", authVerif, deleteUser)

export default router;