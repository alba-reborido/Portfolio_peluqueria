const langSelect = document.getElementById('languageSwitcher') || null;

let currentLang = localStorage.getItem('lang') || 'gl';

function setLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(response => {
            if (!response.ok) throw new Error(`No se pudo cargar lang/${lang}.json`);
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translated = translations[key];
                if (!translated) return;

                const tag = el.tagName.toLowerCase();

                if (tag === 'input' || tag === 'textarea') {
                    if (el.placeholder !== undefined) el.placeholder = translated;
                } else if (tag === 'option') {
                    el.textContent = translated;
                } else {
                    el.innerText = translated;
                }
            });

            if (translations.title) {
                document.title = translations.title;
            }

            currentLang = lang;
        })
        .catch(err => {
            console.error(`Error al cargar idioma '${lang}':`, err);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    if (langSelect) {
        langSelect.value = currentLang;

        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            localStorage.setItem('lang', selectedLang);
            setLanguage(selectedLang);
        });
    }
});
