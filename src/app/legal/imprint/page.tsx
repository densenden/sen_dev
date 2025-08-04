import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Imprint - sencodev",
  description: "Legal information and contact details for sencodev",
}

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Imprint</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>Information according to § 5 TMG</h2>
            
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
              <strong>⚠️ Legal Information Required</strong><br />
              This page needs to be populated with actual legal entity information from sen.studio or your business registration.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3>Business Information</h3>
                <p>
                  <strong>Business Name:</strong> [To be filled]<br />
                  <strong>Legal Form:</strong> [To be filled]<br />
                  <strong>Registration:</strong> [To be filled]<br />
                  <strong>VAT ID:</strong> [To be filled]
                </p>
              </div>
              
              <div>
                <h3>Contact Information</h3>
                <p>
                  <strong>Address:</strong><br />
                  [Street Address]<br />
                  [City, Postal Code]<br />
                  [Country]
                </p>
                
                <p>
                  <strong>Phone:</strong> [To be filled]<br />
                  <strong>Email:</strong> [To be filled]
                </p>
              </div>
            </div>
            
            <h3>Responsible for Content</h3>
            <p>
              [Name and address of person responsible for content according to § 18 Abs. 2 MStV]
            </p>
            
            <h3>Disclaimer</h3>
            <h4>Liability for Content</h4>
            <p>
              The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not under obligation to supervise merely the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
            </p>
            
            <h4>Liability for Links</h4>
            <p>
              Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for the contents of the linked websites.
            </p>
            
            <h4>Copyright</h4>
            <p>
              The content and works on these pages created by the site operators are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}