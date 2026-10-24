/* Medicao de visitas (Umami): sanitiza antes de qualquer envio.
   Nunca saem do navegador: caminho real da pagina, titulo, query, hash, referrer completo. */
(function () {
  'use strict';
  var CATS = [
    [/^\/(index\.html)?$/, 'inicio'],
    [/^\/agendar(\/|$)/, 'agendamento'],
    [/^\/quem-sou-eu(\/|$)/, 'sobre'],
    [/^\/doencas(\/|$)/, 'conteudo-informativo'],
    [/^\/cirurgias(\/|$)/, 'conteudo-informativo']
  ];
  function cat(p) { for (var i = 0; i < CATS.length; i++) if (CATS[i][0].test(p)) return CATS[i][1]; return 'outros'; }
  window.umamiBeforeSend = function (type, payload) {
    try {
      var u = new URL(payload.url, location.origin), c = cat(u.pathname);
      payload.url = location.origin + '/' + c + '/';
      payload.title = c;
      if (payload.referrer) { try { payload.referrer = new URL(payload.referrer).origin + '/'; } catch (e) { payload.referrer = ''; } }
      return payload;
    } catch (e) { return false; }
  };
})();
