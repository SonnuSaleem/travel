# Email Troubleshooting

## Common Issues

### 1. Gmail App Password Spacing Issue
The most common issue is that Gmail App Passwords may be copied with spaces, but they should be used without spaces.

**Example:**
- With spaces: `xnac ghuh sdif lpso` (incorrect)
- Without spaces: `xnacghuhsdiflpso` (correct)

### 2. Missing Environment Variables
Make sure all of the following environment variables are set in your Vercel project:

- `EMAIL_USER` - Your full Gmail address (e.g., `youremail@gmail.com`)
- `EMAIL_PASS` - Your Gmail App Password (without spaces)
- `ADMIN_EMAIL` - The email address to receive admin notifications

### 3. Incorrect Gmail App Password
If you're using Gmail, make sure you've created an App Password:

1. Go to your Google Account > Security
2. Enable 2-Step Verification if not already enabled
3. Under "App passwords", create a new app password
4. Copy the password WITHOUT SPACES

## Testing Email Functionality

1. Visit `/test-email` on your deployed site
2. This page will run diagnostics on your email configuration
3. You can also enter an email address to send a test email

## Updating Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Update your email-related environment variables, making sure to remove spaces from EMAIL_PASS
4. Redeploy your application after making changes

## Troubleshooting Steps

1. Check server logs in the Vercel dashboard
2. Visit the `/test-email` page to diagnose issues
3. Make sure your Gmail account has "Less secure app access" turned ON or you're using App Passwords
4. Try using a different Gmail account if problems persist 