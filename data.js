/* ── Vehicle image URLs ────────────────────────────────────────────────────── */
const VAN_IMAGES = {
  /* ── Volkswagen ─────────────────────────────────────────────────── */
  "Caddy":          "Caddy.png",
  "Transporter":    "Transporter.png",
  "Crafter":        "Crafter.jpg",
  "Caravelle":      "Caravelle.jpg",
  "ID Buzz":        "ID buzz.jpg",
  "Multivan":       "Multivan.jpg",

  /* ── Citroën ────────────────────────────────────────────────────── */
  "Berlingo":       "Berlingo.jpeg",
  "Jumpy":          "Jumpy.jpg",
  "Jumpy Combi":    "Jumpy combi.png",
  "Jumper":         "Jumper.jpg",

  /* ── Peugeot ────────────────────────────────────────────────────── */
  "Partner":        "Partner.jpg",
  "Expert":         "expert.webp",
  "Boxer":          "boxer.jpg",

  /* ── Opel ───────────────────────────────────────────────────────── */
  "Combo":          "combo.webp",
  "Vivaro":         "vivaro.webp",
  "Movano":         "movano.jpg",

  /* ── Fiat ───────────────────────────────────────────────────────── */
  "Doblo":          "doblo.jpg",
  "Scudo":          "scudo.jpg",
  "Ducato":         "ducato.jpg",

  /* ── Toyota ─────────────────────────────────────────────────────── */
  "Proace City":    "proace city.jpg",
  "Proace":         "proace.jpg",
  "Proace Max":     "proace max.jpg",

  /* ── RAM ────────────────────────────────────────────────────────── */
  "ProMaster":      "promaster.jpg",

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

  /* ── MAN ────────────────────────────────────────────────────────── */
  "TGE":            "TGE.jpg",

  /* ── KIA ────────────────────────────────────────────────────────── */
  "PV5":            "PV5.jpg",
};

/* ── Product images (Snoeks conversion photos) ───────────────────────────── */
const PRODUCT_IMAGES = {
  "Citroën|Berlingo|Crew Cab": "Berlingo Crew Cab.jpg",
  "Citroën|Jumpy|Crew Cab":    "Jumpy Crew Cab.jpg",
  "Citroën|Jumpy|Flex Cab":    "Jumpy Flex Cab.jpg",
  "Citroën|Jumper|Crew Cab":   "Jumper Crew Cab.jpg",
};

function getProductImage(product) {
  return PRODUCT_IMAGES[`${product.brand}|${product.van}|${product.type}`] || null;
}

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
  "MAN":            { color: "#E4002B", abbr: "MAN" },
  "KIA":            { color: "#05141F", abbr: "KIA" },
};

/* ── Product type icons ──────────────────────────────────────────────── */
const TYPE_ICON = {
  "Crew Cab":      "",
  "Flex Cab":      "",
  "Partition Wall":"",
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

  /* ── CITROËN Jumpy Combi – K1 (After-fit Partition Wall) ──────────── */
  p("Citroën","Jumpy Combi","K1","After-fit","Partition Wall"),

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
  p("Renault","Trafic",        "K1",  "OEM",       "Crew Cab"),
  p("Renault","Trafic E-Tech", "K1",  "OEM",       "Crew Cab"),
  p("Renault","Master",        "K2/3","After-fit",  "Crew Cab"),

  /* ── FORD ────────────────────────────────────────────────────────── */
  p("Ford","Transit Connect","F1",  "After-fit","Crew Cab"),
  p("Ford","Transit Custom", "K1",  "After-fit","Crew Cab"),
  p("Ford","Transit",        "K2/3","After-fit","Crew Cab"),
  p("Ford","Tourneo",        "K1",  "After-fit","Partition Wall"),
  p("Ford","Transit Kombi",  "K1",  "After-fit","Partition Wall"),

  /* ── IVECO ───────────────────────────────────────────────────────── */
  p("IVECO","Daily","K2/3","OEM",       "Crew Cab"),
  p("IVECO","Daily","K2/3","After-fit", "Crew Cab"),

  /* ── MERCEDES-BENZ ───────────────────────────────────────────────── */
  p("Mercedes-Benz","Vito",      "K1","After-fit","Crew Cab"),
  p("Mercedes-Benz","Vito Mixto","K1","After-fit","Partition Wall"),
  p("Mercedes-Benz","V-Class",   "K1","After-fit","Partition Wall"),
  p("Mercedes-Benz","Sprinter",  "K1","After-fit","Crew Cab"),

  /* ── MAN ─────────────────────────────────────────────────────────── */
  p("MAN","TGE","K2/3","After-fit","Crew Cab"),

  /* ── KIA ─────────────────────────────────────────────────────────── */
  p("KIA","PV5","K1","After-fit","Crew Cab"),
];

