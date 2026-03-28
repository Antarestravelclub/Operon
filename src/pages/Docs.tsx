import { Link } from 'react-router-dom'
import { useState } from 'react'

// FAQ data
const faqs = [
  {
    question: "Is this real AI or just automation?",
    answer: "Operon uses real AI powered by OpenAI — not just simple automation! Unlike simple automation that follows pre-written scripts, Operon's AI understands context, adjusts tone, and writes unique emails for each recipient. Every email is different, personalized, and genuinely helpful."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! Absolutely. Operon doesn't lock you into long contracts. You can cancel at any time from your account settings, downgrade or change plans anytime, with no cancellation fees or penalties."
  },
  {
    question: "Does it send emails automatically or do I approve first?",
    answer: "You have full control! You can choose: 1) Automatic sending for high-volume follow-ups, 2) Manual approval for important leads, or 3) Scheduled review. Most users start with manual approval and switch to automatic once they trust the system."
  },
  {
    question: "Which Gmail accounts work?",
    answer: "Operon works with regular Gmail accounts, Google Workspace accounts, and Gmail accounts with 2-factor authentication. Support for other email providers is coming soon!"
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely! We use bank-level encryption, limit access to only what's necessary, never sell your data, comply with GDPR regulations, and use secure infrastructure. You can also revoke access anytime."
  }
]

// Section Component
function Section({ id, title, children, bgLight = false }: { id: string, title: string, children: React.ReactNode, bgLight?: boolean }) {
  return (
    <section id={id} className={`py-8 ${bgLight ? 'bg-gray-50 -mx-4 px-4 rounded-lg' : ''}`}>
      <h2 className="text-2xl font-bold text-violet-600 mb-6">{title}</h2>
      <div className="text-gray-700 space-y-4">
        {children}
      </div>
    </section>
  )
}

// Tips Box Component
function TipsBox({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-violet-50 border-l-4 border-violet-400 p-4 my-6 rounded-r-lg">
      <div className="font-semibold text-violet-800 mb-2">{title}</div>
      <div className="text-violet-700">{children}</div>
    </div>
  )
}

