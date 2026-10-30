require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Express 5 passes listen errors (e.g. port already in use) to this callback
// instead of throwing, so report them rather than claiming success.
app.listen(PORT, (error) => {
    if (error) {
        console.error(`Could not start server on port ${PORT}:`, error.message);
        process.exit(1);
    }
    console.log(`Server running on port ${PORT}`);
    connectDB();
});