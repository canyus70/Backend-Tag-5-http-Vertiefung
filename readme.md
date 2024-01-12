Übung zu "http Vertiefung" – FileServer & API

Thema: "Gästebuch für eine lokale Community"

Aufgabenstellung:
Erstelle dir mit Hilfe von Node.js einen File Server welcher Dateien aus einem lokalen "public" Ordner anhand des Pfades liefert
Dein File-Server sollte mindestens die Gästebuch-Homepage (index.html) eine style.css und ein Bild haben
Auf der Homepage befindet sich Info-Material (Text, Bilder) über die Community und zudem eine Auflistung aller Beiträge zum Gästebuch
Erstelle eine lokale .json Datei die alle Beiträge beinhaltet
Jeder Beitrag hat folgende Infos:
Name des Verfassers
Inhalt des Beitrags
Erstellungsdatum des Beitrags
Dein Server soll einen API-Endpunkt bieten (zb GET /api/beitraege) bei dem die Beiträge als JSON übermittelt werden

Bonus 1: Zeige die älteren Einträge weiter unten an; Der letzte Eintrag ist also immer ganz oben
Bonus 2: Erstelle ein Formular über dem Gästebuch bei dem Besucher ihren eigenen Beitrag verfassen können (und den dazugehörigen POST Endpunkt am Server)