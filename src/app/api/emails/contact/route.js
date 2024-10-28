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
      sphere,
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
      subject: "Contacts form",
      text: `Name: ${yourName}
Email: ${email}
Phone: ${phone}
sphere: ${sphere}`,
    };

    // Настройка электронной почты для клиента
    const mailOptionsClient = {
      from: '"Velloxia" <noreply@velloxia.com>',
      to: email,
      subject: "Thank You for Contacting Velloxia",
      html: `
      <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif; border-right: 1px solid #222222; border-left: 1px solid #222222;">
    <thead>
        <tr>
            <th style="background-image: url('https://velloxia.com/images/letter-top.png'); background-size: cover;background-position: center center; background-repeat: no-repeat; height: 117px;"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 50px 40px; font-family: Roboto, sans-serif; color:#0A0A0A;">
                <h2 style="text-align: left; font-size: 20px;">Dear ${yourName},</h2>
                <p style="font-size: 16px; line-height: 19px;">Thank you for reaching out to us! We have received your message and appreciate you taking the time to contact Velloxia.</p>
                <p style="font-size: 16px; line-height: 19px;">Our team is currently reviewing your inquiry, and we will get back to you shortly. Please check your email for our response.</p>
                <p style="font-size: 16px; line-height: 19px;">If you have any immediate questions or additional information to share, feel free to reply to this email.</p>
                <p style="font-size: 16px; line-height: 19px;">Thank you for your patience, and we look forward to assisting you!</p>
                <p style="font-size: 16px; line-height: 19px; font-weight: 600;">
                    Best regards,
                    <br>
                    Velloxia Team
                </p>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td style="background-color: #333333; font-weight: 600; font-family: Roboto, sans-serif;padding: 30px 0;">
                <a href="https://velloxia.com/"><img src="https://velloxia.com/images/letter-bottom.png" alt="Velloxia"></a>
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