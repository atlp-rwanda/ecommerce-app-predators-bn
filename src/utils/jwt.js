<<<<<<< HEAD
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
=======
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297

dotenv.config();

export default class Jwt {
<<<<<<< HEAD
  static generateToken(data, exp = '1y') {
=======
  static generateToken(data, exp = "1d") {
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
    return JWT.sign(data, process.env.JWT_SECRET, { expiresIn: exp });
  }

  static verifyToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return { error: err };
      }
      return { value: decoded };
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
