import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToBuffer, Font, Document, Page, Text, View, StyleSheet, Link, Image, Svg, Path } from '@react-pdf/renderer';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Register Inter fonts (using jsDelivr CDN for static TTF files)
const INTER_REGULAR = 'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-400-normal.woff';
const INTER_SEMIBOLD = 'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-600-normal.woff';

Font.register({
  family: 'Inter',
  fonts: [
    { src: INTER_REGULAR, fontWeight: 400 },
    { src: INTER_SEMIBOLD, fontWeight: 600 }
  ]
});

const ICON_COLOR = '#1d4ed8';

const CONTACT_ICON_SVGS = {
  linktree: {
    viewBox: '0 0 512 512',
    paths: ['M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593C381.469,407.717,366.807,418.738,351.021,427.514z']
  },
  linkedin: {
    viewBox: '-143 145 512 512',
    paths: ['M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z']
  },
  github: {
    viewBox: '0 0 20 20',
    paths: ['M10,0C4.477,0,0,4.59,0,10.253C0,14.782,2.862,18.624,6.833,19.981C7.34,20.082,7.52,19.762,7.52,19.489C7.52,19.151,7.508,18.047,7.508,16.675C7.508,15.719,7.828,15.095,8.187,14.777C5.96,14.523,3.62,13.656,3.62,9.718C3.62,8.598,4.008,7.684,4.65,6.966C4.546,6.707,4.203,5.664,4.748,4.252C4.748,4.252,5.586,3.977,7.495,5.303C8.294,5.076,9.15,4.962,10,4.958C10.85,4.962,11.705,5.076,12.503,5.303C14.414,3.977,15.254,4.252,15.254,4.252C15.797,5.664,15.454,6.707,15.351,6.966C15.99,7.684,16.381,8.598,16.381,9.718C16.381,13.646,14.046,14.526,11.825,14.785C12.111,15.041,12.37,15.493,12.46,16.156C13.03,16.418,14.478,16.871,15.37,15.304C15.37,15.304,15.899,14.319,16.903,14.247C16.903,14.247,17.878,14.234,16.971,14.87C16.971,14.87,16.316,15.185,15.861,16.37C15.861,16.37,15.274,18.2,12.493,17.58C12.487,18.437,12.478,19.245,12.478,19.489C12.478,19.76,12.662,20.077,13.161,19.982C17.135,18.627,20,14.783,20,10.253C20,4.59,15.522,0,10,0']
  },
  external: {
    viewBox: '0 -960 960 960',
    paths: ['M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h224.61v40H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-224.61h40v224.61q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm164.92-201.23-28.31-28.31L731.69-760H560v-40h240v240h-40v-171.69L389.54-361.23Z']
  },
  globe: {
    viewBox: '0 0 24 24',
    paths: ['M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 17.93c-1.372-.486-2.478-2.289-3.034-4.93h6.068c-.556 2.641-1.662 4.444-3.034 4.93zM8.778 13c-.1-.646-.154-1.316-.154-2s.054-1.354.154-2h6.444c.1.646.154 1.316.154 2s-.054 1.354-.154 2H8.778zM4.05 13c-.074-.322-.124-.652-.156-.987a8.026 8.026 0 010-2.026c.032-.335.082-.665.156-.987h3.857c-.052.328-.092.66-.117 1H7.78c-.032.333-.051.67-.051 1.013 0 .343.019.68.051 1.013h.01c.025.34.065.672.117.987H4.05zm5.984-9.93C10.59 5.711 11.696 7.514 12.252 10H9.034c.556-2.64 1.662-4.444 3-4.93zM15 10c.1-.646.154-1.316.154-2s-.054-1.354-.154-2h4.857c.074.322.124.652.156.987a8.026 8.026 0 010 2.026c-.032.335-.082.665-.156.987H15zm.216-6.93c1.372.486 2.478 2.289 3.034 4.93h-3.068c.556-2.64 1.662-4.444 3.034-4.93zm0 13.86c-1.372-.486-2.478-2.289-3.034-4.93h3.068c-.556 2.641-1.662 4.444-3.034 4.93zM19.95 11c.074-.322.124-.652.156-.987a8.026 8.026 0 000-2.026c-.032-.335-.082-.665-.156-.987h-3.857c.052.328.092.66.117 1h.01c.032.333.051.67.051 1.013 0 .343-.019.68-.051 1.013h-.01c-.025.34-.065.672-.117.987h3.857z']
  }
};

