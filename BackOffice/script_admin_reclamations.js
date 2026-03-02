// ======================================================
// script_admin_reclamations.js — Gestion Admin (Back-Office)
// Appolart Marketplace
// ======================================================

var STORAGE_KEY      = 'appolart_reclamations_admin';
var STORAGE_KEY_AVIS = 'appolart_avis';

// ── Données réclamations par défaut ──────────────────
var reclamationsDefaut = [
  { id:'RCL-001', user:'Sara Mansouri',    email:'sara.m@email.com',    objet:'produit',       objetLabel:'Produit défectueux',  urgence:'haute',   description:"J'ai reçu mon produit avec un défaut d'emballage. Je souhaite un échange.", date:'12 jan. 2026', statut:'done',    reponse:"Remplacement lancé + bon d'avoir 15%.", dateReponse:'14 jan. 2026', decision:'acceptee' },
  { id:'RCL-002', user:'Mohamed Karim',    email:'mk.karim@email.com',  objet:'livraison',     objetLabel:'Livraison',           urgence:'moyenne', description:"Ma commande n'est pas arrivée après 18 jours alors que le délai était 10 jours.", date:'28 jan. 2026', statut:'pending', reponse:null, dateReponse:null, decision:null },
  { id:'RCL-003', user:'Fatma Ben Youssef',email:'fatma.by@email.com',  objet:'vendeur',       objetLabel:'Vendeur',             urgence:'faible',  description:"Le vendeur n'a pas répondu à mes messages depuis 2 semaines.", date:'5 fév. 2026',  statut:'done',    reponse:"Vendeur contacté. Réponse sous 48h.", dateReponse:'7 fév. 2026',  decision:'acceptee' },
  { id:'RCL-004', user:'Amine Trabelsi',   email:'a.trabelsi@email.com',objet:'remboursement', objetLabel:'Remboursement',       urgence:'haute',   description:"J'ai annulé ma commande il y a 15 jours sans remboursement.", date:'10 fév. 2026', statut:'pending', reponse:null, dateReponse:null, decision:null },
  { id:'RCL-005', user:'Nadia Chaabane',   email:'n.chaabane@email.com',objet:'paiement',      objetLabel:'Paiement',            urgence:'moyenne', description:"Ma carte a été débitée deux fois pour la même commande.", date:'18 fév. 2026', statut:'done',    reponse:"Double facturation constatée. Remboursement sous 3-5 jours.", dateReponse:'20 fév. 2026', decision:'acceptee' }
];

// ── Données avis par défaut ───────────────────────────
var avisDefaut = [
  { produit:'Vase artisanal bleu',      artisan:'selim louati',   ref:'12345', note:5, titre:'Magnifique produit !',   commentaire:'Qualité exceptionnelle, correspond aux photos. Livraison rapide et emballage soigné.', recommande:'oui', date:'12 jan. 2026' },
  { produit:'Couverture en laine',      artisan:'asma talbi',   ref:'12289', note:4, titre:'Très belle couverture',  commentaire:'Douce et chaude. Légèrement différente de la photo mais globalement satisfait.',      recommande:'oui', date:'5 déc. 2025'  },
  { produit:'Collier artisanal argent', artisan:'karim tounsi',  ref:'12100', note:2, titre:'Déçu par la qualité',    commentaire:'Le produit ne correspond pas à la description. La finition laisse à désirer.',         recommande:'non', date:'18 nov. 2025' },
  { produit:'Sac en cuir vintage',      artisan:'asala nasri',  ref:'12450', note:5, titre:'Excellent travail !',    commentaire:'Cuir magnifique, coutures parfaites. Je recommande vivement cet artisan.',              recommande:'oui', date:'2 fév. 2026'  },
  { produit:'Assiettes artisanales',    artisan:'lina mejri', ref:'12390', note:3, titre:'Correct mais perfectible', commentaire:'Les couleurs sont moins vives que sur les photos. La qualité reste acceptable.',   recommande:'non', date:'14 jan. 2026' }
];

var filtreActif = 'all';

