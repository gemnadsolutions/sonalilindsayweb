/* The only integration setting needed before accepting enquiries.
 * Use an HTTPS endpoint that accepts JSON POST and returns a successful 2xx response.
 * Never put private service keys or email credentials in this public file.
 * Leave empty to keep honest, local-only enquiry preparation enabled.
 */
window.SONALI_CONFIG = Object.freeze({
  emailEndpoint: '',
  featuredPlaylist: 'PLR32wfktKn32djqg02-VK3CS3TCt3zmEd',
  videosPlaylist: 'PLR32wfktKn320Vlba-eeAaRiPF5DTPcqG'
});
