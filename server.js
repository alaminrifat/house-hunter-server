const express = require("express");
const dotEnv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();

const port = process.env.PORT || 3000;

const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Accept",
        "x-client-key",
        "x-client-token",
        "x-client-secret",
        "Authorization",
    ],
    credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
dotEnv.config();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.send("House Hunter Server is Running...");
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));

// mongoose.set("useCreateIndex", true); // Set the useCreateIndex option

app.listen(port, () => {
    console.log(`app listening to the port: ${port}`);
});
