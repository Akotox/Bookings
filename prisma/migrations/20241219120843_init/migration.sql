-- CreateEnum
CREATE TYPE "StripeStatus" AS ENUM ('INACTIVE', 'PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'NEW_USER', 'AFFILIATE', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'PAST_DUE');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VietnameseCources" AS ENUM ('Vietnamese_Literature', 'Vietnamese_Math', 'Vietnamese_Physics', 'Vietnamese_Chemistry');

-- CreateEnum
CREATE TYPE "VietnameseGrades" AS ENUM ('Primary_Level', 'Secondary_Level', 'High_School_Level');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('English', 'Italian', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Arabic', 'Chinese_Mandarin', 'Computer_science', 'Economics', 'Accounting', 'Chemistry', 'Biology', 'Algebra', 'Physics', 'History', 'Math', 'Portuguese', 'Statistics', 'Russian', 'Polish', 'Turkish', 'Ukrainian', 'Dutch', 'Hungarian', 'Hindi', 'Czech', 'Norwegian', 'Greek', 'Hebrew', 'Georgian', 'Armenian', 'Finnish', 'Swedish', 'Arts', 'Music', 'Acting_skills', 'Art_classes', 'Telugu', 'Tamil', 'Sign', 'Tagalog', 'Romanian', 'Irish', 'Icelandic', 'Persian_Farsi', 'Croatian', 'Catalan', 'Bulgarian', 'Bengali', 'Danish', 'Latin', 'Punjabi', 'Thai', 'Belarusian', 'Serbian', 'Tibetan', 'Urdu', 'Lithuanian', 'Khmer', 'Slovak', 'Sanskrit', 'Vietnamese', 'PR', 'International_Business', 'Marketing_Strategy', 'Content_marketing', 'Business_Management', 'Dota2', 'Concursos', 'Objective_C', 'Data_Science', 'UX_UI', 'IT_Project_Management', 'Artificial_intelligence', 'Web_Development', 'Web_Analytics', 'Java', 'C', 'Swift', 'Go_language', 'Rust', 'Scala', 'HTML', 'XML', 'CSS', 'JavaScript', 'NodeJS', 'Python', 'PHP', 'Ruby', 'Bash', 'iOS_app_development', 'Android_app_development', 'Databases', 'Algorithms', 'Marathi', 'Yoruba', 'Amharic', 'Maori', 'Igbo', 'Sinhala', 'Burmese', 'Lao', 'Kazakh', 'Tamazight', 'Public_Speaking', 'Cplusplus', 'Graphic_Design', 'Csharp', 'Welsh', 'Kannada', 'Gujarati', 'Ancient_Greek', 'Maltese', 'Creole', 'Yiddish', 'Bosnian', 'Estonian', 'Luganda', 'Cebuano', 'Basque', 'Quichua', 'Crimean_Tatar', 'Corporate_Finance', 'Geography', 'Philosophy', 'Writing', 'Sociology', 'Psychology', 'Social_Sciences_Humanities', 'Motion_design', 'Photography', 'Malayalam', 'R', 'PPC', 'Albanian', 'Pashto', 'Hawaiian', 'Esperanto', 'Xhosa', 'Macedonian', 'Kurdish', 'Kinyarwanda', 'Uzbek', 'Geometry', 'Literature', 'Design3D', 'Video_post_production', 'Tests', 'Law', 'Swahili', 'Afrikaans', 'Malay', 'Somali', 'Slovenian', 'Latvian', 'Mongolian', 'Luxembourgish', 'Quechua', 'Azerbaijani', 'Cantonese', 'Indonesian', 'Sales', 'Business_Modelling', 'Product_Management', 'Business_Strategy', 'Business_Analytics', 'SEO', 'SMM', 'Copywriting', 'Email_marketing');

-- CreateEnum
CREATE TYPE "TeacherNationality" AS ENUM ('United_States_Of_America', 'Peru', 'United_Kingdom', 'Canada', 'Australia', 'Afghanistan', 'Aland_Islands', 'Albania', 'Algeria', 'American_Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua_And_Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire_Sint_Eustatius_And_Saba', 'Bosnia_And_Herzegovina', 'Botswana', 'Bouvet_Island', 'Brazil', 'British_Indian_Ocean_Territory', 'Brunei', 'Bulgaria', 'Burkina_Faso', 'Burundi', 'Cabo_Verde', 'Cambodia', 'Cameroon', 'Cayman_Islands', 'Central_African_Republic', 'Chad', 'Chile', 'China', 'Christmas_Island', 'Cocos_Keeling_Islands', 'Colombia', 'Comoros', 'Congo', 'Congo_Democratic_Republic_Of_The', 'Cook_Islands', 'Costa_Rica', 'Cote_Divoire', 'Croatia', 'Curacao', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican_Republic', 'Ecuador', 'Egypt', 'El_Salvador', 'Equatorial_Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Falkland_Islands_Malvinas', 'Faroe_Islands', 'Fiji', 'Finland', 'France', 'French_Guiana', 'French_Polynesia', 'French_Southern_Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea_Bissau', 'Guyana', 'Haiti', 'Heard_Island_And_McDonald_Islands', 'Holy_See', 'Honduras', 'Hong_Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle_Of_Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall_Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia_Federated_States_Of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New_Caledonia', 'New_Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk_Island', 'North_Macedonia', 'Northern_Mariana_Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine_State_Of', 'Panama', 'Papua_New_Guinea', 'Paraguay', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto_Rico', 'Qatar', 'Reunion', 'Romania', 'Rwanda', 'Saint_Barthelemy', 'Saint_Helena_Ascension_And_Tristan_Da_Cunha', 'Saint_Kitts_And_Nevis', 'Saint_Lucia', 'Saint_Martin_French_Part', 'Saint_Pierre_And_Miquelon', 'Saint_Vincent_And_The_Grenadines', 'Samoa', 'San_Marino', 'Sao_Tome_And_Principe', 'Saudi_Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra_Leone', 'Singapore', 'Sint_Maarten_Dutch_Part', 'Slovakia', 'Slovenia', 'Solomon_Islands', 'Somalia', 'South_Africa', 'South_Georgia_And_The_South_Sandwich_Islands', 'South_Korea', 'South_Sudan', 'Spain', 'Sri_Lanka', 'Suriname', 'Svalbard_And_Jan_Mayen', 'Sweden', 'Switzerland', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor_Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad_And_Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks_And_Caicos_Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United_Arab_Emirates', 'United_States_Minor_Outlying_Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin_Islands_British', 'Virgin_Islands_Us', 'Wallis_And_Futuna', 'Western_Sahara', 'Yemen', 'Zambia', 'Zimbabwe');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('English', 'Spanish', 'Mandarin_Chinese', 'Hindi', 'Bengali', 'Portuguese', 'Russian', 'Japanese', 'Western_Punjabi', 'Marathi', 'Telugu', 'Wu_Chinese', 'Turkish', 'Korean', 'French', 'German', 'Vietnamese', 'Tamil', 'Urdu', 'Javanese', 'Italian', 'Egyptian_Arabic', 'Hausa', 'Thai', 'Gujarati', 'Kannada', 'Persian_Farsi', 'Polish', 'Pashto', 'Dutch', 'Somali', 'Sinhala', 'Greek', 'Czech', 'Hebrew', 'Malay', 'Burmese', 'Kazakh', 'Uzbek', 'Azerbaijani', 'Hungarian', 'Swedish', 'Finnish', 'Icelandic', 'Irish', 'Estonian', 'Latvian', 'Lithuanian', 'Romanian', 'Serbian', 'Croatian', 'Bosnian', 'Bulgarian', 'Albanian', 'Macedonian', 'Slovenian', 'Slovak', 'Armenian', 'Georgian', 'Belarusian', 'Ukrainian', 'Mongolian', 'Tibetan', 'Lao', 'Khmer', 'Amharic', 'Tigrinya', 'Yoruba', 'Igbo', 'Xhosa', 'Zulu', 'Swahili', 'Malagasy', 'Haitian_Creole', 'Luxembourgish', 'Maori', 'Catalan', 'Galician', 'Basque', 'Kurdish', 'Quechua', 'Aymara', 'Tamazight', 'Indonesian', 'Filipino', 'Tagalog', 'Hawaiian', 'Fijian', 'Samoan', 'Tongan', 'Tahitian', 'Oromo', 'Kinyarwanda', 'Lingala', 'Shona', 'Afrikaans', 'Maltese', 'Creole', 'Yiddish', 'Crimean_Tatar', 'Esperanto', 'Sindhi', 'Sango', 'Guarani', 'Kyrgyz', 'Turkmen', 'Nepali', 'Dzongkha', 'Hmong', 'Sundanese', 'Balochi', 'Wolof', 'Bambara', 'Tamasheq', 'Fulah', 'Ganda', 'Luganda', 'Cebuano', 'Niuean', 'Tok_Pisin', 'Tetum');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('Beginner', 'Intermediate', 'Native', 'A1', 'B2');

-- CreateEnum
CREATE TYPE "TimeZone" AS ENUM ('GMT_MINUS_12_00_Eniwetok_Kwajalein', 'GMT_MINUS_11_00_Midway_Island_Samoa', 'GMT_MINUS_10_00_Hawaii', 'GMT_MINUS_09_30_Taiohae', 'GMT_MINUS_09_00_Alaska', 'GMT_MINUS_08_00_Pacific_Time_US_Canada', 'GMT_MINUS_07_00_Mountain_Time_US_Canada', 'GMT_MINUS_06_00_Central_Time_US_Canada_Mexico_City', 'GMT_MINUS_05_00_Eastern_Time_US_Canada_Bogota_Lima', 'GMT_MINUS_04_30_Caracas', 'GMT_MINUS_04_00_Atlantic_Time_Canada_Caracas_La_Paz', 'GMT_MINUS_03_30_Newfoundland', 'GMT_MINUS_03_00_Brazil_Buenos_Aires_Georgetown', 'GMT_MINUS_02_00_Mid_Atlantic', 'GMT_MINUS_01_00_Azores_Cape_Verde_Islands', 'GMT_PLUS_00_00_Western_Europe_Time_London_Lisbon_Casablanca', 'GMT_PLUS_01_00_Brussels_Copenhagen_Madrid_Paris', 'GMT_PLUS_02_00_Kaliningrad_South_Africa', 'GMT_PLUS_03_00_Baghdad_Riyadh_Moscow_St_Petersburg', 'GMT_PLUS_03_30_Tehran', 'GMT_PLUS_04_00_Abu_Dhabi_Muscat_Baku_Tbilisi', 'GMT_PLUS_04_30_Kabul', 'GMT_PLUS_05_00_Ekaterinburg_Islamabad_Karachi_Tashkent', 'GMT_PLUS_05_30_Bombay_Calcutta_Madras_New_Delhi', 'GMT_PLUS_05_45_Kathmandu_Pokhara', 'GMT_PLUS_06_00_Almaty_Dhaka_Colombo', 'GMT_PLUS_06_30_Yangon_Mandalay', 'GMT_PLUS_07_00_Bangkok_Hanoi_Jakarta', 'GMT_PLUS_08_00_Beijing_Perth_Singapore_Hong_Kong', 'GMT_PLUS_08_45_Eucla', 'GMT_PLUS_09_00_Tokyo_Seoul_Osaka_Sapporo_Yakutsk', 'GMT_PLUS_09_30_Adelaide_Darwin', 'GMT_PLUS_10_00_Eastern_Australia_Guam_Vladivostok', 'GMT_PLUS_10_30_Lord_Howe_Island', 'GMT_PLUS_11_00_Magadan_Solomon_Islands_New_Caledonia', 'GMT_PLUS_11_30_Norfolk_Island', 'GMT_PLUS_12_00_Auckland_Wellington_Fiji_Kamchatka', 'GMT_PLUS_12_45_Chatham_Islands', 'GMT_PLUS_13_00_Apia_Nukualofa', 'GMT_PLUS_14_00_Line_Islands_Tokelau');

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageSpoken" "Language" NOT NULL DEFAULT 'English',

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'NEW_USER',
    "hashedPassword" TEXT,
    "picture" TEXT,
    "stripeCustomerId" TEXT,
    "hasUsedFreeTrial" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "subject" "Subject",
    "nationality" "TeacherNationality" NOT NULL,
    "lessonPrice" INTEGER NOT NULL,
    "lessonDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lessons" INTEGER NOT NULL DEFAULT 0,
    "resume" TEXT NOT NULL,
    "deliveredLessons" INTEGER NOT NULL DEFAULT 0,
    "stripeProductId" TEXT,
    "stripePriceId" TEXT,
    "userId" TEXT NOT NULL,
    "isStripeActive" "StripeStatus" NOT NULL DEFAULT 'INACTIVE',
    "stripeTeacherAccount" TEXT,
    "schoolGrades" "VietnameseGrades",
    "vietnameseCourses" "VietnameseCources",
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classBundleId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "lessonsRemaining" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "languageSpoken" "Language" NOT NULL,
    "languageLevel" "LanguageLevel" NOT NULL,
    "subject" "Subject",
    "certificate" TEXT NOT NULL,
    "certIssuedBy" TEXT NOT NULL,
    "certificateFile" TEXT NOT NULL,
    "postCertificate" TEXT NOT NULL,
    "postCertIssuedBy" TEXT NOT NULL,
    "postCertificateFile" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "timeZone" "TimeZone" NOT NULL,
    "bio" TEXT,
    "profilePic" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT NOT NULL,
    "schoolGrades" "VietnameseGrades",
    "vietnameseCourses" "VietnameseCources",
    "userId" TEXT NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teacherId" TEXT,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeBlock" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "day" "Day" NOT NULL,
    "availabilityId" TEXT,

    CONSTRAINT "TimeBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportedUsers" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderRole" "Roles" NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderPicture" TEXT NOT NULL,
    "initialSenderRole" "Roles" NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverRole" "Roles" NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverPicture" TEXT NOT NULL,
    "messageContent" TEXT NOT NULL,

    CONSTRAINT "ReportedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "googleMeetUrl" TEXT,
    "status" "MeetingStatus" NOT NULL DEFAULT 'SCHEDULED',
    "price" DOUBLE PRECISION NOT NULL,
    "subscriptionId" TEXT,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "stripePaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unreadMessag" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassBundle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "lessonsCount" INTEGER NOT NULL,
    "priceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "unitDiscount" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "ClassBundle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_emailAddress_key" ON "Newsletter"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_userId_key" ON "Affiliate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_teacherId_key" ON "Subscription"("userId", "teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_userId_key" ON "Applicant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_userId_key" ON "Availability"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_meetingId_key" ON "Payment"("meetingId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_classBundleId_fkey" FOREIGN KEY ("classBundleId") REFERENCES "ClassBundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBlock" ADD CONSTRAINT "TimeBlock_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBundle" ADD CONSTRAINT "ClassBundle_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
