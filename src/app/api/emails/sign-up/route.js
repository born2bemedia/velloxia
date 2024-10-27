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
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: email, // Client's email
      subject:
        "Welcome to Velloxia – Your Account Has Been Successfully Created!",
      html: `
        <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif">
          <thead>
            <tr>
              <td>
                <img style="width: 100%" src="https://velloxia.com/images/email_header.png" alt="Velloxia Header" />
              </td>
            </tr>
          </thead>
          <tbody style="background: #F5F7F9;">
            <tr>
              <td style="padding: 40px">
                <h2 style="text-align: left; font-size: 20px">Dear ${firstName} ${lastName},</h2>
                <p style="text-align: left; font-size: 16px">
                  We are excited to welcome you to the Velloxia community! Your account has been successfully created, and you are now part of a platform dedicated to providing top-notch business and marketing consulting services.
                </p>
                <p style="text-align: left; font-size: 16px; font-weight: 600;">
                  Your Account Details:
                </p>
                <ul style="text-align: left; font-size: 16px;">
                  <li>Email: <b>${email}</b></li>
                  <li>Password: <b>${password}</b></li>
                </ul>
                <p style="text-align: left; font-size: 16px">
                  To get started, we recommend you log in to your account. If you have any questions or need assistance, our support team is here to help.
                </p>
                <p style="text-align: left; font-size: 16px">Thank you for choosing Velloxia. We look forward to supporting you on your business journey!</p>
                <h2 style="text-align: left; font-size: 16px">
                  Best regards,<br />
                  Velloxia Team
                </h2>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td style="padding: 24px; background-color: #333333; color: #fff; font-size: 20px; text-align: center; font-weight: 600;">
              Thanks for using
              <a href="https://velloxia.com/" style="text-decoration: underline; color: #fff; font-size: 20px; font-weight: 600;">velloxia.com</a>
            </td>
          </tfoot>f
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
