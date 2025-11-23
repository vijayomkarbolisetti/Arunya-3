/**
 * Detailed Villa Information
 * Comprehensive data for each villa type including features, specifications, and blueprints
 */

export const villaDetails = {
  "the-heritage-villa": {
    id: "the-heritage-villa",
    name: "The Heritage Villa",
    tagline: "Where Timeless Elegance Meets Modern Luxury",
    color: "brown",
    sqft: "7,150 sq.ft",
    plotSize: "720 sq.yds",
    price: "₹4.5 Cr onwards",
    
    hero: {
      image: "/images/brown.jpg",
      video: "/videos/f1.mp4",
    },

    overview: {
      title: "A Legacy of Grandeur",
      description: "The Heritage Villa represents the pinnacle of architectural excellence, seamlessly blending traditional grandeur with contemporary comfort. Spanning over 7,150 square feet, this masterpiece offers an unparalleled living experience for those who appreciate the finer things in life.",
      highlights: [
        "Largest villa configuration in the township",
        "Premium Italian marble flooring throughout",
        "Private home theater and wine cellar",
        "Expansive landscaped gardens",
        "Smart home automation system",
      ]
    },

    specifications: {
      bedrooms: "5 BHK + Study",
      bathrooms: "6 Bathrooms",
      floors: "G+2 with Terrace",
      parking: "4 Car Parking",
      balconies: "4 Large Balconies",
      servant: "Separate Servant Quarter",
      orientation: "East Facing (Vastu Compliant)",
      ceiling: "12 ft High Ceilings",
    },

    features: [
      {
        title: "Grand Living Spaces",
        description: "Double-height living room with premium chandelier fittings and expansive windows for natural light",
        icon: "Hotel"
      },
      {
        title: "Gourmet Kitchen",
        description: "State-of-the-art modular kitchen with premium appliances, breakfast counter, and separate utility area",
        icon: "Utensils"
      },
      {
        title: "Master Suite Paradise",
        description: "Luxurious master bedroom with walk-in closet, private balcony, and spa-inspired bathroom with jacuzzi",
        icon: "BedDouble"
      },
      {
        title: "Entertainment Zone",
        description: "Dedicated home theater room with acoustic treatment and professional-grade audio-visual setup",
        icon: "Clapperboard"
      },
      {
        title: "Wellness Center",
        description: "Private gym area with floor-to-ceiling mirrors and integrated sound system",
        icon: "Dumbbell"
      },
      {
        title: "Outdoor Living",
        description: "Beautifully landscaped garden with gazebo, outdoor dining area, and children's play zone",
        icon: "Leaf"
      },
      {
        title: "Smart Integration",
        description: "Complete home automation for lighting, climate control, security, and entertainment systems",
        icon: "Home"
      },
      {
        title: "Wine Cellar",
        description: "Temperature-controlled wine storage with display shelving and tasting area",
        icon: "Wine"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Room", "Dining Area", "Kitchen", "Guest Bedroom", "Powder Room", "Servant Quarter"],
        sqft: "2,850 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Bedroom with Balcony", "2 Bedrooms", "Family Lounge", "2 Attached Bathrooms", "Study Room"],
        sqft: "2,400 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Home Theater", "Guest Suite", "Gym", "Storage", "Terrace Garden"],
        sqft: "1,900 sq.ft"
      },
    ],

    amenities: [
      "Imported Sanitary Ware",
      "Premium Wood Flooring in Bedrooms",
      "Designer Light Fixtures",
      "Video Door Phone",
      "CCTV Integration",
      "Water Softener System",
      "Solar Water Heater",
      "Rainwater Harvesting",
      "EV Charging Point",
      "Fiber Internet Ready",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },

  "the-premium-villa": {
    id: "the-premium-villa",
    name: "The Premium Villa",
    tagline: "Sophisticated Living, Redefined",
    color: "red",
    sqft: "6,500 sq.ft",
    plotSize: "650 sq.yds",
    price: "₹3.8 Cr onwards",
    
    hero: {
      image: "/images/red.jpg",
      video: "/videos/f2.mp4",
    },

    overview: {
      title: "Premium Lifestyle Awaits",
      description: "The Premium Villa offers an exquisite blend of luxury and functionality. Designed for modern families who value space, comfort, and style, this villa features contemporary architecture with thoughtful layouts that maximize natural light and ventilation.",
      highlights: [
        "Contemporary architectural design",
        "Spacious open-plan living areas",
        "Private terrace with skylight",
        "Designer kitchen with island",
        "Smart security system",
      ]
    },

    specifications: {
      bedrooms: "4 BHK + Study",
      bathrooms: "5 Bathrooms",
      floors: "G+2 with Terrace",
      parking: "3 Car Parking",
      balconies: "3 Balconies",
      servant: "Servant Room",
      orientation: "North-East Facing",
      ceiling: "11 ft High Ceilings",
    },

    features: [
      {
        title: "Contemporary Design",
        description: "Modern minimalist architecture with clean lines and premium finishes throughout",
        icon: "Palette"
      },
      {
        title: "Open Concept Living",
        description: "Seamlessly connected living, dining, and kitchen areas perfect for entertaining",
        icon: "Maximize"
      },
      {
        title: "Luxe Master Suite",
        description: "Spacious master bedroom with sitting area, walk-in wardrobe, and luxury bathroom",
        icon: "Crown"
      },
      {
        title: "Sky Terrace",
        description: "Private rooftop terrace with pergola and 360-degree views",
        icon: "Sun"
      },
      {
        title: "Work From Home",
        description: "Dedicated study room with built-in cabinets and high-speed connectivity",
        icon: "Briefcase"
      },
      {
        title: "Family Recreation",
        description: "Multipurpose recreation room that can serve as gym, game room, or lounge",
        icon: "Gamepad2"
      },
      {
        title: "Green Spaces",
        description: "Front and back gardens with automatic irrigation system",
        icon: "Leaf"
      },
      {
        title: "Energy Efficient",
        description: "LED lighting, solar panels, and high-efficiency HVAC system",
        icon: "Zap"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Room", "Dining Area", "Modern Kitchen", "Guest Room", "Bathroom", "Utility Area"],
        sqft: "2,600 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Bedroom", "2 Bedrooms", "Family Area", "3 Attached Bathrooms", "Balcony"],
        sqft: "2,300 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Recreation Room", "Study", "Terrace Garden", "Storage", "Bathroom"],
        sqft: "1,600 sq.ft"
      },
    ],

    amenities: [
      "Vitrified Tile Flooring",
      "Premium Bathroom Fittings",
      "Modular Kitchen Cabinets",
      "Split AC Provision",
      "Video Intercom",
      "Fire Safety System",
      "Solar Panels",
      "Water Purification System",
      "Car Charging Point",
      "High-Speed Internet",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },

  "the-executive-villa": {
    id: "the-executive-villa",
    name: "The Executive Villa",
    tagline: "Executive Excellence in Every Detail",
    color: "blue",
    sqft: "6,200 sq.ft",
    plotSize: "600 sq.yds",
    price: "₹3.5 Cr onwards",
    
    hero: {
      image: "/images/blue.jpg",
      video: "/videos/f3.mp4",
    },

    overview: {
      title: "Designed for Success",
      description: "The Executive Villa is tailored for discerning professionals who demand excellence. With its perfect balance of work and leisure spaces, this villa embodies sophistication and practical luxury, making it ideal for the modern executive lifestyle.",
      highlights: [
        "Professional home office suite",
        "Premium smart home features",
        "Entertainment deck with BBQ area",
        "Meditation and wellness space",
        "High-end finishes throughout",
      ]
    },

    specifications: {
      bedrooms: "4 BHK + Office Suite",
      bathrooms: "5 Bathrooms",
      floors: "G+2 with Deck",
      parking: "3 Car Parking",
      balconies: "3 Balconies",
      servant: "Servant Quarter",
      orientation: "South-East Facing",
      ceiling: "11 ft High Ceilings",
    },

    features: [
      {
        title: "Executive Office",
        description: "Professional home office with separate entrance, built-in storage, and meeting area",
        icon: "Building2"
      },
      {
        title: "Smart Technology",
        description: "Integrated smart home system with voice control and mobile app management",
        icon: "Smartphone"
      },
      {
        title: "Entertainment Deck",
        description: "Outdoor entertainment area with built-in BBQ, bar counter, and dining space",
        icon: "Music"
      },
      {
        title: "Wellness Corner",
        description: "Dedicated yoga and meditation space with serene ambiance",
        icon: "Flower2"
      },
      {
        title: "Luxury Bathrooms",
        description: "Spa-inspired bathrooms with rain showers, premium fixtures, and heating",
        icon: "Droplets"
      },
      {
        title: "Chef's Kitchen",
        description: "Professional-grade kitchen with high-end appliances and ample prep space",
        icon: "ChefHat"
      },
      {
        title: "Climate Control",
        description: "Central air conditioning with zone control and air purification",
        icon: "Thermometer"
      },
      {
        title: "Secure Living",
        description: "Advanced security with biometric access, CCTV, and alarm systems",
        icon: "ShieldCheck"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Area", "Dining Space", "Kitchen", "Office Suite", "Guest Toilet", "Patio"],
        sqft: "2,500 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Suite", "2 Bedrooms", "Family Room", "3 Bathrooms", "Deck Access"],
        sqft: "2,200 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Guest Suite", "Wellness Room", "Entertainment Deck", "Storage", "Terrace"],
        sqft: "1,500 sq.ft"
      },
    ],

    amenities: [
      "Marble Flooring in Common Areas",
      "Premium Sanitary Ware",
      "Designer Kitchen",
      "Central AC Ready",
      "Smart Door Locks",
      "Integrated Sound System",
      "Solar Power Backup",
      "RO Water System",
      "EV Charging Station",
      "Gigabit Fiber Connection",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },

  "the-elite-villa": {
    id: "the-elite-villa",
    name: "The Elite Villa",
    tagline: "Elite Living, Exceptional Comfort",
    color: "orange",
    sqft: "5,950 sq.ft",
    plotSize: "550 sq.yds",
    price: "₹3.2 Cr onwards",
    
    hero: {
      image: "/images/orange.jpg",
      video: "/videos/f4.mp4",
    },

    overview: {
      title: "Elite Class Redefined",
      description: "The Elite Villa showcases refined elegance and thoughtful design. Perfect for growing families, this villa offers generous living spaces, modern amenities, and a layout that promotes togetherness while respecting privacy.",
      highlights: [
        "Family-centric design philosophy",
        "Spacious children's play area",
        "Covered outdoor living space",
        "Multi-functional rooms",
        "Sustainable living features",
      ]
    },

    specifications: {
      bedrooms: "4 BHK",
      bathrooms: "4 Bathrooms",
      floors: "G+2 with Terrace",
      parking: "3 Car Parking",
      balconies: "3 Balconies",
      servant: "Servant Room",
      orientation: "North Facing",
      ceiling: "10.5 ft High Ceilings",
    },

    features: [
      {
        title: "Family Living",
        description: "Large family room on first floor for quality time together",
        icon: "Users"
      },
      {
        title: "Kids Paradise",
        description: "Dedicated children's play area with safety features and storage",
        icon: "ToyBrick"
      },
      {
        title: "Covered Patio",
        description: "Weather-protected outdoor living space perfect for all seasons",
        icon: "Umbrella"
      },
      {
        title: "Flexible Spaces",
        description: "Multi-purpose rooms that adapt to your changing needs",
        icon: "Shuffle"
      },
      {
        title: "Modern Kitchen",
        description: "Contemporary kitchen with breakfast nook and pantry storage",
        icon: "Utensils"
      },
      {
        title: "Green Living",
        description: "Eco-friendly features including rainwater harvesting and solar power",
        icon: "Recycle"
      },
      {
        title: "Comfort Climate",
        description: "Energy-efficient climate control with smart thermostats",
        icon: "Thermometer"
      },
      {
        title: "Safe & Secure",
        description: "Comprehensive security system with 24/7 monitoring capability",
        icon: "Lock"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Room", "Dining Area", "Kitchen", "Bedroom", "Bathroom", "Covered Patio"],
        sqft: "2,350 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Bedroom", "2 Bedrooms", "Family Room", "3 Bathrooms", "Balcony"],
        sqft: "2,100 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Play Area", "Multi-Purpose Room", "Terrace", "Storage", "Utility"],
        sqft: "1,500 sq.ft"
      },
    ],

    amenities: [
      "Quality Vitrified Tiles",
      "Modern Bathroom Fixtures",
      "Modular Kitchen",
      "AC Provisions",
      "Video Door Bell",
      "Safety Features",
      "Solar Water Heating",
      "Water Treatment",
      "Parking with Charging",
      "Broadband Ready",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },

  "the-classic-villa": {
    id: "the-classic-villa",
    name: "The Classic Villa",
    tagline: "Classic Design, Contemporary Living",
    color: "white",
    sqft: "5,800 sq.ft",
    plotSize: "520 sq.yds",
    price: "₹2.9 Cr onwards",
    
    hero: {
      image: "/images/white.jpg",
      video: "/videos/f5.mp4",
    },

    overview: {
      title: "Timeless Beauty",
      description: "The Classic Villa combines traditional architectural elements with modern functionality. Its timeless design ensures enduring appeal while providing all the conveniences of contemporary living for discerning homeowners.",
      highlights: [
        "Timeless architectural style",
        "Efficient space utilization",
        "Natural ventilation design",
        "Classic finishes with modern touches",
        "Value-engineered excellence",
      ]
    },

    specifications: {
      bedrooms: "3 BHK + Study",
      bathrooms: "4 Bathrooms",
      floors: "G+2",
      parking: "2 Car Parking",
      balconies: "2 Balconies",
      servant: "Servant Room",
      orientation: "East Facing",
      ceiling: "10 ft High Ceilings",
    },

    features: [
      {
        title: "Classic Architecture",
        description: "Traditional design elements with modern structural engineering",
        icon: "Landmark"
      },
      {
        title: "Smart Layout",
        description: "Efficiently designed spaces that maximize functionality and flow",
        icon: "Grid"
      },
      {
        title: "Natural Living",
        description: "Large windows and cross-ventilation for natural light and fresh air",
        icon: "Wind"
      },
      {
        title: "Cozy Study",
        description: "Comfortable study room perfect for work or reading",
        icon: "BookOpen"
      },
      {
        title: "Functional Kitchen",
        description: "Well-planned kitchen with modern fittings and good storage",
        icon: "Utensils"
      },
      {
        title: "Garden Space",
        description: "Front and back gardens for outdoor activities and greenery",
        icon: "Flower"
      },
      {
        title: "Quality Build",
        description: "Premium construction materials and craftsmanship throughout",
        icon: "Hammer"
      },
      {
        title: "Modern Amenities",
        description: "All essential modern conveniences and connectivity",
        icon: "Wifi"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Area", "Dining Space", "Kitchen", "Study Room", "Powder Room", "Garden"],
        sqft: "2,200 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Bedroom", "2 Bedrooms", "3 Bathrooms", "Balcony", "Storage"],
        sqft: "2,000 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Multi-Purpose Room", "Terrace", "Storage", "Utility Area"],
        sqft: "1,600 sq.ft"
      },
    ],

    amenities: [
      "Ceramic Tile Flooring",
      "Standard Sanitary Fittings",
      "Modular Kitchen Setup",
      "AC Provision",
      "Intercom System",
      "Basic Security",
      "Solar Water Heater",
      "Water Purification",
      "Car Parking",
      "Internet Ready",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },

  "the-signature-villa": {
    id: "the-signature-villa",
    name: "The Signature Villa",
    tagline: "Your Signature Style Statement",
    color: "black",
    sqft: "5,650 sq.ft",
    plotSize: "500 sq.yds",
    price: "₹2.7 Cr onwards",
    
    hero: {
      image: "/images/black.jpg",
      video: "/videos/f6.mp4",
    },

    overview: {
      title: "Make Your Mark",
      description: "The Signature Villa offers a blank canvas for personalization. With its modern design and flexible spaces, this villa allows you to create a home that truly reflects your unique style and preferences.",
      highlights: [
        "Customizable interior options",
        "Modern minimalist design",
        "Flexible room configurations",
        "Smart home ready infrastructure",
        "Contemporary finishes",
      ]
    },

    specifications: {
      bedrooms: "3 BHK + Flex Space",
      bathrooms: "4 Bathrooms",
      floors: "G+2",
      parking: "2 Car Parking",
      balconies: "2 Balconies",
      servant: "Utility Room",
      orientation: "West Facing",
      ceiling: "10 ft High Ceilings",
    },

    features: [
      {
        title: "Modern Design",
        description: "Contemporary architecture with clean lines and minimalist aesthetics",
        icon: "Sparkles"
      },
      {
        title: "Flex Spaces",
        description: "Adaptable rooms that can serve multiple purposes as your needs change",
        icon: "Move"
      },
      {
        title: "Smart Ready",
        description: "Pre-wired for smart home integration and automation",
        icon: "Cpu"
      },
      {
        title: "Open Concept",
        description: "Flowing layout connecting living, dining, and kitchen areas",
        icon: "Minimize"
      },
      {
        title: "Contemporary Kitchen",
        description: "Sleek modern kitchen with quality fittings and appliances",
        icon: "UtensilsCrossed"
      },
      {
        title: "Outdoor Living",
        description: "Balconies and terrace for outdoor relaxation and entertaining",
        icon: "Tent"
      },
      {
        title: "Energy Smart",
        description: "Energy-efficient design with LED lighting and solar readiness",
        icon: "Lightbulb"
      },
      {
        title: "Secure Home",
        description: "Modern security features with digital access control",
        icon: "Key"
      },
    ],

    floorPlans: [
      {
        floor: "Ground Floor",
        features: ["Living Room", "Dining Area", "Kitchen", "Flex Space", "Bathroom", "Utility"],
        sqft: "2,150 sq.ft"
      },
      {
        floor: "First Floor",
        features: ["Master Bedroom", "2 Bedrooms", "3 Bathrooms", "Balcony", "Loft"],
        sqft: "1,900 sq.ft"
      },
      {
        floor: "Second Floor",
        features: ["Bonus Room", "Terrace", "Storage", "Utility Space"],
        sqft: "1,600 sq.ft"
      },
    ],

    amenities: [
      "Vitrified Flooring",
      "Modern Fixtures",
      "Kitchen Cabinets",
      "AC Ready",
      "Digital Intercom",
      "Security System",
      "Solar Ready",
      "Water Filter",
      "Covered Parking",
      "High-Speed Internet",
    ],

    location: {
      proximity: [
        { place: "International Airport", distance: "35 min" },
        { place: "IT Hub (HITEC City)", distance: "25 min" },
        { place: "International School", distance: "5 min" },
        { place: "Premium Hospital", distance: "10 min" },
        { place: "Shopping Mall", distance: "8 min" },
      ]
    }
  },
};

// Helper function to get villa by color
export const getVillaByColor = (color) => {
  return Object.values(villaDetails).find(villa => villa.color === color);
};

// Helper function to get villa by ID
export const getVillaById = (id) => {
  return villaDetails[id];
};

// Export villa IDs for routing
export const villaIds = Object.keys(villaDetails);


