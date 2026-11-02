import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const cities = z.enum(["Oakville", "Burlington", "Milton", "Halton Hills", "Halton-wide", "Ontario-wide"]);

// Page copy. Each page file uses only the fields it needs.
const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: z.string(),
    intro: z.string().optional(),
    // Home
    situationsHeading: z.string().optional(),
    situations: z.array(z.string()).optional(),
    storyHeading: z.string().optional(),
    freeServicesHeading: z.string().optional(),
    freeServicesText: z.string().optional(),
    // Services
    notIncluded: z.array(z.string()).optional(),
    navigationScenarios: z.array(z.object({ scenario: z.string(), work: z.string() })).optional(),
    paymentText: z.string().optional(),
    // Book
    beforeCall: z.array(z.string()).optional(),
    afterCall: z.array(z.string()).optional(),
  }),
});

// One file per paid offer. Prices live here and nowhere else.
const services = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/services" }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    price: z.number(), // 0 means free
    priceSuffix: z.string().optional(), // "/ month", "/ hour"
    summary: z.string(),
    includes: z.array(z.string()),
    timeCap: z.string(),
    duration: z.string(),
    featured: z.boolean().default(false),
    note: z.string().optional(),
  }),
});

// Shared shape for free services today and the Halton directory later.
const listing = z.object({
  name: z.string(),
  summary: z.string(),
  phone: z.string().optional(), // digits for the tel: link, e.g. "+18448063093"
  phoneDisplay: z.string().optional(),
  phoneAlt: z.string().optional(), // optional second number, shown as text
  hours: z.string().optional(),
  url: z.string().url(),
  cost: z.string(),
  referral: z.string().optional(),
  cities: z.array(cities),
  serviceTypes: z.array(z.string()),
  lastVerified: z.coerce.date(),
  verifiedSource: z.string().url().optional(),
  order: z.number().default(99),
});

const freeServices = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/free-services" }),
  schema: listing,
});

// Empty for v1. Add Markdown files here when the directory launches.
const directory = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/directory" }),
  schema: listing,
});

const legal = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { pages, services, freeServices, directory, legal };