/* ═══════════════════════════════════════════════════════════════════════
   BOM DATA
═══════════════════════════════════════════════════════════════════════ */
const BOM_DATA = {
  "Crew Cab": [
    /* Structural Frame */
    { part:"SNK-CC-F01", description:"Crew Cab Frame Assembly – Short Body (L1)",         qty:1, unit:"pcs" },
    { part:"SNK-CC-F02", description:"Crew Cab Frame Assembly – Medium Body (L2)",        qty:1, unit:"pcs" },
    { part:"SNK-CC-F03", description:"Crew Cab Frame Assembly – Long Body (L3)",          qty:1, unit:"pcs" },
    { part:"SNK-CC-F10", description:"Floor Mounting Bracket Kit",                        qty:1, unit:"kit" },
    /* Divider */
    { part:"SNK-CC-D01", description:"Sliding Divider Panel Assembly",                    qty:1, unit:"pcs" },
    /* Seating */
    { part:"SNK-CC-S01", description:"Upholstered Rear Seat Bench",                       qty:1, unit:"pcs" },
    { part:"SNK-CC-S02", description:"3-Point Inertia Reel Belt Set",                     qty:3, unit:"set" },
    /* Sliding door kits */
    { part:"SNK-CC-DR1", description:"Single Sliding Door Reinforcement Kit",             qty:1, unit:"kit" },
    { part:"SNK-CC-DR2", description:"Double Sliding Door Reinforcement Kit",             qty:1, unit:"kit" },
    /* Windows */
    { part:"SNK-CC-W00", description:"Factory Window Retention Bracket Set",              qty:1, unit:"set" },
    { part:"SNK-CC-W01", description:"Clear Glass Window Pack",                           qty:1, unit:"pcs" },
    { part:"SNK-CC-W02", description:"Tinted Glass Window Pack (65 % VLT)",               qty:1, unit:"pcs" },
    { part:"SNK-CC-W03", description:"Opaque ABS Window Cover Pack",                     qty:1, unit:"pcs" },
    /* Upholstery */
    { part:"SNK-CC-U01", description:"Vinyl Upholstery Set",                              qty:1, unit:"set" },
    { part:"SNK-CC-U02", description:"Fabric & Foam Upholstery Set",                     qty:1, unit:"set" },
    /* Trim */
    { part:"SNK-CC-T01", description:"Base Interior Trim Package",                        qty:1, unit:"pcs" },
    { part:"SNK-CC-T02", description:"Comfort Interior Trim Package",                     qty:1, unit:"pcs" },
    { part:"SNK-CC-T03", description:"Premium Interior Trim Package",                     qty:1, unit:"pcs" },
    /* Electrical & hardware */
    { part:"SNK-CC-E01", description:"Wiring Harness Extension",                          qty:1, unit:"pcs" },
    { part:"SNK-CC-HW1", description:"Fastener & Hardware Kit",                           qty:1, unit:"kit" },

    /* ── Jumpy-specific parts ──────────────────────────────────────── */
    { part:"SNK-JY-KL1", description:"Keyless Entry Wiring & Relay Adapter Kit – Jumpy", qty:1, unit:"kit" },
    { part:"SNK-JY-DH1", description:"Door Handle Clearance Modification Bracket – Jumpy",qty:1, unit:"pcs" },
    { part:"SNK-JY-SB1", description:"Front Bench Seat Bracket Modification Set – Jumpy", qty:1, unit:"set" },
    { part:"SNK-JY-AT1", description:"Airbag B-Pillar Trim Integration Panel – Jumpy",    qty:1, unit:"pcs" },

    /* ── Jumper-specific parts ─────────────────────────────────────── */
    { part:"SNK-JP-F04", description:"Crew Cab Frame Assembly – Extra Long Body (L4) – Jumper", qty:1, unit:"pcs" },
    { part:"SNK-JP-H01", description:"Height Adaptation Pack H1 – Low Roof – Jumper",    qty:1, unit:"kit" },
    { part:"SNK-JP-H02", description:"Height Adaptation Pack H2 – Medium Roof – Jumper", qty:1, unit:"kit" },
    { part:"SNK-JP-H03", description:"Height Adaptation Pack H3 – High Roof – Jumper",   qty:1, unit:"kit" },
    { part:"SNK-JP-LD1", description:"LED Lighting Harness Adapter – Jumper",             qty:1, unit:"pcs" },
    { part:"SNK-JP-VZ1", description:"Air Suspension Seat Interface Kit – Jumper",        qty:1, unit:"kit" },
    { part:"SNK-JP-PW1", description:"Partition Wall Integration Bracket Kit – Jumper",   qty:1, unit:"kit" },
  ],

  "Flex Cab": [
    { part:"SNK-FC-F01", description:"Flex Cab Frame Assembly – Short Body (L1)",        qty:1, unit:"pcs" },
    { part:"SNK-FC-F02", description:"Flex Cab Frame Assembly – Medium Body (L2)",       qty:1, unit:"pcs" },
    { part:"SNK-FC-F03", description:"Flex Cab Frame Assembly – Long Body (L3)",         qty:1, unit:"pcs" },
    { part:"SNK-FC-P01", description:"Modular Conversion Floor Panel",                   qty:1, unit:"pcs" },
    { part:"SNK-FC-R01", description:"Quick-Release Floor Rail System (pair)",           qty:2, unit:"pcs" },
    { part:"SNK-FC-R02", description:"Locking Rail End Stop Set (4 pcs)",               qty:4, unit:"pcs" },
    { part:"SNK-FC-S01", description:"Folding Seat Assembly (fold-flat)",                qty:2, unit:"pcs" },
    { part:"SNK-FC-S02", description:"3-Point Inertia Reel Belt Set",                    qty:2, unit:"set" },
    { part:"SNK-FC-DR1", description:"Single Sliding Door Reinforcement Kit",            qty:1, unit:"kit" },
    { part:"SNK-FC-DR2", description:"Double Sliding Door Reinforcement Kit",            qty:1, unit:"kit" },
    { part:"SNK-FC-W01", description:"Clear Glass Window Pack",                          qty:1, unit:"pcs" },
    { part:"SNK-FC-W02", description:"Tinted Glass Window Pack (65 % VLT)",              qty:1, unit:"pcs" },
    { part:"SNK-FC-U01", description:"Vinyl Upholstery Set",                             qty:1, unit:"set" },
    { part:"SNK-FC-U02", description:"Fabric & Foam Upholstery Set",                    qty:1, unit:"set" },
    { part:"SNK-FC-T01", description:"Base Trim Package",                                qty:1, unit:"pcs" },
    { part:"SNK-FC-T02", description:"Comfort Trim Package",                             qty:1, unit:"pcs" },
    { part:"SNK-FC-HW1", description:"Fastener & Hardware Kit",                          qty:1, unit:"kit" },
  ],

  "Partition Wall": [
    { part:"SNK-PW-F01", description:"Steel Partition Frame – Standard Width",           qty:1, unit:"pcs" },
    { part:"SNK-PW-F02", description:"Steel Partition Frame – Extended Width",           qty:1, unit:"pcs" },
    { part:"SNK-PW-M01", description:"Side Mounting Bracket Set",                        qty:1, unit:"set" },
    { part:"SNK-PW-M02", description:"Rubber Edge Seal Strip",                           qty:2, unit:"m"   },
    { part:"SNK-PW-W00", description:"Solid Steel Infill Panel",                         qty:1, unit:"pcs" },
    { part:"SNK-PW-W01", description:"Polycarbonate Window Panel",                       qty:1, unit:"pcs" },
    { part:"SNK-PW-W02", description:"Tempered Glass Window Panel",                      qty:1, unit:"pcs" },
    { part:"SNK-PW-W03", description:"Steel Mesh Window Panel",                          qty:1, unit:"pcs" },
    { part:"SNK-PW-A01", description:"Acoustic Foam Insert",                             qty:1, unit:"pcs" },
    { part:"SNK-PW-L01", description:"Vinyl Surface Lining Kit",                         qty:1, unit:"kit" },
    { part:"SNK-PW-T01", description:"Base Finish Package",                              qty:1, unit:"pcs" },
    { part:"SNK-PW-T02", description:"Standard Finish Package",                          qty:1, unit:"pcs" },
    { part:"SNK-PW-T03", description:"Premium Finish Package",                           qty:1, unit:"pcs" },
    { part:"SNK-PW-HW1", description:"Fastener & Hardware Kit",                          qty:1, unit:"kit" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   BOM MODULES (generic, by product type – all defaultOn: false)
═══════════════════════════════════════════════════════════════════════ */
const BOM_MODULES = {
  "Crew Cab": [
    { id:"frame-l1",    label:"Frame – L1 Short Body",            defaultOn:false, parts:["SNK-CC-F01","SNK-CC-F10"] },
    { id:"frame-l2",    label:"Frame – L2 Medium Body",           defaultOn:false, parts:["SNK-CC-F02","SNK-CC-F10"] },
    { id:"frame-l3",    label:"Frame – L3 Long Body",             defaultOn:false, parts:["SNK-CC-F03","SNK-CC-F10"] },
    { id:"divider",     label:"Divider Panel",                     defaultOn:false, parts:["SNK-CC-D01"] },
    { id:"seating",     label:"Seating & Safety Belts",            defaultOn:false, parts:["SNK-CC-S01","SNK-CC-S02"] },
    { id:"door-single", label:"Single Sliding Door Kit",           defaultOn:false, parts:["SNK-CC-DR1"] },
    { id:"door-double", label:"Double Sliding Door Kit",           defaultOn:false, parts:["SNK-CC-DR2"] },
    { id:"win-retain",  label:"Factory Window Retention",          defaultOn:false, parts:["SNK-CC-W00"] },
    { id:"win-clear",   label:"Clear Glass Window Pack",           defaultOn:false, parts:["SNK-CC-W01"] },
    { id:"win-tinted",  label:"Tinted Glass Window Pack",          defaultOn:false, parts:["SNK-CC-W02"] },
    { id:"win-opaque",  label:"Opaque Window Cover Pack",          defaultOn:false, parts:["SNK-CC-W03"] },
    { id:"uph-vinyl",   label:"Vinyl Upholstery",                  defaultOn:false, parts:["SNK-CC-U01"] },
    { id:"uph-fabric",  label:"Fabric Upholstery",                 defaultOn:false, parts:["SNK-CC-U02"] },
    { id:"trim-base",   label:"Base Trim Package",                 defaultOn:false, parts:["SNK-CC-T01"] },
    { id:"trim-comf",   label:"Comfort Trim Package",              defaultOn:false, parts:["SNK-CC-T02"] },
    { id:"trim-prem",   label:"Premium Trim Package",              defaultOn:false, parts:["SNK-CC-T03"] },
    { id:"wiring",      label:"Wiring Harness Extension",          defaultOn:false, parts:["SNK-CC-E01"] },
    { id:"hardware",    label:"Fastener & Hardware Kit",           defaultOn:false, parts:["SNK-CC-HW1"] },
  ],
  "Flex Cab": [
    { id:"frame-l1",    label:"Flex Frame – L1 Short Body",       defaultOn:false, parts:["SNK-FC-F01","SNK-FC-P01"] },
    { id:"frame-l2",    label:"Flex Frame – L2 Medium Body",      defaultOn:false, parts:["SNK-FC-F02","SNK-FC-P01"] },
    { id:"frame-l3",    label:"Flex Frame – L3 Long Body",        defaultOn:false, parts:["SNK-FC-F03","SNK-FC-P01"] },
    { id:"rail",        label:"Floor Rail System",                 defaultOn:false, parts:["SNK-FC-R01","SNK-FC-R02"] },
    { id:"seating",     label:"Folding Seats & Safety Belts",      defaultOn:false, parts:["SNK-FC-S01","SNK-FC-S02"] },
    { id:"door-single", label:"Single Sliding Door Kit",           defaultOn:false, parts:["SNK-FC-DR1"] },
    { id:"door-double", label:"Double Sliding Door Kit",           defaultOn:false, parts:["SNK-FC-DR2"] },
    { id:"win-clear",   label:"Clear Glass Window Pack",           defaultOn:false, parts:["SNK-FC-W01"] },
    { id:"win-tinted",  label:"Tinted Glass Window Pack",          defaultOn:false, parts:["SNK-FC-W02"] },
    { id:"uph-vinyl",   label:"Vinyl Upholstery",                  defaultOn:false, parts:["SNK-FC-U01"] },
    { id:"uph-fabric",  label:"Fabric Upholstery",                 defaultOn:false, parts:["SNK-FC-U02"] },
    { id:"trim-base",   label:"Base Trim Package",                 defaultOn:false, parts:["SNK-FC-T01"] },
    { id:"trim-comf",   label:"Comfort Trim Package",              defaultOn:false, parts:["SNK-FC-T02"] },
    { id:"hardware",    label:"Fastener & Hardware Kit",           defaultOn:false, parts:["SNK-FC-HW1"] },
  ],
  "Partition Wall": [
    { id:"frame-std",   label:"Frame – Standard Width",           defaultOn:false, parts:["SNK-PW-F01"] },
    { id:"frame-ext",   label:"Frame – Extended Width",           defaultOn:false, parts:["SNK-PW-F02"] },
    { id:"mounting",    label:"Mounting System & Edge Seal",       defaultOn:false, parts:["SNK-PW-M01","SNK-PW-M02"] },
    { id:"win-solid",   label:"Solid Steel Infill Panel",          defaultOn:false, parts:["SNK-PW-W00"] },
    { id:"win-poly",    label:"Polycarbonate Window Panel",        defaultOn:false, parts:["SNK-PW-W01"] },
    { id:"win-glass",   label:"Tempered Glass Window",             defaultOn:false, parts:["SNK-PW-W02"] },
    { id:"win-mesh",    label:"Steel Mesh Window",                 defaultOn:false, parts:["SNK-PW-W03"] },
    { id:"acoustic",    label:"Acoustic Insulation Foam",          defaultOn:false, parts:["SNK-PW-A01"] },
    { id:"lining",      label:"Vinyl Surface Lining",              defaultOn:false, parts:["SNK-PW-L01"] },
    { id:"trim-base",   label:"Base Finish Package",               defaultOn:false, parts:["SNK-PW-T01"] },
    { id:"trim-std",    label:"Standard Finish Package",           defaultOn:false, parts:["SNK-PW-T02"] },
    { id:"trim-prem",   label:"Premium Finish Package",            defaultOn:false, parts:["SNK-PW-T03"] },
    { id:"hardware",    label:"Fastener & Hardware Kit",           defaultOn:false, parts:["SNK-PW-HW1"] },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   VEHICLE-SPECIFIC BOM MODULES (extend generic BOM_MODULES additively)
   Keyed by "brand|van" → product type → extra modules array
═══════════════════════════════════════════════════════════════════════ */
const VEHICLE_BOM_MODULES = {
  "Citroën|Jumpy": {
    "Crew Cab": [
      { id:"keyless",     label:"Keyless Entry Adapter Kit",             defaultOn:false, parts:["SNK-JY-KL1"] },
      { id:"deurhendel",  label:"Deurhendel Modificatie Kit",            defaultOn:false, parts:["SNK-JY-DH1"] },
      { id:"seat-bench",  label:"Voorbank Modificatie Set",              defaultOn:false, parts:["SNK-JY-SB1"] },
      { id:"airbag-trim", label:"Airbag B-stijl Trim Afwerking",        defaultOn:false, parts:["SNK-JY-AT1"] },
    ],
  },
  "Citroën|Jumper": {
    "Crew Cab": [
      { id:"frame-l4",    label:"Frame – L4 Extra Long Body",            defaultOn:false, parts:["SNK-JP-F04","SNK-CC-F10"] },
      { id:"height-h1",   label:"Hoogtepakket H1 – Laag",               defaultOn:false, parts:["SNK-JP-H01"] },
      { id:"height-h2",   label:"Hoogtepakket H2 – Middel",             defaultOn:false, parts:["SNK-JP-H02"] },
      { id:"height-h3",   label:"Hoogtepakket H3 – Hoog",               defaultOn:false, parts:["SNK-JP-H03"] },
      { id:"led",         label:"LED Verlichting Adapter",               defaultOn:false, parts:["SNK-JP-LD1"] },
      { id:"veerzitting", label:"Veerzitting Modificatie Kit",           defaultOn:false, parts:["SNK-JP-VZ1"] },
      { id:"partition",   label:"Separatiewand Integratiekit",           defaultOn:false, parts:["SNK-JP-PW1"] },
    ],
  },
};

/* ── BOM module helpers ──────────────────────────────────────────────── */
function getBOMModules(product) {
  const base  = BOM_MODULES[product.type] || [];
  const vKey  = `${product.brand}|${product.van}`;
  const extra = (VEHICLE_BOM_MODULES[vKey] || {})[product.type] || [];
  return [...base, ...extra];
}

function getBOMParts(product) {
  return BOM_DATA[product.type] || [];
}

/* ═══════════════════════════════════════════════════════════════════════
   CONFIGURATOR (generic, English, keyed by product type)
═══════════════════════════════════════════════════════════════════════ */
const CONFIGURATOR = {
  "Crew Cab": {
    alwaysActive: ["divider","seating","wiring","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "length", label: "Body Length",
        options: [
          { value:"l1", label:"L1 – Short Body",  activates:["frame-l1"] },
          { value:"l2", label:"L2 – Medium Body", activates:["frame-l2"] },
          { value:"l3", label:"L3 – Long Body",   activates:["frame-l3"] },
        ]
      },
      {
        id: "sliding_doors", label: "Sliding Doors",
        options: [
          { value:"single", label:"Single Sliding Door",   activates:["door-single"] },
          { value:"double", label:"Double Sliding Doors",  activates:["door-double"] },
        ]
      },
      {
        id: "factory_windows", label: "Factory Windows",
        options: [
          { value:"yes", label:"With Factory Windows", activates:["win-retain"] },
          { value:"no",  label:"No Factory Windows",   activates:[] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"clear",  label:"Clear Glass",    activates:["win-clear"] },
          { value:"tinted", label:"Tinted Glass",   activates:["win-tinted"] },
          { value:"opaque", label:"Opaque Panel",   activates:["win-opaque"] },
          { value:"none",   label:"No Window",      activates:[] },
        ]
      },
      {
        id: "upholstery", label: "Upholstery Type",
        options: [
          { value:"vinyl",  label:"Vinyl",   activates:["uph-vinyl"] },
          { value:"fabric", label:"Fabric",  activates:["uph-fabric"] },
        ]
      },
      {
        id: "trim_level", label: "Trim Level",
        options: [
          { value:"base",    label:"Base",    activates:["trim-base"] },
          { value:"comfort", label:"Comfort", activates:["trim-comf"] },
          { value:"premium", label:"Premium", activates:["trim-prem"] },
        ]
      },
    ]
  },

  "Flex Cab": {
    alwaysActive: ["rail","seating","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "length", label: "Body Length",
        options: [
          { value:"l1", label:"L1 – Short Body",  activates:["frame-l1"] },
          { value:"l2", label:"L2 – Medium Body", activates:["frame-l2"] },
          { value:"l3", label:"L3 – Long Body",   activates:["frame-l3"] },
        ]
      },
      {
        id: "sliding_doors", label: "Sliding Doors",
        options: [
          { value:"single", label:"Single Sliding Door",  activates:["door-single"] },
          { value:"double", label:"Double Sliding Doors", activates:["door-double"] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"none",   label:"No Window",    activates:[] },
          { value:"clear",  label:"Clear Glass",  activates:["win-clear"] },
          { value:"tinted", label:"Tinted Glass", activates:["win-tinted"] },
        ]
      },
      {
        id: "upholstery", label: "Upholstery Type",
        options: [
          { value:"vinyl",  label:"Vinyl",   activates:["uph-vinyl"] },
          { value:"fabric", label:"Fabric",  activates:["uph-fabric"] },
        ]
      },
      {
        id: "trim_level", label: "Trim Level",
        options: [
          { value:"base",    label:"Base",    activates:["trim-base"] },
          { value:"comfort", label:"Comfort", activates:["trim-comf"] },
        ]
      },
    ]
  },

  "Partition Wall": {
    alwaysActive: ["mounting","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "width", label: "Partition Width",
        options: [
          { value:"standard", label:"Standard Width",  activates:["frame-std"] },
          { value:"extended", label:"Extended Width",  activates:["frame-ext"] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"none",  label:"No Window (Solid)",    activates:["win-solid"] },
          { value:"poly",  label:"Polycarbonate Panel",  activates:["win-poly"] },
          { value:"glass", label:"Tempered Glass",       activates:["win-glass"] },
          { value:"mesh",  label:"Steel Mesh",           activates:["win-mesh"] },
        ]
      },
      {
        id: "acoustic", label: "Acoustic Insulation",
        options: [
          { value:"yes", label:"Include", activates:["acoustic"] },
          { value:"no",  label:"Exclude", activates:[] },
        ]
      },
      {
        id: "upholstery", label: "Upholstery / Lining",
        options: [
          { value:"none",  label:"None",         activates:[] },
          { value:"vinyl", label:"Vinyl Lining",  activates:["lining"] },
        ]
      },
      {
        id: "trim_level", label: "Trim Level",
        options: [
          { value:"base",     label:"Base",     activates:["trim-base"] },
          { value:"standard", label:"Standard", activates:["trim-std"] },
          { value:"premium",  label:"Premium",  activates:["trim-prem"] },
        ]
      },
    ]
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   VEHICLE CONFIGURATOR (Dutch, vehicle-specific)
   Keyed "brand|van" → product type → { alwaysActive, blockingQuestions, questions }
   blockingQuestions must be answered BEFORE the main configurator unlocks.
═══════════════════════════════════════════════════════════════════════ */
const VEHICLE_CONFIGURATOR = {

  /* ── Citroën Jumpy ─────────────────────────────────────────────── */
  "Citroën|Jumpy": {
    "Crew Cab": {
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [],
      questions: [
        {
          id: "wielbasis", label: "Wielbasis",
          options: [
            { value:"kort",  label:"Kort (XS / S)",   activates:["frame-l1"] },
            { value:"lang",  label:"Lang (M / L / XL)", activates:["frame-l2"] },
          ]
        },
        {
          id: "schuifdeur", label: "Schuifdeur configuratie",
          options: [
            { value:"enkel",  label:"Enkele schuifdeur",    activates:["door-single"] },
            { value:"dubbel", label:"Dubbele schuifdeuren", activates:["door-double"] },
          ]
        },
        {
          id: "keyless", label: "Keyless entry & start",
          options: [
            { value:"ja",  label:"Aanwezig",      activates:["keyless"] },
            { value:"nee", label:"Niet aanwezig", activates:[] },
          ]
        },
        {
          id: "deurhendel", label: "Heeft uw voertuig een deurhendel?",
          options: [
            { value:"ja",  label:"Ja",  activates:["deurhendel"] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
        {
          id: "ramen_b", label: "Ramen achter B-stijl",
          options: [
            { value:"geen",     label:"Geen ramen", activates:[] },
            { value:"aanwezig", label:"Aanwezig",   activates:["win-retain"] },
          ]
        },
        {
          id: "glassoort", label: "Glassoort voor dubbele cabine",
          options: [
            { value:"helder",  label:"Helder glas",   activates:["win-clear"]  },
            { value:"getint",  label:"Getint glas",   activates:["win-tinted"] },
            { value:"opaque",  label:"Opaak paneel",  activates:["win-opaque"] },
            { value:"geen",    label:"Geen",          activates:[] },
          ]
        },
        {
          id: "separatiewand", label: "Separatiewand aanwezig",
          options: [
            { value:"ja",  label:"Ja",  activates:[] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
        {
          id: "voorstoel", label: "Voorstoel / bank",
          options: [
            { value:"stoel", label:"Voorstoelen",  activates:[] },
            { value:"bank",  label:"Voorbank",     activates:["seat-bench"] },
          ]
        },
        {
          id: "bekleding", label: "Bekleding voorstoelen",
          options: [
            { value:"stof",  label:"Stof",  activates:["uph-fabric"] },
            { value:"vinyl", label:"Vinyl", activates:["uph-vinyl"]  },
          ]
        },
        {
          id: "airbags", label: "Airbags aanwezig in de bovenzijde van de B-stijl?",
          options: [
            { value:"ja",  label:"Ja",  activates:["airbag-trim"] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
      ]
    },

    "Flex Cab": {
      alwaysActive: ["rail","seating","hardware"],
      blockingQuestions: [],
      questions: [
        {
          id: "wielbasis", label: "Wielbasis",
          options: [
            { value:"kort", label:"Kort (XS / S)",    activates:["frame-l1"] },
            { value:"lang", label:"Lang (M / L / XL)", activates:["frame-l2"] },
          ]
        },
        {
          id: "schuifdeur", label: "Schuifdeur configuratie",
          options: [
            { value:"enkel",  label:"Enkele schuifdeur",    activates:["door-single"] },
            { value:"dubbel", label:"Dubbele schuifdeuren", activates:["door-double"] },
          ]
        },
        {
          id: "keyless", label: "Keyless entry & start",
          options: [
            { value:"ja",  label:"Aanwezig",      activates:[] },
            { value:"nee", label:"Niet aanwezig", activates:[] },
          ]
        },
        {
          id: "ramen_b", label: "Ramen achter B-stijl",
          options: [
            { value:"geen",     label:"Geen ramen", activates:[] },
            { value:"aanwezig", label:"Aanwezig",   activates:["win-retain"] },
          ]
        },
        {
          id: "glassoort", label: "Glassoort",
          options: [
            { value:"helder",  label:"Helder glas",  activates:["win-clear"]  },
            { value:"getint",  label:"Getint glas",  activates:["win-tinted"] },
            { value:"geen",    label:"Geen",         activates:[] },
          ]
        },
        {
          id: "bekleding", label: "Bekleding voorstoelen",
          options: [
            { value:"stof",  label:"Stof",  activates:["uph-fabric"] },
            { value:"vinyl", label:"Vinyl", activates:["uph-vinyl"]  },
          ]
        },
      ]
    },
  },

  /* ── Citroën Jumper ────────────────────────────────────────────── */
  "Citroën|Jumper": {
    "Crew Cab": {
      alwaysActive: ["divider","seating","wiring","hardware"],

      /* These two questions are shown ABOVE the main configurator and must
         be answered before the configurator becomes interactive. */
      blockingQuestions: [
        {
          id: "led_verlichting", label: "LED Verlichting aanwezig",
          options: [
            { value:"ja",  label:"Ja",  activates:["led"] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
        {
          id: "veerzitting", label: "Veerzitting in bestuurdersstoel",
          options: [
            { value:"ja",  label:"Ja",  activates:["veerzitting"] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
      ],

      questions: [
        {
          id: "wielbasis", label: "Wielbasis",
          options: [
            { value:"kort",  label:"Kort (L1 / L2)", activates:["frame-l1"] },
            { value:"middel",label:"Middel (L3)",    activates:["frame-l2"] },
            { value:"lang",  label:"Lang (L4)",      activates:["frame-l4"] },
          ]
        },
        {
          id: "hoogte", label: "Hoogte",
          options: [
            { value:"h1", label:"H1 – Laag",   activates:["height-h1"] },
            { value:"h2", label:"H2 – Middel", activates:["height-h2"] },
            { value:"h3", label:"H3 – Hoog",   activates:["height-h3"] },
          ]
        },
        {
          id: "schuifdeur", label: "Schuifdeur configuratie",
          options: [
            { value:"enkel",  label:"Enkele schuifdeur",    activates:["door-single"] },
            { value:"dubbel", label:"Dubbele schuifdeuren", activates:["door-double"] },
          ]
        },
        {
          id: "ramen_b", label: "Ramen achter B stijl",
          options: [
            { value:"geen",     label:"Geen ramen", activates:[] },
            { value:"aanwezig", label:"Aanwezig",   activates:["win-retain"] },
          ]
        },
        {
          id: "glassoort", label: "Glassoort voor dubbele cabine",
          options: [
            { value:"helder",  label:"Helder glas",  activates:["win-clear"]  },
            { value:"getint",  label:"Getint glas",  activates:["win-tinted"] },
            { value:"opaque",  label:"Opaak paneel", activates:["win-opaque"] },
            { value:"geen",    label:"Geen",         activates:[] },
          ]
        },
        {
          id: "separatiewand", label: "Separatiewand aanwezig",
          options: [
            { value:"ja",  label:"Ja",  activates:["partition"] },
            { value:"nee", label:"Nee", activates:[] },
          ]
        },
        {
          id: "bekleding", label: "Bekleding voorstoelen",
          options: [
            { value:"stof",  label:"Stof",  activates:["uph-fabric"] },
            { value:"vinyl", label:"Vinyl", activates:["uph-vinyl"]  },
          ]
        },
      ]
    },
  },
};

/* ── Vehicle configurator lookup ─────────────────────────────────────── */
function getVehicleConfigurator(product) {
  const vKey = `${product.brand}|${product.van}`;
  return (VEHICLE_CONFIGURATOR[vKey] || {})[product.type] || null;
}

/* Returns vehicle-specific cfg if available, otherwise generic by type */
function getConfigurator(product) {
  return getVehicleConfigurator(product) || CONFIGURATOR[product.type] || null;
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKET DATA  (per product – key: "brand|van|type|fitment")
═══════════════════════════════════════════════════════════════════════ */
const MARKET_DATA = {
  /* ── Citroën Jumpy ───────────────────────────────────────────────── */
  "Citroën|Jumpy|Crew Cab|OEM": {
    introYear: 2019, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "~280 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy"],
    cocMarkets: null,
  },
  "Citroën|Jumpy|Crew Cab|After-fit": {
    introYear: 2020, pricingNote: "From €3,490 excl. VAT",
    unitsFY25: "~140 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    cocMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
  },
  "Citroën|Jumpy|Flex Cab|OEM": {
    introYear: 2021, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "~95 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    cocMarkets: null,
  },
  "Citroën|Jumpy|Flex Cab|After-fit": {
    introYear: 2021, pricingNote: "From €3,990 excl. VAT",
    unitsFY25: "~45 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    cocMarkets: ["Netherlands","Belgium","Germany","France"],
  },

  /* ── Citroën Jumpy Combi ─────────────────────────────────────────── */
  "Citroën|Jumpy Combi|Partition Wall|After-fit": {
    introYear: 2024, pricingNote: "From €680 excl. VAT",
    unitsFY25: "~60 units",
    activeMarkets: ["Netherlands","Belgium"],
    cocMarkets: ["Netherlands","Belgium"],
  },

  /* ── Citroën Berlingo ─────────────────────────────────────────────── */
  "Citroën|Berlingo|Crew Cab|OEM": {
    introYear: 2018, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "~320 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy","United Kingdom"],
    cocMarkets: null,
  },

  /* ── Citroën Jumper ──────────────────────────────────────────────── */
  "Citroën|Jumper|Crew Cab|OEM": {
    introYear: 2019, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "~320 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy"],
    cocMarkets: null,
  },
  "Citroën|Jumper|Crew Cab|After-fit": {
    introYear: 2020, pricingNote: "From €4,190 excl. VAT",
    unitsFY25: "~110 units",
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    cocMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
  },

  /* ── MAN TGE ─────────────────────────────────────────────────────── */
  "MAN|TGE|Crew Cab|After-fit": {
    introYear: 2022, pricingNote: "From €4,490 excl. VAT",
    unitsFY25: "~85 units",
    activeMarkets: ["Netherlands","Belgium","Germany"],
    cocMarkets: ["Netherlands","Belgium","Germany"],
  },

  /* ── Volkswagen ──────────────────────────────────────────────────── */
  "Volkswagen|Transporter|Crew Cab|After-fit": {
    introYear: 2019, pricingNote: "From €3,590 excl. VAT",
    unitsFY25: "~165 units",
    activeMarkets: ["Netherlands","Belgium","Germany","United Kingdom"],
    cocMarkets: ["Netherlands","Belgium","Germany","United Kingdom"],
  },
  "Volkswagen|Crafter|Crew Cab|After-fit": {
    introYear: 2020, pricingNote: "From €4,250 excl. VAT",
    unitsFY25: "~90 units",
    activeMarkets: ["Netherlands","Belgium","Germany"],
    cocMarkets: ["Netherlands","Belgium","Germany"],
  },

  /* ── Fallback entries by type+fitment ───────────────────────────── */
  "_|Crew Cab|OEM": {
    introYear: 2019, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "—",
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    cocMarkets: null,
  },
  "_|Crew Cab|After-fit": {
    introYear: 2020, pricingNote: "From €3,490 excl. VAT",
    unitsFY25: "—",
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    cocMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
  },
  "_|Flex Cab|OEM": {
    introYear: 2021, pricingNote: "Included in OEM vehicle build price",
    unitsFY25: "—",
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    cocMarkets: null,
  },
  "_|Flex Cab|After-fit": {
    introYear: 2021, pricingNote: "From €3,990 excl. VAT",
    unitsFY25: "—",
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    cocMarkets: ["Netherlands","Belgium","Germany","France"],
  },
  "_|Partition Wall|After-fit": {
    introYear: 2017, pricingNote: "From €680 excl. VAT",
    unitsFY25: "—",
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","United Kingdom"],
    cocMarkets: ["Netherlands","Belgium","Germany","France","Spain","United Kingdom"],
  },
};

function getMarketData(product) {
  const specific = `${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  const fallback  = `_|${product.type}|${product.fitment}`;
  return MARKET_DATA[specific] || MARKET_DATA[fallback] || null;
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKETING TOOLS  (brochures + price lists per product)
═══════════════════════════════════════════════════════════════════════ */
const MARKETING_TOOLS = {
  "Citroën|Jumpy|Crew Cab|OEM": {
    brochures: [
      { title:"NL Brochure – Citroën Jumpy Crew Cab 2023",
        filename:"NL-Brochure-Citroën-Jumpy-Crew-Cab-23.pdf", lang:"NL" },
    ],
    priceLists: [
      { title:"NL Consumer Price List – 1 Feb. 2026",
        filename:"NL-Consumenten-Prijslijst-Citroën-Jumpy-Crew-Cab-1-Feb.-2026.pdf", lang:"NL" },
    ],
  },
  "Citroën|Jumpy|Crew Cab|After-fit": {
    brochures: [
      { title:"NL Brochure – Citroën Jumpy Crew Cab 2023",
        filename:"NL-Brochure-Citroën-Jumpy-Crew-Cab-23.pdf", lang:"NL" },
    ],
    priceLists: [
      { title:"NL Consumer Price List – 1 Feb. 2026",
        filename:"NL-Consumenten-Prijslijst-Citroën-Jumpy-Crew-Cab-1-Feb.-2026.pdf", lang:"NL" },
    ],
  },
  "Citroën|Jumper|Crew Cab|OEM": {
    brochures: [
      { title:"NL Brochure – Citroën Jumper Dubbele Cabine 2023",
        filename:"NL-Brochure-Citroën-Jumper-Dubbele-Cabine-23.pdf", lang:"NL" },
    ],
    priceLists: [
      { title:"NL Consumer Price List – 1 Feb. 2026",
        filename:"NL-Consumentenprijslijst-Citroën-Jumper-Dubbele-Cabine-1-Feb.-2026.pdf", lang:"NL" },
    ],
  },
  "Citroën|Jumper|Crew Cab|After-fit": {
    brochures: [
      { title:"NL Brochure – Citroën Jumper Dubbele Cabine 2023",
        filename:"NL-Brochure-Citroën-Jumper-Dubbele-Cabine-23.pdf", lang:"NL" },
    ],
    priceLists: [
      { title:"NL Consumer Price List – 1 Feb. 2026",
        filename:"NL-Consumentenprijslijst-Citroën-Jumper-Dubbele-Cabine-1-Feb.-2026.pdf", lang:"NL" },
    ],
  },
};

function getMarketingTools(product) {
  const key = `${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  return MARKETING_TOOLS[key] || { brochures: [], priceLists: [] };
}
