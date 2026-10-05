/**
 * Shivani Graphics (Shivani Digital Prints) - Official Credentials Matrix
 */

export const CONTACT_INFO = {
  brandName: 'Shivani Graphics',
  legalName: 'Shivani Digital Prints',
  tagline: 'High Precision Digital & Offset Commercial Printing',
  primaryPhone: '+91-7053197695',
  primaryPhoneRaw: '917053197695',
  alternatePhones: [
    { label: 'Production Desk', number: '+91-9810157695', raw: '919810157695' },
    { label: 'Bulk Enquiries', number: '+91-9266944315', raw: '919266944315' },
  ],
  allPhones: ['+91-7053197695', '+91-9810157695', '+91-9266944315'],
  email: 'shivanidigitalprints@gmail.com',
  address: 'Shop No. 12 & 14, Commercial Printing Complex, Main Road, Delhi NCR - 110001, India',
  city: 'Delhi NCR',
  state: 'Delhi',
  pincode: '110001',
  operatingHours: 'Mon - Sat: 9:30 AM – 8:30 PM (Sunday Closed for Maintenance)',
  dispatchNotice: 'Same-Day Delhi NCR Express Dispatch & Pan-India Safe Delivery',
  instagramUrl: 'https://instagram.com/shivanigraphics_official',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Shivani+Graphics+Commercial+Printing+Delhi+NCR',
  googleMapsEmbedIframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.27798363784!2d77.12056029832264!3d28.632316499824683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b023d057%3A0x85a393f51f865004!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
};

/**
 * WhatsApp Direct Ordering Engine
 * Strictly follows the URL encoding structure specified in the Master Technical Prompt:
 * https://wa.me/917053197695?text=Hello%20Shivani%20Graphics,%20I%20would%20like%20to%20place%20an%20order%20for:...
 */
export function buildWhatsAppOrderUrl(params: {
  productName: string;
  quantity: string | number;
  material: string;
  finish?: string;
  size?: string;
  estimatedPrice?: number;
  customerName?: string;
  customerPhone?: string;
  city?: string;
  targetPhoneRaw?: string;
  customNotes?: string;
}): string {
  const targetNumber = params.targetPhoneRaw || CONTACT_INFO.primaryPhoneRaw;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://shivanigraphics.in';

  let message = `Hello Shivani Graphics, I would like to place an order for:\n\n`;
  message += `* Product: ${params.productName}\n`;
  message += `* Quantity: ${params.quantity}\n`;
  message += `* Material: ${params.material}\n`;
  
  if (params.finish) {
    message += `* Finish / Lamination: ${params.finish}\n`;
  }
  if (params.size) {
    message += `* Size / Dimension: ${params.size}\n`;
  }
  if (params.estimatedPrice && params.estimatedPrice > 0) {
    message += `* Estimated Cost: ₹${params.estimatedPrice.toLocaleString('en-IN')}\n`;
  }
  if (params.customerName) {
    message += `* Client Name: ${params.customerName}${params.city ? ` (${params.city})` : ''}\n`;
  }
  if (params.customerPhone) {
    message += `* Client Contact: ${params.customerPhone}\n`;
  }
  if (params.customNotes) {
    message += `* Special Requirements: ${params.customNotes}\n`;
  }
  message += `* Reference: ${currentUrl}\n\n`;
  message += `Please provide pricing confirmation, artwork guidelines, and digital design proof details.`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Quick General WhatsApp Chat URL
 */
export function buildGeneralWhatsAppUrl(queryTopic?: string): string {
  const topic = queryTopic || 'Commercial Printing & Design Services';
  const text = `Hello Shivani Graphics Team, I have an inquiry regarding *${topic}*. Please guide me with your options, turnaround time, and pricing.`;
  return `https://wa.me/${CONTACT_INFO.primaryPhoneRaw}?text=${encodeURIComponent(text)}`;
}
