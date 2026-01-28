import DashboardLayout from '../../layouts/DashboardLayout';
import { useUser } from '@clerk/clerk-react';
import { FileCheck, Clock, AlertCircle, ArrowRight, FileText } from 'lucide-react';

export default function ClientDashboard() {
    const { user } = useUser();

    return (
        <DashboardLayout>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    Bonjour, {user?.firstName ? user.firstName : 'Cher Client'} ! 👋
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    Voici un aperçu de l'avancement de votre dossier et de vos documents.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-[#1044A9] to-[#2563eb] p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Clock size={24} className="text-white" />
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Prioritaire</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">En cours</div>
                    <div className="text-blue-100 text-sm">Votre dossier est en traitement</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <FileCheck size={24} className="text-indigo-600" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                    <div className="text-gray-500 text-sm">Documents validés cette semaine</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 rounded-xl">
                            <AlertCircle size={24} className="text-orange-600" />
                        </div>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">Action requise</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
                    <div className="text-gray-500 text-sm">Document manquant (KBIS)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline / Progress */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Avancement du dossier
                        <span className="text-sm font-normal text-gray-400 ml-auto">Mis à jour il y a 2h</span>
                    </h3>

                    <div className="relative space-y-8 pl-4 border-l-2 border-gray-100">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-none">Dossier Initialisé</h4>
                                <p className="text-xs text-gray-500">24 Jan 2024 - 09:30</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-none">Vérification des pièces</h4>
                                <p className="text-xs text-gray-500">25 Jan 2024 - 14:15</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-[#1044A9] ring-4 ring-blue-50 border-2 border-white"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1044A9] leading-none">Instruction en cours</h4>
                                <p className="text-xs text-blue-600 font-medium">L'équipe analyse votre demande</p>
                            </div>
                        </div>

                        <div className="relative opacity-50">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-400 leading-none">Validation Finale</h4>
                                <p className="text-xs text-gray-400">En attente</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Documents */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Documents Récents</h3>

                    <div className="space-y-4 mb-6 flex-1">
                        {[
                            { name: 'Contrat_Prestation.pdf', size: '2.4 MB', type: 'PDF' },
                            { name: 'Attestation_Sociale.pdf', size: '1.1 MB', type: 'PDF' },
                            { name: 'Devis_Signe.jpg', size: '4.8 MB', type: 'IMG' },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50 hover:border-gray-200">
                                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-4">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900">{doc.name}</h4>
                                    <p className="text-xs text-gray-500">{doc.size} • {doc.type}</p>
                                </div>
                                <button className="text-gray-400 hover:text-[#1044A9]">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                        Voir tous les documents
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
