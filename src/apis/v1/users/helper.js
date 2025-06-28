import { getUserDetails } from "./query";

export const validateEmailAndPhoneNumber = async ({
  phoneNumber,
  email,
  username,
}) => {
  const userDetails = await getUserDetails({
    isDeleted: false,
    $or: [{ phoneNumber }, { email }, { username }],
  });

  //   USERNAME_ALREADY_EXISTS;
  //   EMAIL_ALREADY_EXISTS;
  //   PHONE_ALREADY_EXISTS;

  return !!userDetails;
};
