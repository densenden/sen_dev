
📄 PRD: Bewerbungstool / CV- & Anschreiben-Generator in sen.dev

🎯 Ziel
	•	Aktuelle Projektdaten aus der DB (Techstack, Summary, Date, Links) nutzen, um automatisiert:
	1.	CV als PDF zu generieren (aufbauend auf deinem PDF-Layout public/Full Stack Creative (shorter) Summary.pdf und Bild public/denis.png).
	2.	Anschreiben als PDF zu generieren (mit variablen Feldern + AI-Text von SenApply GPT https://chatgpt.com/g/g-68d0f967751481919ae4c6267d405392-senapply).
	•	Alles direkt über ein /admin UI steuerbar: Bewerbung anlegen → Stelle URL → passende Projekte auswählen → PDFs erhalten.

⸻

📑 Funktionsumfang

1. Admin UI: Neue Bewerbung anlegen
	•	Formularfelder:
	•	Stellenausschreibung URL (Textfeld mit Preview-Button)
	•	Projekte auswählen (Checkbox-Liste aller DB-Projekte mit Title, Techstack, Datum → Toggle aktiv/inaktiv)
	•	Buttons:
	•	CV generieren
	•	Anschreiben generieren
	•	Zip export (beide PDFs zusammen)

2. CV Generator (PDF)
    Statischer Inhalt, aus original übernehmen, update projekte:
	•	Datenquelle:
Projekte und Details aus DB.
	•	Seitenaufbau (Inter Font, schlicht, responsive A4, Inter 9-13 pt, nur regular, schwarz oder grau, wie sen.dev, subheadlines versal semibold):
	•	Seite 1:
	•	Summary (CV Summary)
	•	Technical Skills (Frontend, Backend, CMS, Animation, AI/Automation)
	•	Soft Skills
	•	Experience (Firmen, Rollen, Zeitraum, kurze Bulletpoints, Website-Links)
	•	Seite 2:
	•	Education (Masterschool, Hochschule)
	•	Projects (nur ausgewählte → mit Techstack, kurzer Satz, Case Study Website Link als klickbarer Hyperlink dev.sen.studio/projects/xxx )
	•	Languages
	•	Interests
	•	Technische Umsetzung:
	•	@react-pdf/renderer für sauberen React-basierten PDF-Bau
	•	Fonts: Inter Regular/Bold eingebettet
	•	Hyperlinks: Link-Komponente von react-pdf
	•	Export: PDFDownloadLink (Client) oder Server-Side Route (/api/pdf/cv)

3. Anschreiben Generator (PDF)
	•	Datenquelle: SenApply GPT (Erwartet Stellenanzeige aus URL hat meist keinen direktzugriff zu websiten, braucht also Kompletten Text, der von seite gescraped wird)
	•	Stammdaten: Denis Leif Kreuzer, Paradiesgasse 53, 60594 Frankfurt, Tel, Mail (fest im Template)
	•	Variabel: Firma, Ansprechpartner, Stelle, URL
	•	Anschreibentext: API-Call an SenApply GPT mit DB-Daten (Summary, Skills, ausgewählte Projekte)
	•	Layout:
	•	Kopf: Absenderadresse links oben
	•	Empfängeradresse darunter (Firma, Ansprechpartner)
	•	Datum (auto)
	•	Betreff: „Bewerbung als [Stelle]“
	•	Textkörper: GPT-Ausgabe
	•	Grußformel + Signatur (Name)
	•	Technische Umsetzung:
	•	GPT-Integration via fetch("https://api.openai.com/v1/…") → Response als Textblock (Bsp unten)
	•	PDF mit react-pdf, einspaltig, Inter Font
	•	Export analog CV (/api/pdf/coverletter)

⸻

⚙️ Tech Stack & Komponenten
	•	Frontend: React (Next.js im sen.dev Monorepo), Tailwind für Admin UI
	•	Backend: Next.js API Routes für PDF-Generierung + GPT-Call
	•	PDF-Engine: @react-pdf/renderer (sauber im Monorepo)
	•	DB: Bestehende Projekt-DB (Prisma ORM)
	•	Fonts: Inter (Google Fonts → lokal eingebettet)

⸻

📂 Struktur im Monorepo

/apps/sen.dev
  /pages/admin/applications.tsx    // UI: Bewerbungen
  /components/admin/ApplicationForm.tsx
  /lib/pdf/CVDocument.tsx          // react-pdf Template CV
  /lib/pdf/CoverLetterDocument.tsx // react-pdf Template Anschreiben
  /pages/api/pdf/cv.ts             // API Route für CV
  /pages/api/pdf/coverletter.ts    // API Route für Anschreiben
  /lib/gpt/senapply.ts             // GPT-Integration


⸻

🖼️ Beispiel-Flow
	1.	Admin → „Neue Bewerbung“
	2.	URL der Stellenanzeige eingeben → Projekte auswählen → Klick auf „Generieren“
	3.	System ruft GPT für Anschreiben-Text auf füllt Felder→ Anschreiben Texte Vorschau, Bearbeitung, RTF editieren der Felder Firma, Ansprechpartner, Stelle, anschreiben,   das kann dann gespeichert werden, 
    3.5 Erzeugt 2 PDFs
	4.	Download-Link für CV & Anschreiben mit icons erscheinen unten
    5.  Speichern der PDF Dateien mit sinvollem Namen in neuer Supabase Bucket, speichern der Bewerbungnen in einer Übersicht sodass man an die alten PDF drankommt.

⸻

Response GPT Beispiel: 

Alles klar – ich verfasse dir ein prägnantes Anschreiben für die Hochschule RheinMain auf die Stelle als Wissenschaftliche:r Mitarbeiter:in (m/w/d) im Drittmittelprojekt DiValuation.

⸻

Ansprechpartner: Johannes Luderschmidt, Daniela Ewald
Stelle: Wissenschaftliche:r Mitarbeiter:in (m/w/d) im Drittmittelprojekt DiValuation
Firma: Hochschule RheinMain

⸻

Anschreiben

Sehr geehrter Herr Luderschmidt, sehr geehrte Frau Ewald,

die ausgeschriebene Position im Drittmittelprojekt DiValuation hat mich sofort angesprochen, da sie meine Kompetenzen in Datenvisualisierung, Interface Design und wissenschaftlicher Analyse mit meinem Interesse an Partizipation, Bildung und digitaler Kommunikation ideal verbindet.

In meiner bisherigen Laufbahn habe ich kreative und technische Projekte von der Konzeption bis zur Umsetzung verantwortet. Dabei habe ich Erfahrungen in der Analyse qualitativer Daten, der strukturierenden Aufbereitung komplexer Inhalte sowie der Entwicklung interaktiver Visualisierungen gesammelt. Besonders reizvoll finde ich die Aufgabe, Forschungsergebnisse so zu gestalten, dass sie nicht nur wissenschaftlich fundiert, sondern auch verständlich und zugänglich für unterschiedliche Zielgruppen werden.

Meine Ausbildung und Praxis als Softwareentwickler und Designer sowie meine Fortbildung zum AI Software Engineer haben mir ein interdisziplinäres Profil ermöglicht, das analytische Genauigkeit mit visueller Kreativität verbindet. Ich arbeite gerne im Team, bringe aber ebenso die Fähigkeit zum selbstständigen wissenschaftlichen Arbeiten mit. Das geplante Projekt zur Evaluation von Jugendbeteiligung spricht mich besonders an, da es gesellschaftlich relevante Fragestellungen mit gestalterischen und methodischen Herausforderungen verbindet.

Sehr gerne möchte ich meine Expertise einbringen, um die Hochschule RheinMain in diesem Forschungsprojekt tatkräftig zu unterstützen und innovative Lösungen zur Visualisierung von Evaluationsergebnissen zu entwickeln.

Ich freue mich über die Einladung zu einem persönlichen Gespräch.

Mit freundlichen Grüßen
Denis Leif Kreuzer

⸻

Möchtest du, dass ich das Anschreiben noch stärker auf den wissenschaftlichen Fokus (z. B. qualitative Datenanalyse, Evaluation) ausrichte, oder soll es die Design-/Visualisierungsseite stärker betonen?

⸻