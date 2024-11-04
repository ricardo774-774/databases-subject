import express from "express";

import employeesRoutes from "./routes/employees.routes.js";
import databasesRoutes from "./routes/databases.routes.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors()); // Permitir CORS para todas las rutas

app.use(indexRoutes);
app.use('/api' ,employeesRoutes);
app.use('/api' ,databasesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found =('
    })
})

export default app;