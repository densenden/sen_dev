import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - sencodev",
  description: "Terms and conditions for sencodev services and website usage",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Terms & Conditions (AGB)</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
              <strong>⚠️ Legal Template</strong><br />
              These terms and conditions are a template and must be reviewed and customized by a legal professional to ensure compliance with applicable laws and business practices.
            </p>
            
            <h2>1. Scope of Application</h2>
            <p>
              These General Terms and Conditions (GTC) apply to all services provided by sencodev. By using our services, you agree to be bound by these terms.
            </p>
            
            <h2>2. Services</h2>
            <p>sencodev provides the following services:</p>
            <ul>
              <li>MVP Development and Prototyping</li>
              <li>Web and Mobile Application Development</li>
              <li>AI Integration Services</li>
              <li>Branding and Design Services</li>
              <li>Technical Infrastructure Setup</li>
              <li>Business Development Consulting</li>
            </ul>
            
            <h2>3. Service Packages</h2>
            
            <h3>3.1 Impulse Sprint</h3>
            <p>Quick validation and prototype development service with defined scope and timeline.</p>
            
            <h3>3.2 Starter Sprint</h3>
            <p>Comprehensive MVP development including basic branding and deployment.</p>
            
            <h3>3.3 Launch Ready</h3>
            <p>Full-scale product development with complete branding, infrastructure, and business development support.</p>
            
            <h3>3.4 Creator+ Build</h3>
            <p>Advanced development package with AI integration and custom features.</p>
            
            <h3>3.5 Co-Founder Tech Partner</h3>
            <p>Ongoing retainer-based partnership for continuous development and strategic guidance.</p>
            
            <h2>4. Project Execution</h2>
            
            <h3>4.1 Vibe Coding Methodology</h3>
            <p>
              All development follows our proprietary Vibe Coding™ methodology, combining emotional design principles with technical excellence.
            </p>
            
            <h3>4.2 Timeline and Deliverables</h3>
            <p>
              Project timelines and deliverables are specified in individual project agreements. Standard MVP development takes 4-8 weeks depending on scope.
            </p>
            
            <h2>5. Client Responsibilities</h2>
            <p>Clients are responsible for:</p>
            <ul>
              <li>Providing necessary project requirements and feedback</li>
              <li>Timely review and approval of deliverables</li>
              <li>Providing access to necessary systems and data</li>
              <li>Payment according to agreed terms</li>
            </ul>
            
            <h2>6. Payment Terms</h2>
            
            <h3>6.1 Payment Schedule</h3>
            <p>
              Payment terms are specified in individual project agreements. Standard terms include milestone-based payments or monthly retainer arrangements.
            </p>
            
            <h3>6.2 Late Payment</h3>
            <p>
              Late payments may result in project suspension and additional fees as specified in project agreements.
            </p>
            
            <h2>7. Intellectual Property</h2>
            
            <h3>7.1 Client IP</h3>
            <p>
              Upon full payment, clients receive full ownership of custom-developed code and designs created specifically for their project.
            </p>
            
            <h3>7.2 Third-Party Components</h3>
            <p>
              Projects may include third-party libraries and components subject to their respective licenses.
            </p>
            
            <h3>7.3 Portfolio Rights</h3>
            <p>
              sencodev retains the right to showcase completed projects in portfolios and marketing materials unless otherwise agreed.
            </p>
            
            <h2>8. Warranties and Limitations</h2>
            
            <h3>8.1 Service Warranty</h3>
            <p>
              We warrant that services will be performed with professional skill and care according to industry standards.
            </p>
            
            <h3>8.2 Technical Support</h3>
            <p>
              Post-launch technical support is provided as specified in individual project agreements.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              Liability is limited to the amount paid for services. We are not liable for indirect, consequential, or punitive damages.
            </p>
            
            <h2>10. Termination</h2>
            <p>
              Either party may terminate agreements with appropriate notice as specified in project contracts. Completed work and payment obligations remain in effect.
            </p>
            
            <h2>11. Confidentiality</h2>
            <p>
              We maintain strict confidentiality regarding client information and projects unless disclosure is required by law.
            </p>
            
            <h2>12. Governing Law</h2>
            <p>
              These terms are governed by [Jurisdiction to be specified] law. Disputes will be resolved through [Dispute resolution method to be specified].
            </p>
            
            <h2>13. Contact Information</h2>
            <p>
              For questions regarding these terms, contact us at:<br />
              <strong>Email:</strong> [legal@sencodev.com]<br />
              <strong>Address:</strong> [To be filled]
            </p>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-8">
              Last updated: [Date to be filled]<br />
              These terms are effective as of the date of agreement to services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}