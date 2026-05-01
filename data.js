/* ── Vehicle image URLs (640 px Wikimedia Commons thumbnails) ────────── */
const VAN_IMAGES = {
  "Caddy":          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/VW_Caddy_Kasten_1.6_TDI_Facelift.JPG/640px-VW_Caddy_Kasten_1.6_TDI_Facelift.JPG",
  "Transporter":    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2019_Volkswagen_Transporter_(T6)_2.0.jpg/640px-2019_Volkswagen_Transporter_(T6)_2.0.jpg",
  "Crafter":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2016_Volkswagen_Crafter._Spielvogel.jpg/640px-2016_Volkswagen_Crafter._Spielvogel.jpg",
  "Caravelle":      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/VW_T6_Multivan_Generation_Six_2.0_TDI.JPG/640px-VW_T6_Multivan_Generation_Six_2.0_TDI.JPG",
  "ID Buzz":        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/2022_Volkswagen_ID._Buzz_front_view.jpg/640px-2022_Volkswagen_ID._Buzz_front_view.jpg",
  "Multivan":       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/VW_Multivan_T7_Hybrid%2C_Ixelles.JPG/640px-VW_Multivan_T7_Hybrid%2C_Ixelles.JPG",
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
  "Trafic":         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Renault_Trafic_001.JPG/640px-Renault_Trafic_001.JPG",
  "Trafic E-Tech":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Renault_Trafic_001.JPG/640px-Renault_Trafic_001.JPG",
  "Master":         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Renault_Master_dCi_120.JPG/640px-Renault_Master_dCi_120.JPG",
  "Transit Connect":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/2018_Ford_Transit_Connect_200_1.5_Front.jpg/640px-2018_Ford_Transit_Connect_200_1.5_Front.jpg",
  "Transit Custom": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2019_Ford_Transit_Custom_MS-RT_320_Limited_2.0_Front.jpg/640px-2019_Ford_Transit_Custom_MS-RT_320_Limited_2.0_Front.jpg",
  "Transit":        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ford_Transit_VI_110_T300_20090910_front.JPG/640px-Ford_Transit_VI_110_T300_20090910_front.JPG",
  "Tourneo":        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Ford_Tourneo_Custom_PHEV_at_IAA_2019_IMG_0415.jpg/640px-Ford_Tourneo_Custom_PHEV_at_IAA_2019_IMG_0415.jpg",
  "Transit Kombi":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ford_Transit_VI_110_T300_20090910_front.JPG/640px-Ford_Transit_VI_110_T300_20090910_front.JPG",
  "Daily":          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Iveco_Daily_2014_Minibus._Free_image_Spielvogel.JPG/640px-Iveco_Daily_2014_Minibus._Free_image_Spielvogel.JPG",
  "Vito":           "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Mercedes-Benz_Vito_Kastenwagen_%28447%29.JPG/640px-Mercedes-Benz_Vito_Kastenwagen_%28447%29.JPG",
  "Vito Mixto":     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Mercedes-Benz_Vito_Kastenwagen_%28447%29.JPG/640px-Mercedes-Benz_Vito_Kastenwagen_%28447%29.JPG",
  "V-Class":        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Mercedes-Benz_V-Class_%28W447%29_VIP_Shuttle_by_Auto_Cuby_IAA_2016_%283%29_Travelarz.JPG/640px-Mercedes-Benz_V-Class_%28W447%29_VIP_Shuttle_by_Auto_Cuby_IAA_2016_%283%29_Travelarz.JPG",
  "Sprinter":       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Mercedes-Benz_Sprinter.JPG/640px-Mercedes-Benz_Sprinter.JPG",
  "PV5":            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2027_Kia_PV5_au_SIAM_2026.JPG/640px-2027_Kia_PV5_au_SIAM_2026.JPG",
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
