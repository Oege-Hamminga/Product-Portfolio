/* ── Vehicle image URLs ───────────────────────────────────────────────
   Local files in repo root for VW, Ford, MB, Renault, IVECO, KIA.
   Wikimedia Commons kept for Stellantis brands.
── */
const VAN_IMAGES = {
  /* ── Volkswagen ─────────────────────────────────────────────────── */
  "Caddy":          "Caddy.png",
  "Transporter":    "Transporter.png",
  "Crafter":        "Crafter.jpg",
  "Caravelle":      "Caravelle.jpg",
  "ID Buzz":        "ID buzz.jpg",
  "Multivan":       "Multivan.jpg",

  /* ── Stellantis – Wikimedia ─────────────────────────────────────── */
  "Berlingo":       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Citroen_Berlingo_2%2C0_HDi_DW10TD.JPG/640px-Citroen_Berlingo_2%2C0_HDi_DW10TD.JPG",
  "Jumpy":          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Tallink_Citro%C3%ABn_Jumpy.JPG/640px-Tallink_Citro%C3%ABn_Jumpy.JPG",
  "Jumper":         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Citro%C3%ABn_Jumper_II_rear.JPG/640px-Citro%C3%ABn_Jumper_II_rear.JPG",
  "Partner":        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/2012_Peugeot_Partner_1.6_HDI_panel_van_2.JPG/640px-2012_Peugeot_Partner_1.6_HDI_panel_van_2.JPG",
  "Expert":         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Peugeot_Expert_III.jpg/640px-Peugeot_Expert_III.jpg",
  "Boxer":          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Peugeot_Boxer_Transporter_%28seit_2006%29.JPG/640px-Peugeot_Boxer_Transporter_%28seit_2006%29.JPG",
  "Combo":          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2018_Opel_Combo_Life.jpg/640px-2018_Opel_Combo_Life.jpg",
  "Vivaro":         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Opel_Vivaro_20090905_front.JPG/640px-Opel_Vivaro_20090905_front.JPG",
  "Movano":         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Opel_Movano_B_front_20100705.jpg/640px-Opel_Movano_B_front_20100705.jpg",
  "Doblo":          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fiat_Doblo_Cargo_XXL_Facelift_front.JPG/640px-Fiat_Doblo_Cargo_XXL_Facelift_front.JPG",
  "Scudo":          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fiat_Scudo_%282022%29_IMG_6710.jpg/640px-Fiat_Scudo_%282022%29_IMG_6710.jpg",
  "Ducato":         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Fiat_Ducato_2.8_JTD.JPG/640px-Fiat_Ducato_2.8_JTD.JPG",
  "Proace City":    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Toyota_Proace_City.jpg/640px-Toyota_Proace_City.jpg",
  "Proace":         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Toyota_Proace_Seitenansicht.JPG/640px-Toyota_Proace_Seitenansicht.JPG",
  "Proace Max":     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2024_Toyota_Proace_Max_Electric_-_front.jpg/640px-2024_Toyota_Proace_Max_Electric_-_front.jpg",
  "ProMaster":      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2014_Ram_ProMaster_van%2C_rear_left_NYC.jpg/640px-2014_Ram_ProMaster_van%2C_rear_left_NYC.jpg",

  /* ── Renault ────────────────────────────────────────────────────── */
  "Trafic":         "Trafic.png",
  "Trafic E-Tech":  "Trafic E-tech.jpg",
  "Master":         "Master.jpg",

  /* ── Ford ───────────────────────────────────────────────────────── */
  "Transit Connect":"Connect.jpg",
  "Transit Custom": "Custom.jpg",
  "Transit":        "Transit.jpg",
  "Tourneo":        "Tourneo.jpg",
  "Transit Kombi":  "Kombi.jpg",

  /* ── IVECO ──────────────────────────────────────────────────────── */
  "Daily":          "Daily.jpg",

  /* ── Mercedes-Benz ──────────────────────────────────────────────── */
  "Vito":           "Vito.jpg",
  "Vito Mixto":     "Vito Mixto.jpg",
  "V-Class":        "V-class.jpg",
  "Sprinter":       "Sprinter.jpg",

  /* ── KIA ────────────────────────────────────────────────────────── */
  "PV5":            "PV5.jpg",
};

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

