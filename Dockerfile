# Helios-website (Next.js) voor Coolify: bouwen met Node 24, draaien als losse server (output "standalone").
# Zie docs/deploy-coolify.md.

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
# Deze adressen gaan bij het bouwen vast in de pagina's. Coolify geeft ze mee als build-variabelen;
# zonder die variabelen gelden de adressen van de live omgeving.
ARG NEXT_PUBLIC_APP_URL=https://app.helioscarreer.nl
ARG NEXT_PUBLIC_SITE_URL=https://helioscarreer.nl
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://localhost:3000/up || exit 1
# Luister op "::" (IPv6 én IPv4): de health check van Coolify vraagt http://localhost:3000/up en localhost is in deze
# image eerst ::1. HOSTNAME wordt hier vast gezet, omdat Docker/Coolify die variabele op de containernaam kan zetten;
# dan zou de server alleen op dat adres luisteren.
CMD ["sh", "-c", "HOSTNAME=:: exec node server.js"]
