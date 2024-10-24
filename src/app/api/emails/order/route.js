import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);
    const { fullName, email, phone, service, message, cart, totalAmount } =
      bodyJSON;

    // Extract first name and last name from fullName if available
    const [firstName = "", lastName = ""] = fullName.split(" ");

    // Create HTML list of cart items
    const cartItemsHtml = cart
      .map(
        (item) => `
      <li>
        <strong>${item.attributes.title}</strong><br>
        Quantity: ${item.attributes.quantity}<br>
        Price: €${item.attributes.price}
      </li>
    `
      )
      .join("");

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

    const mailOptionsRecipient = {
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: "noreply@velloxia.com", // Change to your recipient's email
      subject: "Order Form Submission",
      html: `
      <table style="border-collapse: collapse;font-style: sans-serif">
      <tbody>
        <tr>
          <td>
            <p style="text-align: left; font-size: 16px">
              Name: ${fullName}<br>
              Email: ${email}<br>
              Phone: ${phone}<br>
              Message: ${message}
            </p>
            <p style="text-align: left; font-size: 16px;font-weight:600;">Order:</p>
            <ul style="text-align: left; font-size: 16px;">
              ${cartItemsHtml}
            </ul>
          <td>
        </tr>
      </tbody>
      </table>
      `,
    };

    // Set up email data for the client
    const mailOptionsClient = {
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: email, // Client's email
      subject: "Thank You for Your Order - Order Confirmation Inside",
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
                  Thank you for placing your order with Velloxia! We appreciate your trust in us to support your career growth. Below are the details of your order:
                </p>
                <p style="text-align: left; font-size: 16px; font-weight: 600;">
                  Order Summary:
                </p>
                <ul style="text-align: left; font-size: 16px;">
                  ${cartItemsHtml}
                </ul>
                <p style="text-align: left; font-size: 16px">
                  <strong>Total Amount:</strong> €${totalAmount}
                </p>
                <p style="text-align: left; font-size: 16px">
                  We will send you the necessary payment details shortly. If you have any questions or need further assistance, please don’t hesitate to contact us.
                </p>
                <p style="text-align: left; font-size: 16px">
                  Thank you once again for choosing Velloxia. We’re excited to work with you and help you reach your professional goals.
                </p>
                <h2 style="text-align: left; font-size: 16px">
                  Best regards,<br />
                  The Velloxia Team
                </h2>
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

    await transporter.sendMail(mailOptionsRecipient);
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
