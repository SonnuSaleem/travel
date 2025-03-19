import nodemailer from 'nodemailer';

// Define a more specific type for NodeMailer errors
interface NodemailerError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
}

// Check if email credentials are available
const hasEmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Create a transporter using the Gmail SMTP if credentials are available
let transporter: nodemailer.Transporter | undefined;

if (hasEmailCredentials) {
  try {
    // Create a more reliable Gmail transporter with explicit settings
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false
      }
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
      from: `"Travel Agency" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to user successfully:', info.response);
    
    return { success: true };
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
      from: `"Travel Agency" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: replyTo || process.env.EMAIL_USER,
      subject: subject,
      html: htmlContent,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to admin successfully:', info.response);
    
    return { success: true };
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
      <p>Thank you for subscribing to our newsletter! Your email address <strong>${data.email}</strong> has been added to our mailing list.</p>
      <p>You'll receive regular updates about our latest travel deals, destinations, and travel tips.</p>
      <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
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
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,

  // Booking confirmation for user
  bookingConfirmation: (booking: Booking) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Booking Confirmation</h2>
      <p>Dear ${booking.firstName} ${booking.lastName},</p>
      <p>Thank you for booking with us! Your booking has been confirmed.</p>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${booking.id || 'TBA'}</p>
        <p><strong>Destination:</strong> ${booking.destination}</p>
        <p><strong>Travel Date:</strong> ${booking.travelDate || booking.date}</p>
        <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
        <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
      </div>
      <p>If you have any questions about your booking, please contact our customer service.</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,

  // Booking notification for admin
  bookingAdminNotification: (booking: Booking) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Booking Received</h2>
      <p>A new booking has been made:</p>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Customer Information</h3>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Details</h3>
        <p><strong>Destination:</strong> ${booking.destination}</p>
        <p><strong>Travel Date:</strong> ${booking.travelDate || booking.date}</p>
        <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
        <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Payment Information</h3>
        <p><strong>Payment Method:</strong> Credit Card</p>
        <p><strong>Card Number:</strong> XXXX-XXXX-XXXX-${booking.cardNumber ? booking.cardNumber.slice(-4) : '****'}</p>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,

  // Contact form confirmation for user
  contactConfirmation: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Message Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
      <p>If your inquiry is urgent, please call our customer service line.</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,

  // Contact form notification for admin
  contactAdminNotification: (formData: ContactForm) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Contact Form Submission</h2>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Contact Information</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Message</h3>
        <p>${formData.message}</p>
      </div>
      <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,
}; 