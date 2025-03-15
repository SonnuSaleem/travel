import nodemailer from 'nodemailer';

// Create a transporter using the Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send confirmation email to user
export async function sendUserEmail(
  userEmail: string,
  subject: string, 
  htmlContent: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to user:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email to user:', error);
    return { success: false, error };
  }
}

// Function to send notification email to admin
export async function sendAdminEmail(
  subject: string, 
  htmlContent: string,
  replyTo: string = ''
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      replyTo: replyTo || process.env.EMAIL_USER,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to admin:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email to admin:', error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  // Newsletter subscription confirmation
  newsletterConfirmation: (email: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Newsletter Subscription Confirmed</h2>
      <p>Thank you for subscribing to our newsletter! Your email address <strong>${email}</strong> has been added to our mailing list.</p>
      <p>You'll now receive updates about our latest travel packages, promotions, and travel tips.</p>
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
  bookingConfirmation: (booking: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">Booking Confirmation</h2>
      <p>Dear ${booking.firstName} ${booking.lastName},</p>
      <p>Thank you for booking with us! Your booking has been confirmed.</p>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${booking.id || 'TBA'}</p>
        <p><strong>Package:</strong> ${booking.packageName}</p>
        <p><strong>Destination:</strong> ${booking.destination}</p>
        <p><strong>Travel Date:</strong> ${booking.travelDate}</p>
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
  bookingAdminNotification: (booking: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Booking Received</h2>
      <p>A new booking has been made:</p>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Customer Information</h3>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Booking Details</h3>
        <p><strong>Package:</strong> ${booking.packageName}</p>
        <p><strong>Destination:</strong> ${booking.destination}</p>
        <p><strong>Travel Date:</strong> ${booking.travelDate}</p>
        <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
        <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Payment Information</h3>
        <p><strong>Payment Method:</strong> Credit Card</p>
        <p><strong>Card Number:</strong> XXXX-XXXX-XXXX-${booking.cardNumber.slice(-4)}</p>
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
  contactAdminNotification: (contact: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4a5568;">New Contact Form Submission</h2>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Contact Information</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #4a5568;">Message</h3>
        <p>${contact.message}</p>
      </div>
      <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #718096;">© ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      </div>
    </div>
  `,
}; 