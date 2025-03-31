/**
 * Outil d'évaluation d'impact RGPD
 * Script principal de l'application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const startButton = document.getElementById('start-evaluation');
    const evaluationForm = document.getElementById('evaluation-form');
    const introSection = document.getElementById('intro');
    const dataBreachForm = document.getElementById('data-breach-form');
    const evaluationResult = document.getElementById('evaluation-result');
    const notificationRequired = document.getElementById('notification-required');
    const notificationNotRequired = document.getElementById('notification-not-required');
    const documentPreview = document.getElementById('document-preview');
    const documentContent = document.getElementById('document-content');
    const generateNotificationBtn = document.getElementById('generate-notification');
    const generateDocumentationBtn = document.getElementById('generate-documentation');
    const editEvaluationBtn = document.getElementById('edit-evaluation');
    const downloadDocumentBtn = document.getElementById('download-document');
    
    // Variables pour suivre l'étape actuelle
    let currentStep = 1;
    const totalSteps = 4;
    
    // Initialisation
    initEventListeners();
    
    /**
     * Initialise tous les event listeners
     */
    function initEventListeners() {
        // Démarrer l'évaluation
        startButton.addEventListener('click', startEvaluation);
        
        // Navigation entre les étapes
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
        
        nextButtons.forEach(button => {
            button.addEventListener('click', goToNextStep);
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', goToPrevStep);
        });
        
        // Soumission du formulaire
        dataBreachForm.addEventListener('submit', evaluateDataBreach);
        
        // Autres types de données - Afficher/masquer le champ de détails
        const dataOtherCheckbox = document.getElementById('data-other');
        dataOtherCheckbox.addEventListener('change', toggleOtherDataDetails);
        
        // Information des personnes concernées - Afficher/masquer les champs associés
        const informedRadios = document.querySelectorAll('input[name="persons-informed"]');
        informedRadios.forEach(radio => {
            radio.addEventListener('change', toggleInformedDetails);
        });
        
        // Génération de documents
        if (generateNotificationBtn) {
            generateNotificationBtn.addEventListener('click', generateNotificationDocument);
        }
        
        if (generateDocumentationBtn) {
            generateDocumentationBtn.addEventListener('click', generateInternalDocument);
        }
        
        // Édition de l'évaluation
        if (editEvaluationBtn) {
            editEvaluationBtn.addEventListener('click', editEvaluation);
        }
        
        // Téléchargement du document
        if (downloadDocumentBtn) {
            downloadDocumentBtn.addEventListener('click', downloadDocument);
        }
    }
    
    /**
     * Commence l'évaluation en affichant le formulaire
     */
    function startEvaluation() {
        introSection.classList.add('hidden');
        evaluationForm.classList.remove('hidden');
        showStep(1);
    }
    
    /**
     * Affiche l'étape spécifiée du formulaire
     */
    function showStep(step) {
        // Cacher toutes les étapes
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach(formStep => {
            formStep.classList.add('hidden');
        });
        
        // Afficher l'étape demandée
        document.getElementById(`step-${step}`).classList.remove('hidden');
        currentStep = step;
    }
    
    /**
     * Passe à l'étape suivante du formulaire
     */
    function goToNextStep() {
        // Validation de l'étape actuelle
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
        }
    }
    
    /**
     * Retourne à l'étape précédente du formulaire
     */
    function goToPrevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }
    
    /**
     * Valide les champs de l'étape actuelle
     */
    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                // Pour les groupes de cases à cocher, vérifie si au moins une est cochée
                const name = field.getAttribute('name');
                const checked = document.querySelector(`input[name="${name}"]:checked`);
                
                if (!checked) {
                    isValid = false;
                    highlightError(field.parentElement.parentElement);
                }
            } else if (!field.value.trim()) {
                isValid = false;
                highlightError(field);
            } else {
                removeError(field);
            }
        });
        
        // Vérifications spécifiques à certaines étapes
        if (currentStep === 2) {
            // Vérifier qu'au moins un type de données est sélectionné
            const dataTypesChecked = document.querySelectorAll('input[name="data-types"]:checked');
            if (dataTypesChecked.length === 0) {
                isValid = false;
                highlightError(document.querySelector('.checkbox-group'));
            } else {
                removeError(document.querySelector('.checkbox-group'));
            }
        }
        
        return isValid;
    }
    
    /**
     * Met en évidence un champ en erreur
     */
    function highlightError(field) {
        field.classList.add('error');
        
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Ce champ est requis';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
    }
    
    /**
     * Supprime la mise en évidence d'erreur
     */
    function removeError(field) {
        field.classList.remove('error');
        
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.parentNode.removeChild(field.nextElementSibling);
        }
    }
    
    /**
     * Affiche/masque le champ de détails pour "Autres types de données"
     */
    function toggleOtherDataDetails() {
        const dataOtherCheckbox = document.getElementById('data-other');
        const dataOtherDetails = document.querySelector('.data-other-details');
        
        if (dataOtherCheckbox.checked) {
            dataOtherDetails.classList.remove('hidden');
            document.getElementById('data-other-description').setAttribute('required', '');
        } else {
            dataOtherDetails.classList.add('hidden');
            document.getElementById('data-other-description').removeAttribute('required');
        }
    }
    
    /**
     * Affiche/masque les champs associés à l'information des personnes concernées
     */
    function toggleInformedDetails() {
        const informedValue = document.querySelector('input[name="persons-informed"]:checked').value;
        const informedDetails = document.querySelector('.informed-details');
        const plannedInformDetails = document.querySelector('.planned-inform-details');
        
        informedDetails.classList.add('hidden');
        plannedInformDetails.classList.add('hidden');
        
        document.getElementById('informed-date').removeAttribute('required');
        document.getElementById('planned-informed-date').removeAttribute('required');
        
        if (informedValue === 'yes') {
            informedDetails.classList.remove('hidden');
            document.getElementById('informed-date').setAttribute('required', '');
        } else if (informedValue === 'planned') {
            plannedInformDetails.classList.remove('hidden');
            document.getElementById('planned-informed-date').setAttribute('required', '');
        }
    }
    
    /**
     * Évalue la violation de données et affiche les résultats
     */
    function evaluateDataBreach(event) {
        event.preventDefault();
        
        // Collecter les données du formulaire
        const formData = new FormData(dataBreachForm);
        const breachData = Object.fromEntries(formData.entries());
        
        // Ajouter les cases à cocher (qui peuvent avoir plusieurs valeurs)
        breachData.dataTypes = [];
        const checkedDataTypes = document.querySelectorAll('input[name="data-types"]:checked');
        
        checkedDataTypes.forEach(checkbox => {
            breachData.dataTypes.push(checkbox.value);
        });
        
        // Analyser les données collectées
        const evaluationResults = evaluateNotificationRequirement(breachData);
        
        // Afficher les résultats
        displayEvaluationResults(evaluationResults);
        
        // Masquer le formulaire et afficher les résultats
        evaluationForm.classList.add('hidden');
        evaluationResult.classList.remove('hidden');
    }
    
    /**
     * Détermine si une notification à l'APD est requise
     */
    function evaluateNotificationRequirement(breachData) {
        const results = {
            isNotificationRequired: false,
            reasons: [],
            applicableArticles: [],
            justification: [],
            nextSteps: []
        };
        
        // Vérifier si le niveau d'impact est significatif ou plus élevé
        const impactLevels = ['minimal', 'limited', 'significant', 'severe', 'critical'];
        const impactIndex = impactLevels.indexOf(breachData['impact-level']);
        
        if (impactIndex >= 2) { // significant ou plus
            results.isNotificationRequired = true;
            results.reasons.push('Le niveau d\'impact sur les personnes concernées est jugé significatif ou plus élevé.');
        }
        
        // Vérifier les types de données sensibles
        const sensitiveDataTypes = ['health', 'biometric', 'genetic', 'sexual', 'criminal', 'political', 'racial'];
        const hasSensitiveData = breachData.dataTypes.some(type => sensitiveDataTypes.includes(type));
        
        if (hasSensitiveData) {
            results.isNotificationRequired = true;
            results.reasons.push('La violation concerne des données sensibles ou à caractère hautement personnel.');
            results.applicableArticles.push('Article 9 du RGPD - Traitement de catégories particulières de données');
        }
        
        // Vérifier le nombre de personnes affectées
        if (parseInt(breachData['affected-persons']) > 500) {
            results.isNotificationRequired = true;
            results.reasons.push(`La violation affecte un nombre important de personnes (${breachData['affected-persons']}).`);
        }
        
        // Vérifier les données financières
        if (breachData.dataTypes.includes('financial') || breachData.dataTypes.includes('official')) {
            results.isNotificationRequired = true;
            results.reasons.push('La violation concerne des données financières ou des documents d\'identité officiels.');
        }
        
        // Les articles du RGPD toujours applicables
        results.applicableArticles.push('Article 33 - Notification à l\'autorité de contrôle');
        
        if (results.isNotificationRequired) {
            // Si notification nécessaire, ajouter l'article 34 si impact sévère ou critique
            if (impactIndex >= 3) { // severe ou critical
                results.applicableArticles.push('Article 34 - Communication à la personne concernée');
                results.nextSteps.push('Informer les personnes concernées de la violation dans les meilleurs délais.');
            }
            
            // Étapes à suivre si notification est requise
            results.nextSteps.push('Documenter la violation dans votre registre des violations.');
            results.nextSteps.push('Préparer la notification à l\'APD en suivant le format requis.');
            results.nextSteps.push('Soumettre la notification dans les 72 heures suivant la découverte de la violation.');
            results.nextSteps.push('Mettre en œuvre les mesures correctives identifiées pour limiter l\'impact.');
        } else {
            // Justification si notification n'est pas requise
            results.justification.push('La violation n\'est pas susceptible d\'engendrer un risque pour les droits et libertés des personnes concernées.');
            
            if (impactIndex < 2) {
                results.justification.push(`Le niveau d'impact est jugé ${breachData['impact-level']}, ce qui est insuffisant pour nécessiter une notification.`);
            }
            
            if (!hasSensitiveData) {
                results.justification.push('La violation ne concerne pas de données sensibles ou à caractère hautement personnel.');
            }
            
            // Étapes à suivre si notification n'est pas requise
            results.nextSteps.push('Documenter la violation et la décision de ne pas notifier dans votre registre des violations.');
            results.nextSteps.push('Mettre en œuvre les mesures correctives pour éviter que cet incident ne se reproduise.');
            results.nextSteps.push('Réévaluer régulièrement les mesures de sécurité et de protection des données.');
        }
        
        return results;
    }
    
    /**
     * Affiche les résultats de l'évaluation
     */
    function displayEvaluationResults(results) {
        if (results.isNotificationRequired) {
            notificationRequired.classList.remove('hidden');
            notificationNotRequired.classList.add('hidden');
            
            // Remplir les raisons
            const reasonsList = document.getElementById('notification-reasons');
            reasonsList.innerHTML = results.reasons.map(reason => `<p>- ${reason}</p>`).join('');
            
            // Remplir les articles applicables
            const articlesList = document.getElementById('applicable-articles');
            articlesList.innerHTML = results.applicableArticles.map(article => `<p>- ${article}</p>`).join('');
            
            // Remplir le délai
            const breachDate = new Date(document.getElementById('breach-date').value);
            const deadlineDate = new Date(breachDate.getTime() + (72 * 60 * 60 * 1000)); // +72 heures
            
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedBreachDate = breachDate.toLocaleDateString('fr-FR', options);
            const formattedDeadlineDate = deadlineDate.toLocaleDateString('fr-FR', options);
            
            const deadlineInfo = document.querySelector('.deadline-info');
            deadlineInfo.innerHTML = `
                <p>Date de découverte: <strong>${formattedBreachDate}</strong></p>
                <p>Date limite de notification: <strong>${formattedDeadlineDate}</strong></p>
            `;
            
            // Remplir les prochaines étapes
            const nextStepsList = document.getElementById('next-steps-required');
            nextStepsList.innerHTML = results.nextSteps.map(step => `<li>${step}</li>`).join('');
        } else {
            notificationRequired.classList.add('hidden');
            notificationNotRequired.classList.remove('hidden');
            
            // Remplir la justification
            const justificationList = document.getElementById('justification');
            justificationList.innerHTML = results.justification.map(reason => `<p>- ${reason}</p>`).join('');
            
            // Remplir les raisons de non-notification
            document.getElementById('non-notification-reasons').innerHTML = '<p>Selon l\'analyse des informations fournies, cette violation ne présente pas un risque significatif pour les droits et libertés des personnes concernées.</p>';
            
            // Remplir les prochaines étapes
            const nextStepsList = document.getElementById('next-steps-not-required');
            nextStepsList.innerHTML = results.nextSteps.map(step => `<li>${step}</li>`).join('');
        }
    }
    
    /**
     * Génère le document de notification pour l'APD
     */
    function generateNotificationDocument() {
        // Utiliser le module document-generator.js pour créer le document
        const notificationDoc = window.documentGenerator.generateNotificationDocument(getFormData());
        
        // Afficher le document
        documentContent.innerHTML = notificationDoc;
        
        // Masquer les résultats et afficher le document
        evaluationResult.classList.add('hidden');
        documentPreview.classList.remove('hidden');
    }
    
    /**
     * Génère le document de documentation interne
     */
    function generateInternalDocument() {
        // Utiliser le module document-generator.js pour créer le document
        const internalDoc = window.documentGenerator.generateInternalDocument(getFormData());
        
        // Afficher le document
        documentContent.innerHTML = internalDoc;
        
        // Masquer les résultats et afficher le document
        evaluationResult.classList.add('hidden');
        documentPreview.classList.remove('hidden');
    }
    
    /**
     * Récupère toutes les données du formulaire
     */
    function getFormData() {
        const formData = new FormData(dataBreachForm);
        const data = Object.fromEntries(formData.entries());
        
        // Ajouter les cases à cocher (qui peuvent avoir plusieurs valeurs)
        data.dataTypes = [];
        const checkedDataTypes = document.querySelectorAll('input[name="data-types"]:checked');
        
        checkedDataTypes.forEach(checkbox => {
            data.dataTypes.push(checkbox.value);
        });
        
        return data;
    }
    
    /**
     * Permet d'éditer l'évaluation
     */
    function editEvaluation() {
        documentPreview.classList.add('hidden');
        evaluationForm.classList.remove('hidden');
        showStep(1);
    }
    
    /**
     * Télécharge le document généré
     */
    function downloadDocument() {
        const docType = notificationRequired.classList.contains('hidden') ? 'documentation-interne' : 'notification-apd';
        const fileName = `${docType}-violation-donnees-${new Date().toISOString().slice(0, 10)}.html`;
        
        // Créer un élément blob avec le contenu HTML
        const blob = new Blob([documentContent.innerHTML], { type: 'text/html' });
        
        // Créer un lien pour télécharger le fichier
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        
        // Ajouter le lien au document, cliquer dessus, puis le supprimer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
