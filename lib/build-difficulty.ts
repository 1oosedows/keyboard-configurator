// Build difficulty assessment and guidance system

import type { BuildDifficulty, Tool, Skill, BuildStep, CommonMistake } from '@/types/community';
import type { KeyboardConfiguration, KeyboardLayout } from '@/types';

// Predefined difficulty levels
export const DIFFICULTY_LEVELS: BuildDifficulty[] = [
  {
    level: 1,
    name: 'Beginner',
    description: 'Perfect first build - hot-swap PCB, no soldering required',
    requirements: [
      'Hot-swap PCB',
      'Pre-built case and plate',
      'Switches and keycaps only',
    ],
    estimatedTime: 2,
    toolsNeeded: [
      {
        name: 'Keycap puller',
        required: true,
        description: 'For installing keycaps safely',
        estimatedCost: 5,
      },
      {
        name: 'Switch puller',
        required: false,
        description: 'Helpful for switch removal',
        estimatedCost: 8,
      },
    ],
    skillsRequired: [
      {
        name: 'Basic assembly',
        level: 'basic',
        description: 'Ability to follow instructions and handle small parts',
      },
    ],
  },
  {
    level: 2,
    name: 'Easy',
    description: 'Simple modifications - stabilizer tuning, basic lubing',
    requirements: [
      'Hot-swap or mill-max PCB',
      'Stabilizer modification',
      'Switch lubing (optional)',
    ],
    estimatedTime: 4,
    toolsNeeded: [
      {
        name: 'Screwdriver set',
        required: true,
        description: 'For case and stabilizer screws',
        estimatedCost: 15,
      },
      {
        name: 'Lube brush',
        required: false,
        description: 'For applying switch lubricant',
        estimatedCost: 3,
      },
      {
        name: 'Switch lubricant',
        required: false,
        description: 'Krytox 205g0 or similar',
        estimatedCost: 12,
      },
    ],
    skillsRequired: [
      {
        name: 'Fine motor skills',
        level: 'basic',
        description: 'Precision work with small components',
      },
      {
        name: 'Following tutorials',
        level: 'basic',
        description: 'Ability to follow video guides',
      },
    ],
  },
  {
    level: 3,
    name: 'Intermediate',
    description: 'Through-hole soldering, custom firmware, case modifications',
    requirements: [
      'Through-hole soldering',
      'Custom firmware flashing',
      'Case foam/dampening',
    ],
    estimatedTime: 8,
    toolsNeeded: [
      {
        name: 'Soldering iron',
        required: true,
        description: '60W temperature controlled iron',
        estimatedCost: 40,
      },
      {
        name: 'Solder',
        required: true,
        description: '60/40 rosin core solder',
        estimatedCost: 8,
      },
      {
        name: 'Flux',
        required: true,
        description: 'For clean solder joints',
        estimatedCost: 10,
      },
      {
        name: 'Desoldering pump',
        required: false,
        description: 'For fixing mistakes',
        estimatedCost: 15,
      },
    ],
    skillsRequired: [
      {
        name: 'Basic soldering',
        level: 'intermediate',
        description: 'Clean through-hole solder joints',
      },
      {
        name: 'Firmware basics',
        level: 'basic',
        description: 'Using QMK Toolbox or VIA',
      },
    ],
  },
  {
    level: 4,
    name: 'Advanced',
    description: 'SMD soldering, PCB modifications, custom layouts',
    requirements: [
      'SMD component soldering',
      'PCB trace modifications',
      'Custom layout design',
    ],
    estimatedTime: 15,
    toolsNeeded: [
      {
        name: 'SMD soldering station',
        required: true,
        description: 'Temperature controlled with fine tip',
        estimatedCost: 80,
      },
      {
        name: 'Microscope/magnifier',
        required: true,
        description: 'For SMD component work',
        estimatedCost: 50,
      },
      {
        name: 'Hot air station',
        required: false,
        description: 'For component removal',
        estimatedCost: 60,
      },
      {
        name: 'Multimeter',
        required: true,
        description: 'For continuity testing',
        estimatedCost: 25,
      },
    ],
    skillsRequired: [
      {
        name: 'SMD soldering',
        level: 'advanced',
        description: 'Precise work with tiny components',
      },
      {
        name: 'PCB design',
        level: 'intermediate',
        description: 'Understanding of PCB layout',
      },
      {
        name: 'Firmware development',
        level: 'intermediate',
        description: 'Custom QMK configuration',
      },
    ],
  },
  {
    level: 5,
    name: 'Expert',
    description: 'PCB design, case manufacturing, full custom builds',
    requirements: [
      'PCB design and manufacturing',
      'Case design and machining',
      'Custom firmware development',
    ],
    estimatedTime: 40,
    toolsNeeded: [
      {
        name: 'PCB design software',
        required: true,
        description: 'KiCad, Altium, or Eagle',
        estimatedCost: 0, // KiCad is free
      },
      {
        name: 'CAD software',
        required: true,
        description: 'Fusion 360, SolidWorks, etc.',
        estimatedCost: 60, // monthly subscription
      },
      {
        name: '3D printer',
        required: false,
        description: 'For prototyping cases',
        estimatedCost: 300,
      },
      {
        name: 'CNC machine access',
        required: false,
        description: 'For metal case manufacturing',
        estimatedCost: 100, // per hour
      },
    ],
    skillsRequired: [
      {
        name: 'PCB design',
        level: 'advanced',
        description: 'Full schematic and layout design',
      },
      {
        name: 'CAD modeling',
        level: 'advanced',
        description: '3D case and plate design',
      },
      {
        name: 'Manufacturing',
        level: 'intermediate',
        description: 'Understanding of production processes',
      },
    ],
  },
];

