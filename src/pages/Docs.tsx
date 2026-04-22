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
                  { id: 'contact', label: '11. Contact & Support' },
                  { id: 'logbook-manual', label: '⚓ My Logbook User Manual' },
                  { id: 'logbook-pricing', label: '⚓ My Logbook Pricing & Revenue' },
                  { id: 'logbook-pitch', label: '⚓ My Logbook Pitch Deck' },
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
                Operon (nicknamed "Oppy") is a friendly AI salesforce platform designed especially for small businesses. 
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

            {/* My Logbook User Manual */}
            <Section id="logbook-manual" title="⚓ My Logbook — User Manual">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is My Logbook?</h3>
              <p>My Logbook (my-logbook.io) is the #1 digital logbook for boats, motorcycles, and RVs. It replaces paper logbooks and scattered spreadsheets with one beautiful, smart app that tracks everything — maintenance, fuel, trips, expenses, and more.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold">Smart Maintenance</div>
                  <div className="text-sm text-gray-600">5-status system: Upcoming, Due Soon, Overdue, In Progress, Completed. Never miss an oil change or impeller replacement again.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">⛽</div>
                  <div className="font-semibold">Fuel Tracking</div>
                  <div className="text-sm text-gray-600">Log every fill-up. Track cost per gallon, total spend, and fuel efficiency over time.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="font-semibold">Trip Logging</div>
                  <div className="text-sm text-gray-600">Log passages with start/end points, distance, duration, and notes. Build your vessel's story.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📍</div>
                  <div className="font-semibold">Live Location</div>
                  <div className="text-sm text-gray-600">Track your vehicle's current position on a live map. Share with family or crew.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📖</div>
                  <div className="font-semibold">Guest Book & Blog</div>
                  <div className="text-sm text-gray-600">Let guests sign your logbook digitally. Write adventure blog entries with photos.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">Analytics Dashboard</div>
                  <div className="text-sm text-gray-600">Admin Mode unlocks full analytics: fuel trends, maintenance spend, trip stats, vehicle comparisons, and month-over-month insights.</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Dashboard Layouts</h3>
              <p><strong>Classic View</strong> — Traditional dashboard with sidebar navigation. Clean and functional.</p>
              <p><strong>Editorial View</strong> — Magazine-style layout inspired by "Grand Adventure Log." Immersive and visual.</p>
              <p>Switch between layouts anytime. Your preference is saved automatically.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Admin Mode</h3>
              <p>Toggle Admin Mode from the shield icon in the top nav. This unlocks:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Add, edit, and delete entries across all sections</li>
                <li>Analytics Dashboard with charts and KPIs</li>
                <li>Full CRUD operations in both Classic and Editorial views</li>
                <li>Data export and advanced settings</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Multi-Asset Support</h3>
              <p>My Logbook supports boats, motorcycles, and RVs. Switch between vehicles using the vehicle switcher in the top nav. Fleet Plan users can manage up to 3 vehicles in one account.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">PWA & Offline</h3>
              <p>My Logbook is a Progressive Web App. Install it on your phone's home screen for full-screen, app-like experience. Works offline — your entries sync when you're back online.</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Public & Private Modes</h3>
              <p>Toggle your logbook between public (shareable link) and private. Perfect for showing off your vessel's adventures while keeping financial data hidden.</p>

              <TipsBox title="Quick Start">
                Sign up free → Add your vehicle → Start logging. That's it. No credit card, no setup wizard, no learning curve.
              </TipsBox>
            </Section>

            {/* My Logbook Pricing & Cost Breakdown */}
            <Section id="logbook-pricing" title="⚓ My Logbook — Pricing & Revenue Breakdown" bgLight>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Plan Structure</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Plan</th>
                      <th className="px-4 py-3 text-left font-semibold">Setup Fee</th>
                      <th className="px-4 py-3 text-left font-semibold">Monthly</th>
                      <th className="px-4 py-3 text-left font-semibold">Vehicles</th>
                      <th className="px-4 py-3 text-left font-semibold">Storage</th>
                      <th className="px-4 py-3 text-left font-semibold">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">Free</td>
                      <td className="px-4 py-3">$0</td>
                      <td className="px-4 py-3">$0</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">500 MB</td>
                      <td className="px-4 py-3">Basic maintenance + log entries</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-sky-50">
                      <td className="px-4 py-3 font-medium">Captain's ⭐</td>
                      <td className="px-4 py-3">$24.99</td>
                      <td className="px-4 py-3">$7.99</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">5 GB</td>
                      <td className="px-4 py-3">Smart reminders, live location, guest book, blog</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">Fleet</td>
                      <td className="px-4 py-3">$49.99</td>
                      <td className="px-4 py-3">$9.99</td>
                      <td className="px-4 py-3">3</td>
                      <td className="px-4 py-3">15 GB</td>
                      <td className="px-4 py-3">All Captain's + priority support, advanced export</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Premium Add-ons</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-sky-600">🌊 Weather Conditions — $3.99/mo</div>
                  <div className="text-sm text-gray-600 mt-2">Live marine weather auto-attached to every trip log. Wind, waves, tides, currents, sea temp. Powered by Open-Meteo (free API). Premium AI insights on weather patterns.</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-sky-600">⚓ Marina Finder — $2.99/mo</div>
                  <div className="text-sm text-gray-600 mt-2">Searchable marina map with details: fuel, slips, amenities, rates, VHF channels. Log docking, track fuel prices, leave reviews. 500+ US/Caribbean marinas at launch.</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Revenue Projections (Per 1,000 Users)</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Revenue Stream</th>
                      <th className="px-4 py-3 text-left font-semibold">Conversion</th>
                      <th className="px-4 py-3 text-left font-semibold">Users</th>
                      <th className="px-4 py-3 text-left font-semibold">Setup Rev</th>
                      <th className="px-4 py-3 text-left font-semibold">Monthly Rev</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 bg-sky-50">
                      <td className="px-4 py-3 font-medium">Captain's Plan</td>
                      <td className="px-4 py-3">8%</td>
                      <td className="px-4 py-3">80</td>
                      <td className="px-4 py-3">$2,000</td>
                      <td className="px-4 py-3">$639/mo</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">Fleet Plan</td>
                      <td className="px-4 py-3">3%</td>
                      <td className="px-4 py-3">30</td>
                      <td className="px-4 py-3">$1,500</td>
                      <td className="px-4 py-3">$300/mo</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">Weather Add-on</td>
                      <td className="px-4 py-3">15% of paid</td>
                      <td className="px-4 py-3">17</td>
                      <td className="px-4 py-3">—</td>
                      <td className="px-4 py-3">$68/mo</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">Marina Finder</td>
                      <td className="px-4 py-3">20% of paid</td>
                      <td className="px-4 py-3">22</td>
                      <td className="px-4 py-3">—</td>
                      <td className="px-4 py-3">$66/mo</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-green-50 font-bold">
                      <td className="px-4 py-3">TOTAL (per 1K users)</td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">149 paid</td>
                      <td className="px-4 py-3">$3,500</td>
                      <td className="px-4 py-3">$1,073/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Cost Structure (Monthly)</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Expense</th>
                      <th className="px-4 py-3 text-left font-semibold">Cost</th>
                      <th className="px-4 py-3 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Supabase (DB + Auth)</td>
                      <td className="px-4 py-3">$25–75</td>
                      <td className="px-4 py-3">Free tier up to 50K MAU</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Vercel (Hosting)</td>
                      <td className="px-4 py-3">$0</td>
                      <td className="px-4 py-3">Free tier covers most traffic</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Lovable (Dev Platform)</td>
                      <td className="px-4 py-3">$20</td>
                      <td className="px-4 py-3">Per seat for development</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Stripe Fees</td>
                      <td className="px-4 py-3">2.9% + 30¢</td>
                      <td className="px-4 py-3">Per transaction</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Domain (GoDaddy)</td>
                      <td className="px-4 py-3">$12/yr</td>
                      <td className="px-4 py-3">my-logbook.io</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">Open-Meteo (Weather API)</td>
                      <td className="px-4 py-3">$0</td>
                      <td className="px-4 py-3">Free, no API key needed</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-green-50 font-bold">
                      <td className="px-4 py-3">Total Monthly OpEx</td>
                      <td className="px-4 py-3">~$45–95</td>
                      <td className="px-4 py-3">Scales with user growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <TipsBox title="Profitability">
                At just 1,000 users with 15% paid conversion, My Logbook generates ~$1,073/mo against ~$95/mo costs = 91% margin. Break-even at ~90 paid users.
              </TipsBox>
            </Section>

            {/* My Logbook Pitch Deck */}
            <Section id="logbook-pitch" title="⚓ My Logbook — Pitch Deck">
              <div className="space-y-8">
                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 1: The Problem</h3>
                  <p className="text-lg text-gray-700">"12 million boat owners in the US alone. Most are tracking maintenance on paper, spreadsheets, or not at all."</p>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• Missed maintenance = costly repairs (average $2,500+ per incident)</li>
                    <li>• Unknown engine hours = reduced resale value</li>
                    <li>• No fuel tracking = money wasted on inefficiency</li>
                    <li>• Zero documentation = insurance claims nightmare</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 2: The Solution</h3>
                  <p className="text-lg text-gray-700">My Logbook — the digital logbook that replaces paper, spreadsheets, and guesswork.</p>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• Track maintenance, fuel, trips, expenses — all in one app</li>
                    <li>• Smart reminders so you never miss a service interval</li>
                    <li>• Works for boats, motorcycles, and RVs</li>
                    <li>• Install as a phone app — works offline on the water</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 3: Market Size</h3>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• <strong>12M</strong> registered boats in the US (NMMA 2025)</li>
                    <li>• <strong>13M</strong> motorcycles registered in the US</li>
                    <li>• <strong>11M</strong> RV-owning households in the US</li>
                    <li>• <strong>$36B</strong> combined vehicle aftermarket spend</li>
                    <li>• <strong>TAM:</strong> 36M US vehicle owners, $5.4B addressable at $15/mo avg</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 4: Product</h3>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• ⚓ Smart Maintenance (5-status system with reminders)</li>
                    <li>• ⛽ Fuel Tracking (cost per gallon, efficiency trends)</li>
                    <li>• 🗺️ Trip Logging (passages, distance, notes, photos)</li>
                    <li>• 📍 Live Location (real-time GPS tracking)</li>
                    <li>• 📖 Guest Book & Adventure Blog</li>
                    <li>• 📊 Analytics Dashboard (admin-only insights)</li>
                    <li>• 🌊 Weather Conditions Add-on ($3.99/mo)</li>
                    <li>• ⚓ Marina Finder Add-on ($2.99/mo)</li>
                    <li>• Two dashboard layouts: Classic + Editorial</li>
                    <li>• PWA — works offline on any device</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 5: Business Model</h3>
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Stream</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Model</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-4 py-2">Free Plan</td><td className="px-4 py-2">$0</td><td className="px-4 py-2">Freemium acquisition</td></tr>
                        <tr className="border-t"><td className="px-4 py-2">Captain's Plan</td><td className="px-4 py-2">$24.99 + $7.99/mo</td><td className="px-4 py-2">Setup + SaaS</td></tr>
                        <tr className="border-t"><td className="px-4 py-2">Fleet Plan</td><td className="px-4 py-2">$49.99 + $9.99/mo</td><td className="px-4 py-2">Setup + SaaS</td></tr>
                        <tr className="border-t"><td className="px-4 py-2">Weather Add-on</td><td className="px-4 py-2">$3.99/mo</td><td className="px-4 py-2">Recurring SaaS</td></tr>
                        <tr className="border-t"><td className="px-4 py-2">Marina Finder</td><td className="px-4 py-2">$2.99/mo</td><td className="px-4 py-2">Recurring SaaS</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-gray-700"><strong>Avg ARPU:</strong> ~$12/mo per paid user | <strong>LTV:</strong> ~$430 (36-mo avg retention) | <strong>Gross Margin:</strong> 91%</p>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 6: Go-to-Market</h3>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li><strong>Phase 1 (Test — Month 1):</strong> BoatUS email blast + Passagemaker print ad. QR code in every ad → direct signup.</li>
                    <li><strong>Phase 2 (Optimize — Month 2):</strong> Retarget visitors. A/B test headlines. Improve conversion funnel.</li>
                    <li><strong>Phase 3 (Scale — Month 3):</strong> Add Cruising World, SAIL Magazine. Double down on best-performing channel.</li>
                    <li><strong>Channels:</strong> Boating magazines, marina partnerships, boat shows, Google/Facebook retargeting, QR codes on dock signage</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 7: Competitive Advantage</h3>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• <strong>Multi-vehicle:</strong> Boats + motorcycles + RVs (competitors are boat-only)</li>
                    <li>• <strong>Editorial experience:</strong> Magazine-style dashboard — no one else has this</li>
                    <li>• <strong>Add-on ecosystem:</strong> Weather + Marina Finder = higher ARPU than any competitor</li>
                    <li>• <strong>Zero learning curve:</strong> Sign up and start logging in 60 seconds</li>
                    <li>• <strong>PWA offline:</strong> Works on the water with no signal</li>
                    <li>• <strong>Part of Operon ecosystem:</strong> Shared infrastructure, cross-promotion with Solace Wellness & Operon</li>
                  </ul>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SLIDE 8: The Ask</h3>
                  <p className="text-lg text-gray-700">My Logbook is live, generating revenue, and ready to scale.</p>
                  <ul className="mt-3 space-y-1 text-gray-600">
                    <li>• Product: Built and shipping</li>
                    <li>• Revenue: Stripe live, paying customers onboarded</li>
                    <li>• Add-ons: Weather + Marina Finder in development</li>
                    <li>• Marketing: Print ads designed, magazine placements ready</li>
                    <li>• Looking for: Strategic partners, marina data providers, and growth capital</li>
                  </ul>
                </div>

                <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold">my-logbook.io</p>
                  <p className="text-sky-400 mt-1">Track it once. Save thousands.</p>
                </div>
              </div>
            </Section>

            <Section id="contact" title="11. Contact & Support 📞">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Reach Us</h3>
              <ul className="list-none ml-0 space-y-2">
                <li><strong>📧 Email Support:</strong> info@myoperon.io (Response time: Within 24 hours)</li>
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
