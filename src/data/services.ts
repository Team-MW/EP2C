import { Wallet, Users, Lightbulb, Brain } from 'lucide-react';

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
        ]
    },
    {
        id: '03',
        title: 'Pôle Conseil',
        slug: 'pole-conseil',
        image: '/service_training.png',
        icon: Lightbulb,
        description: "Bénéficiez d'un accompagnement stratégique pour optimiser votre organisation, améliorer vos performances et anticiper les transformations. Nos consultants vous apportent leur expertise métier et leur vision externe.",
        details: [
            "Diagnostic organisationnel et audit social",
            "Conseil en stratégie RH et transformation",
            "Optimisation des processus et de l'organisation",
            "Conduite du changement et gestion de projet",
            "Mise en place d'outils de pilotage RH",
            "Accompagnement à la digitalisation RH",
            "Conseil en relations sociales et négociation",
            "Élaboration de politiques RH (mobilité, formation, diversité...)"
        ],
        benefits: [
            "Vision externe et objective de votre organisation",
            "Identification des leviers de performance",
            "Accompagnement personnalisé et pragmatique",
            "Transfert de compétences et montée en autonomie",
            "Solutions innovantes et adaptées à vos enjeux"
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
        ]
    }
];
