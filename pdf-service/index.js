import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToBuffer, Font, Document, Page, Text, View, StyleSheet, Link, Image, Svg, Path } from '@react-pdf/renderer';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Use TTF format from Google Fonts (most reliable for @react-pdf/renderer)
const INTER_REGULAR = 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf';
const INTER_SEMIBOLD = 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf';

try {
  Font.register({
    family: 'Inter',
    fonts: [
      { src: INTER_REGULAR, fontWeight: 400 },
      { src: INTER_SEMIBOLD, fontWeight: 600 }
    ]
  });
  console.log('Fonts registered successfully');
} catch (err) {
  console.error('Font registration failed:', err);
}

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
  info: {
    viewBox: '0 -960 960 960',
    paths: ['M480-680q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm-40 320h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z']
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

// CV styles (matching the serverless version)
const cvStyles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#1f2933',
    lineHeight: 1.5
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 28
  },
  headerInfo: {
    flex: 1,
    paddingRight: 24
  },
  headerActions: {
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  headerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  headerIcon: {
    width: 10,
    height: 10,
    marginRight: 4,
    marginTop: -2
  },
  headerLinkText: {
    fontSize: 8,
    color: '#1d4ed8'
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    color: '#0f172a',
    letterSpacing: 0.4
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: '#475569',
    marginTop: 12,
    marginBottom: 14
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    fontSize: 8.5,
    color: '#64748b'
  },
  contactLink: {
    color: '#1d4ed8',
    textDecoration: 'none'
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginTop: -4
  },
  avatar: {
    width: 68,
    height: 84,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    objectFit: 'cover'
  },
  section: {
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: '#64748b',
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  sectionBody: {
    marginTop: 6,
    gap: 6
  },
  bodyText: {
    fontSize: 10,
    color: '#1e293b',
    lineHeight: 1.4
  },
  compactText: {
    fontSize: 9,
    color: '#1e293b',
    lineHeight: 1.0
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    marginTop: 0
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: -0.5
  },
  bulletSymbol: {
    width: 10,
    color: '#1d4ed8'
  },
  bulletContent: {
    flex: 1,
    color: '#1e293b',
    lineHeight: 0.8
  },
  experienceCompany: {
    fontWeight: 600,
    fontSize: 12,
    color: '#1f2937'
  },
  experienceRole: {
    color: '#475569',
    marginTop: 2
  },
  experienceMeta: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 1,
    marginBottom: 1
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 6
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'none'
  },
  projectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 6,
    columnGap: 6
  },
  projectCard: {
    width: '48%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 10,
    flexDirection: 'column',
    gap: 6
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  projectLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  projectIcon: {
    width: 9,
    height: 9,
    marginTop: -2
  },
  projectIconSpacing: {
    marginLeft: 6
  },
  projectMeta: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 2
  },
  projectDescription: {
    color: '#1e293b',
    lineHeight: 0.5
  },
  externalIcon: {
    width: 9,
    height: 9,
    marginLeft: 2,
    marginTop: -3
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  footer: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 6,
    alignItems: 'flex-start'
  },
  statusText: {
    fontSize: 8,
    color: '#94a3b8'
  }
});

const FULL_CV_URL = 'https://dev.sen.studio/cv';

function ContactIconSvg({ name, style }) {
  const icon = getContactIconData(name);
  if (!icon) return null;
  return React.createElement(Svg, { viewBox: icon.viewBox, style: style || cvStyles.contactIcon },
    icon.paths.map((path, index) => React.createElement(Path, { key: `${name}-path-${index}`, d: path, fill: ICON_COLOR }))
  );
}

function ExternalLinkIcon({ href }) {
  const icon = getContactIconData('external');
  return React.createElement(Link, { src: href, style: cvStyles.link },
    React.createElement(Svg, { viewBox: icon.viewBox, style: cvStyles.externalIcon },
      icon.paths.map((path, index) => React.createElement(Path, { key: `external-path-${index}`, d: path, fill: ICON_COLOR }))
    )
  );
}

function ProjectIconLink({ href, icon, style }) {
  const iconData = getContactIconData(icon);
  const linkStyle = style ? [cvStyles.link, style] : cvStyles.link;
  return React.createElement(Link, { src: href, style: linkStyle },
    React.createElement(Svg, { viewBox: iconData.viewBox, style: cvStyles.projectIcon },
      iconData.paths.map((path, index) => React.createElement(Path, { key: `${icon}-path-${index}`, d: path, fill: ICON_COLOR }))
    )
  );
}

