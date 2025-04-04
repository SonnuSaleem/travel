import nodemailer from 'nodemailer';

// Define a more specific type for NodeMailer errors
interface NodemailerError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
}

// Check if email credentials are available
const hasEmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Check for common issues with Gmail app passwords
if (hasEmailCredentials) {
  // Check for spaces in EMAIL_PASS (common issue with Gmail app passwords)
  if (process.env.EMAIL_PASS?.includes(' ')) {
    console.warn('⚠️ WARNING: Your EMAIL_PASS contains spaces. This will likely cause Gmail authentication issues.');
    console.warn('Please remove all spaces from your Gmail app password in your environment variables.');
    console.warn('Current EMAIL_PASS with spaces: ', process.env.EMAIL_PASS);
    console.warn('EMAIL_PASS without spaces would be: ', process.env.EMAIL_PASS.replace(/\s+/g, ''));
  }
}

// Create a transporter using the Gmail SMTP if credentials are available
let transporter: nodemailer.Transporter | undefined;

if (hasEmailCredentials) {
  try {
    // Remove any spaces from the password - this is a common issue with Gmail app passwords
    // as they're often copied with spaces but should be used without spaces
    const cleanedPassword = process.env.EMAIL_PASS?.replace(/\s+/g, '');
    
    // Try the most compatible Gmail configuration for Vercel serverless functions
    // Note: Using port 587 with STARTTLS instead of 465 with SSL can be more reliable
    transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service predefined settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanedPassword, // Use the cleaned password without spaces
      },
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false
      },
      debug: process.env.NODE_ENV !== 'production', // Enable debug mode in non-production
      pool: true, // Use connection pooling in production
      maxConnections: 3, // Reduce number of connections to prevent rate limiting
      maxMessages: 50 // Reduce number of messages per connection
    });
    
    // Log that the transporter was successfully initialized
    console.log('Email transporter initialized with user:', process.env.EMAIL_USER);
    
    // Log environment info to help with debugging
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Running on Vercel:', Boolean(process.env.VERCEL));
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    transporter = undefined;
  }
} else {
  console.warn('Email credentials (EMAIL_USER, EMAIL_PASS) not found in environment variables');
}

