const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const port = process.env.PORT || 3000;
const session = require("express-session");
const Razorpay = require("razorpay");
const uuid = require("uuid");
app.use(
  session({
    secret: "A21025",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../templates");
const publicPath = path.join(__dirname, "../public");

app.set("views", templatePath);
app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("loginpage");
});

app.get("/signuppage", (req, res) => {
  res.render("signuppage");
});

app.get("/loginpage", (req, res) => {
  res.render("loginpage");
});

app.get("/orders", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await collection.findOne({ email: userEmail });
    res.render("orders", { username: user ? user.username : "Guest" });
  } catch (error) {
    res.render("orders", { username: "Guest" });
  }
});

app.get("/about", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await collection.findOne({ email: userEmail });
    res.render("about", { username: user ? user.username : "Guest" });
  } catch (error) {
    res.render("about", { username: "Guest" });
  }
});

app.get("/arts", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await collection.findOne({ email: userEmail });
    res.render("arts", { username: user ? user.username : "Guest", items });
  } catch (error) {
    res.render("arts", { username: "Guest" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await collection.findOne({ email: userEmail });
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    res.render("cart", {
      username: user ? user.username : "Guest",
      cart,
      totalPrice,
    });
  } catch (error) {
    res.render("cart", { username: "Guest" });
  }
});

const items = [
  { id: 1, name: "Art 1", price: 10 },
  { id: 2, name: "Art 2", price: 15 },
  { id: 3, name: "Art 3", price: 20 },
  { id: 4, name: "Art 4", price: 25 },
  { id: 5, name: "Art 5", price: 30 },
  { id: 6, name: "Art 6", price: 35 },
  { id: 7, name: "Art 7", price: 40 },
  { id: 8, name: "Art 8", price: 45 },
  { id: 9, name: "Art 9", price: 50 },
];

// Cart data
let cart = [];

app.get("/add-to-cart/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const selectedItem = items.find((item) => item.id === itemId);

  if (selectedItem) {
    cart.push(selectedItem);
  }

  res.redirect("/cart");
});

app.get("/homepage", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await collection.findOne({ email: userEmail });
    res.render("homepage", { username: user ? user.username : "Guest" });
  } catch (error) {
    res.render("homepage", { username: "Guest" });
  }
});

app.post("/signuppage", async (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.uname,
    password: req.body.cpwd,
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, at least one uppercase letter, one digit, and one special character
  const isValidEmail = emailPattern.test(req.body.email);
  const isValidPassword = passwordPattern.test(req.body.cpwd);

  try {
    if (!isValidEmail) {
      return res.send("Only a valid email should be entered!");
    }
    if (!isValidPassword) {
      return res.send(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character."
      );
    }
    if (req.body.pwd !== req.body.cpwd) {
      return res.send("Passwords do not match!");
    }
    const checking = await collection.findOne({ email: req.body.email });
    if (checking) {
      return res.send("User details already exist");
    }
    await collection.insertMany([data]);
    // res.send("Sign Up Succesful");
    res.status(201).render("loginpage", {
      naming: req.body.uname,
    });
  } catch (error) {
    console.error(error);
    return res.send("Wrong inputs");
  }
});

app.post("/loginpage", async (req, res) => {
  const user = { email: req.body.email };
  req.session.userEmail = user.email;
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (check.password === req.body.pwd) {
      // res.status(201).render("homepage", { naming: `${req.body.pwd}+${req.body.email}` })
      res.redirect("homepage");
    } else {
      res.send("Incorrect password");
    }
  } catch (e) {
    res.send("Wrong details");
  }
});

app.listen(port, () => {
  console.log("Port Connected");
});

const razorpay = new Razorpay({
  key_id: "rzp_test_NBs65lZo2mEZzU",
  key_secret: "l8BnIzuzcTZvRwb3fINESRmh",
});

// Handle the checkout route
app.get("/checkout", async (req, res) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  res.render("checkout", { cart, totalPrice });
});

const uniqueId = uuid.v4().replace(/-/g, "");

// Handle Razorpay payment initiation
app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  // Your notes should be provided as an object
  const notes = {
    shipping_address: "shipping_address", // Replace with your actual shipping address
    address: "address", // Replace with your actual address
    merchant_order_id: "{{uniqueId}}", // Replace with a unique order ID
  };

  const options = {
    amount, // amount in the smallest currency unit
    currency,
    receipt,
    notes,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.render("payment", { order, key_id: razorpay.key_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
