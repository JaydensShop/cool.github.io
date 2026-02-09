export async function POST(request) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('cf-connecting-ip') || 
               request.ip;
    
    const payload = await request.json();
    const userAgent = payload.userAgent;
    
    const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                   userAgent.includes('Firefox') ? 'Firefox' : 'Other';
    
    const fakeData = {
        ip: ip,
        provider: 'Hidden ISP',
        asn: 'AS' + Math.floor(Math.random()*99999),
        country: 'US',
        region: 'CA',
        city: 'San Francisco',
        coords: [37.7749, -122.4194],
        timezone: 'America/Los_Angeles',
        mobile: userAgent.includes('Mobile'),
        vpn: false,
        bot: userAgent.includes('bot') || userAgent.includes('crawler'),
        os: navigator.platform,
        browser: browser
    };
    
    try {
        const response = await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: JSON.stringify(fakeData)})
        });
    } catch(e) {}
    
    return new Response(JSON.stringify({status: 'success'}));
}

export const config = {
    runtime: 'edge'
};
