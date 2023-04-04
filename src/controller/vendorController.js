/* eslint-disable consistent-return */
// imports
import db from "../database/models/index.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const vendor = async (req, res) => {
  const { name, email, password, roleId, status, gender, preferred_language } =
    req.body;

  // Validate user input
  if (
    !name ||
    !email ||
    !roleId ||
    !password ||
    !status ||
    !gender ||
    !preferred_language
  ) {
    return res.status(400).send("Invalid input");
  }

  try {
    // Create user in the database (using Sequelize ORM)
    const user = await db.User.create({
      name,
      email,
      roleId: 1,
      //   password: await bcrypt.hash(password, 10),
      password,
      status,
      gender,
      preferred_language,
    });
    res.status(200).json({ message: "Vendor created successfully" });

    // Send confirmation email

    // create a nodemailer transporter
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user:process.env.NODE_MAILER_USER,
        pass:process.env.NODE_MAILER_PASS,
      },
    });

    // set up the email message
    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: user.email,
      subject: "Confirmation Email",
      text: `You have accepted as Vendor, your credentials are:
      Email: ${user.email}, Password is: ${user.password.toString()}`,
    };

    // send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

// export the post controller
export default vendor;
