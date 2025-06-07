import mongoose from "mongoose";
import { Roles } from "../apis/v1/roles/model.js";
import { Users } from "../apis/v1/users/model.js";
import { envVariables } from "../config/env.validate.js";

async function seed() {
  const {
    MONGO_URI,
    ADMIN_ROLE_ALIAS,
    DEFAULT_USER_DOB,
    DEFAULT_USER_NAME,
    DEFAULT_USER_FATHER_NAME,
    DEFAULT_USER_GENDER,
    DEFAULT_USER_PHONE,
    DEFAULT_USER_EMAIL,
  } = envVariables;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // 1. Check if admin role exists by alias from env
    let adminRole = await Roles.findOne({ alias: ADMIN_ROLE_ALIAS });
    if (!adminRole) {
      adminRole = await Roles.create({
        name: "Administrator",
        alias: ADMIN_ROLE_ALIAS,
        status: "active", // or your STATUS_TYPES.ACTIVE
        description: "Default administrator role with full permissions",
        permissions: {},
      });
      console.log(`Role "Administrator" created`);
    } else {
      console.log(`Role "Administrator" already exists`);
    }

    // 2. Check if users exist
    const userCount = await Users.countDocuments();
    if (userCount === 0) {
      const dob = DEFAULT_USER_DOB
        ? new Date(DEFAULT_USER_DOB)
        : new Date("1990-01-01");

      const defaultUser = await Users.create({
        name: DEFAULT_USER_NAME || "Admin User",
        username: "",
        fatherName: DEFAULT_USER_FATHER_NAME || "Father Name",
        dob: dob,
        gender: DEFAULT_USER_GENDER,
        phoneNumber: DEFAULT_USER_PHONE,
        email: DEFAULT_USER_EMAIL,
        roleId: adminRole._id,
      });

      console.log(`Default user created with email: ${defaultUser.email}`);
    } else {
      console.log("Users already exist, skipping default user creation");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB. Seeding complete.");
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seed();
