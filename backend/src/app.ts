// import express from "express";
// import resepRoutes from "./routes/resep.routes";
// import errorHandler from "./middlewares/errorHandler";
// // import bahanRoutes from "./routes/bahan.routes";
// // import userRoutes from "./routes/user.routes";

// const app = express();

// app.use(express.json());

// app.use("/api/resep", resepRoutes);
// // app.use("/api/bahan", bahanRoutes);
// // app.use("/api/user", userRoutes);

// app.use(errorHandler);

import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import express from "express";
import resepRoutes from "./routes/resep.routes"; // Pastikan path ini sesuai dengan struktur folder
import authRoutes from "./routes/auth.route";
import { logger } from "./middlewares/errorHandler";

const app = express();

app.use(logger);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware untuk parsing JSON request body
app.use(express.json()); // Middleware yang dibutuhkan agar Express bisa menerima data JSON dalam body request

// app.use(logger);

// Menggunakan router untuk endpoint /api/resep
app.use("/api/resep", resepRoutes);

app.use("/api/auth", authRoutes);

// Mengatur routing error handler (misalnya, untuk menangani error global)
app.use(errorHandler); // Menambahkan error handler middleware

export default app;
