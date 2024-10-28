import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const getFileTypeFromBase64 = (base64) => {
    const mimeType = base64.split(';')[0].split(':')[1];
    return mimeType.split('/')[1];
};

export async function POST(request) {
    try {
        const { yourName, email, phone, attachFiles, explanation, link1, link2, agreeToPolicy } = await request.json();

        if (!yourName || !email || !phone || !agreeToPolicy) {
            return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'noreply@velloxia.com',
            subject: 'Career Form Submission',
            text: `
        Name: ${yourName}
        Email: ${email}
        Phone: ${phone}
        Explanation: ${explanation}
        Link 1: ${link1}
        Link 2: ${link2}
        Agreed to policy: ${agreeToPolicy ? 'Yes' : 'No'}
      `,
            attachments: attachFiles ? attachFiles.map((fileBase64, index) => {
                const base64Data = fileBase64.split(',')[1];
                const buffer = Buffer.from(base64Data, 'base64');

                const fileType = getFileTypeFromBase64(fileBase64);
                const fileName = `file-${index}.${fileType}`;

                return {
                    filename: fileName,
                    content: buffer,
                };
            }) : [],
        };

        await transporter.sendMail(mailOptions);
        const mailOptionsClient = {
            from: '"Velloxia" <noreply@velloxia.com>',
            to: email, 
            subject: 'Thanks for your resume',
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
                <p style="font-size: 16px; line-height: 19px;">Thank you for submitting your application! We have successfully received your information and will review it shortly.</p>
                <p style="font-size: 16px; line-height: 19px;">Rest assured, we will contact you regarding our decision, regardless of the outcome.</p>
                <p style="font-size: 16px; line-height: 19px;">We appreciate your interest in joining our team!</p>
                <p style="font-size: 16px; line-height: 19px; font-weight: 600;">
                    Best regards,
                    <br>
                    Velloxia
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

        await transporter.sendMail(mailOptionsClient);

        return NextResponse.json({ message: 'Data received and emails sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}