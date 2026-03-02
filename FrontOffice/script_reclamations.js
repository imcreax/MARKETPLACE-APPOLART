// ======================================================
// script_reclamations.js — Gestion des Réclamations (Front-Office)
// Appolart Marketplace
// ======================================================

var STORAGE_KEY = 'appolart_reclamations_admin';

var reclamationsDefaut = [
  { id:'RCL-001', user:'Sara Mansouri',    email:'sara.m@email.com',    objet:'produit',       objetLabel:'Produit défectueux',  urgence:'haute',   description:"J'ai reçu mon produit avec un défaut d'emballage. Je souhaite un échange.", date:'12 jan. 2026', statut:'done',    reponse:"Remplacement lancé + bon d'avoir 15%.", dateReponse:'14 jan. 2026', decision:'acceptee' },
  { id:'RCL-002', user:'Mohamed Karim',    email:'mk.karim@email.com',  objet:'livraison',     objetLabel:'Livraison',           urgence:'moyenne', description:"Ma commande n'est pas arrivée après 18 jours alors que le délai était 10 jours.", date:'28 jan. 2026', statut:'pending', reponse:null, dateReponse:null, decision:null },
  { id:'RCL-003', user:'Fatma Ben Youssef',email:'fatma.by@email.com',  objet:'vendeur',       objetLabel:'Vendeur',             urgence:'faible',  description:"Le vendeur n'a pas répondu à mes messages depuis 2 semaines.", date:'5 fév. 2026',  statut:'done',    reponse:"Vendeur contacté. Réponse sous 48h.", dateReponse:'7 fév. 2026',  decision:'acceptee' },
  { id:'RCL-004', user:'Amine Trabelsi',   email:'a.trabelsi@email.com',objet:'remboursement', objetLabel:'Remboursement',       urgence:'haute',   description:"J'ai annulé ma commande il y a 15 jours sans remboursement.", date:'10 fév. 2026', statut:'pending', reponse:null, dateReponse:null, decision:null },
  { id:'RCL-005', user:'Nadia Chaabane',   email:'n.chaabane@email.com',objet:'paiement',      objetLabel:'Paiement',            urgence:'moyenne', description:"Ma carte a été débitée deux fois pour la même commande.", date:'18 fév. 2026', statut:'done',    reponse:"Double facturation constatée. Remboursement sous 3-5 jours.", dateReponse:'20 fév. 2026', decision:'acceptee' }
];