function chargerRecl() {
  try { var s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : reclamationsDefaut; }
  catch(e) { return reclamationsDefaut; }
}
function sauvegarderRecl(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}
function chargerAvis() {
  try { var s = localStorage.getItem(STORAGE_KEY_AVIS); return s ? JSON.parse(s) : avisDefaut; }
  catch(e) { return avisDefaut; }
}

// ======================================================
// UTILITAIRES
// ======================================================
function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.className = 'toast ' + (type||'');
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 3500);
}
function capitaliser(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function starsHtml(n) {
  var s = '';
  for (var i=1; i<=5; i++) s += i<=n ? '★' : '☆';
  return s;
}

// ======================================================
// RENDU TABLEAU RÉCLAMATIONS (adminreclamtions.html)
// ======================================================
function renderTable(data) {
  var tbody = document.getElementById('tbody-reclamations');
  if (!tbody) return;
  var noResult   = document.getElementById('no-result');
  var tableCount = document.getElementById('table-count');
  tbody.innerHTML = '';
  if (data.length === 0) {
    if (noResult)   noResult.style.display = 'block';
    if (tableCount) tableCount.textContent = '0 réclamation';
    return;
  }
  if (noResult)   noResult.style.display = 'none';
  if (tableCount) tableCount.textContent = data.length + ' réclamation' + (data.length > 1 ? 's' : '');

  data.forEach(function(r) {
    var urgIcon = r.urgence === 'haute' ? '🔴' : (r.urgence === 'moyenne' ? '🟡' : '🟢');
    var urgClass = 'urgence-' + r.urgence;
    var badge = r.statut === 'done'
      ? '<span class="badge badge-done">&#10004; Répondu</span>'
      : '<span class="badge badge-pending">&#8987; En attente</span>';
    var actions = r.statut === 'pending'
    var actions = r.statut === 'pending'
      ? '<button class="btn-repondre" onclick="ouvrirModalRepondre(\'' + r.id + '\')">&#128203; Répondre</button>' +
        '<button class="btn-voir" onclick="ouvrirDetail(\'' + r.id + '\')">Voir</button>'
      : '<span class="deja-repondu">&#10004; Répondu</span>' +
        '<button class="btn-voir" onclick="ouvrirDetail(\'' + r.id + '\')">Voir</button>';
    var desc = r.description.length > 50 ? r.description.substring(0,50) + '…' : r.description;
    var tr = document.createElement('tr');
    tr.setAttribute('data-id', r.id);
    tr.innerHTML =
      '<td class="id-cell">' + r.id + '</td>' +
      '<td class="user-cell"><strong>' + r.user + '</strong><span>' + r.email + '</span></td>' +
      '<td>' + r.objetLabel + '</td>' +
      '<td><span class="' + urgClass + '">' + urgIcon + ' ' + capitaliser(r.urgence) + '</span></td>' +
      '<td><span class="desc-cell" title="' + r.description + '">' + desc + '</span></td>' +
      '<td>' + r.date + '</td>' +
      '<td>' + badge + '</td>' +
      '<td>' + actions + '</td>';
    tbody.appendChild(tr);
  });
  majStats();
}

function majStats() {
  var all = chargerRecl();
  var el;
  el = document.getElementById('stat-total');   if(el) el.textContent = all.length;
  el = document.getElementById('stat-pending'); if(el) el.textContent = all.filter(function(r){ return r.statut==='pending'; }).length;
  el = document.getElementById('stat-done');    if(el) el.textContent = all.filter(function(r){ return r.statut==='done'; }).length;
  el = document.getElementById('stat-urgent');  if(el) el.textContent = all.filter(function(r){ return r.urgence==='haute'; }).length;
  el = document.getElementById('badge-notif');  if(el) el.textContent = all.filter(function(r){ return r.statut==='pending'; }).length;
}

// ======================================================
// RECHERCHE ET FILTRES RÉCLAMATIONS
// ======================================================
function getFiltered() {
  var all   = chargerRecl();
  var id    = document.getElementById('s-id')     ? document.getElementById('s-id').value.trim().toUpperCase() : '';
  var user  = document.getElementById('s-user')   ? document.getElementById('s-user').value.trim().toLowerCase() : '';
  var objet = document.getElementById('s-objet')  ? document.getElementById('s-objet').value : '';
  var statut= document.getElementById('s-statut') ? document.getElementById('s-statut').value : '';
  return all.filter(function(r) {
    if (filtreActif !== 'all' && r.statut !== filtreActif) return false;
    if (id    && !r.id.includes(id))   return false;
    if (user  && !r.user.toLowerCase().includes(user) && !r.email.toLowerCase().includes(user)) return false;
    if (objet && r.objet !== objet)    return false;
    if (statut && r.statut !== statut) return false;
    return true;
  });
}

function rechercherReclamations() {
  var idVal   = document.getElementById('s-id') ? document.getElementById('s-id').value.trim() : '';
  var errId   = document.getElementById('err-s-id');
  var sIdFld  = document.getElementById('s-id');
  if (idVal && !/^RCL-\d{3,}$/i.test(idVal)) {
    if (sIdFld) sIdFld.classList.add('invalid');
    if (errId)  errId.classList.add('visible');
    return;
  } else {
    if (sIdFld) sIdFld.classList.remove('invalid');
    if (errId)  errId.classList.remove('visible');
  }
  var data   = getFiltered();
  renderTable(data);
  var banner = document.getElementById('result-banner');
  if (banner) {
    var hasFilter = idVal ||
      (document.getElementById('s-user')   && document.getElementById('s-user').value)   ||
      (document.getElementById('s-objet')  && document.getElementById('s-objet').value)  ||
      (document.getElementById('s-statut') && document.getElementById('s-statut').value);
    if (hasFilter) { banner.textContent = '🔍 ' + data.length + ' résultat(s).'; banner.classList.add('visible'); }
    else banner.classList.remove('visible');
  }
}

function resetRecherche() {
  ['s-id','s-user','s-objet','s-statut'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = '';
  });
  var si = document.getElementById('s-id');  if(si) si.classList.remove('invalid');
  var ei = document.getElementById('err-s-id'); if(ei) ei.classList.remove('visible');
  var b  = document.getElementById('result-banner'); if(b) b.classList.remove('visible');
  filtreActif = 'all';
  document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
  var pa = document.querySelector('.pill-all'); if(pa) pa.classList.add('active');
  renderTable(chargerRecl());
}

