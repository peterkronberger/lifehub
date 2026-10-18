(function () {
  'use strict';

  /**
   * @param {readonly string[]} languages z. B. navigator.languages
   * @returns {'de'|'en'} 'de', wenn der erste Eintrag mit "de" beginnt (Groß/Klein egal), sonst 'en'
   */
  function detectLanguage(languages) {
    var list = languages && languages.length ? languages : [navigator.language];
    var first = list[0];
    return typeof first === 'string' && first.toLowerCase().indexOf('de') === 0 ? 'de' : 'en';
  }

  /**
   * Zeigt nur Blöcke mit data-lang === lang, setzt <html lang>, document.title
   * (aus data-title-<lang>) und aria-pressed der Buttons.
   * @param {'de'|'en'} lang
   */
  function applyLanguage(lang) {
    var root = document.documentElement;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== lang;
    });
    root.lang = lang;
    var title = root.dataset['title' + lang.charAt(0).toUpperCase() + lang.slice(1)];
    if (title) {
      document.title = title;
    }
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
  }

  function createSwitch(container) {
    container.innerHTML =
      '<div role="group" aria-label="Sprache / Language">' +
      '<button type="button" data-set-lang="de" aria-pressed="true">DE</button>' +
      '<span aria-hidden="true">|</span>' +
      '<button type="button" data-set-lang="en" aria-pressed="false">EN</button>' +
      '</div>';
    container.addEventListener('click', function (event) {
      var button = event.target.closest('[data-set-lang]');
      if (button) {
        applyLanguage(button.dataset.setLang);
      }
    });
  }

  var container = document.getElementById('lang-switch');
  if (container) {
    createSwitch(container);
  }
  applyLanguage(detectLanguage(navigator.languages));
})();
