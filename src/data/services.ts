import { Wallet, Users, GraduationCap, Brain, FileSearch, TrendingUp } from 'lucide-react';

export const services = [
    {
        id: '01',
        title: 'Pôle Paie',
        slug: 'pole-paie',
        image: '/service_finance.png',
        icon: Wallet,
        description: "Externalisez votre gestion de la paie pour plus de fiabilité et de sérénité. Nos experts s'occupent de tout, de l'édition des bulletins aux déclarations sociales.",
        details: [
            "Établissement des bulletins de paie",
            "Déclarations sociales (DSN)",
            "Gestion des congés et absences",
            "Veille juridique et sociale"
        ]
    },
    {
        id: '02',
        title: 'Pôle Ressources Humaines',
        slug: 'pole-ressources-humaines',
        image: '/service_hr.png',
        icon: Users,
        description: "Optimisez votre capital humain avec nos solutions RH sur-mesure. Du recrutement à la gestion des carrières, nous vous accompagnons à chaque étape.",
        details: [
            "Recrutement et intégration",
            "Gestion administrative du personnel",
            "Relations sociales et CSE",
            "Marque employeur"
        ]
    },
    {
        id: '03',
        title: 'Pôle Formation',
        slug: 'pole-formation',
        image: '/service_training.png',
        icon: GraduationCap,
        description: "Développez les compétences de vos équipes grâce à nos programmes de formation adaptés aux enjeux de votre secteur.",
        details: [
            "Ingénierie de formation",
            "Formations management et soft skills",
            "Formations techniques et réglementaires",
            "Gestion des financements (OPCO)"
        ]
    },
    {
        id: '04',
        title: 'Pôle Coaching',
        slug: 'pole-coaching',
        image: '/service_coaching.png',
        icon: Brain,
        description: "Libérez le potentiel de vos dirigeants et managers à travers un accompagnement individuel ou collectif personnalisé.",
        details: [
            "Coaching de dirigeants",
            "Coaching d'équipe",
            "Gestion du stress et des conflits",
            "Développement du leadership"
        ]
    },
    {
        id: '05',
        title: 'Pôle Audit',
        slug: 'pole-audit',
        image: '/service_audit.png',
        icon: FileSearch,
        description: "Identifiez vos risques et opportunités grâce à nos audits complets (social, organisationnel, conformité).",
        details: [
            "Audit de conformité sociale",
            "Audit organisationnel",
            "Cartographie des risques",
            "Recommandations stratégiques"
        ]
    },
    {
        id: '06',
        title: 'Pôle Management et Transformation',
        slug: 'pole-management-transformation',
        image: '/service_management.png',
        icon: TrendingUp,
        description: "Accompagnez le changement et transformez votre organisation pour gagner en agilité et en performance.",
        details: [
            "Conduite du changement",
            "Réorganisation de services",
            "Optimisation des processus",
            "Projets d'entreprise"
        ]
    }
];
