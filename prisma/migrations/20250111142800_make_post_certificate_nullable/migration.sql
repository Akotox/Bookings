-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "postCertificate" DROP NOT NULL,
ALTER COLUMN "postCertIssuedBy" DROP NOT NULL,
ALTER COLUMN "postCertificateFile" DROP NOT NULL;
