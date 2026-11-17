export const TRUCK_MODELS = [
  {
    id: 'ford-superduty',
    name: 'Ford F-250 / F-350 Super Duty',
    sub: 'High-Output 6.7L PowerStroke V8 Turbo Diesel',
    yearRange: '2023 – 2026',
    description: 'Iconic C-clamp LED perimeter lighting, dual-beam high output, boxed high-strength steel frame.',
    renderFullGuard: '/assets/renders/ford-f350-fullguard.jpg',
    renderStubby: '/assets/renders/ford-f350-stubby.jpg',
    renderPreRunner: '/assets/renders/ford-f350-prerunner.jpg',
    renderSmooth: '/assets/renders/ford-f350-fullguard.jpg',
    defaultRender: '/assets/renders/ford-f350-fullguard.jpg',
    badge: 'Flagship Platform'
  },
  {
    id: 'ram-hd',
    name: 'Ram 2500 / 3500 Heavy Duty',
    sub: '6.7L High-Output Cummins Turbo Diesel',
    yearRange: '2022 – 2026',
    description: 'Sculpted muscular hood bulge, aggressive forward-raked grille, and heavy frame horns.',
    renderFullGuard: '/assets/renders/ram-2500-winch.jpg',
    renderStubby: '/assets/renders/ram-2500-winch.jpg',
    renderPreRunner: '/assets/renders/ram-2500-winch.jpg',
    renderSmooth: '/assets/renders/ram-2500-winch.jpg',
    defaultRender: '/assets/renders/ram-2500-winch.jpg',
    badge: 'Torque Monster'
  },
  {
    id: 'chevy-2500hd',
    name: 'Chevy Silverado 2500HD / 3500HD',
    sub: '6.6L Duramax Turbo-Diesel / Allison 10-Speed',
    yearRange: '2024 – 2026',
    description: 'High Country / Z71 chiseled hood scoop, dual-tier projector headlights, and broad stance.',
    renderFullGuard: '/assets/renders/chevy-2500hd-smooth.jpg',
    renderStubby: '/assets/renders/chevy-2500hd-smooth.jpg',
    renderPreRunner: '/assets/renders/chevy-2500hd-smooth.jpg',
    renderSmooth: '/assets/renders/chevy-2500hd-smooth.jpg',
    defaultRender: '/assets/renders/chevy-2500hd-smooth.jpg',
    badge: 'Heavy Hauler'
  },
  {
    id: 'gmc-sierra-hd',
    name: 'GMC Sierra 2500HD Denali / AT4',
    sub: '6.6L Duramax V8 Turbo-Diesel',
    yearRange: '2024 – 2026',
    description: 'Denali signature chrome/slate industrial grille, dual C-shaped LED accents, premium stance.',
    renderFullGuard: '/assets/renders/gmc-sierra-denali.jpg',
    renderStubby: '/assets/renders/gmc-sierra-denali.jpg',
    renderPreRunner: '/assets/renders/gmc-sierra-denali.jpg',
    renderSmooth: '/assets/renders/gmc-sierra-denali.jpg',
    defaultRender: '/assets/renders/gmc-sierra-denali.jpg',
    badge: 'Luxury Industrial'
  }
];

