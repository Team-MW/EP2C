import DashboardLayout from '../../layouts/DashboardLayout';

import DocumentList from '../../components/dashboard/DocumentList';

export default function ClientDocuments() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Mes Documents</h2>
                <p className="text-gray-500">Gérez et transmettez vos documents administratifs en toute sécurité.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <DocumentList />
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#1044A9] text-white p-6 rounded-xl shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Besoin d'aide ?</h3>
                        <p className="text-blue-100 text-sm mb-4">Notre équipe support est disponible pour vous accompagner dans la gestion de vos documents.</p>
                        <a
                            href="https://wa.me/33659247370"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center border border-white text-white font-semibold py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Contacter le support
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">Espace de stockage</h3>
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>450 Mo utilisés</span>
                            <span>1 Go disponible</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
