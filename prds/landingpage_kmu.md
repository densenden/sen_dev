# PRD – Landingpage sen.dev

## Ziel
Erstellung einer **deutschsprachigen Landingpage** für sen.dev, die Mittelstand und Agenturen anspricht.  
Fokus: **Design + Code + AI** – schnelle, hochwertige Umsetzung von Projekten.  
Die Seite soll **Verkäufe & Terminbuchungen** generieren, keine reine Portfolio-Seite sein.  

---

## Struktur der Seite

### 1. Hero Section
- **Headline:** „Design + Code + AI – Ihr Projekt in 30 Tagen live“  
- **Subheadline:** „Wir bringen Ihre Idee in Rekordzeit von der Skizze zum digitalen Produkt. Für Mittelstand, Startups und Agenturen.“  
- **Call-to-Action (CTA):** Button → „Kostenlosen Termin buchen“ (scrollt direkt zum Formular)  
- Hintergrund: clean, minimalistisch, AI-inspiriert (leichte Glassmorph-Optik).  

---

### 2. Vertrauensaufbau
- Kurzer Text:  
  „Mit sen.dev verbinden wir kreative Konzeptentwicklung mit moderner Software-Entwicklung. Wir arbeiten mit React, Next.js, Tailwind, Node.js, Supabase, OpenAI-APIs und entwickeln digitale Produkte, die funktionieren – schnell, elegant und skalierbar.“  
- Bullet Points mit Icons:  
  - ✅ Klarer Fahrplan & fixe Paketpreise  
  - ✅ Designästhetik trifft auf sauberen Code  
  - ✅ AI-Integration für Workflow-Automatisierung  
  - ✅ Transparente Kommunikation & agile Methoden  

---

### 3. Pakete (ähnlich wie `/packages`, aufgebaut aber verkaufsorientiert)
Darstellung in 3 Karten (vergleichbar mit Pricing-Tables).  

**a) MVP Sprint – 9.800 €**  
- Ihr digitaler Prototyp in 30 Tagen  
- Enthalten: UX-Konzept, UI-Design, funktionierender Prototyp (React/Next.js), optional AI-Anbindung  
- **Beispielprojekt:** Interne Schulungs-App für Mitarbeiter mit Login und Dashboard  

**b) Corporate Website + AI – 6.500 €**  
- Moderne, skalierbare Website inkl. CMS  
- Automatisierte Inhalte (Blog, Newsletter, Bilder via AI)  
- **Beispielprojekt:** Unternehmenswebsite mit KI-gestütztem Bloggenerator und Kontaktformular  

**c) Agentur-Partner Retainer – ab 3.500 €/Monat**  
- White-Label Development für Agenturen  
- Umsetzung von Pitch-Ideen & Kreativkonzepten in funktionierenden Code  
- **Beispielprojekt:** Umsetzung einer Kampagnen-Microsite mit Animationen & API-Anbindung  

---

### 4. Showcase-Beispiele (visuell ansprechend)
- Success Stories Element von Startseite übernehmen
- Jedes Projekt mit Screenshot + kurzer Beschreibung (Problem → Lösung) wie jetzt.
- Zufällige 3 projekte aus projekt-datenbank
- alle projekte darunter beibelassen nur deutsch

---

### 5. Terminbuchung / Kontaktformular
- Formular basiert auf `/contact`, aber **deutschsprachig**.  
- Felder:  
  - Name  
  - E-Mail  
  - Telefonnummer (**aktualisiert**)  
  - Nachricht / Projektbeschreibung  
- CTA: **„Kostenlosen Termin buchen“**  
- Beim Absenden → automatisierte Bestätigungsmail resend (neues template deutsch).  

---

### 6. FAQ (Conversion-Booster)
**Frage:** Wie schnell sind Sie?  
Antwort: MVP innerhalb von 30 Tagen, Website meist in 2–4 Wochen.  

**Frage:** Arbeiten Sie auch mit bestehenden Agenturen?  
Antwort: Ja, wir sind Ihr White-Label-Partner für sauberes Development.  

**Frage:** Welche Technologien nutzen Sie?  
Antwort: React, Next.js, Tailwind, Node.js, Supabase, Prisma, OpenAI.  

**Frage:** Wie läuft die Zusammenarbeit ab?  
Antwort: Erstgespräch → Angebot → Sprint → Livegang. 

ausführlicher und korrekter.

---

### 7. Finaler CTA (Abschluss-Section)
- Headline: „Bereit, Ihr Projekt zu starten?“  
- Subline: „Buchen Sie jetzt ein unverbindliches Erstgespräch – wir bringen Ihr Projekt auf die Straße.“  
- Button: **„Termin buchen“** (scrollt zum Formular).  

---

## Technische Vorgaben
- Framework: React / Next.js  
- Styling: Tailwind CSS (Designsystem sen.dev übernehmen)  
- Fonts: Inter, Rubik (bereits integriert)  
- Form-Handling: wie `/contact` umgesetzt, nur in Deutsch + korrigierte Telefonnummer  
- Hosting: Vercel (bestehendes Setup)  
- Mobile-First Design, SEO optimiert (Meta-Tags, OpenGraph, klare Slugs).  

---

## KPIs (Erfolgsmessung)
- Conversion Rate: Anzahl Terminbuchungen / Seitenbesuche  
- Leads: mindestens 5 qualifizierte Anfragen im ersten Monat  
- Engagement: Absprungrate unter 50%  

---