export const BUMPER_STYLES = [
  {
    id: 'full-grille-guard',
    name: 'Full Grille Guard Ranch Bumper',
    tagline: 'Maximum Elk, Deer & Open-Range Livestock Defense',
    leadTime: '2 – 3 Weeks',
    basePrice: 2450,
    weight: '198 lbs',
    specs: [
      '2" Heavy Schedule-40 steel pipe wraparound loops',
      'Punched steel mesh center radiator screen',
      '3/16" CNC laser-cut plate base structure',
      '1/4" Direct chassis horn mounting brackets'
    ],
    description: "Our signature Northwest Colorado ranch defense bumper. Engineered to withstand high-speed animal impacts on rural mountain passes while keeping your cooling system 100% operational.",
    badge: "Jack's Signature",
    previewImage: '/assets/renders/ford-f350-fullguard.jpg'
  },
  {
    id: 'stubby-winch',
    name: 'Winch-Ready Stubby Off-Road Bumper',
    tagline: 'High-Clearance 45° Rock Crawler Stance & Approach Angle',
    leadTime: '1 – 2 Weeks',
    basePrice: 1850,
    weight: '138 lbs',
    specs: [
      '45° angled faceted wings clearing 35"-37" tires',
      'Recessed low-center-of-gravity winch tray',
      'Dual 1" thick welded recovery clevis tabs',
      'High approach angle for steep mountain passes'
    ],
    description: "Built for technical rocky ascents, backcountry trails, and extreme approach angles without sacrificing heavy recovery and winch pulling capacity.",
    badge: 'Trail Ready',
    previewImage: '/assets/renders/ford-f350-stubby.jpg'
  },
  {
    id: 'classic-smooth-plate',
    name: 'Heavy-Duty Smooth Plate Bumper',
    tagline: 'Sleek Brake-Formed Contours with Pre-Runner Push Bar',
    leadTime: '2 Weeks',
    basePrice: 2150,
    weight: '165 lbs',
    specs: [
      'CNC brake-formed 3/16" steel plate',
      '1.75" DOM mandrel-bent center bull bar',
      'Recessed outer pocket lighting cutouts',
      'OEM parking sensor & camera compatible'
    ],
    description: "Clean, sculpted lines that hug modern HD truck bodywork. Delivers commercial-grade steel armor with a refined, aerodynamic OEM+ finish.",
    badge: 'Clean Utility',
    previewImage: '/assets/renders/chevy-2500hd-smooth.jpg'
  },
  {
    id: 'prerunner-baja',
    name: 'Pre-Runner Baja Tubular Bumper',
    tagline: 'Tubular DOM Steel with Integrated Front Skid Plate',
    leadTime: '2 Weeks',
    basePrice: 2250,
    weight: '145 lbs',
    specs: [
      '1.75" x .120 wall DOM steel tubular structure',
      '1/4" laser-cut aluminum front skid shield',
      'Top-mounted 20" LED light bar tabs',
      'Exposed front suspension & maximum airflow'
    ],
    description: "High-speed desert and rally inspired protection. Lightweight yet virtually indestructible front bash protection designed for severe washboard trails.",
    badge: 'Baja Spec',
    previewImage: '/assets/renders/ford-f350-prerunner.jpg'
  }
];

export const PAINT_COLORS = [
  {
    id: 'oxford-white',
    name: 'Oxford White',
    hex: '#F4F6F9',
    blendColor: 'rgba(255, 255, 255, 0.22)',
    cssFilter: 'brightness(1.05) contrast(1.02)',
    tag: 'Fleet Pure'
  },
  {
    id: 'agate-black',
    name: 'Agate / Shadow Black',
    hex: '#111215',
    blendColor: 'rgba(12, 13, 16, 0.45)',
    cssFilter: 'brightness(0.82) contrast(1.15)',
    tag: 'Midnight Gloss'
  },
  {
    id: 'iconic-silver',
    name: 'Iconic Silver Metallic',
    hex: '#9CA3AF',
    blendColor: 'rgba(156, 163, 175, 0.25)',
    cssFilter: 'brightness(0.96) contrast(1.06)',
    tag: 'Liquid Metal'
  },
  {
    id: 'rapid-red',
    name: 'Rapid Red / Crimson Tint',
    hex: '#A51D24',
    blendColor: 'rgba(165, 29, 36, 0.28)',
    cssFilter: 'sepia(0.2) hue-rotate(-15deg) saturate(1.4)',
    tag: 'High Visibility'
  },
  {
    id: 'antimatter-blue',
    name: 'Antimatter Blue Metallic',
    hex: '#162238',
    blendColor: 'rgba(22, 34, 56, 0.32)',
    cssFilter: 'hue-rotate(185deg) saturate(1.1) brightness(0.92)',
    tag: 'Deep Metallic'
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand / Mojave Tan',
    hex: '#C2B295',
    blendColor: 'rgba(194, 178, 149, 0.3)',
    cssFilter: 'sepia(0.35) saturate(1.15) brightness(0.98)',
    tag: 'Overland Earth'
  }
];

export const FINISH_OPTIONS = [
  {
    id: 'matte-black',
    name: 'Textured Matte Black Powder Coat',
    sub: 'Industrial UV-resistant architectural dual-stage powder',
    price: 0,
    badge: 'Standard Factory'
  },
  {
    id: 'raw-steel',
    name: 'Raw CNC Brushed Steel (Golden TIG Welds)',
    sub: 'Oiled bare 3/16" steel showing precision hand weld passes',
    price: 120,
    badge: 'Fabricator Spec'
  },
  {
    id: 'color-match',
    name: 'Color-Matched OEM Paint Code',
    sub: 'Two-stage catalyzed urethane matched to factory truck body',
    price: 380,
    badge: 'Custom Studio'
  },
  {
    id: 'bedliner',
    name: 'Kevlar-Infused Polyurea Bedliner',
    sub: 'Maximum impact, gravel blast, and rock-chip barrier',
    price: 250,
    badge: 'Extreme Defense'
  }
];

