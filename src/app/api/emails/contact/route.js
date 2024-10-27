import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);
    const {
      yourName,
      email,
      phone,
      urgency,
      agreeToPolicy,
    } = bodyJSON;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Настройка электронной почты для получателя
    const mailOptionsRecipient = {
      from: '"Velloxia" <noreply@velloxia.com>',
      to: "noreply@velloxia.com",
      subject: "Consultation Request",
      text: `Name: ${yourName}
Email: ${email}
Phone: ${phone}
Urgency: ${urgency}`,
    };

    // Настройка электронной почты для клиента
    const mailOptionsClient = {
      from: '"Velloxia" <noreply@velloxia.com>',
      to: email,
      subject: "Your Consultation Request Has Been Received",
      html: `
        <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif; border-right: 1px solid #222222; border-left: 1px solid #222222;">
          <thead>
              <tr>
                  <th style="background-image: url('https://velloxia.com/images/letter-top.jpg'); background-size: cover;background-position: center center; background-repeat: no-repeat; height: 117px;"></th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td style="padding: 50px 40px; font-family: Roboto, sans-serif; color:#0A0A0A;">
                      <h2 style="text-align: left; font-size: 20px;">Dear ${yourName},</h2>
                      <p style="font-size: 16px; line-height: 19px;">Thank you for submitting your request for a consultation with Velloxia. We appreciate your interest in discussing how we can help your business grow.</p>
                      <p style="font-size: 16px; line-height: 19px;">Our team is currently reviewing your request and will reach out to you soon to discuss your specific challenges and how we can address them. Your urgency level has been noted as <span style="color: #008967; font-weight: 600;">${urgency}</span>.</p>
                      <p style="font-size: 16px; line-height: 19px;">If you have any immediate questions or additional information to share, please don't hesitate to contact us at <a href="mailto:info@velloxia.com" style="color: #008967; font-weight: 600;text-decoration: underline;">info@velloxia.com</a>.</p>
                      <p style="font-size: 16px; line-height: 19px; font-weight: 600;">
                          Best regards,
                          <br>
                          The Velloxia Team
                      </p>
                  </td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td style="background-color: #222222; font-weight: 600; font-family: Roboto, sans-serif;padding: 24px 0;">
                      <p style="font-size: 20px; line-height: 24px; color: #ffffff; text-align: center;margin: 0;">Thanks for using <a href="https://velloxia.com/" style="color: #008967; text-decoration: none;">Velloxia</a></p>
                  </td>
              </tr>
          </tfoot>
        </table>
      `,
    };

    // Отправка электронной почты получателю и клиенту
    await transporter.sendMail(mailOptionsRecipient);
    await transporter.sendMail(mailOptionsClient);

    return NextResponse.json({ message: "Success: emails were sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE", error: error.message }, { status: 500 });
  }
}
