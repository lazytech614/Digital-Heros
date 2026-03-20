import Stripe from "stripe"

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const STRIPE_PRICE_IDS = {
    monthly: "price_1TD0doQ5KfFMSj8nGQ5Qqu1i",
    yearly: "price_1TD0exQ5KfFMSj8nmgZuaDch"
} as const

export type StripePriceIds = keyof typeof STRIPE_PRICE_IDS