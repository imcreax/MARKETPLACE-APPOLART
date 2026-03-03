function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validerMotDePasse(password) {
    return password.length >= 8;
}

function validerTelephone(tel) {
    const regex = /^\d{8}$/;
    return regex.test(tel);
}

function validerConfirmationMotDePasse(password, confirm) {
    return password === confirm;
}

function validerNom(nom) {
    return nom.trim().length >= 2;
}

function validerCIN(cin) {
    const regex = /^\d{8}$/;
    return regex.test(cin);
}

function validerURL(url) {
    if (!url || url.trim() === "") return true; // optionnel
    const regex = /^https?:\/\/.+\..+/;
    return regex.test(url);
}

function validerExtensionFichier(input, extensionsAutorisees) {
    if (!input.files || input.files.length === 0) return false;
    for (var i = 0; i < input.files.length; i++) {
        var ext = input.files[i].name.split('.').pop().toLowerCase();
        if (extensionsAutorisees.indexOf(ext) === -1) return false;
    }
    return true;
}

function validerTailleFichier(input, maxMo) {
    if (!input.files || input.files.length === 0) return false;
    var maxOctets = maxMo * 1024 * 1024;
    for (var i = 0; i < input.files.length; i++) {
        if (input.files[i].size > maxOctets) return false;
    }
    return true;
}

// Validation du formulaire de connexion
function validerConnexion(event) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    if (!validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }

    return true;
}

