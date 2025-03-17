# Vercel Deployment Guide for Phool Nagar Travels

This guide will help you successfully deploy your travel agency website on Vercel and resolve the deployment errors you're experiencing.

## Common Deployment Errors

The error you're seeing is related to two main issues:

1. **Missing Suspense Boundary**: The error `useSearchParams() should be wrapped in a suspense boundary at page "/payment"` indicates that the Payment page needs a Suspense boundary for the `useSearchParams()` hook.

2. **Invalid MongoDB URI Format**: The error `Invalid MongoDB URI format. URI should start with mongodb:// or mongodb+srv://` indicates that your MongoDB connection string is not properly formatted in your environment variables.

## Pre-Deployment Checklist

Before deploying to Vercel, make sure:

1. Your code has been updated with the fixes for the Suspense boundary in the Payment page.
2. You have a valid MongoDB Atlas account and connection string.
3. You have set up your Gmail App Password for email functionality.

## Setting Up Environment Variables on Vercel

1. **Log in to Vercel**:
   - Go to [Vercel](https://vercel.com/) and log in to your account.
   - Select your project.

2. **Add Environment Variables**:
   - Click on the "Settings" tab.
   - Click on "Environment Variables".
   - Add the following variables:

   ```
   # Database - IMPORTANT: Replace with your actual MongoDB connection string
   DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/travel_agency
   
   # Email Configuration
   EMAIL_USER=muzammilsaleem709@gmail.com
   EMAIL_PASS=your-app-password-here
   ADMIN_EMAIL=muzammilsaleem708@gmail.com
   
   # Public variables (accessible in the browser)
   NEXT_PUBLIC_EMAIL_USER=muzammilsaleem709@gmail.com
   NEXT_PUBLIC_ADMIN_EMAIL=muzammilsaleem708@gmail.com
   
   # Site URL - Use your actual domain if you have one
   NEXT_PUBLIC_SITE_URL=https://phoolnagar-travels.vercel.app
   ```

   - Replace the placeholder values with your actual values.
   - Click "Save".

## Deployment Steps

1. **Connect Your Repository**:
   - If you haven't already, connect your GitHub repository to Vercel.
   - Go to the Vercel dashboard and click "Add New Project".
   - Select your repository and click "Import".

2. **Configure Project Settings**:
   - Keep the default settings for Next.js.
   - Make sure the "Build Command" is set to `next build`.
   - Click "Deploy".

3. **Redeploy After Setting Environment Variables**:
   - After setting up your environment variables, redeploy your application.
   - Go to the "Deployments" tab and click "Redeploy" on your latest deployment.

## Troubleshooting

If you continue to experience deployment issues:

### MongoDB Connection Issues

1. **Check Connection String Format**:
   - Make sure your MongoDB connection string starts with `mongodb+srv://` or `mongodb://`.
   - Ensure there are no extra spaces or special characters in the connection string.

2. **Network Access**:
   - In MongoDB Atlas, make sure you've allowed access from anywhere (0.0.0.0/0) for Vercel deployments.

3. **Database User Credentials**:
   - Verify that your database username and password are correct.
   - Make sure the user has the appropriate permissions.

### Email Configuration Issues

1. **Gmail App Password**:
   - If you're using Gmail, make sure you're using an App Password, not your regular password.
   - To create an App Password:
     - Go to your Google Account settings.
     - Select "Security".
     - Under "Signing in to Google," select "2-Step Verification".
     - At the bottom of the page, select "App passwords".
     - Follow the steps to generate a new App Password.

2. **Email Environment Variables**:
   - Double-check that `EMAIL_USER`, `EMAIL_PASS`, and `ADMIN_EMAIL` are correctly set in your Vercel environment variables.

### Next.js Suspense Boundary Issues

1. **Verify Code Changes**:
   - Make sure the Payment page has been updated to wrap the component with a Suspense boundary.
   - The code should look like:
   ```jsx
   export default function Payment() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <PaymentContent />
       </Suspense>
     );
   }
   ```

## Verifying Deployment Success

After deploying:

1. **Check Vercel Logs**:
   - Go to your Vercel dashboard.
   - Select your project.
   - Click on the "Deployments" tab.
   - Select your latest deployment.
   - Click on "View Logs" to see if there are any errors.

2. **Test Your Website**:
   - Visit your deployed website.
   - Test the newsletter subscription, contact form, and booking functionality.
   - Check if emails are being sent correctly.

## Need Further Help?

If you continue to experience issues with your deployment, please:

1. Check the Vercel logs for specific error messages.
2. Verify all environment variables are correctly set.
3. Make sure your MongoDB Atlas cluster is running and accessible.
4. Test your email configuration with the email test page.

For more detailed MongoDB setup instructions, refer to the `MONGODB_SETUP_GUIDE.md` file. 