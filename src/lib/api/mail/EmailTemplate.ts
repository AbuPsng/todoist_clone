const EmailTemplate = ({
	username,

	link,
	variant = "VERIFICATION",
}: {
	username?: string;

	link: string;
	variant: "INVITATION" | "VERIFICATION";
}) => {
	const returnElement =
		variant === "VERIFICATION"
			? `
		<div style="width: 100%; padding: 12px 40px;">
			<h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">
				Hello, ${username}
			</h1>
			<p style="font-size: 14px; color: #333;">
				Click the following link to activate your account:
			</p>
			<a href="${link}" style="color: blue;">${link}</a>
		</div>
	`
			: `
		<div style="width: 100%; padding: 12px 40px;">
			<h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">
				Hello, ${username}
			</h1>
			<p style="font-size: 14px; color: #333;">
				The below link is an invitation to join the project 
			</p>
			<a href="${link}" style="color: blue;">${link}</a>
		</div>
	`;

	return returnElement;
};

export default EmailTemplate;