function chargerRecl() {
  try { var s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : reclamationsDefaut; }
  catch(e) { return reclamationsDefaut; }
}
function sauvegarderRecl(data) {
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

// ======================================================
// PAGE : mesreclamations.html — TABLEAU
// ======================================================
function renderReclTable() {
  var tbody = document.getElementById('tbodyRecl');
  if (!tbody) return;
  var data = chargerRecl();
  tbody.innerHTML = '';
  data.forEach(function(r) {
    var urgIcon = r.urgence === 'haute' ? '🔴' : (r.urgence === 'moyenne' ? '🟡' : '🟢');
    var badge = r.statut === 'done'
      ? '<span class="badge-answered">&#10004; Répondu</span>'
      : '<span class="badge-pending">&#8987; En attente</span>';
    var reponseCell = r.reponse
      ? '<div class="reponse-cell"><div class="resp-label">Réponse admin</div>' + r.reponse + '</div>'
      : '<div class="attente-cell">&#8987; En attente de réponse...</div>';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="td-id">' + r.id + '</td>' +
      '<td>' + r.objetLabel + '</td>' +
      '<td>' + (r.ref || '—') + '</td>' +
      '<td>' + urgIcon + ' ' + r.urgence.charAt(0).toUpperCase() + r.urgence.slice(1) + '</td>' +
      '<td>' + r.date + '</td>' +
      '<td>' + badge + '</td>' +
      '<td>' + reponseCell + '</td>' +
      '<td><button class="btn-voir" onclick="ouvrirDetailFront(\'' + r.id + '\')">&#128203; Voir</button></td>';
    tbody.appendChild(tr);
  });
  var tc = document.getElementById('tableCount');
  if (tc) tc.textContent = data.length + ' réclamation' + (data.length > 1 ? 's' : '');
}

function ouvrirDetailFront(id) {
  var all = chargerRecl();
  var r = all.find(function(x){ return x.id === id; });
  if (!r) return;
  var dec = { acceptee:'✅ Acceptée', partielle:'🔶 Partiellement acceptée', rejetee:'❌ Rejetée', info:'ℹ️ Infos demandées', cloturee:'📁 Clôturée' };
  var html = '<p><strong>ID :</strong> ' + r.id + '</p>' +
    '<p><strong>Objet :</strong> ' + r.objetLabel + '</p>' +
    '<p><strong>Urgence :</strong> ' + r.urgence + ' | <strong>Date :</strong> ' + r.date + '</p>' +
    '<hr style="margin:12px 0;border:1px solid #eee;">' +
    '<p><strong>Description :</strong></p><p style="color:#555;margin-top:6px;">' + r.description + '</p>';
  if (r.reponse) {
    html += '<hr style="margin:12px 0;border:1px solid #eee;"><p><strong>Réponse admin :</strong></p>' +
      '<div style="background:#f0f9f0;border-left:3px solid #4caf50;padding:10px;border-radius:6px;margin-top:6px;color:#2e7d32;">' +
      r.reponse + '</div>' +
      '<p style="font-size:12px;color:#aaa;margin-top:6px;">Le ' + r.dateReponse + (r.decision ? ' — ' + (dec[r.decision]||r.decision) : '') + '</p>';
  }
  document.getElementById('detailContent').innerHTML = html;
  document.getElementById('modalDetail').classList.add('active');
}

// ======================================================
// PAGE : ajouter_reclamations.html — FORMULAIRE AJOUT
// ======================================================
function initAjouterReclamation() {
  var form = document.getElementById('reclamationForm');
  if (!form) return;

  // Compteur description
  var descField = document.getElementById('reclDesc');
  if (descField) {
    descField.addEventListener('keyup', function() {
      var len = this.value.trim().length;
      var c = document.getElementById('counterDesc');
      if (c) { c.textContent = len + ' / 20 min'; c.classList[len < 20 ? 'add' : 'remove']('warn'); }
      if (len >= 20) { showError('errDesc', false); setInvalid('reclDesc', false); }
    });
  }

  // Validation live autres champs
  var idField = document.getElementById('reclId');
  if (idField) {
    idField.addEventListener('keyup', function() {
      if (/^RCL-[0-9]{3}$/.test(this.value.trim())) { showError('errId', false); setInvalid('reclId', false); }
    });
  }
  var objetSel = document.getElementById('reclObjet');
  if (objetSel) objetSel.addEventListener('change', function(){ if(this.value){ showError('errObjet',false); setInvalid('reclObjet',false); } });
  var refField = document.getElementById('reclRef');
  if (refField) refField.addEventListener('keyup', function(){ if(this.value.trim().length >= 5){ showError('errRef',false); setInvalid('reclRef',false); } });
  var contactField = document.getElementById('reclContact');
  if (contactField) {
    contactField.addEventListener('keyup', function() {
      var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var phoneReg = /^\+?[\d\s]{8,15}$/;
      if (emailReg.test(this.value) || phoneReg.test(this.value)) { showError('errContact', false); setInvalid('reclContact', false); }
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var idVal      = document.getElementById('reclId').value.trim();
    var objetVal   = document.getElementById('reclObjet').value;
    var refVal     = document.getElementById('reclRef').value.trim();
    var urgence    = document.querySelector('input[name="urgence"]:checked');
    var desc       = document.getElementById('reclDesc').value;
    var contact    = document.getElementById('reclContact').value.trim();
    var emailReg   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneReg   = /^\+?[\d\s]{8,15}$/;
    var valide     = true;

    if (!/^RCL-[0-9]{3}$/.test(idVal))  { showError('errId',true);      setInvalid('reclId',true);      valide = false; }
    if (!objetVal)                        { showError('errObjet',true);   setInvalid('reclObjet',true);   valide = false; }
    if (refVal.length < 5)               { showError('errRef',true);     setInvalid('reclRef',true);     valide = false; }
    if (!urgence)                         { showError('errUrgence',true);                                 valide = false; }
    if (desc.trim().length < 20)         { showError('errDesc',true);    setInvalid('reclDesc',true);    valide = false; }
    if (!emailReg.test(contact) && !phoneReg.test(contact)) { showError('errContact',true); setInvalid('reclContact',true); valide = false; }

    if (!valide) {
      alert("Erreur : veuillez corriger les champs signalés.");
      return;
    }

    // Vérifier ID unique
    var all = chargerRecl();
    if (all.find(function(r){ return r.id === idVal; })) {
      alert("Cet identifiant " + idVal + " existe déjà. Veuillez choisir un autre ID.");
      setInvalid('reclId', true);
      return;
    }

    var confirme = confirm("Souhaitez-vous soumettre cette réclamation " + idVal + " ?");
    if (!confirme) return;

    var objetLabels = { livraison:'Livraison', produit:'Produit défectueux', vendeur:'Vendeur', remboursement:'Remboursement', paiement:'Paiement', autre:'Autre' };
    var today = new Date().toLocaleDateString('fr-FR', {day:'numeric', month:'short', year:'numeric'});
    all.push({
      id: idVal, user: 'Moi', email: contact,
      objet: objetVal, objetLabel: objetLabels[objetVal] || objetVal,
      ref: refVal, urgence: urgence.value,
      description: desc.trim(), date: today,
      statut: 'pending', reponse: null, dateReponse: null, decision: null
    });
    sauvegarderRecl(all);
    alert("Réclamation " + idVal + " soumise avec succès !");
    window.location.href = 'mesreclamations.html';
  });
}

// ======================================================
// INITIALISATION
// ======================================================
window.onload = function() {
  renderReclTable();
  initAjouterReclamation();
  // Fermer modal en cliquant outside
  var md = document.getElementById('modalDetail');
  if (md) md.addEventListener('click', function(e){ if(e.target===md) md.classList.remove('active'); });
  console.log("Interface Réclamations Front Appolart prête.");
};