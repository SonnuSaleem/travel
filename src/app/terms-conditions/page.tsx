import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Safarnama Travels',
  description: 'Terms and conditions of using Safarnama Travels services. Learn about our booking policies, cancellations, and more.',
};

export default function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-yellow-600 mb-8">Terms & Conditions</h1>
      
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Introduction</h2>
          <p>Welcome to Safarnama Travels. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website and using our services, we assume you accept these terms and conditions in full. Do not continue to use Safarnama Travels' website and services if you do not accept all of the terms and conditions stated on this page.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Booking & Payments</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>All bookings are subject to availability and confirmation.</li>
            <li>A deposit of 50% of the total tour cost is required to confirm a booking.</li>
            <li>The remaining balance must be paid 14 days before the tour start date.</li>
            <li>For bookings made within 14 days of the departure date, full payment is required at the time of booking.</li>
            <li>Payments can be made via the methods specified during the booking process.</li>
            <li>All prices are quoted in PKR (Pakistani Rupees) and include applicable taxes.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cancellation Policy</h2>
          <p>Our cancellation policy is as follows:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Cancellations made 30 days or more before the tour start date: Full refund less administrative fee.</li>
            <li>Cancellations made 15-29 days before the tour start date: 50% refund.</li>
            <li>Cancellations made 14 days or less before the tour start date: No refund.</li>
            <li>All cancellations must be made in writing to info@safarnamatravels.fun.</li>
            <li>We strongly recommend purchasing travel insurance to cover any unforeseen circumstances.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Changes to Bookings</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Changes to bookings may be possible subject to availability and at our discretion.</li>
            <li>An administrative fee may apply to any changes made after confirmation.</li>
            <li>Changes requested within 14 days of the tour start date may be treated as a cancellation and rebooking.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Responsibilities</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>We will arrange and provide the tours and services as described in our itineraries.</li>
            <li>We reserve the right to modify an itinerary due to unforeseen circumstances such as weather, political conditions, or other factors beyond our control.</li>
            <li>We will endeavor to provide alternative arrangements of similar standard if changes are necessary.</li>
            <li>We will not be liable for any loss, damage, illness, injury, or death that may occur from participating in our tours.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Client Responsibilities</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Clients must provide accurate and complete information during the booking process.</li>
            <li>Clients are responsible for ensuring they have valid travel documents, including passports, visas, and permits.</li>
            <li>Clients must adhere to the laws, customs, and drug regulations of Pakistan.</li>
            <li>Clients must respect the environment, wildlife, and local communities during the tour.</li>
            <li>Clients must follow the guidance and instructions of tour guides and staff.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Health & Safety</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Clients should consult their doctor before traveling to ensure they are fit to participate in the tour.</li>
            <li>Clients must inform us of any pre-existing medical conditions or special requirements.</li>
            <li>Clients participate in activities at their own risk and must take responsibility for their own safety.</li>
            <li>We reserve the right to refuse participation if a client's health or fitness level is deemed unsuitable for a tour.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Intellectual Property</h2>
          <p>The content on our website, including text, graphics, logos, images, and software, is the property of Safarnama Travels and is protected by copyright and other intellectual property laws. Unauthorized use of this content may give rise to a claim for damages and/or be a criminal offense.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Us</h2>
          <p>If you have any questions about these terms and conditions, please contact us at:</p>
          <p>Email: info@safarnamatravels.fun</p>
          <p>Phone: +92 3258894708</p>
        </section>
      </div>
    </div>
  );
} 