const BRAND_META = {
  "Citroen":        { color: "#C00011", abbr: "CIT" },
  "Peugeot":        { color: "#003189", abbr: "PEU" },
  "Opel":           { color: "#E2000F", abbr: "OPL" },
  "Fiat":           { color: "#BE0000", abbr: "FIA" },
  "Toyota":         { color: "#EB0A1E", abbr: "TOY" },
  "RAM":            { color: "#1B365D", abbr: "RAM" },
  "IVECO":          { color: "#003087", abbr: "IVC" },
  "Volkswagen":     { color: "#001E50", abbr: "VW"  },
  "Ford":           { color: "#003478", abbr: "FOR" },
  "Mercedes-Benz":  { color: "#222222", abbr: "MB"  },
  "Renault":        { color: "#EFDF00", textDark: true, abbr: "REN" },
  "KIA":            { color: "#05141F", abbr: "KIA" },
};

const products = [
  // ── Volkswagen ───────────────────────────────────────────────────────────────
  { id: 1,  brand: "Volkswagen",    van: "Caddy",              segment: "F1",   type: "Partition Wall" },
  { id: 2,  brand: "Volkswagen",    van: "Transporter T6.1",   segment: "K1",   type: "Crew Cabin"     },
  { id: 3,  brand: "Volkswagen",    van: "Transporter T6.1",   segment: "K1",   type: "Partition Wall" },
  { id: 4,  brand: "Volkswagen",    van: "Crafter",            segment: "K2/3", type: "Crew Cabin"     },
  { id: 5,  brand: "Volkswagen",    van: "Crafter",            segment: "K2/3", type: "Partition Wall" },

  // ── Mercedes-Benz ────────────────────────────────────────────────────────────
  { id: 6,  brand: "Mercedes-Benz", van: "Citan",              segment: "F1",   type: "Partition Wall" },
  { id: 7,  brand: "Mercedes-Benz", van: "Vito",               segment: "K1",   type: "Crew Cabin"     },
  { id: 8,  brand: "Mercedes-Benz", van: "Vito",               segment: "K1",   type: "Partition Wall" },
  { id: 9,  brand: "Mercedes-Benz", van: "Sprinter",           segment: "K2/3", type: "Crew Cabin"     },
  { id: 10, brand: "Mercedes-Benz", van: "Sprinter",           segment: "K2/3", type: "Flex Cabin"     },
  { id: 11, brand: "Mercedes-Benz", van: "Sprinter",           segment: "K2/3", type: "Partition Wall" },

  // ── Ford ─────────────────────────────────────────────────────────────────────
  { id: 12, brand: "Ford",          van: "Transit Connect",    segment: "F1",   type: "Partition Wall" },
  { id: 13, brand: "Ford",          van: "Transit Custom",     segment: "K1",   type: "Crew Cabin"     },
  { id: 14, brand: "Ford",          van: "Transit Custom",     segment: "K1",   type: "Partition Wall" },
  { id: 15, brand: "Ford",          van: "Transit",            segment: "K2/3", type: "Crew Cabin"     },
  { id: 16, brand: "Ford",          van: "Transit",            segment: "K2/3", type: "Flex Cabin"     },
  { id: 17, brand: "Ford",          van: "Transit",            segment: "K2/3", type: "Partition Wall" },

  // ── Renault ──────────────────────────────────────────────────────────────────
  { id: 18, brand: "Renault",       van: "Kangoo",             segment: "F1",   type: "Partition Wall" },
  { id: 19, brand: "Renault",       van: "Trafic",             segment: "K1",   type: "Crew Cabin"     },
  { id: 20, brand: "Renault",       van: "Trafic",             segment: "K1",   type: "Partition Wall" },
  { id: 21, brand: "Renault",       van: "Master",             segment: "K2/3", type: "Crew Cabin"     },
  { id: 22, brand: "Renault",       van: "Master",             segment: "K2/3", type: "Flex Cabin"     },

  // ── Peugeot ──────────────────────────────────────────────────────────────────
  { id: 23, brand: "Peugeot",       van: "Partner",            segment: "F1",   type: "Partition Wall" },
  { id: 24, brand: "Peugeot",       van: "Expert",             segment: "K1",   type: "Crew Cabin"     },
  { id: 25, brand: "Peugeot",       van: "Expert",             segment: "K1",   type: "Partition Wall" },
  { id: 26, brand: "Peugeot",       van: "Boxer",              segment: "K2/3", type: "Crew Cabin"     },
  { id: 27, brand: "Peugeot",       van: "Boxer",              segment: "K2/3", type: "Partition Wall" },

  // ── Citroen ──────────────────────────────────────────────────────────────────
  { id: 28, brand: "Citroen",       van: "Berlingo",           segment: "F1",   type: "Partition Wall" },
  { id: 29, brand: "Citroen",       van: "Dispatch",           segment: "K1",   type: "Crew Cabin"     },
  { id: 30, brand: "Citroen",       van: "Dispatch",           segment: "K1",   type: "Partition Wall" },
  { id: 31, brand: "Citroen",       van: "Jumper",             segment: "K2/3", type: "Crew Cabin"     },
  { id: 32, brand: "Citroen",       van: "Jumper",             segment: "K2/3", type: "Partition Wall" },

  // ── Opel ─────────────────────────────────────────────────────────────────────
  { id: 33, brand: "Opel",          van: "Combo",              segment: "F1",   type: "Partition Wall" },
  { id: 34, brand: "Opel",          van: "Vivaro",             segment: "K1",   type: "Crew Cabin"     },
  { id: 35, brand: "Opel",          van: "Vivaro",             segment: "K1",   type: "Partition Wall" },
  { id: 36, brand: "Opel",          van: "Movano",             segment: "K2/3", type: "Partition Wall" },

  // ── Fiat ─────────────────────────────────────────────────────────────────────
  { id: 37, brand: "Fiat",          van: "Doblo",              segment: "F1",   type: "Partition Wall" },
  { id: 38, brand: "Fiat",          van: "Scudo",              segment: "K1",   type: "Crew Cabin"     },
  { id: 39, brand: "Fiat",          van: "Ducato",             segment: "K2/3", type: "Crew Cabin"     },
  { id: 40, brand: "Fiat",          van: "Ducato",             segment: "K2/3", type: "Flex Cabin"     },
  { id: 41, brand: "Fiat",          van: "Ducato",             segment: "K2/3", type: "Partition Wall" },

  // ── Toyota ───────────────────────────────────────────────────────────────────
  { id: 42, brand: "Toyota",        van: "Proace City",        segment: "F1",   type: "Partition Wall" },
  { id: 43, brand: "Toyota",        van: "Proace",             segment: "K1",   type: "Crew Cabin"     },
  { id: 44, brand: "Toyota",        van: "Proace",             segment: "K1",   type: "Partition Wall" },

  // ── IVECO ────────────────────────────────────────────────────────────────────
  { id: 45, brand: "IVECO",         van: "Daily 35S",          segment: "K1",   type: "Partition Wall" },
  { id: 46, brand: "IVECO",         van: "Daily 50C",          segment: "K2/3", type: "Crew Cabin"     },
  { id: 47, brand: "IVECO",         van: "Daily 50C",          segment: "K2/3", type: "Flex Cabin"     },

  // ── RAM ──────────────────────────────────────────────────────────────────────
  { id: 48, brand: "RAM",           van: "ProMaster 1500",     segment: "K1",   type: "Partition Wall" },
  { id: 49, brand: "RAM",           van: "ProMaster 2500",     segment: "K2/3", type: "Crew Cabin"     },
  { id: 50, brand: "RAM",           van: "ProMaster 2500",     segment: "K2/3", type: "Partition Wall" },

  // ── KIA ──────────────────────────────────────────────────────────────────────
  { id: 51, brand: "KIA",           van: "PV5",                segment: "K1",   type: "Crew Cabin"     },
  { id: 52, brand: "KIA",           van: "PV5",                segment: "K1",   type: "Partition Wall" },
];

