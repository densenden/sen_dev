"use client"

import { T, useGT } from 'gt-next'
import LanguageToggle from '@/components/language-toggle'

export default function GTTestPage() {
  const translate = useGT()
  
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-8 max-w-4xl space-y-8">
        
        {/* Language Toggle */}
        <div className="flex justify-end">
          <LanguageToggle />
        </div>
        
        {/* Hero Example */}
        <section className="glass-primary rounded-3xl p-12">
          <h1 className="text-4xl font-light mb-4">
            <T id="hero-title">Where vision meets velocity</T>
          </h1>
          <p className="text-lg text-muted-foreground">
            <T id="hero-subtitle">Full-package development for ambitious entrepreneurs who refuse to wait months for their MVP.</T>
          </p>
        </section>

        {/* Hook Example */}
        <section className="glass-secondary rounded-3xl p-12">
          <h2 className="text-2xl font-light mb-4">
            {translate('Welcome to General Translation!', { id: 'welcome-title' })}
          </h2>
          <p className="text-muted-foreground">
            {translate('This demonstrates the useGT hook for string translations.', { id: 'hook-demo' })}
          </p>
        </section>

        {/* Navigation Examples */}
        <section className="glass-primary rounded-3xl p-12">
          <h3 className="text-xl font-light mb-6">
            <T id="nav-title">Navigation</T>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-about">About</T>
            </div>
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-services">Services</T>
            </div>
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-packages">Packages</T>
            </div>
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-projects">Projects</T>
            </div>
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-contact">Contact</T>
            </div>
            <div className="p-3 glass-secondary rounded-lg">
              <T id="nav-philosophy">Philosophy</T>
            </div>
          </div>
        </section>

        {/* Footer Examples */}
        <section className="glass-secondary rounded-3xl p-12">
          <h3 className="text-xl font-light mb-6">
            <T id="footer-title">Footer Content</T>
          </h3>
          <div className="space-y-3">
            <p><T id="footer-germany">Built with passion in Germany 🇩🇪</T></p>
            <p><T id="footer-tagline">Where vision meets velocity. Full-package development for ambitious entrepreneurs.</T></p>
            <p><T id="footer-cta">Start Your Project</T></p>
          </div>
        </section>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h4 className="text-lg font-medium mb-3">
            <T id="instructions-title">🚀 Translation Setup Instructions</T>
          </h4>
          <div className="space-y-2 text-sm">
            <p><T id="step1">1. Go to generaltranslation.com and login to your account</T></p>
            <p><T id="step2">2. Find project ID: prj_x83xbh3yb5zv4vi5m4niclku</T></p>
            <p><T id="step3">3. Add German translations for each text ID shown above</T></p>
            <p><T id="step4">4. Click the language toggle to see translations in action!</T></p>
          </div>
        </div>

        {/* Success Status */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <p className="text-sm text-green-800 dark:text-green-200">
            <T id="success-message">✅ GeneralTranslation is working! The language toggle allows switching between languages.</T>
          </p>
        </div>
      </div>
    </div>
  )
}