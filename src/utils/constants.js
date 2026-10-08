export const FESTIVAL_NAME = "TECHFEST";
export const FESTIVAL_THEME = "BEYOND THE HORIZON";
export const FESTIVAL_TAGLINE = "Where Ideas Become Reality";
export const FESTIVAL_SUBTITLE = "The future is not something we wait for. It is something we build.";

export const HERO_PILLARS = [
  {
    id: "innovation",
    number: "01",
    title: "INNOVATION",
    subtitle: "Architecting Next-Gen Paradigms",
    description: "Break past orthodox computational barriers with radical AI algorithms, quantum circuits, and decentralized autonomy.",
    color: "#00f0ff",
    accent: "CYAN_CORE",
    coords: [-3.8, 1.2, 0]
  },
  {
    id: "competition",
    number: "02",
    title: "COMPETITION",
    subtitle: "Battleground of Grand Engineers",
    description: "48-hour intense hackathons, autonomous rover duels, zero-day capture-the-flags, and supersonic drone telemetry.",
    color: "#b026ff",
    accent: "PURPLE_MATRIX",
    coords: [3.8, 1.2, 0]
  },
  {
    id: "collaboration",
    number: "03",
    title: "COLLABORATION",
    subtitle: "Global Crucible of Minds",
    description: "Connect with 1,000+ top engineers, researchers, founders, and venture builders forging open frontiers.",
    color: "#00ffcc",
    accent: "NEON_SYNAPSE",
    coords: [0, -2.8, 1.5]
  }
];

export const FESTIVAL_STATS = [
  {
    value: 50,
    suffix: "+",
    label: "EXPERIENCES",
    desc: "Interactive technical arenas, exhibits & keynotes"
  },
  {
    value: 1000,
    suffix: "+",
    label: "BUILDERS",
    desc: "Engineers, researchers, and creators united"
  },
  {
    value: "∞",
    suffix: "",
    label: "POSSIBILITIES",
    desc: "Unbounded breakthroughs awaiting your spark"
  }
];

export const DOMAINS = [
  {
    id: "ai-ml",
    title: "AI & MACHINE LEARNING",
    badge: "NEURAL COMPUTING",
    iconName: "Cpu",
    accentColor: "#00f0ff",
    description: "Explore generative diffusion models, edge neuromorphic processing, autonomous agent swarms, and synthetic reasoning architectures.",
    tracks: ["Large Multimodal Models", "Autonomous Drone Swarms", "Neuro-Symbolic Reasoning"],
    prize: "$15,000 POOL"
  },
  {
    id: "robotics",
    title: "ROBOTICS & AUTOMATION",
    badge: "KINETIC INTELLIGENCE",
    iconName: "Bot",
    accentColor: "#8a2be2",
    description: "Design high-torque quadruped locomotives, humanoid bimanual manipulators, and sub-millimeter surgical robotics.",
    tracks: ["Hexapod Locomotion", "Inverse Kinematics", "Vision-Guided Pick & Place"],
    prize: "$12,500 POOL"
  },
  {
    id: "space",
    title: "SPACE & SCIENCE",
    badge: "DEEP COSMOS",
    iconName: "Rocket",
    accentColor: "#00e5ff",
    description: "Simulate interplanetary orbital trajectories, CubeSat telemetry uplinks, and ion propulsion thruster dynamics.",
    tracks: ["LEO Trajectory Optimization", "Deep Space Optical Comms", "CubeSat Payloads"],
    prize: "$20,000 POOL"
  },
  {
    id: "cybersecurity",
    title: "CYBERSECURITY",
    badge: "ZERO TRUST",
    iconName: "ShieldAlert",
    accentColor: "#ff007f",
    description: "Harden cryptographic lattices, exploit post-quantum zero-days, and deploy autonomous threat response heuristics.",
    tracks: ["Post-Quantum Encryption", "Kernel Exploit Mitigation", "Hardware Side-Channels"],
    prize: "$14,000 POOL"
  },
  {
    id: "web3",
    title: "WEB3 & BLOCKCHAIN",
    badge: "DECENTRALIZED SYSTEMS",
    iconName: "Boxes",
    accentColor: "#b026ff",
    description: "Architect zero-knowledge zk-SNARK verifiers, sovereign cross-chain rollups, and high-throughput consensus engines.",
    tracks: ["zk-Rollup Architecture", "Account Abstraction", "MEV Resistance"],
    prize: "$18,000 POOL"
  },
  {
    id: "sustainability",
    title: "SUSTAINABILITY TECH",
    badge: "CLEAN FRONTIER",
    iconName: "Leaf",
    accentColor: "#00ff88",
    description: "Pioneer solid-state energy storage, microgrid load dispatch algorithms, and direct atmospheric carbon mineralization.",
    tracks: ["Smart Grid Dispatch", "Electrochemical Catalysis", "Bio-degradable Electronics"],
    prize: "$12,000 POOL"
  }
];