// BOM rows per product type
const BOM_DATA = {
  "Crew Cabin": [
    { part: "SNK-CC-001", description: "Cabin Module Frame",         qty: 1, unit: "pcs" },
    { part: "SNK-CC-002", description: "Sliding Divider Panel",      qty: 1, unit: "pcs" },
    { part: "SNK-CC-003", description: "Upholstered Rear Seat Bench",qty: 1, unit: "pcs" },
    { part: "SNK-CC-004", description: "3-Point Safety Belt Set",    qty: 3, unit: "set" },
    { part: "SNK-CC-005", description: "Floor Mounting Bracket Set", qty: 1, unit: "set" },
    { part: "SNK-CC-006", description: "Wiring Harness Extension",   qty: 1, unit: "pcs" },
    { part: "SNK-CC-007", description: "Interior Trim Panel",        qty: 2, unit: "pcs" },
    { part: "SNK-CC-008", description: "Fastener & Hardware Kit",    qty: 1, unit: "kit" },
  ],
  "Flex Cabin": [
    { part: "SNK-FC-001", description: "Flex Module Frame",          qty: 1, unit: "pcs" },
    { part: "SNK-FC-002", description: "Folding Seat Assembly",      qty: 2, unit: "pcs" },
    { part: "SNK-FC-003", description: "Quick-Release Locking Rail", qty: 2, unit: "pcs" },
    { part: "SNK-FC-004", description: "3-Point Safety Belt Set",    qty: 2, unit: "set" },
    { part: "SNK-FC-005", description: "Conversion Floor Panel",     qty: 1, unit: "pcs" },
    { part: "SNK-FC-006", description: "Modular Divider Bracket",    qty: 4, unit: "pcs" },
    { part: "SNK-FC-007", description: "Fastener & Hardware Kit",    qty: 1, unit: "kit" },
  ],
  "Partition Wall": [
    { part: "SNK-PW-001", description: "Steel Partition Frame",      qty: 1, unit: "pcs" },
    { part: "SNK-PW-002", description: "Polycarbonate Window Panel", qty: 1, unit: "pcs" },
    { part: "SNK-PW-003", description: "Acoustic Foam Insert",       qty: 1, unit: "pcs" },
    { part: "SNK-PW-004", description: "Side Mounting Bracket Set",  qty: 1, unit: "set" },
    { part: "SNK-PW-005", description: "Fastener & Hardware Kit",    qty: 1, unit: "kit" },
  ],
};

const AFTERSALES_DATA = {
  "Crew Cabin": {
    warranty: "5 years structural / 2 years trim",
    serviceInterval: "Annual inspection recommended",
    spares: ["Seat upholstery set", "Belt retractor unit", "Mounting bracket (pair)", "Trim panel replacement"],
    contact: "aftersales@snoeks.com",
  },
  "Flex Cabin": {
    warranty: "5 years structural / 2 years mechanical",
    serviceInterval: "Annual inspection recommended",
    spares: ["Folding seat hinge kit", "Quick-release locking pin set", "Locking rail section", "Floor panel clip set"],
    contact: "aftersales@snoeks.com",
  },
  "Partition Wall": {
    warranty: "5 years structural / 3 years panel",
    serviceInterval: "Bi-annual inspection recommended",
    spares: ["Polycarbonate window panel", "Acoustic foam insert", "Mounting bracket (single)", "Rubber seal strip"],
    contact: "aftersales@snoeks.com",
  },
};