function filtrerPill(type, el) {
  filtreActif = type;
  document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
  el.classList.add('active');
  renderTable(getFiltered());
}

// ======================================================
// MODAL DÉTAIL RÉCLAMATION
// ======================================================
var decisionsLabels = { acceptee:'✅ Acceptée', partielle:'🔶 Partiellement acceptée', rejetee:'❌ Rejetée', info:'ℹ️ Infos demandées', cloturee:'📁 Clôturée' };

function ouvrirDetail(id) {
  var all = chargerRecl();
  var r   = all.find(function(x){ return x.id === id; });
  if (!r) return;
  document.getElementById('detail-id-title').textContent = r.id;
  var html =
    '<div class="modal-detail-section"><h4>Informations</h4>' +
    '<p><strong>Utilisateur :</strong> ' + r.user + ' — ' + r.email + '</p>' +
    '<p><strong>Objet :</strong> ' + r.objetLabel + ' | <strong>Urgence :</strong> ' + r.urgence + ' | <strong>Date :</strong> ' + r.date + '</p></div>' +
    '<div class="modal-detail-section"><h4>Description</h4><p>' + r.description + '</p></div>';
  if (r.reponse) {
    html += '<div class="modal-detail-section"><h4>Réponse administration</h4>' +
      '<div class="detail-response-box"><p>' + r.reponse + '</p>' +
      '<p style="margin-top:8px;font-size:12px;color:#888;">Répondu le ' + r.dateReponse + (r.decision ? ' — ' + (decisionsLabels[r.decision]||r.decision) : '') + '</p></div></div>';
  } else {
    html += '<div class="modal-detail-section"><h4>Réponse</h4><p style="color:#e8984e;font-style:italic;">⏳ En attente de réponse...</p></div>';
  }
  document.getElementById('detail-content').innerHTML = html;
  document.getElementById('modal-detail').classList.add('active');
}
function fermerModalDetail() {
  var m = document.getElementById('modal-detail');
  if (m) m.classList.remove('active');
}

