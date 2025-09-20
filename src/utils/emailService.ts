import { supabase } from "@/integrations/supabase/client";

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export const createVerificationEmailTemplate = (
  name: string,
  eventName: string,
  eventCategory: string,
  verificationToken: string
): EmailTemplate => {
  const verificationUrl = `${window.location.origin}/verify?token=${verificationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Registration - EVENTRA</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .email-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: 900;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #64748b;
          font-size: 16px;
        }
        .content {
          margin: 30px 0;
        }
        .event-details {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #3b82f6;
        }
        .verify-button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 14px;
        }
        .warning {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          padding: 12px;
          margin: 20px 0;
          font-size: 14px;
          color: #92400e;
        }
        @media (max-width: 600px) {
          .container { padding: 10px; }
          .email-card { padding: 20px; }
          .title { font-size: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-card">
          <div class="header">
            <div class="logo">EVENTRA</div>
            <h1 class="title">Verify Your Registration</h1>
            <p class="subtitle">You're almost there! Just one more step to complete your registration.</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>Thank you for registering for our upcoming event! To complete your registration and secure your spot, please verify your email address by clicking the button below.</p>
            
            <div class="event-details">
              <h3 style="margin: 0 0 10px 0; color: #1e293b;">📅 Event Details</h3>
              <p style="margin: 5px 0;"><strong>Event:</strong> ${eventName}</p>
              <p style="margin: 5px 0;"><strong>Category:</strong> ${eventCategory}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${name.split('@')[0] ? name : 'Participant'}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" class="verify-button">
                ✅ Verify Email & Complete Registration
              </a>
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This verification link will expire in 24 hours. Please verify your email as soon as possible to secure your spot.
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f8fafc; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px;">
              ${verificationUrl}
            </p>
            
            <p>If you didn't register for this event, you can safely ignore this email.</p>
          </div>
          
          <div class="footer">
            <p><strong>EVENTRA</strong> - Premium Event Management Platform</p>
            <p>Connecting learners worldwide through technology</p>
            <p style="margin-top: 15px;">
              <a href="#" style="color: #3b82f6; text-decoration: none;">Unsubscribe</a> | 
              <a href="#" style="color: #3b82f6; text-decoration: none;">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    to: name,
    subject: `🎉 Verify Your Registration for ${eventName} - EVENTRA`,
    html
  };
};

export const createWelcomeEmailTemplate = (
  name: string,
  eventName: string,
  eventCategory: string
): EmailTemplate => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${eventName} - EVENTRA</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .email-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: 900;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        .event-details {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #10b981;
        }
        .checklist {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .checklist-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
          padding: 8px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-card">
          <div class="header">
            <div class="success-icon">🎉</div>
            <div class="logo">EVENTRA</div>
            <h1 class="title">Registration Confirmed!</h1>
            <p>Welcome aboard, ${name}!</p>
          </div>
          
          <div class="content">
            <p>Congratulations! Your registration has been successfully confirmed. We're excited to have you join us for this amazing event.</p>
            
            <div class="event-details">
              <h3 style="margin: 0 0 15px 0; color: #1e293b;">📅 Your Event Details</h3>
              <p style="margin: 8px 0;"><strong>Event:</strong> ${eventName}</p>
              <p style="margin: 8px 0;"><strong>Category:</strong> ${eventCategory}</p>
              <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: 600;">✅ Confirmed</span></p>
            </div>
            
            <div class="checklist">
              <h3 style="margin: 0 0 15px 0; color: #1e293b;">📋 What's Next?</h3>
              <div class="checklist-item">
                <span style="margin-right: 10px;">✅</span>
                <span>Registration confirmed - you're all set!</span>
              </div>
              <div class="checklist-item">
                <span style="margin-right: 10px;">📧</span>
                <span>Event details and joining instructions will be sent 24 hours before the event</span>
              </div>
              <div class="checklist-item">
                <span style="margin-right: 10px;">📅</span>
                <span>Add the event to your calendar (link will be provided soon)</span>
              </div>
              <div class="checklist-item">
                <span style="margin-right: 10px;">🎯</span>
                <span>Prepare any materials or prerequisites (if applicable)</span>
              </div>
            </div>
            
            <p>We'll send you a reminder email with all the joining details closer to the event date. In the meantime, feel free to explore more events on our platform!</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${window.location.origin}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">
                🚀 Explore More Events
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>EVENTRA</strong> - Premium Event Management Platform</p>
            <p>Thank you for choosing EVENTRA for your learning journey!</p>
            <p style="margin-top: 15px;">
              <a href="#" style="color: #3b82f6; text-decoration: none;">Contact Support</a> | 
              <a href="#" style="color: #3b82f6; text-decoration: none;">Event Guidelines</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    to: name,
    subject: `🎉 Welcome to ${eventName} - Registration Confirmed!`,
    html
  };
};

export const sendEmail = async (emailTemplate: EmailTemplate): Promise<boolean> => {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: emailTemplate
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return false;
  }
};