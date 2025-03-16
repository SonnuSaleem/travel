import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import Newsletter from '@/components/Newsletter';
import Script from 'next/script';

export default function Home() {
  return (
    <div>
      <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Phool Nagar Travels",
          "url": "https://phoolnagar-travels.vercel.app",
          "logo": "https://phoolnagar-travels.vercel.app/logo.png",
          "description": "Phool Nagar Travels is your trusted travel agency offering affordable tour packages, flight bookings, and visa services.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Street",
            "addressLocality": "Phool Nagar",
            "addressRegion": "Punjab",
            "postalCode": "55250",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.8262",
            "longitude": "73.8142"
          },
          "telephone": "+923258894708",
          "email": "info@phoolnagartravels.com",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          },
          "sameAs": [
            "https://www.facebook.com/phoolnagartravels",
            "https://www.instagram.com/phoolnagartravels"
          ]
        })
      }} />
      
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