export const WINCH_OPTIONS = [
  {
    id: 'none',
    name: 'Integrated 1/4" Winch Tray Only',
    sub: 'Pre-drilled 10" x 4.5" mounting pattern ready for future winch',
    price: 0
  },
  {
    id: 'warn-12k',
    name: '12,000 lb Warn VR-EVO Winch + Synthetic Line',
    sub: 'Turnkey installed with aluminum hawse fairlead and wireless remote',
    price: 950
  }
];

export const OPTICS_OPTIONS = {
  lightBar: {
    id: 'lightBar',
    name: 'Quake LED 20" Center Light Bar',
    sub: '18,500 lumens spot/flood combo beam with IP68 waterproof housing',
    price: 320
  },
  fogPods: {
    id: 'fogPods',
    name: 'Dual Quake LED Driving Fog Pods',
    sub: 'High-output 3" cubes recessed into outer bumper pockets',
    price: 180
  }
};

export const HARDWARE_OPTIONS = {
  shackles: {
    id: 'shackles',
    name: '3/4" Forged D-Ring Recovery Shackles',
    sub: '4.75-ton working load limit with anti-rattle urethane isolators',
    price: 75
  },
  logoPlate: {
    id: 'logoPlate',
    name: 'Custom CNC Laser-Cut Center Logo Plate',
    sub: 'Stainless steel "JACK\'S BUMPERS CRAIG, CO" or custom ranch brand',
    price: 120
  }
};

export const REAL_BUILDS_GALLERY = [
  {
    id: 'ford-sd-build',
    title: 'Ford F-350 Super Duty Ranch Defender',
    truck: 'Ford Super Duty',
    bumper: 'Full Grille Guard with 2" Schedule-40 Pipe',
    location: 'Craig, Colorado',
    image: '/assets/real-builds/ford-superduty-real.jpg',
    description: 'Fabricated for Northwest Colorado winter highways and livestock pastures. High-tensile steel punch plate protects radiators from deer and elk strikes.'
  },
  {
    id: 'chevy-2500-build',
    title: 'Chevy Silverado 2500HD Ranch Edition',
    truck: 'Chevy Silverado 2500HD',
    bumper: 'Custom Full Guard with Diamond Plate Step Deck',
    location: 'Yampa Valley, CO',
    image: '/assets/real-builds/chevy-2500-real.jpg',
    description: 'Dual-tier headlight hoops with integrated step plate for easy engine bay access in the field.'
  },
  {
    id: 'ram-3500-build',
    title: 'Ram 3500 Heavy Duty Winch Rig',
    truck: 'Ram 2500 / 3500 HD',
    bumper: 'Heavy Duty Winch Bumper & Grille Shield',
    location: 'Moffat County, CO',
    image: '/assets/real-builds/ram-3500-real.jpg',
    description: 'Equipped with heavy-duty winch deck, recovery clevis points, and recessed light mounts for backcountry hauling.'
  },
  {
    id: 'full-ranch-build',
    title: 'Commercial Ranch Guard Heavy Duty',
    truck: 'Super Duty Utility',
    bumper: 'Full Headlight Wraparound & Punch Plate Center',
    location: 'Northwest Colorado',
    image: '/assets/real-builds/fullguard-ranch-real.jpg',
    description: 'Custom punched steel mesh center section keeps highway gravel and road debris away from expensive intercoolers.'
  },
  {
    id: 'custom-welding-build',
    title: 'Custom Fabricated Shop Specimen',
    truck: 'Heavy Duty Platform',
    bumper: 'Handcrafted Precision TIG & MIG Welded Steel',
    location: "Jack's Bumpers Shop, Craig, CO",
    image: '/assets/real-builds/custom-welding-real.jpg',
    description: 'Demonstrating hand-welded seam strength and 3/16" steel plate construction built to outlast the truck itself.'
  }
];

export const SHOP_INFO = {
  name: "Jack's Bumpers",
  tagline: "Protecting Your Investments.",
  phone: "970-824-2423",
  email: "contact@jacksbumpers.com",
  address: "350 Russell St, Craig, CO 81625, USA",
  hours: "Monday – Friday: 8:00 AM – 5:00 PM MST"
};
