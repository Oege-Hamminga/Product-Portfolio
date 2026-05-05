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

  /* ── Nissan ─────────────────────────────────────────────────────── */
  "Primastar":      "Primastar.jpg",

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
  if (product.type === "Partition Wall") return "Partition wall.jpg";
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
  "Nissan":         { color: "#C3002F", abbr: "NIS" },
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
  p("Renault","Trafic",        "K1",  "After-fit", "Crew Cab"),
  p("Renault","Trafic E-Tech", "K1",  "After-fit", "Crew Cab"),
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
  p("Mercedes-Benz","Sprinter",  "K2/3","After-fit","Crew Cab"),

  /* ── MAN ─────────────────────────────────────────────────────────── */
  p("MAN","TGE","K2/3","After-fit","Crew Cab"),

  /* ── KIA ─────────────────────────────────────────────────────────── */
  p("KIA","PV5","K1","After-fit","Crew Cab"),

  /* ── NISSAN ─────────────────────────────────────────────────────── */
  p("Nissan","Primastar","K1","After-fit","Crew Cab"),
];

/* ═══════════════════════════════════════════════════════════════════════
   VEHICLE META  –  van body type & market introduction per "brand|van"
═══════════════════════════════════════════════════════════════════════ */
const VEHICLE_META = {
  /* Volkswagen */
  "Volkswagen|Caddy":          { vanType: "Panel Van",     marketIntro: "2020" },
  "Volkswagen|Transporter":    { vanType: "Panel Van",     marketIntro: "2015" },
  "Volkswagen|Crafter":        { vanType: "Panel Van",     marketIntro: "2017" },
  "Volkswagen|Caravelle":      { vanType: "Passenger Van", marketIntro: "2024" },
  "Volkswagen|ID Buzz":        { vanType: "Passenger Van", marketIntro: "2022" },
  "Volkswagen|Multivan":       { vanType: "Passenger Van", marketIntro: "2021" },
  /* Citroën */
  "Citroën|Berlingo":          { vanType: "Panel Van",     marketIntro: "2018" },
  "Citroën|Jumpy":             { vanType: "Panel Van",     marketIntro: "2016" },
  "Citroën|Jumpy Combi":       { vanType: "Passenger Van", marketIntro: "2016" },
  "Citroën|Jumper":            { vanType: "Panel Van",     marketIntro: "2006" },
  /* Peugeot */
  "Peugeot|Partner":           { vanType: "Panel Van",     marketIntro: "2018" },
  "Peugeot|Expert":            { vanType: "Panel Van",     marketIntro: "2016" },
  "Peugeot|Boxer":             { vanType: "Panel Van",     marketIntro: "2006" },
  /* Opel */
  "Opel|Combo":                { vanType: "Panel Van",     marketIntro: "2018" },
  "Opel|Vivaro":               { vanType: "Panel Van",     marketIntro: "2019" },
  "Opel|Movano":               { vanType: "Panel Van",     marketIntro: "2021" },
  /* Fiat */
  "Fiat|Doblo":                { vanType: "Panel Van",     marketIntro: "2022" },
  "Fiat|Scudo":                { vanType: "Panel Van",     marketIntro: "2022" },
  "Fiat|Ducato":               { vanType: "Panel Van",     marketIntro: "2006" },
  /* Toyota */
  "Toyota|Proace City":        { vanType: "Panel Van",     marketIntro: "2019" },
  "Toyota|Proace":             { vanType: "Panel Van",     marketIntro: "2016" },
  "Toyota|Proace Max":         { vanType: "Panel Van",     marketIntro: "2024" },
  /* Ford */
  "Ford|Transit Connect":      { vanType: "Panel Van",     marketIntro: "2024" },
  "Ford|Transit Custom":       { vanType: "Panel Van",     marketIntro: "2023" },
  "Ford|Transit":              { vanType: "Panel Van",     marketIntro: "2014" },
  "Ford|Tourneo":              { vanType: "Passenger Van", marketIntro: "2023" },
  "Ford|Transit Kombi":        { vanType: "Passenger Van", marketIntro: "2019" },
  /* Mercedes-Benz */
  "Mercedes-Benz|Vito":        { vanType: "Panel Van",     marketIntro: "2014" },
  "Mercedes-Benz|Vito Mixto":  { vanType: "Passenger Van", marketIntro: "2020" },
  "Mercedes-Benz|V-Class":     { vanType: "Passenger Van", marketIntro: "2014" },
  "Mercedes-Benz|Sprinter":    { vanType: "Panel Van",     marketIntro: "2018" },
  /* Renault */
  "Renault|Trafic":            { vanType: "Panel Van",     marketIntro: "2014" },
  "Renault|Trafic E-Tech":     { vanType: "Panel Van",     marketIntro: "2021" },
  "Renault|Master":            { vanType: "Panel Van",     marketIntro: "2024" },
  /* IVECO */
  "IVECO|Daily":               { vanType: "Panel Van",     marketIntro: "2014" },
  /* MAN */
  "MAN|TGE":                   { vanType: "Panel Van",     marketIntro: "2017" },
  /* RAM */
  "RAM|ProMaster":             { vanType: "Panel Van",     marketIntro: "2013" },
  /* Nissan */
  "Nissan|Primastar":          { vanType: "Panel Van",     marketIntro: "2022" },
  /* KIA */
  "KIA|PV5":                   { vanType: "Panel Van",     marketIntro: "2025" },
};

