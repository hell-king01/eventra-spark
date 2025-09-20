# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e78f96bd-3a5f-4cdc-86c3-4395663a0b13

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e78f96bd-3a5f-4cdc-86c3-4395663a0b13) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Edge Functions)
- Email Verification System

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e78f96bd-3a5f-4cdc-86c3-4395663a0b13) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Email Verification System

This project includes a complete email verification system for event registrations:

### Features
- **Two-step registration process**: Users register → receive verification email → click link to confirm
- **Secure token-based verification**: Each registration gets a unique, time-limited token
- **Beautiful email templates**: Professional HTML emails with event details
- **Welcome emails**: Automatic confirmation emails after successful verification
- **24-hour token expiration**: Security feature to prevent stale registrations

### How it works
1. User fills out registration form
2. Data is stored in `pending_registrations` table with verification token
3. Verification email is sent with secure link
4. User clicks verification link
5. System verifies token and moves data to `participants` table
6. Welcome email is sent confirming registration
7. Expired tokens are automatically cleaned up

### Email Service Integration
The system is designed to work with any email service provider. Currently set up for:
- Supabase Edge Functions for email sending
- Easy integration with services like Resend, SendGrid, Mailgun, etc.
- Beautiful responsive HTML email templates
- Fallback console logging for development

### Database Tables
- `pending_registrations`: Temporary storage for unverified registrations
- `participants`: Final storage for confirmed registrations
- Automatic cleanup of expired verification tokens

### Security Features
- Row Level Security (RLS) enabled
- Unique verification tokens
- Time-limited verification links (24 hours)
- Duplicate registration prevention
- Secure token generation using crypto.randomUUID()
