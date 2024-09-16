import nodemailer from "nodemailer"; 
import dotenv from 'dotenv'

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

console.log("smtp", process.env.SMTP_USER, process.env.SMTP_PASSWORD)

export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      html: body
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