function getContactIconData(name) {
  return CONTACT_ICON_SVGS[name];
}

// Cover Letter styles
const coverLetterStyles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Inter', fontSize: 10, color: '#1f2933', lineHeight: 1.5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerInfo: { flex: 1 },
  headerMeta: { alignItems: 'flex-end', flexDirection: 'column' },
  headerLinkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  headerIcon: { width: 9, height: 9, marginRight: 4, marginTop: -2 },
  headerLinkText: { fontSize: 8, color: '#1d4ed8' },
  name: { fontSize: 20, fontWeight: 600, color: '#0f172a' },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, fontSize: 8.5, color: '#64748b', marginTop: 10 },
  contactLink: { color: '#1d4ed8', textDecoration: 'none' },
  contactIcon: { width: 10, height: 10, marginTop: -4 },
  inlineIcon: { width: 9, height: 9, marginLeft: 2, marginTop: -12 },
  headerDate: { fontSize: 9, color: '#94a3b8' },
  separator: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 18 },
  recipientBlock: { marginBottom: 20, fontSize: 10, color: '#1e293b' },
  subject: { fontSize: 12, fontWeight: 600, marginBottom: 14, color: '#1e293b' },
  paragraph: { marginBottom: 12 },
  footer: { marginTop: 12 },
  signature: { width: 144, height: 58, marginTop: 6, objectFit: 'contain' },
  link: { color: '#1d4ed8', textDecoration: 'none' }
});

function ContactIconSvg({ name, style }) {
  const icon = getContactIconData(name);
  if (!icon) return null;
  return React.createElement(Svg, { viewBox: icon.viewBox, style: style || coverLetterStyles.contactIcon },
    icon.paths.map((path, index) => React.createElement(Path, { key: `${name}-path-${index}`, d: path, fill: ICON_COLOR }))
  );
}

function ExternalLinkIcon({ href }) {
  const icon = getContactIconData('external');
  return React.createElement(Link, { src: href, style: coverLetterStyles.contactLink },
    React.createElement(Svg, { viewBox: icon.viewBox, style: coverLetterStyles.inlineIcon },
      icon.paths.map((path, index) => React.createElement(Path, { key: `external-path-${index}`, d: path, fill: ICON_COLOR }))
    )
  );
}

function ContactRow({ email, phone, city, linktree, socials }) {
  const items = [];
  if (email) items.push(React.createElement(Text, { key: 'email' }, email));
  if (phone) items.push(React.createElement(Text, { key: 'phone' }, phone));
  if (city) items.push(React.createElement(Text, { key: 'city' }, city));
  if (linktree) {
    items.push(React.createElement(Link, { key: 'linktree', src: linktree, style: coverLetterStyles.contactLink },
      React.createElement(ContactIconSvg, { name: 'linktree' })
    ));
  }
  socials?.forEach((social, index) => {
    const lower = social.label.toLowerCase();
    let icon = null;
    if (lower.includes('linkedin')) icon = 'linkedin';
    if (lower.includes('github')) icon = 'github';
    if (icon) {
      items.push(React.createElement(Link, { key: `social-${index}`, src: social.url, style: coverLetterStyles.contactLink },
        React.createElement(ContactIconSvg, { name: icon })
      ));
    }
  });
  return React.createElement(View, { style: coverLetterStyles.contactRow }, items);
}

