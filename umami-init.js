/* Medicao de visitas (Umami): limpa o que sai do navegador antes de qualquer envio.
   Envia o caminho da pagina (sem query nem hash) e o site de origem (so o dominio).
   Nao envia titulo da pagina, idioma nem tamanho de tela. */
(function () {
  'use strict';
  window.umamiBeforeSend = function (type, payload) {
    try {
      var u = new URL(payload.url, location.origin);
      payload.url = location.origin + u.pathname;
      payload.title = '';
      payload.language = '';
      payload.screen = '';
      if (payload.referrer) { try { payload.referrer = new URL(payload.referrer).origin + '/'; } catch (e) { payload.referrer = ''; } }
      return payload;
    } catch (e) { return false; }
  };
})();
