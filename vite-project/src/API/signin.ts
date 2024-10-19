import { SIGNIN_URL } from "../constants/contants.ts";

export const signin = async (phone: string, otpCode: string) => {
    const headers = {
        "Content-Type": "application/json"
    }

    return await fetch(SIGNIN_URL, {
        method: "POST",
        body: JSON.stringify({"phone": phone, "code": otpCode}),
        headers: headers
    }).then(response => {
        if (response.ok){
            return response.json();
        }    
    }).catch(error => {
        console.log("Error!");
    })
}