export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect('/login?error=no_code');
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.VITE_APP_URL}/auth/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();
    
    // Get user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const userInfo = await userRes.json();

    // Redirect to frontend with token info
    const params = new URLSearchParams({
      access_token: tokens.access_token,
      email: userInfo.email,
      name: userInfo.name,
    });
    
    res.redirect(`/auth/callback?${params.toString()}`);
  } catch (error) {
    res.redirect('/login?error=auth_failed');
  }
}