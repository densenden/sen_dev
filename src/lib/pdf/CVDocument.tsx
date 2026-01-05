import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link, Svg, Path } from '@react-pdf/renderer'

import type { CVData, CVExperienceEntry, CVProjectEntry } from '@/lib/pdf/types'
import { ensurePdfFonts } from '@/lib/pdf/fonts'
import { ContactIcon, ICON_COLOR, getContactIconData } from '@/lib/pdf/icon-utils'

// Helper function to render PDF - uses pdf().toBuffer() for better serverless compatibility
export async function renderCvPdf(data: CVData, portraitUrl?: string): Promise<Buffer> {
  // Dynamic import to avoid issues with module initialization in serverless
  const { pdf } = await import('@react-pdf/renderer')
  await ensurePdfFonts()
  const doc = pdf(React.createElement(CVDocument, { data, portraitUrl }))
  return await doc.toBuffer()
}

interface CVDocumentProps {
  data: CVData
  portraitUrl?: string
  creationDate?: string
}

const FULL_CV_URL = 'https://dev.sen.studio/cv'

const styles = StyleSheet.create({
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
})

function ContactRow({ contact }: { contact: CVData['contact'] }) {
  const items: React.ReactNode[] = []

  if (contact.email) {
    items.push(<Text key="email">{contact.email}</Text>)
  }

  if (contact.phone) {
    items.push(<Text key="phone">{contact.phone}</Text>)
  }

  if (contact.location) {
    items.push(<Text key="location">{contact.location}</Text>)
  }

  if (contact.linktree) {
    items.push(
      <Link key="linktree" src={contact.linktree} style={styles.contactLink}>
        <ContactIconSvg name="linktree" />
      </Link>
    )
  }

  contact.socials?.forEach((social, index) => {
    const lower = social.label.toLowerCase()
    let icon: ContactIcon | null = null
    if (lower.includes('linkedin')) icon = 'linkedin'
    if (lower.includes('github')) icon = 'github'

    if (icon) {
      items.push(
        <Link key={`social-${index}`} src={social.url} style={styles.contactLink}>
          <ContactIconSvg name={icon} />
        </Link>
      )
    }
  })

  return <View style={styles.contactRow}>{items}</View>
}

function ContactIconSvg({ name, style }: { name: ContactIcon; style?: Record<string, unknown> }) {
  const icon = getContactIconData(name)
  return (
    <Svg viewBox={icon.viewBox} style={style ?? styles.contactIcon}>
      {icon.paths.map((path, index) => (
        <Path key={`${name}-path-${index}`} d={path} fill={ICON_COLOR} />
      ))}
    </Svg>
  )
}

function ExternalLinkIcon({ href }: { href: string }) {
  const icon = getContactIconData('external')
  return (
    <Link src={href} style={styles.link}>
      <Svg viewBox={icon.viewBox} style={styles.externalIcon}>
        {icon.paths.map((path, index) => (
          <Path key={`external-path-${index}`} d={path} fill={ICON_COLOR} />
        ))}
      </Svg>
    </Link>
  )
}

function ProjectIconLink({ href, icon, style }: { href: string; icon: ContactIcon; style?: Record<string, unknown> }) {
  const iconData = getContactIconData(icon)
  const linkStyle = style ? [styles.link, style] : styles.link
  return (
    <Link src={href} style={linkStyle}>
      <Svg viewBox={iconData.viewBox} style={styles.projectIcon}>
        {iconData.paths.map((path, index) => (
          <Path key={`${icon}-path-${index}`} d={path} fill={ICON_COLOR} />
        ))}
      </Svg>
    </Link>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.bulletItem}>
          <Text style={styles.bulletSymbol}>•</Text>
          <Text style={styles.bulletContent}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

function ExperienceEntry({ entry }: { entry: CVExperienceEntry }) {
  const highlights = entry.highlights.slice(0, 2)
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.experienceCompany}>{entry.company}</Text>
      <Text style={styles.experienceRole}>{entry.role}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.experienceMeta}>
          {entry.startDate} – {entry.endDate}
          {entry.location ? ` • ${entry.location}` : ''}
        </Text>
        {entry.website ? <ExternalLinkIcon href={entry.website} /> : null}
      </View>
      <BulletList items={highlights} />
    </View>
  )
}

