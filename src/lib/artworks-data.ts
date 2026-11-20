export type ArtworkCategory =
  | "Cyborg Sculptures"
  | "Biomechanical"
  | "Android Figuratives"
  | "Kinetic Installations";

export interface Artwork {
  id: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  year: number;
  artist: string;
  artistOrigin: string;
  medium: string;
  dimensions: string;
  provenance: string;
  curatorNote: string;
  audioDuration: string;
  audioTranscript: string;
  specs: {
    actuatorCount: number;
    sensorSystem: string;
    powerArchitecture: string;
    structuralAlloy: string;
    totalMass: string;
  };
  image: string;
  category: ArtworkCategory;
  wing: string;
  award?: string;
}

export interface AnatomyPlate {
  id: string;
  index: string;
  region: string;
  title: string;
  material: string;
  summary: string;
  craftDetail: string;
  pinX: number;
  pinY: number;
  focusOrigin: string;
  focusScale: number;
}

export interface ExhibitionChapter {
  number: string;
  title: string;
  tagline: string;
  description: string;
  curator: string;
  count: string;
  wing: string;
  categoryFilter: ArtworkCategory;
}

export interface ScheduleSession {
  id: string;
  time: string;
  title: string;
  speaker: string;
  role: string;
  location: string;
  capacity: string;
}

export const SPECIMEN_ANATOMY_PLATES: AnatomyPlate[] = [
  {
    id: "cranial-shell",
    index: "Plate 01",
    region: "Cranial Shell",
    title: "Zirconia Ceramic Faceplate",
    material: "Sintered ZrO2 Bio-Ceramic · Matte Alabaster Finish",
    summary:
      "Slip-cast and five-axis milled medical zirconia engineered to evoke classical marble bust portraiture while dissipating internal thermal load.",
    craftDetail:
      "0.4 mm micro-ventilation tolerances across cheek and temporal seams.",
    pinX: 60,
    pinY: 36,
    focusOrigin: "58% 36%",
    focusScale: 1.28,
  },
  {
    id: "optical-visor",
    index: "Plate 02",
    region: "Ocular Array",
    title: "Polarized Polycarbonate Visor",
    material: "Smoked Optical Graphene Laminate · Anodized Frame",
    summary:
      "Conceals dual stereoscopic depth cameras behind an obsidian plane, preserving sculptural stillness while tracking gallery visitor proximity.",
    craftDetail:
      "Anti-reflective vapor-deposited coating calibrated for directional spotlights.",
    pinX: 67,
    pinY: 31,
    focusOrigin: "66% 31%",
    focusScale: 1.38,
  },
  {
    id: "acoustic-receptor",
    index: "Plate 03",
    region: "Temporal Assembly",
    title: "Acoustic Resonance Housing",
    material: "Bead-Blasted Aluminum & Electroluminescent Ring",
    summary:
      "Binaural condenser capsules housed within a precision-turned rotary collar allow the sculpture to orient subtly toward ambient sound in the hall.",
    craftDetail:
      "Machined 6061-T6 housing with recessed perimeter diffused light ring.",
    pinX: 43,
    pinY: 35,
    focusOrigin: "44% 35%",
    focusScale: 1.32,
  },
  {
    id: "cervical-column",
    index: "Plate 04",
    region: "Cervical Spine",
    title: "Articulated Titanium Vertebrae",
    material: "Grade 5 Titanium (Ti-6Al-4V) & Braided Elastomer Conduits",
    summary:
      "Twelve interlocking spinal segments paired with twin hydraulic dampers create deliberate, measured head poise rather than rigid mechanical snaps.",
    craftDetail:
      "Hand-lapped bearing races paired with silent low-friction tendon cables.",
    pinX: 43,
    pinY: 60,
    focusOrigin: "45% 60%",
    focusScale: 1.32,
  },
];