export const TIMELINE_STEPS = [
  {
    step: "01",
    phase: "DISCOVER",
    headline: "Explore New Ideas",
    summary: "Immerse yourself into cutting-edge tech talks, speculative design workshops, and horizon scanning with world-renowned scientists.",
    date: "OCTOBER 24 // 09:00 UTC",
    location: "SYNAPSE MAIN STAGE"
  },
  {
    step: "02",
    phase: "BUILD",
    headline: "Turn Concepts Into Prototypes",
    summary: "Sprint through 48 uninterrupted hours of rapid prototyping, hardware fab access, and mentorship from silicon valley engineers.",
    date: "OCTOBER 25 // 00:00 UTC",
    location: "THE MAKER HANGAR"
  },
  {
    step: "03",
    phase: "COMPETE",
    headline: "Challenge Yourself",
    summary: "Stress-test your builds against automated algorithmic benchmarks and live head-to-head arena trials.",
    date: "OCTOBER 26 // 14:00 UTC",
    location: "CYBER ARENA 01"
  },
  {
    step: "04",
    phase: "CONNECT",
    headline: "Meet Builders and Innovators",
    summary: "Engage with elite tech leaders, research venture capitalists, and co-founders looking for groundbreaking teammates.",
    date: "OCTOBER 27 // 11:00 UTC",
    location: "THE NEXUS HUB"
  },
  {
    step: "05",
    phase: "CREATE",
    headline: "Build Something That Matters",
    summary: "Showcase in the Grand Finale Gala. Pitch your moonshot to industry judges and unlock deployment capital.",
    date: "OCTOBER 27 // 18:00 UTC",
    location: "HORIZON AUDITORIUM"
  }
];

export const FUTURE_LAB_PROJECTS = [
  {
    id: "neural-network",
    name: "AI NEURAL SYNAPSE",
    category: "SYNTHETIC COGNITION",
    color: "#00f0ff",
    description: "A self-organizing neuromorphic crystalline lattice executing real-time multi-agent reasoning at sub-picosecond latency.",
    technology: "Neuromorphic Memristor Array v4.2",
    specs: "100B Synaptic Weight Nodes • 0.04W Power Envelope",
    status: "PROTOTYPE OPERATIONAL"
  },
  {
    id: "quantum-satellite",
    name: "ORBITAL TELEMETRY SAT",
    category: "DEEP SPACE COMMUNICATIONS",
    color: "#8a2be2",
    description: "Next-gen deep space reconnaissance satellite equipped with quantum-entangled optical transceivers for zero-latency relay.",
    technology: "Deep Quantum Optical Laser Link",
    specs: "Geostationary Polar Orbit • 120 Gbps Direct Link",
    status: "FLIGHT MODEL VALIDATED"
  },
  {
    id: "cyber-arm",
    name: "CYBERNETIC KINETIC ARM",
    category: "HIGH-PRECISION BIOMECHANICS",
    color: "#ff007f",
    description: "Carbon-nanotube artificial muscle actuator capable of 7-axis micro-manipulation with 0.002mm spatial repeatability.",
    technology: "Electroactive Polymer Fiber Core",
    specs: "7-DOF Precision Array • 140 Nm Peak Torque",
    status: "DYNAMIC TESTING"
  },
  {
    id: "digital-planet",
    name: "TERRA DIGITAL TWIN",
    category: "GLOBAL CLIMATE SIMULATION",
    color: "#00ffcc",
    description: "Planetary-scale digital twin ingesting petabytes of atmospheric sensor streams to forecast climate inflection vectors.",
    technology: "Petascale Tensor Spherical Harmonics",
    specs: "1km Global Resolution • Millisecond Forecast Iterations",
    status: "LIVE STREAM CONNECTED"
  },
  {
    id: "fusion-core",
    name: "TOROIDAL FUSION CORE",
    category: "CLEAN PLASMA CONFINEMENT",
    color: "#ffaa00",
    description: "Compact magnetic confinement tokamak utilizing high-temperature superconducting magnets to stabilize self-sustaining burning plasma.",
    technology: "HTS Superconducting Stellarator Field",
    specs: "150M °C Core Plasma • Net Energy Q > 3.2",
    status: "CONFINEMENT STABLE"
  }
];