function ProjectEntry({ project }: { project: CVProjectEntry }) {
  const hasLinks = Boolean(project.caseStudyUrl || project.liveUrl)
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.experienceCompany}>{project.title}</Text>
        {hasLinks ? (
          <View style={styles.projectLinks}>
            {project.caseStudyUrl ? <ProjectIconLink href={project.caseStudyUrl} icon="info" /> : null}
            {project.liveUrl ? (
              <ProjectIconLink
                href={project.liveUrl}
                icon="globe"
                style={project.caseStudyUrl ? styles.projectIconSpacing : undefined}
              />
            ) : null}
          </View>
        ) : null}
      </View>
      <Text style={styles.projectMeta}>
        {project.year ? `${project.year} • ` : ''}{project.techStack.join(', ')}
      </Text>
      <Text style={styles.projectDescription}>{project.summary}</Text>
    </View>
  )
}

export function CVDocument({ data, portraitUrl, creationDate }: CVDocumentProps) {
  const generatedDate = creationDate ?? new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const summaryParagraph = Array.isArray(data.summaryLines) && data.summaryLines.length > 0
    ? data.summaryLines.join(' ')
    : data.summary.replace(/\s+/g, ' ').trim()

  const technicalSkillsParagraph = data.technicalSkills
    .map((group) => `${group.label}: ${group.items.join(', ')}`)
    .join(' • ')

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <ContactRow contact={data.contact} />
          </View>
          <View style={styles.headerActions}>
            <View style={[styles.headerLinkRow, !portraitUrl && { marginBottom: 0 }]}>
              <ContactIconSvg name="globe" style={styles.headerIcon} />
              <Link src={FULL_CV_URL} style={styles.link}>
                <Text style={styles.headerLinkText}>dev.sen.studio/cv</Text>
              </Link>
            </View>
            {portraitUrl ? <Image src={portraitUrl} style={styles.avatar} /> : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={[styles.bodyText, { marginTop: 8 }]}>{summaryParagraph}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((entry, index) => (
            <ExperienceEntry key={`${entry.company}-${index}`} entry={entry} />
          ))}
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((degree, index) => (
            <View key={`${degree.institution}-${index}`} style={{ marginBottom: 14 }}>
              <Text style={[styles.experienceCompany, { fontSize: 12 }]}>{degree.institution}</Text>
              <Text style={styles.experienceRole}>{degree.program}</Text>
              <Text style={styles.experienceMeta}>
                {degree.startYear} – {degree.endYear}
              </Text>
              {degree.details ? <BulletList items={degree.details} /> : null}
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={[styles.bodyText, { marginTop: 8 }]}>{technicalSkillsParagraph}</Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soft Skills</Text>
          <Text style={[styles.bodyText, { marginTop: 6 }]}>{data.softSkills.join(', ')}</Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.bodyText}>{data.languages.join(', ')}</Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.bodyText}>{data.interests.join(', ')}</Text>
        </View>


        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text style={styles.sectionTitle}>Matching Projects</Text>
            <Link src="https://dev.sen.studio/projects" style={[styles.link, { fontSize: 9 }]}>see all projects</Link>
          </View>
          <View style={styles.projectGrid}>
            {data.projects.map((project, index) => (
              <ProjectEntry key={`${project.title}-${index}`} project={project} />
            ))}
          </View>
        </View>


        <View style={styles.footer}>
          <Text style={styles.statusText}>Status: {generatedDate}</Text>
        </View>
      </Page>
    </Document>
  )
}
