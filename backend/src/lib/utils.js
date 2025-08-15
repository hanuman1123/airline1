import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: "none", // lowercase
    secure: process.env.NODE_ENV === "production", // only true on HTTPS
  });

  return token;
};
