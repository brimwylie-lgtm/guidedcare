// Site-wide settings. Change values here, not in the page files.

export const site = {
  // The ONE place the domain lives. Use the Vercel URL until the domain is bought,
  // then change it to "https://guidedcare.ca" (or whatever you secure).
  url: "https://guidedcare-site.vercel.app",

  // false = every page gets noindex and a "preview" banner shows at the top.
  // Set to true only when the domain is live and you are ready for search engines.
  indexable: false,

  name: "GuidedCare",
  tagline: "Independent senior care navigation for families in Halton",

  owner: {
    name: "Brian", // add your surname when you are ready
    email: "bri.mwylie@gmail.com",
  },

  serviceArea: ["Oakville", "Burlington", "Milton", "Halton Hills"],
  hours: "Monday to Friday, 9 am to 5 pm Eastern",

  // Turn off if you are not registered for HST. Do not charge HST unless registered.
  showHst: true,

  // Cal.com: your username and the slug of the free fit call event type.
  // Example: if your booking page is cal.com/brian-guidedcare/fit-call
  // then calLink is "brian-guidedcare/fit-call".
  calLink: "REPLACE-cal-username/fit-call",

  // Tally form for the "tell me when the directory launches" signup.
  signupUrl: "https://tally.so/r/REPLACE",

  // Short scope statement from Playbook section 11. Used in the footer and booking page.
  scopeShort:
    "GuidedCare helps families understand their options, prepare for assessments and conversations, and connect with the right services. I'm not a nurse, doctor, social worker, lawyer or financial advisor, and I don't assess care needs or recommend a level of care. Families pay me directly, and I take no commissions or referral fees from any provider.",
} as const;

export const calUrl = `https://cal.com/${site.calLink}`;
export const calReady = !site.calLink.startsWith("REPLACE");
export const signupReady = !site.signupUrl.endsWith("REPLACE");

export function formatPrice(price: number, suffix?: string) {
  if (price === 0) return "Free";
  const amount = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
  return suffix ? `${amount} ${suffix}` : amount;
}

export const priceNote = site.showHst
  ? "All prices in Canadian dollars, plus HST."
  : "All prices in Canadian dollars.";
