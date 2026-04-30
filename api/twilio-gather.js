export default function handler(req, res) {
  const AUDIO = 'https://myoperon.io/audio';
  const VOICE = 'Polly.Joanna-Neural';
  
  const digit = req.body?.Digits;
  const speech = (req.body?.SpeechResult || '').toLowerCase();

  const crisisKeywords = ['suicide', 'kill myself', 'end it', 'hurt myself', 'self harm', 'want to die'];
  const isCrisis = crisisKeywords.some(k => speech.includes(k));

  if (isCrisis) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/crisis.mp3</Play>
  <Dial action="https://myoperon.io/api/twilio-voice" method="POST">
    <Number>988</Number>
  </Dial>
</Response>`;
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }

  if (speech.includes('logbook') || speech.includes('my-logbook') || speech.includes('boat') || speech.includes('motorcycle') || speech.includes('rv') || speech.includes('engine hours')) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/my-logbook.mp3</Play>
  <Gather input="speech dtmf" action="https://myoperon.io/api/twilio-gather" method="POST" timeout="8" speechTimeout="auto">
    <Say voice="${VOICE}">Is there anything else I can help you with?</Say>
  </Gather>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }

  if (speech.includes('travel') || speech.includes('antares') || speech.includes('vacation') || speech.includes('cruise') || speech.includes('yacht') || speech.includes('hotel') || speech.includes('flight')) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/antares-travel.mp3</Play>
  <Gather input="speech dtmf" action="https://myoperaw.io/api/twilio-gather" method="POST" timeout="8" speechTimeout="auto">
    <Say voice="${VOICE}">Is there anything else I can help you with?</Say>
  </Gather>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }

  if (digit === '1' || speech.includes('how') || speech.includes('work') || speech.includes('tell me') || speech.includes('more')) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/how-it-works.mp3</Play>
  <Gather input="speech dtmf" action="https://myoperon.io/api/twilio-gather" method="POST" timeout="8" speechTimeout="auto">
    <Say voice="${VOICE}">Is there anything else I can help you with?</Say>
  </Gather>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }

  if (digit === '2' || speech.includes('price') || speech.includes('cost') || speech.includes('plan') || speech.includes('pay') || speech.includes('how much')) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/pricing.mp3</Play>
  <Gather input="speech dtmf" action="https://myoperon.io/api/twilio-gather" method="POST" timeout="8" speechTimeout="auto">
    <Say voice="${VOICE}">Is there anything else I can help you with?</Say>
  </Gather>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}
