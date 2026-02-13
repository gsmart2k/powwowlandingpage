"use client"
// import Logo from "../../purplelogo.png"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
// Fallback Button component used when '@/components/ui/button' cannot be resolved
const Button = (props: any) => {
  const { children, className = "", ...rest } = props
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  )
}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Shield, Users, MessageCircle, Lock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
const response = await fetch('https://api.freewaitlists.com/waitlists/cmlkdp6ur00aq01p2muoztrtg', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email, // Mandatory field
    meta: { 
      name,
      businessType
      // Put anything you want here -> key: value
    }
  })
});

const result = await response.json();
console.log(result);
      console.log('Waitlist submission:', { email, name, businessType })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      setEmail("")
      setName("")
      setBusinessType("")

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to join waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/purplelogo.png" alt="Powwow Logo" width={120} height={120} />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-[#a90dca] hover:text-[#8a0ba8] hover:bg-purple-50 disabled cursor-not-allowed">
                Sign In
              </Button>
            </Link>
            <Button 
              className="bg-[#a90dca] hover:bg-[#8a0ba8] text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-[#a90dca] rounded-full text-sm font-medium">
            <Lock className="h-4 w-4" />
            Anonymous • Safe • Supportive
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Connect with Local
            <span className="text-[#a90dca]"> Business Owners</span>
            <br />
            Anonymously
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join a safe, anonymous community where business owners share challenges, 
            solutions, and support each other without judgment.
          </p>

          {/* Waitlist Form - Hero */}
          <Card className="max-w-md mx-auto p-6 bg-white border-2 border-[#a90dca]/20 shadow-xl">
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the Waitlist</h3>
                <p className="text-sm text-gray-600">Be the first to know when we launch</p>
              </div>

              {success && (
                <div className="bg-green-500 text-white px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">You're on the list! We'll be in touch soon.</span>
                </div>
              )}

              {error && (
                <div className="bg-red-500 text-white px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                  className="border-gray-300 focus:border-[#a90dca] focus:ring-[#a90dca]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading || success}
                  className="border-gray-300 focus:border-[#a90dca] focus:ring-[#a90dca]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-gray-700">Business Type (Optional)</Label>
                <Input
                  id="businessType"
                  type="text"
                  placeholder="e.g., Restaurant, Retail, Tech"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  disabled={loading || success}
                  className="border-gray-300 focus:border-[#a90dca] focus:ring-[#a90dca]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a90dca] hover:bg-[#8a0ba8] text-white py-6 text-lg font-semibold"
                disabled={loading || success}
              >
                {loading ? "Joining..." : success ? "You're In! ✓" : "Join Waitlist"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Business Owners Love Powwow
            </h2>
            <p className="text-xl text-gray-600">
              A judgment-free space to share, learn, and grow together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-2 border-purple-100 hover:border-[#a90dca] transition-all hover:shadow-lg">
              <div className="bg-[#a90dca] text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Anonymous</h3>
              <p className="text-gray-600">
                Share your challenges openly without revealing your identity. Your privacy is our priority.
              </p>
            </Card>

            <Card className="p-8 border-2 border-purple-100 hover:border-[#a90dca] transition-all hover:shadow-lg">
              <div className="bg-[#a90dca] text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Community</h3>
              <p className="text-gray-600">
                Connect with business owners in your area who understand your local market challenges.
              </p>
            </Card>

            <Card className="p-8 border-2 border-purple-100 hover:border-[#a90dca] transition-all hover:shadow-lg">
              <div className="bg-[#a90dca] text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Coaches</h3>
              <p className="text-gray-600">
                Get guidance from vetted business coaches when you need professional support.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting support has never been easier
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex gap-6 items-start">
              <div className="bg-[#a90dca] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Anonymous Profile</h3>
                <p className="text-lg text-gray-600">
                  Choose an alias and select your business type. Your identity stays completely private.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-[#a90dca] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Relevant Rooms</h3>
                <p className="text-lg text-gray-600">
                  Enter rooms based on your business type or explore other industries to learn and share.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-[#a90dca] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Share & Get Support</h3>
                <p className="text-lg text-gray-600">
                  Ask questions, share experiences, and connect with coaches when you need expert guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#a90dca] py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Join the Community?
            </h2>
            <p className="text-xl text-white/90">
              Be part of a growing network of business owners who support each other anonymously.
            </p>
            <Button 
              size="lg" 
              className="flex m-auto items-center bg-white text-[#a90dca] hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src="/whitelogo.png" alt="Powwow Logo" width={100} height={100} />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2026 Powwow. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Anonymous support for local business owners
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}