// MODAL RÉPONDRE (utilisé dans adminreclamtions.html)
function ouvrirModalRepondre(id) {
  var all = chargerRecl();
  var r   = all.find(function(x){ return x.id === id; });
  if (!r) return;
  document.getElementById('modal-id').textContent      = r.id;
  document.getElementById('modal-user').textContent    = r.user;
  document.getElementById('modal-objet').textContent   = r.objetLabel;
  document.getElementById('modal-urgence').textContent = r.urgence;
  document.getElementById('modal-desc').textContent    = r.description;
  document.getElementById('hidden-recl-id').value      = r.id;
  document.getElementById('reponse-statut').value      = '';
  document.getElementById('reponse-texte').value       = '';
  var cc = document.getElementById('counter-reponse'); if(cc) cc.textContent = '0 / 20 min';
  document.getElementById('modal-repondre').classList.add('active');
}
function fermerModalRepondre() {
  var m = document.getElementById('modal-repondre');
  if (m) m.classList.remove('active');
}

function initFormRepondreModal() {
  var form = document.getElementById('form-reponse');
  if (!form) return;
  var texteField = document.getElementById('reponse-texte');
  if (texteField) {
    texteField.addEventListener('keyup', function() {
      var len = this.value.trim().length;
      var c = document.getElementById('counter-reponse');
      if (c) { c.textContent = len + ' / 20 min'; c.classList[len < 20 ? 'add' : 'remove']('warn'); }
      if (len >= 20) { this.classList.remove('invalid'); var e = document.getElementById('err-texte'); if(e) e.classList.remove('visible'); }
    });
  }
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var statut = document.getElementById('reponse-statut').value;
    var texte  = document.getElementById('reponse-texte').value;
    var valide = true;
    if (!statut) {
      document.getElementById('reponse-statut').classList.add('invalid');
      var es = document.getElementById('err-statut'); if(es) es.classList.add('visible');
      valide = false;
    }
    if (texte.trim().length < 20) {
      document.getElementById('reponse-texte').classList.add('invalid');
      var et = document.getElementById('err-texte'); if(et) et.classList.add('visible');
      valide = false;
    }
    if (!valide) { alert("Veuillez corriger les champs."); return; }

    var reclId  = document.getElementById('hidden-recl-id').value;
    var confirme = confirm("Envoyer la réponse à la réclamation " + reclId + " ?");
    if (!confirme) return;

    var all = chargerRecl();
    var idx = all.findIndex(function(x){ return x.id === reclId; });
    if (idx !== -1) {
      all[idx].statut      = 'done';
      all[idx].reponse     = texte.trim();
      all[idx].decision    = statut;
      all[idx].dateReponse = new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'short',year:'numeric'});
      sauvegarderRecl(all);
    }
    fermerModalRepondre();
    renderTable(chargerRecl());
    showToast('✅ Réponse envoyée pour ' + reclId, 'success');
  });
}