function BulletList({ items }) {
  return React.createElement(View, { style: cvStyles.bulletList },
    items.map((item, index) =>
      React.createElement(View, { key: `${item}-${index}`, style: cvStyles.bulletItem },
        React.createElement(Text, { style: cvStyles.bulletSymbol }, '•'),
        React.createElement(Text, { style: cvStyles.bulletContent }, item)
      )
    )
  );
}

function CVContactRow({ contact }) {
  const items = [];

  if (contact.email) {
    items.push(React.createElement(Text, { key: 'email' }, contact.email));
  }
  if (contact.phone) {
    items.push(React.createElement(Text, { key: 'phone' }, contact.phone));
  }
  if (contact.location) {
    items.push(React.createElement(Text, { key: 'location' }, contact.location));
  }
  if (contact.linktree) {
    items.push(React.createElement(Link, { key: 'linktree', src: contact.linktree, style: cvStyles.contactLink },
      React.createElement(ContactIconSvg, { name: 'linktree' })
    ));
  }
  contact.socials?.forEach((social, index) => {
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

function ExperienceEntry({ entry }) {
  const highlights = entry.highlights.slice(0, 2);
  return React.createElement(View, { style: { marginBottom: 10 } },
    React.createElement(Text, { style: cvStyles.experienceCompany }, entry.company),
    React.createElement(Text, { style: cvStyles.experienceRole }, entry.role),
    React.createElement(View, { style: cvStyles.metaRow },
      React.createElement(Text, { style: cvStyles.experienceMeta },
        `${entry.startDate} – ${entry.endDate}${entry.location ? ` • ${entry.location}` : ''}`
      ),
      entry.website ? React.createElement(ExternalLinkIcon, { href: entry.website }) : null
    ),
    React.createElement(BulletList, { items: highlights })
  );
}

function ProjectEntry({ project }) {
  const hasLinks = Boolean(project.caseStudyUrl || project.liveUrl);
  return React.createElement(View, { style: cvStyles.projectCard },
    React.createElement(View, { style: cvStyles.projectHeader },
      React.createElement(Text, { style: cvStyles.experienceCompany }, project.title),
      hasLinks ? React.createElement(View, { style: cvStyles.projectLinks },
        project.caseStudyUrl ? React.createElement(ProjectIconLink, { href: project.caseStudyUrl, icon: 'info' }) : null,
        project.liveUrl ? React.createElement(ProjectIconLink, {
          href: project.liveUrl,
          icon: 'globe',
          style: project.caseStudyUrl ? cvStyles.projectIconSpacing : undefined
        }) : null
      ) : null
    ),
    React.createElement(Text, { style: cvStyles.projectMeta },
      `${project.year ? `${project.year} • ` : ''}${project.techStack.join(', ')}`
    ),
    React.createElement(Text, { style: cvStyles.projectDescription }, project.summary)
  );
}

function CVDocument({ data, portraitUrl, creationDate }) {
  const generatedDate = creationDate || new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const summaryParagraph = Array.isArray(data.summaryLines) && data.summaryLines.length > 0
    ? data.summaryLines.join(' ')
    : (data.summary || '').replace(/\s+/g, ' ').trim();

  const technicalSkillsParagraph = (data.technicalSkills || [])
    .map((group) => `${group.label}: ${group.items.join(', ')}`)
    .join(' • ');

  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: cvStyles.page, wrap: true },
      // Header
      React.createElement(View, { style: cvStyles.headerRow },
        React.createElement(View, { style: cvStyles.headerInfo },
          React.createElement(Text, { style: cvStyles.name }, data.fullName),
          React.createElement(Text, { style: cvStyles.title }, data.title),
          React.createElement(CVContactRow, { contact: data.contact })
        ),
        React.createElement(View, { style: cvStyles.headerActions },
          React.createElement(View, { style: [cvStyles.headerLinkRow, !portraitUrl && { marginBottom: 0 }] },
            React.createElement(ContactIconSvg, { name: 'globe', style: cvStyles.headerIcon }),
            React.createElement(Link, { src: FULL_CV_URL, style: cvStyles.link },
              React.createElement(Text, { style: cvStyles.headerLinkText }, 'dev.sen.studio/cv')
            )
          ),
          portraitUrl ? React.createElement(Image, { src: portraitUrl, style: cvStyles.avatar }) : null
        )
      ),

      // Summary
      React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Summary'),
        React.createElement(Text, { style: [cvStyles.bodyText, { marginTop: 8 }] }, summaryParagraph)
      ),

      React.createElement(View, { style: cvStyles.divider }),

      // Experience
      React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Experience'),
        ...(data.experience || []).map((entry, index) =>
          React.createElement(ExperienceEntry, { key: `${entry.company}-${index}`, entry })
        )
      ),

      // Education
      React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Education'),
        ...(data.education || []).map((degree, index) =>
          React.createElement(View, { key: `${degree.institution}-${index}`, style: { marginBottom: 14 } },
            React.createElement(Text, { style: [cvStyles.experienceCompany, { fontSize: 12 }] }, degree.institution),
            React.createElement(Text, { style: cvStyles.experienceRole }, degree.program),
            React.createElement(Text, { style: cvStyles.experienceMeta },
              `${degree.startYear} – ${degree.endYear}`
            ),
            degree.details ? React.createElement(BulletList, { items: degree.details }) : null
          )
        )
      ),

      React.createElement(View, { style: cvStyles.divider }),

      // Technical Skills
      React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Technical Skills'),
        React.createElement(Text, { style: [cvStyles.bodyText, { marginTop: 8 }] }, technicalSkillsParagraph)
      ),

      // Soft Skills
      data.softSkills && data.softSkills.length > 0 ? React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Soft Skills'),
        React.createElement(Text, { style: [cvStyles.bodyText, { marginTop: 6 }] }, data.softSkills.join(', '))
      ) : null,

      // Languages
      data.languages && data.languages.length > 0 ? React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Languages'),
        React.createElement(Text, { style: cvStyles.bodyText }, data.languages.join(', '))
      ) : null,

      // Interests
      data.interests && data.interests.length > 0 ? React.createElement(View, { style: cvStyles.section },
        React.createElement(Text, { style: cvStyles.sectionTitle }, 'Interests'),
        React.createElement(Text, { style: cvStyles.bodyText }, data.interests.join(', '))
      ) : null,

      // Projects
      data.projects && data.projects.length > 0 ? React.createElement(View, { style: cvStyles.section },
        React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' } },
          React.createElement(Text, { style: cvStyles.sectionTitle }, 'Matching Projects'),
          React.createElement(Link, { src: 'https://dev.sen.studio/projects', style: [cvStyles.link, { fontSize: 9 }] }, 'see all projects')
        ),
        React.createElement(View, { style: cvStyles.projectGrid },
          ...data.projects.map((project, index) =>
            React.createElement(ProjectEntry, { key: `${project.title}-${index}`, project })
          )
        )
      ) : null,

      // Footer
      React.createElement(View, { style: cvStyles.footer },
        React.createElement(Text, { style: cvStyles.statusText }, `Status: ${generatedDate}`)
      )
    )
  );
}

