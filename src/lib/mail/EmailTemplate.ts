const EmailTemplate = ({
	username,
	verificationToken,
}: {
	username: string;
	verificationToken: string;
}) => {
	const link = `${process.env.BASE_URL}/user/verify/${verificationToken}`;

	return `
		<div style="width: 100%; padding: 12px 40px;">
			<h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">
				Hello, ${username}
			</h1>
			<p style="font-size: 14px; color: #333;">
				Click the following link to activate your account:
			</p>
			<a href="${link}" style="color: blue;">${link}</a>
		</div>
	`;
};

export default EmailTemplate;