// Function to send confirmation email to user
export async function sendUserEmail(
  userEmail: string,
  subject: string,
  htmlContent: string
) {
  // If transporter is not initialized, return error
  if (!transporter) {
    console.warn('Email transporter not initialized. Check EMAIL_USER and EMAIL_PASS environment variables.');
    return {
      success: false,
      error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.'
    };
  }

  try {
    console.log(`Attempting to send email to user: ${userEmail}`);
    
    const mailOptions = {
      from: `"Safarnama Travels" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    };
    
    // Implement retry logic for serverless functions which may time out
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      attempts++;
      try {
        console.log(`Email attempt ${attempts} of ${maxAttempts}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to user successfully:', info.response);
        return { success: true };
      } catch (err) {
        lastError = err;
        console.error(`Email attempt ${attempts} failed:`, err);
        
        // Don't retry certain errors like authentication failures
        if (err instanceof Error) {
          const nodeError = err as NodemailerError;
          if (nodeError.code === 'EAUTH') {
            break; // Break immediately for auth errors
          }
        }
        
        if (attempts < maxAttempts) {
          // Exponential backoff: 1s, 2s, 4s, etc.
          const backoffTime = Math.pow(2, attempts - 1) * 1000;
          console.log(`Retrying in ${backoffTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
        }
      }
    }
    
    // If we get here, all attempts failed
    console.error('All email sending attempts failed:', lastError);
    
    // Provide more helpful error messages for common Gmail authentication issues
    if (lastError instanceof Error) {
      const nodeError = lastError as NodemailerError;
      
      if (nodeError.code === 'EAUTH') {
        console.error('Gmail authentication failed. Make sure you are using an App Password if you have 2-Step Verification enabled.');
        return {
          success: false,
          error: 'Gmail authentication failed. Please check your EMAIL_USER and EMAIL_PASS. If you have 2-Step Verification enabled, you need to use an App Password.'
        };
      }
      
      if (nodeError.code === 'ESOCKET') {
        return {
          success: false,
          error: 'Connection to Gmail SMTP server failed. Please check your network connection.'
        };
      }
    }
    
    return {
      success: false,
      error: lastError instanceof Error ? lastError.message : 'Unknown error sending email'
    };
  } catch (error) {
    console.error('Error sending email to user:', error);
    
    // Provide more helpful error messages for common Gmail authentication issues
    if (error instanceof Error) {
      const nodeError = error as NodemailerError;
      
      if (nodeError.code === 'EAUTH') {
        console.error('Gmail authentication failed. Make sure you are using an App Password if you have 2-Step Verification enabled.');
        return {
          success: false,
          error: 'Gmail authentication failed. Please check your EMAIL_USER and EMAIL_PASS. If you have 2-Step Verification enabled, you need to use an App Password.'
        };
      }
      
      if (nodeError.code === 'ESOCKET') {
        return {
          success: false,
          error: 'Connection to Gmail SMTP server failed. Please check your network connection.'
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
}

// Function to send notification email to admin
export async function sendAdminEmail(
  subject: string,
  htmlContent: string,
  replyTo?: string
) {
  // If transporter is not initialized, return error
  if (!transporter) {
    console.warn('Email transporter not initialized. Check EMAIL_USER and EMAIL_PASS environment variables.');
    return {
      success: false,
      error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.'
    };
  }
  
  // Check if admin email is available
  if (!process.env.ADMIN_EMAIL) {
    console.warn('ADMIN_EMAIL not found in environment variables');
    return {
      success: false,
      error: 'Admin email not configured. Please set ADMIN_EMAIL environment variable.'
    };
  }
  
  try {
    console.log(`Attempting to send email to admin: ${process.env.ADMIN_EMAIL}`);
    
    const mailOptions = {
      from: `"Safarnama Travels" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: replyTo || process.env.EMAIL_USER,
      subject: subject,
      html: htmlContent,
    };
    
    // Implement retry logic for serverless functions which may time out
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      attempts++;
      try {
        console.log(`Admin email attempt ${attempts} of ${maxAttempts}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to admin successfully:', info.response);
        return { success: true };
      } catch (err) {
        lastError = err;
        console.error(`Admin email attempt ${attempts} failed:`, err);
        
        // Don't retry certain errors like authentication failures
        if (err instanceof Error) {
          const nodeError = err as NodemailerError;
          if (nodeError.code === 'EAUTH') {
            break; // Break immediately for auth errors
          }
        }
        
        if (attempts < maxAttempts) {
          // Exponential backoff
          const backoffTime = Math.pow(2, attempts - 1) * 1000;
          console.log(`Retrying in ${backoffTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
        }
      }
    }
    
    // If we get here, all attempts failed
    console.error('All admin email sending attempts failed:', lastError);
    
    // Provide more helpful error messages for common Gmail authentication issues
    if (lastError instanceof Error) {
      const nodeError = lastError as NodemailerError;
      
      if (nodeError.code === 'EAUTH') {
        console.error('Gmail authentication failed. Make sure you are using an App Password if you have 2-Step Verification enabled.');
        return {
          success: false,
          error: 'Gmail authentication failed. Please check your EMAIL_USER and EMAIL_PASS. If you have 2-Step Verification enabled, you need to use an App Password.'
        };
      }
      
      if (nodeError.code === 'ESOCKET') {
        return {
          success: false,
          error: 'Connection to Gmail SMTP server failed. Please check your network connection.'
        };
      }
    }
    
    return {
      success: false,
      error: lastError instanceof Error ? lastError.message : 'Unknown error sending email'
    };
  } catch (error) {
    console.error('Error sending email to admin:', error);
    
    // Provide more helpful error messages for common Gmail authentication issues
    if (error instanceof Error) {
      const nodeError = error as NodemailerError;
      
      if (nodeError.code === 'EAUTH') {
        console.error('Gmail authentication failed. Make sure you are using an App Password if you have 2-Step Verification enabled.');
        return {
          success: false,
          error: 'Gmail authentication failed. Please check your EMAIL_USER and EMAIL_PASS. If you have 2-Step Verification enabled, you need to use an App Password.'
        };
      }
      
      if (nodeError.code === 'ESOCKET') {
        return {
          success: false,
          error: 'Connection to Gmail SMTP server failed. Please check your network connection.'
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
}

// Function to verify transporter configuration - useful for health checks
export async function verifyEmailTransporter() {
  if (!transporter) {
    return {
      success: false,
      error: 'Email transporter not initialized',
      hasCredentials: Boolean(hasEmailCredentials)
    };
  }
  
  try {
    // Verify connection configuration
    await transporter.verify();
    return {
      success: true,
      message: 'Email transporter verified successfully'
    };
  } catch (error) {
    console.error('Failed to verify email transporter:', error);
    const nodeError = error instanceof Error ? error as NodemailerError : null;
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: nodeError?.code || 'UNKNOWN'
    };
  }
}

// Function to test email connectivity on startup
export async function testEmailOnStartup() {
  console.log('===== EMAIL SERVICE STARTUP DIAGNOSTICS =====');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Running on Vercel:', Boolean(process.env.VERCEL));
  
  if (!hasEmailCredentials) {
    console.error('❌ Missing email credentials. EMAIL_USER and/or EMAIL_PASS not set.');
    return;
  }
  
  console.log('✅ Email credentials found');
  console.log('Email User:', process.env.EMAIL_USER);
  
  try {
    console.log('Attempting to verify email transporter...');
    const verifyResult = await verifyEmailTransporter();
    
    if (verifyResult.success) {
      console.log('✅ Email transporter verified successfully!');
    } else {
      console.error('❌ Email transporter verification failed:', verifyResult.error);
      console.error('Error code:', verifyResult.code);
    }
    
    // Additional checks for Gmail configuration
    if (process.env.EMAIL_USER?.includes('@gmail.com')) {
      console.log('📧 Gmail account detected. Ensure you are using an App Password if 2FA is enabled.');
    }
  } catch (error) {
    console.error('❌ Error during email startup test:', error);
  }
  
  console.log('===== END EMAIL DIAGNOSTICS =====');
}

// Run the test on module import in production
if (process.env.NODE_ENV === 'production') {
  // Delay the test to let the server initialize fully on Vercel
  setTimeout(testEmailOnStartup, 2000);
}

// Interface definitions
interface Newsletter {
  email: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

interface Booking {
  id?: string;
  firstName: string;
  lastName: string;
  destination: string;
  travelDate?: string;
  date?: string;
  travelers: number;
  totalAmount: string;
  email: string;
  phone?: string;
  packageName?: string;
  cardNumber?: string;
}

// Email templates
export const emailTemplates = {
  // Newsletter subscription confirmation
  newsletterSubscription: (data: Newsletter) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Newsletter Subscription Confirmed</h2>
      <p>Thank you for subscribing to Safarnama Travels newsletter!</p>
      <p>Your email address <strong>${data.email}</strong> has been added to our mailing list.</p>
      <p>You'll receive updates about our latest travel deals, destinations, and travel tips.</p>
      <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `,

  // Newsletter admin notification
  newsletterAdminNotification: (email: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Newsletter Subscription</h2>
      <p>A new user has subscribed to the newsletter:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `,

  // Contact form confirmation
  contactConfirmation: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Message Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Safarnama Travels. We have received your message.</p>
      <p>After some processing, our team will contact you shortly. Please be patient and wait for our response.</p>
      <p>We apologize for any delay and appreciate your understanding.</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `,

  // Contact form admin notification
  contactAdminNotification: (data: ContactForm) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Contact Form Submission</h2>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Message</h3>
        <p>${data.message}</p>
      </div>
      <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `,

  // Booking confirmation
  bookingConfirmation: (data: Booking) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Booking Confirmation</h2>
      <p>Dear ${data.firstName} ${data.lastName},</p>
      <p>Thank you for choosing Safarnama Travels. We have received your booking details.</p>
      <p>After some processing, our team will contact you shortly. Please be patient and wait for our response.</p>
      <p>We apologize for any delay and appreciate your understanding.</p>
      
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Information</h3>
        <p><strong>Booking ID:</strong> ${data.id}</p>
        <p><strong>Destination:</strong> ${data.destination}</p>
        <p><strong>Travel Date:</strong> ${data.travelDate}</p>
        <p><strong>Number of Travelers:</strong> ${data.travelers}</p>
        <p><strong>Total Amount:</strong> $${data.totalAmount}</p>
      </div>
      
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `,

  // Booking admin notification
  bookingAdminNotification: (data: Booking) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Booking Received</h2>
      
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${data.id}</p>
        <p><strong>Package:</strong> ${data.packageName}</p>
        <p><strong>Travel Date:</strong> ${data.travelDate}</p>
        <p><strong>Number of Travelers:</strong> ${data.travelers}</p>
        <p><strong>Total Amount:</strong> $${data.totalAmount}</p>
      </div>
      
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Customer Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      </div>
      
      <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Safarnama Travels. All rights reserved.</p>
      </div>
    </div>
  `
}; 