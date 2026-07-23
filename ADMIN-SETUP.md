# Salong Alexander – adminversion

Den här versionen innehåller en färdig Decap CMS-panel på `/admin/`.

## Kunden kan styra

- priser och behandlingar
- ordinarie och avvikande öppettider
- salongens bildspel
- aktuellt erbjudande eller nyhet
- startsidans, Om oss-sektionens och Jobba hos oss-sektionens texter

## Innan inloggningen fungerar

1. Skapa GitHub-repot `isaacbarjakob/Salong-Alexander`.
2. Lägg in hela webbplatsen i repot.
3. Koppla GitHub-repot till Salong Alexanders Cloudflare Pages-projekt.
4. Öppna `admin/config.yml`.
5. Ersätt:
   `https://BYT-TILL-DIN-DECAP-PROXY.workers.dev`
   med den riktiga adressen till OAuth-proxyn.
6. Lägg till kundens GitHub-konto som collaborator med skrivrättighet endast i detta repo.
7. Kunden loggar därefter in på:
   `https://salongalexander.se/admin/`

Varje framtida kund får ett separat repo och därmed endast åtkomst till sin egen hemsida.
