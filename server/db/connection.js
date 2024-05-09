const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://mohmmadms:1q2w3e4r5t@my-app-cluster.y6h2qmb.mongodb.net/";

const connectToMongo = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
  });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected:", DB_URI);
  });

  db.on("error", (err) => {
    console.error("Database connection error:", err);
  });
};

module.exports = connectToMongo;
