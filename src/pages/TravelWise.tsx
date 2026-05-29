import React from 'react';

const TravelWise = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1A7B9E 0%, #25B3B8 100%)', padding: '60px 20px 40px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
            Unlock Wholesale Travel Prices
          </h1>
          <p style={{ fontSize: 18, opacity: 0.92, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            Join TravelWise Vacation Club and save up to 70% on luxury hotels, resorts, cruises, and vacation packages worldwide.
          </p>
        </div>
      </section>

      {/* BENFITS */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, color: '#0D3B49', marginBottom: 40 }}>Why Join TravelWise?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: '💰', title: 'Wholesale Travel Prices', desc: 'Access exclusive rates typically only available to travel agencies and wholesalers.' },
              { icon: '🏨', title: 'Luxury Accommodations', desc: 'Stay at 4-5 star hotels and resorts worldwide for the price of budget accommodations.' },
              { icon: '🌍', title: 'Global Destinations', desc: 'Choose from over 1.2 million properties and vacation options in 190+ countries.' },
              { icon: '✨', title: 'Exclusive Experiences', desc: 'Enjoy members-only offers on cruises, tours, and curated vacation packages.' },
              { icon: '⏰', title: 'Last-Minute Deals', desc: 'Take advantage of deeply discounted last-minute travel opportunities.' },
              { icon: '💎', title: 'Concierge Service', desc: 'Get personalized travel recommendations and booking assistance from our experts.' },
            ].map(b => (
              <div key={b.title} style={{ background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0D3B49', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, color: '#0D3B49', marginBottom: 40 }}>How It Works</h2>
          {[
            { num: '01', title: 'Attend an Online Presentation', desc: 'Join our 30-minute presentation to learn how our travel club works and see actual savings examples.' },
            { num: '02', title: 'Become a Member', desc: 'Choose the membership level that fits your travel needs and join thousands of satisfied travelers.' },
            { num: '03', title: 'Access Wholesale Prices', desc: 'Log in to our exclusive member portal to browse and book discounted travel worldwide.' },
            { num: '04', title: 'Travel More, Pay Less', desc: 'Enjoy luxury vacations at wholesale prices and save thousands on your travel expenses every year.' },
          ].map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: 20, marginBottom: i < 3 ? 28 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1A7B9E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0D3B49', marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, color: '#0D3B49', marginBottom: 40 }}>What Our Members Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { quote: "We saved over $4,000 on our family vacation to Hawaii. The resort was stunning and cost less than half of what we would have paid elsewhere.", author: 'Jennifer & David R.', loc: 'Dallas, TX' },
              { quote: "I stayed at a 5-star hotel in Paris for the price of a 3-star. I'm never booking travel any other way!", author: 'Michael T.', loc: 'Chicago, IL' },
              { quote: "We've saved thousands with our membership. The wholesale rates are incredible — we take twice as many vacations now.", author: 'Sarah & Tom B.', loc: 'San Diego, CA' },
              { quote: "An all-inclusive resort in Cancun at 60% less than what my friends paid. TravelWise pays for itself!", author: 'Rebecca H.', loc: 'Boston, MA' },
            ].map(t => (
              <div key={t.author} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#f59e0b', fontSize: 14, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 14, fontStyle: 'italic', color: '#6b7280', flex: 1, lineHeight: 1.6, marginBottom: 16 }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#0D3B49' }}>{t.author}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>{t.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section id="book-presentation" style={{ background: 'linear-gradient(135deg, #1A7B9E, #25B3B8)', padding: '60px 20px', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, marginBottom: 20 }}>Ready to unlock exclusive savings?</h2>
          <p style={{ fontSize: 18, marginBottom: 30, opacity: 0.9 }}>
            Book your free online introduction now and discover how our members save on all their travel.
          </p>
          <a href="https://koalendar.com/e/TravelWise-travel-club-online-introduction" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#fff', color: '#1A7B9E', padding: '16px 32px', borderRadius: 8, fontSize: 18, fontWeight: 700, textDecoration: 'none' }}>
            Book Presentation
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, color: '#0D3B49', marginBottom: 32 }}>Frequently Asked Questions</h2>
          {[
            { q: 'How does TravelWise offer such significant discounts?', a: 'TravelWise partners with major hotel chains, resorts, and travel providers worldwide to access wholesale rates normally reserved for travel agencies. By operating as a membership club, we pass these exclusive rates directly to our members without markup.' },
            { q: 'How much does membership cost?', a: "We offer several membership tiers to fit different travel needs and budgets. During our presentation, we'll explain all options in detail, including current promotional rates and special financing options." },
            { q: 'How much can I expect to save?', a: 'Our members typically save 25-70% off retail prices on hotels and resorts, with average annual savings of $3,700. Individual savings depend on travel frequency, destinations, and accommodation choices.' },
            { q: 'Are there any booking restrictions or blackout dates?', a: 'No! Unlike many travel programs or points systems, TravelWise members can book any available accommodation without blackout dates or travel restrictions.' },
            { q: 'How long does the online presentation take?', a: 'About 30 minutes, with additional time for questions. It\'s a no-pressure environment where you\'ll learn about our program and see actual savings examples.' },
            { q: 'Is there any obligation when I book a presentation?', a: "Absolutely not. Our presentations are informational only — there's no obligation to join. We believe our savings speak for themselves." },
          ].map((faq, i) => (
            <details key={i} style={{ background: '#fff', borderRadius: 8, marginBottom: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 15, color: '#0D3B49', cursor: 'pointer', userSelect: 'none' }}>{faq.q}</summary>
              <p style={{ padding: '0 20px 16px', fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0D3B49', color: '#fff', padding: '40px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>TravelWise Vacation Club</h3>
          <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 16 }}>Access wholesale travel prices and save up to 70% on luxury vacations worldwide.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13, color: '#9ca3af', flexWrap: 'wrap' }}>
            <span>📞 52-984-449-7908</span>
            <span>✉️ info@travelwisevacationclub.com</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 24, paddingTop: 16, fontSize: 12, color: '#6b7280' }}>
            © {new Date().getFullYear()} TravelWise Vacation Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelWise;
