const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://mohmmadms:1q2w3e4r5t@my-app-cluster.y6h2qmb.mongodb.net/";

const connectToMongo = () => {
  mongoose.connect(DB_URI, { // Removed useNewUrlParser and useUnifiedTopology options
    // useNewUrlParser: true, // Deprecated, removed
    // useUnifiedTopology: true, // Deprecated, removed
    // Instead of useNewUrlParser and useUnifiedTopology, add new options
    // Replace them with new options, as required
    // For example:
    // retryWrites: true, // Enable retryable writes
    // w: "majority", // Write concern, ensure write propagates to majority of nodes
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