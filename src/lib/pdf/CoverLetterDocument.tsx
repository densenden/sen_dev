import React from 'react'
import { Document, Page, Text, View, StyleSheet, Link, Image, Svg, Path } from '@react-pdf/renderer'

import type { CoverLetterData } from '@/lib/pdf/types'
import { ensurePdfFonts } from '@/lib/pdf/fonts'
import { ContactIcon, ICON_COLOR, getContactIconData } from '@/lib/pdf/icon-utils'

const FULL_CV_URL = 'https://dev.sen.studio/cv'

ensurePdfFonts()

interface CoverLetterDocumentProps {
  data: CoverLetterData
  signatureUrl?: string
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#1f2933',
    lineHeight: 1.5
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  headerInfo: {
    flex: 1
  },
  headerMeta: {
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  headerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  headerIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
    marginTop: -2
  },
  headerLinkText: {
    fontSize: 8,
    color: '#1d4ed8'
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    color: '#0f172a'
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    fontSize: 8.5,
    color: '#64748b',
    marginTop: 10
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
  inlineIcon: {
    width: 9,
    height: 9,
    marginLeft: 2,
    marginTop: -12
  },
  headerDate: {
    fontSize: 9,
    color: '#94a3b8'
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 18
  },
  recipientBlock: {
    marginBottom: 20,
    fontSize: 10,
    color: '#1e293b'
  },
  subject: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 14,
    color: '#1e293b'
  },
  paragraph: {
    marginBottom: 12
  },
  footer: {
    marginTop: 12
  },
  signature: {
    width: 144,
    height: 58,
    marginTop: 6,
    objectFit: 'contain'
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'none'
  }
})

export function CoverLetterDocument({ data, signatureUrl }: CoverLetterDocumentProps) {
  const paragraphs = data.body.split('\n').filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.applicant.fullName}</Text>
            <ContactRow
              email={data.applicant.email}
              phone={data.applicant.phone}
              city={data.applicant.city}
              linktree={data.applicant.linktree}
              socials={data.applicant.socials}
            />
          </View>
          <View style={styles.headerMeta}>
            <View style={styles.headerLinkRow}>
              <ContactIconSvg name="globe" style={styles.headerIcon} />
              <Link src={FULL_CV_URL} style={styles.link}>
                <Text style={styles.headerLinkText}>dev.sen.studio/cv</Text>
              </Link>
            </View>
            <Text style={styles.headerDate}>{data.date}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.recipientBlock}>
          <Text>{data.recipient.company}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.subject} wrap={false}>
            {data.subject}
          </Text>
          {data.jobUrl ? (
            <View style={{ marginLeft: 6 }}>
              <ExternalLinkIcon href={data.jobUrl} />
            </View>
          ) : null}
        </View>

        {paragraphs.map((paragraph, index) => (
          <Text key={`paragraph-${index}`} style={styles.paragraph}>{paragraph}</Text>
        ))}

        {signatureUrl ? (
          <View style={styles.footer}>
            <Image src={signatureUrl} style={styles.signature} alt="Signature" />
          </View>
        ) : null}
      </Page>
    </Document>
  )
}

function ContactRow({
  email,
  phone,
  city,
  linktree,
  socials
}: {
  email: string
  phone: string
  city: string
  linktree?: string
  socials?: Array<{ label: string; url: string }>
}) {
  const items: React.ReactNode[] = []

  if (email) items.push(<Text key="email">{email}</Text>)
  if (phone) items.push(<Text key="phone">{phone}</Text>)
  if (city) items.push(<Text key="city">{city}</Text>)

  if (linktree) {
    items.push(
      <Link key="linktree" src={linktree} style={styles.contactLink}>
        <ContactIconSvg name="linktree" />
      </Link>
    )
  }

  socials?.forEach((social, index) => {
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
    <Link src={href} style={styles.contactLink}>
      <Svg viewBox={icon.viewBox} style={styles.inlineIcon}>
        {icon.paths.map((path, index) => (
          <Path key={`external-path-${index}`} d={path} fill={ICON_COLOR} />
        ))}
      </Svg>
    </Link>
  )
}
