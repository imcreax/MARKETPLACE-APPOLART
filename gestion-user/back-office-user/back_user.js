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

// Validation du formulaire ajout utilisateur
function validerAjoutUser(event) {
    const email = document.getElementById("email").value;
    const tel = document.getElementById("telephone").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;

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

    alert("Utilisateur ajouté avec succès !");
    event.preventDefault();
    window.location.href = "liste_user.html";
    return false;
}

// Validation du formulaire modification utilisateur
function validerModifUser(event) {
    const email = document.getElementById("email").value;
    const tel = document.getElementById("telephone").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;

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

    if (password !== "" && !validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }

    if (password !== "" && !validerConfirmationMotDePasse(password, confirm)) {
        alert("Les mots de passe ne correspondent pas.");
        event.preventDefault();
        return false;
    }

    alert("Utilisateur modifié avec succès !");
    event.preventDefault();
    window.location.href = "liste_user.html";
    return false;
}

// Validation CIN (8 chiffres)
function validerCIN(cin) {
    const regex = /^\d{8}$/;
    return regex.test(cin);
}

// Validation extensions fichier
function validerExtensionFichier(nomFichier, extensionsAutorisees) {
    var ext = nomFichier.split('.').pop().toLowerCase();
    return extensionsAutorisees.indexOf(ext) !== -1;
}

// Validation taille fichier (en octets)
function validerTailleFichier(fichier, tailleMax) {
    return fichier.size <= tailleMax;
}

