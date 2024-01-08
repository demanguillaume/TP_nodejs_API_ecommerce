import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '../types/User';

// Function to create an admin user if it doesn't exist
export async function createAdminUser() {
  const adminEmail: string | undefined = process.env.ADMIN_EMAIL;
  const adminPassword: string | undefined = process.env.ADMIN_PASSWORD;
  const adminFirstName: string | undefined = process.env.ADMIN_FIRSTNAME;
  const adminLastName: string | undefined = process.env.ADMIN_LASTNAME;
  const adminRole: UserRole | undefined = process.env.ADMIN_ROLE as UserRole;

  if (
    !adminEmail ||
    !adminPassword ||
    !adminFirstName ||
    !adminLastName ||
    !adminRole
  ) {
    throw new Error('Missing admin user data');
  }
  const hashedPassword = await hash(adminPassword, 10);
  const prisma = new PrismaClient();

  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: adminRole,
        firstName: adminFirstName,
        lastName: adminLastName,
      },
    });
  }
}
