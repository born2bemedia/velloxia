import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);
    const { email, password, firstName, lastName, username, phone } = bodyJSON;

    // Configure nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // Your Gmail password or app password
      },
      tls: {
        rejectUnauthorized: false, // This bypasses the certificate validation
      },
    });

    // Set up email data for the client
    const mailOptionsClient = {
      from: '"Quorixia" <noreply@quorixia.com>', // Sender address
      to: email, // Client's email
      subject: "Your account has been created",
      html: `
        <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif">
          <thead>
            <tr>
              <td>
                <img style="width: 100%" src="https://quorixia.com/images/email_header.png" alt="Quorixia Header" />
              </td>
            </tr>
          </thead>
          <tbody style="background: #F5F7F9;">
            <tr>
              <td style="padding: 40px">
                <h2 style="text-align: left; font-size: 20px">Dear ${firstName} ${lastName},</h2>
                <p style="text-align: left; font-size: 16px">
                  Thanks for creating an account on Quorixia
                </p>
                <p style="text-align: left; font-size: 16px; font-weight: 600;">
                  Order Summary:
                </p>
                <ul style="text-align: left; font-size: 16px;">
                  <li>Login: <b>${email}</b></li>
                  <li>Password: <b>${password}</b></li>
                </ul>
                <p style="text-align: left; font-size: 16px">
                  You can access your account area to view orders, change your password, and more at 
                  <a href="https://quorixia.com/" style="text-align: left; font-size: 16px;color:#A225EE;">quorixia.com</a>
                </p>
                <h2 style="text-align: left; font-size: 16px">
                  Best regards,<br />
                  The Quorixia Team
                </h2>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td style="padding: 24px; background-color: #A225EE; color: #fff; font-size: 20px; text-align: center; font-weight: 600;">
              Thanks for using
              <a href="https://quorixia.com/" style="text-decoration: underline; color: #fff; font-size: 20px; font-weight: 600;">quorixia.com</a>
            </td>
          </tfoot>
        </table>
      `,
    };
    // Send email to the client
    await transporter.sendMail(mailOptionsClient);

    return NextResponse.json({ message: "Success: emails were sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.status(500).json({
      message: "Could not send message",
      error: error.message,
    });
  }
}
