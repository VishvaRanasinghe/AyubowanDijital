export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AyubowanDiJital",
    image: "https://www.ayubowandijital.com/logo.jpg",
    url: "https://www.ayubowandijital.com",
    telephone: "+94763022689",
    description: "Technology & Professional Solutions in Sri Lanka",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
    sameAs: ["https://facebook.com/AyubowanDiJital"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
