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
        
        // Sélecteur de langue
        "language-fr": "Français",
        "language-en": "English",
        
        // Nouvelles options d'évaluation
        "choose-evaluation-type": "Choisissez votre type d'évaluation :",
        "full-evaluation-title": "Évaluation complète",
        "full-evaluation-desc": "Analysez l'incident de violation de données et obtenez une évaluation détaillée de vos obligations.",
        "data-breach-title": "Données volées ou consultées",
        "data-breach-desc": "Évaluez rapidement vos obligations selon le type de données compromises.",
        "company-size-title": "Par taille d'entreprise",
        "company-size-desc": "Consultez les obligations réglementaires selon la taille et le secteur de votre entreprise.",
        "start-full-evaluation": "Commencer l'évaluation",
        "start-data-breach-evaluation": "Évaluer l'impact",
        "start-company-size-evaluation": "Vérifier les obligations",
        
        // Évaluation rapide des données
        "quick-eval-title": "Évaluation rapide - Données compromises",
        "quick-eval-desc": "Sélectionnez les types de données qui ont été compromises pour obtenir une évaluation rapide de vos obligations.",
        "data-type-sensitive": "Données sensibles (santé, biométriques, génétiques, orientation sexuelle, etc.)",
        "btn-evaluate-quick": "Évaluer maintenant",
        
        // Évaluation par taille d'entreprise
        "company-eval-title": "Évaluation par taille d'entreprise et secteur",
        "company-eval-desc": "Indiquez la taille de votre entreprise et votre secteur d'activité pour connaître vos obligations réglementaires.",
        "company-size-label": "Taille de l'entreprise :",
        "company-size-placeholder": "-- Sélectionnez --",
        "company-size-micro": "Micro-entreprise (moins de 10 employés)",
        "company-size-small": "Petite entreprise (10 à 49 employés)",
        "company-size-medium": "Moyenne entreprise (50 à 249 employés)",
        "company-size-large": "Grande entreprise (250 employés et plus)",
        "company-sector-label": "Secteur d'activité principal :",
        "company-sector-placeholder": "-- Sélectionnez --",
        "sector-dora-group": "Secteurs financiers (DORA)",
        "sector-nis2-essential-group": "Entités essentielles (NIS2)",
        "sector-nis2-important-group": "Entités importantes (NIS2)",
        "sector-other-group": "Autres secteurs",
        "sector-retail": "Commerce de détail",
        "sector-education": "Éducation",
        "sector-other-option": "Autre",
        "btn-evaluate-company": "Vérifier les obligations",
        
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
        
        // Étape 3: Informations sur l'entreprise
        "step-3-title": "Étape 3: Informations sur votre organisation",
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
        
        // Boutons
        "btn-next": "Suivant",
        "btn-prev": "Précédent",
        "btn-evaluate": "Évaluer",
        "btn-back": "Retour",
        "btn-back-to-home": "Retour à l'accueil",
        "btn-download-report": "Télécharger le rapport",
        
        // Résultats
        "results-title": "Résultats de l'évaluation",
        "notification-required-title": "Notification à l'autorité de contrôle requise",
        "notification-not-required-title": "Notification à l'autorité de contrôle non requise",
        "notification-dora-title": "Obligations DORA applicables",
        "notification-nis2-title": "Obligations NIS2 applicables",
        
        // Pied de page
        "footer-copyright": "© 2025 Outil d'Évaluation d'Impact Réglementaire",
        "footer-disclaimer": "Cet outil est fourni à titre informatif et ne remplace pas un avis juridique professionnel."
    },
    en: {
        // Titres et en-têtes
        "title": "GDPR, DORA and NIS2 Impact Assessment Tool",
        "main-title": "Regulatory Impact Assessment Tool",
        "main-subtitle": "Assess your obligations under GDPR, DORA and NIS2 following a data breach",
        
        // Section d'introduction
        "intro-title": "Data Breach Impact Assessment",
        "intro-description": "This tool helps you determine your regulatory obligations (GDPR, DORA, NIS2) in case of a personal data breach, and guides you in preparing the necessary documents according to your sector and company size.",
        
        // Sélecteur de langue
        "language-fr": "Français",
        "language-en": "English",
        
        // Nouvelles options d'évaluation
        "choose-evaluation-type": "Choose your evaluation type:",
        "full-evaluation-title": "Complete Assessment",
        "full-evaluation-desc": "Analyze the data breach incident and get a detailed assessment of your obligations.",
        "data-breach-title": "Stolen or Accessed Data",
        "data-breach-desc": "Quickly assess your obligations based on the type of compromised data.",
        "company-size-title": "By Company Size",
        "company-size-desc": "Check regulatory obligations according to your company size and sector.",
        "start-full-evaluation": "Start Assessment",
        "start-data-breach-evaluation": "Assess Impact",
        "start-company-size-evaluation": "Check Obligations",
        
        // Évaluation rapide des données
        "quick-eval-title": "Quick Assessment - Compromised Data",
        "quick-eval-desc": "Select the types of data that have been compromised to get a quick assessment of your obligations.",
        "data-type-sensitive": "Sensitive data (health, biometric, genetic, sexual orientation, etc.)",
        "btn-evaluate-quick": "Assess Now",
        
        // Évaluation par taille d'entreprise
        "company-eval-title": "Assessment by Company Size and Sector",
        "company-eval-desc": "Indicate your company size and business sector to know your regulatory obligations.",
        "company-size-label": "Company size:",
        "company-size-placeholder": "-- Select --",
        "company-size-micro": "Micro-enterprise (less than 10 employees)",
        "company-size-small": "Small enterprise (10 to 49 employees)",
        "company-size-medium": "Medium enterprise (50 to 249 employees)",
        "company-size-large": "Large enterprise (250+ employees)",
        "company-sector-label": "Main business sector:",
        "company-sector-placeholder": "-- Select --",
        "sector-dora-group": "Financial Sectors (DORA)",
        "sector-nis2-essential-group": "Essential Entities (NIS2)",
        "sector-nis2-important-group": "Important Entities (NIS2)",
        "sector-other-group": "Other Sectors",
        "sector-retail": "Retail",
        "sector-education": "Education",
        "sector-other-option": "Other",
        "btn-evaluate-company": "Check Obligations",
        
        // Étapes du formulaire
        "step-1-title": "Step 1: General Information About the Incident",
        "breach-date-label": "Date of breach discovery:",
        "breach-type-label": "Type of breach:",
        "breach-type-placeholder": "-- Select --",
        "breach-description-label": "Description of the incident:",
        
        // Types de violations
        "breach-type-unauthorized-access": "Unauthorized access",
        "breach-type-theft": "Data theft",
        "breach-type-data-loss": "Data loss",
        "breach-type-data-alteration": "Data alteration",
        "breach-type-disclosure": "Unauthorized disclosure",
        "breach-type-ransomware": "Ransomware attack",
        "breach-type-ddos": "DDoS attack",
        "breach-type-supply-chain": "Supply chain incident",
        "breach-type-other": "Other",
        
        // Étape 2: Types de données
        "step-2-title": "Step 2: Types of Data Affected",
        "data-types-question": "What types of personal data were affected? (Check all that apply)",
        
        // Types de données
        "data-type-identification": "Identification data (name, surname, address)",
        "data-type-contact": "Contact details (email, phone)",
        "data-type-financial": "Financial data (bank details, card numbers)",
        "data-type-authentication": "IDs and passwords",
        "data-type-official": "Official ID documents (passport, ID card, etc.)",
        "data-type-health": "Health data",
        "data-type-biometric": "Biometric data",
        "data-type-genetic": "Genetic data",
        "data-type-sexual": "Sexual orientation, sex life",
        "data-type-criminal": "Criminal convictions, offenses",
        "data-type-political": "Political opinions, religious or philosophical beliefs",
        "data-type-racial": "Racial or ethnic origin",
        "data-type-other": "Other types of data",
        "data-type-other-description-label": "Please specify other data types:",
        
        // Étape 3: Informations sur l'entreprise
        "step-3-title": "Step 3: Information About Your Organization",
        "employee-count-label": "Number of employees:",
        "annual-revenue-label": "Annual revenue (in euros):",
        "sector-types-label": "Business sector (check all that apply):",
        
        // Secteurs DORA et NIS2
        "sector-financial-institutions": "Financial Entities (DORA)",
        "sector-financial-institution": "Financial institution (bank, credit institution)",
        "sector-investment-firm": "Investment firm",
        "sector-insurance": "Insurance company",
        "sector-payment": "Payment service",
        "sector-crypto": "Crypto-asset service provider",
        "sector-ict": "ICT service provider for the financial sector",
        
        "sector-nis2-essential": "Essential Entities (NIS2)",
        "sector-energy": "Energy (electricity, gas, oil)",
        "sector-transport": "Transport (air, rail, maritime, road)",
        "sector-banking": "Banking (credit institutions)",
        "sector-healthcare": "Healthcare (hospitals, laboratories, medical manufacturers)",
        "sector-water": "Drinking water (production, distribution, treatment)",
        "sector-digital-infra": "Digital infrastructure (DNS, TLD, cloud)",
        "sector-public-admin": "Public administration",
        "sector-space": "Space (space infrastructures)",
        
        "sector-nis2-important": "Important Entities (NIS2)",
        "sector-postal": "Postal and delivery services",
        "sector-waste": "Waste management",
        "sector-manufacturing": "Manufacturing (medical devices, chemicals, etc.)",
        "sector-digital-providers": "Digital providers (marketplaces, search engines)",
        "sector-research": "Research and higher education",
        
        "sector-other": "Other business sector",
        "sector-other-description-label": "Please specify your business sector:",
        
        // Boutons
        "btn-next": "Next",
        "btn-prev": "Previous",
        "btn-evaluate": "Evaluate",
        "btn-back": "Back",
        "btn-back-to-home": "Back to Home",
        "btn-download-report": "Download Report",
        
        // Résultats
        "results-title": "Assessment Results",
        "notification-required-title": "Notification to the supervisory authority required",
        "notification-not-required-title": "Notification to the supervisory authority not required",
        "notification-dora-title": "DORA obligations applicable",
        "notification-nis2-title": "NIS2 obligations applicable",
        
        // Pied de page
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
    
    // Mise à jour des attributs data-i18n dans les options des select
    document.querySelectorAll('option[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translate(key, lang);
    });
    
    // Mise à jour des attributs data-i18n dans les optgroup
    document.querySelectorAll('optgroup[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.label = translate(key, lang);
    });
    
    // Animation subtile pour indiquer le changement
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.classList.add('language-changing');
        setTimeout(() => {
            element.classList.remove('language-changing');
        }, 300);
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
