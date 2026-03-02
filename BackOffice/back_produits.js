
    // ===================================================
    // FONCTIONS COMMUNES
    // ===================================================

    // Compteur de caracteres (utilise par tous les formulaires)
    function mettreAJourCompteur(champId, compteurId, max) {
      var longueur = document.getElementById(champId).value.length;
      var compteur = document.getElementById(compteurId);
      compteur.textContent = longueur + " / " + max + " caracteres";
      if (longueur > max * 0.9) {
        compteur.style.color = "#dc3545";
      } else {
        compteur.style.color = "#999";
      }
    }

    // Afficher une erreur sur un champ
    function afficherErreur(champId, erreurId, message) {
      document.getElementById(champId).classList.add("invalid");
      document.getElementById(champId).classList.remove("valid");
      document.getElementById(erreurId).textContent = message;
      document.getElementById(erreurId).style.display = "block";
    }

    // Afficher un succes sur un champ
    function afficherSucces(champId, erreurId) {
      document.getElementById(champId).classList.remove("invalid");
      document.getElementById(champId).classList.add("valid");
      document.getElementById(erreurId).style.display = "none";
    }


    // ===================================================
    // ONGLETS
    // ===================================================

    function switchBackTab(tabName, btn) {
      // Desactiver tous les onglets
      document.getElementById("tab-validation").classList.remove("active");
      document.getElementById("tab-gestion").classList.remove("active");
      document.getElementById("tab-categorie").classList.remove("active");
      document.getElementById("tab-statistiques").classList.remove("active");

      // Cacher tous les contenus
      document.getElementById("back-validation").classList.remove("active");
      document.getElementById("back-gestion").classList.remove("active");
      document.getElementById("back-categorie").classList.remove("active");
      document.getElementById("back-statistiques").classList.remove("active");

      // Activer celui clique
      btn.classList.add("active");
      document.getElementById("back-" + tabName).classList.add("active");
    }


    // ===================================================
    // OVERLAYS
    // ===================================================

    function ouvrirOverlay(name) {
      document.getElementById("overlay-" + name).classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function fermerOverlay(name) {
      document.getElementById("overlay-" + name).classList.remove("active");
      document.body.style.overflow = "";
    }

    // Fermer en cliquant sur le fond
    document.getElementById("overlay-validation").addEventListener("click", function(e) {
      if (e.target === document.getElementById("overlay-validation")) {
        fermerOverlay("validation");
      }
    });
    document.getElementById("overlay-modifier").addEventListener("click", function(e) {
      if (e.target === document.getElementById("overlay-modifier")) {
        fermerOverlay("modifier");
      }
    });
    document.getElementById("overlay-categorie").addEventListener("click", function(e) {
      if (e.target === document.getElementById("overlay-categorie")) {
        fermerOverlay("categorie");
      }
    });

    // Fermer avec Echap
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        fermerOverlay("validation");
        fermerOverlay("modifier");
        fermerOverlay("categorie");
        fermerRefus();
        document.body.style.overflow = "";
      }
    });


    // ===================================================
    // BOUTONS BACKOFFICE PRINCIPAL
    // ===================================================

    function ouvrirValidation(id) {
      ouvrirOverlay("validation");
    }

    function ouvrirRefus(id) {
      document.getElementById("rejectModal").classList.add("active");
    }

    function fermerRefus() {
      document.getElementById("rejectModal").classList.remove("active");
    }

    function ouvrirModifier(id) {
      ouvrirOverlay("modifier");
    }

    function ouvrirCategorie() {
      ouvrirOverlay("categorie");
    }

    function supprimerProduit(id) {
      if (confirm("Etes-vous sur de vouloir supprimer ce produit ? Cette action est irreversible.")) {
        alert("Produit supprime avec succes !");
      }
    }


    // ===================================================
    // FILTRES ET RECHERCHE
    // ===================================================

    function filtrerStatut(statut, bouton) {
      // Retirer active de tous les boutons
      document.getElementById("btn-all").classList.remove("active");
      document.getElementById("btn-pending").classList.remove("active");
      document.getElementById("btn-approved").classList.remove("active");
      document.getElementById("btn-rejected").classList.remove("active");
      // Activer le bouton clique
      bouton.classList.add("active");

      // Cibler les lignes <tr> des tableaux (Validation + Gestion)
      var lignes = document.querySelectorAll(".prod-table tbody tr[data-status]");
      for (var i = 0; i < lignes.length; i++) {
        if (statut === "all") {
          lignes[i].style.display = "";
        } else {
          if (lignes[i].getAttribute("data-status") === statut) {
            lignes[i].style.display = "";
          } else {
            lignes[i].style.display = "none";
          }
        }
      }
    }

    function filtrerRecherche() {
      var terme = document.getElementById("searchInput").value.toLowerCase();
      // Cibler les lignes <tr> des tableaux
      var lignes = document.querySelectorAll(".prod-table tbody tr");
      for (var i = 0; i < lignes.length; i++) {
        var texte = lignes[i].textContent.toLowerCase();
        if (texte.indexOf(terme) !== -1) {
          lignes[i].style.display = "";
        } else {
          lignes[i].style.display = "none";
        }
      }
    }

    // Soumission modal refus simple
    document.getElementById("rejectForm").addEventListener("submit", function(e) {
      e.preventDefault();
      var reason = document.getElementById("rejectReason").value;
      if (reason.trim() !== "") {
        alert("Produit refuse. Raison : " + reason);
        fermerRefus();
        document.getElementById("rejectForm").reset();
      }
    });


    // ===================================================
    // FORMULAIRE VALIDATION
    // ===================================================

    function changerDecision(valeur) {
      document.getElementById("item-approve").classList.remove("selected-approve");
      document.getElementById("item-reject").classList.remove("selected-reject");

      if (valeur === "approuver") {
        document.getElementById("item-approve").classList.add("selected-approve");
        document.getElementById("raison").placeholder = "Aucune raison necessaire pour l'approbation.";
      } else {
        document.getElementById("item-reject").classList.add("selected-reject");
        document.getElementById("raison").placeholder = "Expliquez en detail pourquoi ce produit est refuse...";
      }
      document.getElementById("err_decision").style.display = "none";
    }

    function validerRaison() {
      var valeur = document.getElementById("raison").value;
      if (valeur.trim() === "") {
        afficherErreur("raison", "err_raison", "La raison du refus est obligatoire.");
        return false;
      } else if (valeur.length < 20) {
        afficherErreur("raison", "err_raison", "Veuillez etre plus precis (minimum 20 caracteres).");
        return false;
      } else if (valeur.length > 500) {
        afficherErreur("raison", "err_raison", "La raison ne peut pas depasser 500 caracteres.");
        return false;
      }
      afficherSucces("raison", "err_raison");
      return true;
    }

    function validerRaisonBlur() {
      var approuve = document.getElementById("approve").checked;
      var refuse   = document.getElementById("reject").checked;
      if (refuse) {
        validerRaison();
      }
    }

    function soumettreValidation(e) {
      e.preventDefault();
      var approuve = document.getElementById("approve").checked;
      var refuse   = document.getElementById("reject").checked;

      if (!approuve && !refuse) {
        document.getElementById("err_decision").textContent = "Veuillez choisir une decision : Approuver ou Refuser.";
        document.getElementById("err_decision").style.display = "block";
        return;
      }
      document.getElementById("err_decision").style.display = "none";

      if (refuse) {
        if (!validerRaison()) {
          return;
        }
      }

      var message = approuve
        ? "Confirmer l'APPROBATION de ce produit ? Il sera visible sur la plateforme."
        : "Confirmer le REFUS de ce produit ? L'artisan sera notifie avec votre raison.";

      if (confirm(message)) {
        alert("Decision enregistree avec succes !");
        fermerOverlay("validation");
      }
    }

    function annulerValidation() {
      if (confirm("Voulez-vous vraiment annuler la validation ?")) {
        document.getElementById("validationForm").reset();
        document.getElementById("item-approve").classList.remove("selected-approve");
        document.getElementById("item-reject").classList.remove("selected-reject");
        document.getElementById("err_decision").style.display = "none";
        document.getElementById("err_raison").style.display = "none";
        document.getElementById("raison").classList.remove("invalid", "valid");
      }
    }


    // ===================================================
    // FORMULAIRE MODIFIER
    // ===================================================

    function validerTitre() {
      var valeur = document.getElementById("titre").value;
      if (valeur.trim() === "") {
        afficherErreur("titre", "err_titre", "Le titre est obligatoire.");
        return false;
      } else if (valeur.length < 5) {
        afficherErreur("titre", "err_titre", "Minimum 5 caracteres requis.");
        return false;
      } else if (valeur.length > 100) {
        afficherErreur("titre", "err_titre", "Maximum 100 caracteres autorises.");
        return false;
      }
      afficherSucces("titre", "err_titre");
      return true;
    }

    function validerDescription() {
      var valeur = document.getElementById("description").value;
      if (valeur.trim() === "") {
        afficherErreur("description", "err_description", "La description est obligatoire.");
        return false;
      } else if (valeur.length < 30) {
        afficherErreur("description", "err_description", "Minimum 30 caracteres requis.");
        return false;
      }
      afficherSucces("description", "err_description");
      return true;
    }

    function validerCategorie() {
      var valeur = document.getElementById("categorie").value;
      if (valeur === "") {
        afficherErreur("categorie", "err_categorie", "Veuillez selectionner une categorie.");
        return false;
      }
      afficherSucces("categorie", "err_categorie");
      return true;
    }

    function validerMateriaux() {
      var valeur = document.getElementById("materiaux").value;
      if (valeur.trim() === "") {
        afficherErreur("materiaux", "err_materiaux", "Les materiaux sont obligatoires.");
        return false;
      }
      afficherSucces("materiaux", "err_materiaux");
      return true;
    }

    function validerPrix() {
      var champ  = document.getElementById("prix");
      var valeur = parseFloat(champ.value);
      if (champ.value === "" || isNaN(valeur)) {
        afficherErreur("prix", "err_prix", "Le prix est obligatoire.");
        return false;
      } else if (valeur <= 0) {
        afficherErreur("prix", "err_prix", "Le prix doit etre superieur a 0.");
        return false;
      } else if (valeur > 100000) {
        afficherErreur("prix", "err_prix", "Prix trop eleve (max 100 000 DT).");
        return false;
      }
      afficherSucces("prix", "err_prix");
      return true;
    }

    function validerStock() {
      var champ  = document.getElementById("stock");
      var valeur = parseInt(champ.value);
      if (champ.value === "" || isNaN(valeur)) {
        afficherErreur("stock", "err_stock", "Le stock est obligatoire.");
        return false;
      } else if (valeur < 0) {
        afficherErreur("stock", "err_stock", "Le stock ne peut pas etre negatif.");
        return false;
      }
      afficherSucces("stock", "err_stock");
      return true;
    }

    // Validation photo : verifier type et taille sans FileReader
    function validerPhotos() {
      var champ         = document.getElementById("photos");
      var erreur        = document.getElementById("err_photos");
      var typesPermis   = ["image/jpeg", "image/png", "image/webp"];
      var tailleMax     = 5 * 1024 * 1024; // 5 MB
      var messageErreur = "";

      if (champ.files.length > 5) {
        messageErreur = "Maximum 5 photos autorisees.";
      } else {
        for (var i = 0; i < champ.files.length; i++) {
          var fichier = champ.files[i];
          var typeOk  = false;
          for (var j = 0; j < typesPermis.length; j++) {
            if (fichier.type === typesPermis[j]) {
              typeOk = true;
            }
          }
          if (!typeOk) {
            messageErreur = "Format non autorise (JPG, PNG, WEBP uniquement).";
            break;
          }
          if (fichier.size > tailleMax) {
            messageErreur = fichier.name + " depasse 5 MB.";
            break;
          }
        }
      }

      if (messageErreur !== "") {
        erreur.textContent = messageErreur;
        erreur.style.display = "block";
        return false;
      }
      erreur.style.display = "none";
      return true;
    }

    function soumettreModification(e) {
      e.preventDefault();
      var titreOK = validerTitre();
      var descOK  = validerDescription();
      var catOK   = validerCategorie();
      var materOK = validerMateriaux();
      var prixOK  = validerPrix();
      var stockOK = validerStock();

      if (titreOK && descOK && catOK && materOK && prixOK && stockOK) {
        alert("Modifications enregistrees avec succes !");
        fermerOverlay("modifier");
      } else {
        alert("Veuillez corriger les erreurs avant de soumettre.");
      }
    }

    function annulerModification() {
      if (confirm("Voulez-vous vraiment annuler les modifications ?")) {
        document.getElementById("adminEditForm").reset();
        // Supprimer les classes de validation champ par champ
        document.getElementById("titre").classList.remove("invalid", "valid");
        document.getElementById("description").classList.remove("invalid", "valid");
        document.getElementById("categorie").classList.remove("invalid", "valid");
        document.getElementById("materiaux").classList.remove("invalid", "valid");
        document.getElementById("prix").classList.remove("invalid", "valid");
        document.getElementById("stock").classList.remove("invalid", "valid");
        // Cacher les erreurs champ par champ
        document.getElementById("err_titre").style.display       = "none";
        document.getElementById("err_description").style.display  = "none";
        document.getElementById("err_categorie").style.display    = "none";
        document.getElementById("err_materiaux").style.display    = "none";
        document.getElementById("err_prix").style.display         = "none";
        document.getElementById("err_stock").style.display        = "none";
        document.getElementById("err_photos").style.display       = "none";
      }
    }


    // ===================================================
    // FORMULAIRE CATEGORIE
    // ===================================================

    // Variable globale pour l'icone selectionnee
    var iconeChoisie = "";

    // Liste des ids des icones (pour la boucle)
    var idsIcones = ["ico-poterie", "ico-tissage", "ico-bijouterie", "ico-sculpture",
                     "ico-maroquinerie", "ico-bois", "ico-verre", "ico-peinture",
                     "ico-decoration", "ico-autre"];

    function selectionnerIcone(idElement) {
      // Retirer la selection de toutes les icones
      for (var i = 0; i < idsIcones.length; i++) {
        document.getElementById(idsIcones[i]).classList.remove("icon-selected");
      }
      // Ajouter la classe a l'icone cliquee
      document.getElementById(idElement).classList.add("icon-selected");
      iconeChoisie = idElement;
      // Cacher l'erreur
      document.getElementById("err_icone").style.display = "none";
    }

    function validerNom() {
      var valeur = document.getElementById("nom").value;
      if (valeur.trim() === "") {
        afficherErreur("nom", "err_nom", "Le nom de la categorie est obligatoire.");
        return false;
      } else if (valeur.length < 3) {
        afficherErreur("nom", "err_nom", "Le nom doit contenir au moins 3 caracteres.");
        return false;
      } else if (valeur.length > 50) {
        afficherErreur("nom", "err_nom", "Le nom ne peut pas depasser 50 caracteres.");
        return false;
      }
      afficherSucces("nom", "err_nom");
      return true;
    }

    function validerDescCat() {
      var valeur = document.getElementById("cat_desc").value;
      if (valeur.trim() === "") {
        afficherErreur("cat_desc", "err_cat_desc", "La description est obligatoire.");
        return false;
      } else if (valeur.length < 10) {
        afficherErreur("cat_desc", "err_cat_desc", "La description doit contenir au moins 10 caracteres.");
        return false;
      } else if (valeur.length > 300) {
        afficherErreur("cat_desc", "err_cat_desc", "La description ne peut pas depasser 300 caracteres.");
        return false;
      }
      afficherSucces("cat_desc", "err_cat_desc");
      return true;
    }

    function validerIcone() {
      var erreur = document.getElementById("err_icone");
      if (iconeChoisie === "") {
        erreur.textContent = "Veuillez selectionner une icone pour la categorie.";
        erreur.style.display = "block";
        return false;
      }
      erreur.style.display = "none";
      return true;
    }

    function validerOrdre() {
      var champ  = document.getElementById("ordre");
      var valeur = parseInt(champ.value);
      if (champ.value !== "" && (isNaN(valeur) || valeur < 1)) {
        champ.classList.add("invalid");
        return false;
      }
      champ.classList.remove("invalid");
      return true;
    }

    document.getElementById("nom").addEventListener("blur", validerNom);
    document.getElementById("cat_desc").addEventListener("blur", validerDescCat);
    document.getElementById("ordre").addEventListener("blur", validerOrdre);

    function soumettreCategorie(e) {
      e.preventDefault();
      var nomOK   = validerNom();
      var descOK  = validerDescCat();
      var iconeOK = validerIcone();
      var ordreOK = validerOrdre();

      if (nomOK && descOK && iconeOK && ordreOK) {
        alert("Categorie creee avec succes !");
        fermerOverlay("categorie");
      } else {
        alert("Veuillez corriger les erreurs avant de soumettre.");
      }
    }

    function annulerCategorie() {
      if (confirm("Voulez-vous vraiment annuler ? Toutes vos donnees seront perdues.")) {
        document.getElementById("categoryForm").reset();
        // Retirer icon-selected de toutes les icones
        for (var i = 0; i < idsIcones.length; i++) {
          document.getElementById(idsIcones[i]).classList.remove("icon-selected");
        }
        iconeChoisie = "";
        // Supprimer les classes de validation
        document.getElementById("nom").classList.remove("invalid", "valid");
        document.getElementById("cat_desc").classList.remove("invalid", "valid");
        document.getElementById("ordre").classList.remove("invalid");
        // Cacher les erreurs
        document.getElementById("err_nom").style.display      = "none";
        document.getElementById("err_cat_desc").style.display = "none";
        document.getElementById("err_icone").style.display    = "none";
      }
    }

