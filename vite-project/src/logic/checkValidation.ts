import { PHONE_MASK } from "../constants/contants.ts"

export const checkPhoneNumber = (phoneNumber: string) => {
    return true ? PHONE_MASK.test(phoneNumber) : false;
}