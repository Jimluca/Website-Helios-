// Maakt de drie schermafbeeldingen voor de slideshow "Hoe het werkt" (2× resolutie).
// Gebruikt de demo-accounts uit de seeder van het lokale Helios-platform; er wordt niets opgeslagen.
// Vereist: Helios draaiend op 127.0.0.1:8000, Microsoft Edge en `npm i -D playwright-core`.
// Gebruik: node scripts/capture-screens.mjs public/assets/screens
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://127.0.0.1:8000';
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' });

async function login(user) {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(BASE + '/login');
    await page.getByPlaceholder('Vul je e-mailadres in').fill(user);
    await page.getByPlaceholder('Vul je wachtwoord in').fill('123');
    await Promise.all([page.waitForURL((u) => !u.pathname.startsWith('/login')), page.keyboard.press('Enter')]);
    return { ctx, page };
}

async function open(page, path) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(1, 999);
    await page.waitForTimeout(600);
}

async function shot(page, name) {
    await page.screenshot({ path: `${OUT}/${name}` });
    console.log(name);
}

// Professional: cliënt uitnodigen, voortgang volgen, resultaten bespreken
{
    const { ctx, page } = await login('Prof');

    await open(page, '/clienten');
    await page.getByRole('button', { name: 'Nieuwe cliënt uitnodigen' }).click();
    await page.getByPlaceholder('Voornaam', { exact: true }).fill('Sem');
    await page.getByPlaceholder('Achternaam', { exact: true }).fill('de Wit');
    await page.getByPlaceholder('E-mailadres', { exact: true }).fill('sem.dewit@example.com');
    await page.mouse.move(1, 999);
    await page.waitForTimeout(500);
    await shot(page, '02-clienten-uitnodigen.png');

    await open(page, '/clienten');
    await shot(page, '03-voortgang-volgen.png');

    await open(page, '/clienten/1');
    await shot(page, '04-resultaten-bespreken.png');

    await ctx.close();
}

await browser.close();
