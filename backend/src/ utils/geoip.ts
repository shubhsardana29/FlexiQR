import geoip from 'geoip-lite';

interface GeoInfo {
  country: string;
  region: string;
  city: string;
  ll: [number, number]; // latitude, longitude
}

export function getLocationFromIP(ip: string): Partial<GeoInfo> {
  try {
    const geo = geoip.lookup(ip);
    if (geo) {
      return {
        country: geo.country || 'Unknown',
        region: geo.region || 'Unknown',
        city: geo.city || 'Unknown',
        ll: geo.ll // [latitude, longitude]
      };
    }
  } catch (error) {
    console.error(`Error looking up IP ${ip}:`, error);
  }
    // Return default values if lookup fails
  return {
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown',
    ll: [0, 0]
  };
}


//Function to get a "clean" IP address from a request object
export function getClientIP(req: any): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    // If behind a proxy, get the real client IP
    return forwardedFor.split(',')[0].trim();
  }
  return req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
}