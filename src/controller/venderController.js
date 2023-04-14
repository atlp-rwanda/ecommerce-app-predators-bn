import bcrypt from "bcryptjs";
import crypto from "crypto";
import db from "../database/models/index.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a new Vender
const vender = async (req, res) => {
  const { name, email, gender, preferred_language } = req.body;

  // Validate user input
  if (!name || !email || !gender || !preferred_language) {
    return res.status(400).send("Invalid input, all fields are required");
  }

  try {
    // Create user in the database (using Sequelize ORM)
    const vender = await db.User.findOne({
      where: { email },
    });
    if (vender) {
      return res.status(400).send("User already exist");
    }
    // generate password randomly
    // const Password = crypto.randomBytes(10).toString();

    // Generate a random password of length 16
    const passwordLength = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=';
    let Password = '';

    // Generate random bytes
    const randomBytes = crypto.randomBytes(passwordLength);

    // Iterate through each byte and map it to a character from the characters string
    for (let i = 0; i < randomBytes.length; i++) {
      const index = Math.floor(randomBytes[i] / 256 * characters.length);
      Password += characters[index];
    }

    const user = await db.User.create({
      name,
      email,
      roleId: 1,
      password: await bcrypt.hash(Password, 10),
      status: "active",
      gender,
      preferred_language
    });
    res.status(200).json({ message: "Vendor created successfully" });

    // Send confirmation email, create a nodemailer transporter
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });

    // set up the email message
    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: user.email,
      subject: "Confirmation Email",
      text: `Your Vendor account credentials are:
      Email: ${user.email}, Password is: ${Password.toString()}`,
    };

    // send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      } else {
        return res.status(200).json({ message: "Vendor created successfully" });
      }
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

// export the post controller
export default vender;
