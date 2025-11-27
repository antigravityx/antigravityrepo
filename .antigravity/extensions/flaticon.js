// VerixRichon Flaticon API Extension
// Firmado por: VerixRichon Software Factory
// Fecha: 25 de Noviembre 2025

class FlaticonExtension {
    constructor(apiKey = null) {
        this.baseURL = 'https://api.flaticon.com/v3';
        this.apiKey = apiKey;
        this.cache = new Map();
        this.signature = 'VerixRichon';
    }

    // Configurar API Key
    setApiKey(key) {
        this.apiKey = key;
        console.log('[VerixRichon] Flaticon API Key configured');
    }

    // Buscar iconos
    async searchIcons(query, options = {}) {
        const {
            limit = 20,
            page = 1,
            format = 'svg',
            color = null,
            shape = null
        } = options;

        // Check cache first
        const cacheKey = `search_${query}_${limit}_${page}`;
        if (this.cache.has(cacheKey)) {
            console.log('[VerixRichon] Returning cached results');
            return this.cache.get(cacheKey);
        }

        try {
            const params = new URLSearchParams({
                q: query,
                limit,
                page,
                ...(color && { color }),
                ...(shape && { shape })
            });

            const response = await fetch(`${this.baseURL}/search/icons?${params}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            // Cache results
            this.cache.set(cacheKey, data);

            console.log(`[VerixRichon] Found ${data.data?.length || 0} icons for "${query}"`);
            return data;

        } catch (error) {
            console.error('[VerixRichon] Flaticon API Error:', error);
            return { error: error.message, data: [] };
        }
    }

    // Obtener icono por ID
    async getIcon(iconId, format = 'svg') {
        const cacheKey = `icon_${iconId}_${format}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseURL}/item/icon/${iconId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, data);

            return data;

        } catch (error) {
            console.error('[VerixRichon] Error getting icon:', error);
            return { error: error.message };
        }
    }

    // Descargar icono
    async downloadIcon(iconId, format = 'svg', size = 512) {
        try {
            const response = await fetch(
                `${this.baseURL}/item/icon/download/${iconId}/${format}/${size}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Download Error: ${response.status}`);
            }

            const blob = await response.blob();
            console.log(`[VerixRichon] Icon ${iconId} downloaded`);
            return blob;

        } catch (error) {
            console.error('[VerixRichon] Download error:', error);
            return null;
        }
    }

    // Obtener iconos populares
    async getPopular(options = {}) {
        const { limit = 20, page = 1 } = options;

        try {
            const response = await fetch(
                `${this.baseURL}/search/icons/priority?limit=${limit}&page=${page}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(`[VerixRichon] Retrieved ${data.data?.length || 0} popular icons`);
            return data;

        } catch (error) {
            console.error('[VerixRichon] Error getting popular icons:', error);
            return { error: error.message, data: [] };
        }
    }

    // Limpiar cache
    clearCache() {
        this.cache.clear();
        console.log('[VerixRichon] Cache cleared');
    }

    // Obtener estadísticas de uso
    getStats() {
        return {
            signature: this.signature,
            cacheSize: this.cache.size,
            apiConfigured: !!this.apiKey,
            baseURL: this.baseURL
        };
    }
}

// Exportar para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlaticonExtension;
}

// Uso global en navegador
if (typeof window !== 'undefined') {
    window.VerixRichonFlaticon = FlaticonExtension;
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Flaticon API Extension
    Verix × Richon
    Proyecto Amistad 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USAGE EXAMPLES:

// Initialize
const flaticon = new FlaticonExtension('YOUR_API_KEY');

// Search icons
const results = await flaticon.searchIcons('music', { limit: 10 });

// Get specific icon
const icon = await flaticon.getIcon(123456);

// Download icon
const blob = await flaticon.downloadIcon(123456, 'svg', 512);

// Get popular icons
const popular = await flaticon.getPopular({ limit: 20 });

// Clear cache
flaticon.clearCache();

// Get stats
const stats = flaticon.getStats();

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
