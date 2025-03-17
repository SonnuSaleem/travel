# Vercel Deployment Guide

This guide will help you set up your environment variables on Vercel to ensure your backend API routes work correctly.

## Environment Variables Setup

When deploying to Vercel, you need to add the following environment variables in your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Click on "Environment Variables"
5. Add the following variables:

### Required Environment Variables

```
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/travel_agency

# Email Configuration
EMAIL_USER=muzammilsaleem709@gmail.com
EMAIL_PASS=your-app-password-here
ADMIN_EMAIL=muzammilsaleem708@gmail.com

# Public variables (accessible in the browser)
NEXT_PUBLIC_EMAIL_USER=muzammilsaleem709@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=muzammilsaleem708@gmail.com

# Site URL - IMPORTANT: This should be your actual deployed URL
NEXT_PUBLIC_SITE_URL=https://phoolnagar-travels.vercel.app
```

## Important Notes

1. **Gmail App Password**: Make sure you're using an App Password for your Gmail account, not your regular password. This is required if you have 2-Step Verification enabled.

2. **MongoDB Connection**: Ensure your MongoDB connection string is correct and that your IP address is whitelisted in MongoDB Atlas. You may need to add `0.0.0.0/0` to allow connections from Vercel.

3. **NEXT_PUBLIC_SITE_URL**: This should be set to your actual deployed URL. Vercel automatically sets a `VERCEL_URL` environment variable, but it's better to explicitly set your custom domain if you have one.

## Troubleshooting

If you're still experiencing issues with your backend API routes:

1. **Check Vercel Logs**: Go to your Vercel dashboard, select your project, and check the "Logs" tab to see any errors.

2. **Verify Environment Variables**: Make sure all environment variables are correctly set in Vercel.

3. **MongoDB Connection**: Ensure your MongoDB Atlas cluster is properly configured to accept connections from Vercel.

4. **Email Configuration**: If emails are not being sent, check that your Gmail App Password is correct and that your Gmail account is properly configured.

5. **CORS Issues**: If you're experiencing CORS issues, make sure your API routes are properly handling CORS headers.

## Redeploying

After making changes to your environment variables, you may need to redeploy your application:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Deployments" tab
4. Click on "Redeploy" for your latest deployment

## Contact

If you continue to experience issues, please contact the developer for assistance. 