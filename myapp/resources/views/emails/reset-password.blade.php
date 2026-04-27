<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fb; margin:0; padding:32px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden;">
                    <tr>
                        <td style="background-color:#0f766e; padding:24px 32px; color:#ffffff;">
                            <h1 style="margin:0; font-size:28px; font-weight:700;">
                                {{ $appName }}
                            </h1>
                            <p style="margin:8px 0 0; font-size:14px; opacity:0.95;">
                                Password Reset Request
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">
                                Hi {{ $user->name ?? 'there' }},
                            </p>

                            <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">
                                We received a request to reset the password for your account.
                            </p>

                            <p style="margin:0 0 24px; font-size:16px; line-height:1.6;">
                                Click the button below to choose a new password.
                            </p>

                            <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                                <tr>
                                    <td align="center" style="border-radius:8px; background-color:#0f766e;">
                                        <a href="{{ $url }}"
                                           style="display:inline-block; padding:14px 24px; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#4b5563;">
                                This password reset link will expire in {{ $expires }} minutes.
                            </p>

                            <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#4b5563;">
                                If you did not request a password reset, you can safely ignore this email.
                            </p>

                            <p style="margin:24px 0 8px; font-size:14px; line-height:1.6; color:#6b7280;">
                                If the button does not work, copy and paste this link into your browser:
                            </p>

                            <p style="margin:0; font-size:14px; line-height:1.6; word-break:break-all;">
                                <a href="{{ $url }}" style="color:#0f766e;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px 32px; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
                            <p style="margin:0; font-size:12px; line-height:1.6; color:#6b7280;">
                                © {{ date('Y') }} {{ $appName }}. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>