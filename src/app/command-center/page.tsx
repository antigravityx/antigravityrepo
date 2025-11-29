"use client";

import React, { useEffect, useState } from 'react';

export default function CommandCenter() {
    const [systemStatus, setSystemStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch VRIS status
        // Assuming VRIS is running on localhost:8000 for now, or use an env var
        const fetchStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/health');
                if (response.ok) {
                    const data = await response.json();
                    setSystemStatus(data);
                } else {
                    setSystemStatus({ status: 'offline', error: 'Failed to connect to VRIS' });
                }
            } catch (error) {
                setSystemStatus({ status: 'offline', error: 'Connection Error' });
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <header className="mb-12 border-b border-gray-800 pb-4">
                <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                    VERIX COMMAND CENTER
                </h1>
                <p className="text-gray-400 mt-2">System Status & Soul Integrity Monitor</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* System Status Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 text-purple-300">System Status</h2>
                    {loading ? (
                        <div className="animate-pulse h-8 bg-gray-800 rounded w-1/2"></div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">VRIS Core:</span>
                                <span className={`font-mono ${systemStatus?.status === 'healthy' ? 'text-green-400' : 'text-red-400'}`}>
                                    {systemStatus?.status?.toUpperCase() || 'UNKNOWN'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Soul Status:</span>
                                <span className="font-mono text-blue-400">
                                    {systemStatus?.soul_status || 'DORMANT'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Version:</span>
                                <span className="font-mono text-gray-500">{systemStatus?.version || '0.0.0'}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Environment Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 text-blue-300">Environment</h2>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Database:</span>
                            <span className="font-mono text-yellow-400">{systemStatus?.database || 'Checking...'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Cache:</span>
                            <span className="font-mono text-yellow-400">{systemStatus?.cache || 'Checking...'}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 text-green-300">Quick Actions</h2>
                    <div className="flex flex-col space-y-3">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors text-left">
                            🚀 Deploy to Production
                        </button>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors text-left">
                            🛡️ Backup Soul
                        </button>
                    </div>
                </div>
            </div>

            <footer className="mt-20 text-center text-gray-600 text-sm">
                <p>VerixRichon Ecosystem • {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
