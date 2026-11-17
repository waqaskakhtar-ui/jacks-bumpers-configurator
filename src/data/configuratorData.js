export const configuratorData = {
  vehicles: [
    {
      id: 'ford',
      name: 'Ford Super Duty (F-250 / F-350)',
      years: '2017 - 2026',
      badge: 'OEM Radar Compatible',
      code: 'FORD',
      images: {
        front: '/assets/renders/ford-f350-fullguard.jpg',
        profile: '/assets/renders/ford-f350-profile-side.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    },
    {
      id: 'ram',
      name: 'RAM Heavy Duty (2500 / 3500)',
      years: '2019 - 2026',
      badge: 'Heavy Gauge Mount',
      code: 'RAM',
      images: {
        front: '/assets/renders/ram-2500-winch.jpg',
        profile: '/assets/renders/ford-f350-profile-side.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    },
    {
      id: 'chevy',
      name: 'Chevy Silverado HD (2500HD / 3500HD)',
      years: '2020 - 2026',
      badge: 'Integrated Tow Hooks',
      code: 'CHEVY',
      images: {
        front: '/assets/renders/chevy-2500hd-smooth.jpg',
        profile: '/assets/renders/ford-f350-profile-side.jpg',
        macro: '/assets/renders/bumper-macro-detail.jpg'
      }
    }
  ],
  series: [
    { 
      id: 'apex', 
      name: 'Apex Commercial Full-Width', 
      basePrice: 1899, 
      weight: '165 lbs',
      winchCapacity: '16,500 lbs Rating',
      desc: 'Full-width heavy steel protection with integrated winch tray and reinforced gussets.',
      code: 'APX',
      approachGain: '+14.5°',
      steelGauge: '1/4" Plate / 3/16" Wings',
      leadTime: '2-3 Weeks',
      renders: {
        ford: '/assets/renders/ford-f350-fullguard.jpg',
        ram: '/assets/renders/ram-2500-winch.jpg',
        chevy: '/assets/renders/chevy-2500hd-smooth.jpg'
      }
    },
    { 
      id: 'trail', 
      name: 'Trail Defender Stubby', 
      basePrice: 1749, 
      weight: '140 lbs',
      winchCapacity: '12,000 lbs Rating',
      desc: 'Max-clearance tapered wings engineered for extreme off-road articulation and wheel clearance.',
      code: 'TRL',
      approachGain: '+18.0°',
      steelGauge: '3/16" High-Tensile Plate',
      leadTime: '1-2 Weeks',
      renders: {
        ford: '/assets/renders/ford-f350-prerunner.jpg',
        ram: '/assets/renders/ram-2500-winch.jpg',
        chevy: '/assets/renders/chevy-2500hd-smooth.jpg'
      }
    }
  ],
  finishes: [
    {
      id: 'matte-black',
      name: 'Wrinkle Black Powder Coat',
      price: 0,
      desc: 'UV-resistant industrial tactical textured finish.',
      code: 'MATTE-BLACK',
      cssFilter: 'contrast(1.15) brightness(0.92)'
    },
    {
      id: 'hammered',
      name: 'Industrial Hammered Gray',
      price: 150,
      desc: 'Heavy armor tactical corrosion barrier.',
      code: 'HAMMERED',
      cssFilter: 'contrast(1.08) brightness(1.05) saturate(0.85)'
    },
    {
      id: 'stainless',
      name: 'Raw Brushed Stainless Steel',
      price: 350,
      desc: 'Mirror polished marine-grade stainless steel overlay.',
      code: 'STAINLESS',
      cssFilter: 'contrast(1.22) brightness(1.25) saturate(0.7)'
    }
  ],
  addons: [
    {
      id: 'grilleGuard',
      name: 'Full Grille Guard & Stinger Hoop',
      price: 450,
      desc: 'Protects headlights and radiator grille from animal strikes.',
      code: 'GG',
      weight: 42
    },
    {
      id: 'ledPods',
      name: 'Dual LED Fog Light Pods (Amber/White)',
      price: 280,
      desc: 'High-output auxiliary flood beam lighting.',
      code: 'LED',
      weight: 12
    },
    {
      id: 'winch',
      name: 'Warn 16.5ti Heavy Duty Winch',
      price: 1450,
      desc: 'Factory pre-installed waterproof commercial recovery winch.',
      code: 'WN',
      weight: 92
    },
    {
      id: 'shackles',
      name: 'Forged 3/4" D-Ring Shackles (Pair)',
      price: 85,
      desc: 'Powder-coated safety amber heavy towing points.',
      code: 'SHK',
      weight: 7
    }
  ]
};

export const SPEC_HOTSPOTS = [
  {
    id: 'winch',
    label: '1/4" A36 Steel Winch Cradle',
    coords: { x: '50%', y: '64%' },
    title: 'Recessed Heavy Winch Cradle',
    specs: [
      '1/4" thick A36 structural steel mounting deck',
      'Tested to withstand over 24,000 lbs break-strength pull load',
      'Low center-of-gravity placement protects cooling airflow'
    ]
  },
  {
    id: 'gusset',
    label: 'Reinforced Gusseted Structure',
    coords: { x: '35%', y: '58%' },
    title: 'Multi-Bend CNC Formed Shell',
    specs: [
      '1/4" center impact zone with 3/16" outer wing facets',
      'Precision CNC hydraulic press brake formed for max tensile rigidity',
      'Internal vertical gusset ribs tied directly to chassis horns'
    ]
  },
  {
    id: 'radar',
    label: 'OEM Radar & Electronics Retention',
    coords: { x: '24%', y: '48%' },
    title: 'Factory Electronics Retention',
    specs: [
      'Laser-cut cutouts for front OEM ultrasonic park sensors',
      'Custom adaptive cruise control (ACC) radar relocation bracket',
      'Forward collision warning & 360° front camera unobstructed'
    ]
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
  }
];