// Validation du formulaire ajout artisan
function validerAjoutArtisan(event) {
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var nomAtelier = document.getElementById("nom_atelier").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("telephone").value;
    var cin = document.getElementById("cin").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm-password").value;
    var specialites = document.querySelectorAll('input[name="specialites"]:checked');
    var experience = document.getElementById("experience").value;
    var description = document.getElementById("description").value;
    var ville = document.getElementById("ville").value;
    var gouvernorat = document.getElementById("gouvernorat").value;
    var adresse = document.getElementById("adresse").value;
    var motivation = document.getElementById("motivation").value;
    var conditionsCheckbox = document.querySelector('input[name="conditions"]');
    var certifieCheckbox = document.querySelector('input[name="certifie"]');
    var photoProfil = document.getElementById("photo-profil");
    var portfolio = document.getElementById("portfolio");

    // Photo de profil
    if (photoProfil && photoProfil.files.length === 0) {
        alert("Veuillez ajouter une photo de profil.");
        event.preventDefault();
        return false;
    }
    if (photoProfil && photoProfil.files.length > 0) {
        var photoFile = photoProfil.files[0];
        if (!validerExtensionFichier(photoFile.name, ["jpg", "jpeg", "png", "webp"])) {
            alert("La photo de profil doit être au format JPG, PNG ou WEBP.");
            event.preventDefault();
            return false;
        }
        if (!validerTailleFichier(photoFile, 5 * 1024 * 1024)) {
            alert("La photo de profil ne doit pas dépasser 5 MB.");
            event.preventDefault();
            return false;
        }
    }

    // Prénom + Nom
    if (prenom.trim().length < 2) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }
    if (nom.trim().length < 2) {
        alert("Le nom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Nom atelier
    if (nomAtelier.trim().length < 2) {
        alert("Le nom de l'atelier doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Email
    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    // Téléphone
    if (!validerTelephone(tel)) {
        alert("Numéro de téléphone invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // CIN
    if (!validerCIN(cin)) {
        alert("Numéro CIN invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // Mot de passe
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

    // Spécialités (au moins 1 cochée)
    if (specialites.length === 0) {
        alert("Veuillez sélectionner au moins une spécialité.");
        event.preventDefault();
        return false;
    }

    // Expérience
    if (!experience) {
        alert("Veuillez sélectionner le niveau d'expérience.");
        event.preventDefault();
        return false;
    }

    // Description
    if (description.trim().length < 10) {
        alert("La description doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // Ville
    if (ville.trim().length < 2) {
        alert("Veuillez saisir une ville valide.");
        event.preventDefault();
        return false;
    }

    // Gouvernorat
    if (!gouvernorat) {
        alert("Veuillez sélectionner un gouvernorat.");
        event.preventDefault();
        return false;
    }

    // Adresse
    if (adresse.trim().length < 5) {
        alert("L'adresse de l'atelier doit contenir au moins 5 caractères.");
        event.preventDefault();
        return false;
    }

    // Portfolio (1 à 10 images)
    if (portfolio && portfolio.files.length === 0) {
        alert("Veuillez ajouter au moins une photo de créations.");
        event.preventDefault();
        return false;
    }
    if (portfolio && portfolio.files.length > 10) {
        alert("Vous pouvez ajouter au maximum 10 photos de créations.");
        event.preventDefault();
        return false;
    }
    if (portfolio) {
        for (var i = 0; i < portfolio.files.length; i++) {
            if (!validerExtensionFichier(portfolio.files[i].name, ["jpg", "jpeg", "png", "webp"])) {
                alert("Les photos de créations doivent être au format JPG, PNG ou WEBP.");
                event.preventDefault();
                return false;
            }
            if (!validerTailleFichier(portfolio.files[i], 5 * 1024 * 1024)) {
                alert("Chaque photo de créations ne doit pas dépasser 5 MB.");
                event.preventDefault();
                return false;
            }
        }
    }

    // Motivation
    if (motivation.trim().length < 10) {
        alert("La motivation doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // Conditions
    if (conditionsCheckbox && !conditionsCheckbox.checked) {
        alert("Veuillez accepter les conditions générales d'utilisation.");
        event.preventDefault();
        return false;
    }
    if (certifieCheckbox && !certifieCheckbox.checked) {
        alert("Veuillez certifier l'authenticité des produits.");
        event.preventDefault();
        return false;
    }

    alert("Artisan ajouté avec succès !");
    event.preventDefault();
    window.location.href = "liste_artisan.html";
    return false;
}

// Validation du formulaire modification artisan
function validerModifArtisan(event) {
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var nomAtelier = document.getElementById("nom_atelier").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("telephone").value;
    var cin = document.getElementById("cin").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm-password").value;
    var specialites = document.querySelectorAll('input[name="specialites"]:checked');
    var experience = document.getElementById("experience").value;
    var description = document.getElementById("description").value;
    var ville = document.getElementById("ville").value;
    var gouvernorat = document.getElementById("gouvernorat").value;
    var adresse = document.getElementById("adresse").value;
    var motivation = document.getElementById("motivation").value;
    var conditionsCheckbox = document.querySelector('input[name="conditions"]');
    var certifieCheckbox = document.querySelector('input[name="certifie"]');
    var photoProfil = document.getElementById("photo-profil");
    var portfolio = document.getElementById("portfolio");

    // Photo de profil (optionnelle en modification, valider si un fichier est choisi)
    if (photoProfil && photoProfil.files.length > 0) {
        var photoFile = photoProfil.files[0];
        if (!validerExtensionFichier(photoFile.name, ["jpg", "jpeg", "png", "webp"])) {
            alert("La photo de profil doit être au format JPG, PNG ou WEBP.");
            event.preventDefault();
            return false;
        }
        if (!validerTailleFichier(photoFile, 5 * 1024 * 1024)) {
            alert("La photo de profil ne doit pas dépasser 5 MB.");
            event.preventDefault();
            return false;
        }
    }

    // Prénom + Nom
    if (prenom.trim().length < 2) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }
    if (nom.trim().length < 2) {
        alert("Le nom doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Nom atelier
    if (nomAtelier.trim().length < 2) {
        alert("Le nom de l'atelier doit contenir au moins 2 caractères.");
        event.preventDefault();
        return false;
    }

    // Email
    if (!validerEmail(email)) {
        alert("Adresse e-mail invalide. Veuillez entrer un format valide (ex: exemple@domaine.com).");
        event.preventDefault();
        return false;
    }

    // Téléphone
    if (!validerTelephone(tel)) {
        alert("Numéro de téléphone invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // CIN
    if (!validerCIN(cin)) {
        alert("Numéro CIN invalide. Veuillez entrer exactement 8 chiffres.");
        event.preventDefault();
        return false;
    }

    // Mot de passe (optionnel en modification)
    if (password !== "" && !validerMotDePasse(password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        event.preventDefault();
        return false;
    }
    if (password !== "" && !validerConfirmationMotDePasse(password, confirm)) {
        alert("Les mots de passe ne correspondent pas.");
        event.preventDefault();
        return false;
    }

    // Spécialités (au moins 1 cochée)
    if (specialites.length === 0) {
        alert("Veuillez sélectionner au moins une spécialité.");
        event.preventDefault();
        return false;
    }

    // Expérience
    if (!experience) {
        alert("Veuillez sélectionner le niveau d'expérience.");
        event.preventDefault();
        return false;
    }

    // Description
    if (description.trim().length < 10) {
        alert("La description doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // Ville
    if (ville.trim().length < 2) {
        alert("Veuillez saisir une ville valide.");
        event.preventDefault();
        return false;
    }

    // Gouvernorat
    if (!gouvernorat) {
        alert("Veuillez sélectionner un gouvernorat.");
        event.preventDefault();
        return false;
    }

    // Adresse
    if (adresse.trim().length < 5) {
        alert("L'adresse de l'atelier doit contenir au moins 5 caractères.");
        event.preventDefault();
        return false;
    }

    // Portfolio (optionnel en modification, valider si des fichiers sont choisis)
    if (portfolio && portfolio.files.length > 10) {
        alert("Vous pouvez ajouter au maximum 10 photos de créations.");
        event.preventDefault();
        return false;
    }
    if (portfolio && portfolio.files.length > 0) {
        for (var i = 0; i < portfolio.files.length; i++) {
            if (!validerExtensionFichier(portfolio.files[i].name, ["jpg", "jpeg", "png", "webp"])) {
                alert("Les photos de créations doivent être au format JPG, PNG ou WEBP.");
                event.preventDefault();
                return false;
            }
            if (!validerTailleFichier(portfolio.files[i], 5 * 1024 * 1024)) {
                alert("Chaque photo de créations ne doit pas dépasser 5 MB.");
                event.preventDefault();
                return false;
            }
        }
    }

    // Motivation
    if (motivation.trim().length < 10) {
        alert("La motivation doit contenir au moins 10 caractères.");
        event.preventDefault();
        return false;
    }

    // Conditions
    if (conditionsCheckbox && !conditionsCheckbox.checked) {
        alert("Veuillez accepter les conditions générales d'utilisation.");
        event.preventDefault();
        return false;
    }
    if (certifieCheckbox && !certifieCheckbox.checked) {
        alert("Veuillez certifier l'authenticité des produits.");
        event.preventDefault();
        return false;
    }

    alert("Artisan modifié avec succès !");
    event.preventDefault();
    window.location.href = "liste_artisan.html";
    return false;
}

// Confirmation de suppression
function confirmerSuppression(event) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
        event.preventDefault();
        return false;
    }
    alert("Supprimé avec succès !");
}

document.addEventListener("DOMContentLoaded", function () {
    // Page ajout / modification utilisateur
    var formMember = document.querySelector(".member-form");
    if (formMember) {
        var submitBtn = formMember.querySelector(".submit-btn");
        if (submitBtn && submitBtn.textContent.includes("Enregistrer")) {
            formMember.addEventListener("submit", validerModifUser);
        } else {
            formMember.addEventListener("submit", validerAjoutUser);
        }
    }

    // Page ajout / modification artisan
    var formArtisan = document.querySelector(".artisan-form");
    if (formArtisan) {
        var submitBtnArt = formArtisan.querySelector("button[type='submit']");
        if (submitBtnArt && submitBtnArt.textContent.includes("Enregistrer")) {
            formArtisan.addEventListener("submit", validerModifArtisan);
        } else {
            formArtisan.addEventListener("submit", validerAjoutArtisan);
        }
    }

    // Page liste - boutons supprimer
    var deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", confirmerSuppression);
    });

    // Recherche sur la liste utilisateurs / artisans
    var searchInput = document.getElementById("search-user") || document.getElementById("search-artisan");
    var userTable = document.querySelector(".user-table");
    if (searchInput && userTable) {
        searchInput.addEventListener("input", function () {
            var filtre = searchInput.value.toLowerCase();
            var rows = userTable.querySelectorAll("tbody tr");
            rows.forEach(function (row) {
                var nom = row.querySelector("td:first-child").textContent.toLowerCase();
                row.style.display = nom.includes(filtre) ? "" : "none";
            });
        });
    }
});
