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
            subject: 'Thank you for your submission',
            html: `
        <p>Dear ${yourName},</p>
        <p>Thank you for your submission. We have received your application and will get back to you soon.</p>
        <p>Here are the details of your submission:</p>
        <ul>
          <li><strong>Name:</strong> ${yourName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Explanation:</strong> ${explanation}</li>
          <li><strong>Link 1:</strong> ${link1}</li>
          <li><strong>Link 2:</strong> ${link2}</li>
        </ul>
        <p>Best regards,<br>Velloxia Team</p>
      `,
        };

        await transporter.sendMail(mailOptionsClient);

        return NextResponse.json({ message: 'Data received and emails sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}