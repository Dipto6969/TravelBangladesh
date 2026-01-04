'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import { FadeInUp, SlideInLeft, SlideInRight, ScaleIn } from '@/components';
import { siteConfig } from '@/data';
import { cn } from '@/lib/utils';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@travelbangladesh.com',
    href: 'mailto:hello@travelbangladesh.com',
    color: 'emerald'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1700-000000',
    href: 'tel:+8801700000000',
    color: 'blue'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
    href: '#',
    color: 'yellow'
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: '#',
    color: 'purple'
  }
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: siteConfig.links.instagram },
  { icon: Twitter, label: 'Twitter', href: siteConfig.links.twitter },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Contact Us
              </span>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-shadow-black mb-6">
                Let&apos;s Start a{' '}
                <span className="text-gradient">Conversation</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-shadow-black/70">
                Have questions, suggestions, or just want to say hello? 
                We&apos;d love to hear from you.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <motion.a
                  href={info.href}
                  whileHover={{ y: -5 }}
                  className="block p-6 rounded-2xl glass border border-white/10 hover:border-emerald-500/50 transition-all"
                >
                  <div className={cn(
                    'p-3 rounded-xl w-fit mb-4',
                    info.color === 'emerald' && 'bg-emerald-500/20',
                    info.color === 'blue' && 'bg-blue-500/20',
                    info.color === 'yellow' && 'bg-yellow-500/20',
                    info.color === 'purple' && 'bg-purple-500/20'
                  )}>
                    <info.icon className={cn(
                      'w-6 h-6',
                      info.color === 'emerald' && 'text-emerald-400',
                      info.color === 'blue' && 'text-blue-400',
                      info.color === 'yellow' && 'text-yellow-400',
                      info.color === 'purple' && 'text-purple-400'
                    )} />
                  </div>
                  <p className="text-white/50 text-sm mb-1">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </motion.a>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <SlideInLeft>
              <div className="p-8 rounded-3xl glass border border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="text-white/50 text-sm">Fill out the form below</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-6">
                      <CheckCircle className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-white/70 text-sm mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-white/30 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white/70 text-sm mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-white/30 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-white/70 text-sm mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass text-white border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all bg-transparent"
                      >
                        <option value="" className="bg-[#0B1220]">Select a subject</option>
                        <option value="general" className="bg-[#0B1220]">General Inquiry</option>
                        <option value="feedback" className="bg-[#0B1220]">Feedback</option>
                        <option value="partnership" className="bg-[#0B1220]">Partnership</option>
                        <option value="suggestion" className="bg-[#0B1220]">Place Suggestion</option>
                        <option value="bug" className="bg-[#0B1220]">Report an Issue</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white/70 text-sm mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-white/30 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={cn(
                        'w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 transition-opacity',
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </SlideInLeft>

            {/* Right Side - Social & Map */}
            <SlideInRight>
              <div className="space-y-8">
                {/* Social Links */}
                <div className="p-8 rounded-3xl glass border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
                  <p className="text-white/60 mb-6">
                    Follow us on social media for the latest updates, travel inspiration, 
                    and behind-the-scenes content.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/20 transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-emerald-400" />
                        <span className="text-white">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="p-4 rounded-3xl glass border border-white/10 overflow-hidden">
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                      alt="Map"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0B1220]/60 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-4">
                          <MapPin className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Based in Dhaka</h4>
                        <p className="text-white/60">The heart of Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="p-6 rounded-2xl glass border border-white/10">
                  <h4 className="font-bold text-white mb-2">Have Questions?</h4>
                  <p className="text-white/60 text-sm mb-4">
                    Check out our frequently asked questions for quick answers.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-emerald-400 font-medium text-sm flex items-center gap-2"
                  >
                    Visit FAQ
                    <span>→</span>
                  </motion.button>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            <ScaleIn>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-shadow-black mb-4">
                Stay in the Loop
              </h2>
            </ScaleIn>

            <FadeInUp delay={0.1}>
              <p className="text-shadow-black/60 mb-8">
                Subscribe to our newsletter for travel tips, new destinations, 
                and exclusive content delivered to your inbox.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full glass text-white placeholder:text-white/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </form>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  );
}
