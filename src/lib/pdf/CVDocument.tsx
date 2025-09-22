import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link, Svg, Path } from '@react-pdf/renderer'

import type { CVData, CVExperienceEntry, CVProjectEntry } from '@/lib/pdf/types'
import { ensurePdfFonts } from '@/lib/pdf/fonts'
import { ContactIcon, ICON_COLOR, getContactIconData } from '@/lib/pdf/icon-utils'

ensurePdfFonts()

interface CVDocumentProps {
  data: CVData
  portraitUrl?: string
  creationDate?: string
}

const ICON_COLOR = '#1d4ed8'

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
  name: {
    fontSize: 20,
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
    marginBottom: 18
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: '#64748b',
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  sectionBody: {
    marginTop: 8,
    gap: 8
  },
  bodyText: {
    fontSize: 10,
    color: '#1e293b'
  },
  skillGroup: {
    marginTop: 4
  },
  skillInlineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 14
  },
  skillInlineItem: {
    fontSize: 9,
    color: '#1e293b',
    marginRight: 56
  },
  skillInlineLabel: {
    fontWeight: 600,
    color: '#475569',
    textTransform: 'uppercase'
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    marginTop: 2
  },
  bulletItem: {
    flexDirection: 'row'
  },
  bulletSymbol: {
    width: 10,
    color: '#94a3b8'
  },
  bulletContent: {
    flex: 1,
    color: '#1e293b',
    lineHeight: 0.5
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
    marginTop: 2,
    marginBottom: 6
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 18
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'none'
  },
  projectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    columnGap: 16
  },
  projectCard: {
    width: '48%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start'
  },
  projectThumb: {
    width: 58,
    height: 58,
    borderRadius: 8,
    objectFit: 'cover'
  },
  projectDetails: {
    flex: 1
  },
  externalIcon: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginTop: -1
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
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

function ContactIconSvg({ name }: { name: ContactIcon }) {
  const icon = getContactIconData(name)
  return (
    <Svg
      viewBox={icon.viewBox}
      style={styles.contactIcon}
    >
      <Path d={icon.path} fill={ICON_COLOR} />
    </Svg>
  )
}

function ExternalLinkIcon({ href }: { href: string }) {
  const icon = getContactIconData('external')
  return (
    <Link src={href} style={styles.link}>
      <Svg viewBox={icon.viewBox} style={styles.externalIcon}>
        <Path d={icon.path} fill={ICON_COLOR} />
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
    <View style={{ marginBottom: 14 }}>
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
  return (
    <View style={styles.projectCard}>
      {project.thumbnail ? (
        <Image src={project.thumbnail} style={styles.projectThumb} alt={project.title} />
      ) : null}
      <View style={styles.projectDetails}>
        <Text style={styles.experienceCompany}>{project.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.experienceMeta}>
            {project.year ? `${project.year} • ` : ''}{project.techStack.join(', ')}
          </Text>
          {project.caseStudyUrl ? <ExternalLinkIcon href={project.caseStudyUrl} /> : null}
        </View>
        <Text style={{ color: '#1e293b' }}>{project.summary}</Text>
      </View>
    </View>
  )
}

export function CVDocument({ data, portraitUrl, creationDate }: CVDocumentProps) {
  const generatedDate = creationDate ?? new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <ContactRow contact={data.contact} />
          </View>
          {portraitUrl ? <Image src={portraitUrl} style={styles.avatar} alt="Portrait" /> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={[styles.bodyText, { marginTop: 8 }]}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((entry, index) => (
            <ExperienceEntry key={`${entry.company}-${index}`} entry={entry} />
          ))}
        </View>

        <View style={styles.divider} />
        <View break />

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
          <View style={styles.skillInlineContainer}>
            {data.technicalSkills.map((group) => (
              <Text key={group.label} style={styles.skillInlineItem}>
                <Text style={styles.skillInlineLabel}>{group.label}:</Text>
                <Text> {group.items.join(', ')}</Text>
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soft Skills</Text>
          <Text style={styles.skillText}>{data.softSkills.join(', ')}</Text>
        </View>

        <View style={styles.divider} />

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

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.bodyText}>{data.languages.join(', ')}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.bodyText}>{data.interests.join(', ')}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.statusText}>Status: {generatedDate}</Text>
        </View>
      </Page>
    </Document>
  )
}
