'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createAdminUser = void 0;
const bcrypt_1 = require('bcrypt');
const client_1 = require('@prisma/client');
// Function to create an admin user if it doesn't exist
function createAdminUser() {
  return __awaiter(this, void 0, void 0, function* () {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFirstName = process.env.ADMIN_FIRSTNAME;
    const adminLastName = process.env.ADMIN_LASTNAME;
    const adminRole = process.env.ADMIN_ROLE;
    if (
      !adminEmail ||
      !adminPassword ||
      !adminFirstName ||
      !adminLastName ||
      !adminRole
    ) {
      throw new Error('Missing admin user data');
    }
    const hashedPassword = yield (0, bcrypt_1.hash)(adminPassword, 10);
    const prisma = new client_1.PrismaClient();
    const adminUser = yield prisma.user.findUnique({
      where: { email: adminEmail },
    });
    if (!adminUser) {
      yield prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: adminRole,
          firstName: adminFirstName,
          lastName: adminLastName,
        },
      });
    }
  });
}
exports.createAdminUser = createAdminUser;
//# sourceMappingURL=createAdminUser.js.map
