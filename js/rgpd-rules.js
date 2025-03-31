/**
 * Outil d'évaluation d'impact RGPD
 * Règles et critères du RGPD pour l'évaluation des violations de données
 */

(function() {
    // Base de connaissances sur les types de données et leur sensibilité
    const dataTypeDefinitions = {
        'identification': {
            name: 'Données d\'identification',
            description: 'Nom, prénom, adresse postale',
            sensitivity: 'standard',
            rgpdArticles: ['6']
        },
        'contact': {
            name: 'Coordonnées de contact',
            description: 'Email, numéro de téléphone',
            sensitivity: 'standard',
            rgpdArticles: ['6']
        },
        'financial': {
            name: 'Données financières',
            description: 'Coordonnées bancaires, numéros de carte',
            sensitivity: 'high',
            rgpdArticles: ['6', '32']
        },
        'authentication': {
            name: 'Identifiants et mots de passe',
            description: 'Noms d\'utilisateur, mots de passe, questions de sécurité',
            sensitivity: 'high',
            rgpdArticles: ['6', '32']
        },
        'official': {
            name: 'Documents d\'identité officiels',
            description: 'Passeport, CNI, permis de conduire',
            sensitivity: 'high',
            rgpdArticles: ['6', '32']
        },
        'health': {
            name: 'Données de santé',
            description: 'Dossier médical, diagnostics, traitements',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        },
        'biometric': {
            name: 'Données biométriques',
            description: 'Empreintes digitales, reconnaissance faciale',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        },
        'genetic': {
            name: 'Données génétiques',
            description: 'Tests ADN, prédispositions génétiques',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        },
        'sexual': {
            name: 'Orientation sexuelle et vie sexuelle',
            description: 'Préférences sexuelles, historique',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        },
        'criminal': {
            name: 'Condamnations pénales et infractions',
            description: 'Casier judiciaire, infractions commises',
            sensitivity: 'special',
            rgpdArticles: ['10', '32', '35']
        },
        'political': {
            name: 'Opinions politiques, convictions religieuses ou philosophiques',
            description: 'Affiliation politique, croyances religieuses',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        },
        'racial': {
            name: 'Origine raciale ou ethnique',
            description: 'Ethnicité, nationalité d\'origine',
            sensitivity: 'special',
            rgpdArticles: ['9', '32', '35']
        }
    };

    // Types de violations et leurs caractéristiques
    const breachTypeDefinitions = {
        'unauthorized-access': {
            name: 'Accès non autorisé',
            description: 'Accès aux données par des personnes non autorisées',
            severity: 'high',
            articlesConcerned: ['32', '33', '34']
        },
        'data-theft': {
            name: 'Vol de données',
            description: 'Exfiltration de données à des fins malveillantes',
            severity: 'critical',
            articlesConcerned: ['32', '33', '34']
        },
        'data-loss': {
            name: 'Perte de données',
            description: 'Données devenues indisponibles (suppression, etc.)',
            severity: 'medium',
            articlesConcerned: ['32', '33']
        },
        'data-alteration': {
            name: 'Altération de données',
            description: 'Modification non autorisée des données',
            severity: 'high',
            articlesConcerned: ['32', '33', '34']
        },
        'disclosure': {
            name: 'Divulgation non autorisée',
            description: 'Partage de données avec des tiers non autorisés',
            severity: 'high',
            articlesConcerned: ['32', '33', '34']
        }
    };

    // Articles du RGPD pertinents pour les violations de données
    const rgpdArticles = {
        '6': {
            title: 'Licéité du traitement',
            content: 'Définit les conditions dans lesquelles le traitement de données est légal.',
            relevanceForBreach: 'Vérifier que le traitement initial était licite.'
        },
        '9': {
            title: 'Traitement de catégories particulières de données',
            content: 'Interdit le traitement des données sensibles sauf exceptions spécifiques.',
            relevanceForBreach: 'La violation de données sensibles est considérée comme plus grave.'
        },
        '10': {
            title: 'Données relatives aux condamnations pénales et aux infractions',
            content: 'Restreint le traitement des données relatives aux condamnations pénales.',
            relevanceForBreach: 'Violation de ces données implique un risque élevé.'
        },
        '32': {
            title: 'Sécurité du traitement',
            content: 'Obligation de mettre en place des mesures techniques et organisationnelles pour assurer la sécurité des données.',
            relevanceForBreach: 'Une violation peut indiquer un manquement à l\'article 32.'
        },
        '33': {
            title: 'Notification d\'une violation à l\'autorité de contrôle',
            content: 'Obligation de notifier toute violation dans les 72 heures, sauf si peu susceptible d\'engendrer un risque.',
            relevanceForBreach: 'Détermine l\'obligation de notifier l\'APD.'
        },
        '34': {
            title: 'Communication d\'une violation à la personne concernée',
            content: 'Obligation d\'informer les personnes concernées lorsque la violation est susceptible d\'engendrer un risque élevé.',
            relevanceForBreach: 'Détermine l\'obligation d\'informer les personnes concernées.'
        },
        '35': {
            title: 'Analyse d\'impact relative à la protection des données',
            content: 'Obligation de réaliser une AIPD pour les traitements à haut risque.',
            relevanceForBreach: 'Une violation grave peut nécessiter une révision de l\'AIPD.'
        }
    };

    // Critères pour déterminer si une notification est nécessaire
    const notificationCriteria = {
        dataSensitivity: {
            'standard': {
                title: 'Données standard',
                threshold: 'high impact',
                notificationRequired: 'if high impact or large scale'
            },
            'high': {
                title: 'Données à risque élevé',
                threshold: 'medium impact',
                notificationRequired: 'in most cases'
            },
            'special': {
                title: 'Données sensibles (catégories particulières)',
                threshold: 'any impact',
                notificationRequired: 'always'
            }
        },
        impactLevels: {
            'minimal': {
                description: 'Pas de conséquences significatives pour les personnes concernées',
                exampleScenarios: [
                    'Accès temporaire à des données non sensibles par un employé autorisé mais pour une finalité non prévue',
                    'Exposition temporaire de données non sensibles dans un environnement contrôlé'
                ],
                notificationRequired: false
            },
            'limited': {
                description: 'Quelques inconvénients surmontables pour les personnes concernées',
                exampleScenarios: [
                    'Divulgation limitée de données d\'identification sans autres données sensibles',
                    'Perte temporaire d\'accès aux données pour les personnes concernées'
                ],
                notificationRequired: false
            },
            'significant': {
                description: 'Inconvénients importants mais surmontables pour les personnes concernées',
                exampleScenarios: [
                    'Divulgation d\'informations personnelles pouvant causer de l\'embarras',
                    'Usurpation d\'identité possible mais avec un impact limité'
                ],
                notificationRequired: true
            },
            'severe': {
                description: 'Conséquences significatives et durables pour les personnes concernées',
                exampleScenarios: [
                    'Divulgation de données financières pouvant entraîner une perte financière',
                    'Divulgation de données de santé pouvant entraîner une discrimination'
                ],
                notificationRequired: true
            },
            'critical': {
                description: 'Conséquences irréversibles ou catastrophiques pour les personnes concernées',
                exampleScenarios: [
                    'Divulgation de données pouvant menacer la vie ou la sécurité des personnes',
                    'Vol d\'identité complet avec conséquences financières et juridiques majeures'
                ],
                notificationRequired: true
            }
        },
        quantitativeCriteria: {
            affectedPersonsThreshold: 500, // Nombre de personnes affectées au-delà duquel une notification est généralement requise
            highImpactThreshold: 100, // Seuil pour les impacts sévères ou critiques
        }
    };

    // Exposer les fonctions et données pertinentes
    window.rgpdRules = {
        getDataTypeInfo: function(dataType) {
            return dataTypeDefinitions[dataType] || null;
        },
        
        getBreachTypeInfo: function(breachType) {
            return breachTypeDefinitions[breachType] || null;
        },
        
        getArticleInfo: function(articleNumber) {
            return rgpdArticles[articleNumber] || null;
        },
        
        getNotificationCriteria: function() {
            return notificationCriteria;
        },
        
        // Détermine la sensibilité globale d'un ensemble de types de données
        getOverallDataSensitivity: function(dataTypes) {
            let highestSensitivity = 'standard';
            
            for (const type of dataTypes) {
                const dataTypeInfo = dataTypeDefinitions[type];
                
                if (!dataTypeInfo) continue;
                
                if (dataTypeInfo.sensitivity === 'special') {
                    return 'special'; // Si une donnée est de catégorie spéciale, c'est le niveau le plus élevé
                } else if (dataTypeInfo.sensitivity === 'high' && highestSensitivity !== 'special') {
                    highestSensitivity = 'high';
                }
            }
            
            return highestSensitivity;
        },
        
        // Détermine si une notification est requise en fonction des critères
        isNotificationRequired: function(breachData) {
            // Vérifier si les données sont de catégorie spéciale (toujours notification)
            const dataTypes = breachData.dataTypes || [];
            const sensitivity = this.getOverallDataSensitivity(dataTypes);
            
            if (sensitivity === 'special') {
                return {
                    required: true,
                    reason: 'Violation concernant des données sensibles (catégories particulières de l\'article 9)'
                };
            }
            
            // Vérifier le niveau d'impact
            const impactLevel = breachData['impact-level'];
            if (impactLevel && notificationCriteria.impactLevels[impactLevel]) {
                if (notificationCriteria.impactLevels[impactLevel].notificationRequired) {
                    return {
                        required: true,
                        reason: `Niveau d'impact jugé ${impactLevel}, nécessitant une notification`
                    };
                }
            }
            
            // Vérifier le nombre de personnes affectées
            const affectedPersons = parseInt(breachData['affected-persons'], 10);
            if (!isNaN(affectedPersons) && affectedPersons >= notificationCriteria.quantitativeCriteria.affectedPersonsThreshold) {
                return {
                    required: true,
                    reason: `Nombre important de personnes affectées (${affectedPersons})`
                };
            }
            
            // Vérifier le type de violation
            const breachType = breachData['breach-type'];
            const breachTypeInfo = breachTypeDefinitions[breachType];
            
            if (breachTypeInfo && breachTypeInfo.severity === 'critical') {
                return {
                    required: true,
                    reason: 'Type de violation jugé critique (exfiltration de données)'
                };
            }
            
            // Vérifier la combinaison de facteurs
            if (sensitivity === 'high' && affectedPersons >= notificationCriteria.quantitativeCriteria.highImpactThreshold) {
                return {
                    required: true,
                    reason: 'Combinaison de données à risque élevé et d\'un nombre significatif de personnes affectées'
                };
            }
            
            // Par défaut, si aucun critère n'est rempli
            return {
                required: false,
                reason: 'Aucun critère nécessitant une notification n\'est rempli'
            };
        },
        
        // Obtient les articles du RGPD applicables en fonction des données et du type de violation
        getApplicableArticles: function(breachData) {
            const applicableArticles = new Set(['33']); // L'article 33 est toujours applicable
            
            // Ajouter les articles en fonction des types de données
            const dataTypes = breachData.dataTypes || [];
            
            for (const type of dataTypes) {
                const dataTypeInfo = dataTypeDefinitions[type];
                if (dataTypeInfo && dataTypeInfo.rgpdArticles) {
                    dataTypeInfo.rgpdArticles.forEach(article => applicableArticles.add(article));
                }
            }
            
            // Ajouter les articles en fonction du type de violation
            const breachType = breachData['breach-type'];
            const breachTypeInfo = breachTypeDefinitions[breachType];
            
            if (breachTypeInfo && breachTypeInfo.articlesConcerned) {
                breachTypeInfo.articlesConcerned.forEach(article => applicableArticles.add(article));
            }
            
            // Vérifier si l'article 34 est applicable (communication aux personnes concernées)
            const impactLevel = breachData['impact-level'];
            if (impactLevel === 'severe' || impactLevel === 'critical') {
                applicableArticles.add('34');
            }
            
            // Convertir l'ensemble en tableau et trier
            return Array.from(applicableArticles).sort((a, b) => parseInt(a) - parseInt(b));
        },
        
        // Génère des recommandations en fonction de l'évaluation
        generateRecommendations: function(breachData, isNotificationRequired) {
            const recommendations = [];
            
            // Recommandations communes à toutes les violations
            recommendations.push('Documenter la violation dans votre registre des violations de données');
            recommendations.push('Analyser les causes de la violation et renforcer les mesures de sécurité appropriées');
            
            // Recommandations spécifiques aux notifications
            if (isNotificationRequired) {
                recommendations.push('Préparer la notification à l\'APD en suivant le format requis');
                recommendations.push('Soumettre la notification dans les 72 heures suivant la découverte de la violation');
                
                // Communication aux personnes concernées
                const impactLevel = breachData['impact-level'];
                if (impactLevel === 'severe' || impactLevel === 'critical') {
                    recommendations.push('Informer les personnes concernées de la violation dans les meilleurs délais');
                    recommendations.push('Fournir des conseils aux personnes concernées pour limiter l\'impact (changement de mot de passe, surveillance des comptes, etc.)');
                }
            }
            
            // Recommandations spécifiques au type de violation
            const breachType = breachData['breach-type'];
            
            switch (breachType) {
                case 'unauthorized-access':
                    recommendations.push('Réviser les contrôles d\'accès et les privilèges des utilisateurs');
                    recommendations.push('Mettre en place une authentification renforcée si nécessaire');
                    break;
                    
                case 'data-theft':
                    recommendations.push('Envisager de porter plainte auprès des autorités compétentes');
                    recommendations.push('Mettre en œuvre un chiffrement renforcé des données');
                    break;
                    
                case 'data-loss':
                    recommendations.push('Améliorer les procédures de sauvegarde et de restauration');
                    recommendations.push('Tester régulièrement la récupération des données');
                    break;
                    
                case 'data-alteration':
                    recommendations.push('Mettre en place des mécanismes de détection des modifications non autorisées');
                    recommendations.push('Renforcer les contrôles d\'intégrité des données');
                    break;
                    
                case 'disclosure':
                    recommendations.push('Réviser les politiques de partage de données');
                    recommendations.push('Former le personnel à la manipulation sécurisée des données');
                    break;
            }
            
            return recommendations;
        }
    };
})();
