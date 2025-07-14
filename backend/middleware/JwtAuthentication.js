import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.AuthToken;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated: Token Missing or Expired!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    res.json("Authenticated !")
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or Expired Token!" });
  }
};
