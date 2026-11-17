export const configuratorData = {
  vehicles: [
    {
      id: 'ford',
      code: 'F250',
      name: 'Ford Super Duty (F-250 / F-350)',
      years: '2017 - 2026',
      badge: 'OEM Radar Compatible',
      make: 'Ford',
      model: 'Super Duty (F-250 / F-350)',
      sensorVerification: {
        accRadar: 'ACC Radar Relocation Bracket Included',
        parkingSensors: '4x OEM Ultrasonic Sensor Cutouts Pre-Drilled',
        frontCamera: 'Front 360° Grille Camera Bracket Verified'
      },
      images: {
        hero: '/assets/renders/ford-f350-fullguard.jpg',
        side: '/assets/renders/ford-f350-profile-side.jpg',
        front: '/assets/renders/ford-f350-headon.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    },
    {
      id: 'ram',
      code: 'RAM',
      name: 'RAM Heavy Duty (2500 / 3500)',
      years: '2019 - 2026',
      badge: 'Heavy Gauge Mount',
      make: 'RAM',
      model: 'Heavy Duty (2500 / 3500)',
      sensorVerification: {
        accRadar: 'Forward Collision Warning Radar Retained',
        parkingSensors: 'ParkSense Front Cutouts with Rubber Isolators',
        frontCamera: 'Integrated Center Camera Sightline Clear'
      },
      images: {
        hero: '/assets/renders/ram-2500-winch.jpg',
        side: '/assets/renders/ford-f350-profile-side.jpg',
        front: '/assets/renders/ram-2500-winch.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    },
    {
      id: 'chevy',
      code: 'CHV',
      name: 'Chevy Silverado HD (2500HD / 3500HD)',
      years: '2020 - 2026',
      badge: 'Integrated Tow Hooks',
      make: 'Chevy',
      model: 'Silverado HD (2500HD / 3500HD)',
      sensorVerification: {
        accRadar: 'Chevy Safety Assist Radar Line-of-Sight Tested',
        parkingSensors: 'Front Park Assist Sensor Bezels Included',
        frontCamera: 'HD Surround Vision Camera Clearance Calibrated'
      },
      images: {
        hero: '/assets/renders/chevy-2500hd-smooth.jpg',
        side: '/assets/renders/ford-f350-profile-side.jpg',
        front: '/assets/renders/chevy-2500hd-smooth.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    }
  ],
  series: [
    {
      id: 'apex',
      code: 'APX',
      name: 'Apex Commercial Full-Width',
      basePrice: 1899,
      weight: '165 lbs',
      numericWeight: 165,
      winchCapacity: '16,500 lbs Rating',
      desc: 'Full-width heavy steel protection with integrated winch tray and reinforced gussets.',
      approachGain: 6.5,
      steelGauge: '1/4" A36 Center / 3/16" Wings',
      badge: 'Flagship Protection',
      heroImage: '/assets/renders/ford-f350-fullguard.jpg'
    },
    {
      id: 'trail',
      code: 'TRL',
      name: 'Trail Defender Stubby',
      basePrice: 1749,
      weight: '140 lbs',
      numericWeight: 140,
      winchCapacity: '12,000 lbs Rating',
      desc: 'Max-clearance tapered wings engineered for extreme off-road articulation and wheel clearance.',
      approachGain: 11.5,
      steelGauge: '3/16" Plate + 1.75" DOM Tubing',
      badge: 'Max Clearance',
      heroImage: '/assets/renders/ford-f350-prerunner.jpg'
    }
  ],
  finishes: [
    {
      id: 'matte-black',
      code: 'MB',
      name: 'Wrinkle Black Powder Coat',
      price: 0,
      desc: 'UV-resistant industrial tactical textured finish.',
      durabilityRating: '9.6 / 10',
      gradient: 'linear-gradient(135deg, #22262E 0%, #0F1115 100%)',
      cssFilter: 'contrast(1.15) brightness(0.92)'
    },
    {
      id: 'hammered',
      code: 'HG',
      name: 'Industrial Hammered Gray',
      price: 150,
      desc: 'Heavy armor tactical corrosion barrier.',
      durabilityRating: '9.9 / 10',
      gradient: 'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)',
      cssFilter: 'contrast(1.08) brightness(1.05) saturate(0.85)'
    },
    {
      id: 'stainless',
      code: 'SS',
      name: 'Raw Brushed Stainless Steel',
      price: 350,
      desc: 'Mirror polished marine-grade stainless steel overlay.',
      durabilityRating: '10.0 / 10',
      gradient: 'linear-gradient(135deg, #E2E8F0 0%, #64748B 100%)',
      cssFilter: 'contrast(1.22) brightness(1.25) saturate(0.7)'
    }
  ],
  addons: [
    {
      id: 'grilleGuard',
      code: 'GG',
      name: 'Full Grille Guard & Stinger Hoop',
      price: 450,
      desc: 'Protects headlights and radiator grille from animal strikes.',
      weight: 42,
      badge: 'Ranch Defense'
    },
    {
      id: 'ledPods',
      code: 'LED',
      name: 'Dual LED Fog Light Pods (Amber/White)',
      price: 280,
      desc: 'High-output auxiliary flood beam lighting.',
      weight: 12,
      badge: 'Quake Optics'
    },
    {
      id: 'winch',
      code: 'WN',
      name: 'Warn 16.5ti Heavy Duty Winch',
      price: 1450,
      desc: 'Factory pre-installed waterproof commercial recovery winch.',
      weight: 92,
      badge: 'Turnkey Installed'
    },
    {
      id: 'shackles',
      code: 'SHK',
      name: 'Forged 3/4" D-Ring Shackles (Pair)',
      price: 85,
      desc: 'Powder-coated safety amber heavy towing points.',
      weight: 7,
      badge: 'Recovery Spec'
    }
  ]
};

// Aliases for clean backward compatibility
export const VEHICLE_PLATFORMS = configuratorData.vehicles;
export const BUMPER_SERIES = configuratorData.series;
export const ARMOR_FINISHES = configuratorData.finishes;
export const UPFIT_OPTIONS = configuratorData.addons;

export const SPEC_HOTSPOTS = [
  {
    id: 'winch-tray',
    label: '1/4" A36 Steel Winch Cradle',
    coords: { x: '50%', y: '64%' },
    title: 'Recessed Heavy Winch Cradle',
    specs: [
      '1/4" thick A36 structural steel mounting deck',
      'Dual bolt patterns: standard 10"x4.5" & 10"x8" heavy foot-mount',
      'Tested to withstand over 24,000 lbs break-strength pull load',
      'Low center-of-gravity placement protects cooling airflow'
    ]
  },
  {
    id: 'steel-gauge',
    label: 'Gusseted Impact Structure',
    coords: { x: '35%', y: '58%' },
    title: 'Multi-Bend CNC Formed Shell',
    specs: [
      '1/4" center impact zone with 3/16" outer wing facets',
      'Precision CNC hydraulic press brake formed for max tensile rigidity',
      'Internal vertical gusset ribs tied directly to chassis mounting horns',
      'Resists severe frontal wildlife collision impacts'
    ]
  },
  {
    id: 'sensor-relocation',
    label: 'OEM Sensor & Radar Integration',
    coords: { x: '24%', y: '48%' },
    title: 'Factory Electronics Retention',
    specs: [
      'Laser-cut cutouts for all front OEM ultrasonic park sensors',
      'Custom adaptive cruise control (ACC) radar relocation bracket',
      'Forward collision warning & 360° front camera unobstructed',
      'Plug-and-play harness extensions included'
    ]
  },
  {
    id: 'recovery-tabs',
    label: '1" Solid Steel Clevis Tabs',
    coords: { x: '66%', y: '72%' },
    title: 'Through-Weld Recovery Points',
    specs: [
      '1" thick solid ASTM A572 Grade 50 steel clevis tabs',
      'Passed through the bumper face and welded both inside and out',
      'Transfers recovery load directly to truck frame horns',
      'Accepts standard 3/4" and 7/8" screw-pin recovery shackles'
    ]
  }
];

export const CAMERA_ANGLES = [
  { id: 'hero', label: '3/4 Hero Front' },
  { id: 'side', label: 'Profile Side' },
  { id: 'front', label: 'Head-On Grill' },
  { id: 'macro', label: 'Detail Macro' }
];

export function generatePartNumber(vehicle, bumper, finish, addons) {
  const vCode = vehicle?.code || 'F250';
  const bCode = bumper?.code || 'APX';
  const fCode = finish?.code || 'MB';
  
  const addonCodes = [];
  if (addons?.grilleGuard) addonCodes.push('GG');
  if (addons?.winch) addonCodes.push('WN');
  if (addons?.ledPods || addons?.lightBar) addonCodes.push('LED');
  if (addons?.shackles) addonCodes.push('SHK');

  const addonSuffix = addonCodes.length > 0 ? `-${addonCodes.join('-')}` : '';
  return `JB-${vCode}-${bCode}-${fCode}${addonSuffix}`;
}

export const REAL_BUILDS = [
  {
    id: 'ford-sd-build',
    title: 'Ford Super Duty Ranch Spec',
    truck: 'Ford Super Duty',
    bumper: 'Apex Commercial Full-Width + Grille Guard',
    location: 'Craig, CO',
    image: '/assets/real-builds/ford-superduty-real.jpg',
    description: 'Custom heavy-duty ranch bumper with full pipe wraparound headlight hoops, recessed receiver, and 3/16" plate body.'
  },
  {
    id: 'chevy-2500-build',
    title: 'Chevy Silverado HD Ranch Armor',
    truck: 'Chevy Silverado HD',
    bumper: 'High-Impact Full Grille Shield',
    location: 'Steamboat Springs, CO',
    image: '/assets/real-builds/chevy-2500-real.jpg',
    description: 'Dual-tier headlight hoops with integrated step plate for easy engine bay access in the field.'
  },
  {
    id: 'ram-3500-build',
    title: 'RAM Heavy Duty Winch Rig',
    truck: 'RAM Heavy Duty',
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
