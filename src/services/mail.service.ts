import nodemailer from "nodemailer";

const emailService = async (
  email: string,
  subject: string,
  content: {},
  template: <T>(data: T) => string
): Promise<void> => {
  console.log("email->", email);
  console.log("subject->", subject);
  console.log("content->", content);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME || "",
        pass: process.env.EMAIL_PASSWORD || "",
      },
    });

    const htmlContent = template(content);

    console.log("from mail=>", process.env.EMAIL_USERNAME);

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USERNAME || "",
      to: email,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export { emailService };