// Common mistakes by difficulty level
export const COMMON_MISTAKES: Record<number, CommonMistake[]> = {
  1: [
    {
      title: 'Forcing switches into hot-swap sockets',
      description: 'Applying too much force when inserting switches',
      prevention: 'Align switch pins carefully before pressing down gently',
      fix: 'Remove switch and check for bent pins, straighten if needed',
      severity: 'moderate',
    },
    {
      title: 'Installing keycaps backwards',
      description: 'Keycaps have a slight angle and can be installed incorrectly',
      prevention: 'Check keycap profile - taller side goes toward you',
      fix: 'Remove and reinstall with correct orientation',
      severity: 'minor',
    },
  ],
  2: [
    {
      title: 'Over-lubing switches',
      description: 'Using too much lubricant makes switches sluggish',
      prevention: 'Use thin, even coats - less is more',
      fix: 'Disassemble switch and clean excess lube with alcohol',
      severity: 'moderate',
    },
    {
      title: 'Stabilizer rattle',
      description: 'Stabilizers making noise due to poor tuning',
      prevention: 'Properly lube wire ends and housing contact points',
      fix: 'Disassemble, clean, and re-lube stabilizers',
      severity: 'moderate',
    },
  ],
  3: [
    {
      title: 'Cold solder joints',
      description: 'Solder joints that look dull and may fail',
      prevention: 'Heat pad and pin simultaneously, use proper temperature',
      fix: 'Reheat joint until solder flows smoothly',
      severity: 'major',
    },
    {
      title: 'Bridged solder joints',
      description: 'Solder connecting adjacent pins',
      prevention: 'Use appropriate amount of solder and flux',
      fix: 'Use desoldering braid to remove excess solder',
      severity: 'major',
    },
  ],
  4: [
    {
      title: 'Lifted PCB pads',
      description: 'PCB traces damaged during desoldering',
      prevention: 'Use proper desoldering technique and temperature',
      fix: 'Jumper wire repair or PCB replacement',
      severity: 'major',
    },
    {
      title: 'SMD component tombstoning',
      description: 'Component standing up on one end during reflow',
      prevention: 'Even solder paste application and controlled heating',
      fix: 'Reheat and reposition component',
      severity: 'moderate',
    },
  ],
  5: [
    {
      title: 'PCB design rule violations',
      description: 'Traces too close, vias too small, etc.',
      prevention: 'Run design rule check before manufacturing',
      fix: 'Redesign PCB sections that violate rules',
      severity: 'major',
    },
    {
      title: 'Case interference',
      description: 'Components hitting case walls or screws',
      prevention: 'Careful 3D modeling and clearance checking',
      fix: 'Modify case design or component placement',
      severity: 'major',
    },
  ],
};

