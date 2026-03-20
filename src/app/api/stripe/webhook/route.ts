import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
    
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event: Stripe.Event
    
    try {
        event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!);
    }catch(err) {
        console.error("Error creating webhook event", err)
        return NextResponse.json({error: "Error creating webhook event"}, {status: 400})
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session
                const userId = session.metadata?.userId
                const priceId = session.metadata?.priceId

                if(userId && priceId) {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            stripeSubscriptionId: subscription.id,
                            stripePriceId: priceId,
                            stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                            billingInterval: priceId === "monthly" ? "MONTHLY" : "YEARLY",
                            subscriptionStatus: "ACTIVE"
                        }
                    })
                }
                break
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription
                const customerId = subscription.customer as string

                const user = await prisma.user.findFirst({
                    where: {
                        stripeCustomerId: customerId
                    }
                })

                if(user) {
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                            billingInterval: subscription.status === "active" ? subscription.items.data[0].price.id === "monthly" ? "MONTHLY" : "YEARLY" : null,
                            subscriptionStatus: subscription.status === "active" ? "ACTIVE" : "CANCELLED"
                        }
                    })
                }
                break
            }  
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription
                const customerId = subscription.customer as string

                const user = await prisma.user.findFirst({
                    where: {
                        stripeCustomerId: customerId
                    }
                })

                if(user) {
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            stripeSubscriptionId: null,
                            stripePriceId: null,
                            stripeCurrentPeriodEnd: null,
                            billingInterval: null,
                            subscriptionStatus: "CANCELLED"
                        }
                    })
                }
                break
            }
        }
        return NextResponse.json({ received: true })
    } catch (err) {
        console.error("Error processing webhook event", err)
        return NextResponse.json({error: "Error processing webhook event"}, {status: 400})
    }

    
}