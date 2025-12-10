import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - SEN.CO",
  description: "Privacy policy and data protection information for SEN.CO UG",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light mb-12 text-foreground">
          Privacy Policy
        </h1>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">1. Data Controller</h2>
            <div className="text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">SEN.CO UG (haftungsbeschränkt)</p>
              <p>Paradiesgasse 53, 60594 Frankfurt am Main</p>
              <p>Managing Director: Denis Kreuzer</p>
              <p>Email: sound@sen.studio</p>
              <p>Phone: +49 15566179807</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">2. Collection and Storage of Personal Data</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">a) When Visiting the Website</h3>
              <p className="text-muted-foreground">
                Upon accessing the site, browsers automatically transmit information to the server. The company collects and temporarily stores:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>IP address of the requesting computer</li>
                <li>Date and time of access</li>
                <li>Name and URL of the retrieved file</li>
                <li>Website from which access occurs (referrer URL)</li>
                <li>Browser used and operating system information</li>
                <li>Name of the access provider</li>
              </ul>
              <p className="text-muted-foreground">
                This data supports website functionality, user experience, system security evaluation, and administrative purposes. The legal foundation is Art. 6 Para. 1 S. 1 lit. f GDPR based on legitimate organizational interests.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">b) When Using the Contact Form</h3>
              <p className="text-muted-foreground">
                The contact form requires a valid email address to respond to inquiries. Additional information is voluntary. Processing is authorized by Art. 6 Para. 1 S. 1 lit. a GDPR through your consent.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">3. Data Sharing</h2>
            <p className="text-muted-foreground">Personal data sharing occurs only when:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>You provide explicit consent</li>
              <li>Legal claims require disclosure and no overriding interest exists</li>
              <li>Legal obligation mandates disclosure</li>
              <li>Contract processing with you requires it</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">4. Cookies</h2>
            <p className="text-muted-foreground">
              Small files are automatically created and stored on your device. These support necessary purposes and protect organizational and third-party interests under GDPR Article 6.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">5. Data Subject Rights</h2>
            <p className="text-muted-foreground">You may:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>Request information about your processed personal data</li>
              <li>Request correction or completion of inaccurate data</li>
              <li>Request deletion unless processing is legally necessary</li>
              <li>Request processing restrictions</li>
              <li>Receive data in structured format or request transfer</li>
              <li>Revoke consent at any time</li>
              <li>File complaints with supervisory authorities</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">6. Right to Object</h2>
            <p className="text-muted-foreground">
              Under GDPR Article 21, you may object to processing based on legitimate interests if circumstances warrant it.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">7. Data Security</h2>
            <p className="text-muted-foreground">
              The company employs SSL procedure (Secure Socket Layer) with the highest encryption supported by your browser.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">8. Updates to this Privacy Policy</h2>
            <p className="text-muted-foreground">
              This policy, dated September 2024, may be updated due to website developments or regulatory changes.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">9. Contact</h2>
            <p className="text-muted-foreground">
              For policy questions, contact: <a href="mailto:sound@sen.studio" className="text-primary hover:underline">sound@sen.studio</a>
            </p>
          </section>

          <p className="text-xs text-muted-foreground/60 pt-8 border-t border-border">
            Last updated: September 2024
          </p>
        </div>
      </div>
    </div>
  )
}