function CoverLetterDocument({ data, signatureUrl }) {
  const paragraphs = data.body.split('\n').filter(Boolean);
  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: coverLetterStyles.page },
      React.createElement(View, { style: coverLetterStyles.headerRow },
        React.createElement(View, { style: coverLetterStyles.headerInfo },
          React.createElement(Text, { style: coverLetterStyles.name }, data.applicant.fullName),
          React.createElement(ContactRow, {
            email: data.applicant.email,
            phone: data.applicant.phone,
            city: data.applicant.city,
            linktree: data.applicant.linktree,
            socials: data.applicant.socials
          })
        ),
        React.createElement(View, { style: coverLetterStyles.headerMeta },
          React.createElement(View, { style: coverLetterStyles.headerLinkRow },
            React.createElement(ContactIconSvg, { name: 'globe', style: coverLetterStyles.headerIcon }),
            React.createElement(Link, { src: 'https://dev.sen.studio/cv', style: coverLetterStyles.link },
              React.createElement(Text, { style: coverLetterStyles.headerLinkText }, 'dev.sen.studio/cv')
            )
          ),
          React.createElement(Text, { style: coverLetterStyles.headerDate }, data.date)
        )
      ),
      React.createElement(View, { style: coverLetterStyles.separator }),
      React.createElement(View, { style: coverLetterStyles.recipientBlock },
        React.createElement(Text, null, data.recipient.company)
      ),
      React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } },
        React.createElement(Text, { style: coverLetterStyles.subject, wrap: false }, data.subject),
        data.jobUrl ? React.createElement(View, { style: { marginLeft: 6 } },
          React.createElement(ExternalLinkIcon, { href: data.jobUrl })
        ) : null
      ),
      ...paragraphs.map((paragraph, index) =>
        React.createElement(Text, { key: `paragraph-${index}`, style: coverLetterStyles.paragraph }, paragraph)
      ),
      signatureUrl ? React.createElement(View, { style: coverLetterStyles.footer },
        React.createElement(Image, { src: signatureUrl, style: coverLetterStyles.signature })
      ) : null
    )
  );
}

// CV Document styles
const cvStyles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Inter', fontSize: 10, color: '#1f2933', lineHeight: 1.5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  headerInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: 600, color: '#0f172a', marginBottom: 4 },
  title: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, fontSize: 8.5, color: '#64748b' },
  contactLink: { color: '#1d4ed8', textDecoration: 'none' },
  contactIcon: { width: 10, height: 10, marginTop: -4 },
  portrait: { width: 80, height: 80, borderRadius: 40, objectFit: 'cover' },
  separator: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 },
  sectionTitle: { fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 10 },
  sectionContent: { marginBottom: 16 },
  experienceItem: { marginBottom: 12 },
  experienceHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  experienceTitle: { fontSize: 11, fontWeight: 600, color: '#1e293b' },
  experienceCompany: { fontSize: 10, color: '#64748b' },
  experienceDate: { fontSize: 9, color: '#94a3b8' },
  experienceDescription: { fontSize: 9.5, color: '#475569', marginTop: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 9 },
  projectItem: { marginBottom: 12, padding: 10, backgroundColor: '#f8fafc', borderRadius: 6 },
  projectTitle: { fontSize: 11, fontWeight: 600, color: '#1e293b', marginBottom: 4 },
  projectSummary: { fontSize: 9.5, color: '#475569', marginBottom: 6 },
  projectTech: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  projectTechTag: { backgroundColor: '#e0e7ff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: 8, color: '#3730a3' },
  educationItem: { marginBottom: 8 },
  educationTitle: { fontSize: 10, fontWeight: 600, color: '#1e293b' },
  educationInstitution: { fontSize: 9.5, color: '#64748b' },
  link: { color: '#1d4ed8', textDecoration: 'none' }
});

function CVContactRow({ email, phone, city, linktree, socials }) {
  const items = [];
  if (email) items.push(React.createElement(Text, { key: 'email' }, email));
  if (phone) items.push(React.createElement(Text, { key: 'phone' }, phone));
  if (city) items.push(React.createElement(Text, { key: 'city' }, city));
  if (linktree) {
    items.push(React.createElement(Link, { key: 'linktree', src: linktree, style: cvStyles.contactLink },
      React.createElement(ContactIconSvg, { name: 'linktree' })
    ));
  }
  socials?.forEach((social, index) => {
    const lower = social.label.toLowerCase();
    let icon = null;
    if (lower.includes('linkedin')) icon = 'linkedin';
    if (lower.includes('github')) icon = 'github';
    if (icon) {
      items.push(React.createElement(Link, { key: `social-${index}`, src: social.url, style: cvStyles.contactLink },
        React.createElement(ContactIconSvg, { name: icon })
      ));
    }
  });
  return React.createElement(View, { style: cvStyles.contactRow }, items);
}

