import { SIGNIN_URL } from "../../../constants/contants.ts";

export const signin = async (phone: string, otpCode: string) => {
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(SIGNIN_URL, {
            method: "POST",
            body: JSON.stringify({ "phone": phone, "code": otpCode }),
            headers: headers
        });
        return response;
    } catch (error) {
        console.log("Ошибка!", error);
        throw error;
    }
}