// Validation du formulaire d'inscription utilisateur
function validerInscription(event) {
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("tel").value;
    var adresse = document.getElementById("adresse").value;
    var ville = document.getElementById("ville").value;
    var pays = document.getElementById("pays").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm").value;
    var cgu = document.querySelector('#tab-utilisateur input[name="cgu"]') || document.querySelector('input[name="cgu"]');

    if (!validerNom(prenom)) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    if (!validerNom(nom)) {
        alert("Le nom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    if (!validerTelephone(tel)) {
        alert("Numéro de téléphone invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    if (adresse.trim().length < 5) {
        alert("L'adresse de livraison doit contenir au moins 5 caractères.");
        event.preventDefault();
        return false;
    }

    if (!validerNom(ville)) {
        alert("Veuillez entrer votre ville (au moins 2 caractères).");
        event.preventDefault();
        return false;
    }

    if (!pays) {
        alert("Veuillez sélectionner votre pays.");
        event.preventDefault();
        return false;
    }

    if (!validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }

    if (!validerConfirmationMotDePasse(password, confirm)) {
        alert("Les mots de passe ne correspondent pas.");
        event.preventDefault();
        return false;
    }

    if (cgu && !cgu.checked) {
        alert("Veuillez accepter les conditions générales et la politique de confidentialité.");
        event.preventDefault();
        return false;
    }

    return true;
}

// Validation du formulaire OTP (vérification)
function validerOTP(event) {
    const otp = document.getElementById("otp").value.trim();

    if (otp === "") {
        alert("Veuillez entrer le code OTP.");
        event.preventDefault();
        return false;
    }

    alert("Vérification réussie !");
    event.preventDefault();
    window.location.href = "connexion.html";
    return false;
}

// Validation du formulaire changement de mot de passe
function validerChangPass(event) {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;

    if (!validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }

    if (!validerConfirmationMotDePasse(password, confirm)) {
        alert("Les mots de passe ne correspondent pas.");
        event.preventDefault();
        return false;
    }

    alert("Mot de passe réinitialisé avec succès !");
    event.preventDefault();
    window.location.href = "connexion.html";
    return false;
}

// Validation du formulaire envoi réinitialisation
function validerEnvoiReinit(event) {
    const email = document.getElementById("email").value;

    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    alert("Lien de réinitialisation envoyé avec succès !");
    event.preventDefault();
    window.location.href = "chang_pass.html";
    return false;
}

// Validation du formulaire demande artisan (page demande.html standalone)
function validerDemande(event) {
    const email = document.getElementById("email").value;
    const tel = document.getElementById("telephone").value;

    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    if (!validerTelephone(tel)) {
        alert("Numéro de téléphone invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    alert("Demande envoyée avec succès !");
    event.preventDefault();
    window.location.href = "connexion.html";
    return false;
}

// Validation du formulaire artisan intégré (onglet dans inscription.html)
function validerDemandeArtisanTab(event) {

    // ── Section : Informations Personnelles ──

    // Photo de profil
    var photoProfil = document.getElementById("art-photo-profil");
    if (!photoProfil.files || photoProfil.files.length === 0) {
        alert("Veuillez ajouter votre photo de profil.");
        event.preventDefault();
        return false;
    }
    if (!validerExtensionFichier(photoProfil, ["jpg", "jpeg", "png", "webp"])) {
        alert("Format de photo de profil invalide. Formats acceptés : JPG, PNG, WEBP.");
        event.preventDefault();
        return false;
    }
    if (!validerTailleFichier(photoProfil, 5)) {
        alert("La photo de profil ne doit pas dépasser 5 Mo.");
        event.preventDefault();
        return false;
    }

    // Prénom
    var prenom = document.getElementById("art-prenom").value;
    if (!validerNom(prenom)) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Nom
    var nom = document.getElementById("art-nom").value;
    if (!validerNom(nom)) {
        alert("Le nom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Nom atelier
    var nomAtelier = document.getElementById("art-nom-atelier").value;
    if (nomAtelier.trim().length < 2) {
        alert("Le nom de l'atelier doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Email
    var email = document.getElementById("art-email").value;
    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    // Téléphone
    var tel = document.getElementById("art-telephone").value;
    if (!validerTelephone(tel)) {
        alert("Numéro de téléphone invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // CIN
    var cin = document.getElementById("art-cin").value;
    if (!validerCIN(cin)) {
        alert("Numéro CIN invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // Mot de passe
    var password = document.getElementById("art-password").value;
    if (!validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }

    // Confirmation mot de passe
    var confirm = document.getElementById("art-confirm").value;
    if (!validerConfirmationMotDePasse(password, confirm)) {
        alert("Les mots de passe ne correspondent pas.");
        event.preventDefault();
        return false;
    }

    // ── Section : Compétences Artisanales ──

    // Spécialités (au moins une cochée)
    var specialites = document.querySelectorAll('#tab-artisan input[name="specialites"]:checked');
    if (specialites.length === 0) {
        alert("Veuillez sélectionner au moins une spécialité artisanale.");
        event.preventDefault();
        return false;
    }

    // Expérience
    var experience = document.getElementById("art-experience").value;
    if (!experience) {
        alert("Veuillez sélectionner votre niveau d'expérience.");
        event.preventDefault();
        return false;
    }

    // Description
    var description = document.getElementById("art-description").value;
    if (description.trim().length < 10) {
        alert("La description de votre travail doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // ── Section : Localisation ──

    // Ville
    var ville = document.getElementById("art-ville").value;
    if (!validerNom(ville)) {
        alert("Veuillez entrer votre ville (au moins 2 caractères).");
        event.preventDefault();
        return false;
    }

    // Gouvernorat
    var gouvernorat = document.getElementById("art-gouvernorat").value;
    if (!gouvernorat) {
        alert("Veuillez sélectionner votre gouvernorat.");
        event.preventDefault();
        return false;
    }

    // Adresse
    var adresse = document.getElementById("art-adresse").value;
    if (adresse.trim().length < 5) {
        alert("L'adresse de l'atelier doit contenir au moins 5 caractères.");
        event.preventDefault();
        return false;
    }

    // ── Section : Présence en Ligne (optionnel mais validé si rempli) ──

    var siteWeb = document.getElementById("art-site-web").value;
    if (!validerURL(siteWeb)) {
        alert("L'URL du site web est invalide. Elle doit commencer par http:// ou https://");
        event.preventDefault();
        return false;
    }

    var facebook = document.getElementById("art-facebook").value;
    if (!validerURL(facebook)) {
        alert("L'URL de la page Facebook est invalide. Elle doit commencer par http:// ou https://");
        event.preventDefault();
        return false;
    }

    var linkedin = document.getElementById("art-linkedin").value;
    if (!validerURL(linkedin)) {
        alert("L'URL LinkedIn est invalide. Elle doit commencer par http:// ou https://");
        event.preventDefault();
        return false;
    }

    // ── Section : Portfolio ──

    // Photos créations (3 à 10)
    var portfolio = document.getElementById("art-portfolio");
    if (!portfolio.files || portfolio.files.length === 0) {
        alert("Veuillez ajouter des photos de vos créations.");
        event.preventDefault();
        return false;
    }
    if (portfolio.files.length > 10) {
        alert("Veuillez ajouter au maximum 10 photos de vos créations. Vous en avez sélectionné " + portfolio.files.length + ".");
        event.preventDefault();
        return false;
    }
    if (!validerExtensionFichier(portfolio, ["jpg", "jpeg", "png", "webp"])) {
        alert("Format de photo invalide. Formats acceptés : JPG, PNG, WEBP.");
        event.preventDefault();
        return false;
    }
    if (!validerTailleFichier(portfolio, 5)) {
        alert("Chaque photo ne doit pas dépasser 5 Mo.");
        event.preventDefault();
        return false;
    }

    // Certificat (optionnel mais validé si rempli)
    var certificat = document.getElementById("art-certificat");
    if (certificat.files && certificat.files.length > 0) {
        if (!validerExtensionFichier(certificat, ["jpg", "jpeg", "png", "pdf"])) {
            alert("Format de certificat invalide. Formats acceptés : PDF, JPG, PNG.");
            event.preventDefault();
            return false;
        }
        if (!validerTailleFichier(certificat, 5)) {
            alert("Le certificat ne doit pas dépasser 5 Mo.");
            event.preventDefault();
            return false;
        }
    }

    // ── Section : Informations Complémentaires ──

    // Motivation
    var motivation = document.getElementById("art-motivation").value;
    if (motivation.trim().length < 10) {
        alert("Votre motivation doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // ── Section : Conditions ──

    var conditions = document.querySelector('#tab-artisan input[name="conditions"]');
    if (conditions && !conditions.checked) {
        alert("Veuillez accepter les conditions générales d'utilisation et la charte artisan.");
        event.preventDefault();
        return false;
    }

    var certifie = document.querySelector('#tab-artisan input[name="certifie"]');
    if (certifie && !certifie.checked) {
        alert("Veuillez certifier que vos produits sont faits à la main et authentiques.");
        event.preventDefault();
        return false;
    }

    alert("Compte créé avec succès !");
    event.preventDefault();
    window.location.href = "verif.html";
    return false;
}

// Gestion des onglets (inscription.html)
function initTabs() {
    var tabBtns = document.querySelectorAll(".tab-btn");
    if (tabBtns.length === 0) return;

    var wrapper = document.querySelector(".form-wrapper");

    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            // Désactiver tous les onglets
            tabBtns.forEach(function (b) { b.classList.remove("active"); });
            document.querySelectorAll(".tab-content").forEach(function (tc) {
                tc.classList.remove("active");
            });

            // Activer l'onglet cliqué
            btn.classList.add("active");
            var targetId = btn.getAttribute("data-tab");
            document.getElementById(targetId).classList.add("active");

            // Élargir le conteneur pour l'onglet artisan
            if (wrapper) {
                if (targetId === "tab-artisan") {
                    wrapper.classList.add("expanded");
                } else {
                    wrapper.classList.remove("expanded");
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialiser les onglets si présents
    initTabs();

    // Page inscription avec onglets
    var tabUtilisateur = document.getElementById("tab-utilisateur");
    if (tabUtilisateur) {
        var formUser = tabUtilisateur.querySelector("form");
        if (formUser) {
            formUser.addEventListener("submit", validerInscription);
        }
    }

    var tabArtisan = document.getElementById("tab-artisan");
    if (tabArtisan) {
        var formArtisanTab = tabArtisan.querySelector("form");
        if (formArtisanTab) {
            formArtisanTab.addEventListener("submit", validerDemandeArtisanTab);
        }
    }

    // Page connexion (pas d'onglets, form-card avec un seul formulaire)
    if (!tabUtilisateur) {
        var formCard = document.querySelector(".form-card form");
        if (formCard) {
            var confirmField = document.getElementById("confirm");
            if (confirmField) {
                formCard.addEventListener("submit", validerInscription);
            } else {
                formCard.addEventListener("submit", validerConnexion);
            }
        }
    }

    // Page vérification OTP, envoi réinitialisation ou changement mot de passe
    var formMember = document.querySelector(".member-form");
    if (formMember) {
        var otpField = document.getElementById("otp");
        var confirmPassField = document.getElementById("confirm-password");
        if (otpField) {
            formMember.addEventListener("submit", validerOTP);
        } else if (confirmPassField) {
            formMember.addEventListener("submit", validerChangPass);
        } else {
            formMember.addEventListener("submit", validerEnvoiReinit);
        }
    }

    // Page demande artisan standalone (demande.html)
    var formArtisan = document.querySelector(".artisan-form");
    if (formArtisan) {
        formArtisan.addEventListener("submit", validerDemande);
    }
});
