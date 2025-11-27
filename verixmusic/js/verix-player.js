/**
 * VerixPlayer Core Engine
 * Implements Hybrid Cloud/Local Architecture
 * VerixRichon Software Factory
 */

class VerixPlayer {
    constructor() {
        this.audio = new Audio();
        this.mode = navigator.onLine ? 'CLOUD' : 'LOCAL';
        this.playlist = [];
        this.currentIndex = 0;

        // Event listeners for connectivity
        window.addEventListener('online', () => this.switchMode('CLOUD'));
        window.addEventListener('offline', () => this.switchMode('LOCAL'));

        console.log(`VerixPlayer initialized in ${this.mode} mode.`);
    }

    switchMode(newMode) {
        this.mode = newMode;
        console.log(`Switched to ${this.mode} mode.`);
        // Here we would trigger logic to swap data sources
        // e.g., Cloud API vs Local IndexedDB
        this.updateUIStatus();
    }

    async play(track) {
        console.log(`Attempting to play: ${track.title} in ${this.mode} mode`);

        let sourceUrl = '';

        if (this.mode === 'CLOUD') {
            sourceUrl = await this.getCloudSource(track);
        } else {
            sourceUrl = await this.getLocalSource(track);
        }

        if (sourceUrl) {
            this.audio.src = sourceUrl;
            this.audio.play()
                .then(() => console.log('Playback started'))
                .catch(e => console.error('Playback failed:', e));

            this.updateNowPlaying(track);
        } else {
            console.error('No source available for this track in current mode.');
            alert('Track not available offline. (Simulated)');
        }
    }

    pause() {
        this.audio.pause();
    }

    // Simulated Cloud API Strategy
    async getCloudSource(track) {
        // In a real app, this would call an API like Spotify/SoundCloud/YouTube wrapper
        // For now, we return the direct URL provided in the track object
        // or a demo stream.
        return track.url;
    }

    // Simulated Local Strategy (The "Compressed Code" / Offline fallback)
    async getLocalSource(track) {
        // This would retrieve the file from CacheStorage or IndexedDB
        // For this demo, we check if we have a local blob URL
        if (track.localUrl) {
            return track.localUrl;
        }
        // Fallback: Try to find in Cache
        const cache = await caches.open('verix-music-v1');
        const response = await cache.match(track.url);
        if (response) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
        return null;
    }

    updateUIStatus() {
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.textContent = this.mode === 'CLOUD' ? '☁️ ONLINE' : '💾 OFFLINE';
            statusEl.className = this.mode === 'CLOUD' ? 'status-online' : 'status-offline';
        }
    }

    updateNowPlaying(track) {
        const playerBar = document.getElementById('player-bar');
        const titleEl = document.getElementById('np-title');
        const artistEl = document.getElementById('np-artist');

        if (playerBar && titleEl && artistEl) {
            titleEl.textContent = track.title;
            artistEl.textContent = track.artist;
            playerBar.classList.remove('hidden');
            playerBar.classList.add('visible');
        }
    }
}

// Export instance
window.verixPlayer = new VerixPlayer();
