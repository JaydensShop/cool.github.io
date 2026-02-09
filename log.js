export async function POST(request) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('cf-connecting-ip') || 
               request.ip;
    
    const fakeData = {
        ip: ip,
        provider: 'Hidden ISP',
        asn: 'AS' + Math.floor(Math.random()*99999),
        country: 'US',
        region: 'CA',
        city: 'San Francisco',
        coords: [37.7749, -122.4194],
        timezone: 'America/Los_Angeles',
        mobile: true,
        vpn: false,
        bot: false,
        os: navigator.platform,
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'
    };
    
    try {
        await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: JSON.stringify(fakeData)})
        });
    } catch(e) {}
    
    return new Response(JSON.stringify({status: 'success'}));
}
