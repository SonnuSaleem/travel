import React from 'react';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'localBusiness' | 'breadcrumbList';
  url?: string;
  name?: string;
  description?: string;
  logo?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function StructuredData({
  type = 'website',
  url = 'https://www.safarnamatravels.fun',
  name = 'Safarnama Travels',
  description = "Safarnama Travels is Pakistan's trusted travel agency offering exceptional tour packages to Hunza, Skardu, and other stunning destinations.",
  logo = 'https://www.safarnamatravels.fun/images/logo.png',
  breadcrumbs = []
}: StructuredDataProps) {
  // Generate the appropriate structured data based on the type
  const generateStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name,
          url,
          logo,
          description,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+92 3258894708',
            contactType: 'customer service',
            email: 'infoSafarnama@gmail.com',
            areaServed: 'PK',
            availableLanguage: ['en', 'ur']
          },
          sameAs: [
            'https://www.facebook.com/safarnamatravels',
            'https://www.instagram.com/safarnamatravels',
            'https://twitter.com/safarnamatravels'
          ]
        };
      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name,
          url,
          logo,
          description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '358 Travel Street, Phool Nagar Tourism City',
            addressLocality: 'Phool Nagar',
            addressRegion: 'Punjab',
            postalCode: '55250',
            addressCountry: 'PK'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '30.8456',
            longitude: '73.2589'
          },
          telephone: '+92 3258894708',
          email: 'infoSafarnama@gmail.com',
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            opens: '09:00',
            closes: '18:00'
          },
          priceRange: '₨₨₨'
        };
      case 'breadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };
      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url,
          name,
          description,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${url}/packages?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        };
    }
  };

  const structuredData = generateStructuredData();

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 