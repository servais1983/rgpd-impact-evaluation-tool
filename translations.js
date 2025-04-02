// Fichier de traductions multilingues
const translations = {
    fr: {
        // Sections des résultats
        "rgpd-results-title": "Résultats de l'Évaluation RGPD",
        "dora-nis2-results-title": "Résultats DORA/NIS2",
        "data-theft-results-title": "Résultats Vol de Données",
        "document-overview-title": "Aperçu du Document",

        // Boutons et navigation
        "change-language": "Changer de langue",
        "french": "Français",
        "english": "Anglais",

        // Messages généraux
        "loading": "Chargement...",
        "processing": "Traitement en cours...",
        "save": "Enregistrer",
        "cancel": "Annuler",

        // Messages d'erreur
        "error-form-submission": "Erreur lors de la soumission du formulaire",
        "error-data-load": "Impossible de charger les données",
        "error-generic": "Une erreur est survenue",

        // Éléments spécifiques de l'outil RGPD
        "impact-assessment": "Évaluation d'Impact",
        "notification-required": "Notification à l'Autorité de Protection des Données Requise",
        "severity-level": "Niveau de Gravité",
        "data-categories": "Catégories de Données",
        "personal-data-breach": "Violation de Données Personnelles"
    },
    en: {
        // Sections des résultats
        "rgpd-results-title": "GDPR Impact Assessment Results",
        "dora-nis2-results-title": "DORA/NIS2 Results",
        "data-theft-results-title": "Data Theft Results", 
        "document-overview-title": "Document Overview",

        // Boutons et navigation
        "change-language": "Change Language",
        "french": "French",
        "english": "English",

        // Messages généraux
        "loading": "Loading...",
        "processing": "Processing...",
        "save": "Save",
        "cancel": "Cancel",

        // Messages d'erreur
        "error-form-submission": "Error submitting form",
        "error-data-load": "Unable to load data",
        "error-generic": "An error occurred",

        // Éléments spécifiques de l'outil RGPD
        "impact-assessment": "Impact Assessment",
        "notification-required": "Notification to Data Protection Authority Required",
        "severity-level": "Severity Level",
        "data-categories": "Data Categories", 
        "personal-data-breach": "Personal Data Breach"
    }
};

// Fonction de traduction
function translate(key, language = 'fr') {
    return translations[language][key] || key;
}

// Fonction pour changer la langue
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translate(key, lang);
    });
}

// Charger la langue sauvegardée au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    changeLanguage(savedLanguage);
    
    // Mettre à jour le sélecteur de langue
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.value = savedLanguage;
    }
});
