import { prisma } from '@src/server/db';

export default async function resetDb() {
  await prisma.$transaction([
    prisma.verificationToken.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.note.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