/* ── BOM Modules (for module-based BOM configurator) ─────────────────── */
const BOM_MODULES = {
  "Crew Cab": [
    { id:"frame",    label:"Structural Frame",      defaultOn:true,  parts:["SNK-CC-001","SNK-CC-005"] },
    { id:"divider",  label:"Divider Panel",          defaultOn:true,  parts:["SNK-CC-002"] },
    { id:"seating",  label:"Seating Module",         defaultOn:true,  parts:["SNK-CC-003","SNK-CC-004"] },
    { id:"wiring",   label:"Wiring Harness",         defaultOn:true,  parts:["SNK-CC-006"] },
    { id:"trim",     label:"Interior Trim",          defaultOn:true,  parts:["SNK-CC-007","SNK-CC-008"] },
    { id:"hardware", label:"Fastener Kit",           defaultOn:true,  parts:["SNK-CC-009"] },
  ],
  "Flex Cab": [
    { id:"frame",    label:"Structural Frame",      defaultOn:true,  parts:["SNK-FC-001","SNK-FC-005"] },
    { id:"seating",  label:"Folding Seat Assembly",  defaultOn:true,  parts:["SNK-FC-002","SNK-FC-004"] },
    { id:"rail",     label:"Floor Rail System",      defaultOn:true,  parts:["SNK-FC-003","SNK-FC-006"] },
    { id:"trim",     label:"Interior Trim",          defaultOn:true,  parts:["SNK-FC-007"] },
    { id:"hardware", label:"Fastener Kit",           defaultOn:true,  parts:["SNK-FC-008"] },
  ],
  "Partition Wall": [
    { id:"frame",    label:"Wall Frame",             defaultOn:true,  parts:["SNK-PW-001"] },
    { id:"window",   label:"Window Panel",           defaultOn:true,  parts:["SNK-PW-002"] },
    { id:"acoustic", label:"Acoustic Insulation",    defaultOn:false, parts:["SNK-PW-003"] },
    { id:"mounting", label:"Mounting System",        defaultOn:true,  parts:["SNK-PW-004","SNK-PW-005"] },
    { id:"hardware", label:"Fastener Kit",           defaultOn:true,  parts:["SNK-PW-006"] },
  ],
};

/* ── Market Presence data per product type ────────────────────────────── */
const MARKET_DATA = {
  "Crew Cab": {
    regions:        ["Netherlands","Belgium","Germany","France","United Kingdom","Spain","Italy","Poland"],
    oemBrands:      ["Citroën","Peugeot","Opel","Fiat","Toyota","Renault","IVECO","RAM"],
    afterfitBrands: ["Volkswagen","Ford","Mercedes-Benz","KIA"],
    applications:   ["Construction & Field Crews","Passenger Transport","Emergency Services","Utility Fleet"],
    certifications: ["ECE R17","ECE R80","ISO 9001:2015"],
    launchYear:     2019,
    unitsFY25:      "~1,200 units",
  },
  "Flex Cab": {
    regions:        ["Netherlands","Belgium","Germany","France","United Kingdom"],
    oemBrands:      ["Citroën","Peugeot","Opel","Fiat","Toyota"],
    afterfitBrands: [],
    applications:   ["Multi-purpose Fleet","Delivery + Crew Hybrid","Trade Services"],
    certifications: ["ECE R17","ECE R80","ISO 9001:2015"],
    launchYear:     2021,
    unitsFY25:      "~480 units",
  },
  "Partition Wall": {
    regions:        ["Netherlands","Belgium","Germany","France","United Kingdom","Spain"],
    oemBrands:      [],
    afterfitBrands: ["Volkswagen","Ford","Mercedes-Benz"],
    applications:   ["Cargo Security","Driver Separation","Refrigerated Transport Support"],
    certifications: ["ECE R17 (partition retention)","DIN EN 12642","ISO 9001:2015"],
    launchYear:     2017,
    unitsFY25:      "~2,100 units",
  },
};
