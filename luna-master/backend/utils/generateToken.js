import jwt from "jsonwebtoken";

const generateToken = (id, type = "seller") => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
