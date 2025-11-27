// VerixRichon Flaticon Configuration
// Firmado por: VerixRichon Software Factory
// Fecha: 25 de Noviembre 2025

const FLATICON_CONFIG = {
    apiKey: 'FPSX88834ed6627c9b39f7f05da54ac682ca',
    baseURL: 'https://api.flaticon.com/v3',
    defaultFormat: 'svg',
    defaultSize: 512,
    cacheEnabled: true,
};

export class FlaticonService {
    private cache: Map<string, any> = new Map();

    async searchIcons(query: string, limit: number = 20) {
        const cacheKey = `search_${query}_${limit}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(
                `${FLATICON_CONFIG.baseURL}/search/icons?q=${encodeURIComponent(query)}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${FLATICON_CONFIG.apiKey}`,
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Flaticon API Error: ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error('[VerixRichon] Flaticon error:', error);
            return { data: [] };
        }
    }

    async getIconUrl(iconId: number, format: string = 'svg', size: number = 512) {
        return `${FLATICON_CONFIG.baseURL}/item/icon/download/${iconId}/${format}/${size}`;
    }

    clearCache() {
        this.cache.clear();
    }
}

export const flaticonService = new FlaticonService();

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Flaticon TypeScript Integration
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
