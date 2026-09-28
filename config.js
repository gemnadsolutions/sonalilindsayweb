/* The only integration setting needed before accepting enquiries.
 * Use an HTTPS endpoint that accepts JSON POST and returns a successful 2xx response.
 * Never put private service keys or email credentials in this public file.
 * Leave empty to keep honest, local-only enquiry preparation enabled.
 */
window.SONALI_CONFIG = Object.freeze({
  emailEndpoint: '',
  featuredPlaylist: 'PLR32wfktKn32djqg02-VK3CS3TCt3zmEd',
  videosPlaylist: 'PLR32wfktKn320Vlba-eeAaRiPF5DTPcqG',
  // Verified playlist snapshot, 28 September 2026. The players cue the live playlist.
  releases: [
    { id: '5Y7Lm3UY_mM', title: 'Saregama — Sonali Lindsay' },
    { id: 'xb1OAIFNmLM', title: 'Showers Of Light — Sonali Lindsay' },
    { id: 'QHXGc06jeYA', title: 'Oba Mata Dun Adare — Sonali Lindsay' },
    { id: 'G6A6Te3awqc', title: 'Amma (අම්මා) — Sonali Lindsay' }
  ]
});
