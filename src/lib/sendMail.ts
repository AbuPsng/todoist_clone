import nodemailer from "nodemailer";

import { apiError } from "./apiError";

export const sendMail = async ({
	to,
	subject,
	token,
	html,
}: {
	to: string;
	subject: string;
	token: string | number;
	html?: string;
}) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
			to,
			subject,
			text: `${process.env.BASE_URL}/verify_token=${token}`,
			html,
		});
		console.log(to, subject, token, html, "sendMail");
		console.log(info, "info");
	} catch (error: any) {
		console.log(error);
		throw apiError(error?.message || "Failed to send email", 500);
	}
};
