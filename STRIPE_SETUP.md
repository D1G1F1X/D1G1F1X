# Stripe Payment Integration Setup

## Quick Fix for 500 Errors

The 500 errors you're seeing are because the Stripe environment variables are not configured. Here's how to fix it:

### 1. Create Environment File

Create a `.env.local` file in your project root with:

```bash
# Stripe Configuration (Get these from https://dashboard.stripe.com/apikeys)
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Your domain (optional - will auto-detect from request)
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### 2. Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Test** keys (not live keys for development)
3. Replace the placeholder values in `.env.local`

### 3. Test the Integration

After setting up the environment variables:

1. Restart your development server: `pnpm dev`
2. Go to `/buy` page
3. Click "Pay with Stripe" on any product
4. You should be redirected to Stripe Checkout

### 4. Test Card Numbers

Use these test card numbers in Stripe Checkout:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

### 5. Webhook Setup (Optional for Testing)

For production, set up webhooks:
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Fixed Issues

✅ **URL Validation**: Fixed invalid image URLs that were causing Stripe errors
✅ **Error Handling**: Better error messages for debugging
✅ **Environment Variables**: Proper validation and fallbacks
✅ **Image URLs**: Automatic conversion of relative to absolute URLs

## Current Status

✅ Stripe integration is fully implemented
✅ Error handling improved
✅ Environment variable validation added
✅ **Image URL issues fixed** - No more `url_invalid` errors
❌ **You need to add your Stripe keys to `.env.local`**

Once you add the Stripe keys, payments will work perfectly!