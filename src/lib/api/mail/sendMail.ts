import EmailTemplate from "@/lib/api/mail/EmailTemplate";
import { Resend } from "resend";

import ApiError from "../ApiError";

type EmailTemplateProps = {
	to: string;
	username?: string;
	subject: string;
	link: string;
	variant: "INVITATION" | "VERIFICATION";
};

export const sendMail = async ({
	to,
	subject,
	link,
	variant,
	username,
}: EmailTemplateProps) => {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to,
			subject,
			html: EmailTemplate({ username, link, variant }),
		});

		if (error) {
			console.log(error);
			throw new ApiError(error.message || "Failed to send email", 500);
		}
	} catch (error: any) {
		console.log(error, "mail");
		throw new ApiError(error?.message || "Failed to send email", 500);
	}
};
