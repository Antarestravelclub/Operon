import { useState, useEffect } from 'react';

export default function SalesAssistant() {
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [previousContext, setPreviousContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [sentEmails, setSentEmails] = useState<Array<{ to: string; subject: string; timestamp: string }>>([]);

  useEffect(() => {
    const token = localStorage.getItem('google_access_token');
    setIsGmailConnected(!!token);
    
    const emails = localStorage.getItem('operon_sent_emails');
    if (emails) {
      setSentEmails(JSON.parse(emails));
    }
  }, []);

  const connectGmail = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_APP_URL + '/auth/callback';
    const scope = 'https://www.googleapis.com/auth/gmail.send email profile';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  const generateFollowUp = async () => {
    try {
      const response = await fetch('/api/generate-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadName,
          leadEmail,
          businessName: 'Operon',
          tone,
          previousContext
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate email');
      
      const email = await response.json();
      setGeneratedEmail(email);
      setSendStatus('');
    } catch (error) {
      setSendStatus('Error generating email');
      console.error(error);
    }
  };

  const sendEmail = async () => {
    if (!generatedEmail) return;
    
    setIsSending(true);
    setSendStatus('');
    
    try {
      const accessToken = localStorage.getItem('google_access_token');
      const response = await fetch('/api/gmail-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: leadEmail,
          subject: generatedEmail.subject,
          body: generatedEmail.body,
          accessToken
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSendStatus(`✅ Follow-up sent to ${leadName}!`);
        
        // Add to activity feed
        const newEmail = {
          to: leadEmail,
          subject: generatedEmail.subject,
          timestamp: new Date().toISOString()
        };
        const updated = [newEmail, ...sentEmails].slice(0, 5);
        setSentEmails(updated);
        localStorage.setItem('operon_sent_emails', JSON.stringify(updated));
        
        // Clear form
        setLeadName('');
        setLeadEmail('');
        setPreviousContext('');
        setGeneratedEmail(null);
      } else {
        setSendStatus(result.error || 'Failed to send email');
      }
    } catch (error) {
      setSendStatus('Error sending email');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales Assistant — Alex</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      </div>

      {!isGmailConnected ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Connect your Gmail to start automating follow-ups</p>
          <button
            onClick={connectGmail}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
          >
            Connect Gmail →
          </button>
        </div>
      ) : (
        <div>
          <div className="grid gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Name</label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter lead name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Email</label>
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter lead email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Context (optional)</label>
              <textarea
                value={previousContext}
                onChange={(e) => setPreviousContext(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="What did you discuss?"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Direct">Direct</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateFollowUp}
            disabled={!leadName || !leadEmail}
            className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Generate & Send Follow-Up →
          </button>

          {generatedEmail && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Preview</h3>
              <p className="text-sm font-medium text-gray-900 mb-2">{generatedEmail.subject}</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{generatedEmail.body}</p>
              <button
                onClick={sendEmail}
                disabled={isSending}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSending ? 'Sending...' : 'Send Now'}
              </button>
            </div>
          )}

          {sendStatus && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
              {sendStatus}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
            {sentEmails.length === 0 ? (
              <p className="text-gray-500 text-sm">No follow-ups sent yet</p>
            ) : (
              <ul className="space-y-2">
                {sentEmails.map((email, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate">{email.subject}</span>
                    <span className="text-gray-500">{new Date(email.timestamp).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
