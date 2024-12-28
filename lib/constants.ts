export const tiers = {
  starter: {
    name: "starter",
    productId: null,
    priceId: null,
    maxSites: 3,
    maxGalleriesPerSite: 3,
    maxImagesPerGallery: 50,
    totalStorageGB: 5,
  },
  basic: {
    name: "basic",
    productId: 'prod_RLWS0Ameh6fGtn',
    priceId: 'price_1QSpPFLdx104FB4Gx5TOPRpV',
    maxSites: 5,
    maxGalleriesPerSite: 5,
    maxImagesPerGallery: 100,
    totalStorageGB: 50,
  },
  company: {
    name: "company",
    productId: 'prod_RLWSQG5n9V7VLt',
    priceId: 'price_1QSpPcLdx104FB4G828vdtgu',
    maxSites: Infinity, // Unlimited sites
    maxGalleriesPerSite: Infinity, // Unlimited galleries
    maxImagesPerGallery: Infinity, // Unlimited images
    totalStorageGB: 1024, // 1 TB total storage
  },
};

export const tierData = [
  {
    label: "Starter",
    description: "For developers looking to try out the product.",
    price: "Free",
    priceId: null,
    features: [
      "No setup, or hidden fees",
      "Team size: 1 developer",
      "Sites: 3",
      "Galleries per Site: 3",
      "Images per Gallery: 50",
      "Storage Space: 5GB"
    ],
  },
  {
    label: "Basic",
    description: "Best option for freelance developers managing a few sites.",
    price: "$10",
    priceId: "price_1QSpPFLdx104FB4Gx5TOPRpV",
    features: [
      "No setup, or hidden fees",
      "Team size: 1 developer",
      "Sites: 5",
      "Galleries per Site: 5",
      "Images per Gallery: 100",
      "Storage Space: 50GB"
    ],
  },
  {
    label: "Company",
    description: "Relevant for multiple users, extended & premium support.",
    price: "$40",
    priceId: "price_1QSpPcLdx104FB4G828vdtgu",
    features: [
      "No setup, or hidden fees",
      "Team size: Up to 10 developers",
      "Sites: Unlimited",
      "Galleries per Site: Unlimited",
      "Images per Gallery: Unlimited",
      "Storage Space: 1TB"
    ],
  },
];
