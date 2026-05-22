export const site = {
  name: 'H3cleaning',
  nameFull: 'H3cleaning Service',
  email: 'info@h3cleaningservice.com',
  phone: '(509) 528-0560',
  phoneTel: '+15095280560',
  whatsappUrl: 'https://wa.me/15095280560',
  description:
    'Professional junk removal, pressure washing, and trash bin services in Tri-Cities, WA. Licensed, insured, and on-time.',
} as const;

export const serviceQueryMap: Record<string, string> = {
  junk: 'junk-removal',
  pressure: 'pressure-washing',
  bin: 'trash-bin',
};
