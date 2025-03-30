/*
  Warnings:

  - The values [GMT_MINUS_12_00_Eniwetok_Kwajalein,GMT_MINUS_11_00_Midway_Island_Samoa,GMT_MINUS_10_00_Hawaii,GMT_MINUS_09_30_Taiohae,GMT_MINUS_09_00_Alaska,GMT_MINUS_08_00_Pacific_Time_US_Canada,GMT_MINUS_07_00_Mountain_Time_US_Canada,GMT_MINUS_06_00_Central_Time_US_Canada_Mexico_City,GMT_MINUS_05_00_Eastern_Time_US_Canada_Bogota_Lima,GMT_MINUS_04_30_Caracas,GMT_MINUS_04_00_Atlantic_Time_Canada_Caracas_La_Paz,GMT_MINUS_03_30_Newfoundland,GMT_MINUS_03_00_Brazil_Buenos_Aires_Georgetown,GMT_MINUS_02_00_Mid_Atlantic,GMT_MINUS_01_00_Azores_Cape_Verde_Islands,GMT_PLUS_00_00_Western_Europe_Time_London_Lisbon_Casablanca,GMT_PLUS_01_00_Brussels_Copenhagen_Madrid_Paris,GMT_PLUS_02_00_Kaliningrad_South_Africa,GMT_PLUS_03_00_Baghdad_Riyadh_Moscow_St_Petersburg,GMT_PLUS_03_30_Tehran,GMT_PLUS_04_00_Abu_Dhabi_Muscat_Baku_Tbilisi,GMT_PLUS_04_30_Kabul,GMT_PLUS_05_00_Ekaterinburg_Islamabad_Karachi_Tashkent,GMT_PLUS_05_30_Bombay_Calcutta_Madras_New_Delhi,GMT_PLUS_05_45_Kathmandu_Pokhara,GMT_PLUS_06_00_Almaty_Dhaka_Colombo,GMT_PLUS_06_30_Yangon_Mandalay,GMT_PLUS_07_00_Bangkok_Hanoi_Jakarta,GMT_PLUS_08_00_Beijing_Perth_Singapore_Hong_Kong,GMT_PLUS_08_45_Eucla,GMT_PLUS_09_00_Tokyo_Seoul_Osaka_Sapporo_Yakutsk,GMT_PLUS_09_30_Adelaide_Darwin,GMT_PLUS_10_00_Eastern_Australia_Guam_Vladivostok,GMT_PLUS_10_30_Lord_Howe_Island,GMT_PLUS_11_00_Magadan_Solomon_Islands_New_Caledonia,GMT_PLUS_11_30_Norfolk_Island,GMT_PLUS_12_00_Auckland_Wellington_Fiji_Kamchatka,GMT_PLUS_12_45_Chatham_Islands,GMT_PLUS_13_00_Apia_Nukualofa,GMT_PLUS_14_00_Line_Islands_Tokelau] on the enum `TimeZone` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimeZone_new" AS ENUM ('Pacific_Midway', 'Pacific_Honolulu', 'America_Anchorage', 'America_Los_Angeles', 'America_Denver', 'America_Chicago', 'America_New_York', 'America_Caracas', 'America_Halifax', 'America_St_Johns', 'America_Sao_Paulo', 'Atlantic_South_Georgia', 'Atlantic_Cape_Verde', 'Europe_London', 'Europe_Paris', 'Europe_Moscow', 'Asia_Tehran', 'Asia_Dubai', 'Asia_Kabul', 'Asia_Karachi', 'Asia_Kolkata', 'Asia_Kathmandu', 'Asia_Dhaka', 'Asia_Yangon', 'Asia_Bangkok', 'Asia_Shanghai', 'Asia_Tokyo', 'Australia_Adelaide', 'Australia_Sydney', 'Pacific_Noumea', 'Pacific_Auckland', 'Pacific_Fakaofo');
ALTER TABLE "Applicant" ALTER COLUMN "timeZone" TYPE "TimeZone_new" USING ("timeZone"::text::"TimeZone_new");
ALTER TYPE "TimeZone" RENAME TO "TimeZone_old";
ALTER TYPE "TimeZone_new" RENAME TO "TimeZone";
DROP TYPE "TimeZone_old";
COMMIT;