function CVDocument({ data, portraitUrl }) {
  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: cvStyles.page },
      // Header
      React.createElement(View, { style: cvStyles.headerRow },
        React.createElement(View, { style: cvStyles.headerInfo },
          React.createElement(Text, { style: cvStyles.name }, data.personal?.fullName || 'Name'),
          data.personal?.title && React.createElement(Text, { style: cvStyles.title }, data.personal.title),
          React.createElement(CVContactRow, {
            email: data.personal?.email,
            phone: data.personal?.phone,
            city: data.personal?.city,
            linktree: data.personal?.linktree,
            socials: data.personal?.socials
          })
        ),
        portraitUrl && React.createElement(Image, { src: portraitUrl, style: cvStyles.portrait })
      ),

      React.createElement(View, { style: cvStyles.separator }),

      // Summary
      data.summary && React.createElement(View, { style: cvStyles.sectionContent },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Summary'),
        React.createElement(Text, { style: { fontSize: 10, color: '#475569' } }, data.summary)
      ),

      // Experience
      data.experience?.length > 0 && React.createElement(View, { style: cvStyles.sectionContent },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Experience'),
        ...data.experience.map((exp, index) =>
          React.createElement(View, { key: `exp-${index}`, style: cvStyles.experienceItem },
            React.createElement(View, { style: cvStyles.experienceHeader },
              React.createElement(Text, { style: cvStyles.experienceTitle }, exp.title),
              React.createElement(Text, { style: cvStyles.experienceDate }, `${exp.startDate || ''} - ${exp.endDate || 'Present'}`)
            ),
            React.createElement(Text, { style: cvStyles.experienceCompany }, exp.company),
            exp.description && React.createElement(Text, { style: cvStyles.experienceDescription }, exp.description)
          )
        )
      ),

      // Skills
      data.skills?.length > 0 && React.createElement(View, { style: cvStyles.sectionContent },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Skills'),
        React.createElement(View, { style: cvStyles.skillsContainer },
          ...data.skills.map((skill, index) =>
            React.createElement(Text, { key: `skill-${index}`, style: cvStyles.skillTag }, skill)
          )
        )
      ),

      // Projects
      data.projects?.length > 0 && React.createElement(View, { style: cvStyles.sectionContent },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Projects'),
        ...data.projects.map((project, index) =>
          React.createElement(View, { key: `project-${index}`, style: cvStyles.projectItem },
            React.createElement(Text, { style: cvStyles.projectTitle }, project.title),
            project.summary && React.createElement(Text, { style: cvStyles.projectSummary }, project.summary),
            project.techStack?.length > 0 && React.createElement(View, { style: cvStyles.projectTech },
              ...project.techStack.map((tech, techIndex) =>
                React.createElement(Text, { key: `tech-${techIndex}`, style: cvStyles.projectTechTag }, tech)
              )
            )
          )
        )
      ),

      // Education
      data.education?.length > 0 && React.createElement(View, { style: cvStyles.sectionContent },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Education'),
        ...data.education.map((edu, index) =>
          React.createElement(View, { key: `edu-${index}`, style: cvStyles.educationItem },
            React.createElement(Text, { style: cvStyles.educationTitle }, edu.degree),
            React.createElement(Text, { style: cvStyles.educationInstitution }, `${edu.institution}${edu.year ? ` (${edu.year})` : ''}`)
          )
        )
      )
    )
  );
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Cover letter endpoint
app.post('/api/pdf/cover-letter', async (req, res) => {
  try {
    const { data, signatureUrl } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const element = React.createElement(CoverLetterDocument, { data, signatureUrl });
    const buffer = await renderToBuffer(element);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="cover-letter.pdf"');
    res.send(buffer);
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// CV endpoint
app.post('/api/pdf/cv', async (req, res) => {
  try {
    const { data, portraitUrl } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const element = React.createElement(CVDocument, { data, portraitUrl });
    const buffer = await renderToBuffer(element);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="cv.pdf"');
    res.send(buffer);
  } catch (error) {
    console.error('CV PDF generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`PDF Service running on port ${PORT}`);
});
