/**
 * Outil d'évaluation d'impact réglementaire
 * Règles pour l'évaluation des obligations DORA et NIS2
 */

(function() {
    /**
     * Détermine si DORA est applicable à une organisation
     */
    function isDORAApplicable(formData) {
        // Vérifier si l'entité est dans le secteur financier
        const financialEntities = [
            'financial_institution',
            'investment_firm',
            'insurance_company',
            'payment_service',
            'crypto_asset_provider',
            'ict_service_provider'
        ];
        
        if (!formData.entityTypes) return false;
        
        // Si au moins un type d'entité financière est sélectionné, DORA est applicable
        for (const entity of financialEntities) {
            if (formData.entityTypes.includes(entity)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Détermine si NIS2 est applicable à une organisation et dans quelle catégorie
     * (essentielle ou importante)
     */
    function getNIS2Category(formData) {
        const essentialEntities = [
            'energy',
            'transport',
            'banking',
            'healthcare',
            'drinking_water',
            'digital_infrastructure',
            'public_administration',
            'space'
        ];
        
        const importantEntities = [
            'postal_services',
            'waste_management',
            'manufacturing',
            'digital_providers',
            'research'
        ];
        
        if (!formData.entityTypes) return null;
        
        // Vérifier si l'organisation est une entité essentielle
        for (const entity of essentialEntities) {
            if (formData.entityTypes.includes(entity)) {
                return 'essential';
            }
        }
        
        // Vérifier si l'organisation est une entité importante
        for (const entity of importantEntities) {
            if (formData.entityTypes.includes(entity)) {
                return 'important';
            }
        }
        
        return null; // NIS2 non applicable
    }
    
    /**
     * Détermine si une organisation est une grande entreprise
     * selon les critères européens
     */
    function isLargeCompany(formData) {
        // Critères pour une grande entreprise selon la définition européenne
        // Plus de 250 employés ET chiffre d'affaires annuel > 50 millions d'euros
        return (
            formData.employeeCount > 250 && 
            formData.annualRevenue > 50000000
        );
    }
    
    /**
     * Obtient les délais de notification pour chaque réglementation applicable
     */
    function getNotificationDeadlines(formData) {
        const deadlines = {};
        
        // RGPD: 72 heures par défaut
        deadlines.rgpd = 72;
        
        // DORA: 24 heures pour les incidents majeurs, 72 heures sinon
        if (isDORAApplicable(formData)) {
            const isMajorIncident = formData['impact-level'] === 'severe' || formData['impact-level'] === 'critical';
            deadlines.dora = isMajorIncident ? 24 : 72;
        }
        
        // NIS2: 24 heures pour la notification initiale, 72 heures pour le rapport complet
        const nis2Category = getNIS2Category(formData);
        if (nis2Category) {
            deadlines.nis2 = 24; // Notification initiale
            deadlines.nis2_full = 72; // Rapport complet
        }
        
        return deadlines;
    }
    
    /**
     * Obtient les exigences spécifiques à DORA pour une violation de données
     */
    function getDORARequirements(formData) {
        const requirements = [];
        
        const isMajorIncident = formData['impact-level'] === 'severe' || formData['impact-level'] === 'critical';
        
        // Exigences de base pour tous les incidents
        requirements.push('Documentation détaillée de l\'incident');
        requirements.push('Analyse de l\'impact opérationnel et financier');
        
        if (isMajorIncident) {
            requirements.push('Notification à l\'autorité de supervision financière dans les 24 heures');
            requirements.push('Rapport préliminaire sur les causes et l\'impact');
            requirements.push('Plan de remédiation immédiate et à long terme');
            requirements.push('Notification aux clients et partenaires si impact sur les services');
        } else {
            requirements.push('Notification à l\'autorité de supervision financière dans les 72 heures');
            requirements.push('Rapport sur les causes et mesures prises');
        }
        
        // Exigences supplémentaires selon le type de violation
        if (formData['breach-type'] === 'ransomware' || formData['breach-type'] === 'ddos') {
            requirements.push('Activation du plan de continuité d\'activité');
            requirements.push('Test de l\'intégrité des systèmes et des données après résolution');
        }
        
        if (formData.dataTypes.includes('financial') || formData.dataTypes.includes('authentication')) {
            requirements.push('Vérification des accès aux infrastructures critiques');
            requirements.push('Revue des contrôles de sécurité des transactions');
        }
        
        return requirements;
    }
    
    /**
     * Obtient les exigences spécifiques à NIS2 pour une violation de données
     */
    function getNIS2Requirements(formData, category) {
        const requirements = [];
        
        // Exigences communes pour toutes les entités NIS2
        requirements.push('Notification initiale au CSIRT national ou à l\'autorité compétente dans les 24 heures');
        requirements.push('Rapport détaillé dans les 72 heures suivant la notification initiale');
        
        // Exigences supplémentaires pour les entités essentielles
        if (category === 'essential') {
            requirements.push('Évaluation détaillée de l\'impact sur les services essentiels');
            requirements.push('Notification aux utilisateurs si impact sur la continuité des services');
            requirements.push('Partage d\'informations avec les autres opérateurs essentiels du secteur');
            requirements.push('Mise à jour des plans de gestion des risques cybernétiques');
        } else if (category === 'important') {
            requirements.push('Évaluation de l\'impact sur les services fournis');
            requirements.push('Documentation des mesures prises pour résoudre l\'incident');
        }
        
        // Exigences spécifiques selon le secteur d'activité
        if (formData.entityTypes.includes('healthcare')) {
            requirements.push('Évaluation de l\'impact sur la sécurité des patients');
        } else if (formData.entityTypes.includes('energy') || formData.entityTypes.includes('transport')) {
            requirements.push('Évaluation de l\'impact sur les infrastructures critiques');
        } else if (formData.entityTypes.includes('digital_infrastructure')) {
            requirements.push('Analyse de l\'impact sur les services numériques dépendants');
        }
        
        return requirements;
    }
    
    /**
     * Évalue les obligations réglementaires selon DORA et NIS2
     */
    function evaluateRegulatoryObligations(formData) {
        const results = {
            applicableRegulations: ['RGPD'],
            notificationDeadlines: getNotificationDeadlines(formData),
            requirements: {},
            companySize: isLargeCompany(formData) ? 'large' : 'small',
            companyInfo: {}
        };
        
        // Déterminer les informations sur la taille de l'entreprise
        if (isLargeCompany(formData)) {
            results.companyInfo = {
                name: 'Grande Entreprise',
                criteria: `${formData.employeeCount} employés et ${formData.annualRevenue.toLocaleString()} € de chiffre d'affaires`
            };
        } else {
            results.companyInfo = {
                name: 'PME',
                criteria: `${formData.employeeCount} employés et ${formData.annualRevenue.toLocaleString()} € de chiffre d'affaires`
            };
        }
        
        // Vérifier si DORA est applicable
        if (isDORAApplicable(formData)) {
            results.applicableRegulations.push('DORA');
            results.requirements.dora = getDORARequirements(formData);
        }
        
        // Vérifier si NIS2 est applicable
        const nis2Category = getNIS2Category(formData);
        if (nis2Category) {
            results.applicableRegulations.push('NIS2');
            results.nis2Category = nis2Category;
            results.requirements.nis2 = getNIS2Requirements(formData, nis2Category);
        }
        
        return results;
    }
    
    // Exposer les fonctions publiques
    window.doraNis2Rules = {
        evaluateRegulatoryObligations,
        isDORAApplicable,
        getNIS2Category,
        getNotificationDeadlines
    };
})();