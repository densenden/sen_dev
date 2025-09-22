import type { CVProjectEntry } from '@/lib/pdf/types'
import type { CoverLetterData } from '@/lib/pdf/types'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface CoverLetterInput {
  job: {
    role: string
    company: string
    jobUrl?: string | null
    jobDescription?: string | null
    contactName?: string | null
  }
  applicant: CoverLetterData['applicant']
  projects: CVProjectEntry[]
  summary: string
  skills: string[]
}

export async function generateCoverLetter({ job, applicant, projects, summary, skills }: CoverLetterInput): Promise<CoverLetterData> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const projectHighlights = projects
    .map((project) => `- ${project.title}: ${project.summary} (Stack: ${project.techStack.join(', ')})`)
    .join('\n')

  const prompt = `Du bist SenApply, ein Bewerbungsassistent für Denis Leif Kreuzer. Schreibe ein deutschsprachiges Anschreiben für die Position "${job.role}" bei "${job.company}". Verwende einen professionellen, freundlichen Ton mit klarem Fokus auf Wirkung und Zusammenarbeit. Nutze folgende Informationen:\n\nKurzprofil:\n${summary}\n\nTop Skills:\n${skills.join(', ')}\n\nAusgewählte Projekte:\n${projectHighlights || '- (keine Projekte ausgewählt)'}\n\nJobbeschreibung / Stichpunkte:\n${job.jobDescription || 'Noch keine Beschreibung vorhanden.'}\n\nAdressiere den Ansprechpartner${job.contactName ? ` "${job.contactName}"` : ''} und verweise auf die beigefügten Unterlagen (CV & Portfolio).`.

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Du bist SenApply, ein Bewerbungscopilot für den Creative Technologist Denis Leif Kreuzer. Schreibe präzise, aktive und wertorientierte Anschreiben auf Deutsch. Struktur: Begrüßung, kurzer Einstieg, zwei Hauptabsätze (Kompetenzen + Mehrwert), Abschluss mit Call-to-Action.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.error?.message || 'OpenAI API error')
  }

  const payload = await response.json()
  const text: string | undefined = payload.choices?.[0]?.message?.content

  if (!text) {
    throw new Error('No cover letter text returned')
  }

  return {
    applicant,
    recipient: {
      company: job.company,
      contactPerson: job.contactName ?? undefined,
      role: job.role
    },
    jobUrl: job.jobUrl ?? undefined,
    subject: `Bewerbung als ${job.role}`,
    date: new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date()),
    body: text
  }
}