// Cover Letter components
function CoverLetterContactRow({ email, phone, city, linktree, socials }) {
  const items = [];
  if (email) items.push(React.createElement(Text, { key: 'email' }, email));
  if (phone) items.push(React.createElement(Text, { key: 'phone' }, phone));
  if (city) items.push(React.createElement(Text, { key: 'city' }, city));
  if (linktree) {
    items.push(React.createElement(Link, { key: 'linktree', src: linktree, style: coverLetterStyles.contactLink },
      React.createElement(ContactIconSvg, { name: 'linktree', style: coverLetterStyles.contactIcon })
    ));
  }
  socials?.forEach((social, index) => {
    const lower = social.label.toLowerCase();
    let icon = null;
    if (lower.includes('linkedin')) icon = 'linkedin';
    if (lower.includes('github')) icon = 'github';
    if (icon) {
      items.push(React.createElement(Link, { key: `social-${index}`, src: social.url, style: coverLetterStyles.contactLink },
        React.createElement(ContactIconSvg, { name: icon, style: coverLetterStyles.contactIcon })
      ));
    }
  });
  return React.createElement(View, { style: coverLetterStyles.contactRow }, items);
}

function CoverLetterExternalLinkIcon({ href }) {
  const icon = getContactIconData('external');
  return React.createElement(Link, { src: href, style: coverLetterStyles.contactLink },
    React.createElement(Svg, { viewBox: icon.viewBox, style: coverLetterStyles.inlineIcon },
      icon.paths.map((path, index) => React.createElement(Path, { key: `external-path-${index}`, d: path, fill: ICON_COLOR }))
    )
  );
}

function CoverLetterDocument({ data, signatureUrl }) {
  const paragraphs = data.body.split('\n').filter(Boolean);
  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: coverLetterStyles.page },
      React.createElement(View, { style: coverLetterStyles.headerRow },
        React.createElement(View, { style: coverLetterStyles.headerInfo },
          React.createElement(Text, { style: coverLetterStyles.name }, data.applicant.fullName),
          React.createElement(CoverLetterContactRow, {
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
          React.createElement(CoverLetterExternalLinkIcon, { href: data.jobUrl })
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
    const { data, portraitUrl, creationDate } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const element = React.createElement(CVDocument, { data, portraitUrl, creationDate });
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
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`PDF Service running on ${HOST}:${PORT}`);
});
