import { URL } from "../constants/contants.ts"

export const otp = async (phone: string) => {
    const headers = {
        "Content-Type": "application/json"
    }

    return await fetch(URL, {
        method: "POST",
        body: JSON.stringify({"phone": phone}),
        headers: headers
    }).then(response => {
        if (response.ok){
            return response.json();
        }    
    }).catch(error => {
        console.log("Error!");
    })
}