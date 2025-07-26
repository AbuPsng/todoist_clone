// app/verify-email-sent/page.tsx

export default function VerifyEmailSentPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
			<h1 className="text-2xl font-bold mb-4">Verify your email</h1>
			<p className="mb-2">
				We’ve sent a verification link to your email. Please click the link to
				activate your account.
			</p>
			<p className="text-sm text-gray-500 mb-4">Didn’t receive the email?</p>
			<button
				// onClick={handleResendVerification}
				className="text-blue-500 underline hover:text-blue-700"
			>
				Resend verification email
			</button>
		</div>
	);
}