// Assess build difficulty based on configuration
export function assessBuildDifficulty(
  configuration: KeyboardConfiguration,
  layout: KeyboardLayout,
  customizations: {
    customPCB?: boolean;
    solderingRequired?: boolean;
    customFirmware?: boolean;
    caseModifications?: boolean;
    customPlate?: boolean;
  } = {}
): BuildDifficulty {
  let difficultyScore = 1;

  // Base difficulty factors
  if (customizations.solderingRequired) difficultyScore += 2;
  if (customizations.customFirmware) difficultyScore += 1;
  if (customizations.caseModifications) difficultyScore += 1;
  if (customizations.customPCB) difficultyScore += 3;
  if (customizations.customPlate) difficultyScore += 1;

  // Layout complexity
  if (layout.keys.length > 104) difficultyScore += 1; // Full size+
  if (layout.category === 'Custom') difficultyScore += 2;

  // Configuration complexity
  if (configuration.layers.length > 3) difficultyScore += 1;
  
  const macroCount = configuration.layers.reduce((count, layer) => 
    count + layer.keyMappings.filter(m => m.action.type === 'macro').length, 0
  );
  if (macroCount > 10) difficultyScore += 1;

  // Cap at level 5
  const finalLevel = Math.min(5, difficultyScore) as 1 | 2 | 3 | 4 | 5;
  
  return DIFFICULTY_LEVELS.find(d => d.level === finalLevel) || DIFFICULTY_LEVELS[0];
}

// Generate build steps based on difficulty and configuration
export function generateBuildSteps(
  difficulty: BuildDifficulty,
  configuration: KeyboardConfiguration,
  customizations: any = {}
): BuildStep[] {
  const steps: BuildStep[] = [];
  let stepOrder = 1;

  // Planning phase (all builds)
  steps.push({
    id: 'planning',
    title: 'Planning and Preparation',
    description: 'Gather all components and tools, prepare workspace',
    images: [],
    estimatedTime: 30,
    tools: ['Clean workspace', 'Good lighting', 'Anti-static mat'],
    tips: [
      'Lay out all components to verify you have everything',
      'Read through entire guide before starting',
      'Have a backup plan for common issues',
    ],
    warnings: [
      'Static electricity can damage PCBs',
      'Keep small parts organized to avoid losing them',
    ],
    order: stepOrder++,
  });

  if (difficulty.level >= 2) {
    // Stabilizer preparation
    steps.push({
      id: 'stabilizers',
      title: 'Stabilizer Preparation',
      description: 'Tune and lube stabilizers for smooth operation',
      images: [],
      estimatedTime: 45,
      tools: ['Screwdriver', 'Lube brush', 'Stabilizer lubricant'],
      tips: [
        'Clip stabilizer feet for better sound',
        'Band-aid mod the PCB for reduced rattle',
        'Test stabilizers before final assembly',
      ],
      warnings: [
        'Don\'t over-lube - it will make keys sluggish',
        'Ensure wires are properly seated',
      ],
      order: stepOrder++,
    });
  }

  if (difficulty.level >= 3) {
    // Soldering phase
    steps.push({
      id: 'soldering',
      title: 'Switch Soldering',
      description: 'Solder switches to PCB with clean, strong joints',
      images: [],
      estimatedTime: 120,
      tools: ['Soldering iron', 'Solder', 'Flux', 'Desoldering pump'],
      tips: [
        'Heat both pad and pin simultaneously',
        'Use flux for cleaner joints',
        'Work in good ventilation',
      ],
      warnings: [
        'Don\'t overheat - can damage PCB traces',
        'Check each joint before moving on',
        'Test PCB functionality before case assembly',
      ],
      order: stepOrder++,
    });
  }

  // Switch installation (hot-swap or post-solder)
  if (difficulty.level === 1 || difficulty.level === 2) {
    steps.push({
      id: 'switches',
      title: 'Switch Installation',
      description: 'Install switches into hot-swap sockets',
      images: [],
      estimatedTime: 30,
      tools: ['Switch puller (optional)'],
      tips: [
        'Align switch pins carefully',
        'Press firmly but don\'t force',
        'Test each switch after installation',
      ],
      warnings: [
        'Bent pins can damage hot-swap sockets',
        'Ensure switches are fully seated',
      ],
      order: stepOrder++,
    });
  }

  // Case assembly
  steps.push({
    id: 'case-assembly',
    title: 'Case Assembly',
    description: 'Install PCB and plate into case',
    images: [],
    estimatedTime: 20,
    tools: ['Screwdriver'],
    tips: [
      'Don\'t overtighten screws',
      'Check for proper alignment',
      'Add foam dampening if desired',
    ],
    warnings: [
      'Stripped screws are difficult to remove',
      'Ensure no components are pinched',
    ],
    order: stepOrder++,
  });

  // Keycap installation
  steps.push({
    id: 'keycaps',
    title: 'Keycap Installation',
    description: 'Install keycaps according to layout',
    images: [],
    estimatedTime: 15,
    tools: ['Keycap puller'],
    tips: [
      'Start with larger keys (spacebar, shifts)',
      'Check keycap orientation',
      'Press down evenly',
    ],
    warnings: [
      'Don\'t rock keycaps side to side',
      'Ensure proper seating on switch stems',
    ],
    order: stepOrder++,
  });

  if (difficulty.level >= 3) {
    // Firmware flashing
    steps.push({
      id: 'firmware',
      title: 'Firmware Installation',
      description: 'Flash custom firmware and test all keys',
      images: [],
      estimatedTime: 30,
      tools: ['Computer', 'USB cable', 'QMK Toolbox'],
      tips: [
        'Backup original firmware first',
        'Test all keys and layers',
        'Configure macros and special functions',
      ],
      warnings: [
        'Wrong firmware can brick the PCB',
        'Always verify before flashing',
      ],
      order: stepOrder++,
    });
  }

  // Final testing
  steps.push({
    id: 'testing',
    title: 'Final Testing and Tuning',
    description: 'Comprehensive testing and fine-tuning',
    images: [],
    estimatedTime: 30,
    tools: ['Key tester software'],
    tips: [
      'Test every key and combination',
      'Check RGB lighting if applicable',
      'Fine-tune any remaining issues',
    ],
    warnings: [
      'Document any issues for future reference',
      'Keep spare components for repairs',
    ],
    order: stepOrder++,
  });

  return steps;
}

