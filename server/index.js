import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import musicRoutes from "./routes/adminForm.js";
import usersReviews from "./routes/usersForm.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/my-beats", musicRoutes);
app.use("/reviews", usersReviews);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "temporary",
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running successfully on port: http://localhost:${PORT}`
      )
    )
  )
  .catch((error) => console.log(error.message));
