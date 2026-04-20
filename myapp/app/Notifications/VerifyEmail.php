<?php
namespace App\Notifications;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailNotification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends VerifyEmailNotification
{
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        return (new MailMessage)
            ->subject('Verify Your Email Address - CareerTrack')
            ->view('emails.verify-email', ['verificationUrl' => $verificationUrl]);
    }
}