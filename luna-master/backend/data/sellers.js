import bcrypt from "bcrypt";

const shops = [
  {
    name: "Niwa seller",
    email: "niwa@example.com",
    shop: "niwa",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default shops;
