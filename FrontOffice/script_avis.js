// ======================================================
// script_avis.js — Gestion des Avis (Front-Office)
// Appolart Marketplace
// ======================================================

// Données partagées via localStorage pour simuler la persistance
var STORAGE_KEY = 'appolart_avis';

var avisDefaut = [
  { produit:'Vase artisanal bleu',      ref:'12500', note:5, titre:'Magnifique produit !',          commentaire:'Qualité exceptionnelle, correspond parfaitement aux photos. Livraison rapide et emballage très soigné. Je le recommande vivement à tous les amateurs d\'artisanat.', recommande:'oui', date:'15 jan. 2026' },
  { produit:'Sac en cuir vintage',      ref:'12450', note:4, titre:'Très beau sac, qualité solide', commentaire:'Le sac est vraiment magnifique, le cuir sent bon et la finition est soignée. Une petite couture légèrement de travers sinon parfait. Très satisfait de mon achat.', recommande:'oui', date:'8 jan. 2026'  },
  { produit:'Assiettes artisanales',    ref:'12390', note:5, titre:'Un vrai coup de cœur !',        commentaire:'Ces assiettes sont splendides sur ma table. Chaque pièce est unique et peinte à la main. L\'artisan a fait un travail remarquable, la qualité est au rendez-vous.', recommande:'oui', date:'28 déc. 2025' },
  { produit:'Couverture en laine',      ref:'12289', note:4, titre:'Très belle couverture',         commentaire:'Douce et chaude, idéale pour l\'hiver. Légèrement différente de la photo en termes de teinte mais globalement très satisfait de ce bel achat artisanal.', recommande:'oui', date:'5 déc. 2025'  },
  { produit:'Collier artisanal argent', ref:'12100', note:2, titre:'Déçu par la qualité',           commentaire:'Le produit ne correspond pas à la description sur le site. La finition laisse vraiment à désirer et l\'argent semble de mauvaise qualité. Je ne recommande pas.', recommande:'non', date:'18 nov. 2025' }
];

// Charger ou initialiser les données
function chargerAvis() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : avisDefaut;
  } catch(e) {
    return avisDefaut;
  }
}

function sauvegarderAvis(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

// ======================================================
// UTILITAIRES
// ======================================================
function showError(id, show) {
  var el = document.getElementById(id);
  if (el) el.classList[show ? 'add' : 'remove']('show');
}
function setInvalid(id, invalid) {
  var el = document.getElementById(id);
  if (el) el.classList[invalid ? 'add' : 'remove']('invalid');
}
function starsHtml(n) {
  var s = '';
  for (var i = 1; i <= 5; i++) s += i <= n ? '★' : '☆';
  return s;
}
function showToast(msg, color) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.background = color || '#2e7d32';
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 3500);
}

// ======================================================
// PAGE : avis.html — TABLEAU
// ======================================================
function renderTable() {
  var tbody = document.getElementById('tbodyAvis');
  if (!tbody) return;
  var avisData = chargerAvis();
  tbody.innerHTML = '';
  avisData.forEach(function(a, i) {
    var badge = a.recommande === 'oui'
      ? '<span class="badge-recommande">&#10003; Recommandé</span>'
      : '<span class="badge-non-recommande">&#10007; Non recommandé</span>';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><div class="td-produit">' + a.produit + '</div><div class="td-ref">Commande #' + a.ref + '</div></td>' +
      '<td class="td-stars">' + starsHtml(a.note) + '</td>' +
      '<td>' + a.titre + '</td>' +
      '<td class="td-commentaire">' + a.commentaire + '</td>' +
      '<td>' + badge + '</td>' +
      '<td>' + a.date + '</td>' +
      '<td><a href="modifier_avis.html?index=' + i + '" class="btn-modifier">&#9998; Modifier</a></td>';
    tbody.appendChild(tr);
  });
  var tc = document.getElementById('tableCount');
  if (tc) tc.textContent = avisData.length + ' avis';
}

