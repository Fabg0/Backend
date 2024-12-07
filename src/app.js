import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import productRoutes from './routes/products.routes.js';
import clientRoutes from './routes/clients.routes.js';
import orderRoutes from './routes/orders.routes.js'
import providerRoutes from './routes/providers.routes.js'

const app =express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.use("/api", productRoutes);

app.use("/api", clientRoutes); 

app.use("/api", orderRoutes); 

app.use("/api", providerRoutes);




if (process.env.NODE_ENV === "production") {
    const path = await import("path");
    app.use(express.static("client/dist"));
  
    app.get("*", (req, res) => {
      console.log(path.resolve("client", "dist", "index.html") );
      res.sendFile(path.resolve("client", "dist", "index.html"));
    });
}

export default app;