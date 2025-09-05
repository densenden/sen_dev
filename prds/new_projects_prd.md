# PRD – Projects Page sen.dev (mit Live- & GitHub-Links)

## Ziel
Die Seite `/projects` zeigt alle relevanten Projekte mit **Storytelling, Tech Details, Screenshots, Live-Link und GitHub-Link**.  
Besucher:innen sollen direkt sehen: **Was macht das Projekt? Wie ist es gebaut? Wo kann man es live testen?**

---


## Projekte

### A) **SenCommerce**
- **Storytelling:**  
  E-Commerce-Plattform für digitale und physische Produkte.  
  Fokus: Kunst, Mode und personalisierte Meditationen.  
- **Tech Details:**  
  - Medusa v2  
  - Next.js, React  
  - Tailwind CSS  
  - Supabase (DB, Auth, Buckets)  
  - Stripe Checkout  
  - Printful API  
- **Links:**  
  - 🌐 Live: [shop.sen.studio](https://shop.sen.studio)  
  - 💻 GitHub: [sencommerce-storefront](https://github.com/densenden/sencommerce-storefront)  
- **Assets:**  
  - `sencommerce_logo.svg`  
  - `sencommerce_screenshot.png`  

---

### B) **SenScript**
- **Storytelling:**  
  Educational Tool mit „Cheatcards“ für Interviews, Tests und schnelle Wissensvermittlung.  
- **Tech Details:**  
  - Next.js, React  
  - Tailwind CSS  
  - MDX Content-System  
  - Supabase (Content DB)  
- **Links:**  
  - 🌐 Live: [getscript.sen.studio](https://getscript.sen.studio)  
  - 💻 GitHub: [sen-script](https://github.com/densenden/sen-script)  
- **Assets:**  
  - `logo.svg` use meeting icon  
  - `senscript.png`  

---

### C) **NorthPatrol**
- **Storytelling:**  
  Sicherheitsrundgang-App für Guards mit QR-Code-Checkpoints.  
- **Tech Details:**  
  - React Frontend  
  - Supabase (DB, Auth, Logs)  
  - Clerk (Auth)  
  - Resend für Notifications  
  - QR-Code-Generator  
- **Links:**  
  - 🌐 Live: [northpatrol.sen.studio](https://northpatrol.sen.studio)  
  - 💻 GitHub: [northpatrol](https://github.com/densenden/northpatrol)  
- **Assets:**  
  - `logo_north.svg`  
  - `northpatrol.png`  

---

### D) **SenRecorder**
- **Storytelling:**  
  Web-App zum Aufnehmen von Audio mit Emotionstags – ideal für Trainingsdaten & Voice UX.  
- **Tech Details:**  
  - React Frontend  
  - Tailwind CSS  
  - Clerk für Auth  
  - Supabase Buckets (Audio)  
  - Resend für E-Mails  
- **Links:**  
  - 🌐 Live: [recorder.sen.studio](https://recorder.sen.studio)  
  - 💻 GitHub: [emo-recorder](https://github.com/densenden/emo-recorder)  
- **Assets:**  
  - `logo.svg`  use microphone icon
  - `senrecorder.png`  

---

### E) **Paradieshof**
- **Storytelling:**  
  Interaktive Plattform für ein Architekturprojekt in Frankfurt Alt-Sachsenhausen.  
- **Tech Details:**  
  - React Frontend  
  - Node.js Backend  
  - Supabase (DB, Buckets)  
  - Clerk (Auth)  
  - Tailwind CSS (Annotation Layer)  
- **Links:**  
  - 🌐 Live: [paradieshof.sen.studio](https://paradieshof.sen.studio)  
  - 💻 GitHub: [paradieshof](https://github.com/densenden/paradieshof)  
- **Assets:**  
  - `no logo` use city icon  
  - `paradieshof_screenshot.png`  

---

## Technische Vorgaben
- **Komponente:** `<ProjectCard>`  
  - Props: `logo, title, description, techList, screenshot, liveLink, gitLink`  
- **Layout:**  
  - Grid (2 Spalten Desktop, 1 Spalte Mobile)  
  - Hover-Animation auf Karten (leichtes Scale + Shadow)  
- **Links:** Buttons „🌐 Live ansehen“ + „💻 GitHub Code“  
- **SEO:** Jede Karte mit Alt-Text + strukturierter Datenbeschreibung  


---

## KPI
- Klicks auf „Live ansehen“ → mind. 40 %  
- Klicks auf „GitHub Code“ → mind. 20 %  