function getVehicleMeta(brand, van) {
  return VEHICLE_META[`${brand}|${van}`] || { vanType: "", marketIntro: "" };
}

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
    vehicleCode: "",
    alwaysActive: ["divider","seating","wiring","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "length", label: "Body Length",
        options: [
          { value:"l1", label:"L1 – Short Body",  code:"L1", activates:["frame-l1"] },
          { value:"l2", label:"L2 – Medium Body", code:"L2", activates:["frame-l2"] },
          { value:"l3", label:"L3 – Long Body",   code:"L3", activates:["frame-l3"] },
        ]
      },
      {
        id: "sliding_doors", label: "Sliding Doors",
        options: [
          { value:"single", label:"Single Sliding Door",   code:"1D", activates:["door-single"] },
          { value:"double", label:"Double Sliding Doors",  code:"2D", activates:["door-double"] },
        ]
      },
      {
        id: "factory_windows", label: "Factory Windows",
        options: [
          { value:"yes", label:"With Factory Windows", code:"FW", activates:["win-retain"] },
          { value:"no",  label:"No Factory Windows",   code:"NW", activates:[] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"clear",  label:"Clear Glass",    code:"CG", activates:["win-clear"] },
          { value:"tinted", label:"Tinted Glass",   code:"TG", activates:["win-tinted"] },
          { value:"opaque", label:"Opaque Panel",   code:"OP", activates:["win-opaque"] },
          { value:"none",   label:"No Window",      code:"N0", activates:[] },
        ]
      },
      {
        id: "upholstery", label: "Upholstery Type",
        options: [
          { value:"vinyl",  label:"Vinyl",   code:"VY", activates:["uph-vinyl"] },
          { value:"fabric", label:"Fabric",  code:"FB", activates:["uph-fabric"] },
        ]
      },
      {
        id: "trim_level", label: "Trim Level",
        options: [
          { value:"base",    label:"Base",    code:"BS", activates:["trim-base"] },
          { value:"comfort", label:"Comfort", code:"CF", activates:["trim-comf"] },
          { value:"premium", label:"Premium", code:"PM", activates:["trim-prem"] },
        ]
      },
    ]
  },

  "Flex Cab": {
    vehicleCode: "",
    alwaysActive: ["rail","seating","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "length", label: "Body Length",
        options: [
          { value:"l1", label:"L1 – Short Body",  code:"L1", activates:["frame-l1"] },
          { value:"l2", label:"L2 – Medium Body", code:"L2", activates:["frame-l2"] },
        ]
      },
      {
        id: "sliding_doors", label: "Sliding Doors",
        options: [
          { value:"single", label:"Single Sliding Door",  code:"1D", activates:["door-single"] },
          { value:"double", label:"Double Sliding Doors", code:"2D", activates:["door-double"] },
        ]
      },
      {
        id: "fold", label: "Fold-forward Option",
        options: [
          { value:"yes", label:"With Fold-forward", code:"FD", activates:[] },
          { value:"no",  label:"Without Fold-forward", code:"NF", activates:[] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"none",   label:"No Window",    code:"N0", activates:[] },
          { value:"clear",  label:"Clear Glass",  code:"CG", activates:["win-clear"] },
          { value:"tinted", label:"Tinted Glass", code:"TG", activates:["win-tinted"] },
        ]
      },
      {
        id: "upholstery", label: "Upholstery Type",
        options: [
          { value:"vinyl",  label:"Vinyl",   code:"VY", activates:["uph-vinyl"] },
          { value:"fabric", label:"Fabric",  code:"FB", activates:["uph-fabric"] },
        ]
      },
      {
        id: "trim_level", label: "Trim Level",
        options: [
          { value:"base",    label:"Base",    code:"BS", activates:["trim-base"] },
          { value:"comfort", label:"Comfort", code:"CF", activates:["trim-comf"] },
        ]
      },
    ]
  },

  "Partition Wall": {
    vehicleCode: "",
    alwaysActive: ["mounting","hardware"],
    blockingQuestions: [],
    questions: [
      {
        id: "width", label: "Partition Width",
        options: [
          { value:"standard", label:"Standard Width",  code:"SW", activates:["frame-std"] },
          { value:"extended", label:"Extended Width",  code:"EW", activates:["frame-ext"] },
        ]
      },
      {
        id: "window_type", label: "Window Type",
        options: [
          { value:"none",  label:"No Window (Solid)",    code:"ST", activates:["win-solid"] },
          { value:"poly",  label:"Polycarbonate Panel",  code:"GL", activates:["win-poly"] },
          { value:"glass", label:"Tempered Glass",       code:"GL", activates:["win-glass"] },
          { value:"mesh",  label:"Steel Mesh",           code:"MS", activates:["win-mesh"] },
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

  /* ── Citroën Jumpy / Expert / Scudo / Vivaro / Proace ──────────── */
  "Citroën|Jumpy": {
    "Crew Cab": {
      vehicleCode: "JY",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"keyless", label:"Keyless entry & start",
          options:[
            {value:"ja",  label:"Ja",  code:"KY", activates:["keyless"]},
            {value:"nee", label:"Nee", code:"NK", activates:[]},
          ]
        },
        {
          id:"deurhendel", label:"Heeft uw voertuig een deurhendel?",
          note:"Kan niet NEE zijn indien keyless entry & start aanwezig is",
          options:[
            {value:"ja",  label:"Ja",  code:"DH", activates:["deurhendel"]},
            {value:"nee", label:"Nee", code:"ND", activates:[]},
          ]
        },
        {
          id:"airbags", label:"Airbags aanwezig in de bovenzijde van de B-stijl?",
          options:[
            {value:"ja",  label:"Ja",  code:"AB", activates:["airbag-trim"]},
            {value:"nee", label:"Nee", code:"NA", activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1", label:"L1", code:"L1", activates:["frame-l1"]},
            {value:"l2", label:"L2", code:"L2", activates:["frame-l2"]},
            {value:"l3", label:"L3", code:"L3", activates:["frame-l3"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1", label:"H1", code:"H1", activates:["height-h1"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs", label:"Rechts (RS)",  code:"RS", activates:["door-single"]},
            {value:"ls", label:"Links (LS)",   code:"LS", activates:["door-left"]},
            {value:"ds", label:"Dubbel (DS)",  code:"DS", activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right",  label:"Rechts", code:"WR", activates:["win-right"]},
            {value:"left",   label:"Links",  code:"WL", activates:["win-left"]},
            {value:"double", label:"Beide",  code:"WB", activates:["win-both"]},
            {value:"none",   label:"Geen",   code:"W0", activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",          label:"Ja",           code:"PW", activates:["partition"]},
            {value:"no",           label:"Nee",          code:"NP", activates:[]},
            {value:"disassembled", label:"Gedemonteerd", code:"PD", activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"voorstoel", label:"Voorstoel", code:"VS", activates:[]},
            {value:"bank",      label:"Bank",      code:"BK", activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"curitiba", label:"Curitiba Brasilia", code:"CU", activates:[]},
            {value:"triton",   label:"Triton Carla",      code:"TC", activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"essential", label:"Essential", code:"T1", activates:["trim-ess"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3", label:"3-persoons", code:"S3", activates:["seat-3"]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal",  label:"Normaal glas", code:"GC", activates:["win-clear"]},
            {value:"privacy", label:"Privacy glas", code:"GP", activates:["win-privacy"]},
          ]
        },
      ]
    },

    "Flex Cab": {
      vehicleCode: "JY",
      alwaysActive: ["rail","seating","hardware"],
      blockingQuestions: [],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1", label:"L1", code:"L1", activates:["frame-l1"]},
            {value:"l2", label:"L2", code:"L2", activates:["frame-l2"]},
            {value:"l3", label:"L3", code:"L3", activates:["frame-l3"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs", label:"Rechts (RS)", code:"RS", activates:["door-single"]},
            {value:"ls", label:"Links (LS)",  code:"LS", activates:["door-left"]},
            {value:"ds", label:"Dubbel (DS)", code:"DS", activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right",  label:"Rechts", code:"WR", activates:["win-right"]},
            {value:"left",   label:"Links",  code:"WL", activates:["win-left"]},
            {value:"double", label:"Beide",  code:"WB", activates:["win-both"]},
            {value:"none",   label:"Geen",   code:"W0", activates:[]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal",  label:"Normaal glas", code:"GC", activates:["win-clear"]},
            {value:"privacy", label:"Privacy glas", code:"GP", activates:["win-privacy"]},
          ]
        },
      ]
    },
  },

  /* ── Citroën Jumper / Boxer / Ducato / Movano / ProAce Max ──────── */
  "Citroën|Jumper": {
    "Crew Cab": {
      vehicleCode: "JP",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"led_verlichting", label:"LED Verlichting aanwezig",
          note:"Indien NIET aanwezig: configuratie niet mogelijk",
          options:[
            {value:"ja",  label:"Ja",  code:"LD", activates:["led"]},
            {value:"nee", label:"Nee — configuratie niet mogelijk", code:"NL", activates:[], incompatible:true},
          ]
        },
        {
          id:"veerzitting", label:"Veerzitting in bestuurdersstoel",
          note:"Indien aanwezig: configuratie niet mogelijk",
          options:[
            {value:"ja",  label:"Ja — configuratie niet mogelijk", code:"VS", activates:[], incompatible:true},
            {value:"nee", label:"Nee", code:"NV", activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1", label:"L1", code:"L1", activates:["frame-l1"]},
            {value:"l2", label:"L2", code:"L2", activates:["frame-l2"]},
            {value:"l3", label:"L3", code:"L3", activates:["frame-l3"]},
            {value:"l4", label:"L4", code:"L4", activates:["frame-l4"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1", label:"H1", code:"H1", activates:["height-h1"]},
            {value:"h2", label:"H2", code:"H2", activates:["height-h2"]},
            {value:"h3", label:"H3", code:"H3", activates:["height-h3"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs", label:"Rechts (RS)", code:"RS", activates:["door-single"]},
            {value:"ls", label:"Links (LS)",  code:"LS", activates:["door-left"]},
            {value:"ds", label:"Dubbel (DS)", code:"DS", activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right",  label:"Rechts", code:"WR", activates:["win-right"]},
            {value:"left",   label:"Links",  code:"WL", activates:["win-left"]},
            {value:"double", label:"Beide",  code:"WB", activates:["win-both"]},
            {value:"none",   label:"Geen",   code:"W0", activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",          label:"Ja",           code:"PW", activates:["partition"]},
            {value:"no",           label:"Nee",          code:"NP", activates:[]},
            {value:"disassembled", label:"Gedemonteerd", code:"PD", activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"bank", label:"Bank", code:"BK", activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"crepe-black",     label:"Crepe Black",     code:"CB", activates:[]},
            {value:"crepe-black-mid", label:"Crepe Black MID", code:"CM", activates:[]},
            {value:"pierce",          label:"Pierce",          code:"PI", activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"base",    label:"Base",    code:"T1", activates:["trim-base"]},
            {value:"comfort", label:"Comfort", code:"T2", activates:["trim-com"]},
            {value:"luxe",    label:"Luxe",    code:"T3", activates:["trim-lux"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3",          label:"3-persoons",               code:"S3",  activates:["seat-3"]},
            {value:"4",          label:"4-persoons",               code:"S4",  activates:["seat-4"]},
            {value:"3-armrests", label:"3-persoons met armleuning", code:"S3A", activates:["seat-3a"]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal",  label:"Normaal glas", code:"GC", activates:["win-clear"]},
            {value:"privacy", label:"Privacy glas", code:"GP", activates:["win-privacy"]},
          ]
        },
      ]
    },
  },
};

// ── Peugeot Boxer / Fiat Ducato / Opel Movano ──────────────────────
// Same platform & questions as Citroën Jumper K2/3
VEHICLE_CONFIGURATOR["Peugeot|Boxer"]     = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumper"]||{})["Crew Cab"], {vehicleCode:"BX"}) };
VEHICLE_CONFIGURATOR["Fiat|Ducato"]       = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumper"]||{})["Crew Cab"], {vehicleCode:"DC"}) };
VEHICLE_CONFIGURATOR["Opel|Movano"]       = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumper"]||{})["Crew Cab"], {vehicleCode:"MV"}) };

// Toyota ProAce Max — same platform as Jumper but trimlevel is Comfort / Luxe only
VEHICLE_CONFIGURATOR["Toyota|Proace Max"] = {
  "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumper"]||{})["Crew Cab"], {
    vehicleCode: "PM",
    questions: (VEHICLE_CONFIGURATOR["Citroën|Jumper"]["Crew Cab"].questions||[]).map(q => {
      if (q.id !== "trimlevel") return q;
      return Object.assign({}, q, { options: [
        {value:"comfort",label:"Comfort",code:"T2",activates:["trim-com"]},
        {value:"luxe",   label:"Luxe",   code:"T3",activates:["trim-lux"]},
      ]});
    })
  })
};

// ── Peugeot Expert / Fiat Scudo / Opel Vivaro / Toyota ProAce ─────
// Same platform & questions as Citroën Jumpy K1
VEHICLE_CONFIGURATOR["Peugeot|Expert"] = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumpy"]||{})["Crew Cab"], {vehicleCode:"EX"}) };
VEHICLE_CONFIGURATOR["Fiat|Scudo"]     = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumpy"]||{})["Crew Cab"], {vehicleCode:"SC"}) };
VEHICLE_CONFIGURATOR["Opel|Vivaro"]    = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumpy"]||{})["Crew Cab"], {vehicleCode:"VV"}) };
VEHICLE_CONFIGURATOR["Toyota|Proace"]  = { "Crew Cab": Object.assign({}, (VEHICLE_CONFIGURATOR["Citroën|Jumpy"]||{})["Crew Cab"], {vehicleCode:"PA"}) };

VEHICLE_CONFIGURATOR["Ford|Transit Custom"] = {
  "Crew Cab": {
    vehicleCode: "TC",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"elect_schuifdeur", label:"Elektrische en/of softclose schuifdeuren",
          options:[
            {value:"yes",label:"Ja", code:"ES",activates:["elec-door"]},
            {value:"no", label:"Nee",code:"NS",activates:[]},
          ]
        },
        {
          id:"bo_sound", label:"B&O Sound System",
          options:[
            {value:"yes",label:"Ja", code:"BO",activates:["bo-sound"]},
            {value:"no", label:"Nee",code:"NB",activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1",label:"L1",code:"L1",activates:["frame-l1"]},
            {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1",label:"H1",code:"H1",activates:["height-h1"]},
            {value:"h2",label:"H2",code:"H2",activates:["height-h2"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs",label:"Rechts (RS)",  code:"RS",activates:["door-single"]},
            {value:"ls",label:"Links (LS)",   code:"LS",activates:["door-left"]},
            {value:"ds",label:"Dubbel (DS)",  code:"DS",activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right", label:"Rechts",    code:"WR",activates:["win-right"]},
            {value:"left",  label:"Links",     code:"WL",activates:["win-left"]},
            {value:"double",label:"Beide",     code:"WB",activates:["win-both"]},
            {value:"none",  label:"Geen",      code:"W0",activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",         label:"Ja",             code:"PW",activates:["partition"]},
            {value:"no",          label:"Nee",            code:"NP",activates:[]},
            {value:"disassembled",label:"Gedemonteerd",   code:"PD",activates:[]},
            {value:"aaltc",       label:"AALTC",          code:"AA",activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"voorstoel",label:"Voorstoel",code:"VS",activates:[]},
            {value:"bank",     label:"Bank",     code:"BK",activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"trend",   label:"Trend",   code:"TR",activates:[]},
            {value:"limited", label:"Limited", code:"LT",activates:[]},
            {value:"sport",   label:"Sport",   code:"SP",activates:[]},
            {value:"msrt",    label:"MS-RT",   code:"MS",activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"essential",    label:"Essential",    code:"T1",activates:["trim-ess"]},
            {value:"essential-xl", label:"Essential XL", code:"T2",activates:["trim-esx"]},
            {value:"comfort",      label:"Comfort",      code:"T3",activates:["trim-com"]},
            {value:"comfort-xl",   label:"Comfort XL",   code:"T4",activates:["trim-cox"]},
            {value:"luxury",       label:"Luxury",       code:"T5",activates:["trim-lux"]},
            {value:"luxury-xl",    label:"Luxury XL",    code:"T6",activates:["trim-lxx"]},
            {value:"msrt",         label:"Luxe MS-RT",   code:"T7",activates:["trim-msr"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3", label:"3-persoons", code:"S3", activates:["seat-3"]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
  }
};

/* ── Ford Transit ────────────────────────────────────────────────── */
VEHICLE_CONFIGURATOR["Ford|Transit"] = {
  "Crew Cab": {
      vehicleCode: "FT",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"drive", label:"Aandrijving",
          options:[
            {value:"fwd",label:"Voorwielaandrijving",code:"FW",activates:[]},
            {value:"rwd",label:"Achterwielaandrijving",code:"RW",activates:[]},
            {value:"4wd",label:"Vierwielaandrijving",code:"4W",activates:[]},
          ]
        },
        {
          id:"overhead_shelve", label:"Overhead shelve aanwezig",
          note:"Indien NIET aanwezig: configuratie niet mogelijk",
          options:[
            {value:"yes",label:"Ja",                              code:"OS", activates:["overhead"]},
            {value:"no", label:"Nee — configuratie niet mogelijk",code:"NOS",activates:[], incompatible:true},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1",label:"L1",code:"L1",activates:["frame-l1"]},
            {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
            {value:"l3",label:"L3",code:"L3",activates:["frame-l3"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h2",label:"H2",code:"H2",activates:["height-h2"]},
            {value:"h3",label:"H3",code:"H3",activates:["height-h3"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
            {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
            {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
            {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
            {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
            {value:"none",  label:"Geen",  code:"W0",activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
            {value:"no",          label:"Nee",         code:"NP",activates:[]},
            {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"bank", label:"Bank", code:"BK", activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"base-max",  label:"Base Max",        code:"B1",activates:[]},
            {value:"trend-max", label:"Trend Max",       code:"B2",activates:[]},
            {value:"ambiente",  label:"Ambiente",        code:"B3",activates:[]},
            {value:"trend-lim", label:"Trend & Limited", code:"B4",activates:[]},
            {value:"amb-trend", label:"Ambiente & Trend",code:"B5",activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"essential",label:"Essential",code:"T1",activates:["trim-ess"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3", label:"3-persoons", code:"S3", activates:["seat-3"]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
    }
};

/* ── IVECO Daily ─────────────────────────────────────────────────── */
VEHICLE_CONFIGURATOR["IVECO|Daily"] = {
  "Crew Cab": {
    vehicleCode: "ID",
    alwaysActive: ["divider","seating","wiring","hardware"],
    blockingQuestions: [
      {
        id:"sliding_win", label:"Zijn de fabrieksramen schuiframen?",
        options:[
          {value:"yes",label:"Ja", code:"SW",activates:["sliding-win"]},
          {value:"no", label:"Nee",code:"NW",activates:[]},
        ]
      },
      {
        id:"overhead_shelve", label:"Overhead shelve aanwezig",
        note:"Indien NIET aanwezig: configuratie niet mogelijk",
        options:[
          {value:"yes",label:"Ja",                              code:"OS", activates:["overhead"]},
          {value:"no", label:"Nee — configuratie niet mogelijk",code:"NOS",activates:[], incompatible:true},
        ]
      },
      {
        id:"display_2024", label:"Voertuig vanaf 2024 met 7/10-inch display?",
        options:[
          {value:"yes",label:"Ja", code:"D24",activates:["display-new"]},
          {value:"no", label:"Nee",code:"ND", activates:[]},
        ]
      },
    ],
    questions: [
      {
        id:"wielbasis", label:"Wielbasis (L1 niet beschikbaar)",
        options:[
          {value:"l2",  label:"L2",  code:"L2", activates:["frame-l2"]},
          {value:"l2p", label:"L2+", code:"L2P",activates:["frame-l2p"]},
          {value:"l3",  label:"L3",  code:"L3", activates:["frame-l3"]},
          {value:"l3p", label:"L3+", code:"L3P",activates:["frame-l3p"]},
        ]
      },
      {
        id:"hoogte", label:"Hoogte (alleen H2 beschikbaar)",
        options:[
          {value:"h2",label:"H2",code:"H2",activates:["height-h2"]},
        ]
      },
      {
        id:"schuifdeur", label:"Schuifdeur configuratie",
        options:[
          {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
          {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
          {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
        ]
      },
      {
        id:"ramen_b", label:"Ramen achter B-stijl",
        options:[
          {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
          {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
          {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
          {value:"none",  label:"Geen",  code:"W0",activates:[]},
        ]
      },
      {
        id:"separatiewand", label:"Separatiewand aanwezig",
        options:[
          {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
          {value:"no",          label:"Nee",         code:"NP",activates:[]},
          {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
        ]
      },
      {
        id:"eerste_zitrij", label:"Eerste zitrij",
        options:[
          {value:"bank", label:"Bank", code:"BK", activates:["seat-bench"]},
        ]
      },
      {
        id:"bekleding", label:"Bekleding voorstoelen",
        options:[
          {value:"nettuno", label:"Nettuno Nero",code:"NN",activates:[]},
          {value:"standard",label:"Standard",    code:"ST",activates:[]},
        ]
      },
      {
        id:"trimlevel", label:"Trimlevel",
        options:[
          {value:"comfort",label:"Comfort",code:"TC",activates:["trim-com"]},
        ]
      },
      {
        id:"seating", label:"Zitplaatsen",
        options:[
          {value:"3",label:"3-persoons",code:"S3",activates:["seat-3"]},
          {value:"4",label:"4-persoons",code:"S4",activates:["seat-4"]},
        ]
      },
      {
        id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
        options:[
          {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
          {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
        ]
      },
    ]
  }
};

/* ── MAN TGE ─────────────────────────────────────────────────────── */
VEHICLE_CONFIGURATOR["MAN|TGE"] = {
  "Crew Cab": {
    vehicleCode: "MT",
    alwaysActive: ["divider","seating","wiring","hardware"],
    blockingQuestions: [
      {
        id:"drive", label:"Aandrijving",
        options:[
          {value:"efwd",label:"Elektronisch voorwielaandrijving",code:"EF",activates:[]},
          {value:"fwd", label:"Voorwielaandrijving",             code:"FW",activates:[]},
          {value:"rwd", label:"Achterwielaandrijving",           code:"RW",activates:[]},
          {value:"4wd", label:"Vierwielaandrijving",             code:"4W",activates:[]},
        ]
      },
      {
        id:"sliding_win", label:"Zijn de fabrieksramen schuiframen?",
        options:[
          {value:"yes",label:"Ja", code:"SW",activates:["sliding-win"]},
          {value:"no", label:"Nee",code:"NW",activates:[]},
        ]
      },
      {
        id:"vaporizer", label:"Verdamper aanwezig",
        note:"Indien aanwezig: configuratie niet mogelijk",
        options:[
          {value:"yes",label:"Ja — configuratie niet mogelijk",code:"VP",activates:[], incompatible:true},
          {value:"no", label:"Nee",                            code:"NV",activates:[]},
        ]
      },
      {
        id:"sidewall", label:"Zijwandafwerking",
        options:[
          {value:"yes",label:"Ja", code:"SF",activates:["sidewall"]},
          {value:"no", label:"Nee",code:"NS",activates:[]},
        ]
      },
      {
        id:"load_lighting", label:"Laadruimteverlichting",
        options:[
          {value:"yes",label:"Ja", code:"LL",activates:["load-light"]},
          {value:"no", label:"Nee",code:"NL",activates:[]},
        ]
      },
    ],
    questions: [
      {
        id:"wielbasis", label:"Wielbasis",
        options:[
          {value:"l3",label:"L3",code:"L3",activates:["frame-l3"]},
          {value:"l4",label:"L4",code:"L4",activates:["frame-l4"]},
          {value:"l5",label:"L5",code:"L5",activates:["frame-l5"]},
        ]
      },
      {
        id:"hoogte", label:"Hoogte (H4 niet beschikbaar; L5+H2 niet mogelijk)",
        options:[
          {value:"h2",label:"H2",code:"H2",activates:["height-h2"]},
          {value:"h3",label:"H3",code:"H3",activates:["height-h3"]},
        ]
      },
      {
        id:"schuifdeur", label:"Schuifdeur configuratie",
        options:[
          {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
          {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
          {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
        ]
      },
      {
        id:"ramen_b", label:"Ramen achter B-stijl",
        options:[
          {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
          {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
          {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
          {value:"none",  label:"Geen",  code:"W0",activates:[]},
        ]
      },
      {
        id:"separatiewand", label:"Separatiewand aanwezig",
        options:[
          {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
          {value:"no",          label:"Nee",         code:"NP",activates:[]},
          {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
        ]
      },
      {
        id:"eerste_zitrij", label:"Eerste zitrij",
        options:[
          {value:"bank", label:"Bank", code:"BK", activates:["seat-bench"]},
        ]
      },
      {
        id:"bekleding", label:"Bekleding voorstoelen",
        options:[
          {value:"leatherette",label:"Leatherette",code:"LE",activates:[]},
          {value:"toronto",    label:"Toronto",    code:"TO",activates:[]},
          {value:"robust",     label:"Robust",     code:"RO",activates:[]},
        ]
      },
      {
        id:"trimlevel", label:"Trimlevel",
        options:[
          {value:"comfort",label:"Comfort",code:"TC",activates:["trim-com"]},
          {value:"luxury", label:"Luxury", code:"TL",activates:["trim-lux"]},
        ]
      },
      {
        id:"seating", label:"Zitplaatsen",
        options:[
          {value:"3",          label:"3-persoons",               code:"S3", activates:["seat-3"]},
          {value:"4",          label:"4-persoons",               code:"S4", activates:["seat-4"]},
          {value:"3-armrests", label:"3-persoons met armleuning", code:"S3A",activates:["seat-arm"]},
        ]
      },
      {
        id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
        options:[
          {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
          {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
        ]
      },
    ]
  }
};

/* ── Mercedes-Benz Sprinter ──────────────────────────────────────── */
VEHICLE_CONFIGURATOR["Mercedes-Benz|Sprinter"] = {
  "Crew Cab": {
    vehicleCode: "SP",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"drive", label:"Aandrijving",
          options:[
            {value:"rwd",label:"Achterwielaandrijving",code:"RW",activates:[]},
            {value:"4wd",label:"Vierwielaandrijving",  code:"4W",activates:[]},
          ]
        },
        {
          id:"t01_rail", label:"Is optiecode T01 – versterking bovenste rail schuifdeur aanwezig?",
          options:[
            {value:"yes",label:"Ja", code:"T1",activates:["rail-reinf"]},
            {value:"no", label:"Nee",code:"NT",activates:[]},
          ]
        },
        {
          id:"overhead_shelve", label:"Overhead shelve",
          options:[
            {value:"yes",label:"Ja", code:"OS",activates:["overhead"]},
            {value:"no", label:"Nee",code:"NS",activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
            {value:"l3",label:"L3",code:"L3",activates:["frame-l3"]},
            {value:"l4",label:"L4",code:"L4",activates:["frame-l4"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1",label:"H1",code:"H1",activates:["height-h1"]},
            {value:"h2",label:"H2",code:"H2",activates:["height-h2"]},
            {value:"h3",label:"H3",code:"H3",activates:["height-h3"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
            {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
            {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
            {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
            {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
            {value:"none",  label:"Geen",  code:"W0",activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
            {value:"no",          label:"Nee",         code:"NP",activates:[]},
            {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"bank", label:"Bank", code:"BK", activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"caluma",  label:"Caluma Black", code:"CA",activates:[]},
            {value:"artico",  label:"Artico Black", code:"AR",activates:[]},
            {value:"maturin", label:"Maturin Black",code:"MA",activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"standard",label:"Comfort Standard",code:"T1",activates:["trim-std"]},
            {value:"plus",    label:"Comfort Plus",   code:"T2",activates:["trim-pls"]},
            {value:"premium", label:"Comfort Premium",code:"T3",activates:["trim-prm"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3",         label:"3-persoons",          code:"S3",activates:["seat-3"]},
            {value:"3-fold",    label:"3 persoons klapstoel", code:"S3F",activates:["seat-fold"]},
            {value:"4",         label:"4-persoons",          code:"S4",activates:["seat-4"]},
          ]
        },
        {
          id:"carpet_mat", label:"Vloermat",
          options:[
            {value:"yes",label:"Ja", code:"CM",activates:["carpet"]},
            {value:"no", label:"Nee",code:"NC",activates:[]},
          ]
        },
        {
          id:"partition_window", label:"Raam in separatiewand",
          options:[
            {value:"yes",label:"Ja", code:"PW",activates:["part-win"]},
            {value:"no", label:"Nee",code:"NW",activates:[]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
    }
};

/* ── Renault Trafic ──────────────────────────────────────────────── */
VEHICLE_CONFIGURATOR["Renault|Trafic"] = {
  "Crew Cab": {
    vehicleCode: "RT",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"rear_side", label:"Achterzijde",
          options:[
            {value:"tailgate",   label:"Achterklep",  code:"TG",activates:[]},
            {value:"rear_doors", label:"Achterdeuren",code:"RD",activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1",label:"L1",code:"L1",activates:["frame-l1"]},
            {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1",label:"H1",code:"H1",activates:["height-h1"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
            {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
            {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
            {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
            {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
            {value:"none",  label:"Geen",  code:"W0",activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
            {value:"no",          label:"Nee",         code:"NP",activates:[]},
            {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"voorstoel",label:"Voorstoel",code:"VS",activates:[]},
            {value:"bank",     label:"Bank",     code:"BK",activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"kompo",     label:"Kompo",     code:"KO",activates:[]},
            {value:"black-java",label:"Black Java",code:"BJ",activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"base",   label:"Base",   code:"T1",activates:["trim-base"]},
            {value:"comfort",label:"Comfort",code:"T2",activates:["trim-com"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3",label:"3-persoons",code:"S3",activates:["seat-3"]},
          ]
        },
        {
          id:"protection_cover", label:"Beschermhoes",
          options:[
            {value:"yes",label:"Ja", code:"PC",activates:["prot-cover"]},
            {value:"no", label:"Nee",code:"NP",activates:[]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
    }
};

/* ── Renault Trafic E-Tech – same as Trafic ──────────────────────── */
VEHICLE_CONFIGURATOR["Renault|Trafic E-Tech"] = {
  "Crew Cab": null  // will be set below via Object.assign
};

/* ── Volkswagen Transporter ──────────────────────────────────────── */
VEHICLE_CONFIGURATOR["Volkswagen|Transporter"] = {
  "Crew Cab": {
    vehicleCode: "VT",
    alwaysActive: ["divider","seating","wiring","hardware"],
    blockingQuestions: [
      {
        id:"elect_doors", label:"Elektrische en/of softclose deuren",
        options:[
          {value:"yes",label:"Ja", code:"ED",activates:["elec-door"]},
          {value:"no", label:"Nee",code:"ND",activates:[]},
        ]
      },
      {
        id:"inlays", label:"Inlays",
        options:[
          {value:"base",    label:"Base",    code:"IB",activates:[]},
          {value:"diamond", label:"Diamond", code:"ID",activates:[]},
          {value:"brushed", label:"Brushed", code:"IU",activates:[]},
        ]
      },
      {
        id:"hk_sound", label:"H&K Sound System",
        options:[
          {value:"yes",label:"Ja", code:"HK",activates:["hk-sound"]},
          {value:"no", label:"Nee",code:"NH",activates:[]},
        ]
      },
    ],
    questions: [
      {
        id:"wielbasis", label:"Wielbasis",
        options:[
          {value:"l1",label:"L1",code:"L1",activates:["frame-l1"]},
          {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
        ]
      },
      {
        id:"hoogte", label:"Hoogte",
        options:[
          {value:"h1",label:"H1",code:"H1",activates:["height-h1"]},
        ]
      },
      {
        id:"schuifdeur", label:"Schuifdeur configuratie",
        options:[
          {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
          {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
          {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
        ]
      },
      {
        id:"ramen_b", label:"Ramen achter B-stijl",
        options:[
          {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
          {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
          {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
          {value:"none",  label:"Geen",  code:"W0",activates:[]},
        ]
      },
      {
        id:"separatiewand", label:"Separatiewand aanwezig",
        options:[
          {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
          {value:"no",          label:"Nee",         code:"NP",activates:[]},
          {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
        ]
      },
      {
        id:"eerste_zitrij", label:"Eerste zitrij",
        options:[
          {value:"voorstoel",label:"Voorstoel",code:"VS",activates:[]},
          {value:"bank",     label:"Bank",     code:"BK",activates:["seat-bench"]},
        ]
      },
      {
        id:"bekleding", label:"Bekleding voorstoelen",
        options:[
          {value:"hexagon",    label:"Hexagon",      code:"HX",activates:[]},
          {value:"striped",    label:"Striped",      code:"ST",activates:[]},
          {value:"fabric-life",label:"Fabric Life",  code:"FL",activates:[]},
          {value:"skai-style", label:"SKAI Style",   code:"SS",activates:[]},
          {value:"skai-robust",label:"SKAI Robust",  code:"SR",activates:[]},
          {value:"pan-am",     label:"PAN Americana",code:"PA",activates:[]},
        ]
      },
      {
        id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"base",label:"Base",code:"T1",activates:["trim-base"]},
            {value:"luxe",label:"Luxe",code:"T2",activates:["trim-lux"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3",label:"3-persoons",code:"S3",activates:["seat-3"]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
    }
};

/* ── Nissan Primastar ────────────────────────────────────────────── */
VEHICLE_CONFIGURATOR["Nissan|Primastar"] = {
  "Crew Cab": {
    vehicleCode: "NP",
      alwaysActive: ["divider","seating","wiring","hardware"],
      blockingQuestions: [
        {
          id:"rear_side", label:"Achterzijde",
          options:[
            {value:"tailgate",   label:"Achterklep",  code:"TG",activates:[]},
            {value:"rear_doors", label:"Achterdeuren",code:"RD",activates:[]},
          ]
        },
      ],
      questions: [
        {
          id:"wielbasis", label:"Wielbasis",
          options:[
            {value:"l1",label:"L1",code:"L1",activates:["frame-l1"]},
            {value:"l2",label:"L2",code:"L2",activates:["frame-l2"]},
          ]
        },
        {
          id:"hoogte", label:"Hoogte",
          options:[
            {value:"h1",label:"H1",code:"H1",activates:["height-h1"]},
          ]
        },
        {
          id:"schuifdeur", label:"Schuifdeur configuratie",
          options:[
            {value:"rs",label:"Rechts (RS)",code:"RS",activates:["door-single"]},
            {value:"ls",label:"Links (LS)", code:"LS",activates:["door-left"]},
            {value:"ds",label:"Dubbel (DS)",code:"DS",activates:["door-double"]},
          ]
        },
        {
          id:"ramen_b", label:"Ramen achter B-stijl",
          options:[
            {value:"right", label:"Rechts",code:"WR",activates:["win-right"]},
            {value:"left",  label:"Links", code:"WL",activates:["win-left"]},
            {value:"double",label:"Beide", code:"WB",activates:["win-both"]},
            {value:"none",  label:"Geen",  code:"W0",activates:[]},
          ]
        },
        {
          id:"separatiewand", label:"Separatiewand aanwezig",
          options:[
            {value:"yes",         label:"Ja",          code:"PW",activates:["partition"]},
            {value:"no",          label:"Nee",         code:"NP",activates:[]},
            {value:"disassembled",label:"Gedemonteerd",code:"PD",activates:[]},
          ]
        },
        {
          id:"eerste_zitrij", label:"Eerste zitrij",
          options:[
            {value:"voorstoel",label:"Voorstoel",code:"VS",activates:[]},
            {value:"bank",     label:"Bank",     code:"BK",activates:["seat-bench"]},
          ]
        },
        {
          id:"bekleding", label:"Bekleding voorstoelen",
          options:[
            {value:"kompo",label:"Kompo",code:"KO",activates:[]},
            {value:"java", label:"Java", code:"JV",activates:[]},
          ]
        },
        {
          id:"trimlevel", label:"Trimlevel",
          options:[
            {value:"base",   label:"Base",   code:"T1",activates:["trim-base"]},
            {value:"comfort",label:"Comfort",code:"T2",activates:["trim-com"]},
          ]
        },
        {
          id:"seating", label:"Zitplaatsen",
          options:[
            {value:"3",label:"3-persoons",code:"S3",activates:["seat-3"]},
          ]
        },
        {
          id:"protection_cover", label:"Beschermhoes",
          options:[
            {value:"yes",label:"Ja", code:"PC",activates:["prot-cover"]},
            {value:"no", label:"Nee",code:"NP",activates:[]},
          ]
        },
        {
          id:"glassoort", label:"Glassoort (indien ramen ontbreken)",
          options:[
            {value:"normal", label:"Normaal glas",code:"GC",activates:["win-clear"]},
            {value:"privacy",label:"Privacy glas",code:"GP",activates:["win-privacy"]},
          ]
        },
      ]
    }
};

// Renault Trafic E-Tech shares Trafic configurator
VEHICLE_CONFIGURATOR["Renault|Trafic E-Tech"]["Crew Cab"] =
  Object.assign({}, VEHICLE_CONFIGURATOR["Renault|Trafic"]["Crew Cab"], { vehicleCode: "RTE" });

/* ── Vehicle configurator lookup ─────────────────────────────────────── */
function getVehicleConfigurator(product) {
  const vKey = `${product.brand}|${product.van}`;
  return (VEHICLE_CONFIGURATOR[vKey] || {})[product.type] || null;
}

/* Returns vehicle-specific cfg if available, otherwise generic by type */
function getConfigurator(product) {
  return getVehicleConfigurator(product) || CONFIGURATOR[product.type] || null;
}

function computeQuickcode(product, cfgState, blockingState) {
  const cfg = getConfigurator(product);
  if (!cfg) return null;
  const vCode = cfg.vehicleCode || product.van.replace(/\s/g,"").substring(0,3).toUpperCase();
  const tCode = {"Crew Cab":"CC","Flex Cab":"FC","Partition Wall":"PW"}[product.type] || "XX";
  const fCode = product.fitment === "OEM" ? "OEM" : "AF";
  const allQ = [...(cfg.blockingQuestions||[]), ...cfg.questions];
  const allState = Object.assign({}, blockingState||{}, cfgState||{});
  const codes = allQ.map(q => {
    const opt = (q.options||[]).find(o => o.value === allState[q.id]);
    return opt && opt.code ? opt.code : null;
  }).filter(Boolean);
  return `SNK-${vCode}-${tCode}-${fCode}${codes.length ? "-"+codes.join("-") : ""}`;
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKET DATA  (per product – key: "brand|van|type|fitment")
═══════════════════════════════════════════════════════════════════════ */
const MARKET_DATA = {
  /* ── Citroën Jumpy ───────────────────────────────────────────────── */
  "Citroën|Jumpy|Crew Cab|OEM": {
    introYear: 2019,
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy"],
    shippingDestinations: [
      {country:"Turkey",lat:39,lng:35},
      {country:"France",lat:46,lng:2},
      {country:"Uruguay",lat:-33,lng:-56},
    ],
  },
  "Citroën|Jumpy|Crew Cab|After-fit": {
    introYear: 2020,
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:true,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },
  "Citroën|Jumpy|Flex Cab|OEM": {
    introYear: 2021,
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    shippingDestinations: [
      {country:"Turkey",lat:39,lng:35},
      {country:"France",lat:46,lng:2},
    ],
  },
  "Citroën|Jumpy|Flex Cab|After-fit": {
    introYear: 2021,
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── Citroën Jumpy Combi ─────────────────────────────────────────── */
  "Citroën|Jumpy Combi|Partition Wall|After-fit": {
    introYear: 2024,
    activeMarkets: ["Netherlands","Belgium"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:false,homologation:"CoC"},FR:{active:false,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── Citroën Berlingo ─────────────────────────────────────────────── */
  "Citroën|Berlingo|Crew Cab|OEM": {
    introYear: 2018,
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy","United Kingdom"],
    shippingDestinations: [
      {country:"Turkey",lat:39,lng:35},
      {country:"France",lat:46,lng:2},
      {country:"Uruguay",lat:-33,lng:-56},
    ],
  },

  /* ── Citroën Jumper ──────────────────────────────────────────────── */
  "Citroën|Jumper|Crew Cab|OEM": {
    introYear: 2019,
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","Italy"],
    shippingDestinations: [
      {country:"Turkey",lat:39,lng:35},
      {country:"France",lat:46,lng:2},
      {country:"Uruguay",lat:-33,lng:-56},
    ],
  },
  "Citroën|Jumper|Crew Cab|After-fit": {
    introYear: 2020,
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:true,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── MAN TGE ─────────────────────────────────────────────────────── */
  "MAN|TGE|Crew Cab|After-fit": {
    introYear: 2022,
    activeMarkets: ["Netherlands","Belgium","Germany"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:false,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── Volkswagen ──────────────────────────────────────────────────── */
  "Volkswagen|Transporter|Crew Cab|After-fit": {
    introYear: 2019,
    activeMarkets: ["Netherlands","Belgium","Germany","United Kingdom"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:false,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:true,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },
  "Volkswagen|Crafter|Crew Cab|After-fit": {
    introYear: 2020,
    activeMarkets: ["Netherlands","Belgium","Germany"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:false,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── Nissan Primastar ────────────────────────────────────────────── */
  "Nissan|Primastar|Crew Cab|After-fit": {
    introYear: 2022,
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:false,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },

  /* ── Fallback entries by type+fitment ───────────────────────────── */
  "_|Crew Cab|OEM": {
    introYear: 2019,
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    shippingDestinations: [],
  },
  "_|Crew Cab|After-fit": {
    introYear: 2020,
    activeMarkets: ["Netherlands","Belgium","Germany","France","United Kingdom"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:true,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },
  "_|Flex Cab|OEM": {
    introYear: 2021,
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    shippingDestinations: [],
  },
  "_|Flex Cab|After-fit": {
    introYear: 2021,
    activeMarkets: ["Netherlands","Belgium","Germany","France"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:false,homologation:"CoC"},GB:{active:false,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
  },
  "_|Partition Wall|After-fit": {
    introYear: 2017,
    activeMarkets: ["Netherlands","Belgium","Germany","France","Spain","United Kingdom"],
    countryData: {
      NL:{active:true,homologation:"CoC"},BE:{active:true,homologation:"CoC"},
      DE:{active:true,homologation:"CoC"},FR:{active:true,homologation:"CoC"},
      ES:{active:true,homologation:"CoC"},GB:{active:true,homologation:"CoC"},
      IT:{active:false,homologation:"CoC"},CZ:{active:false,homologation:"GWC"},
      DK:{active:false,homologation:"CoC"},AT:{active:false,homologation:"CoC"},
      PL:{active:false,homologation:"GWC"},SE:{active:false,homologation:"CoC"},
      FI:{active:false,homologation:"CoC"},PT:{active:false,homologation:"CoC"},
      HU:{active:false,homologation:"GWC"},EE:{active:false,homologation:"GWC"},
      LT:{active:false,homologation:"GWC"},LV:{active:false,homologation:"GWC"},
      RO:{active:false,homologation:"GWC"},SI:{active:false,homologation:"CoC"},
      SK:{active:false,homologation:"GWC"},BG:{active:false,homologation:"GWC"},
    },
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
