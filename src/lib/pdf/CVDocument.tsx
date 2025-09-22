import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer'

import type { CVData, CVExperienceEntry, CVProjectEntry } from '@/lib/pdf/types'
import { ensurePdfFonts } from '@/lib/pdf/fonts'

ensurePdfFonts()

interface CVDocumentProps {
  data: CVData
  portraitUrl?: string
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#1f2933',
    lineHeight: 1.4
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  headerInfo: {
    flex: 1
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 4
  },
  title: {
    fontSize: 12,
    marginBottom: 6,
    color: '#52606d'
  },
  contact: {
    fontSize: 9,
    color: '#52606d'
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginLeft: 16
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8
  },
  summaryText: {
    fontSize: 10,
    color: '#364152'
  },
  skillGroup: {
    marginBottom: 8
  },
  skillLabel: {
    fontWeight: 600,
    marginBottom: 2
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  bulletItem: {
    flexDirection: 'row'
  },
  bulletSymbol: {
    width: 12
  },
  bulletContent: {
    flex: 1
  },
  experienceCompany: {
    fontWeight: 600,
    fontSize: 10
  },
  experienceRole: {
    color: '#364152'
  },
  experienceMeta: {
    fontSize: 9,
    color: '#8a94a6',
    marginBottom: 4
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 18
  },
  column: {
    flex: 1
  },
  divider: {
    height: 1,
    backgroundColor: '#e4e7eb',
    marginVertical: 12
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none'
  }
})

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
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.experienceCompany}>{entry.company}</Text>
      <Text style={styles.experienceRole}>{entry.role}</Text>
      <Text style={styles.experienceMeta}>
        {entry.startDate} – {entry.endDate} {entry.location ? `• ${entry.location}` : ''}
      </Text>
      <BulletList items={entry.highlights} />
      {entry.website ? (
        <Link src={entry.website} style={[styles.link, { marginTop: 4 }]}>Website</Link>
      ) : null}
    </View>
  )
}

function ProjectEntry({ project }: { project: CVProjectEntry }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.experienceCompany}>{project.title}</Text>
      <Text style={styles.experienceMeta}>
        {project.year ? `${project.year} • ` : ''}{project.techStack.join(', ')}
      </Text>
      <Text style={{ color: '#364152', marginBottom: 4 }}>{project.summary}</Text>
      {project.caseStudyUrl ? (
        <Link src={project.caseStudyUrl} style={styles.link}>{project.caseStudyUrl}</Link>
      ) : null}
    </View>
  )
}

export function CVDocument({ data, portraitUrl }: CVDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.contact}>
              {data.contact.email} • {data.contact.phone} • {data.contact.location}
              {data.contact.website ? ` • ${data.contact.website}` : ''}
            </Text>
          </View>
          {portraitUrl ? <Image src={portraitUrl} style={styles.avatar} /> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        <View style={[styles.section, styles.twoColumn]}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {data.technicalSkills.map((group) => (
              <View key={group.label} style={styles.skillGroup}>
                <Text style={styles.skillLabel}>{group.label}</Text>
                <Text>{group.items.join(' • ')}</Text>
              </View>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Soft Skills</Text>
            <BulletList items={data.softSkills} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((entry, index) => (
            <ExperienceEntry key={`${entry.company}-${index}`} entry={entry} />
          ))}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={[styles.section, styles.twoColumn]}
        >
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((degree, index) => (
              <View key={`${degree.institution}-${index}`} style={{ marginBottom: 10 }}>
                <Text style={styles.experienceCompany}>{degree.institution}</Text>
                <Text style={styles.experienceRole}>{degree.program}</Text>
                <Text style={styles.experienceMeta}>
                  {degree.startYear} – {degree.endYear}
                </Text>
                {degree.details ? <BulletList items={degree.details} /> : null}
              </View>
            ))}

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Languages</Text>
            <Text>{data.languages.join(' • ')}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Interests</Text>
            <Text>{data.interests.join(' • ')}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <ProjectEntry key={`${project.title}-${index}`} project={project} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}