// Calculate total build time and cost
export function calculateBuildMetrics(
  difficulty: BuildDifficulty,
  steps: BuildStep[]
): {
  totalTime: number;
  toolCost: number;
  skillsNeeded: string[];
  riskLevel: 'low' | 'medium' | 'high';
} {
  const totalTime = steps.reduce((sum, step) => sum + step.estimatedTime, 0);
  const toolCost = difficulty.toolsNeeded.reduce((sum, tool) => 
    sum + (tool.estimatedCost || 0), 0
  );
  
  const skillsNeeded = difficulty.skillsRequired.map(skill => skill.name);
  
  const riskLevel = difficulty.level <= 2 ? 'low' : 
                   difficulty.level <= 3 ? 'medium' : 'high';

  return {
    totalTime,
    toolCost,
    skillsNeeded,
    riskLevel,
  };
}

// Get personalized difficulty recommendation
export function getPersonalizedDifficulty(
  userExperience: {
    buildsCompleted: number;
    solderingExperience: boolean;
    toolsAvailable: string[];
    timeAvailable: number; // hours
  },
  desiredFeatures: string[]
): {
  recommendedLevel: number;
  reasoning: string[];
  alternatives: BuildDifficulty[];
} {
  let recommendedLevel = 1;
  const reasoning: string[] = [];

  // Experience-based recommendations
  if (userExperience.buildsCompleted === 0) {
    reasoning.push('Starting with beginner level for first build');
  } else if (userExperience.buildsCompleted < 3) {
    recommendedLevel = Math.min(2, recommendedLevel + 1);
    reasoning.push('Previous build experience allows for easy level');
  } else {
    recommendedLevel = Math.min(3, recommendedLevel + 2);
    reasoning.push('Multiple builds completed - intermediate level suitable');
  }

  // Soldering experience
  if (userExperience.solderingExperience && recommendedLevel < 3) {
    recommendedLevel = 3;
    reasoning.push('Soldering experience opens up intermediate builds');
  }

  // Time constraints
  if (userExperience.timeAvailable < 5) {
    recommendedLevel = Math.min(2, recommendedLevel);
    reasoning.push('Limited time suggests simpler build');
  }

  // Feature requirements
  if (desiredFeatures.includes('custom-firmware')) {
    recommendedLevel = Math.max(3, recommendedLevel);
    reasoning.push('Custom firmware requires intermediate skills');
  }

  if (desiredFeatures.includes('custom-pcb')) {
    recommendedLevel = Math.max(4, recommendedLevel);
    reasoning.push('Custom PCB requires advanced skills');
  }

  const alternatives = DIFFICULTY_LEVELS.filter(d => 
    Math.abs(d.level - recommendedLevel) <= 1
  );

  return {
    recommendedLevel,
    reasoning,
    alternatives,
  };
}