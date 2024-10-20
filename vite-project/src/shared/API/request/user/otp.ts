import { OTP_URL } from "../../../constants/contants.ts"

export const otp = async (phone: string) => {
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(OTP_URL, {
            method: "POST",
            body: JSON.stringify({"phone": phone}),
            headers: headers
        });
        return response;
    } catch (error) {
        console.log("Ошибка!", error);
        throw error;
    }
}