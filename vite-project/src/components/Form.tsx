import { useEffect, useState } from "react";
import "../styles/form-style.css";
import { otp } from "../API/otp.ts";
import { PHONE_MASK, OTP_MASK } from "../constants/contants.ts";
import { signin } from "../API/signin.ts";

function Form() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(120);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [requestFlag, setRequestFlag] = useState<boolean>(false);
    const isValidPhone: boolean = PHONE_MASK.test(phoneNumber);
    const isValidCode: boolean = OTP_MASK.test(otpCode);

    const changeInputPhoneState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const changeInputCodeState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtpCode(event.target.value);
    };

    const handleClickSendPhone = async () => {
        if (currentTime === 0) {
            setCurrentTime(120);
            setRequestFlag(false);
        }
        if (isValidPhone) {
            setIsSuccess(true);
            await otp(phoneNumber);
            setRequestFlag(true);
            setButtonDisabled(true);
        } else {
            setIsSuccess(false);
            setCurrentTime(120);
        }
    };

    const handleClickSendCode = async () => {
        if (isValidCode && isValidPhone){
            await signin(phoneNumber, otpCode).then(() => console.log("ok"));
        }
    }

    useEffect(() => {
        if (currentTime > 0 && requestFlag) {
            const timer = setInterval(() => {
                setCurrentTime(time => time - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (currentTime === 0) {
            setRequestFlag(false);
        }
    }, [currentTime, requestFlag]);

    return (
        <form action="" className="form" method="post">
            <h2 className="title">Вход</h2>
            <p className="description">Введите номер телефона для входа в личный кабинет</p>
            <input
                type="text"
                className="input-field"
                placeholder="Телефон"
                onChange={changeInputPhoneState}
                style={{ border: !isSuccess && phoneNumber.length !== 0
                     ? "1px solid red" : "1px solid #CED2DA" }}
            />
            <input type="text" className="input-field code"
             placeholder="Проверочный код"
            style={{ display: isSuccess ? "block" : "none" }}
            onChange={changeInputCodeState} />
            <div className="actions">
                <button className="btn send-phone-number" onClick={handleClickSendPhone} type="button"
                 disabled={buttonDisabled ? true : false}>Продолжить</button>
                <button className="btn enter" style={{ display: isSuccess ? "block" : "none" }} type="button" onClick={handleClickSendCode}>Войти</button>
                <p className="code-timer" style={{ display: isSuccess && currentTime !== 0 ? "block" : "none" }}>
                    Запросить код повторно можно через {currentTime} секунд
                </p>
                <div className="send-block" style={{ display: currentTime === 0 ? "block" : "none" }}>
                    <p className="again-send-code" onClick={handleClickSendPhone}>Запросить код ещё раз</p>
                </div>
            </div>
        </form>
    );
}

export default Form;