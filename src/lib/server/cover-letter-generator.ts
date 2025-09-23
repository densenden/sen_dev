import type { CVProjectEntry } from '@/lib/pdf/types'
import type { CoverLetterData } from '@/lib/pdf/types'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const SENAPPLY_GPT_MODEL = process.env.SENAPPLY_GPT_MODEL ?? 'gpt-4o-mini'

type SupportedLanguage = 'German' | 'English'

function detectLanguage(source?: string | null): SupportedLanguage {
  if (!source) return 'German'
  const text = source.toLowerCase()

  const germanIndicators = [
    'der ',
    'die ',
    'und ',
    'für ',
    'bewerbung',
    'kenntnisse',
    'entwicklungsumgebung',
    'verantwortung',
    'möglichkeit',
    'entwicklung',
    'teamleitung',
    'gestaltung',
    'ä',
    'ö',
    'ü',
    'ß'
  ]
  const englishIndicators = [
    ' the ',
    ' and ',
    ' with ',
    ' role ',
    ' responsibilities',
    'experience',
    'requirements',
    'salary',
    'team lead',
    'design',
    'tech',
    'engineer'
  ]

  const germanScore = germanIndicators.reduce((score, indicator) => (text.includes(indicator) ? score + 1 : score), 0)
  const englishScore = englishIndicators.reduce((score, indicator) => (text.includes(indicator) ? score + 1 : score), 0)

  if (germanScore === englishScore) {
    return text.includes('ß') || /[äöü]/.test(text) ? 'German' : 'German'
  }

  return germanScore > englishScore ? 'German' : 'English'
}

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
  summaryLines?: string[]
  skills: string[]
}

export async function generateCoverLetter({ job, applicant, projects, summary, summaryLines, skills }: CoverLetterInput): Promise<CoverLetterData> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const language = detectLanguage(job.jobDescription ?? job.role)
  const languageInstruction =
    language === 'German' ? 'Schreibe das Anschreiben vollständig auf Deutsch.' : 'Write the entire cover letter in English.'

  const jobDescriptionRaw = job.jobDescription || ''
  const normalizedDescription = jobDescriptionRaw
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

  const availabilityRequested = /verfugbarkeit|eintrittstermin|ab wann|starttermin|start date|availability|earliest start/.test(normalizedDescription)
  const salaryRequested = /gehalt|gehaltsvorstellung|vergutung|salary|compensation|pay range|annual salary/.test(normalizedDescription)

  const availabilityInstruction = availabilityRequested
    ? language === 'German'
      ? 'Füge eine kurze Verfügbarkeitsangabe hinzu: "Ich stehe ab dem 1. des kommenden Monats zur Verfügung."'
      : 'Include a brief availability statement such as "I am available from the 1st of the upcoming month."'
    : language === 'German'
      ? 'Füge keine Aussage zur Verfügbarkeit hinzu.'
      : 'Do not add any statement about availability.'

  const salaryInstruction = salaryRequested
    ? language === 'German'
      ? 'Füge bei Nachfrage eine Gehaltsangabe von 85.000 € brutto jährlich hinzu.'
      : 'If the posting requests it, include a salary expectation of €85,000 per year.'
    : language === 'German'
      ? 'Erwähne keine Gehaltsvorstellung.'
      : 'Do not mention salary expectations.'

  const shortProfileLines = (summaryLines && summaryLines.length > 0
    ? summaryLines
    : summary
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
  ).slice(0, 3)

  const shortProfileBlock = shortProfileLines.length > 0 ? shortProfileLines.join('\n') : summary.trim()

  const projectHighlights = projects
    .map((project) => `- ${project.title}: ${project.summary} (Stack: ${project.techStack.join(', ')})`)
    .join('\n')

  const prompt = `Du bist SenApply, ein Bewerbungsassistent für Denis Leif Kreuzer. Schreibe ein individuell zugeschnittenes Anschreiben für die Position "${job.role}" bei "${job.company}". ${languageInstruction}\n\nArbeite mit folgenden Daten:\n\nKurzprofil (Zeilen unverändert übernehmen):\n${shortProfileBlock}\n\nTop Skills:\n${skills.join(', ')}\n\nAusgewählte Projekte:\n${projectHighlights || '- (keine Projekte ausgewählt)'}\n\nJobbeschreibung / Stichpunkte:\n${job.jobDescription || 'Noch keine Beschreibung vorhanden.'}\n\nLeitlinien:\n- Struktur: Begrüßung, prägnanter Einstieg, Abschnitt zur Passung (technisch vs. kreativ je nach Stellenanforderung), Motivation, Abschluss mit Call-to-Action.\n- Nutze einen akademisch-kreativen, motivierten Ton, fachlich klar und ohne Floskeln.\n- Halte das Anschreiben kurz und wirkungsorientiert (maximal 4 Absätze).\n- Stelle Verweise auf Projekte und Skills nur dort, wo sie direkten Mehrwert bieten.\n- ${availabilityInstruction}\n- ${salaryInstruction}\n- Erwähne keine Liste beigelegter Unterlagen.\n- Gib ausschließlich den eigentlichen Brieftext zurück, beginnend mit der Anrede. Keine Überschriften, Bulletpoints oder Meta-Informationen.`;

  const messages = [
    {
      role: 'system' as const,
      content:
        'Dieses GPT erstellt prägnante, individuell zugeschnittene Bewerbungsanschreiben auf Basis von Stellenausschreibungen und Lebenslaufdaten von Denis Leif Kreuzer. Es setzt den Schwerpunkt dynamisch auf technische Fähigkeiten oder kreative/leitende Kompetenzen, schreibt akademisch-kreativ, motiviert und professionell, hält Texte kurz und klar strukturiert und vermeidet Floskeln. Verfügbarkeit (ab dem nächsten 1.) und Gehaltsvorstellung (85.000 €) erscheinen nur, wenn gefordert in stellenausschreibung. Das Ergebnis ist ausschließlich der finale Brieftext, beginnend mit der Anrede, ohne zusätzliche Meta-Informationen oder Listen.'
    },
    {
      role: 'user' as const,
      content: prompt
    }
  ]

  const useResponsesEndpoint = SENAPPLY_GPT_MODEL.startsWith('g-')
  const endpoint = useResponsesEndpoint
    ? 'https://api.openai.com/v1/responses'
    : 'https://api.openai.com/v1/chat/completions'

  const requestBody = useResponsesEndpoint
    ? {
        model: SENAPPLY_GPT_MODEL,
        input: messages.map((message) => ({
          role: message.role,
          content: [{ type: 'input_text', text: message.content }]
        })),
        temperature: 0.7
      }
    : {
        model: SENAPPLY_GPT_MODEL,
        messages,
        temperature: 0.7
      }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.error?.message || 'OpenAI API error')
  }

  const payload = await response.json()
  let text: string | undefined

  if (useResponsesEndpoint) {
    if (typeof payload.output_text === 'string') {
      text = payload.output_text
    } else if (Array.isArray(payload.output)) {
      text = payload.output
        .flatMap((item: any) => {
          if (Array.isArray(item?.content)) {
            return item.content
              .filter((part: any) => {
                const type = part?.type
                return (type === 'output_text' || type === 'text') && typeof part.text === 'string'
              })
              .map((part: any) => part.text as string)
          }
          if (typeof item?.text === 'string') {
            return [item.text as string]
          }
          return []
        })
        .join('\n')
    }
  } else {
    text = payload.choices?.[0]?.message?.content
  }

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
