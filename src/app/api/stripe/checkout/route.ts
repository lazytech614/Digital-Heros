import { prisma } from "@/lib/prisma";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {userId} = await auth()

        if(!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const { priceId } = await request.json();

        if(!priceId || !(priceId in STRIPE_PRICE_IDS)) {
            return NextResponse.json({error: "Invalid priceId"}, {status: 400})
        }

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        let customerId = user.stripeCustomerId

        if(!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    userId: user.id
                }
            })
            customerId = customer.id
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    stripeCustomerId: customerId
                }
            })
        }

        const checkOutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: STRIPE_PRICE_IDS[priceId as keyof typeof STRIPE_PRICE_IDS],
                    quantity: 1
                }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: {
                userId: user.id,
                priceId
            }
        })

        return NextResponse.json({url: checkOutSession.url})
    }catch(err) {
        console.log("Error during checkout", err)
        return NextResponse.json({error: "Failed to create checkout session"}, {status: 500})
    }
} 