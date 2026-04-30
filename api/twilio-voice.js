module.exports = (req, res) => {
  const AUDIO = 'https://myoperon.io/audio';
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${AUDIO}/welcome.mp3</Play>
  <Gather input="speech dtmf" action="https://myoperon.io/api/twilio-gather" method="POST" timeout="8" speechTimeout="auto" numDigits="1">
    <Play>${AUDIO}/menu.mp3</Play>
  </Gather>
  <Play>${AUDIO}/goodbye.mp3</Play>
</Response>`;
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
};
