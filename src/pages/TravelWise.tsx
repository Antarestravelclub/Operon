import { useState } from 'react';
import { Calendar } from 'lucide-react';

const timeSlots = [
  '10:00 AM', '11:00 AM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const participantOptions = [
  { value: '1', label: 'Just me' },
  { value: '2', label: 'Me and my partner' },
  { value: '3+', label: '3 or more people' },
];

const TravelWise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    participants: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (formData.name.length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email address.';
    if (formData.phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid phone number.';
    if (!formData.date) errs.date = 'Please select a date.';
    if (!formData.time) errs.time = 'Please select a time.';
    if (!formData.participants) errs.participants = 'Please select number of participants.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    console.log('Booking submitted:', formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1A7B9E, #25B3B8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 48, maxWidth: 480, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0D3B49', marginBottom: 12 }}>Presentation Booked!</h2>
          <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.6 }}>
            Your free online presentation has been scheduled. We'll send a confirmation email to <strong>{formData.email}</strong> shortly.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', date: '', time: '', participants: '' }); }}
            style={{ marginTop: 24, background: '#FF7043', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: hasError ? '2px solid #ef4444' : '1px solid #d1d5db',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  });

  const selectStyle = (hasError: boolean) => ({
    ...inputStyle(hasError),
    appearance: 'none' as const,
    background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E") no-repeat right 12px center`,
    paddingRight: 36,
  });

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

      {/* BENEFITS */}
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

      {/* BOOKING FORM */}
      <section id="book-presentation" style={{ background: 'linear-gradient(135deg, #1A7B9E, #25B3B8)', padding: '60px 20px', color: '#fff' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Book Your Free Online Presentation</h2>
            <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6 }}>
              Schedule a no-obligation presentation to learn how TravelWise can help you save thousands on vacations.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 28, color: '#1f2937' }}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="John Doe"
                style={inputStyle(!!errors.name)}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.name}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                style={inputStyle(!!errors.email)}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="(123) 456-7890"
                style={inputStyle(!!errors.phone)}
              />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.phone}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>
                <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
                Presentation Date
              </label>
              <input
                type="date"
                value={formData.date}
                min={today}
                onChange={e => handleChange('date', e.target.value)}
                style={inputStyle(!!errors.date)}
              />
              {errors.date && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.date}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Preferred Time</label>
              <select
                value={formData.time}
                onChange={e => handleChange('time', e.target.value)}
                style={selectStyle(!!errors.time)}
              >
                <option value="">Select time</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.time && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.time}</p>}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Number of Participants</label>
              <select
                value={formData.participants}
                onChange={e => handleChange('participants', e.target.value)}
                style={selectStyle(!!errors.participants)}
              >
                <option value="">Select number of people</option>
                {participantOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.participants && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{errors.participants}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                background: submitting ? '#9ca3af' : '#FF7043',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px',
                fontSize: 16,
                fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {submitting ? 'Booking...' : 'Book My Presentation'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 12 }}>
              By booking, you agree to our Privacy Policy and Terms of Service. No obligation to purchase.
            </p>
          </form>
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
