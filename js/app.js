/**
 * Fonctions de traduction ajoutées
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des traductions dynamiques
    function initTranslations() {
        // Mettre à jour tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translatedText = translate(key, getCurrentLanguage());
            element.textContent = translatedText;
        });
    }

    // Obtenir la langue courante
    function getCurrentLanguage() {
        return localStorage.getItem('selectedLanguage') || 'fr';
    }

    // Modifier les messages d'erreur et les traductions dynamiques
    function updateDynamicContent(language) {
        // Mise à jour des erreurs et messages dynamiques
        const errorMessages = {
            fr: {
                requiredField: 'Ce champ est requis',
                formSubmissionError: 'Erreur lors de la soumission du formulaire',
                dataLoadError: 'Impossible de charger les données'
            },
            en: {
                requiredField: 'This field is required',
                formSubmissionError: 'Error submitting form',
                dataLoadError: 'Unable to load data'
            }
        };

        // Exemple de mise à jour des messages d'erreur
        const currentErrorMessages = errorMessages[language];
        
        // Mettre à jour les éléments qui ont des messages dynamiques
        document.querySelectorAll('.error-message').forEach(errorEl => {
            errorEl.textContent = currentErrorMessages.requiredField;
        });
    }

    // Ajouter un écouteur pour le changement de langue
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
            initTranslations();
            updateDynamicContent(selectedLanguage);
        });
    }

    // Initialiser les traductions au chargement
    initTranslations();
    updateDynamicContent(getCurrentLanguage());
});

// Le reste de votre code app.js reste inchangé
