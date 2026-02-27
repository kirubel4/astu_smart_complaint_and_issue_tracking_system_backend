import nodemailer from "nodemailer";

export const emailClient = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function sendEmail(to: string, subject: string, message: string) {
  await emailClient.sendMail({
    from: process.env.EMAIL_USER!,
    to,
    subject,
    html: `<p>${message}</p>`,
  });
}