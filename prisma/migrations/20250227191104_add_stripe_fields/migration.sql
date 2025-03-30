-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "isStripeActive" "StripeStatus" NOT NULL DEFAULT 'INACTIVE',
ADD COLUMN     "stripeAccount" TEXT;