export const EXHIBITION_ARTWORKS: Artwork[] = [
  {
    id: "specimen-48",
    accessionNumber: "ACC. 2026.04.48",
    title: "Specimen 48: The Synthetic Oracle",
    subtitle: "Ceramic Exoskeleton and Neural Visor Study",
    year: 2026,
    artist: "Elena Vance & Studio Synthetica",
    artistOrigin: "Kyoto / Zurich",
    medium:
      "Zirconia ceramic faceplate, Grade 5 titanium cervical vertebrae, optical fibre loom, anodized aluminum collar",
    dimensions: "64 × 38 × 42 cm",
    provenance: "Commissioned for Pavilion 48 Permanent Collection, Zurich",
    curatorNote:
      "Specimen 48 sits at the threshold between classical portraiture and precision robotics. Its matte alabaster ceramic shell recalls Greco-Roman marble, yet breaks cleanly along the jawline to expose a living architecture of titanium vertebrae and silent hydraulic tendons.",
    audioDuration: "1 min 42 sec",
    audioTranscript:
      "Welcome to Specimen 48, The Synthetic Oracle. Observe how the matte white ceramic faceplate meets the dark anodized cranial dome. Rather than hiding its machinery beneath synthetic skin, Elena Vance elevates the titanium cervical column and braided conduits into pure sculptural line.",
    specs: {
      actuatorCount: 48,
      sensorSystem: "Stereoscopic Optical & Binaural Array",
      powerArchitecture: "Pedestal-Coupled Inductive Base",
      structuralAlloy: "Ti-6Al-4V Medical Titanium & ZrO2",
      totalMass: "18.4 kg",
    },
    image: "/assets/images/exhibition_robot_bust_1791180784535.jpg",
    category: "Cyborg Sculptures",
    wing: "North Wing · Gallery A",
    award: "Grand Prix — Venice Digital Biennale 2026",
  },
  {
    id: "specimen-chrome-skull",
    accessionNumber: "ACC. 2026.04.12",
    title: "Biomechanical Torso & Cranium IX",
    subtitle: "Suspended Cybernetic Anatomical Vessel",
    year: 2026,
    artist: "Klaus Richter & H.R. Foundry",
    artistOrigin: "Berlin",
    medium:
      "Mirror-finished steel alloy, carbon-fiber matrix, braided Kevlar conduits, pneumatic dampeners",
    dimensions: "98 × 52 × 44 cm",
    provenance: "On loan from Sammlung Richter, Berlin",
    curatorNote:
      "Suspended in tension within an illuminated architectural oculus, Richter's ninth anatomical vessel strips away all figurative skin. Unterminated umbilical cables hang beneath the ribcage like anatomical roots suspended in mid-air.",
    audioDuration: "1 min 28 sec",
    audioTranscript:
      "Standing before Biomechanical Torso IX, notice the deliberate contrast between the mirror-polished cranium and the dark, matte graphite clavicle struts. The loose hanging cables below the pelvis evoke both botanical roots and severed industrial looms.",
    specs: {
      actuatorCount: 64,
      sensorSystem: "Dual Depth Optical Array",
      powerArchitecture: "Overhead Suspension Bus",
      structuralAlloy: "Forged Carbon Inconel & Steel",
      totalMass: "31.2 kg",
    },
    image: "/assets/images/exhibition_biomech_torso_1791180795026.jpg",
    category: "Biomechanical",
    wing: "Central Atrium · Gallery B",
    award: "Distinction — Ars Electronica 2026",
  },
  {
    id: "specimen-android-monolith",
    accessionNumber: "ACC. 2026.04.22",
    title: "Autonomous Figure in Contemplation",
    subtitle: "Full-Scale Porcelain & Carbon Android",
    year: 2025,
    artist: "Mayumi Sato & Neo-Anatomy Guild",
    artistOrigin: "Tokyo",
    medium:
      "High-density porcelain polymer casting, aerospace aluminum armature, carbon-weave joints, raw limestone plinth",
    dimensions: "182 × 56 × 48 cm",
    provenance: "Acquired following the Tokyo Art Triennale 2025",
    curatorNote:
      "Positioned atop rough-hewn limestone at full human stature, Sato's figure folds its articulated hands in stillness. Micro-adjustments in posture occur so slowly across hours that movement is felt rather than seen.",
    audioDuration: "1 min 54 sec",
    audioTranscript:
      "Mayumi Sato pairs an unpolished block of quarry limestone with ultra-smooth porcelain polymer limbs. By clasping the figure's hands in quiet repose, the work redirects attention from spectacle toward presence and weight.",
    specs: {
      actuatorCount: 112,
      sensorSystem: "Distributed Equilibrium Gyroscopes",
      powerArchitecture: "Internal Solid-State Cell",
      structuralAlloy: "7075-T6 Aerospace Aluminum",
      totalMass: "64.0 kg",
    },
    image: "/assets/images/exhibition_android_statue_1791180805512.jpg",
    category: "Android Figuratives",
    wing: "South Wing · Hall of Echoes",
    award: "Sculpture Prize — Tokyo Art Triennale",
  },
  {
    id: "specimen-tactile-hand",
    accessionNumber: "ACC. 2026.04.37",
    title: "The Synthesist's Touch",
    subtitle: "Macro Bionic Hand with Photonic Polyhedron",
    year: 2026,
    artist: "Dr. Aris Thorne & Biomimetic Labs",
    artistOrigin: "London / Geneva",
    medium:
      "Machined titanium phalanges, carbon-fiber forearm chassis, optical waveguide crystal",
    dimensions: "52 × 34 × 30 cm",
    provenance: "Courtesy of Galerie Nord, Geneva",
    curatorNote:
      "Capturing the suspended tension between machined force and delicate contact, Thorne's articulated hand balances an internally lit geometric polyhedron through continuous micro-tendon feedback.",
    audioDuration: "1 min 18 sec",
    audioTranscript:
      "Look closely at the knuckle linkages along the index and middle fingers. Each joint relies on tensioned carbon tendons rather than bulky motors in the palm, achieving the slender silhouette of a Renaissance anatomical drawing.",
    specs: {
      actuatorCount: 22,
      sensorSystem: "Force-Sensitive Capacitive Pads",
      powerArchitecture: "24V Direct Pedestal Conduit",
      structuralAlloy: "Grade 23 ELI Titanium",
      totalMass: "4.8 kg",
    },
    image: "/assets/images/exhibition_bionic_hand_1791180816287.jpg",
    category: "Kinetic Installations",
    wing: "East Vault · Chamber IV",
    award: "Honorary Mention — Geneva Design Forum",
  },
];

