import EmailTemplate from "@/lib/mail/EmailTemplate";
import { Resend } from "resend";

import { apiError } from "../apiError";

type EmailTemplateProps = {
	to: string;
	username: string;
	subject: string;
	verificationToken: string;
};

export const sendMail = async ({
	to,
	subject,
	verificationToken,
	username,
}: EmailTemplateProps) => {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to,
			subject,
			html: EmailTemplate({ username, verificationToken }),
		});

		if (error) {
			throw apiError(error.message || "Failed to send email", 500);
		}
		console.log(data);
	} catch (error: any) {
		console.log(error, "mail");
		throw apiError(error?.message || "Failed to send email", 500);
	}
};
