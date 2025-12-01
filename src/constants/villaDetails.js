/**
 * Detailed Villa Information
 * Comprehensive data for each villa type including features, specifications, and blueprints
 */

export const villaDetails = {
  "the-estate": {
    id: "the-estate",
    name: "The Estate",
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
      description: "The Estate represents the pinnacle of architectural excellence, seamlessly blending traditional grandeur with contemporary comfort. Spanning over 7,150 square feet, this masterpiece offers an unparalleled living experience for those who appreciate the finer things in life.",
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
        variant: "Soleil",
        floor: "Soleil",
        features: ["Grand Entrance", "Double Height Living", "Formal Dining", "Show Kitchen", "Master Suite", "Home Theater", "Gym", "Terrace Garden"],
        sqft: "7,150 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE A 03.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE A 03.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE A 03.jpg" },
        ],
        description: "Soleil estate designed for grandeur and luxury living"
      },
      {
        variant: "Ember",
        floor: "Ember",
        features: ["Contemporary Layout", "Open Plan Living", "Chef's Kitchen", "Family Lounge", "Master Wing", "Entertainment Zone", "Spa", "Sky Deck"],
        sqft: "7,150 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE B 03.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE B 03.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE B 03.jpg" },
        ],
        description: "Ember estate focusing on modern family connectivity"
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

  "the-courtyard": {
    id: "the-courtyard",
    name: "The Courtyard",
    tagline: "Sophisticated Living, Redefined",
    color: "red",
    sqft: "6,600 sq.ft",
    plotSize: "450 sq.yds",
    price: "₹3.8 Cr onwards",
    
    hero: {
      image: "/images/red.jpg",
      video: "/videos/f2.mp4",
    },

    overview: {
      title: "Premium Lifestyle Awaits",
      description: "The Courtyard offers an exquisite blend of luxury and functionality. Designed for modern families who value space, comfort, and style, this villa features contemporary architecture with thoughtful layouts that maximize natural light and ventilation.",
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
        variant: "Soleil",
        floor: "Soleil",
        features: ["Living Room", "Dining Area", "Modern Kitchen", "Guest Room", "Master Suite", "Family Lounge", "Study", "Terrace"],
        sqft: "6,600 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE A 02.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE A 02.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE A 02.jpg" },
        ],
        description: "Soleil courtyard villa with central light well"
      },
      {
        variant: "Ember",
        floor: "Ember",
        features: ["Open Layout", "Gourmet Kitchen", "Master Bedroom", "3 Guest Rooms", "Home Office", "Recreation Room", "Private Garden"],
        sqft: "6,600 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE B 02.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE B 02.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE B 02.jpg" },
        ],
        description: "Ember courtyard villa designed for indoor-outdoor living"
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

  "the-grove": {
    id: "the-grove",
    name: "The Grove",
    tagline: "Your Signature Style Statement",
    color: "blue",
    sqft: "5,650 sq.ft",
    plotSize: "383 sq.yds",
    price: "₹2.7 Cr onwards",
    
    hero: {
      image: "/images/blue.jpg",
      video: "/videos/f6.mp4",
    },

    overview: {
      title: "Make Your Mark",
      description: "The Grove offers a blank canvas for personalization. With its modern design and flexible spaces, this villa allows you to create a home that truly reflects your unique style and preferences. Choose from two distinctive variants - Soleil and Ember - each with customizable floor plan orientations.",
      highlights: [
        "Two distinctive variants - Soleil & Ember",
        "Customizable interior options",
        "Modern minimalist design",
        "Flexible room configurations",
        "Smart home ready infrastructure",
      ]
    },

    specifications: {
      bedrooms: "3 BHK + Flex Space",
      bathrooms: "4 Bathrooms",
      floors: "G+2",
      parking: "2 Car Parking",
      balconies: "2 Balconies",
      servant: "Utility Room",
      orientation: "Multiple Orientations Available",
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

    // Floor plans organized by variant and orientation
    floorPlans: [
      {
        variant: "Soleil",
        floor: "East Facing",
        features: ["Living Room", "Dining Area", "Modern Kitchen", "Master Suite", "2 Guest Rooms", "Study Area", "3 Bathrooms", "Balconies", "Utility"],
        sqft: "5,650 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE A 02.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE A 02.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE A 02.jpg" },
        ],
        description: "Soleil East facing plan optimizes morning sunlight and natural ventilation"
      },
      {
        variant: "Soleil",
        floor: "West Facing",
        features: ["Living Room", "Dining Area", "Modern Kitchen", "Master Suite", "2 Guest Rooms", "Study Area", "3 Bathrooms", "Balconies", "Utility"],
        sqft: "5,650 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/WEST  STYLE A 01.jpg" },
          { label: "First Floor", image: "/floor/WEST  STYLE A 01.jpg" },
          { label: "Second Floor", image: "/floor/WEST  STYLE A 01.jpg" },
        ],
        description: "Soleil West facing plan maximizes afternoon and evening natural light"
      },
      {
        variant: "Ember",
        floor: "East Facing",
        features: ["Open Living Area", "Gourmet Kitchen", "Master Bedroom with Walk-in", "2 Bedrooms", "Flex Space", "3.5 Bathrooms", "Private Terrace", "Utility"],
        sqft: "5,650 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/EAST STYLE B 01.jpg" },
          { label: "First Floor", image: "/floor/EAST STYLE B 01.jpg" },
          { label: "Second Floor", image: "/floor/EAST STYLE B 01.jpg" },
        ],
        description: "Ember East facing plan with emphasis on spacious entertaining areas"
      },
      {
        variant: "Ember",
        floor: "West Facing",
        features: ["Open Living Area", "Gourmet Kitchen", "Master Bedroom with Walk-in", "2 Bedrooms", "Flex Space", "3.5 Bathrooms", "Private Terrace", "Utility"],
        sqft: "5,650 sq.ft",
        images: [
          { label: "Ground Floor", image: "/floor/WEST  STYLE B 01.jpg" },
          { label: "First Floor", image: "/floor/WEST  STYLE B 01.jpg" },
          { label: "Second Floor", image: "/floor/WEST  STYLE B 01.jpg" },
        ],
        description: "Ember West facing plan designed for sunset views and evening ambiance"
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
