import { configDotenv } from "dotenv";
import app from "./app"; // Mengimpor aplikasi dari app.ts
import { createServer } from "http"; // Membuat server HTTP

const PORT = 8080;

configDotenv();

// Menjalankan server
createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
