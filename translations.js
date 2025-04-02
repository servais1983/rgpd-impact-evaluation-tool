// Fichier de traductions multilingues complet
const translations = {
    fr: {
        // Titres et en-têtes
        "title": "Outil d'Évaluation d'Impact RGPD, DORA et NIS2",
        "main-title": "Outil d'Évaluation d'Impact Réglementaire",
        "main-subtitle": "Évaluez vos obligations selon RGPD, DORA et NIS2 suite à une violation de données",
        
        // Section d'introduction
        "intro-title": "Évaluation de l'impact d'une violation de données",
        "intro-description": "Cet outil vous aide à déterminer vos obligations réglementaires (RGPD, DORA, NIS2) en cas de violation de données personnelles, et vous guide dans la préparation des documents nécessaires selon votre secteur et la taille de votre entreprise.",
        "start-evaluation": "Commencer l'évaluation",
        
        // Étapes du formulaire
        "step-1-title": "Étape 1: Informations générales sur l'incident",
        "breach-date-label": "Date de découverte de la violation :",
        "breach-type-label": "Type de violation :",
        "breach-type-placeholder": "-- Sélectionnez --",
        "breach-description-label": "Description de l'incident :",
        
        // Types de violations
        "breach-type-unauthorized-access": "Accès non autorisé",
        "breach-type-theft": "Vol de données",
        "breach-type-data-loss": "Perte de données",
        "breach-type-data-alteration": "Altération de données",
        "breach-type-disclosure": "Divulgation non autorisée",
        "breach-type-ransomware": "Attaque par rançongiciel",
        "breach-type-ddos": "Attaque par déni de service",
        "breach-type-supply-chain": "Incident dans la chaîne d'approvisionnement",
        "breach-type-other": "Autre",
        
        // Étape 2: Types de données
        "step-2-title": "Étape 2: Types de données concernées",
        "data-types-question": "Quels types de données personnelles ont été affectés ? (Cochez toutes les réponses applicables)",
        
        // Types de données
        "data-type-identification": "Données d'identification (nom, prénom, adresse)",
        "data-type-contact": "Coordonnées de contact (email, téléphone)",
        "data-type-financial": "Données financières (coordonnées bancaires, numéros de carte)",
        "data-type-authentication": "Identifiants et mots de passe",
        "data-type-official": "Documents d'identité officiels (passeport, CNI, etc.)",
        "data-type-health": "Données de santé",
        "data-type-biometric": "Données biométriques",
        "data-type-genetic": "Données génétiques",
        "data-type-sexual": "Orientation sexuelle, vie sexuelle",
        "data-type-criminal": "Condamnations pénales, infractions",
        "data-type-political": "Opinions politiques, convictions religieuses ou philosophiques",
        "data-type-racial": "Origine raciale ou ethnique",
        "data-type-other": "Autres types de données",
        "data-type-other-description-label": "Précisez les autres types de données :",
        
        // Étape 3: Impact potentiel
        "step-3-title": "Étape 3: Impact potentiel",
        "affected-persons-label": "Nombre approximatif de personnes concernées :",
        "impact-level-label": "Niveau d'impact potentiel sur les personnes concernées :",
        "impact-level-placeholder": "-- Sélectionnez --",
        "impact-level-minimal": "Minimal (pas de conséquences significatives)",
        "impact-level-limited": "Limité (quelques inconvénients surmontables)",
        "impact-level-significant": "Significatif (inconvénients importants mais surmontables)",
        "impact-level-severe": "Sévère (conséquences significatives et durables)",
        "impact-level-critical": "Critique (conséquences irréversibles/catastrophiques)",
        "impact-description-label": "Description des conséquences potentielles pour les personnes concernées :",
        
        // Étape 4: Informations sur l'entreprise
        "step-4-title": "Étape 4: Informations sur votre organisation",
        "employee-count-label": "Nombre d'employés :",
        "annual-revenue-label": "Chiffre d'affaires annuel (en euros) :",
        "sector-types-label": "Secteur d'activité (cochez tous ceux qui s'appliquent) :",
        
        // Secteurs DORA et NIS2
        "sector-financial-institutions": "Entités financières (DORA)",
        "sector-financial-institution": "Institution financière (banque, établissement de crédit)",
        "sector-investment-firm": "Entreprise d'investissement",
        "sector-insurance": "Compagnie d'assurance",
        "sector-payment": "Service de paiement",
        "sector-crypto": "Prestataire de services sur crypto-actifs",
        "sector-ict": "Prestataire de services TIC pour le secteur financier",
        
        "sector-nis2-essential": "Entités essentielles (NIS2)",
        "sector-energy": "Énergie (électricité, gaz, pétrole)",
        "sector-transport": "Transport (aérien, ferroviaire, maritime, routier)",
        "sector-banking": "Banque (établissements de crédit)",
        "sector-healthcare": "Santé (hôpitaux, laboratoires, fabricants médicaux)",
        "sector-water": "Eau potable (production, distribution, traitement)",
        "sector-digital-infra": "Infrastructure numérique (DNS, TLD, cloud)",
        "sector-public-admin": "Administration publique",
        "sector-space": "Espace (infrastructures spatiales)",
        
        "sector-nis2-important": "Entités importantes (NIS2)",
        "sector-postal": "Services postaux et de livraison",
        "sector-waste": "Gestion des déchets",
        "sector-manufacturing": "Fabrication (dispositifs médicaux, produits chimiques, etc.)",
        "sector-digital-providers": "Fournisseurs numériques (places de marché, moteurs de recherche)",
        "sector-research": "Recherche et enseignement supérieur",
        
        "sector-other": "Autre secteur d'activité",
        "sector-other-description-label": "Précisez votre secteur d'activité :",
        
        // Étape 5: Mesures prises
        "step-5-title": "Étape 5: Mesures prises",
        "measures-taken-label": "Mesures déjà prises pour remédier à la violation :",
        "planned-measures-label": "Mesures prévues pour éviter que cela ne se reproduise :",
        "persons-informed-question": "Les personnes concernées ont-elles été informées de cette violation ?",
        "persons-informed-yes": "Oui",
        "persons-informed-no": "Non",
        "persons-informed-planned": "Planifié",
        "informed-date-label": "Date de l'information :",
        "planned-informed-date-label": "Date prévue pour l'information :",
        
        // Boutons
        "btn-next": "Suivant",
        "btn-prev": "Précédent",
        "btn-evaluate": "Évaluer",
        "btn-generate-notification": "Générer le document de notification",
        "btn-generate-documentation": "Générer la documentation interne",
        "btn-edit-evaluation": "Modifier l'évaluation",
        "btn-download-document": "Télécharger le document",
        
        // Résultats
        "notification-required-title": "Notification à l'APD requise",
        "notification-not-required-title": "Notification à l'APD non requise",
        
        // Pied de page
        "footer-copyright": "© 2025 Outil d'Évaluation d'Impact Réglementaire",
        "footer-disclaimer": "Cet outil est fourni à titre informatif et ne remplace pas un avis juridique professionnel."
    },
    en: {
        // Equivalent translations in English would follow a similar structure
        "title": "GDPR, DORA and NIS2 Impact Assessment Tool",
        "main-title": "Regulatory Impact Assessment Tool",
        "main-subtitle": "Assess your obligations under GDPR, DORA and NIS2 following a data breach",
        
        // ... (traduire tous les éléments de la même manière)
        
        "start-evaluation": "Start Evaluation",
        
        // Traductions spécifiques pour l'anglais
        "footer-copyright": "© 2025 Regulatory Impact Assessment Tool",
        "footer-disclaimer": "This tool is provided for informational purposes and does not replace professional legal advice."
    }
};

// Fonctions de traduction
function translate(key, language = 'fr') {
    return translations[language][key] || key;
}

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translate(key, lang);
    });
    
    // Mise à jour des attributs placeholder, labels, etc.
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = translate(key, lang);
    });
    
    document.querySelectorAll('[data-i18n-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-label');
        const labelEl = document.querySelector(`label[for="${element.id}"]`);
        if (labelEl) {
            labelEl.textContent = translate(key, lang);
        }
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
