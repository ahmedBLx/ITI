export const destinations = [
  {
    id: "mars",
    name: "Mars",
    type: "planet",
    tagline: "The Crimson Frontier",
    description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Known for its dusty, cold, desert-like climate and iron-rich red soil, it is the primary target for humanity's first multi-planetary settlement.",
    distance: "225 Million km",
    travelTime: "9 Months",
    temperature: "-62°C",
    isPopular: true,
    price: "$250,000",
    color: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    glowColor: "rgba(255, 75, 43, 0.4)",
    features: [
      "Walk on the Olympus Mons, the largest volcano in the solar system",
      "Explore the vast canyon system of Valles Marineris",
      "Experience Martian double sunsets (two moons: Phobos & Deimos)"
    ]
  },
  {
    id: "europa",
    name: "Europa",
    type: "moon",
    tagline: "The Frozen Ocean World",
    description: "Europa is the smallest of the four Galilean moons orbiting Jupiter. Beneath its thick, icy outer crust lies a massive subsurface liquid water ocean that could potentially harbor extraterrestrial life. A true wonderland for ice-diving adventurers.",
    distance: "628 Million km",
    travelTime: "3 Years",
    temperature: "-160°C",
    isPopular: true,
    price: "$750,000",
    color: "linear-gradient(135deg, #00c6ff, #0072ff)",
    glowColor: "rgba(0, 114, 255, 0.4)",
    features: [
      "Sub-ice submarine exploration of the liquid abyss",
      "Witness Jupiter rising over the cracked icy horizon",
      "Study bio-luminescent aquatic micro-organisms"
    ]
  },
  {
    id: "titan",
    name: "Titan",
    type: "moon",
    tagline: "The Liquid Methane Sea",
    description: "Titan is Saturn's largest moon and the only moon in the solar system with a dense atmosphere. It features stable bodies of surface liquid methane and ethane, creating a surreal landscape where humanity can fly easily using artificial wings.",
    distance: "1.2 Billion km",
    travelTime: "7 Years",
    temperature: "-179°C",
    isPopular: false,
    price: "$1,200,000",
    color: "linear-gradient(135deg, #f7b733, #fc4a1a)",
    glowColor: "rgba(252, 74, 26, 0.4)",
    features: [
      "Low-gravity wingsuit flying through thick golden skies",
      "Boating expedition on Kraken Mare, the largest hydrocarbon sea",
      "Spectacular view of Saturn's glowing rings from the surface"
    ]
  },
  {
    id: "kepler186f",
    name: "Kepler-186f",
    type: "planet",
    tagline: "The Red Dwarf Earth-Cousin",
    description: "Located in the constellation Cygnus, Kepler-186f is the first validated Earth-size planet orbiting a distant star in its habitable zone. Orbiting a red dwarf star, its sunlight is warmer and redder, giving it beautiful crimson-colored vegetation.",
    distance: "582 Light Years",
    travelTime: "Cryo-Sleep (40 Years)",
    temperature: "-4°C",
    isPopular: true,
    price: "$5,500,000",
    color: "linear-gradient(135deg, #b06ab3, #4568dc)",
    glowColor: "rgba(69, 104, 220, 0.4)",
    features: [
      "Walk among exotic red-leafed forests photosynthesized by red dwarf light",
      "Experience a planetary year that lasts only 130 Earth days",
      "View the twin stellar constellations visible from the outer rim"
    ]
  },
  {
    id: "enceladus",
    name: "Enceladus",
    type: "moon",
    tagline: "The Geyser Playground",
    description: "Enceladus is Saturn's sixth-largest moon, mostly covered by fresh, clean ice, making it one of the most reflective bodies in the solar system. It shoots continuous high-velocity geysers of salty water from its southern polar region.",
    distance: "1.27 Billion km",
    travelTime: "6.5 Years",
    temperature: "-201°C",
    isPopular: false,
    price: "$950,000",
    color: "linear-gradient(135deg, #7fffd4, #4682b4)",
    glowColor: "rgba(127, 255, 212, 0.4)",
    features: [
      "Witness massive geyser eruptions ejecting water vapor into Saturn's rings",
      "Skiing down snow dunes made of crystalline geyser ice",
      "Collect organic molecules directly from venting plumes"
    ]
  }
];

export const crew = [
  {
    id: "commander",
    name: "Dr. Sarah Jenkins",
    role: "Expedition Commander",
    bio: "Ex-NASA astrophysicist and spaceflight veteran with over 5,000 hours in orbit. Led the first manned scouting flight to Ceres.",
    specialty: "Astro-navigation & Team Leadership",
    avatar: "👩‍🚀"
  },
  {
    id: "engineer",
    name: "Marcus Vance",
    role: "Chief Propulsion Engineer",
    bio: "Pioneered the hybrid nuclear thermal engines used in our deep-space transport vessels. If it has thrusters, he can fly or fix it.",
    specialty: "Fusion Drive Systems & EVA Operations",
    avatar: "👨‍🔧"
  },
  {
    id: "geologist",
    name: "Dr. Kenji Tanaka",
    role: "Lead Planetary Geologist",
    bio: "Spent three years living on the moon analyzing crater deposits. Specialist in resource extraction and subsurface ice routing.",
    specialty: "Mineral Scouting & Habitability Assays",
    avatar: "👨‍🔬"
  }
];
