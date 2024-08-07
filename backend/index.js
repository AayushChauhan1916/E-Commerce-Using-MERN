const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const storage = require("./cloudinaryConfig");
const Product = require("./models/Product");
const cors = require("cors");
const User = require("./models/User.js");
const wrapAsync = require("./utils/wrapAsync.js");
// const Order = require("./models/Order.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userAuthRouter = require("./routes/userAuth.js");
const cartRouter = require("./routes/cart.js");
const userRouter = require("./routes/user.js");
const orderRouter = require("./routes/order.js");
const adminRouter = require("./routes/admin.js");
const adminOrder = require("./routes/AdminOrder.js");
const isLoggedIn = require("./utils/isLoggedIn.js");
const path = require("path");
const MongoStore = require("connect-mongo");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:5173"];

const sessionOptions = {
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  secret: "Krishna",
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Methods should be an array
    credentials: true,
  })
);

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

// multer
const upload = multer({ storage: storage });
app.post("/api/imageupload", upload.single("image"), function (req, res) {
  // console.log(req.body)
  //    console.log(req.file)
  res.status(200).json({
    success: true,
    path: req.file.path,
    filename: req.file.filename,
  });
});

app.post(
  "/api/addproduct",
  wrapAsync(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      stock: req.body.stock,
      description: req.body.description,
      image: {
        filename: req.body.filename,
        imageUrl: req.body.image,
      },
    });
    await product.save();
    // console.log(product)
    res.json({
      success: true,
      product: product,
    });
  })
);

app.use("/api/auth", userAuthRouter);
app.use("/api/cart", isLoggedIn, cartRouter);
app.use("/api/user", isLoggedIn, userRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin", adminOrder);

app.get(
  "/api/fetchproduct",
  wrapAsync(async (req, res) => {
    const product = await Product.find({});
    if (product) {
      res.status(200).json({
        success: true,
        product: product,
      });
      return;
    } else {
      res.status(200).json({
        success: false,
        message: "failed to fetch",
      });
    }
  })
);

app.get(
  "/api/newproduct",
  wrapAsync(async (req, res) => {
    const data = await Product.find({});
    const newProduct = data.slice(data.length - 6);
    if (newProduct) {
      return res.status(200).json({
        success: true,
        newProducts: newProduct,
      });
    }
  })
);

app.get(
  "/api/popular",
  wrapAsync(async (req, res) => {
    const mostSelling = await Product.find({ stock: { $lt: 30 } });
    if (mostSelling) {
      return res.status(200).json({
        success: true,
        mostSelling: mostSelling,
      });
    }
  })
);

app.post(
  "/api/fetch/recommendation",
  wrapAsync(async (req, res) => {
    const { productCategory } = req.body;
    const product = await Product.find({ category: productCategory }).sort({
      stock: 1,
    });
    const startIdx = Math.floor(Math.random() * 5);
    const endIdx = Math.floor(Math.random() * product.length - 1);
    const recommededProduct = product.slice(startIdx, endIdx);
    res.json({
      success: true,
      recommededProduct,
    });
  })
);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    message: err.message,
    success: false,
  });
});

// Port: 3000
app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
