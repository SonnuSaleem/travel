import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Safarnama Travels',
  description: 'Privacy Policy for Safarnama Travels. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-yellow-600 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Introduction</h2>
          <p>Welcome to Safarnama Travels. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">The Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Identity Data</strong>: includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong>: includes email address, telephone numbers, and address.</li>
            <li><strong>Technical Data</strong>: includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong>: includes information about how you use our website, products and services.</li>
            <li><strong>Marketing and Communications Data</strong>: includes your preferences in receiving marketing from us.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>To process and deliver your booking.</li>
            <li>To manage our relationship with you.</li>
            <li>To improve our website, products/services, marketing or customer relationships.</li>
            <li>To recommend products or services that may be of interest to you.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cookies</h2>
          <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
          <p>Email: info@safarnamatravels.fun</p>
          <p>Phone: +92 3258894708</p>
        </section>
      </div>
    </div>
  );
} 