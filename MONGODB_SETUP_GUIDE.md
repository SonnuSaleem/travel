# MongoDB Setup Guide for Phool Nagar Travels

This guide will help you set up MongoDB for your travel agency website and configure the necessary environment variables on Vercel.

## Setting Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account if you don't have one.
   - Once logged in, create a new project for your travel agency.

2. **Create a Cluster**:
   - Click "Build a Database" and select the free tier option.
   - Choose your preferred cloud provider and region (select one close to your target audience).
   - Click "Create Cluster" (this may take a few minutes).

3. **Set Up Database Access**:
   - In the left sidebar, click "Database Access" under Security.
   - Click "Add New Database User".
   - Create a username and a secure password. Make sure to save these credentials.
   - Set privileges to "Read and Write to Any Database" and click "Add User".

4. **Configure Network Access**:
   - In the left sidebar, click "Network Access" under Security.
   - Click "Add IP Address".
   - For development, you can add your current IP address.
   - For production with Vercel, click "Allow Access from Anywhere" (this adds 0.0.0.0/0).
   - Click "Confirm".

5. **Get Your Connection String**:
   - Once your cluster is created, click "Connect".
   - Select "Connect your application".
   - Copy the connection string. It should look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
   - Add your database name at the end: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/travel_agency?retryWrites=true&w=majority`

## Setting Up Environment Variables on Vercel

1. **Log in to Vercel**:
   - Go to [Vercel](https://vercel.com/) and log in to your account.
   - Select your project.

2. **Add Environment Variables**:
   - Click on the "Settings" tab.
   - Click on "Environment Variables".
   - Add the following variables:

   ```
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/travel_agency?retryWrites=true&w=majority
   EMAIL_USER=muzammilsaleem709@gmail.com
   EMAIL_PASS=your-app-password-here
   ADMIN_EMAIL=muzammilsaleem708@gmail.com
   NEXT_PUBLIC_EMAIL_USER=muzammilsaleem709@gmail.com
   NEXT_PUBLIC_ADMIN_EMAIL=muzammilsaleem708@gmail.com
   NEXT_PUBLIC_SITE_URL=https://phoolnagar-travels.vercel.app
   ```

   - Replace the placeholder values with your actual values.
   - Click "Save".

3. **Redeploy Your Application**:
   - After setting up the environment variables, redeploy your application.
   - Go to the "Deployments" tab and click "Redeploy" on your latest deployment.

## Troubleshooting

If you encounter the error "Invalid MongoDB URI format. URI should start with mongodb:// or mongodb+srv://", make sure:

1. Your `DATABASE_URL` environment variable is correctly set in Vercel.
2. The connection string starts with `mongodb+srv://` or `mongodb://`.
3. There are no extra spaces or special characters in the connection string.

If you see "Failed to connect to MongoDB" errors:

1. Check that your MongoDB Atlas cluster is running.
2. Verify that your database user has the correct permissions.
3. Ensure that your IP whitelist includes `0.0.0.0/0` for Vercel deployments.
4. Check that your database name is correctly specified in the connection string.

## Testing Your Connection

After deploying, you can test if your MongoDB connection is working by:

1. Visiting your deployed site.
2. Trying to subscribe to the newsletter or submit a contact form.
3. Checking the Vercel logs for any database-related errors.

If you continue to experience issues, please contact the developer for assistance. 