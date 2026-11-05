const express = require("express");
const cors = require("cors");
const contactRoute = require("./routes/contact");
const customPackageRoute = require("./routes/customPackage");
const { router: plansRoute } = require("./routes/plans");
const checkoutRoute = require("./routes/checkout");
const packagesRoute = require("./routes/packages");
const leadsRoute = require("./routes/leads");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

app.use("/api/contact", contactRoute);
app.use("/api/custom-package", customPackageRoute);
app.use("/api/plans", plansRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/packages", packagesRoute);
app.use("/api/leads", leadsRoute);

module.exports = app;