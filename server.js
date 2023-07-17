
const express = require("express");
const dotEnv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
require('dotenv').config();
app.use(cors());
dotEnv.config();
const port = process.env.PORT || 3000;

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
