/**
 * Outil d'évaluation d'impact RGPD
 * Générateur de documents de notification et de documentation interne
 */

(function() {
    /**
     * Génère un document de notification pour l'Autorité de Protection des Données
     */
    function generateNotificationDocument(formData) {
        // Formatage de la date actuelle
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        
        // Formater les types de données affectées
        let dataTypesText = '';
        if (formData.dataTypes && formData.dataTypes.length > 0) {
            dataTypesText = formatDataTypes(formData.dataTypes);
        }
        
        // Déterminer les articles applicables
        const applicableArticles = window.rgpdRules.getApplicableArticles(formData);
        const articlesText = applicableArticles.map(articleNum => {
            const article = window.rgpdRules.getArticleInfo(articleNum);
            return `<li>Article ${articleNum} - ${article.title}</li>`;
        }).join('');
        
        // Construire le document HTML
        return `
            <div class="notification-document">
                <div class="document-header">
                    <h2>NOTIFICATION DE VIOLATION DE DONNÉES À CARACTÈRE PERSONNEL</h2>
                    <p class="subtitle">En application de l'article 33 du Règlement Général sur la Protection des Données</p>
                </div>
                
                <div class="document-section">
                    <h3>1. INFORMATIONS SUR LE RESPONSABLE DE TRAITEMENT</h3>
                    <p><strong>Nom de l'organisme :</strong> [Nom de votre organisation]</p>
                    <p><strong>Adresse :</strong> [Adresse complète]</p>
                    <p><strong>Personne à contacter :</strong> [Nom du DPO ou personne en charge]</p>
                    <p><strong>Email :</strong> [Email de contact]</p>
                    <p><strong>Téléphone :</strong> [Numéro de téléphone]</p>
                </div>
                
                <div class="document-section">
                    <h3>2. INFORMATIONS SUR LA VIOLATION</h3>
                    <p><strong>Date et heure de la découverte :</strong> ${formData['breach-date'] || '[À remplir]'}</p>
                    <p><strong>Date et heure de la violation (si connue) :</strong> [À remplir]</p>
                    <p><strong>Circonstances de la découverte :</strong> [À remplir]</p>
                    <p><strong>Nature de la violation :</strong> ${getBreachTypeName(formData['breach-type'])}</p>
                    <p><strong>Cause de la violation (si connue) :</strong> [À remplir]</p>
                    <p><strong>Description détaillée de l'incident :</strong> ${formData['breach-description'] || '[À remplir]'}</p>
                </div>
                
                <div class="document-section">
                    <h3>3. DONNÉES CONCERNÉES</h3>
                    <p><strong>Types de données affectées :</strong></p>
                    <div class="indented-content">
                        ${dataTypesText}
                    </div>
                    
                    <p><strong>Nombre (approximatif) de personnes concernées :</strong> ${formData['affected-persons'] || '0'}</p>
                    <p><strong>Nombre (approximatif) d'enregistrements concernés :</strong> [À remplir]</p>
                    <p><strong>Catégories de personnes concernées :</strong> [À remplir]</p>
                </div>
                
                <div class="document-section">
                    <h3>4. CONSÉQUENCES POTENTIELLES</h3>
                    <p><strong>Niveau d'impact estimé :</strong> ${getImpactLevelName(formData['impact-level'])}</p>
                    <p><strong>Description des conséquences potentielles :</strong> ${formData['impact-description'] || '[À remplir]'}</p>
                    <p><strong>Risques pour les droits et libertés des personnes concernées :</strong></p>
                    <div class="indented-content">
                        <p>[Détaillez les risques spécifiques, comme l'usurpation d'identité, la perte financière, l'atteinte à la réputation, etc.]</p>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>5. MESURES PRISES OU PROPOSÉES</h3>
                    <p><strong>Mesures déjà mises en œuvre :</strong> ${formData['measures-taken'] || '[À remplir]'}</p>
                    <p><strong>Mesures prévues pour éviter que cela ne se reproduise :</strong> ${formData['planned-measures'] || '[À remplir]'}</p>
                    <p><strong>Information des personnes concernées :</strong> ${getPersonsInformedStatus(formData['persons-informed'])}</p>
                    ${formData['persons-informed'] === 'yes' ? `<p><strong>Date de l'information :</strong> ${formData['informed-date'] || '[À remplir]'}</p>` : ''}
                    ${formData['persons-informed'] === 'planned' ? `<p><strong>Date prévue pour l'information :</strong> ${formData['planned-informed-date'] || '[À remplir]'}</p>` : ''}
                    <p><strong>Raisons pour lesquelles les personnes n'ont pas été informées (le cas échéant) :</strong> </p>
                    <div class="indented-content">
                        <p>[À remplir si les personnes n'ont pas été informées]</p>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>6. ARTICLES DU RGPD APPLICABLES</h3>
                    <p>Les articles suivants s'appliquent à cette violation :</p>
                    <ul>
                        ${articlesText}
                    </ul>
                </div>
                
                <div class="document-section">
                    <h3>7. INFORMATIONS COMPLÉMENTAIRES</h3>
                    <p><strong>Autres autorités de contrôle informées :</strong> [Le cas échéant]</p>
                    <p><strong>Autres organismes informés :</strong> [Le cas échéant, forces de l'ordre, ANSSI, etc.]</p>
                    <p><strong>Commentaires additionnels :</strong> [À remplir si nécessaire]</p>
                </div>
                
                <div class="document-footer">
                    <p>Fait à [Ville], le ${currentDate}</p>
                    <p>Signature: _________________________________</p>
                    <p>[Nom et fonction du signataire]</p>
                </div>
                
                <div class="document-notice">
                    <p>Ce document doit être envoyé à l'Autorité de Protection des Données dans les 72 heures suivant la découverte de la violation. En cas de retard, veuillez en expliquer les raisons.</p>
                </div>
            </div>
            
            <style>
                .notification-document {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    color: #333;
                }
                
                .document-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 1rem;
                }
                
                .document-header h2 {
                    margin-bottom: 0.5rem;
                }
                
                .subtitle {
                    font-style: italic;
                    color: #666;
                }
                
                .document-section {
                    margin-bottom: 2rem;
                }
                
                .document-section h3 {
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.5rem;
                }
                
                .indented-content {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .document-footer {
                    margin-top: 3rem;
                    border-top: 1px solid #ddd;
                    padding-top: 1rem;
                }
                
                .document-notice {
                    margin-top: 2rem;
                    padding: 1rem;
                    background-color: #f8f8f8;
                    border-left: 4px solid #e74c3c;
                    font-size: 0.9rem;
                }
            </style>
        `;
    }
    
    /**
     * Génère un document de documentation interne pour une violation de données
     */
    function generateInternalDocument(formData) {
        // Formatage de la date actuelle
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        
        // Formater les types de données affectées
        let dataTypesText = '';
        if (formData.dataTypes && formData.dataTypes.length > 0) {
            dataTypesText = formatDataTypes(formData.dataTypes);
        }
        
        // Obtenir des recommandations
        const notificationResult = window.rgpdRules.isNotificationRequired(formData);
        const recommendations = window.rgpdRules.generateRecommendations(formData, notificationResult.required);
        const recommendationsText = recommendations.map(rec => `<li>${rec}</li>`).join('');
        
        // Construire le document HTML
        return `
            <div class="internal-document">
                <div class="document-header">
                    <h2>DOCUMENTATION INTERNE DE VIOLATION DE DONNÉES</h2>
                    <p class="subtitle">Registre des violations en application de l'article 33.5 du RGPD</p>
                </div>
                
                <div class="document-section">
                    <h3>1. RÉFÉRENCE DE L'INCIDENT</h3>
                    <p><strong>Identifiant unique :</strong> VIO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                    <p><strong>Date de documentation :</strong> ${currentDate}</p>
                    <p><strong>Responsable de la documentation :</strong> [Nom de la personne qui documente]</p>
                </div>
                
                <div class="document-section">
                    <h3>2. INFORMATIONS SUR LA VIOLATION</h3>
                    <p><strong>Date et heure de la découverte :</strong> ${formData['breach-date'] || '[À remplir]'}</p>
                    <p><strong>Date et heure de la violation (si connue) :</strong> [À remplir]</p>
                    <p><strong>Nature de la violation :</strong> ${getBreachTypeName(formData['breach-type'])}</p>
                    <p><strong>Description de l'incident :</strong> ${formData['breach-description'] || '[À remplir]'}</p>
                </div>
                
                <div class="document-section">
                    <h3>3. DONNÉES CONCERNÉES</h3>
                    <p><strong>Types de données affectées :</strong></p>
                    <div class="indented-content">
                        ${dataTypesText}
                    </div>
                    
                    <p><strong>Nombre de personnes concernées :</strong> ${formData['affected-persons'] || '0'}</p>
                    <p><strong>Catégories de personnes concernées :</strong> [À remplir]</p>
                </div>
                
                <div class="document-section">
                    <h3>4. ANALYSE DE L'IMPACT</h3>
                    <p><strong>Niveau d'impact estimé :</strong> ${getImpactLevelName(formData['impact-level'])}</p>
                    <p><strong>Description des conséquences :</strong> ${formData['impact-description'] || '[À remplir]'}</p>
                    <p><strong>Justification du niveau d'impact :</strong> [À remplir]</p>
                </div>
                
                <div class="document-section">
                    <h3>5. NOTIFICATION À L'AUTORITÉ DE CONTRÔLE</h3>
                    <p><strong>Notification requise :</strong> ${notificationResult.required ? 'Oui' : 'Non'}</p>
                    <p><strong>Justification :</strong> ${notificationResult.reason}</p>
                    
                    ${notificationResult.required ? `
                    <p><strong>Date de notification :</strong> [À remplir]</p>
                    <p><strong>Référence de la notification :</strong> [À remplir]</p>
                    ` : `
                    <p><strong>Raisons détaillées de la non-notification :</strong></p>
                    <div class="indented-content">
                        <p>${notificationResult.reason}</p>
                        <p>Cette violation n'est pas susceptible d'engendrer un risque pour les droits et libertés des personnes physiques selon notre évaluation des risques.</p>
                    </div>
                    `}
                </div>
                
                <div class="document-section">
                    <h3>6. INFORMATION DES PERSONNES CONCERNÉES</h3>
                    <p><strong>Personnes informées :</strong> ${getPersonsInformedStatus(formData['persons-informed'])}</p>
                    ${formData['persons-informed'] === 'yes' ? `<p><strong>Date de l'information :</strong> ${formData['informed-date'] || '[À remplir]'}</p>` : ''}
                    ${formData['persons-informed'] === 'planned' ? `<p><strong>Date prévue pour l'information :</strong> ${formData['planned-informed-date'] || '[À remplir]'}</p>` : ''}
                    
                    <p><strong>Méthode d'information :</strong> [À remplir si applicable]</p>
                    <p><strong>Contenu de l'information fournie :</strong> [À remplir si applicable]</p>
                    
                    ${formData['persons-informed'] === 'no' ? `
                    <p><strong>Justification de la non-information des personnes concernées :</strong></p>
                    <div class="indented-content">
                        <p>[Expliquez pourquoi les personnes concernées n'ont pas été informées]</p>
                    </div>
                    ` : ''}
                </div>
                
                <div class="document-section">
                    <h3>7. MESURES PRISES</h3>
                    <p><strong>Mesures déjà mises en œuvre :</strong> ${formData['measures-taken'] || '[À remplir]'}</p>
                    <p><strong>Mesures prévues :</strong> ${formData['planned-measures'] || '[À remplir]'}</p>
                    <p><strong>Mesures recommandées :</strong></p>
                    <ul>
                        ${recommendationsText}
                    </ul>
                </div>
                
                <div class="document-section">
                    <h3>8. SUIVI DE L'INCIDENT</h3>
                    <p><strong>Statut actuel :</strong> [Ouvert/En cours/Résolu]</p>
                    <p><strong>Date de résolution (si applicable) :</strong> [À remplir]</p>
                    <p><strong>Leçons apprises :</strong> [À remplir]</p>
                    <p><strong>Actions préventives identifiées :</strong> [À remplir]</p>
                </div>
                
                <div class="document-footer">
                    <p>Document rédigé par: [Nom et fonction]</p>
                    <p>Date: ${currentDate}</p>
                    <p>Signature: _________________________________</p>
                </div>
            </div>
            
            <style>
                .internal-document {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    color: #333;
                }
                
                .document-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 1rem;
                }
                
                .document-header h2 {
                    margin-bottom: 0.5rem;
                }
                
                .subtitle {
                    font-style: italic;
                    color: #666;
                }
                
                .document-section {
                    margin-bottom: 2rem;
                }
                
                .document-section h3 {
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.5rem;
                }
                
                .indented-content {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .document-footer {
                    margin-top: 3rem;
                    border-top: 1px solid #ddd;
                    padding-top: 1rem;
                }
            </style>
        `;
    }
    
    /**
     * Formate la liste des types de données pour l'affichage
     */
    function formatDataTypes(dataTypes) {
        if (!dataTypes || !dataTypes.length) {
            return '<p>Aucun type de données spécifié</p>';
        }
        
        let result = '';
        
        for (const type of dataTypes) {
            const dataTypeInfo = window.rgpdRules.getDataTypeInfo(type);
            
            if (dataTypeInfo) {
                result += `<p>- <strong>${dataTypeInfo.name}</strong>: ${dataTypeInfo.description}</p>`;
            } else if (type === 'other') {
                // Gérer le cas "other"
                result += '<p>- <strong>Autres types de données</strong></p>';
            }
        }
        
        return result;
    }
    
    /**
     * Obtient le nom formaté du type de violation
     */
    function getBreachTypeName(breachType) {
        if (!breachType) return 'Non spécifié';
        
        const breachTypeInfo = window.rgpdRules.getBreachTypeInfo(breachType);
        return breachTypeInfo ? breachTypeInfo.name : breachType;
    }
    
    /**
     * Obtient la description formatée du niveau d'impact
     */
    function getImpactLevelName(impactLevel) {
        const impactLevels = {
            'minimal': 'Minimal (pas de conséquences significatives)',
            'limited': 'Limité (quelques inconvénients surmontables)',
            'significant': 'Significatif (inconvénients importants mais surmontables)',
            'severe': 'Sévère (conséquences significatives et durables)',
            'critical': 'Critique (conséquences irréversibles/catastrophiques)'
        };
        
        return impactLevels[impactLevel] || 'Non spécifié';
    }
    
    /**
     * Obtient le statut formaté de l'information des personnes concernées
     */
    function getPersonsInformedStatus(status) {
        switch (status) {
            case 'yes':
                return 'Oui, les personnes concernées ont été informées';
            case 'no':
                return 'Non, les personnes concernées n\'ont pas été informées';
            case 'planned':
                return 'L\'information des personnes concernées est planifiée';
            default:
                return 'Non spécifié';
        }
    }
    
    // Exposer les fonctions publiques
    window.documentGenerator = {
        generateNotificationDocument,
        generateInternalDocument
    };
})();
