import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    // Parse the request body to get form data
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);

    const {
      fullName,
      email,
      phone,
      position,
      resume,
      portfolio,
      message,
    } = bodyJSON;


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

    // Prepare the attachments array
    const attachments = [];

    // Add resume to attachments if it exists
    if (resume) {
      attachments.push({
        filename: resume.filename, // Use the actual filename from the client
        content: resume.base64, // Base64 encoded data
        encoding: "base64",
      });
    }

    // Add cover letter to attachments if it exists
    if (portfolio) {
      attachments.push({
        filename: portfolio.filename, // Use the actual filename from the client
        content: portfolio.base64, // Base64 encoded data
        encoding: "base64",
      });
    }

    // Set up email data for the recipient
    const mailOptionsRecipient = {
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: "noreply@velloxia.com", // Change to your recipient's email
      subject: "New Job Form Submission",
      text: `

        Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Desired Job Role: ${position}
        Additional Information: ${message}

        Please find the attached resume and cover letter.
      `,
      attachments: attachments,
    };

    // Send email to the recipient
    await transporter.sendMail(mailOptionsRecipient);

    // Uncomment and modify as necessary to send a confirmation email to the user

    const mailOptionsClient = {
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: email, // Client's email
      subject:
        "We’ve Received Your Message – Thank You for Reaching Out to Velloxia!",
      html: `
        <table width="640" style="border-collapse: collapse; margin: 0 auto; font-family: Arial, sans-serif">
          <thead>
            <tr>
              <td>
                <img style="width: 100%" src="https://velloxia.com/images/email_header.png" alt="Velloxia Header" />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 40px">
                <h2 style="text-align: left; font-size: 20px;color:#202020;">Dear ${fullName},</h2>
                <p style="text-align: left; font-size: 16px;color:#202020;">
                 Thank you for contacting Velloxia. We’ve received your inquiry and will be in touch shortly to provide the assistance you need.
                </p>
                <p style="text-align: left; font-size: 16px;color:#202020;">
                We appreciate your interest in our services and look forward to supporting you on your career journey.
                </p>
                <h2 style="text-align: left; font-size: 20px;color:#202020;"> Best regards,<br /> The Velloxia Team</h2>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td style="padding: 24px; background-color: #A225EE; color: #fff; font-size: 20px; text-align: center; font-weight: 600;">
              Thanks for using
              <a href="https://velloxia.com/" style="text-decoration: underline; color: #fff; font-size: 20px; font-weight: 600;">velloxia.com</a>
            </td>
          </tfoot>
        </table>
      `,
    };

    // Send confirmation email to the client
    await transporter.sendMail(mailOptionsClient);

    return NextResponse.json({ message: "Success: emails were sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.status(500).json({
      message: "COULD NOT SEND MESSAGE",
      error: error.message,
    });
  }
}
