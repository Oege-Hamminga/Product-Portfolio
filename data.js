/* ── Brand meta (card colour + abbreviation) ─────────────────────────── */
const BRAND_META = {
  "Citroën":        { color: "#C00011", abbr: "CIT" },
  "Peugeot":        { color: "#003189", abbr: "PEU" },
  "Opel":           { color: "#1C1C1C", abbr: "OPL" },
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

/* ── Product type icons ──────────────────────────────────────────────── */
const TYPE_ICON = {
  "Crew Cab":      "🚐",
  "Flex Cab":      "🔄",
  "Partition Wall":"🔩",
};

/* ── Helper to build a product entry ────────────────────────────────── */
let _id = 0;
function p(brand, van, segment, fitment, type) {
  return { id: ++_id, brand, van, segment, fitment, type };
}

/* ── Product catalog ─────────────────────────────────────────────────── */
const products = [

  /* ── VOLKSWAGEN ─────────────────────────────────────────────────── */
  p("Volkswagen","Caddy",       "F1",   "After-fit","Crew Cab"),
  p("Volkswagen","Caddy",       "F1",   "After-fit","Flex Cab"),
  p("Volkswagen","Caddy",       "F1",   "After-fit","Partition Wall"),
  p("Volkswagen","Transporter", "K1",   "After-fit","Crew Cab"),
  p("Volkswagen","Transporter", "K1",   "After-fit","Flex Cab"),
  p("Volkswagen","Crafter",     "K2/3", "After-fit","Crew Cab"),
  p("Volkswagen","Caravelle",   "K1",   "After-fit","Partition Wall"),
  p("Volkswagen","ID Buzz",     "K1",   "After-fit","Partition Wall"),
  p("Volkswagen","Multivan",    "K1",   "After-fit","Partition Wall"),

  /* ── STELLANTIS – F1 (OEM Crew Cab) ─────────────────────────────── */
  p("Citroën","Berlingo",   "F1","OEM","Crew Cab"),
  p("Fiat",   "Doblo",      "F1","OEM","Crew Cab"),
  p("Opel",   "Combo",      "F1","OEM","Crew Cab"),
  p("Peugeot","Partner",    "F1","OEM","Crew Cab"),
  p("Toyota", "Proace City","F1","OEM","Crew Cab"),

  /* ── STELLANTIS – K1 (OEM & After-fit, Crew Cab & Flex Cab) ─────── */
  p("Citroën","Jumpy", "K1","OEM",       "Crew Cab"),
  p("Citroën","Jumpy", "K1","OEM",       "Flex Cab"),
  p("Citroën","Jumpy", "K1","After-fit", "Crew Cab"),
  p("Citroën","Jumpy", "K1","After-fit", "Flex Cab"),

  p("Fiat",   "Scudo", "K1","OEM",       "Crew Cab"),
  p("Fiat",   "Scudo", "K1","OEM",       "Flex Cab"),
  p("Fiat",   "Scudo", "K1","After-fit", "Crew Cab"),
  p("Fiat",   "Scudo", "K1","After-fit", "Flex Cab"),

  p("Opel",   "Vivaro","K1","OEM",       "Crew Cab"),
  p("Opel",   "Vivaro","K1","OEM",       "Flex Cab"),
  p("Opel",   "Vivaro","K1","After-fit", "Crew Cab"),
  p("Opel",   "Vivaro","K1","After-fit", "Flex Cab"),

  p("Peugeot","Expert","K1","OEM",       "Crew Cab"),
  p("Peugeot","Expert","K1","OEM",       "Flex Cab"),
  p("Peugeot","Expert","K1","After-fit", "Crew Cab"),
  p("Peugeot","Expert","K1","After-fit", "Flex Cab"),

  p("Toyota", "Proace","K1","OEM",       "Crew Cab"),
  p("Toyota", "Proace","K1","OEM",       "Flex Cab"),
  p("Toyota", "Proace","K1","After-fit", "Crew Cab"),
  p("Toyota", "Proace","K1","After-fit", "Flex Cab"),

  /* ── STELLANTIS – K2/3 (OEM & After-fit, Crew Cab) ──────────────── */
  p("Citroën","Jumper",    "K2/3","OEM",       "Crew Cab"),
  p("Citroën","Jumper",    "K2/3","After-fit", "Crew Cab"),
  p("Fiat",   "Ducato",    "K2/3","OEM",       "Crew Cab"),
  p("Fiat",   "Ducato",    "K2/3","After-fit", "Crew Cab"),
  p("Opel",   "Movano",    "K2/3","OEM",       "Crew Cab"),
  p("Opel",   "Movano",    "K2/3","After-fit", "Crew Cab"),
  p("Peugeot","Boxer",     "K2/3","OEM",       "Crew Cab"),
  p("Peugeot","Boxer",     "K2/3","After-fit", "Crew Cab"),
  p("Toyota", "Proace Max","K2/3","OEM",       "Crew Cab"),
  p("Toyota", "Proace Max","K2/3","After-fit", "Crew Cab"),

  /* ── RAM ─────────────────────────────────────────────────────────── */
  p("RAM","ProMaster","K2/3","OEM","Crew Cab"),

  /* ── RENAULT ─────────────────────────────────────────────────────── */
  p("Renault","Trafic",        "K1",  "OEM",      "Crew Cab"),
  p("Renault","Trafic E-Tech", "K1",  "OEM",      "Crew Cab"),
  p("Renault","Master",        "K2/3","After-fit", "Crew Cab"),

  /* ── FORD ────────────────────────────────────────────────────────── */
  p("Ford","Transit Connect","F1",  "After-fit","Crew Cab"),
  p("Ford","Transit Custom", "K1",  "After-fit","Crew Cab"),
  p("Ford","Transit",        "K2/3","After-fit","Crew Cab"),
  p("Ford","Tourneo",        "K1",  "After-fit","Partition Wall"),
  p("Ford","Transit Kombi",  "K1",  "After-fit","Partition Wall"),

  /* ── IVECO ───────────────────────────────────────────────────────── */
  p("IVECO","Daily","K2/3","OEM",      "Crew Cab"),
  p("IVECO","Daily","K2/3","After-fit","Crew Cab"),

  /* ── MERCEDES-BENZ ───────────────────────────────────────────────── */
  p("Mercedes-Benz","Vito",      "K1","After-fit","Crew Cab"),
  p("Mercedes-Benz","Vito Mixto","K1","After-fit","Partition Wall"),
  p("Mercedes-Benz","V-Class",   "K1","After-fit","Partition Wall"),
  p("Mercedes-Benz","Sprinter",  "K1","After-fit","Crew Cab"),

  /* ── KIA ─────────────────────────────────────────────────────────── */
  p("KIA","PV5","K1","After-fit","Crew Cab"),
];

/* ── BOM data per product type ───────────────────────────────────────── */
const BOM_DATA = {
  "Crew Cab": [
    { part:"SNK-CC-001", description:"Crew Cabin Module Frame (steel)",       qty:1, unit:"pcs" },
    { part:"SNK-CC-002", description:"Sliding Divider Panel Assembly",        qty:1, unit:"pcs" },
    { part:"SNK-CC-003", description:"Upholstered Rear Seat Bench",           qty:1, unit:"pcs" },
    { part:"SNK-CC-004", description:"3-Point Inertia Reel Belt Set",         qty:3, unit:"set" },
    { part:"SNK-CC-005", description:"Floor Mounting Bracket Kit",            qty:1, unit:"kit" },
    { part:"SNK-CC-006", description:"Wiring Harness Extension",              qty:1, unit:"pcs" },
    { part:"SNK-CC-007", description:"Interior Trim Side Panel (pair)",       qty:2, unit:"pcs" },
    { part:"SNK-CC-008", description:"Acoustic Insulation Mat",               qty:1, unit:"pcs" },
    { part:"SNK-CC-009", description:"Fastener & Hardware Kit",               qty:1, unit:"kit" },
  ],
  "Flex Cab": [
    { part:"SNK-FC-001", description:"Flex Cabin Module Frame (aluminium)",   qty:1, unit:"pcs" },
    { part:"SNK-FC-002", description:"Folding Seat Assembly (fold-flat)",     qty:2, unit:"pcs" },
    { part:"SNK-FC-003", description:"Quick-Release Floor Rail System",       qty:2, unit:"pcs" },
    { part:"SNK-FC-004", description:"3-Point Inertia Reel Belt Set",         qty:2, unit:"set" },
    { part:"SNK-FC-005", description:"Modular Conversion Floor Panel",        qty:1, unit:"pcs" },
    { part:"SNK-FC-006", description:"Locking Rail End Stop (set of 4)",      qty:4, unit:"pcs" },
    { part:"SNK-FC-007", description:"Interior Trim Side Panel (pair)",       qty:2, unit:"pcs" },
    { part:"SNK-FC-008", description:"Fastener & Hardware Kit",               qty:1, unit:"kit" },
  ],
  "Partition Wall": [
    { part:"SNK-PW-001", description:"Steel Partition Wall Frame",            qty:1, unit:"pcs" },
    { part:"SNK-PW-002", description:"Polycarbonate Window Panel",            qty:1, unit:"pcs" },
    { part:"SNK-PW-003", description:"Acoustic Foam Insert",                  qty:1, unit:"pcs" },
    { part:"SNK-PW-004", description:"Side Mounting Bracket Set",             qty:1, unit:"set" },
    { part:"SNK-PW-005", description:"Rubber Edge Seal Strip",                qty:2, unit:"m"   },
    { part:"SNK-PW-006", description:"Fastener & Hardware Kit",               qty:1, unit:"kit" },
  ],
};

/* ── Aftersales data per product type ───────────────────────────────── */
const AFTERSALES_DATA = {
  "Crew Cab": {
    warranty:        "5 years structural / 2 years trim & upholstery",
    serviceInterval: "Annual inspection recommended",
    spares: ["Seat upholstery set","Belt retractor unit","Mounting bracket pair","Trim panel set","Acoustic mat"],
    contact: "aftersales@snoeks.com",
  },
  "Flex Cab": {
    warranty:        "5 years structural / 2 years mechanical components",
    serviceInterval: "Annual inspection recommended",
    spares: ["Folding seat hinge kit","Quick-release pin set (×4)","Rail section (per metre)","Floor panel clip set"],
    contact: "aftersales@snoeks.com",
  },
  "Partition Wall": {
    warranty:        "5 years structural / 3 years panel & seals",
    serviceInterval: "Bi-annual inspection recommended",
    spares: ["Polycarbonate window panel","Acoustic foam insert","Mounting bracket (single)","Rubber seal strip (per metre)"],
    contact: "aftersales@snoeks.com",
  },
};
