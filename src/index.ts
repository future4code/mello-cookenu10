import express from "express";

import { AddressInfo } from "net";

import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";

const app = express();

app.use(express.json());

app.post("/signup", signup);
app.post("/login", login);
app.get("/user/profile", getUserProfile);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
