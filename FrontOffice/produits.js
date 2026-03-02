  // ===== DONNÉES — artisanId '1' = Ahmed Ben Salem =====
  var produitsData = [
    { id:'PROD-2026-001', titre:'Vase en C\u00e9ramique Bleue',        sous_titre:'Inspiration marine',      description:'Un magnifique vase artisanal fa\u00e7onn\u00e9 \u00e0 la main avec de l\'argile de Nabeul, d\u00e9cor\u00e9 avec des motifs g\u00e9om\u00e9triques traditionnels issus du patrimoine tunisien.',    categorie:'poterie',     materiaux:'Argile rouge, \u00e9mail bleu',   origine:'local', couleur:'Bleu turquoise', long:'',  larg:'',  haut:'',  poids:'',    prix:85.00,  stock:12, artisan:'Ahmed Ben Salem', artisanId:'1', date:'15/01/2026', emoji:'&#127866;', image:'', labels:[] },
    { id:'PROD-2026-002', titre:'Collier en Argent Filigrane',         sous_titre:'Bijou traditionnel',      description:'Collier artisanal en argent travaill\u00e9 selon la technique du filigrane, typique du savoir-faire tunisien de Sidi Bou Said.',                                                              categorie:'bijouterie',  materiaux:'Argent 925',              origine:'local', couleur:'Argent',         long:'',  larg:'',  haut:'',  poids:'',    prix:220.00, stock:5,  artisan:'Fatma Mejri',     artisanId:'2', date:'18/01/2026', emoji:'&#128142;', image:'', labels:['fait_main'] },
    { id:'PROD-2026-003', titre:'Tapis Berb\u00e8re Handmade',         sous_titre:'Tissage de laine pure',   description:'Tapis berb\u00e8re tiss\u00e9 \u00e0 la main avec de la laine de mouton naturelle, motifs g\u00e9om\u00e9triques authentiques du sud tunisien.',                                              categorie:'tissage',     materiaux:'Laine de mouton',         origine:'local', couleur:'Rouge et beige', long:'200',larg:'120',haut:'',  poids:'3500',prix:450.00, stock:3,  artisan:'Karim Trabelsi',  artisanId:'3', date:'20/01/2026', emoji:'&#128074;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-004', titre:'Sculpture en Bois d\'Olivier',        sous_titre:'Art naturel',             description:'Sculpture r\u00e9alis\u00e9e dans du bois d\'olivier massif de la r\u00e9gion de Sfax, repr\u00e9sentant un visage berb\u00e8re stylis\u00e9.',                                              categorie:'sculpture',   materiaux:'Bois d\'olivier',         origine:'local', couleur:'Bois naturel',   long:'15', larg:'10', haut:'35', poids:'800', prix:180.00, stock:8,  artisan:'Leila Hamdi',     artisanId:'4', date:'22/01/2026', emoji:'&#128511;', image:'', labels:['fait_main','ecologique','local'] },
    { id:'PROD-2026-005', titre:'Sac en Cuir Artisanal',               sous_titre:'Maroquinerie Tunisienne', description:'Sac \u00e0 main en cuir v\u00e9ritable tann\u00e9 naturellement, coutures \u00e0 la main, doublure en tissu traditionnel kherba.',                                                           categorie:'maroquinerie',materiaux:'Cuir tann\u00e9',            origine:'local', couleur:'Marron caramel', long:'35', larg:'12', haut:'28', poids:'600', prix:320.00, stock:0,  artisan:'Mohamed Arbi',    artisanId:'5', date:'25/01/2026', emoji:'&#128092;', image:'', labels:['fait_main'] },
    { id:'PROD-2026-006', titre:'Lustre en Verre Souffl\u00e9',        sous_titre:'Lumi\u00e8re d\'artisan', description:'Lustre unique fabriqu\u00e9 \u00e0 la main par soufflage de verre, aux couleurs chaudes de la M\u00e9diterran\u00e9e.',                                                                      categorie:'verre',       materiaux:'Verre souffl\u00e9',       origine:'local', couleur:'Ambre et or',    long:'',  larg:'',  haut:'40', poids:'1200',prix:650.00, stock:2,  artisan:'Ahmed Ben Salem', artisanId:'1', date:'28/01/2026', emoji:'&#128302;', image:'', labels:['fait_main','ecologique'] },
    { id:'PROD-2026-007', titre:'Tableau Calligraphie Arabe',          sous_titre:'Art & Spiritualit\u00e9', description:'Tableau encadr\u00e9 avec calligraphie arabe peinte \u00e0 l\'huile sur bois de c\u00e8dre, verset du Coran en arabesque dor\u00e9e.',                                                       categorie:'peinture',    materiaux:'Huile, bois de c\u00e8dre', origine:'local', couleur:'Or sur noir',     long:'60', larg:'4',  haut:'80', poids:'1500',prix:275.00, stock:6,  artisan:'Fatma Mejri',     artisanId:'2', date:'02/02/2026', emoji:'&#127912;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-008', titre:'Bo\u00eete \u00e0 Bois Sculpt\u00e9e',sous_titre:'Coffret pr\u00e9cieux',   description:'Petite bo\u00eete en bois de noyer pr\u00e9cieux sculpt\u00e9e \u00e0 la main avec motifs floraux cisel\u00e9s, id\u00e9ale comme cadeau.',                                                   categorie:'bois',        materiaux:'Bois de noyer',           origine:'local', couleur:'Brun fonc\u00e9', long:'20', larg:'15', haut:'10', poids:'400', prix:95.00,  stock:15, artisan:'Karim Trabelsi',  artisanId:'3', date:'05/02/2026', emoji:'&#128230;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-009', titre:'Lampe en Poterie Nabeulienne',        sous_titre:'Lumi\u00e8re artisanale', description:'Lampe de table en terre cuite peinte \u00e0 la main avec motifs floraux bleus et blancs, typique de la r\u00e9gion de Nabeul.',                                                             categorie:'poterie',     materiaux:'Terre cuite, peinture',   origine:'local', couleur:'Bleu et blanc',  long:'18', larg:'18', haut:'35', poids:'900', prix:120.00, stock:7,  artisan:'Ahmed Ben Salem', artisanId:'1', date:'10/02/2026', emoji:'&#127966;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-010', titre:'Bracelet Berbère Argent',             sous_titre:'Bijou ancrage culturel',  description:'Bracelet en argent massif grav\u00e9 de motifs berb\u00e8res g\u00e9om\u00e9triques, transmis de g\u00e9n\u00e9ration en g\u00e9n\u00e9ration.',                                             categorie:'bijouterie',  materiaux:'Argent 925, email',       origine:'local', couleur:'Argent oxyd\u00e9',long:'',  larg:'',  haut:'',  poids:'85',  prix:180.00, stock:9,  artisan:'Ahmed Ben Salem', artisanId:'1', date:'12/02/2026', emoji:'&#128141;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-011', titre:'Djellaba Brod\u00e9e Homme',          sous_titre:'Costume traditionnel',   description:'Djellaba traditionnelle en laine fine, brod\u00e9e \u00e0 la main de fils d\'or sur le col et les manches, confectionn\u00e9e par un ma\u00eetre artisan de Kairouan.',                        categorie:'tissage',     materiaux:'Laine fine, fil d\'or',   origine:'local', couleur:'Blanc cass\u00e9', long:'140',larg:'55', haut:'',  poids:'800', prix:380.00, stock:4,  artisan:'Ahmed Ben Salem', artisanId:'1', date:'15/02/2026', emoji:'&#128084;', image:'', labels:['fait_main','local'] },
    { id:'PROD-2026-012', titre:'Plateau en Cuivre Cisel\u00e9',       sous_titre:'Art du m\u00e9tal',       description:'Plateau en cuivre pur cisel\u00e9 \u00e0 la main avec des motifs arabesque complexes. Chaque pi\u00e8ce est unique et refl\u00e8te des heures de travail minutieux.',                          categorie:'sculpture',   materiaux:'Cuivre pur',              origine:'local', couleur:'Dor\u00e9 brill.',  long:'45', larg:'45', haut:'3',  poids:'600', prix:145.00, stock:11, artisan:'Leila Hamdi',     artisanId:'4', date:'18/02/2026', emoji:'&#127851;', image:'', labels:['fait_main'] },
    { id:'PROD-2026-013', titre:'Porte-monnaie en Cuir Sellier',       sous_titre:'Accessoire de luxe',     description:'Porte-monnaie en cuir de veau tanné végétal, coutures sellier visibles, doublure soie.',                                                                                                       categorie:'maroquinerie',materiaux:'Cuir de veau',            origine:'local', couleur:'Cognac',          long:'11', larg:'1',  haut:'8',  poids:'90',  prix:75.00,  stock:20, artisan:'Mohamed Arbi',    artisanId:'5', date:'20/02/2026', emoji:'&#128114;', image:'', labels:['fait_main'] },
    { id:'PROD-2026-014', titre:'Bougeoir en Verre Souffl\u00e9',      sous_titre:'Lumi\u00e8re douce',     description:'Bougeoir en verre souffl\u00e9 \u00e0 la bouche, couleurs am\u00e9thyste et or, r\u00e9f\u00e9rence \u00e0 l\'art verrier de l\'ile de Djerba.',                                              categorie:'verre',       materiaux:'Verre souffl\u00e9',       origine:'local', couleur:'Violet et or',    long:'10', larg:'10', haut:'20', poids:'300', prix:95.00,  stock:6,  artisan:'Ahmed Ben Salem', artisanId:'1', date:'22/02/2026', emoji:'&#128368;', image:'', labels:['fait_main','ecologique'] },
    { id:'PROD-2026-015', titre:'Tableau Aquarelle Kerkennah',         sous_titre:'Paysage marin',          description:'Aquarelle originale repr\u00e9sentant les couchers de soleil sur les \u00eeles Kerkennah, peinte \u00e0 l\'atelier sur papier Arches 300g.',                                                  categorie:'peinture',    materiaux:'Aquarelle, papier Arches',origine:'local', couleur:'Bleu azur',      long:'40', larg:'3',  haut:'30', poids:'200', prix:190.00, stock:3,  artisan:'Fatma Mejri',     artisanId:'2', date:'24/02/2026', emoji:'&#127754;', image:'', labels:['fait_main'] }
  ];

  var CATS  = {poterie:'Poterie',tissage:'Tissage',bijouterie:'Bijouterie',sculpture:'Sculpture',maroquinerie:'Maroquinerie',bois:'Bois',verre:'Verre',peinture:'Peinture & Art',autre:'Autre'};
  var EMOJIS= {poterie:'&#127866;',tissage:'&#129525;',bijouterie:'&#128142;',sculpture:'&#128511;',maroquinerie:'&#128092;',bois:'&#128230;',verre:'&#128302;',peinture:'&#127912;',autre:'&#10024;'};

  // ===== NAVIGATION =====
  function afficherVue(id) {
    document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  }
  function allerVueAjout() { rendreHistorique(); afficherVue('vue-ajout'); }
  function allerVueModif()  { rendreModif();      afficherVue('vue-modif'); }

  // ===== GRILLE PRODUITS =====
  function rendreGrille(liste) {
    document.getElementById('prodCount').innerHTML = 'Affichage de <span>' + liste.length + '</span> produit(s)';
    if (!liste.length) {
      document.getElementById('productsGrid').innerHTML =
        '<p style="color:#aaa;grid-column:1/-1;text-align:center;padding:50px;font-style:italic;">Aucun produit ne correspond à vos critères.</p>';
      return;
    }
    document.getElementById('productsGrid').innerHTML = liste.map(function(p) {
      var badge = p.stock === 0
        ? '<span class="stock-badge stock-out">Rupture</span>'
        : p.stock < 5
          ? '<span class="stock-badge stock-low">Stock faible</span>'
          : '<span class="stock-badge stock-ok">En stock</span>';
      var cartBtn = p.stock === 0
        ? '<button class="btn-cart-icon" disabled title="Indisponible">&#128722;</button>'
        : '<button class="btn-cart-icon" onclick="ajouterPanier(event,\'' + p.id + '\')" title="Ajouter au panier">&#128722;</button>';
      return '<div class="product-card">'
        + '<div class="product-img"><img src="' + p.image + '" alt="' + p.titre + '" onerror="this.style.display=\'none\'" ' + (p.image ? '' : 'style="display:none"') + '></div>'
        + '<div class="product-body">'
        +   '<div class="product-cat">' + (CATS[p.categorie] || p.categorie) + '</div>'
        +   '<div class="product-title">' + p.titre + '</div>'
        +   '<div class="product-artisan">&#128104;&#8205;&#127912; ' + p.artisan + '</div>'
        +   '<div class="product-footer">'
        +     '<span class="product-price">' + p.prix.toFixed(2) + ' DT</span>'
        +     badge
        +     cartBtn
        +   '</div>'
        + '</div></div>';
    }).join('');
  }
  rendreGrille(produitsData);

  // ===== SIDEBAR =====
  function sColorier(id, itemId) {
    var el = document.getElementById(id), it = document.getElementById(itemId);
    if (el.checked) { it.style.borderColor = '#7EACB5'; it.style.background = '#fdeee4'; }
    else { it.style.borderColor = ''; it.style.background = ''; }
  }

  // DOUBLE RANGE SLIDER
  function majSlider() {
    var min = parseInt(document.getElementById('sliderMin').value);
    var max = parseInt(document.getElementById('sliderMax').value);
    if (min > max) { min = max; document.getElementById('sliderMin').value = min; }
    document.getElementById('sf_pmin').value = min;
    document.getElementById('sf_pmax').value = max;
    document.getElementById('lbl_pmin').textContent = min + ' DT';
    document.getElementById('lbl_pmax').textContent = max + ' DT';
    var pct1 = (min / 700) * 100;
    var pct2 = (max / 700) * 100;
    document.getElementById('sliderRange').style.left  = pct1 + '%';
    document.getElementById('sliderRange').style.width = (pct2 - pct1) + '%';
    document.getElementById('sf_err_prix').style.display = 'none';
  }
  function majSliderDepuisInput() {
    var min = parseInt(document.getElementById('sf_pmin').value) || 0;
    var max = parseInt(document.getElementById('sf_pmax').value) || 700;
    if (min < 0) min = 0; if (min > 700) min = 700;
    if (max < 0) max = 0; if (max > 700) max = 700;
    if (min > max) { document.getElementById('sf_err_prix').textContent = 'Le prix min dépasse le max.'; document.getElementById('sf_err_prix').style.display = 'block'; return; }
    document.getElementById('sf_err_prix').style.display = 'none';
    document.getElementById('sliderMin').value = min;
    document.getElementById('sliderMax').value = max;
    document.getElementById('lbl_pmin').textContent = min + ' DT';
    document.getElementById('lbl_pmax').textContent = max + ' DT';
    var pct1 = (min / 700) * 100, pct2 = (max / 700) * 100;
    document.getElementById('sliderRange').style.left  = pct1 + '%';
    document.getElementById('sliderRange').style.width = (pct2 - pct1) + '%';
  }
  // Init slider range bar
  majSlider();
  // z-index pour que le thumb min soit sur le dessus quand proche du max
  document.getElementById('sliderMin').style.zIndex = 3;
  document.getElementById('sliderMax').style.zIndex = 4;

  function appliquerFiltres() {
    var errEl = document.getElementById('sf_err_prix');
    var pmin  = parseInt(document.getElementById('sf_pmin').value) || 0;
    var pmax  = parseInt(document.getElementById('sf_pmax').value) || 700;
    if (pmin > pmax) { errEl.textContent = 'Le prix min ne peut pas dépasser le max.'; errEl.style.display = 'block'; return; }
    errEl.style.display = 'none';
    var mk   = document.getElementById('sf_motcle').value.toLowerCase().trim();
    var cats = ['sc1','sc2','sc3','sc4','sc5','sc6','sc7','sc8'].filter(function(id){ return document.getElementById(id).checked; }).map(function(id){ return document.getElementById(id).value; });
    var art  = document.getElementById('sf_artisan').value;
    var dispo= document.querySelector('input[name="sf_dispo"]:checked').value;
    var tri  = document.getElementById('sf_tri').value;
    var res  = produitsData.filter(function(p) {
      if (mk && !(p.titre.toLowerCase().includes(mk) || p.description.toLowerCase().includes(mk) || p.artisan.toLowerCase().includes(mk))) return false;
      if (cats.length && !cats.includes(p.categorie)) return false;
      if (p.prix < pmin || p.prix > pmax) return false;
      if (art && p.artisanId !== art) return false;
      if (dispo === 'stock'   && p.stock === 0) return false;
      if (dispo === 'rupture' && p.stock > 0)  return false;
      return true;
    });
    if (tri === 'prix_croissant')  res.sort(function(a,b){ return a.prix - b.prix; });
    else if (tri === 'prix_decroissant') res.sort(function(a,b){ return b.prix - a.prix; });
    else if (tri === 'nom_az') res.sort(function(a,b){ return a.titre.localeCompare(b.titre); });
    rendreGrille(res);
  }

  function reinitialiserSidebar() {
    document.getElementById('sf_motcle').value = '';
    ['sc1','sc2','sc3','sc4','sc5','sc6','sc7','sc8'].forEach(function(id, i) {
      document.getElementById(id).checked = false;
      sColorier(id, 'si_cat' + (i + 1));
    });
    document.getElementById('sliderMin').value = 0;
    document.getElementById('sliderMax').value = 700;
    document.getElementById('sf_pmin').value   = 0;
    document.getElementById('sf_pmax').value   = 700;
    majSlider();
    document.getElementById('sf_artisan').value = '';
    document.getElementById('sd1').checked = true;
    document.getElementById('sf_tri').value = 'pertinence';
    document.getElementById('sf_err_prix').style.display = 'none';
    rendreGrille(produitsData);
  }

  // ===== TOGGLE FILTRE CATÉGORIE =====
  function toggleFilter(toggleId, bodyId) {
    var toggle = document.getElementById(toggleId);
    var body   = document.getElementById(bodyId);
    toggle.classList.toggle('open');
    body.classList.toggle('open');
  }

  // ===== TABLES — filtré sur artisanId '1' (Ahmed Ben Salem) =====
  var MON_ARTISAN_ID = '1';

  function rendreHistorique() {
    var mes = produitsData.filter(function(p){ return p.artisanId === MON_ARTISAN_ID; });
    document.getElementById('nbAjout').textContent = mes.length;
    var tb = document.getElementById('historiqueBody');
    if (!mes.length) { tb.innerHTML = '<tr class="empty-row"><td colspan="7">Aucun produit ajouté pour le moment.</td></tr>'; return; }
    tb.innerHTML = mes.map(function(p) {
      var stockCel = p.stock === 0
        ? '<span class="stock-badge stock-out">Rupture</span>'
        : p.stock < 5 ? '<span class="stock-badge stock-low">' + p.stock + '</span>' : p.stock;
      return '<tr><td>' + p.id + '</td><td>' + p.titre + '</td><td>' + (CATS[p.categorie] || p.categorie) + '</td><td><strong>' + p.prix.toFixed(2) + ' DT</strong></td><td>' + stockCel + '</td><td>' + p.artisan + '</td><td>' + p.date + '</td></tr>';
    }).join('');
  }

  function rendreModif() {
    var mes = produitsData.map(function(p,i){ return {p:p,idx:i}; }).filter(function(o){ return o.p.artisanId === MON_ARTISAN_ID; });
    document.getElementById('nbModif').textContent = mes.length;
    var tb = document.getElementById('modifBody');
    if (!mes.length) { tb.innerHTML = '<tr class="empty-row"><td colspan="7">Aucun produit disponible.</td></tr>'; return; }
    tb.innerHTML = mes.map(function(o) {
      var p = o.p, idx = o.idx;
      var stockCel = p.stock === 0 ? '<span class="stock-badge stock-out">Rupture</span>' : p.stock;
      return '<tr>'
        + '<td>' + p.id + '</td>'
        + '<td>' + p.titre + '</td>'
        + '<td>' + (CATS[p.categorie] || p.categorie) + '</td>'
        + '<td><strong>' + p.prix.toFixed(2) + ' DT</strong></td>'
        + '<td>' + stockCel + '</td>'
        + '<td>' + p.artisan + '</td>'
        + '<td><div class="tbl-actions">'
        +   '<button class="tbl-btn tbl-btn-edit" onclick="ouvrirModifProduit(' + idx + ')">Modifier</button>'
        +   '<button class="tbl-btn tbl-btn-del"  onclick="supprimerProduit('  + idx + ')">Supprimer</button>'
        + '</div></td></tr>';
    }).join('');
  }

  // ===== POPUP FORMS =====
  function ouvrirFormulaire(id)  { document.getElementById(id).classList.add('active');    document.body.style.overflow = 'hidden'; }
  function fermerFormulaire(id)  { document.getElementById(id).classList.remove('active'); document.body.style.overflow = ''; }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { fermerFormulaire('form-ajout'); fermerFormulaire('form-modif'); }
  });
  ['form-ajout','form-modif'].forEach(function(id) {
    document.getElementById(id).addEventListener('click', function(e) { if (e.target === this) fermerFormulaire(id); });
  });

  // ===== OPEN AJOUT =====
  function ouvrirFormulaireAjout() {
    document.getElementById('formAjouter').reset();
    document.getElementById('fa_id').value = 'PROD-2026-' + String(produitsData.length + 1).padStart(3, '0');
    ['fa_titre','fa_description','fa_categorie','fa_materiaux','fa_prix','fa_stock'].forEach(function(id) {
      document.getElementById(id).classList.remove('invalid','valid');
    });
    ['fa_err_titre','fa_err_description','fa_err_categorie','fa_err_materiaux','fa_err_prix','fa_err_stock','fa_err_photos'].forEach(function(id) {
      document.getElementById(id).style.display = 'none';
    });
    document.getElementById('fa_cnt_titre').textContent = '0 / 100 caractères';
    document.getElementById('fa_cnt_desc').textContent  = '0 / 1000 caractères';
    document.getElementById('fa_preview').innerHTML = '';
    ouvrirFormulaire('form-ajout');
  }

  // ===== OPEN MODIF =====
  function ouvrirModifProduit(idx) {
    var p = produitsData[idx];
    document.getElementById('fm_idx').value          = idx;
    document.getElementById('fm_id').value           = p.id;
    document.getElementById('fm_titre').value        = p.titre;
    document.getElementById('fm_cnt_titre').textContent = p.titre.length + ' / 100 caractères';
    document.getElementById('fm_sous_titre').value   = p.sous_titre || '';
    document.getElementById('fm_description').value  = p.description;
    document.getElementById('fm_cnt_desc').textContent  = p.description.length + ' / 1000 caractères';
    document.getElementById('fm_categorie').value    = p.categorie;
    document.getElementById('fm_materiaux').value    = p.materiaux;
    document.getElementById('fm_origine').value      = p.origine || '';
    document.getElementById('fm_long').value         = p.long || '';
    document.getElementById('fm_larg').value         = p.larg || '';
    document.getElementById('fm_haut').value         = p.haut || '';
    document.getElementById('fm_poids').value        = p.poids || '';
    document.getElementById('fm_couleur').value      = p.couleur || '';
    document.getElementById('fm_prix').value         = p.prix;
    document.getElementById('fm_stock').value        = p.stock;
    document.getElementById('fm_main').checked       = (p.labels||[]).indexOf('fait_main')   > -1;
    document.getElementById('fm_eco').checked        = (p.labels||[]).indexOf('ecologique')  > -1;
    document.getElementById('fm_recycle').checked    = (p.labels||[]).indexOf('recyclable')  > -1;
    document.getElementById('fm_local').checked      = (p.labels||[]).indexOf('local')       > -1;
    ['fm_titre','fm_description','fm_categorie','fm_materiaux','fm_prix','fm_stock'].forEach(function(id) {
      document.getElementById(id).classList.remove('invalid','valid');
    });
    ['fm_err_titre','fm_err_description','fm_err_categorie','fm_err_materiaux','fm_err_prix','fm_err_stock'].forEach(function(id) {
      document.getElementById(id).style.display = 'none';
    });
    ouvrirFormulaire('form-modif');
  }

  // ===== UTILS VALIDATION =====
  function fa_compteur(champId, cntId, max) {
    var l = document.getElementById(champId).value.length;
    var c = document.getElementById(cntId);
    c.textContent = l + ' / ' + max + ' caractères';
    c.style.color = l > max * 0.9 ? '#E74C3C' : '#999';
  }
  function setErr(id, errId, msg) {
    document.getElementById(id).classList.add('invalid'); document.getElementById(id).classList.remove('valid');
    document.getElementById(errId).textContent = msg; document.getElementById(errId).style.display = 'block';
  }
  function setOk(id, errId) {
    document.getElementById(id).classList.remove('invalid'); document.getElementById(id).classList.add('valid');
    document.getElementById(errId).style.display = 'none';
  }
  function fa_validerTitre()      { var v=document.getElementById('fa_titre').value; if(!v.trim()){setErr('fa_titre','fa_err_titre','Le titre est obligatoire.');return false;} if(v.length<5){setErr('fa_titre','fa_err_titre','Min 5 caractères.');return false;} if(v.length>100){setErr('fa_titre','fa_err_titre','Max 100 caractères.');return false;} setOk('fa_titre','fa_err_titre');return true; }
  function fa_validerDescription(){ var v=document.getElementById('fa_description').value; if(!v.trim()){setErr('fa_description','fa_err_description','La description est obligatoire.');return false;} if(v.length<30){setErr('fa_description','fa_err_description','Min 30 caractères.');return false;} setOk('fa_description','fa_err_description');return true; }
  function fa_validerCategorie()  { var v=document.getElementById('fa_categorie').value; if(!v){setErr('fa_categorie','fa_err_categorie','Veuillez sélectionner une catégorie.');return false;} setOk('fa_categorie','fa_err_categorie');return true; }
  function fa_validerMateriaux()  { var v=document.getElementById('fa_materiaux').value; if(!v.trim()){setErr('fa_materiaux','fa_err_materiaux','Les matériaux sont obligatoires.');return false;} if(v.length<3){setErr('fa_materiaux','fa_err_materiaux','Min 3 caractères.');return false;} setOk('fa_materiaux','fa_err_materiaux');return true; }
  function fa_validerPrix()       { var c=document.getElementById('fa_prix'); var v=parseFloat(c.value); if(!c.value){setErr('fa_prix','fa_err_prix','Le prix est obligatoire.');return false;} if(isNaN(v)||v<=0){setErr('fa_prix','fa_err_prix','Le prix doit être positif.');return false;} if(v>100000){setErr('fa_prix','fa_err_prix','Prix trop élevé.');return false;} setOk('fa_prix','fa_err_prix');return true; }
  function fa_validerStock()      { var c=document.getElementById('fa_stock'); var v=parseInt(c.value); if(c.value===''){setErr('fa_stock','fa_err_stock','Le stock est obligatoire.');return false;} if(isNaN(v)||v<0){setErr('fa_stock','fa_err_stock','Stock ≥ 0 requis.');return false;} setOk('fa_stock','fa_err_stock');return true; }
  function fa_validerPhotos()     { var c=document.getElementById('fa_photos'); var f=c.files; var types=['image/jpeg','image/png','image/webp']; var maxS=5*1024*1024; if(!f.length){setErr('fa_photos','fa_err_photos','Ajoutez au moins 1 photo.');return false;} if(f.length>5){setErr('fa_photos','fa_err_photos','Max 5 photos.');return false;} for(var i=0;i<f.length;i++){if(types.indexOf(f[i].type)<0){setErr('fa_photos','fa_err_photos','Format non autorisé (JPG/PNG/WEBP).');return false;} if(f[i].size>maxS){setErr('fa_photos','fa_err_photos','Image "'+f[i].name+'" dépasse 5MB.');return false;}} setOk('fa_photos','fa_err_photos');return true; }
  function fm_validerTitre()      { var v=document.getElementById('fm_titre').value; if(!v.trim()){setErr('fm_titre','fm_err_titre','Obligatoire.');return false;} if(v.length<5){setErr('fm_titre','fm_err_titre','Min 5 caractères.');return false;} setOk('fm_titre','fm_err_titre');return true; }
  function fm_validerDescription(){ var v=document.getElementById('fm_description').value; if(!v.trim()){setErr('fm_description','fm_err_description','Obligatoire.');return false;} if(v.length<30){setErr('fm_description','fm_err_description','Min 30 caractères.');return false;} setOk('fm_description','fm_err_description');return true; }
  function fm_validerCategorie()  { var v=document.getElementById('fm_categorie').value; if(!v){setErr('fm_categorie','fm_err_categorie','Sélectionnez une catégorie.');return false;} setOk('fm_categorie','fm_err_categorie');return true; }
  function fm_validerMateriaux()  { var v=document.getElementById('fm_materiaux').value; if(!v.trim()){setErr('fm_materiaux','fm_err_materiaux','Obligatoire.');return false;} if(v.length<3){setErr('fm_materiaux','fm_err_materiaux','Min 3 caractères.');return false;} setOk('fm_materiaux','fm_err_materiaux');return true; }
  function fm_validerPrix()       { var c=document.getElementById('fm_prix'); var v=parseFloat(c.value); if(!c.value){setErr('fm_prix','fm_err_prix','Obligatoire.');return false;} if(isNaN(v)||v<=0){setErr('fm_prix','fm_err_prix','Prix positif requis.');return false;} setOk('fm_prix','fm_err_prix');return true; }
  function fm_validerStock()      { var c=document.getElementById('fm_stock'); var v=parseInt(c.value); if(c.value===''){setErr('fm_stock','fm_err_stock','Obligatoire.');return false;} if(isNaN(v)||v<0){setErr('fm_stock','fm_err_stock','Stock ≥ 0.');return false;} setOk('fm_stock','fm_err_stock');return true; }

  // ===== IMAGE PREVIEW =====
  function previewImages(inputId, previewId) {
    var files = document.getElementById(inputId).files;
    var container = document.getElementById(previewId);
    container.innerHTML = '';
    for (var i = 0; i < files.length && i < 5; i++) {
      var url = URL.createObjectURL(files[i]);
      var img = document.createElement('img');
      img.src = url; container.appendChild(img);
    }
  }

  // ===== SUBMIT AJOUT =====
  function soumettreAjout(e) {
    e.preventDefault();
    var ok = fa_validerTitre() & fa_validerDescription() & fa_validerCategorie() & fa_validerMateriaux() & fa_validerPrix() & fa_validerStock() & fa_validerPhotos();
    if (!ok) { alert('Veuillez corriger les erreurs avant de soumettre.'); return; }
    var cat = document.getElementById('fa_categorie').value;
    var now = new Date();
    var d = now.getDate().toString().padStart(2,'0') + '/' + (now.getMonth()+1).toString().padStart(2,'0') + '/' + now.getFullYear();
    var labels = [];
    if (document.getElementById('fa_main').checked)   labels.push('fait_main');
    if (document.getElementById('fa_eco').checked)    labels.push('ecologique');
    if (document.getElementById('fa_recycle').checked)labels.push('recyclable');
    if (document.getElementById('fa_local').checked)  labels.push('local');
    produitsData.push({
      id:         document.getElementById('fa_id').value,
      titre:      document.getElementById('fa_titre').value.trim(),
      sous_titre: document.getElementById('fa_sous_titre').value.trim(),
      description:document.getElementById('fa_description').value.trim(),
      categorie:  cat,
      materiaux:  document.getElementById('fa_materiaux').value.trim(),
      origine:    document.getElementById('fa_origine').value,
      couleur:    document.getElementById('fa_couleur').value.trim(),
      long:       document.getElementById('fa_long').value,
      larg:       document.getElementById('fa_larg').value,
      haut:       document.getElementById('fa_haut').value,
      poids:      document.getElementById('fa_poids').value,
      prix:       parseFloat(document.getElementById('fa_prix').value),
      stock:      parseInt(document.getElementById('fa_stock').value),
      artisan:    'Ahmed Ben Salem', artisanId: '1',
      date:       d, emoji: EMOJIS[cat] || '&#10024;', labels: labels
    });
    rendreGrille(produitsData); rendreHistorique();
    fermerFormulaire('form-ajout');
    alert('Produit publié avec succès !');
  }

  // ===== SUBMIT MODIF =====
  function soumettreModif(e) {
    e.preventDefault();
    var ok = fm_validerTitre() & fm_validerDescription() & fm_validerCategorie() & fm_validerMateriaux() & fm_validerPrix() & fm_validerStock();
    if (!ok) { alert('Veuillez corriger les erreurs avant de soumettre.'); return; }
    var idx = parseInt(document.getElementById('fm_idx').value);
    var cat = document.getElementById('fm_categorie').value;
    var labels = [];
    if (document.getElementById('fm_main').checked)   labels.push('fait_main');
    if (document.getElementById('fm_eco').checked)    labels.push('ecologique');
    if (document.getElementById('fm_recycle').checked)labels.push('recyclable');
    if (document.getElementById('fm_local').checked)  labels.push('local');
    var p = produitsData[idx];
    p.titre       = document.getElementById('fm_titre').value.trim();
    p.sous_titre  = document.getElementById('fm_sous_titre').value.trim();
    p.description = document.getElementById('fm_description').value.trim();
    p.categorie   = cat;
    p.materiaux   = document.getElementById('fm_materiaux').value.trim();
    p.origine     = document.getElementById('fm_origine').value;
    p.couleur     = document.getElementById('fm_couleur').value.trim();
    p.long        = document.getElementById('fm_long').value;
    p.larg        = document.getElementById('fm_larg').value;
    p.haut        = document.getElementById('fm_haut').value;
    p.poids       = document.getElementById('fm_poids').value;
    p.prix        = parseFloat(document.getElementById('fm_prix').value);
    p.stock       = parseInt(document.getElementById('fm_stock').value);
    p.emoji       = EMOJIS[cat] || '&#10024;';
    p.labels      = labels;
    rendreGrille(produitsData); rendreModif();
    fermerFormulaire('form-modif');
    alert('Produit modifié avec succès !');
  }

  // ===== SUPPRIMER =====
  function supprimerProduit(idx) {
    var p = produitsData[idx];
    if (!confirm('Supprimer "' + p.titre + '" ?')) return;
    produitsData.splice(idx, 1);
    rendreGrille(produitsData); rendreModif(); rendreHistorique();
    alert('Produit supprimé.');
  }

  // ===== PANIER =====
  function ajouterPanier(e, prodId) {
    e.stopPropagation();
    var prod = produitsData.find(function(p){ return p.id === prodId; });
    if (prod) alert('\u2705 "' + prod.titre + '" ajouté au panier !');
  }

