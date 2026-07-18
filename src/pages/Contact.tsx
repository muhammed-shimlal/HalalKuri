import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
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
              <MapPin className="w-6 h-6 text-gold-500 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Office Address</h4>
                <p className="text-muted-foreground mt-1">
                  123 Islamic Center Road,<br />
                  Business District,<br />
                  City, State 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gold-500 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Phone & WhatsApp</h4>
                <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gold-500 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Email Address</h4>
                <p className="text-muted-foreground mt-1">admin@halalkuri.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gold-500 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Office Hours</h4>
                <p className="text-muted-foreground mt-1">Mon-Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gold-500 text-white font-semibold rounded-lg px-4 py-3 hover:bg-gold-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