// Accordion Component
function Accordion({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className={`text-violet-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50 text-gray-700 border-t border-gray-200">
          {answer}
        </div>
      )}
    </div>
  )
}

// Step List Component
function StepList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 ml-6">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <span className="text-violet-400">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="text-sm text-gray-400">Operon User Manual</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {[
                  { id: 'welcome', label: '1. Welcome to Operon' },
                  { id: 'getting-started', label: '2. Getting Started' },
                  { id: 'hiring', label: '3. Hiring Your First AI Employee' },
                  { id: 'sales-assistant', label: '4. The Sales Assistant (Alex)' },
                  { id: 'support-agent', label: '5. The Support Agent (Sam)' },
                  { id: 'admin-assistant', label: '6. The Admin Assistant (Jordan)' },
                  { id: 'billing', label: '7. Billing & Plans' },
                  { id: 'admin-dashboard', label: '8. Admin Dashboard' },
                  { id: 'tips', label: '9. Tips & Best Practices' },
                  { id: 'faq', label: '10. FAQ' },
                  { id: 'contact', label: '11. Contact & Support' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-gray-600 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-lg transition text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Section 1: Welcome */}
            <Section id="welcome" title="1. Welcome to Operon 🎉">
              <p className="text-lg">
                Operon (nicknamed "Oppy") is a friendly AI workforce platform designed especially for small businesses. 
                Think of it as hiring digital employees who work 24/7, never take breaks, and help you grow your business — 
                without the overhead costs of traditional hiring!
              </p>
              <p>
                <strong>In plain English:</strong> Operon helps you automate your sales, support, and admin tasks using smart AI employees.
              </p>
              
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-semibold">Sales Follow-ups</div>
                  <div className="text-sm text-gray-600">Never miss a lead again</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-semibold">Customer Support</div>
                  <div className="text-sm text-gray-600">Handle common questions 24/7</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-semibold">Admin Work</div>
                  <div className="text-sm text-gray-600">Manage routine tasks</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Meet Your 3 AI Employees</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">1.</span>
                  <div>
                    <strong>Alex — The Sales Assistant ⭐</strong>
                    <p className="text-gray-600">Perfect for following up with leads, writing personalized emails in your chosen tone.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">2.</span>
                  <div>
                    <strong>Sam — The Support Agent 🛠️</strong>
                    <p className="text-gray-600">Handles customer support inquiries, responds to common questions quickly.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">3.</span>
                  <div>
                    <strong>Jordan — The Admin Assistant 📋</strong>
                    <p className="text-gray-600">Manages routine administrative tasks and keeps operations running smoothly.</p>
                  </div>
                </li>
              </ul>
            </Section>

            {/* Section 2: Getting Started */}
            <Section id="getting-started" title="2. Getting Started (Step by Step) 🚀" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step 1: Sign Up for Operon</h3>
              <StepList items={[
                "Go to myoperon.io and click 'Sign Up' or 'Get Started'",
                "Enter your email address and create a secure password",
                "Click 'Create Account'",
                "Check your email for a confirmation link and click it to verify",
              ]} />
              <TipsBox title="Pro Tip">
                Use a business email address for the best experience!
              </TipsBox>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 2: Log In to Your Account</h3>
              <StepList items={[
                "Go to myoperon.io and click 'Log In'",
                "Enter your email address and password",
                "Click 'Log In'",
                "Welcome to your Operon dashboard!",
              ]} />

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 3: Tour of the Dashboard</h3>
              <p>When you first log in, you'll see your main dashboard with:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>🏠 Home Dashboard</strong> — Your AI employees at a glance</li>
                <li><strong>👔 AI Employees Panel</strong> — See your hired AI employees</li>
                <li><strong>📊 Activity Overview</strong> — Track what your AI employees are doing</li>
                <li><strong>⚙️ Settings</strong> — Account settings and billing</li>
                <li><strong>🛡️ Admin Dashboard</strong> — Advanced controls (if you have access)</li>
              </ul>
            </Section>

            {/* Section 3: Hiring */}
            <Section id="hiring" title="3. Hiring Your First AI Employee 👔">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step 1: Navigate to the Hiring Section</h3>
              <p>From your dashboard, click "Add Employee" or "Hire AI Employee" to get started.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 2: Choose Your AI Employee</h3>
              <p>Three options available:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Sales Assistant (Alex)</strong> — Best for sales teams, business owners who need lead follow-up</li>
                <li><strong>Support Agent (Sam)</strong> — Best for customer service teams, e-commerce businesses</li>
                <li><strong>Admin Assistant (Jordan)</strong> — Best for business owners, office managers</li>
              </ul>
              <TipsBox title="Recommendation">
                For your first employee, we recommend Alex the Sales Assistant — it's the most popular and easiest to get started with!
              </TipsBox>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 3: Configure Your Employee</h3>
              <StepList items={[
                "Choose a name (keep default or create custom)",
                "Select a tone: Professional, Friendly, Casual, Enthusiastic, or Authoritative",
                "Enter your business name",
                "Set your time zone"
              ]} />

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 4: Connect Your Gmail (for Sales Assistant)</h3>
              <StepList items={[
                "Click 'Connect Gmail'",
                "Sign in to the Gmail account you want to use",
                "Click 'Allow' to give Operon permission",
                "You're connected!",
              ]} />

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Step 5: Confirm and Launch</h3>
              <StepList items={[
                "Review your employee's settings",
                "Click 'Hire Employee' or 'Launch'",
                "Your AI employee is now ready to work!",
              ]} />
            </Section>

            {/* Section 4: Sales Assistant */}
            <Section id="sales-assistant" title="4. The Sales Assistant (Alex) 💼" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What Does Alex Do?</h3>
              <p>Alex is your 24/7 sales follow-up machine! Here's what makes Alex special:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Automated Follow-ups</strong> — Sends follow-up emails to leads automatically</li>
                <li><strong>Personalized Writing</strong> — Uses OpenAI to write emails that sound natural and human</li>
                <li><strong>Sales Pipeline Management</strong> — Helps you stay on top of your sales process</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How to Connect Gmail</h3>
              <StepList items={[
                "Navigate to Alex's employee settings from your dashboard",
                "Look for the 'Gmail Connection' section",
                "Click 'Connect Gmail' or 'Add Gmail Account'",
                "Sign in with the Gmail account you want to use",
                "Review permissions and click 'Allow'",
                "Verify the connection with a green checkmark",
              ]} />

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How to Send a Follow-Up Email</h3>
              <StepList items={[
                "Click on Alex's dashboard or 'New Follow-up' button",
                "Fill in lead details: name, email, subject line, previous interaction, what you want to say",
                "Choose your tone (Professional, Friendly, Casual, Enthusiastic, or Authoritative)",
                "Add context in the context box with product details, timeline, and goals",
                "Click 'Generate Email' and review the result",
                "Send immediately or schedule for later",
              ]} />

              <TipsBox title="Context Box Tips">
                Include product/service details, relationship notes, timeline/urgency, and follow-up goals. The more specific you are, the better the email!
              </TipsBox>
            </Section>

            {/* Section 5: Support Agent */}
            <Section id="support-agent" title="5. The Support Agent (Sam) 🛠️">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What Does Sam Do?</h3>
              <p>Sam is your customer support superhero! Here's what Sam can handle:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Automated Responses</strong> — Answer common customer questions instantly</li>
                <li><strong>Ticket Management</strong> — Organize and prioritize support requests</li>
                <li><strong>Follow-up Sequences</strong> — Ensure customers don't feel forgotten</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Currently Simulated Features</h3>
              <p>Sam's features are currently in simulation mode. This means Sam provides helpful responses and learns from interactions, but you'll need to manually approve responses before they're sent.</p>
              <TipsBox title="How Simulation Works">
                Sam receives a customer inquiry, drafts a response, you review and approve, then Sam sends the approved response. This gives you full control while Sam learns your business's style.
              </TipsBox>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Coming Soon Features 🚀</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Full automation with approval settings</li>
                <li>Multi-channel support (email, chat, social media)</li>
                <li>Knowledge base integration</li>
                <li>Escalation management to human team members</li>
                <li>Performance analytics</li>
              </ul>
            </Section>

            {/* Section 6: Admin Assistant */}
            <Section id="admin-assistant" title="6. The Admin Assistant (Jordan) 📋" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What Does Jordan Do?</h3>
              <p>Jordan is your organized, reliable admin helper! Here's what Jordan can handle:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Email Organization</strong> — Sort and categorize incoming emails</li>
                <li><strong>Calendar Management</strong> — Handle scheduling and appointments</li>
                <li><strong>Document Processing</strong> — Organize and process business documents</li>
                <li><strong>Invoice Management</strong> — Track and manage billing</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Currently Simulated Features</h3>
              <p>Like Sam, Jordan is currently in simulation mode. Jordan analyzes incoming admin tasks, proposes actions, you review and approve, then Jordan executes.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Coming Soon Features 🚀</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Full automation of routine admin tasks</li>
                <li>Workflow automation for custom business processes</li>
                <li>Integration with accounting software and CRM systems</li>
                <li>Automatic business report generation</li>
                <li>Pre-built templates for common business documents</li>
              </ul>
            </Section>

            {/* Section 7: Billing */}
            <Section id="billing" title="7. Billing & Plans 💳">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Starter Plan — $29/month</h3>
              <p>Perfect for solopreneurs and small businesses just getting started!</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>1 AI Employee (Alex, Sam, or Jordan)</li>
                <li>Up to 100 emails/tasks per month</li>
                <li>Basic Gmail integration and email templates</li>
                <li>Activity dashboard and email support</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Growth Plan — $99/month</h3>
              <p>Great for growing businesses that need more capacity!</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>2 AI Employees</li>
                <li>Up to 500 emails/tasks per month</li>
                <li>Multiple Gmail accounts and advanced templates</li>
                <li>Priority email support, basic analytics, custom tones</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Pro Plan — $299/month</h3>
              <p>For businesses ready to scale and maximize automation!</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>3 AI Employees (all available)</li>
                <li>Unlimited emails/tasks and Gmail accounts</li>
                <li>Custom templates, priority support, advanced analytics</li>
                <li>Custom AI training, white-label options, dedicated account manager</li>
              </ul>

              <TipsBox title="Promo Codes">
                Use <strong>OPERON20</strong> for 20% off first 3 months, <strong>WELCOME50</strong> for $50 off first month, or <strong>AISTAFF</strong> for 15% off annual billing!
              </TipsBox>
            </Section>

            {/* Section 8: Admin Dashboard */}
            <Section id="admin-dashboard" title="8. Admin Dashboard 🛡️" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Access</h3>
              <p>Click the shield icon in the top right corner and enter PIN <strong>1234</strong> (for demo purposes).</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Overview Tab</h3>
              <p>Bird's-eye view of your entire account with key metrics like total employees, emails sent, tasks completed, and response rates.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Users Tab</h3>
              <p>Manage all users with access to your Operon account. Set permissions: Admin, Manager, or User.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Billing Tab</h3>
              <p>View current plan, next billing date, payment methods, and billing history. Update payment info and download invoices.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Promo Codes Tab</h3>
              <p>Create and manage your own promo codes for your business. Set discount amounts, expiration dates, and track usage.</p>
            </Section>

            {/* Section 9: Tips & Best Practices */}
            <Section id="tips" title="9. Tips & Best Practices 📚">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Best Tones for Different Industries</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Real Estate</strong> — Professional with Friendly touches
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>SaaS/Tech</strong> — Friendly to Casual
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Healthcare</strong> — Professional
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>E-commerce</strong> — Friendly and Enthusiastic
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Consulting/Services</strong> — Authoritative
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>B2B Sales</strong> — Professional
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How Often to Follow Up</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>First Follow-up:</strong> 2-3 days after initial contact</li>
                <li><strong>Second Follow-up:</strong> 5-7 days after the first</li>
                <li><strong>Third Follow-up:</strong> 10-14 days after the second</li>
                <li><strong>Fourth and Beyond:</strong> Monthly check-ins</li>
              </ul>
              <TipsBox title="Pro Tip">
                Alex can automatically schedule this sequence for you!
              </TipsBox>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Getting the Best AI Emails</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Be specific in context — the more details, the better the email</li>
                <li>Always review before sending</li>
                <li>Give feedback when you edit emails — Alex learns over time</li>
                <li>Use templates for common situations</li>
                <li>A/B test different tones with similar leads</li>
                <li>Keep it conversational — AI works best when it sounds human</li>
              </ul>
            </Section>

            {/* Section 10: FAQ */}
            <Section id="faq" title="10. FAQ ❓" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
              {faqs.map((faq, i) => (
                <Accordion key={i} question={faq.question} answer={faq.answer} />
              ))}
            </Section>

            {/* Section 11: Contact */}
            <Section id="contact" title="11. Contact & Support 📞">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Reach Us</h3>
              <ul className="list-none ml-0 space-y-2">
                <li><strong>📧 Email Support:</strong> support@myoperon.io (Response time: Within 24 hours)</li>
                <li><strong>🌐 Website:</strong> myoperon.io</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Support Hours</h3>
              <p>Monday - Friday: 9 AM - 6 PM CST<br />
              Saturday: 10 AM - 2 PM CST<br />
              Sunday: Closed</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Social Media</h3>
              <p>Follow Operon for updates: <strong>Twitter:</strong> @myoperon | <strong>LinkedIn:</strong> Operon AI | <strong>Facebook:</strong> Operon AI</p>

              <TipsBox title="Getting Help">
                For technical issues, check our help center first, then email support with a description, screenshots, and steps you've tried.
              </TipsBox>
            </Section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 Operon. All rights reserved. |{" "}
            <Link to="/" className="text-violet-600 hover:text-violet-700">Home</Link> |{" "}
            <Link to="/login" className="text-violet-600 hover:text-violet-700">Log In</Link> |{" "}
            <Link to="/signup" className="text-violet-600 hover:text-violet-700">Sign Up</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
