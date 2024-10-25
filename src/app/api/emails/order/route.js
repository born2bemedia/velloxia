import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);
    const { firstName, lastName, email, phone, addressLine1, addressLine2, city, zip, country, cart, totalAmount } =
      bodyJSON;


    // Create HTML list of cart items
    const cartItemsHtml = cart
      .map(
        (item) => `
      <li>
         ${item.name} x ${item.quantity}: €${item.attributes.price}
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
      <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif">
          <thead>
            <tr>
              <td>
                <img style="width: 100%" src="https://velloxia.com/images/email_header.png" alt="Velloxia Header" />
              </td>
            </tr>
          </thead>
          <tbody style="background: #FFFFFF;">
            <tr>
              <td style="padding: 40px">
                <h2 style="text-align: left; font-size: 20px">Dear ${firstName} ${lastName},</h2>
                <p style="text-align: left; font-size: 16px">
                 Thank you for your order! We are pleased to confirm that we have successfully received your request for services. Below are the details of your order:
                </p>
                <p style="text-align: left; font-size: 20px; font-weight: 600;color: #1FA169;">
                  Order Summary:
                </p>
                <p style="text-align: left; font-size: 14px;color:#333;padding: 10px 20px;background-color: #D3D3D3;margin-bottom: 0;">
                  <strong>Service:</strong>
                </p>
                <ul style="text-align: left; font-size: 16px;list-style-type: none;margin: 0;padding: 10px 20px;background-color: #F3F3F3;">
                 ${cartItemsHtml}
                </ul>
                <p style="text-align: left; font-size: 14px;color:#FFFFFF;padding: 10px 20px;background-color: #1FA169;margin-top: 0;">
                  <strong>Subtotal:</strong> €${totalAmount}
                </p>

                <table style="width:100%;">
                  <tbody>
                    <tr>
                      <td>
                         <p style="text-align: left; font-size: 20px; font-weight: 600;color: #1FA169;">
                            Billing Details:
                          </p>
                          <ul style="text-align: left; font-size: 14px;list-style-type: none;padding-left: 18px;">
                           <li>
                              <strong>First Name:</strong> ${firstName}
                            </li>
                            <li>
                              <strong>Last Name:</strong> ${lastName}
                            </li>
                            <li>
                              <strong>Address Line 1:</strong> ${addressLine1}
                            </li>
                            <li>
                              <strong>Address Line 2:</strong> ${addressLine2}
                            </li>
                            <li>
                              <strong>City:</strong> ${city}
                            </li>
                            <li>
                              <strong>Country:</strong> ${country}
                            </li>
                            <li>
                              <strong>ZIP Code:</strong> ${zip}
                            </li>
                          </ul>
                      </td>
                      <td>
                         <p style="text-align: left; font-size: 20px; font-weight: 600;color: #1FA169;">
                            Contact Details:
                          </p>
                          <ul style="text-align: left; font-size: 14px;margin-bottom: 16px;padding-bottom: 16px;border-bottom: 1px solid #E8E8E8;padding-left: 18px;">
                           <li>
                              <strong>Email:</strong> ${email}
                            </li>
                            <li>
                              <strong>Phone:</strong> ${phone}
                            </li>
                          </ul>
                          <ul style="text-align: left; font-size: 14px;margin-bottom: 16px;padding-bottom: 16px;padding-left: 18px;">
                           <li>
                              <strong>Payment Method:</strong> Bank Transfer
                            </li>
                          </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p style="text-align: left; font-size: 16px">
                  Please check your email for payment instructions and our bank details. If you have any special notes or further inquiries, feel free to reach out to us.
                </p>
                <p style="text-align: left; font-size: 16px">
                  Thank you for choosing Velloxia. We look forward to working with you!
                </p>
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
          </tfoot>
        </table>
      `,
    };

    // Set up email data for the client
    const mailOptionsClient = {
      from: '"Velloxia" <noreply@velloxia.com>', // Sender address
      to: email, // Client's email
      subject: "Velloxia: Order Confirmation from",
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
