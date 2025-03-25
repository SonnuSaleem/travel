# Fixing Email Issues on Vercel

Based on the diagnosis, your email isn't working on Vercel because of one of these issues:

1. **Gmail App Password Issue**: The app password needs to be regenerated and updated
2. **Gmail Authentication**: Your Gmail security settings may be blocking the connection
3. **Vercel Environment Variables**: The environment variables might not be properly set

## Immediate Fix Steps

### 1. Create a New Gmail App Password

1. Go to your [Google Account Security](https://myaccount.google.com/security) page
2. Ensure 2-Step Verification is enabled
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password specifically for this application:
   - Select app: "Mail"
   - Select device: "Other (Custom name)" 
   - Name it "Vercel Travel Website"
5. Copy the generated password **WITHOUT ANY SPACES**

### 2. Update Vercel Environment Variables

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Find and edit the `EMAIL_PASS` variable
5. Paste the new app password (without spaces)
6. Verify `EMAIL_USER` is set to the correct Gmail address (the same account you created the app password for)
7. Verify `ADMIN_EMAIL` is set correctly
8. Click "Save"

### 3. Redeploy Your Application

1. Go to the "Deployments" tab
2. Click "Redeploy" on your latest deployment
3. This will apply the new environment variables

### 4. Test the Fix

1. After redeployment, visit your website and try the newsletter subscription feature
2. You can also use the new diagnostic tools we've added:
   - Visit `/email-debug` on your website to test email configuration
   - Visit `/api/gmail-fix` to specifically test Gmail authentication
   - Visit `/email-setup-guide` for detailed setup instructions

## Code Improvements We've Made

1. **Enhanced Gmail Configuration**: Modified email transporter to use Gmail's recommended settings
2. **Diagnostic Tools**: Added debug pages and API endpoints to diagnose email issues
3. **Setup Guide**: Created a detailed guide for setting up Gmail with Vercel

## If Issues Persist

If you continue to have problems after following these steps:

1. Check the Gmail account for any security alerts or blocks
2. Try using a different Gmail account
3. Consider using a dedicated email service like SendGrid, Mailgun, or AWS SES instead of Gmail, which are better suited for production applications

## Important Note About Gmail Limits

Gmail has limits on how many emails you can send per day (typically 500 for regular accounts).
For production applications with high email volume, consider using a dedicated email service instead of Gmail. 