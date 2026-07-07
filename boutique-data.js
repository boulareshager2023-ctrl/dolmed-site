/* ============================================================
   DOLMED — Source unique du catalogue et des règles commerciales
   Utilisé par boutique.html (affichage + panier) et panier.html
   Migration-ready : chaque produit a un SKU stable.
   ⚠️ Les PRIX se modifient ICI (plus dans boutique.html).
   ============================================================ */

/* Règles commerciales — un seul endroit à modifier */
const REGLES = {
  livraison: 5,          // frais de livraison en DT
  seuilGratuite: 200,    // livraison gratuite à partir de ce montant (DT)
  remisePct: 15,         // remise première commande (%)
  codePromo: "BIENVENUE15",
  devise: "DT"
};

/* Catalogue — sku = référence stable (FAMILLE-SENTEUR-FORMAT) */
const PRODUITS = [
 {sku:"LIN-DEMAQ-100",     nom:"Lingettes démaquillantes",               senteur:"Aloe Vera — peaux sensibles",  format:"Boîte de 100", prix:42.000,   promo:null, stock:true,  fam:"lingettes", img:"p01", phare:true},
 {sku:"LIN-MAINVIS-100",   nom:"Lingettes nettoyantes mains & visage",   senteur:"Aloe Vera — sans rinçage",     format:"Boîte de 100", prix:32.000,   promo:null, stock:true,  fam:"lingettes", img:"p02", phare:true},
 {sku:"LIN-CLEANIC-100",   nom:"Lingettes désinfectantes Cleanic",       senteur:"Antibactériennes",             format:"Boîte de 100", prix:28.000,   promo:null, stock:true,  fam:"lingettes", img:"p03", phare:true},
 {sku:"LIN-BEBE-100",      nom:"Lingettes pour bébés",                   senteur:"PH neutre — hypoallergéniques",format:"Boîte de 100", prix:21.000,   promo:null, stock:true,  fam:"lingettes", img:"p04", phare:true},
 {sku:"LIN-DOUCHESEC-100", nom:"Lingettes Douche-à-sec",                 senteur:"Usage externe — sans rinçage", format:"Boîte de 100", prix:28.000,   promo:null, stock:true,  fam:"lingettes", img:"p05", phare:true},
 {sku:"REP-CITRO-100",     nom:"Répulsif Moustique en Spray",            senteur:"Citronnelle — huiles essentielles", format:"100 ml", prix:9.000, promo:null, stock:true,  fam:"repulsif",  img:"p08"},
 {sku:"ACA-JASBL-100",     nom:"Spray Anti-Acariens",                    senteur:"Jasmin Blanc",                 format:"100 ml",       prix:15.000,   promo:null, stock:true,  fam:"acariens",  img:"p09"},
 {sku:"ACA-JASBL-500",     nom:"Spray Anti-Acariens",                    senteur:"Jasmin Blanc",                 format:"500 ml",       prix:45.000,   promo:null, stock:true,  fam:"acariens",  img:"p10"},
 {sku:"ACA-FLO-100",       nom:"Spray Anti-Acariens",                    senteur:"Fleur d'Oranger",              format:"100 ml",       prix:15.000,   promo:null, stock:true,  fam:"acariens",  img:"p11"},
 {sku:"ACA-FLO-500",       nom:"Spray Anti-Acariens",                    senteur:"Fleur d'Oranger",              format:"500 ml",       prix:45.000,   promo:null, stock:true,  fam:"acariens",  img:"p12"},
 {sku:"ACA-MARIN-500",     nom:"Spray Anti-Acariens",                    senteur:"Marin",                        format:"500 ml",       prix:45.000,   promo:null, stock:true,  fam:"acariens",  img:"p13"},
 {sku:"SAV-FLO-100",       nom:"Savon Spray",                            senteur:"Fleur d'Oranger",              format:"100 ml",       prix:6.800,    promo:null, stock:true,  fam:"savons",    img:"p14"},
 {sku:"SAV-ORCH-100",      nom:"Savon Spray",                            senteur:"Orchidée",                     format:"100 ml",       prix:6.800,    promo:null, stock:false, fam:"savons",    img:"p15"},
 {sku:"SAV-JASBL-100",     nom:"Savon Spray",                            senteur:"Jasmin Blanc",                 format:"100 ml",       prix:6.800,    promo:null, stock:true,  fam:"savons",    img:"p16"},
 {sku:"SAV-JASRG-100",     nom:"Savon Spray",                            senteur:"Jasmin Rouge",                 format:"100 ml",       prix:6.800,    promo:null, stock:true,  fam:"savons",    img:"p17"},
 {sku:"SAV-MANGO-100",     nom:"Savon Spray",                            senteur:"Mango",                        format:"100 ml",       prix:6.800,    promo:null, stock:true,  fam:"savons",    img:"p18"},
 {sku:"SUR-FLO-100",       nom:"Solution désinfectante surfaces & air",  senteur:"Fleur d'Oranger",              format:"100 ml",       prix:6.000,    promo:null, stock:true,  fam:"surfaces",  img:"p19"},
 {sku:"SUR-JASBL-100",     nom:"Solution désinfectante surfaces & air",  senteur:"Jasmin Blanc",                 format:"100 ml",       prix:6.000,    promo:null, stock:true,  fam:"surfaces",  img:"p20"},
 {sku:"SUR-JASBL-500",     nom:"Solution désinfectante surfaces & air",  senteur:"Jasmin Blanc",                 format:"500 ml",       prix:19.500,   promo:null, stock:true,  fam:"surfaces",  img:"p21"},
 {sku:"SUR-JASRG-100",     nom:"Solution désinfectante surfaces & air",  senteur:"Jasmin Rouge",                 format:"100 ml",       prix:6.000,    promo:null, stock:true,  fam:"surfaces",  img:"p22"},
 {sku:"SUR-ORCH-500",      nom:"Solution désinfectante surfaces & air",  senteur:"Orchidée",                     format:"500 ml",       prix:19.500,   promo:null, stock:true,  fam:"surfaces",  img:"p23"},
 {sku:"MAINS-CLEANIC-100", nom:"Solution hydroalcoolique mains",         senteur:"Cleanic",                      format:"100 ml",       prix:3.900,    promo:null, stock:true,  fam:"mains",     img:"p24"},
 {sku:"MAINS-JASBL-100",   nom:"Solution hydroalcoolique mains",         senteur:"Jasmin Blanc",                 format:"100 ml",       prix:6.000,    promo:null, stock:true,  fam:"mains",     img:"p25"},
 {sku:"MAINS-CLEANIC-500", nom:"Solution hydroalcoolique mains",         senteur:"Cleanic",                      format:"500 ml",       prix:19.500,   promo:null, stock:true,  fam:"mains",     img:"p26"},
 {sku:"MAINS-CLEANIC-5L",  nom:"Solution hydroalcoolique mains",         senteur:"Cleanic",                      format:"5 L",          prix:139.000,  promo:null, stock:false, fam:"mains",     img:"p27"},
 {sku:"MAINS-JASBL-5L",    nom:"Solution hydroalcoolique mains",         senteur:"Jasmin Blanc",                 format:"5 L",          prix:139.000,  promo:null, stock:true,  fam:"mains",     img:"p28"},
 {sku:"TOI-COUVRE-100",    nom:"Couvre-sièges de toilettes jetables",    senteur:"100 % biodégradables",         format:"Pack de 100",  prix:22.000,   promo:null, stock:true,  fam:"toilettes", img:"p06"},
 {sku:"TOI-SUPPORT-U",     nom:"Support mural pour couvre-sièges",       senteur:"Plastique — fixation murale",  format:"Unité",        prix:70.000,   promo:null, stock:true,  fam:"toilettes", img:"p07"},
 {sku:"SANTE-MASQUE-10A",  nom:"Masque bouclier de bouche",              senteur:"Transparent",                  format:"Paquet de 10",  prix:20.000,  promo:null, stock:true,  fam:"sante",     img:"p29"},
 {sku:"SANTE-MASQUE-10B",  nom:"Masque transparent bouclier de bouche",  senteur:"Transparent",                  format:"Paquet de 10",  prix:20.000,  promo:null, stock:true,  fam:"sante",     img:"p30"},
 {sku:"SANTE-OXY-U",       nom:"Oxymètre de pouls",                      senteur:"Mesure SpO2 et pouls",         format:"Unité",        prix:45.000,   promo:null, stock:true,  fam:"sante",     img:"p31"},
 {sku:"SANTE-CONC-10L",    nom:"Concentrateur d'oxygène 10 L",           senteur:"Usage domicile",               format:"Unité",        prix:3200.000, promo:null, stock:true,  fam:"sante",     img:"p32"},
 {sku:"SANTE-CONC-U",      nom:"Concentrateur d'oxygène",                senteur:"Usage domicile",               format:"Unité",        prix:null,     promo:null, stock:false, fam:"sante",     img:"p33"},
];

