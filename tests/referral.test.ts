import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect(); // Close connection after tests
});

test("Fetch referrals", async () => {
  const referrals = await prisma.referral.findMany();
  expect(Array.isArray(referrals)).toBe(true);
});