// ======================================================
// PAGE repondre_reclamation.html — FORMULAIRE PAGE ENTIÈRE
// ======================================================
function initRepondreReclamation() {
  var form = document.getElementById('reponseForm');
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var reclId = params.get('id');
  var all    = chargerRecl();
  var r      = all.find(function(x){ return x.id === reclId; });

  if (!r) {
    alert("Réclamation introuvable.");
    window.location.href = 'adminreclamtions.html';
    return;
  }

  document.getElementById('infoId').textContent      = r.id;
  document.getElementById('infoUser').textContent    = r.user + ' (' + r.email + ')';
  document.getElementById('infoObjet').textContent   = r.objetLabel;
  document.getElementById('infoUrgence').textContent = r.urgence;
  document.getElementById('infoDate').textContent    = r.date;
  document.getElementById('infoDesc').textContent    = r.description;
  document.getElementById('hiddenId').value          = r.id;

  var texteField = document.getElementById('reponseTexte');
  if (texteField) {
    texteField.addEventListener('keyup', function() {
      var len = this.value.trim().length;
      var c = document.getElementById('counterReponse');
      if (c) { c.textContent = len + ' / 20 min'; c.classList[len < 20 ? 'add' : 'remove']('warn'); }
      if (len >= 20) { this.classList.remove('invalid'); var e = document.getElementById('errTexte'); if(e) e.classList.remove('visible'); }
    });
  }
  var statutSel = document.getElementById('reponseStatut');
  if (statutSel) {
    statutSel.addEventListener('change', function() {
      if (this.value) { this.classList.remove('invalid'); var e = document.getElementById('errStatut'); if(e) e.classList.remove('visible'); }
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var statut = document.getElementById('reponseStatut').value;
    var texte  = document.getElementById('reponseTexte').value;
    var valide = true;
    if (!statut) {
      document.getElementById('reponseStatut').classList.add('invalid');
      var es = document.getElementById('errStatut'); if(es) es.classList.add('visible');
      valide = false;
    }
    if (texte.trim().length < 20) {
      document.getElementById('reponseTexte').classList.add('invalid');
      var et = document.getElementById('errTexte'); if(et) et.classList.add('visible');
      valide = false;
    }
    if (!valide) { alert("Veuillez corriger les champs."); return; }

    var confirme = confirm("Envoyer la réponse à la réclamation " + r.id + " ?");
    if (!confirme) return;

    var idx = all.findIndex(function(x){ return x.id === r.id; });
    if (idx !== -1) {
      all[idx].statut      = 'done';
      all[idx].reponse     = texte.trim();
      all[idx].decision    = statut;
      all[idx].dateReponse = new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'short',year:'numeric'});
      sauvegarderRecl(all);
    }
    alert("Réponse envoyée pour " + r.id + " !");
    window.location.href = 'adminreclamtions.html';
  });
}

// ======================================================
// PAGE admin_avis.html — TABLEAU AVIS AVEC FILTRES
// ======================================================
function renderAvisAdmin(data) {
  var tbody = document.getElementById('tbody-avis');
  if (!tbody) return;
  var noRes = document.getElementById('no-result-avis');
  var cnt   = document.getElementById('avis-count');
  tbody.innerHTML = '';
  if (data.length === 0) {
    if (noRes) noRes.style.display = 'block';
    if (cnt)   cnt.textContent = '0 avis';
    return;
  }
  if (noRes) noRes.style.display = 'none';
  if (cnt)   cnt.textContent = data.length + ' avis';

  data.forEach(function(a, i) {
    var badge = a.recommande === 'oui'
      ? '<span class="badge badge-done">&#10003; Recommandé</span>'
      : '<span class="badge badge-pending">&#10007; Non recommandé</span>';
    var stars = '<span style="color:#f5a623;font-size:16px;">' + starsHtml(a.note) + '</span>';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><strong>' + a.produit + '</strong><br><span style="font-size:12px;color:#aaa;">#' + a.ref + '</span></td>' +
      '<td>' + (a.artisan || '—') + '</td>' +
      '<td>' + stars + ' <span style="font-size:12px;color:#888;">(' + a.note + '/5)</span></td>' +
      '<td><strong>' + a.titre + '</strong></td>' +
      '<td style="max-width:200px;color:#666;font-size:13px;">' + a.commentaire + '</td>' +
      '<td>' + badge + '</td>' +
      '<td>' + a.date + '</td>' +
      '<td><button class="btn-voir" onclick="ouvrirDetailAvis(' + i + ')">Voir</button></td>';
    tbody.appendChild(tr);
  });
  majStatsAvis(data);
}

function majStatsAvis(data) {
  var all   = chargerAvis();
  var total = all.length;
  var moy   = total > 0 ? (all.reduce(function(s,a){ return s+a.note; }, 0) / total).toFixed(1) : 0;
  var pos   = all.filter(function(a){ return a.note >= 4; }).length;
  var neg   = all.filter(function(a){ return a.note <= 2; }).length;
  var el;
  el = document.getElementById('avis-stat-total'); if(el) el.textContent = total;
  el = document.getElementById('avis-stat-moy');   if(el) el.textContent = moy + ' ★';
  el = document.getElementById('avis-stat-pos');   if(el) el.textContent = pos;
  el = document.getElementById('avis-stat-neg');   if(el) el.textContent = neg;
}

