import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for static files, api, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};