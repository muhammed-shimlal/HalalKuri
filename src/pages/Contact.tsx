import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName('')
      setEmail('')
      setMessage('')
    }, 800)
  }

  return (
    <div className="pt-24 pb-16 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Get In <span className="text-gold-500">Touch</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to our committee administration.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 md:p-12 space-y-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gold-500 mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">Office Address</h3>
                <p className="text-muted-foreground mt-1">
                  123 Islamic Center Road,<br />
                  Business District,<br />
                  City, State 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gold-500 mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">Phone &amp; WhatsApp</h3>
                <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gold-500 mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">Email Address</h3>
                <p className="text-muted-foreground mt-1">admin@halalkuri.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gold-500 mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">Office Hours</h3>
                <p className="text-muted-foreground mt-1">Mon-Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            {isSubmitted ? (
              <div
                className="bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg p-6 space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 font-semibold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  Message Sent Successfully!
                </div>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. Our committee administration will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-gold-500 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50"
                    placeholder="Your Name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 h-32 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-500 text-white font-semibold rounded-lg px-4 py-3 hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