function filtrerAvis() {
  var all       = chargerAvis();
  var artisan   = document.getElementById('f-artisan')  ? document.getElementById('f-artisan').value.trim().toLowerCase() : '';
  var produit   = document.getElementById('f-produit')  ? document.getElementById('f-produit').value.trim().toLowerCase() : '';
  var noteMin   = document.getElementById('f-note-min') ? parseInt(document.getElementById('f-note-min').value) || 0 : 0;
  var noteMax   = document.getElementById('f-note-max') ? parseInt(document.getElementById('f-note-max').value) || 5 : 5;
  var recomm    = document.getElementById('f-recomm')   ? document.getElementById('f-recomm').value : '';
  var filtered  = all.filter(function(a) {
    if (artisan && !(a.artisan||'').toLowerCase().includes(artisan) && !a.produit.toLowerCase().includes(artisan)) return false;
    if (produit && !a.produit.toLowerCase().includes(produit)) return false;
    if (a.note < noteMin || a.note > noteMax) return false;
    if (recomm && a.recommande !== recomm) return false;
    return true;
  });
  renderAvisAdmin(filtered);
}

function resetFiltresAvis() {
  ['f-artisan','f-produit','f-recomm'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  var nm = document.getElementById('f-note-min'); if(nm) nm.value = '1';
  var nx = document.getElementById('f-note-max'); if(nx) nx.value = '5';
  renderAvisAdmin(chargerAvis());
}

function ouvrirDetailAvis(index) {
  var all = chargerAvis();
  var a   = all[index];
  if (!a) return;
  var html =
    '<p><strong>Produit :</strong> ' + a.produit + ' (Commande #' + a.ref + ')</p>' +
    '<p><strong>Artisan :</strong> ' + (a.artisan||'—') + '</p>' +
    '<p><strong>Note :</strong> <span style="color:#f5a623;font-size:18px;">' + starsHtml(a.note) + '</span> (' + a.note + '/5)</p>' +
    '<p><strong>Titre :</strong> ' + a.titre + '</p>' +
    '<p><strong>Commentaire :</strong></p><p style="color:#555;margin-top:6px;line-height:1.6;">' + a.commentaire + '</p>' +
    '<p style="margin-top:10px;"><strong>Recommandation :</strong> ' + (a.recommande==='oui' ? '✅ Oui' : '❌ Non') + '</p>' +
    '<p><strong>Date :</strong> ' + a.date + '</p>';
  document.getElementById('detail-avis-content').innerHTML = html;
  document.getElementById('modal-avis-detail').classList.add('active');
}
function fermerModalAvisDetail() {
  var m = document.getElementById('modal-avis-detail');
  if (m) m.classList.remove('active');
}

// ======================================================
// INITIALISATION
// ======================================================
window.onload = function() {
  // PAGE adminreclamtions.html
  var tbody = document.getElementById('tbody-reclamations');
  if (tbody) {
    renderTable(chargerRecl());
    var sId = document.getElementById('s-id');
    if (sId) {
      sId.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') rechercherReclamations();
        var val = this.value.trim();
        if (!val || /^RCL-\d{3,}$/i.test(val)) {
          this.classList.remove('invalid');
          var ei = document.getElementById('err-s-id'); if(ei) ei.classList.remove('visible');
        }
      });
    }
    var md = document.getElementById('modal-detail');
    if (md) md.addEventListener('click', function(e){ if(e.target===md) fermerModalDetail(); });
    var mr = document.getElementById('modal-repondre');
    if (mr) mr.addEventListener('click', function(e){ if(e.target===mr) fermerModalRepondre(); });
    initFormRepondreModal();
  }

  // PAGE repondre_reclamation.html
  initRepondreReclamation();

  // PAGE admin_avis.html
  var tbodyAvis = document.getElementById('tbody-avis');
  if (tbodyAvis) {
    renderAvisAdmin(chargerAvis());
    var mad = document.getElementById('modal-avis-detail');
    if (mad) mad.addEventListener('click', function(e){ if(e.target===mad) fermerModalAvisDetail(); });
  }

  console.log("Dashboard Admin Appolart prêt.");
};