export const EXHIBITION_CHAPTERS: ExhibitionChapter[] = [
  {
    number: "01",
    title: "Synthetic Anatomy & Ceramic Shells",
    tagline:
      "Bio-compatible metallurgy and porcelain sculpting in figurative robotics",
    description:
      "Examines how aerospace titanium and medical ceramics transform utilitarian actuators into serene sculptural surfaces reminiscent of classical marble.",
    curator: "Elena Vance",
    count: "18 Works",
    wing: "North Wing · Gallery A",
    categoryFilter: "Cyborg Sculptures",
  },
  {
    number: "02",
    title: "Biomechanical Nervous Systems",
    tagline:
      "The structural honesty of exposed cabling, struts, and tensioned rigs",
    description:
      "An unadorned gallery dedicated to works that turn mechanical architecture inside out—celebrating braided looms, pneumatic columns, and raw metal.",
    curator: "Klaus Richter",
    count: "14 Works",
    wing: "Central Atrium · Gallery B",
    categoryFilter: "Biomechanical",
  },
  {
    number: "03",
    title: "Kinetic Anthropomorphism",
    tagline: "Full-scale humanoid posture, stillness, and spatial presence",
    description:
      "Life-sized autonomous sculptures resting on quarry stone plinths, calibrated to subtle ambient shifts in light and gallery acoustics.",
    curator: "Mayumi Sato",
    count: "16 Works",
    wing: "South Wing · Hall of Echoes",
    categoryFilter: "Android Figuratives",
  },
  {
    number: "04",
    title: "Tactile Intelligence & Micro-Mechanisms",
    tagline:
      "Sub-millimeter dexterity, optical waveguides, and delicate equilibrium",
    description:
      "Close-range studies of bionic hands, tendon linkages, and light-refracting polyhedra demonstrating precision craft at miniature scale.",
    curator: "Dr. Aris Thorne",
    count: "12 Works",
    wing: "East Vault · Chamber IV",
    categoryFilter: "Kinetic Installations",
  },
];

export const EXHIBITION_SCHEDULE: ScheduleSession[] = [
  {
    id: "walkthrough",
    time: "10:30",
    title: "Curatorial Walkthrough: The Making of Specimen 48",
    speaker: "Elena Vance",
    role: "Lead Curator",
    location: "North Wing · Gallery A",
    capacity: "25 Guests",
  },
  {
    id: "kinetic-demo",
    time: "13:00",
    title: "Suspended Tension & Acoustic Calibration",
    speaker: "Klaus Richter",
    role: "Artist & Engineer",
    location: "Central Atrium · Gallery B",
    capacity: "40 Guests",
  },
  {
    id: "symposium",
    time: "15:30",
    title: "Symposium: Post-Humanist Portraiture in Ceramic & Alloy",
    speaker: "Mayumi Sato & Dr. Aris Thorne",
    role: "Visiting Fellows",
    location: "Lecture Amphitheater",
    capacity: "80 Seats",
  },
  {
    id: "nocturne",
    time: "19:30",
    title: "Nocturne Illumination & Chamber Resonance",
    speaker: "Pavilion Sound Ensemble",
    role: "Acoustic Residency",
    location: "South Wing · Hall of Echoes",
    capacity: "35 Guests",
  },
];
