import DashboardLayout from '../../layouts/DashboardLayout';

export default function ClientDashboard() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
                <p className="text-gray-500">Bienvenue sur votre espace client Efficience EP2C.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Documents en attente</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Dossiers traités</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Notifications</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
                </div>
            </div>

            {/* Content placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 h-64 flex items-center justify-center">
                Graphiques d'activité à venir...
            </div>
        </DashboardLayout>
    );
}
