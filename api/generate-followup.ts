export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { leadName, leadEmail, businessName, tone, previousContext } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a ${tone || 'professional'} sales assistant for ${businessName || 'a business'}. Write short, personalized follow-up emails that feel human and genuine. Keep emails under 150 words. Never be pushy. Always include a clear call to action.`
        },
        {
          role: 'user',
          content: `Write a follow-up email to ${leadName} (${leadEmail}). ${previousContext ? `Context: ${previousContext}` : 'This is a first follow-up.'} Return JSON with: { subject: string, body: string }`
        }
      ],
      response_format: { type: 'json_object' }
    }),
  });

  const data = await response.json();
  const email = JSON.parse(data.choices[0].message.content);
  res.status(200).json(email);
}
