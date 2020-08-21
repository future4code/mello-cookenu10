import dotenv from "dotenv";
import express from "express";

import { AddressInfo } from "net";

import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import { getProfileById } from "./endpoints/getProfileById";

import { RecipeDatabase } from "./data/RecipeDatabase";
dotenv.config();

const recipeDatabase = new RecipeDatabase();


import { followUser } from "./endpoints/followUser";
import { unfollowUser } from "./endpoints/unfollowUser";

const app = express();

dotenv.config();

app.use(express.json());

app.post("/signup", signup);
app.post("/login", login);
app.get("/user/profile", getUserProfile);

app.get("/user/:id", getProfileById);

app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
