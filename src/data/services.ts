import { Wallet, Users, Brain, FileSearch, TrendingUp, GraduationCap } from 'lucide-react';

export const services = [
    {
        id: '01',
        title: 'Pôle Paie',
        slug: 'pole-paie',
        image: '/service_finance.png',
        icon: Wallet,
        description: "Externalisez votre gestion de la paie en toute sérénité. Notre équipe d'experts garantit la fiabilité, la conformité et la confidentialité de vos données sociales.",
        details: [
            "Établissement et édition des bulletins de paie conformes",
            "Déclarations sociales mensuelles (DSN, URSSAF, retraite)",
            "Gestion administrative des entrées et sorties",
            "Gestion des congés, absences et temps de travail",
            "Veille juridique et réglementaire permanente",
            "Accompagnement lors des contrôles URSSAF",
            "Tableau de bord social et reporting personnalisé",
            "Dématérialisation et coffre-fort numérique"
        ],
        benefits: [
            "Gain de temps et concentration sur votre cœur de métier",
            "Sécurisation juridique et conformité garantie",
            "Réduction des risques d'erreurs et de sanctions",
            "Expertise pointue et mise à jour permanente",
            "Confidentialité et protection des données"
        ],
        faq: [
            { question: "Comment garantissez-vous la confidentialité des données ?", answer: "Nous utilisons des outils sécurisés et conformes au RGPD (coffre-fort numérique, serveurs sécurisés). Nos collaborateurs sont soumis à une clause de confidentialité stricte." },
            { question: "Que se passe-t-il en cas de contrôle URSSAF ?", answer: "Nous vous assistons tout au long du contrôle, préparons les documents nécessaires et répondons aux questions de l'inspecteur." },
            { question: "Puis-je garder la main sur la saisie des variables ?", answer: "Oui, nous mettons à votre disposition un portail collaboratif pour saisir les variables (congés, primes...) en toute simplicité." }
        ]
    },
    {
        id: '02',
        title: 'Pôle Ressources Humaines',
        slug: 'pole-ressources-humaines',
        image: '/service_hr.png',
        icon: Users,
        description: "Optimisez la gestion de votre capital humain avec nos solutions RH sur-mesure. De l'administration du personnel au développement des talents, nous vous accompagnons dans toutes vos problématiques RH.",
        details: [
            "Administration du personnel et dossiers individuels",
            "Gestion des contrats de travail et avenants",
            "Procédures disciplinaires et ruptures conventionnelles",
            "Relations avec les instances représentatives (CSE)",
            "Élaboration et suivi des entretiens professionnels",
            "Gestion prévisionnelle des emplois et compétences (GPEC)",
            "Politique de rémunération et avantages sociaux",
            "Mise en conformité réglementaire (RGPD, index égalité...)"
        ],
        benefits: [
            "Structuration et professionnalisation de votre fonction RH",
            "Amélioration du climat social et de la QVT",
            "Fidélisation des talents et réduction du turnover",
            "Conformité juridique et prévention des contentieux",
            "Développement de la marque employeur"
        ],
        faq: [
            { question: "Proposez-vous des DRH à temps partagé ?", answer: "Oui, nous pouvons mettre à votre disposition un expert RH quelques jours par semaine ou par mois selon vos besoins." },
            { question: "Comment nous aider à recruter ?", answer: "Nous vous accompagnons sur la définition du poste, la rédaction de l'offre et la présélection des candidats." },
            { question: "Pouvez-vous mettre en place le CSE ?", answer: "Tout à fait, nous gérons l'organisation des élections professionnelles de A à Z." }
        ]
    },
    {
        id: '03',
        title: 'Pôle Formation',
        slug: 'pole-formation',
        image: '/service_training.png',
        icon: GraduationCap,
        description: "Développez les compétences de vos équipes avec nos programmes de formation sur-mesure. Management, RH, Paie, Droit social : nous construisons des parcours adaptés à vos besoins.",
        details: [
            "Formations en droit social et actualités de la paie",
            "Parcours managériaux et leadership",
            "Formation des membres du CSE (SSCT, économique...)",
            "Ateliers RH : recrutement, entretien annuel, QVT",
            "Formation aux outils digitaux RH",
            "Ingénierie pédagogique sur-mesure",
            "Bilan de compétences et VAE",
            "Coaching d'équipe et Team Building"
        ],
        benefits: [
            "Montée en compétences opérationnelle immédiate",
            "Adaptation aux évolutions légales et métiers",
            "Motivation et fidélisation des collaborateurs",
            "Performance accrue des équipes",
            "Programmes éligibles aux financements (OPCO...)"
        ],
        faq: [
            { question: "Vos formations sont-elles certifiantes ?", answer: "Certaines de nos formations sont éligibles au CPF et certifiantes. Contactez-nous pour le catalogue détaillé." },
            { question: "Faites-vous du présentiel ou du distanciel ?", answer: "Nous proposons les deux formats, ainsi que du blended learning (mixte)." },
            { question: "Pouvez-vous créer une formation spécifique pour mon entreprise ?", answer: "C'est notre spécialité. Nous analysons vos besoins pour construire un programme 100% sur-mesure." }
        ]
    },
    {
        id: '04',
        title: 'Pôle Coaching',
        slug: 'pole-coaching',
        image: '/service_coaching.png',
        icon: Brain,
        description: "Révélez le potentiel de vos dirigeants, managers et équipes grâce à un accompagnement personnalisé. Nos coachs certifiés vous aident à développer vos compétences, votre leadership et votre performance collective.",
        details: [
            "Coaching individuel de dirigeants et managers",
            "Coaching d'équipe et cohésion collective",
            "Développement du leadership et de la posture managériale",
            "Gestion du stress et prévention des risques psychosociaux",
            "Accompagnement à la prise de poste",
            "Gestion des conflits et médiation",
            "Préparation aux entretiens et prises de parole",
            "Bilan de compétences et orientation professionnelle"
        ],
        benefits: [
            "Développement des soft skills et de l'intelligence émotionnelle",
            "Amélioration de la performance individuelle et collective",
            "Renforcement de la confiance en soi et de l'assertivité",
            "Meilleure gestion du stress et de la charge mentale",
            "Création d'un environnement de travail positif et motivant"
        ],
        faq: [
            { question: "Quelle est la différence entre coaching et formation ?", answer: "La formation transmet un savoir, le coaching permet de trouver ses propres solutions et de lever des blocages personnels." },
            { question: "Combien de temps dure un coaching ?", answer: "Cela dépend de l'objectif, mais généralement entre 6 et 10 séances espacées de 2 à 3 semaines." },
            { question: "Vos coachs sont-ils certifiés ?", answer: "Oui, tous nos coachs sont certifiés par des écoles reconnues et supervisés dans leur pratique." }
        ]
    },
    {
        id: '05',
        title: 'Pôle Audit',
        slug: 'pole-audit',
        image: '/service_audit.png',
        icon: FileSearch,
        description: "Sécurisez vos pratiques et identifiez vos risques grâce à un audit social complet. Nous analysons votre conformité légale et conventionnelle pour vous protéger.",
        details: [
            "Audit de conformité des bulletins de paie",
            "Audit des charges sociales et régularisations",
            "Audit des contrats de travail et procédures",
            "Audit de la durée du travail et des congés",
            "Diagnostic des risques psychosociaux (RPS)",
            "Audit de la protection sociale complémentaire",
            "Cartographie des risques RH",
            "Recommandations et plan d'action correctif"
        ],
        benefits: [
            "Sécurisation juridique immédiate",
            "Optimisation des coûts sociaux",
            "Prévention des redressements URSSAF",
            "Vision claire de vos pratiques RH",
            "Amélioration de la fiabilité des données sociales"
        ],
        faq: [
            { question: "Combien de temps prend un audit ?", answer: "Cela varie selon la taille de l'entreprise, de quelques jours à plusieurs semaines." },
            { question: "L'audit est-il confidentiel ?", answer: "Absolument, toutes nos interventions sont couvertes par le secret professionnel." },
            { question: "Que reçoit-on à la fin ?", answer: "Un rapport détaillé avec les constats, les risques évalués (financiers, pénaux) et des préconisations priorisées." }
        ]
    },
    {
        id: '06',
        title: 'Pôle Management et Transformation',
        slug: 'pole-management-transformation',
        image: '/service_management.png',
        icon: TrendingUp,
        description: "Accompagnez vos transformations organisationnelles et culturelles avec efficacité. Nous vous aidons à piloter le changement et à aligner votre capital humain sur votre stratégie.",
        details: [
            "Accompagnement aux fusions-acquisitions (volet RH)",
            "Réorganisation de services et redimensionnement",
            "Conduite du changement et communication interne",
            "Mise en place de la marque employeur",
            "Audit de climat social et QVT",
            "Digitalisation de la fonction RH (SIRH)",
            "Gestion des talents et plans de succession",
            "Responsabilité Sociétale des Entreprises (RSE)"
        ],
        benefits: [
            "Réussite de vos projets de transformation",
            "Adhésion des équipes au changement",
            "Alignement stratégique RH / Business",
            "Modernisation de vos pratiques",
            "Pérennité de l'entreprise"
        ],
        faq: [
            { question: "Comment gérer les résistances au changement ?", answer: "Nous impliquons les équipes dès le début via des ateliers participatifs et une communication transparente." },
            { question: "Aidez-vous au choix d'un logiciel RH ?", answer: "Oui, nous pouvons rédiger le cahier des charges et vous aider à sélectionner la meilleure solution (SIRH)." },
            { question: "Intervenez-vous en situation de crise ?", answer: "Oui, nous avons des experts en gestion de crise sociale pour apaiser le dialogue et trouver des issues." }
        ]
    }
];
