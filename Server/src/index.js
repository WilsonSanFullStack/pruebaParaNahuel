import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/routerComuna.js";
import { port } from "./config.js";
import loadDB  from './loadDB.js'
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));
app.use(router);

// handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});


app.listen(port);
await loadDB()
console.log(`Server on port ${port}`);

