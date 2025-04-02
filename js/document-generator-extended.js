/**
 * Outil d'évaluation d'impact réglementaire
 * Générateur de documents pour les réglementations DORA, NIS2 et les recommandations spécifiques au vol de données
 */

(function() {
    /**
     * Génère un document de notification multi-réglementations (RGPD, DORA, NIS2)
     */
    function generateMultiRegulationDocument(formData, regulatoryResults) {
        // Formatage de la date actuelle
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        
        // Récupérer les informations de l'entreprise
        const companySize = regulatoryResults.companySize;
        const companyInfo = regulatoryResults.companyInfo;
        
        // Formater la liste des réglementations applicables
        const applicableRegulations = regulatoryResults.applicableRegulations || [];
        let regulationsText = '';
        
        if (applicableRegulations.includes('DORA')) {
            regulationsText += '<li>DORA (Règlement sur la Résilience Opérationnelle Numérique)</li>';
        }
        
        if (applicableRegulations.includes('NIS2')) {
            regulationsText += '<li>NIS2 (Directive sur la Sécurité des Réseaux et Systèmes d\'Information)</li>';
        }
        
        regulationsText += '<li>RGPD (Règlement Général sur la Protection des Données)</li>';
        
        // Formater les délais de notification
        const deadlines = regulatoryResults.notificationDeadlines || {};
        let deadlinesText = '';
        
        if (deadlines.rgpd) {
            deadlinesText += `<li><strong>RGPD</strong>: ${deadlines.rgpd} heures (à l'Autorité de Protection des Données)</li>`;
        } else {
            deadlinesText += `<li><strong>RGPD</strong>: 72 heures (à l'Autorité de Protection des Données)</li>`;
        }
        
        if (deadlines.dora) {
            deadlinesText += `<li><strong>DORA</strong>: ${deadlines.dora} heures (à l'Autorité de Supervision Financière)</li>`;
        }
        
        if (deadlines.nis2) {
            deadlinesText += `<li><strong>NIS2</strong>: ${deadlines.nis2} heures (au CSIRT national ou à l'autorité compétente)</li>`;
        }
        
        // Formater les exigences DORA et NIS2
        const doraRequirements = regulatoryResults.requirements && regulatoryResults.requirements.dora ? 
            regulatoryResults.requirements.dora.map(req => `<li>${req}</li>`).join('') : '';
        
        const nis2Requirements = regulatoryResults.requirements && regulatoryResults.requirements.nis2 ? 
            regulatoryResults.requirements.nis2.map(req => `<li>${req}</li>`).join('') : '';
        
        // Déterminer la catégorie NIS2 si applicable
        let nis2CategoryText = '';
        if (regulatoryResults.nis2Category) {
            const categoryName = regulatoryResults.nis2Category === 'essential' ? 'essentielle' : 'importante';
            nis2CategoryText = `<p>Votre organisation est classée comme entité <strong>${categoryName}</strong> selon NIS2.</p>`;
        }
        
        // Formatage des types de données affectées
        let dataTypesText = '';
        if (formData.dataTypes && formData.dataTypes.length > 0) {
            dataTypesText = formatDataTypes(formData.dataTypes);
        }
        
        // Construire le document HTML
        return `
            <div class="multi-regulation-document">
                <div class="document-header">
                    <h2>NOTIFICATION D'INCIDENT DE SÉCURITÉ MULTI-RÉGLEMENTAIRE</h2>
                    <p class="subtitle">Conforme aux exigences RGPD, DORA et NIS2</p>
                </div>
                
                <div class="document-section">
                    <h3>1. INFORMATIONS SUR L'ORGANISATION</h3>
                    <p><strong>Nom de l'organisation :</strong> [Nom de votre organisation]</p>
                    <p><strong>Adresse :</strong> [Adresse complète]</p>
                    <p><strong>Personne à contacter :</strong> [Nom du responsable]</p>
                    <p><strong>Email :</strong> [Email de contact]</p>
                    <p><strong>Téléphone :</strong> [Numéro de téléphone]</p>
                    
                    <div class="subsection">
                        <h4>Classification de l'organisation</h4>
                        <p><strong>Taille de l'organisation :</strong> ${companyInfo.name} (${companyInfo.criteria})</p>
                        <p><strong>Nombre d'employés :</strong> ${formData.employeeCount}</p>
                        <p><strong>Chiffre d'affaires annuel :</strong> ${formData.annualRevenue.toLocaleString()} €</p>
                        ${nis2CategoryText}
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>2. RÉGLEMENTATIONS APPLICABLES</h3>
                    <p>Selon votre secteur d'activité et la nature de l'incident, les réglementations suivantes s'appliquent :</p>
                    <ul>${regulationsText}</ul>
                    
                    <div class="deadline-box">
                        <h4>Délais de notification à respecter</h4>
                        <ul>${deadlinesText}</ul>
                        <p><strong>Date limite la plus stricte :</strong> [Calculer et insérer la date/heure limite la plus proche]</p>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>3. INFORMATIONS SUR L'INCIDENT</h3>
                    <p><strong>Date et heure de la découverte :</strong> ${formData['breach-date'] || '[À remplir]'}</p>
                    <p><strong>Date et heure estimées de l'incident :</strong> [À remplir]</p>
                    <p><strong>Type d'incident :</strong> ${getBreachTypeName(formData['breach-type'])}</p>
                    <p><strong>Description détaillée :</strong> ${formData['breach-description'] || '[À remplir]'}</p>
                    
                    <div class="subsection">
                        <h4>Données concernées</h4>
                        ${dataTypesText}
                        <p><strong>Nombre de personnes affectées :</strong> ${formData['affected-persons'] || '0'}</p>
                    </div>
                    
                    <div class="subsection">
                        <h4>Impact de l'incident</h4>
                        <p><strong>Niveau d'impact estimé :</strong> ${getImpactLevelName(formData['impact-level'])}</p>
                        <p><strong>Description de l'impact :</strong> ${formData['impact-description'] || '[À remplir]'}</p>
                        <p><strong>Impact sur les services essentiels :</strong> [À remplir]</p>
                        <p><strong>Impact transfrontalier :</strong> [Oui/Non - Précisez si applicable]</p>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>4. MESURES PRISES</h3>
                    <p><strong>Mesures immédiates adoptées :</strong> ${formData['measures-taken'] || '[À remplir]'}</p>
                    <p><strong>Mesures préventives planifiées :</strong> ${formData['planned-measures'] || '[À remplir]'}</p>
                    <p><strong>Information des personnes concernées :</strong> ${getPersonsInformedStatus(formData['persons-informed'])}</p>
                    ${formData['persons-informed'] === 'yes' ? `<p><strong>Date de l'information :</strong> ${formData['informed-date'] || '[À remplir]'}</p>` : ''}
                    ${formData['persons-informed'] === 'planned' ? `<p><strong>Date prévue pour l'information :</strong> ${formData['planned-informed-date'] || '[À remplir]'}</p>` : ''}
                </div>
                
                <div class="document-section">
                    <h3>5. EXIGENCES RÉGLEMENTAIRES SPÉCIFIQUES</h3>
                    
                    ${applicableRegulations.includes('DORA') ? `
                    <div class="subsection">
                        <h4>Exigences DORA</h4>
                        <ul>${doraRequirements || '<li>Aucune exigence spécifique identifiée</li>'}</ul>
                    </div>
                    ` : ''}
                    
                    ${applicableRegulations.includes('NIS2') ? `
                    <div class="subsection">
                        <h4>Exigences NIS2</h4>
                        <ul>${nis2Requirements || '<li>Aucune exigence spécifique identifiée</li>'}</ul>
                    </div>
                    ` : ''}
                    
                    <div class="subsection">
                        <h4>Exigences RGPD</h4>
                        <p>Articles du RGPD applicables :</p>
                        <ul>
                            <li>Article 33 - Notification à l'autorité de contrôle</li>
                            <li>Article 34 - Communication à la personne concernée (si applicable)</li>
                            <li>Article 32 - Sécurité du traitement</li>
                        </ul>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>6. NOTIFICATIONS OBLIGATOIRES</h3>
                    <div class="subsection">
                        <h4>Autorités à notifier</h4>
                        <ul>
                            <li><strong>RGPD :</strong> Autorité de Protection des Données (APD)</li>
                            ${applicableRegulations.includes('DORA') ? '<li><strong>DORA :</strong> Autorité de supervision financière compétente</li>' : ''}
                            ${applicableRegulations.includes('NIS2') ? '<li><strong>NIS2 :</strong> CSIRT national ou autorité sectorielle compétente</li>' : ''}
                        </ul>
                    </div>
                    
                    <div class="subsection">
                        <h4>Informations complémentaires à fournir aux autorités</h4>
                        <ul>
                            <li>Rapports techniques détaillés sur l'incident</li>
                            <li>Journaux système pertinents (si disponibles)</li>
                            <li>Résultats d'analyse de l'incident</li>
                            <li>Preuves des mesures d'atténuation mises en œuvre</li>
                        </ul>
                    </div>
                </div>
                
                <div class="document-footer">
                    <p>Document préparé le ${currentDate}</p>
                    <p>Par : [Nom et fonction]</p>
                    <p>Signature : ________________________________</p>
                </div>
                
                <div class="document-notice">
                    <p>Ce document regroupe les informations nécessaires pour toutes les notifications réglementaires applicables. Veuillez vous assurer que les notifications sont soumises dans les délais impartis à chaque autorité compétente.</p>
                </div>
            </div>
            
            <style>
                .multi-regulation-document {
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
                
                .subsection {
                    margin: 1rem 0;
                    padding-left: 1rem;
                }
                
                .subsection h4 {
                    margin-bottom: 0.5rem;
                    color: #2c3e50;
                }
                
                .deadline-box {
                    background-color: #f8f9fa;
                    border-left: 4px solid #e74c3c;
                    padding: 1rem;
                    margin: 1rem 0;
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
                    border-left: 4px solid #3498db;
                    font-size: 0.9rem;
                }
            </style>
        `;
    }
    
    /**
     * Génère un document avec des recommandations spécifiques pour le vol de données
     */
    function generateDataTheftRecommendations(formData, theftResults) {
        // Formatage de la date actuelle
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        
        // Extraire les recommandations générales pour le vol de données
        const generalRecommendations = theftResults.dataTheftRecommendations || [];
        const generalRecommendationsText = generalRecommendations.map(rec => `<li>${rec}</li>`).join('');
        
        // Extraire les actions spécifiques selon le type de données
        const additionalActions = theftResults.additionalActions || {};
        let specificActionsText = '';
        
        if (additionalActions.financial) {
            specificActionsText += `
            <div class="action-section">
                <h4><i class="fas fa-credit-card"></i> Actions pour les données financières</h4>
                <ul>
                    ${additionalActions.financial.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>`;
        }
        
        if (additionalActions.authentication) {
            specificActionsText += `
            <div class="action-section">
                <h4><i class="fas fa-key"></i> Actions pour les identifiants et mots de passe</h4>
                <ul>
                    ${additionalActions.authentication.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>`;
        }
        
        if (additionalActions.official) {
            specificActionsText += `
            <div class="action-section">
                <h4><i class="fas fa-id-card"></i> Actions pour les documents d'identité</h4>
                <ul>
                    ${additionalActions.official.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>`;
        }
        
        // Formatage des types de données volées
        let dataTypesText = '';
        if (formData.dataTypes && formData.dataTypes.length > 0) {
            dataTypesText = formatDataTypes(formData.dataTypes);
        }
        
        // Construire le document HTML
        return `
            <div class="data-theft-document">
                <div class="document-header">
                    <h2>PLAN D'ACTION SUITE À UN VOL DE DONNÉES</h2>
                    <p class="subtitle">Recommandations et mesures à mettre en œuvre</p>
                </div>
                
                <div class="document-section">
                    <h3>1. RÉSUMÉ DE L'INCIDENT</h3>
                    <p><strong>Date de l'incident :</strong> ${formData['breach-date'] || '[À remplir]'}</p>
                    <p><strong>Description :</strong> ${formData['breach-description'] || '[À remplir]'}</p>
                    <p><strong>Nombre de personnes affectées :</strong> ${formData['affected-persons'] || '0'}</p>
                    
                    <div class="subsection">
                        <h4>Types de données volées</h4>
                        ${dataTypesText}
                    </div>
                </div>
                
                <div class="document-section urgence">
                    <h3>2. ACTIONS IMMÉDIATES (24-48H)</h3>
                    <ul>
                        ${generalRecommendationsText}
                    </ul>
                    
                    <div class="timeline">
                        <div class="timeline-item">
                            <h4>Immédiatement (0-2h)</h4>
                            <ul>
                                <li>Confirmer l'ampleur de la violation et isoler les systèmes affectés</li>
                                <li>Constituer une équipe de gestion de crise avec des rôles définis</li>
                                <li>Préserver les preuves numériques</li>
                            </ul>
                        </div>
                        
                        <div class="timeline-item">
                            <h4>Priorité élevée (2-24h)</h4>
                            <ul>
                                <li>Procéder aux notifications réglementaires obligatoires</li>
                                <li>Lancer une enquête approfondie sur les causes et l'étendue</li>
                                <li>Évaluer l'impact sur les personnes concernées</li>
                            </ul>
                        </div>
                        
                        <div class="timeline-item">
                            <h4>Priorité moyenne (24-72h)</h4>
                            <ul>
                                <li>Communiquer avec les personnes concernées</li>
                                <li>Mettre en place les premières mesures correctives</li>
                                <li>Préparer la stratégie de communication externe</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="document-section type-specific">
                    <h3>3. ACTIONS SPÉCIFIQUES SELON LES TYPES DE DONNÉES</h3>
                    ${specificActionsText || '<p>Aucune action spécifique supplémentaire requise pour les types de données concernés.</p>'}
                </div>
                
                <div class="document-section">
                    <h3>4. MESURES DE SUIVI À LONG TERME</h3>
                    <ul>
                        <li>Réaliser un audit de sécurité approfondi des systèmes et infrastructures</li>
                        <li>Revoir et renforcer les politiques de sécurité et de protection des données</li>
                        <li>Mettre en place une surveillance active pour détecter toute utilisation des données volées</li>
                        <li>Former le personnel aux risques liés au vol de données et aux meilleures pratiques</li>
                        <li>Mettre à jour le plan de réponse aux incidents</li>
                    </ul>
                </div>
                
                <div class="document-section">
                    <h3>5. ASSISTANCE AUX PERSONNES CONCERNÉES</h3>
                    <div class="subsection">
                        <h4>Mesures de soutien recommandées</h4>
                        <ul>
                            <li>Mettre en place une ligne d'assistance dédiée pour répondre aux questions</li>
                            <li>Fournir des informations claires sur les risques potentiels</li>
                            <li>Offrir des conseils pratiques pour se protéger (changement de mot de passe, etc.)</li>
                            <li>Proposer un service de surveillance d'identité si nécessaire</li>
                        </ul>
                    </div>
                    
                    <div class="subsection">
                        <h4>Modèle de communication</h4>
                        <div class="communication-template">
                            <p><strong>Objet :</strong> Information importante concernant vos données personnelles</p>
                            <p>Madame, Monsieur,</p>
                            <p>Nous vous informons qu'un incident de sécurité s'est produit le [date], entraînant l'accès non autorisé à certaines de vos données personnelles. Les informations potentiellement compromises comprennent [liste des types de données].</p>
                            <p>Nous prenons cet incident très au sérieux et avons immédiatement mis en œuvre des mesures pour sécuriser nos systèmes et mener une enquête approfondie.</p>
                            <p>Nous vous recommandons de :</p>
                            <ul>
                                <li>Changer vos mots de passe sur notre plateforme et sur tout autre service où vous utilisez le même mot de passe</li>
                                <li>Rester vigilant face aux communications suspectes</li>
                                <li>Surveiller régulièrement vos comptes pour détecter toute activité inhabituelle</li>
                            </ul>
                            <p>Pour toute question ou préoccupation, n'hésitez pas à contacter notre équipe dédiée au [numéro de téléphone] ou à l'adresse [email].</p>
                            <p>Nous vous prions de nous excuser pour les désagréments causés et vous remercions de votre compréhension.</p>
                            <p>Cordialement,</p>
                            <p>[Nom]<br>[Fonction]</p>
                        </div>
                    </div>
                </div>
                
                <div class="document-section">
                    <h3>6. DOCUMENTATION ET RAPPORTS</h3>
                    <ul>
                        <li>Tenir un journal détaillé de toutes les actions entreprises</li>
                        <li>Documenter les preuves techniques de l'incident</li>
                        <li>Préparer un rapport post-incident avec analyse des causes profondes</li>
                        <li>Développer un plan d'amélioration basé sur les leçons apprises</li>
                    </ul>
                </div>
                
                <div class="document-footer">
                    <p>Document préparé le ${currentDate}</p>
                    <p>Par : [Nom et fonction]</p>
                    <p>À réviser et mettre à jour régulièrement en fonction de l'évolution de la situation.</p>
                </div>
            </div>
            
            <style>
                .data-theft-document {
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
                    color: #e74c3c;
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
                
                .urgence h3 {
                    color: #e74c3c;
                }
                
                .subsection {
                    margin: 1rem 0;
                    padding-left: 1rem;
                }
                
                .subsection h4 {
                    margin-bottom: 0.5rem;
                    color: #2c3e50;
                }
                
                .timeline {
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background-color: #f9f9f9;
                    border-radius: 5px;
                }
                
                .timeline-item {
                    margin-bottom: 1.5rem;
                    padding-left: 1rem;
                    border-left: 3px solid #3498db;
                }
                
                .timeline-item:last-child {
                    margin-bottom: 0;
                }
                
                .type-specific {
                    background-color: rgba(231, 76, 60, 0.05);
                    padding: 1rem;
                    border-radius: 5px;
                }
                
                .action-section {
                    margin: 1rem 0;
                    padding: 1rem;
                    background-color: white;
                    border-radius: 5px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .action-section h4 {
                    color: #e74c3c;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .communication-template {
                    background-color: #f8f9fa;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 0.9rem;
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
        if (breachTypeInfo) {
            return breachTypeInfo.name;
        }
        
        // Types supplémentaires non définis dans rgpd-rules.js
        const additionalBreachTypes = {
            'ransomware': 'Attaque par rançongiciel',
            'ddos': 'Attaque par déni de service',
            'supply_chain': 'Incident dans la chaîne d\'approvisionnement'
        };
        
        return additionalBreachTypes[breachType] || breachType;
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
    window.documentGeneratorExtended = {
        generateMultiRegulationDocument,
        generateDataTheftRecommendations,
    };
})();