/* Retrouver un produit par SKU (utilisé par le panier) */
function produitParSku(sku){ return PRODUITS.find(p => p.sku === sku) || null; }

/* ============================================================
   Moteur de panier — stockage navigateur (localStorage)
   ============================================================ */
const Cart = {
  KEY: "dolmed_cart",
  get(){ try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch(e){ return []; } },
  save(c){ localStorage.setItem(this.KEY, JSON.stringify(c)); },
  add(sku, qty=1){
    const c = this.get();
    const l = c.find(x => x.sku === sku);
    if(l){ l.qty += qty; } else { c.push({ sku, qty }); }
    this.save(c); return c;
  },
  setQty(sku, qty){
    let c = this.get();
    if(qty <= 0){ c = c.filter(x => x.sku !== sku); }
    else { const l = c.find(x => x.sku === sku); if(l) l.qty = qty; }
    this.save(c); return c;
  },
  remove(sku){ this.save(this.get().filter(x => x.sku !== sku)); },
  clear(){ this.save([]); },
  count(){ return this.get().reduce((n,x) => n + x.qty, 0); },
  /* Détail des lignes avec produit + sous-total ligne */
  lignes(){
    return this.get().map(x => {
      const p = produitParSku(x.sku);
      const pu = p ? (p.promo != null ? p.promo : p.prix) : 0;
      return { sku:x.sku, qty:x.qty, produit:p, pu, total: (pu||0)*x.qty };
    });
  }
};
