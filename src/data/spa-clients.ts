export const CLIENT_NAMES = [
  "Maria", "Sirana", "Jiya", "Rubica", "Maahi", "Neha", "Poonam", "Tara", "Sneha", "Neha2",
  "Soni", "Gerasee", "Princy", "Kadugodi", "Buddha", "Susheela", "Pratvika", "Sanu_baanu", "Oodi", "Maitri",
  "Oombii", "Kerala", "Green", "Riya", "BS-dumm", "sea3-new", "Pvr", "Akira", "Priya", "Tanya", "Aisha", "Amrutha",
  "Ec-1", "Ec-2", "Nisha", "Kush", "Diya", "Nema Tamang", "Serisha", "Punjabi", "Domma Tamang", "Keesuu", "Shivani",
  "Rema", "Chitra", "Baji tamang", "Renu", "Ammu", "Rojee Tamang", "Monica", "Arpitha", "Shilpa", "Pathu", "Auratr", "Bella", "Anna",
  "Anita halam", "Sunita b"
];

export function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function honestyPercent(name: string) {
  const h = hashString(name);
  const truth = (h % 71) + 15;
  return { truth, lie: 100 - truth };
}

function pick<T>(name: string, arr: T[]): T {
  return arr[hashString(name) % arr.length];
}

export const pieData = [
  { name: "Single", value: 28 },
  { name: "Married", value: 72 },
];

export const barData = [
  { category: "Black Stone", count: 10 },
  { category: "Mocca", count: 12 },
  { category: "O3", count: 8 },
  { category: "Ozone", count: 15 },
  { category: "Delight", count: 6 },
  { category: "Pearl", count: 7 },
  { category: "White Rose", count: 9 },
  { category: "Nisarga", count: 11 },
];

export const CHART_COLORS = ["#ff6fa2", "#6c63ff", "#4facfe"];

export interface ClientData {
  id: number;
  name: string;
  age: number;
  spa: string;
  status: string;
  partner: string;
  partnerOccupation: string;
  family: number;
  satisfaction: string;
  siblings: number;
  strength: string;
  weakness: string;
  mindset: string;
  opinion: string;
  stiRisk: string;
  honesty: { truth: number; lie: number };
  totalVisit: number;
  totalSpend: string;
}

export function generateClients(): ClientData[] {
  const statuses = ["Single", "Married", "Complicated"];
  const spas = ["Black Stone", "Mocca", "O3", "Ozone", "Delight", "Pearl", "White Rose", "Nisarga"];
  const occupations = ["Engineer", "Teacher", "Designer", "Manager", "Nurse", "Student", "-"];
  const strengths = ["Confident", "Kind", "Hardworking", "Creative", "Brave", "Patient"];
  const weaknesses = ["Impatient", "Perfectionist", "Shy", "Stubborn", "Sensitive"];
  const mindsets = ["Optimistic", "Practical", "Curious", "Laid-back", "Ambitious"];
  const opinions = ["Friendly client", "Reserved", "Loyal client", "New client", "Regular"];
  const stiRiskLevels = ["Low", "Medium", "High"];

  return CLIENT_NAMES.map((name, idx) => {
    const h = hashString(name + idx);
    const { truth, lie } = honestyPercent(name + idx);

    let user: ClientData = {
      id: idx,
      name,
      age: 20 + (h % 21),
      spa: pick(name, spas),
      status: pick(name, statuses),
      partner: (h % 3 === 0) ? "-" : pick(name, ["Alex", "John", "Sam", "Priya", "Asha", "Ravi"]),
      partnerOccupation: pick(name, occupations),
      family: 1 + (h % 6),
      satisfaction: `${6 + (h % 5)}/10`,
      siblings: h % 4,
      strength: pick(name, strengths),
      weakness: pick(name, weaknesses),
      mindset: pick(name, mindsets),
      opinion: pick(name, opinions),
      stiRisk: pick(name, stiRiskLevels),
      honesty: { truth, lie },
      totalVisit: 1 + (h % 20),
      totalSpend: `₹${((1 + (h % 50)) * 1200).toLocaleString()}`,
    };

    if (name === "Rojee Tamang") {
      user = {
        ...user,
        age: 28,
        spa: "Mocca",
        status: "Single",
        partner: "-",
        partnerOccupation: "-",
        family: 3,
        siblings: 1,
        strength: "Oxytocin ctl",
        weakness: "Impatient",
        mindset: "Bold but Low behaviour sense. less work ethiks",
        opinion: "One of My best",
        stiRisk: "Medium",
        totalVisit: 24,
        totalSpend: "₹25,100",
      };
    }

    return user;
  });
}
