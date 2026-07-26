# LL Admin – Salong Alexander

Hemsidan är nu säkert förberedd för LL Admin.

## Säkerheten

Connectorn får endast ändra HTML-element som uttryckligen har attributet `data-ll-key`. Alla andra rubriker, sektioner, bilder, knappar, menyer, stilar och script lämnas orörda.

## Engångsinstallationen

1. Publicera först den uppdaterade LL Admin-versionen.
2. Öppna Salong Alexander i LL Admin.
3. Första gången visas en färdig Salong Alexander-mall med rubriker, texter, priser, kontaktuppgifter och öppettider.
4. Klicka **Spara ändringar**.
5. Klicka **Skapa connector** och kopiera kodraden.
6. Öppna `index.html` i Salong Alexander och klistra in kodraden precis ovanför `<script src="script.js"></script>`.
7. Publicera Salong Alexander på testbranchen först.
8. Ändra ett testfält i LL Admin och kontrollera att endast rätt plats ändras.

Connector-raden innehåller ett unikt webbplats-ID och en token och kan därför inte fyllas i i förväg i ZIP-filen.
