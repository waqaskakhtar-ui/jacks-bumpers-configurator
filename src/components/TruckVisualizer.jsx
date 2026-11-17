import React, { useMemo } from 'react';

/**
 * TruckVisualizer Component
 * 2.5D High-Contrast Vector Truck & Bumper Configurator Engine
 * Shared coordinate space: viewBox="0 0 1100 640"
 */
export default function TruckVisualizer({
  truckId,
  paintColor,
  bumperId,
  finishId,
  winchId,
  lighting,
  recovery,
  lightsOn,
  backdropMode
}) {
  // Determine finish colors
  const finishColors = useMemo(() => {
    if (finishId === 'color-match') {
      return {
        fill: paintColor.bodyFill,
        highlight: paintColor.highlight,
        shadow: paintColor.shadow,
        isRawSteel: false,
        isBedliner: false
      };
    }
    if (finishId === 'raw-steel') {
      return {
        fill: '#858C99',
        highlight: '#D8DEEB',
        shadow: '#494E5A',
        isRawSteel: true,
        isBedliner: false
      };
    }
    if (finishId === 'bedliner') {
      return {
        fill: '#15161A',
        highlight: '#2A2C33',
        shadow: '#0B0C0E',
        isRawSteel: false,
        isBedliner: true
      };
    }
    // Default Matte Black Powder Coat
    return {
      fill: '#22252C',
      highlight: '#3D424E',
      shadow: '#111317',
      isRawSteel: false,
      isBedliner: false
    };
  }, [finishId, paintColor]);

  return (
    <svg
      viewBox="0 0 1100 640"
      className="w-full h-full select-none"
      style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background Gradients */}
        <linearGradient id="skyDusk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="50%" stopColor="#1C2541" />
          <stop offset="80%" stopColor="#3A3845" />
          <stop offset="100%" stopColor="#C46D3B" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="groundCraig" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E2024" />
          <stop offset="35%" stopColor="#15171B" />
          <stop offset="100%" stopColor="#0E0F12" />
        </linearGradient>

        <linearGradient id="studioFloor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E222A" />
          <stop offset="50%" stopColor="#131519" />
          <stop offset="100%" stopColor="#0A0B0D" />
        </linearGradient>

        <radialGradient id="studioSpotlight" cx="45%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#3A4050" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#1E222A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#121316" stopOpacity="0" />
        </radialGradient>

        {/* Dynamic Truck Paint Gradient */}
        <linearGradient id="truckPaintGrad" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor={paintColor.highlight} />
          <stop offset="25%" stopColor={paintColor.bodyFill} />
          <stop offset="70%" stopColor={paintColor.bodyFill} />
          <stop offset="100%" stopColor={paintColor.shadow} />
        </linearGradient>

        <linearGradient id="truckHoodHighlight" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="40%" stopColor={paintColor.highlight} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>

        {/* Glass Tint Gradient */}
        <linearGradient id="windshieldTint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A394D" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#131C27" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0D131B" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="glassReflection" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>

        {/* Bumper Steel Gradient */}
        <linearGradient id="bumperSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={finishColors.highlight} />
          <stop offset="35%" stopColor={finishColors.fill} />
          <stop offset="75%" stopColor={finishColors.fill} />
          <stop offset="100%" stopColor={finishColors.shadow} />
        </linearGradient>

        <linearGradient id="bumperPipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={finishColors.highlight} />
          <stop offset="50%" stopColor={finishColors.fill} />
          <stop offset="100%" stopColor={finishColors.shadow} />
        </linearGradient>

        {/* Wheel Tire Tread & Rim */}
        <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2E333D" />
          <stop offset="45%" stopColor="#1A1C22" />
          <stop offset="70%" stopColor="#3B414E" />
          <stop offset="90%" stopColor="#0E1013" />
          <stop offset="100%" stopColor="#252932" />
        </radialGradient>

        <linearGradient id="tireTreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#202227" />
          <stop offset="60%" stopColor="#141518" />
          <stop offset="100%" stopColor="#090A0C" />
        </linearGradient>

        {/* Quake LED Glowing Effects */}
        <radialGradient id="ledGlowYellow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
          <stop offset="40%" stopColor="#FACC15" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#EAB308" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#CA8A04" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="volumetricBeam" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#FEF08A" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#FACC15" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
        </linearGradient>

        {/* Diamond Plate Pattern */}
        <pattern id="diamondPlate" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill={finishColors.fill} />
          <path d="M6 1 L11 6 L6 11 L1 6 Z" fill={finishColors.highlight} opacity="0.3" />
          <path d="M6 3 L9 6 L6 9 L3 6 Z" fill={finishColors.shadow} opacity="0.4" />
        </pattern>

        {/* Shadow under truck */}
        <radialGradient id="truckFloorShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Filter for glowing light beams */}
        <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="superGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur1" />
          <feGaussianBlur stdDeviation="5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ==================================================== */}
      {/* 1. STAGE & BACKDROP LAYER                            */}
      {/* ==================================================== */}
      {backdropMode === 'craig' ? (
        <g id="backdropCraig">
          {/* Sky */}
          <rect x="0" y="0" width="1100" height="420" fill="url(#skyDusk)" />
          {/* Alpine Mountain Silhouettes (Craig, Colorado Rockies / Black Mountain) */}
          <path
            d="M 0 350 L 120 280 L 260 330 L 410 240 L 520 290 L 680 210 L 820 295 L 940 230 L 1100 310 L 1100 420 L 0 420 Z"
            fill="#161B26"
            opacity="0.6"
          />
          <path
            d="M 0 380 L 80 340 L 190 365 L 340 310 L 460 350 L 610 290 L 760 345 L 890 300 L 1020 350 L 1100 330 L 1100 420 L 0 420 Z"
            fill="#12161F"
            opacity="0.85"
          />
          {/* Pine Trees Silhouette on Horizon */}
          <path
            d="M 40 380 L 45 365 L 50 380 M 52 380 L 57 360 L 62 380 M 110 375 L 116 355 L 122 375 M 240 380 L 246 360 L 252 380 M 390 375 L 396 350 L 402 375 M 820 380 L 826 358 L 832 380"
            stroke="#0D1017"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Rugged Ground */}
          <rect x="0" y="400" width="1100" height="240" fill="url(#groundCraig)" />
          <line x1="0" y1="400" x2="1100" y2="400" stroke="#F59E0B" strokeWidth="1" opacity="0.25" />
          {/* Horizon dust warm tint */}
          <ellipse cx="550" cy="400" rx="450" ry="25" fill="#D97706" opacity="0.08" />
        </g>
      ) : (
        <g id="backdropStudio">
          {/* Dark Industrial Studio Wall */}
          <rect x="0" y="0" width="1100" height="400" fill="#14161B" />
          <rect x="0" y="0" width="1100" height="400" fill="url(#studioSpotlight)" />
          {/* Studio floor with perspective grid lines */}
          <rect x="0" y="400" width="1100" height="240" fill="url(#studioFloor)" />
          <g opacity="0.18" stroke="#71717A" strokeWidth="1">
            <line x1="0" y1="400" x2="1100" y2="400" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
            <line x1="0" y1="430" x2="1100" y2="430" />
            <line x1="0" y1="475" x2="1100" y2="475" />
            <line x1="0" y1="535" x2="1100" y2="535" />
            <line x1="0" y1="610" x2="1100" y2="610" />
            {/* Perspective Ray Lines converging toward vanishing point */}
            <line x1="550" y1="400" x2="50" y2="640" />
            <line x1="550" y1="400" x2="250" y2="640" />
            <line x1="550" y1="400" x2="450" y2="640" />
            <line x1="550" y1="400" x2="650" y2="640" />
            <line x1="550" y1="400" x2="850" y2="640" />
            <line x1="550" y1="400" x2="1050" y2="640" />
          </g>
        </g>
      )}

      {/* ==================================================== */}
      {/* 2. VEHICLE FLOOR SHADOW                              */}
      {/* ==================================================== */}
      <g id="groundShadows">
        {/* Main contact shadow */}
        <ellipse cx="560" cy="535" rx="420" ry="40" fill="url(#truckFloorShadow)" />
        <ellipse cx="360" cy="542" rx="140" ry="24" fill="#000000" opacity="0.75" />
        <ellipse cx="780" cy="525" rx="150" ry="20" fill="#000000" opacity="0.65" />
        <ellipse cx="230" cy="545" rx="110" ry="18" fill="#000000" opacity="0.85" />
      </g>

      {/* ==================================================== */}
      {/* 3. WHEELS & TIRES LAYER (Rear & Front Passenger)     */}
      {/* ==================================================== */}
      <g id="wheelsAndTires">
        {/* REAR WHEEL (Far perspective, X: ~820, Y: ~460) */}
        <g id="rearWheel">
          {/* Tire Outer Rubber */}
          <ellipse cx="810" cy="455" rx="85" ry="92" fill="url(#tireTreadGrad)" />
          {/* Deep Knobby Lug Outer Tread */}
          <ellipse cx="810" cy="455" rx="80" ry="87" fill="#131417" stroke="#262A32" strokeWidth="6" strokeDasharray="9 5" />
          {/* Wheel Rim Cavity */}
          <ellipse cx="810" cy="455" rx="55" ry="60" fill="url(#rimGrad)" stroke="#4A5260" strokeWidth="2" />
          {/* Heavy Duty 8-Lug Center Hub */}
          <circle cx="810" cy="455" r="16" fill="#111215" stroke="#71717A" strokeWidth="2" />
          {/* Lug nuts */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={810 + 26 * Math.cos(rad)}
                cy={455 + 28 * Math.sin(rad)}
                r="3.2"
                fill="#CBD5E1"
                stroke="#18191D"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* FRONT DRIVER WHEEL (Perspective foreground, X: ~355, Y: ~475) */}
        <g id="frontWheel">
          {/* Tire Outer Rugged Rubber */}
          <ellipse cx="355" cy="468" rx="100" ry="108" fill="url(#tireTreadGrad)" />
          {/* Falken/Toyo Aggressive All-Terrain Shoulder Tread Blocks */}
          <ellipse cx="355" cy="468" rx="93" ry="101" fill="#15171B" stroke="#2B3039" strokeWidth="8" strokeDasharray="11 6" />
          {/* Deep Dish Rim Outer Lip */}
          <ellipse cx="355" cy="468" rx="66" ry="72" fill="url(#rimGrad)" stroke="#5B6475" strokeWidth="2.5" />
          {/* Brake Rotor & Caliper Peek (Red Caliper) */}
          <path d="M 325 435 Q 338 410 365 410 Q 385 410 392 430" fill="none" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
          {/* Multi-Spoke Beadlock Offroad Wheel Face */}
          <ellipse cx="355" cy="468" rx="46" ry="50" fill="#17191E" stroke="#3A404D" strokeWidth="3" />
          {/* Center Hub & 8-Lug Heavy Pattern */}
          <circle cx="355" cy="468" r="20" fill="#0F1013" stroke="#F59E0B" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <circle
                key={`fl-${i}`}
                cx={355 + 32 * Math.cos(rad)}
                cy={468 + 34 * Math.sin(rad)}
                r="3.8"
                fill="#E2E8F0"
                stroke="#0F172A"
                strokeWidth="1"
              />
            );
          })}
          {/* Heavy Off-Road Tire Lettering Accent */}
          <path d="M 285 420 A 85 92 0 0 1 365 378" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 8" opacity="0.5" />
        </g>
      </g>

      {/* ==================================================== */}
      {/* 4. TRUCK BODYWORK & CAB LAYER                        */}
      {/* ==================================================== */}
      <g id="truckBodyLayer">
        {/* Rear Truck Bed & Dually/Flared Bedside (Perspective right side) */}
        <path
          d="M 680 340 L 980 355 L 1020 375 L 1010 440 L 895 440 L 870 390 L 750 390 L 730 440 L 680 440 Z"
          fill="url(#truckPaintGrad)"
          stroke="#0F1014"
          strokeWidth="2"
        />
        {/* Bed rail and tie down pocket */}
        <path d="M 680 340 L 980 355 L 1020 375" fill="none" stroke="#374151" strokeWidth="5" />
        <rect x="720" y="342" width="22" height="6" rx="2" fill="#111215" />
        <rect x="940" y="352" width="22" height="6" rx="2" fill="#111215" />

        {/* Cab Roof, Pillars & Windows */}
        {/* Main Cab Outer Body (A-Pillar, Roofline, C-Pillar) */}
        <path
          d="M 370 240 L 490 145 L 700 152 L 720 350 L 530 345 L 370 330 Z"
          fill="url(#truckPaintGrad)"
          stroke="#0F1014"
          strokeWidth="2"
        />

        {/* Amber Cab Roof Clearance Lights (HD Truck Hallmark) */}
        <g id="cabRoofLights">
          {[520, 560, 600, 640, 680].map((x, i) => (
            <ellipse
              key={i}
              cx={x}
              cy={146 + i * 1.2}
              rx="6"
              ry="3"
              fill={lightsOn ? '#F59E0B' : '#78350F'}
              stroke="#D97706"
              strokeWidth="0.8"
              filter={lightsOn ? 'url(#glowFilter)' : undefined}
            />
          ))}
        </g>

        {/* Side Windows & Windshield */}
        {/* Windshield (Front 3/4 angled) */}
        <path
          d="M 378 244 L 492 153 L 538 155 L 436 265 L 378 244 Z"
          fill="url(#windshieldTint)"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <path
          d="M 388 240 L 485 158 L 510 160 L 420 258 Z"
          fill="url(#glassReflection)"
        />

        {/* Crew Cab Side Windows */}
        <path
          d="M 545 158 L 610 160 L 605 260 L 448 266 L 545 158 Z"
          fill="url(#windshieldTint)"
          stroke="#1F2937"
          strokeWidth="2"
        />
        {/* Rear Crew Passenger Window */}
        <path
          d="M 618 161 L 695 163 L 688 258 L 613 260 Z"
          fill="url(#windshieldTint)"
          stroke="#1F2937"
          strokeWidth="2"
        />
        {/* B-Pillar matte trim */}
        <line x1="612" y1="160" x2="607" y2="260" stroke="#111215" strokeWidth="7" />

        {/* Heavy Duty Tow Mirror (Telescoping Dual-Arm Mirror) */}
        <g id="sideMirror">
          <path d="M 460 262 L 495 258 L 495 285 L 458 280 Z" fill="#181A20" stroke="#000" strokeWidth="1.5" />
          <rect x="490" y="248" width="18" height="42" rx="4" fill="#232730" stroke="#0F1014" strokeWidth="2" />
          {/* Amber LED mirror turn signal strip */}
          <rect x="492" y="266" width="4" height="14" rx="1.5" fill={lightsOn ? '#F59E0B' : '#78350F'} filter={lightsOn ? 'url(#glowFilter)' : undefined} />
        </g>

        {/* Front Fender & Hood (Foreground 3/4 perspective) */}
        <path
          d="M 180 325 L 360 250 L 450 270 L 460 380 L 420 400 L 430 460 L 320 460 L 260 410 L 180 400 Z"
          fill="url(#truckPaintGrad)"
          stroke="#0F1014"
          strokeWidth="2.5"
        />
        {/* Hood Surface (Sloping toward front nose) */}
        <path
          d="M 180 325 L 360 250 L 440 265 L 290 350 Z"
          fill="url(#truckPaintGrad)"
        />
        <path
          d="M 180 325 L 360 250 L 440 265 L 290 350 Z"
          fill="url(#truckHoodHighlight)"
        />
        {/* Hood power bulge crease lines */}
        <path d="M 230 330 L 350 270" stroke={paintColor.highlight} strokeWidth="2" opacity="0.6" />
        <path d="M 260 345 L 380 285" stroke={paintColor.shadow} strokeWidth="2.5" opacity="0.7" />

        {/* Fender Flare (Rugged textured arch over front tire) */}
        <path
          d="M 260 410 Q 340 365 425 400"
          fill="none"
          stroke="#181A20"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </g>

      {/* ==================================================== */}
      {/* 5. TRUCK SPECIFIC FRONT-END (Grille & Headlights)    */}
      {/* ==================================================== */}
      {/* A) FORD SUPER DUTY FRONT END */}
      {truckId === 'ford-superduty' && (
        <g id="fordFrontEnd">
          {/* Main Grille Housing */}
          <polygon points="160,325 285,350 280,455 155,420" fill="#181A20" stroke="#2B303C" strokeWidth="2" />
          {/* Twin Massive Horizontal Billet Bars */}
          <polygon points="162,345 283,368 282,382 160,360" fill="#D1D5DB" stroke="#4B5563" strokeWidth="1" />
          <polygon points="160,388 281,410 280,424 158,402" fill="#D1D5DB" stroke="#4B5563" strokeWidth="1" />
          {/* Honeycomb Mesh Fill */}
          <line x1="162" y1="373" x2="282" y2="395" stroke="#374151" strokeWidth="3" strokeDasharray="4 3" />
          {/* Ford Blue Oval Emblem */}
          <ellipse cx="220" cy="397" rx="16" ry="10" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="1.5" />
          <ellipse cx="220" cy="397" rx="13" ry="7" fill="#2563EB" />

          {/* Ford Iconic C-Clamp Headlight Housing (Driver Side) */}
          <polygon points="135,320 162,324 158,422 132,410" fill="#0F1014" stroke="#374151" strokeWidth="1.5" />
          {/* Top Projector */}
          <rect x="138" y="332" width="18" height="22" rx="3" fill="#38BDF8" opacity={lightsOn ? 1 : 0.4} />
          {/* Center Amber Turn Marker */}
          <rect x="138" y="360" width="18" height="12" rx="2" fill={lightsOn ? '#F59E0B' : '#78350F'} filter={lightsOn ? 'url(#glowFilter)' : undefined} />
          {/* Bottom High Beam Projector */}
          <rect x="138" y="378" width="18" height="24" rx="3" fill="#38BDF8" opacity={lightsOn ? 1 : 0.4} />
          {/* C-Clamp Glowing DRL Ribbon */}
          <path
            d="M 160 326 L 136 323 L 134 410 L 157 418"
            fill="none"
            stroke={lightsOn ? '#FFFFFF' : '#94A3B8'}
            strokeWidth="3.5"
            filter={lightsOn ? 'url(#superGlow)' : undefined}
          />
        </g>
      )}

      {/* B) RAM 2500/3500 HD FRONT END */}
      {truckId === 'ram-hd' && (
        <g id="ramFrontEnd">
          {/* Aggressive Forward-Tilted Ram Grille */}
          <polygon points="158,322 288,350 282,458 152,425" fill="#141519" stroke="#374151" strokeWidth="2" />
          {/* Big-Horn / Laramie Chrome Frame surround */}
          <polygon points="160,326 285,352 280,452 155,422" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          {/* Bold Horizontal Mesh Slats */}
          <line x1="162" y1="360" x2="280" y2="384" stroke="#94A3B8" strokeWidth="4" />
          <line x1="160" y1="388" x2="278" y2="412" stroke="#94A3B8" strokeWidth="4" />
          <line x1="158" y1="414" x2="276" y2="438" stroke="#94A3B8" strokeWidth="3" />
          {/* RAM Bold Lettering Center Emblem */}
          <text x="210" y="405" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
            RAM
          </text>

          {/* Sleek Dual Projector LED Headlights */}
          <polygon points="132,322 158,326 153,415 130,404" fill="#0B0C0E" stroke="#334155" strokeWidth="1.5" />
          <circle cx="144" cy="345" r="9" fill={lightsOn ? '#E0F2FE' : '#1E293B'} filter={lightsOn ? 'url(#glowFilter)' : undefined} />
          <circle cx="143" cy="380" r="9" fill={lightsOn ? '#E0F2FE' : '#1E293B'} filter={lightsOn ? 'url(#glowFilter)' : undefined} />
          {/* Dual Eyebrow LED Daytime Running Strips */}
          <line x1="134" y1="324" x2="157" y2="328" stroke={lightsOn ? '#FFFFFF' : '#94A3B8'} strokeWidth="4" filter={lightsOn ? 'url(#glowFilter)' : undefined} />
          <line x1="132" y1="403" x2="153" y2="413" stroke={lightsOn ? '#F59E0B' : '#78350F'} strokeWidth="3" />
        </g>
      )}

      {/* C) CHEVY SILVERADO 2500HD FRONT END */}
      {truckId === 'chevy-2500hd' && (
        <g id="chevyFrontEnd">
          {/* Tall Monolithic Silverado HD Grille */}
          <polygon points="156,318 288,348 280,458 150,424" fill="#111317" stroke="#262B35" strokeWidth="2" />
          {/* Signature CHEVROLET Center Crossbar */}
          <polygon points="152,368 284,395 282,414 150,388" fill="#1F2937" stroke="#475569" strokeWidth="1.5" />
          <text x="175" y="402" fill="#E2E8F0" fontSize="10" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            CHEVROLET
          </text>
          {/* Gold Bowtie Accent */}
          <polygon points="266,396 276,398 274,407 264,405" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
          {/* Dual-Tier Stacked Headlight Assemblies */}
          {/* Upper LED DRL Strip */}
          <polygon points="130,318 156,322 153,358 128,352" fill="#090A0D" stroke="#334155" strokeWidth="1.5" />
          <line x1="131" y1="334" x2="154" y2="338" stroke={lightsOn ? '#FFFFFF' : '#94A3B8'} strokeWidth="4" filter={lightsOn ? 'url(#glowFilter)' : undefined} />
          {/* Lower High-Intensity Main Beam */}
          <polygon points="127,372 151,376 148,416 125,408" fill="#090A0D" stroke="#334155" strokeWidth="1.5" />
          <rect x="131" y="380" width="15" height="24" rx="3" fill={lightsOn ? '#E0F2FE' : '#1E293B'} filter={lightsOn ? 'url(#glowFilter)' : undefined} />
        </g>
      )}

      {/* Volumetric Headlight Beams (When Lights are ON) */}
      {lightsOn && (
        <g id="headlightBeams" opacity="0.85" className="animate-beam-glow pointer-events-none">
          <polygon points="135,340 0,260 0,550 145,410" fill="url(#volumetricBeam)" />
          <ellipse cx="140" cy="370" rx="30" ry="45" fill="url(#ledGlowYellow)" opacity="0.9" />
        </g>
      )}

      {/* ==================================================== */}
      {/* 6. JACK'S BUMPERS: CUSTOM STEEL BUMPERS LAYER        */}
      {/* ==================================================== */}
      {/* STYLE 1: FULL GRILLE GUARD HEAVY-DUTY BUMPER */}
      {bumperId === 'full-grille-guard' && (
        <g id="bumperFullGrilleGuard">
          {/* Diamond Plate Top Step Deck */}
          <polygon points="105,438 310,480 305,500 95,455" fill="url(#diamondPlate)" stroke={finishColors.shadow} strokeWidth="1.5" />

          {/* Lower Steel Bumper Main Structure (3/16" Heavy CNC Plate) */}
          <path
            d="M 90 445 L 305 488 L 300 545 L 245 558 L 140 540 L 85 490 Z"
            fill="url(#bumperSteelGrad)"
            stroke="#0B0C0E"
            strokeWidth="2.5"
          />
          {/* Angled Skid Deflector Plate */}
          <polygon points="140,540 245,558 240,578 145,562" fill={finishColors.shadow} stroke="#090A0C" strokeWidth="1.5" />

          {/* Heavy 2" Schedule 40 Pipe Grille Guard Uprights & Wraparound Hoops */}
          {/* Upright A (Passenger side center) */}
          <path
            d="M 215 480 L 210 300 L 226 302 L 230 482 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.8"
          />
          {/* Upright B (Driver side center) */}
          <path
            d="M 155 460 L 150 280 L 166 282 L 170 462 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.8"
          />
          {/* Top Crossbar */}
          <path
            d="M 152 284 L 212 302 L 212 314 L 152 296 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.5"
          />
          {/* Middle Crossbar */}
          <path
            d="M 156 360 L 220 376 L 220 388 L 156 372 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.5"
          />

          {/* Full Headlight Wraparound Loops */}
          {/* Driver headlight outer loop */}
          <path
            d="M 150 290 Q 95 305 92 360 Q 90 415 145 440 L 146 450 Q 82 422 84 358 Q 87 296 150 278 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.5"
          />
          {/* Protective Headlight Horizontal Wire Guards */}
          <line x1="94" y1="345" x2="152" y2="352" stroke={finishColors.highlight} strokeWidth="3.5" />
          <line x1="92" y1="375" x2="154" y2="385" stroke={finishColors.highlight} strokeWidth="3.5" />

          {/* Passenger Headlight Wrap (Perspective Right) */}
          <path
            d="M 224 304 Q 280 320 288 370 Q 292 410 240 450 L 238 460 Q 302 418 296 365 Q 290 310 224 292 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.5"
          />

          {/* Punch Plate Center Steel Mesh (Protects Radiator/Intercooler) */}
          <polygon points="170,300 208,310 216,460 168,445" fill="#18191E" opacity="0.9" />
          <g stroke={finishColors.highlight} strokeWidth="1" opacity="0.6">
            <line x1="172" y1="325" x2="210" y2="335" strokeDasharray="3 4" />
            <line x1="171" y1="350" x2="212" y2="360" strokeDasharray="3 4" />
            <line x1="170" y1="375" x2="213" y2="385" strokeDasharray="3 4" />
            <line x1="169" y1="400" x2="214" y2="410" strokeDasharray="3 4" />
            <line x1="168" y1="425" x2="215" y2="435" strokeDasharray="3 4" />
          </g>

          {/* Handcrafted TIG Weld Beads (Highlighted when Raw Steel is chosen) */}
          {finishColors.isRawSteel && (
            <g id="rawSteelWeldBeads" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="2 3" opacity="0.85">
              <path d="M 152 460 L 152 284" />
              <path d="M 214 480 L 210 302" />
              <path d="M 152 284 L 212 302" />
              <path d="M 90 445 L 305 488" />
              <path d="M 140 540 L 245 558" />
            </g>
          )}
        </g>
      )}

      {/* STYLE 2: STUBBY WINCH MOUNT BUMPER */}
      {bumperId === 'stubby-winch' && (
        <g id="bumperStubbyWinch">
          {/* Ultra-High-Clearance 45-degree Angled Stubby Facets */}
          {/* Center Main Winch Tub */}
          <polygon points="140,455 260,480 255,545 135,520" fill="url(#bumperSteelGrad)" stroke="#0E0F12" strokeWidth="2" />
          {/* Left High-Approach Wing (Exposes 35" Tire for Rock Crawling) */}
          <polygon points="140,455 85,470 110,515 135,520" fill={finishColors.shadow} stroke="#0E0F12" strokeWidth="2" />
          {/* Right High-Approach Wing */}
          <polygon points="260,480 300,490 285,535 255,545" fill={finishColors.highlight} stroke="#0E0F12" strokeWidth="2" />

          {/* Top Gusseted Stinger / Pre-Runner Bar (Low Profile Aggressive Hoop) */}
          <path
            d="M 160 460 L 190 395 L 210 399 L 235 475 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0B0C0E"
            strokeWidth="1.5"
          />
          {/* Side Reinforcement Gussets with Weight-Saving Speed Holes */}
          <polygon points="165,458 190,402 180,462" fill={finishColors.shadow} />
          <circle cx="178" cy="445" r="4" fill="#0B0C0E" />

          {/* Lower High-Clearance Skid Plate */}
          <polygon points="135,520 255,545 245,565 145,542" fill="#111317" stroke="#000" strokeWidth="1.5" />

          {/* CNC Cooling / Winch Access Slots */}
          <rect x="155" y="475" width="8" height="24" rx="2" fill="#0B0C0E" />
          <rect x="175" y="478" width="8" height="24" rx="2" fill="#0B0C0E" />
          <rect x="220" y="488" width="8" height="24" rx="2" fill="#0B0C0E" />
          <rect x="240" y="492" width="8" height="24" rx="2" fill="#0B0C0E" />

          {/* Raw Steel Golden Welds */}
          {finishColors.isRawSteel && (
            <g stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="2 3" opacity="0.9">
              <path d="M 140 455 L 135 520" />
              <path d="M 260 480 L 255 545" />
              <path d="M 160 460 L 190 395 L 235 475" />
            </g>
          )}
        </g>
      )}

      {/* STYLE 3: CLASSIC SMOOTH PLATE RANCH BUMPER */}
      {bumperId === 'classic-smooth-plate' && (
        <g id="bumperClassicSmoothPlate">
          {/* Smooth Contoured 3/16" Steel Outer Plate */}
          <path
            d="M 85 450 L 305 490 L 295 548 L 240 556 L 145 536 L 85 498 Z"
            fill="url(#bumperSteelGrad)"
            stroke="#0E0F13"
            strokeWidth="2.5"
          />
          {/* Upper Brake Formed Facet (Catches light cleanly) */}
          <polygon points="85,450 305,490 298,506 90,466" fill={finishColors.highlight} opacity="0.45" />

          {/* Center Pre-Runner Push Bar (1.75" Mandrel Bent Steel Tube) */}
          <path
            d="M 150 460 L 150 365 Q 200 375 240 382 L 240 478 L 228 476 L 228 395 Q 195 388 162 382 L 162 462 Z"
            fill="url(#bumperPipeGrad)"
            stroke="#0F1014"
            strokeWidth="1.5"
          />

          {/* Lower Aerodynamic Air Dam & Recessed Center Opening */}
          <polygon points="145,536 240,556 235,572 150,552" fill="#13151A" stroke="#0B0C0E" strokeWidth="1.5" />

          {/* Raw Steel TIG Welds */}
          {finishColors.isRawSteel && (
            <g stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="2 3" opacity="0.85">
              <path d="M 150 460 L 150 365" />
              <path d="M 240 478 L 240 382" />
              <path d="M 85 450 L 305 490" />
            </g>
          )}
        </g>
      )}

      {/* ==================================================== */}
      {/* 7. MODULAR ADD-ONS: WINCH SYSTEM                     */}
      {/* ==================================================== */}
      {/* A) Integrated Winch Mount Plate Only (Fairlead Opening) */}
      {winchId === 'plate-only' && (
        <g id="winchPlateOnly">
          {/* Laser-cut fairlead slot */}
          <rect x="175" y="505" width="46" height="15" rx="5" fill="#0B0C0E" stroke="#374151" strokeWidth="1.5" />
          <circle cx="170" cy="512" r="3" fill="#64748B" />
          <circle cx="226" cy="512" r="3" fill="#64748B" />
        </g>
      )}

      {/* B) 12,000 LB HEAVY-DUTY WINCH + FAIRLEAD */}
      {winchId === 'winch-12k' && (
        <g id="winch12000">
          {/* Winch Motor Housing & Spool Box (Warn/Smittybilt 12K VR-EVO style) */}
          <path
            d="M 160 455 L 235 468 L 235 498 L 160 485 Z"
            fill="#1E2025"
            stroke="#0F1014"
            strokeWidth="2"
          />
          {/* Winch Drum Spool with Spooled Red Synthetic Rope */}
          <rect x="178" y="468" width="36" height="18" rx="2" fill="#DC2626" />
          <line x1="184" y1="468" x2="184" y2="486" stroke="#991B1B" strokeWidth="1.5" />
          <line x1="192" y1="468" x2="192" y2="486" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="200" y1="468" x2="200" y2="486" stroke="#991B1B" strokeWidth="1.5" />
          <line x1="208" y1="468" x2="208" y2="486" stroke="#EF4444" strokeWidth="1.5" />

          {/* Polished Aluminum Hawse Fairlead */}
          <rect
            x="170"
            y="502"
            width="56"
            height="18"
            rx="6"
            fill="url(#rimGrad)"
            stroke="#94A3B8"
            strokeWidth="1.8"
          />
          {/* Center rope opening */}
          <rect x="180" y="507" width="36" height="8" rx="4" fill="#000000" />

          {/* Heavy Forged Recovery Hook & Red Safety Pull Strap */}
          <path
            d="M 194 512 Q 190 535 204 538 Q 212 538 214 525 Q 212 516 200 520"
            fill="#27272A"
            stroke="#DC2626"
            strokeWidth="2.5"
          />
          {/* Red Safety Ribbon Flag ("WARN / JACK'S") */}
          <path d="M 200 528 L 206 558 L 216 556 L 210 526 Z" fill="#DC2626" />
          <text x="203" y="546" fill="#FFFFFF" fontSize="6" fontWeight="bold" transform="rotate(78 203,546)">
            JACK'S
          </text>
        </g>
      )}

      {/* ==================================================== */}
      {/* 8. MODULAR ADD-ONS: QUAKE LED LIGHTING               */}
      {/* ==================================================== */}
      {/* A) Center 20" Quake LED Light Bar */}
      {lighting.lightBar && (
        <g id="quakeLedLightBar">
          {/* Heavy Extruded Aluminum Heat Sink Case */}
          <polygon points="162,450 238,464 236,478 160,464" fill="#181A20" stroke="#0B0C0E" strokeWidth="1.5" />
          {/* Dual Row LED Emitter Diodes */}
          <polygon
            points="164,453 236,466 235,475 163,462"
            fill={lightsOn ? '#FEF08A' : '#334155'}
            stroke={lightsOn ? '#FDE047' : '#1E293B'}
            strokeWidth="1"
            filter={lightsOn ? 'url(#superGlow)' : undefined}
          />
          {/* Volumetric Light Beam for Light Bar (When Lights are ON) */}
          {lightsOn && (
            <polygon
              points="160,460 0,380 0,590 240,470"
              fill="url(#volumetricBeam)"
              opacity="0.8"
              className="animate-beam-glow pointer-events-none"
            />
          )}
        </g>
      )}

      {/* B) Dual Quake LED Fog Pods */}
      {lighting.fogPods && (
        <g id="quakeFogPods">
          {/* Driver Side Fog Pod (X: ~105, Y: ~470) */}
          <rect
            x="102"
            y="464"
            width="20"
            height="20"
            rx="4"
            fill={lightsOn ? '#FEF08A' : '#1E293B'}
            stroke="#0F172A"
            strokeWidth="1.5"
            filter={lightsOn ? 'url(#glowFilter)' : undefined}
          />
          {lightsOn && (
            <ellipse cx="112" cy="474" rx="12" ry="12" fill="url(#ledGlowYellow)" opacity="0.9" className="animate-beam-glow" />
          )}

          {/* Passenger Side Fog Pod (X: ~270, Y: ~500) */}
          <rect
            x="266"
            y="496"
            width="20"
            height="20"
            rx="4"
            fill={lightsOn ? '#FEF08A' : '#1E293B'}
            stroke="#0F172A"
            strokeWidth="1.5"
            filter={lightsOn ? 'url(#glowFilter)' : undefined}
          />
          {lightsOn && (
            <ellipse cx="276" cy="506" rx="12" ry="12" fill="url(#ledGlowYellow)" opacity="0.9" className="animate-beam-glow" />
          )}
        </g>
      )}

      {/* ==================================================== */}
      {/* 9. RECOVERY & CUSTOM TOUCHES                         */}
      {/* ==================================================== */}
      {/* A) Heavy-Duty 3/4" D-Ring Shackles */}
      {recovery.shackles && (
        <g id="dRingShackles">
          {/* Driver Side Clevis Mount & Red Shackle */}
          <polygon points="120,510 132,512 130,528 118,526" fill="#18191E" stroke="#000" strokeWidth="1.5" />
          {/* Cast Red Bow Shackle */}
          <path
            d="M 120 524 C 114 532 114 544 122 550 C 130 556 138 548 136 536"
            fill="none"
            stroke="#DC2626"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Black isolator washer & pin */}
          <circle cx="126" cy="526" r="4.5" fill="#111215" stroke="#71717A" strokeWidth="1" />

          {/* Passenger Side Clevis Mount & Red Shackle */}
          <polygon points="250,534 262,536 260,552 248,550" fill="#18191E" stroke="#000" strokeWidth="1.5" />
          <path
            d="M 250 548 C 244 556 244 568 252 574 C 260 580 268 572 266 560"
            fill="none"
            stroke="#DC2626"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="256" cy="550" r="4.5" fill="#111215" stroke="#71717A" strokeWidth="1" />
        </g>
      )}

      {/* B) Custom CNC Laser-Cut Center Logo Plate */}
      {recovery.logoPlate && (
        <g id="laserCutLogoPlate">
          {/* Backplate */}
          <polygon points="168,528 232,540 230,556 166,544" fill="#0B0C0E" stroke="#F59E0B" strokeWidth="1.2" />
          {/* Precision Laser-Cut Lettering */}
          <text
            x="172"
            y="544"
            fill="#F59E0B"
            fontSize="7"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="1.2"
            transform="rotate(9.5 172,544)"
          >
            JACK'S • CRAIG, CO
          </text>
        </g>
      )}

      {/* ==================================================== */}
      {/* 10. REAL-TIME INTERACTIVE HOTSPOT BADGES             */}
      {/* ==================================================== */}
      <g id="interactiveHotspots" className="cursor-pointer">
        {/* Hotspot 1: Front Bumper Mount */}
        <g className="group" transform="translate(185, 475)">
          <circle r="7" fill="#F59E0B" opacity="0.3" className="animate-ping" />
          <circle r="4.5" fill="#F59E0B" stroke="#000" strokeWidth="1.5" />
        </g>

        {/* Hotspot 2: Headlight Protection */}
        <g className="group" transform="translate(118, 350)">
          <circle r="6" fill="#38BDF8" opacity="0.25" className="animate-ping" />
          <circle r="4" fill="#38BDF8" stroke="#000" strokeWidth="1.5" />
        </g>

        {/* Hotspot 3: All-Terrain High Clearance Arch */}
        <g className="group" transform="translate(345, 385)">
          <circle r="6" fill="#10B981" opacity="0.25" className="animate-ping" />
          <circle r="4" fill="#10B981" stroke="#000" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}
