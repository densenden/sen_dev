import React from 'react'
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'

import type { CoverLetterData } from '@/lib/pdf/types'
import { ensurePdfFonts } from '@/lib/pdf/fonts'

ensurePdfFonts()

interface CoverLetterDocumentProps {
  data: CoverLetterData
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#1f2933',
    lineHeight: 1.5
  },
  applicantBlock: {
    marginBottom: 24
  },
  applicantLine: {
    color: '#364152'
  },
  recipientBlock: {
    marginBottom: 24
  },
  subject: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 16
  },
  paragraph: {
    marginBottom: 12
  },
  footer: {
    marginTop: 32
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none'
  }
})

export function CoverLetterDocument({ data }: CoverLetterDocumentProps) {
  const paragraphs = data.body.split('\n').filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.applicantBlock}>
          <Text>{data.applicant.fullName}</Text>
          <Text style={styles.applicantLine}>{data.applicant.street}</Text>
          <Text style={styles.applicantLine}>{data.applicant.city}</Text>
          <Text style={styles.applicantLine}>{data.applicant.phone}</Text>
          <Text style={styles.applicantLine}>{data.applicant.email}</Text>
        </View>

        <View style={styles.recipientBlock}>
          <Text>{data.recipient.company}</Text>
          {data.recipient.addressLines?.map((line, index) => (
            <Text key={`recipient-address-${index}`}>{line}</Text>
          ))}
          {data.recipient.city ? <Text>{data.recipient.city}</Text> : null}
        </View>

        <Text style={{ color: '#52606d', marginBottom: 16 }}>{data.date}</Text>

        <Text style={styles.subject}>Bewerbung als {data.recipient.role}</Text>

        {paragraphs.map((paragraph, index) => (
          <Text key={`paragraph-${index}`} style={styles.paragraph}>{paragraph}</Text>
        ))}

        <View style={styles.footer}>
          {data.jobUrl ? (
            <Link src={data.jobUrl} style={[styles.link, { marginBottom: 12 }]}>
              Stellenanzeige
            </Link>
          ) : null}
          <Text>Mit freundlichen Grüßen</Text>
          <Text style={{ marginTop: 18 }}>{data.applicant.fullName}</Text>
        </View>
      </Page>
    </Document>
  )
}