// ======================================================
// PAGE : ajouter_avis.html — FORMULAIRE AJOUT
// ======================================================
function initAjouterAvis() {
  var form = document.getElementById('avisForm');
  if (!form) return;

  // Compteur commentaire
  var commField = document.getElementById('avCommentaire');
  if (commField) {
    commField.addEventListener('keyup', function() {
      var len = this.value.trim().length;
      var c = document.getElementById('counterComm');
      if (c) { c.textContent = len + ' / 20 min'; c.classList[len < 20 ? 'add' : 'remove']('warn'); }
      if (len >= 20) { showError('errComm', false); setInvalid('avCommentaire', false); }
    });
  }
  var titreField = document.getElementById('avTitre');
  if (titreField) titreField.addEventListener('keyup', function(){ if(this.value.trim().length >= 5){ showError('errTitre',false); setInvalid('avTitre',false); } });
  var produitSel = document.getElementById('avProduit');
  if (produitSel) produitSel.addEventListener('change', function(){ if(this.value){ showError('errProduit',false); setInvalid('avProduit',false); } });
  var recSel = document.getElementById('avRecommande');
  if (recSel) recSel.addEventListener('change', function(){ if(this.value){ showError('errRec',false); setInvalid('avRecommande',false); } });

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi automatique

    var produitVal  = document.getElementById('avProduit').value;
    var note        = document.querySelector('input[name="note"]:checked');
    var titre       = document.getElementById('avTitre').value.trim();
    var commentaire = document.getElementById('avCommentaire').value;
    var recommande  = document.getElementById('avRecommande').value;
    var valide = true;

    if (!produitVal)             { showError('errProduit',true); setInvalid('avProduit',true);     valide = false; }
    if (!note)                   { showError('errNote',true);                                       valide = false; }
    if (titre.length < 5)        { showError('errTitre',true); setInvalid('avTitre',true);         valide = false; }
    if (commentaire.trim().length < 20) { showError('errComm',true); setInvalid('avCommentaire',true); valide = false; }
    if (!recommande)             { showError('errRec',true); setInvalid('avRecommande',true);      valide = false; }

    if (!valide) {
      alert("Erreur : veuillez corriger les champs signalés avant de publier votre avis.");
      return;
    }

    // Confirmation avant envoi
    var produitNom = produitVal.split('|')[0];
    var confirme = confirm("Souhaitez-vous vraiment publier votre avis sur \"" + produitNom + "\" ?");
    if (!confirme) {
      console.log("Publication annulée par l'utilisateur.");
      return;
    }

    var parts = produitVal.split('|');
    var today = new Date().toLocaleDateString('fr-FR', {day:'numeric', month:'short', year:'numeric'});
    var avisData = chargerAvis();
    avisData.unshift({ produit:parts[0], ref:parts[1]||'—', note:parseInt(note.value), titre:titre, commentaire:commentaire.trim(), recommande:recommande, date:today });
    sauvegarderAvis(avisData);

    alert("Succès ! Votre avis a été publié sur Appolart.");
    window.location.href = 'avis.html';
  });
}

// ======================================================
// PAGE : modifier_avis.html — FORMULAIRE MODIFICATION
// ======================================================
function initModifierAvis() {
  var form = document.getElementById('modifierAvisForm');
  if (!form) return;

  // Récupérer l'index depuis l'URL
  var params = new URLSearchParams(window.location.search);
  var index = parseInt(params.get('index'));
  var avisData = chargerAvis();

  if (isNaN(index) || !avisData[index]) {
    alert("Erreur : avis introuvable.");
    window.location.href = 'avis.html';
    return;
  }

  var a = avisData[index];
  document.getElementById('modProduit').value    = a.produit + ' (Commande #' + a.ref + ')';
  document.getElementById('modTitre').value      = a.titre;
  document.getElementById('modCommentaire').value= a.commentaire;
  document.getElementById('modRecommande').value = a.recommande;
  document.getElementById('modIndex').value      = index;
  var si = document.getElementById('mStar' + a.note);
  if (si) si.checked = true;
  var cc = document.getElementById('counterModComm');
  if (cc) { cc.textContent = a.commentaire.length + ' / 20 min'; cc.classList[a.commentaire.length < 20 ? 'add' : 'remove']('warn'); }

  // Validation live
  var commField = document.getElementById('modCommentaire');
  if (commField) {
    commField.addEventListener('keyup', function() {
      var len = this.value.trim().length;
      var c = document.getElementById('counterModComm');
      if (c) { c.textContent = len + ' / 20 min'; c.classList[len < 20 ? 'add' : 'remove']('warn'); }
      if (len >= 20) { showError('errModComm', false); setInvalid('modCommentaire', false); }
    });
  }
  var titreField = document.getElementById('modTitre');
  if (titreField) titreField.addEventListener('keyup', function(){ if(this.value.trim().length >= 5){ showError('errModTitre',false); setInvalid('modTitre',false); } });

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi automatique

    var note       = document.querySelector('input[name="noteMod"]:checked');
    var titre      = document.getElementById('modTitre').value.trim();
    var commentaire= document.getElementById('modCommentaire').value;
    var recommande = document.getElementById('modRecommande').value;
    var valide = true;

    if (!note)                   { showError('errModNote',true);                                          valide = false; }
    if (titre.length < 5)        { showError('errModTitre',true); setInvalid('modTitre',true);           valide = false; }
    if (commentaire.trim().length < 20) { showError('errModComm',true); setInvalid('modCommentaire',true); valide = false; }
    if (!recommande)             { showError('errModRec',true); setInvalid('modRecommande',true);        valide = false; }

    if (!valide) {
      alert("Erreur : veuillez corriger les champs avant d'enregistrer.");
      return;
    }

    // Confirmation avant modification
    var confirme = confirm("Confirmer la modification de votre avis sur \"" + avisData[index].produit + "\" ?");
    if (!confirme) {
      console.log("Modification annulée par l'utilisateur.");
      return;
    }

    avisData[index].note        = parseInt(note.value);
    avisData[index].titre       = titre;
    avisData[index].commentaire = commentaire.trim();
    avisData[index].recommande  = recommande;
    sauvegarderAvis(avisData);

    alert("Votre avis a été modifié avec succès !");
    window.location.href = 'avis.html';
  });
}

// ======================================================
// INITIALISATION (event load du cours)
// ======================================================
window.onload = function() {
  renderTable();
  initAjouterAvis();
  initModifierAvis();
  console.log("Interface Avis Appolart prête.");
};