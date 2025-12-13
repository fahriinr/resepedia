import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import express from "express";
import resepRoutes from "./routes/resep.routes";
import authRoutes from "./routes/auth.route";
import bahanRoutes from "./routes/bahan.routes";
import kategoriResepRoutes from "./routes/kategori_resep.routes";
import userRoutes from "./routes/user.routes";
import { logger } from "./middlewares/errorHandler";

const app = express();

app.use(logger);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware untuk parsing JSON request body
app.use(express.json());

app.use(logger);

app.use("/api/auth", authRoutes);
// Menggunakan router untuk endpoint /api/resep
app.use("/api/resep", resepRoutes);
app.use("/api/bahan", bahanRoutes);
app.use("/api/kategori", kategoriResepRoutes);
app.use("/api/user", userRoutes);

// Mengatur routing error handler (misalnya, untuk menangani error global)
app.use(errorHandler); // Menambahkan error handler middleware

export default app;
