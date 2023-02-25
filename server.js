const express = require("express");
const app = express();
require("dotenv").config();
const { ExceptionHandler } = require("./src/middlewares/exception.middleware");
const { auth } = require("./src/middlewares/auth.middleware");
const { acl } = require("./src/middlewares/acl.middleware");
const { connectDatabase } = require("./src/config/db.config");
const {
  RoleRoutes,
  UserRoutes,
  AuthRoutes,
  InvestmentTypesRoutes,
} = require("./src/routes/index.routes");

//global middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routing
app.get("/ping", (req, res, next) => {
  res.status(200).send({ message: "Server is Up & Running" });
});

app.use("/role", [auth, acl], RoleRoutes);
app.use("/user", [auth, acl], UserRoutes);
app.use("/investment-types", [auth, acl], InvestmentTypesRoutes);
app.use("/auth", AuthRoutes);

//404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//global error/exception handler
app.use(ExceptionHandler);

connectDatabase()
  .then((connect) => {
    console.log("✔ Database is connected");
    app.listen(process.env.PORT, () =>
      console.log(`✔ APP is running on ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
  });
