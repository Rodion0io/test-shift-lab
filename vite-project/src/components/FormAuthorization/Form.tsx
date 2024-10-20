import { useEffect, useState } from "react";
import "./form-style.css"
import { otp } from "../../shared/API/request/user/otp.ts";
import { PHONE_MASK, OTP_MASK } from "../../shared/constants/contants.ts";
import { signin } from "../../shared/API/request/user/signin.ts";

function Form() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<number>(120);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [requestFlag, setRequestFlag] = useState<boolean>(false);
    const [isAuthroized, setIsAuthroized] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSendet, setIsSendet] = useState<boolean>(false);
    const isValidPhone: boolean = PHONE_MASK.test(phoneNumber) &&
     ((phoneNumber[0] === "+" && phoneNumber.length === 12) || ((phoneNumber[0] !== "+" && phoneNumber.length === 11)));
    const isValidCode: boolean = OTP_MASK.test(otpCode) && otpCode.length === 6;

    const postPhoneRequest = async () => {
        await otp(phoneNumber);
    }

    const postOtpRequest = async () => {
        await signin(phoneNumber, otpCode).then(response => {
            if (response.status === 201){
                setIsAuthroized(true);
                setCurrentTime(120);
                setRequestFlag(false);
            }
            else{
                setIsError(true);
                setIsAuthroized(false);
            }
        });
    }

    const handleClickSendPhone = async () => {
        if (currentTime === 0) {
            setIsSendet(false);
            setIsError(false);
            setCurrentTime(120);
            setRequestFlag(false);
        }
        setIsSendet(true);
        setIsSuccess(true);
        postPhoneRequest();
        setRequestFlag(true);
    };

    const handleClickSendCode = async () => {
        postOtpRequest();
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ border: !isValidPhone && phoneNumber.length !== 0
                     ? "1px solid red" : "1px solid #CED2DA" }}
                disabled={requestFlag ? true : false}/>

            <p className="warrning"
            style={{ color: !isValidPhone && phoneNumber.length !== 0
                ? "red" : "#CED2DA", display: !isValidPhone && phoneNumber.length !== 0
                ? "block" : "none" }}
            >Неккоректные данные</p>  

            <input type="text" className="input-field code"
             placeholder="Проверочный код"
            style={{ display: isSuccess ? "block" : "none",
             border: !isValidCode && otpCode.length !== 0
            ? "1px solid red" : "1px solid #CED2DA" }}
            onChange={(e) => setOtpCode(e.target.value)} />

            <p className="warrning"
            style={{ color: !isValidCode && otpCode.length !== 0
                ? "red" : "#CED2DA", display: !isValidCode && otpCode.length !== 0
                ? "block" : "none" }}
            >Неккоректные данные, длина 6 символов</p>

            <div className="actions">
                <button className="btn send-phone-number"
                 onClick={handleClickSendPhone} type="button"
                 disabled={!isValidPhone ? true : false}
                 style={{display: isAuthroized || isSendet ? "none" : "block"}}
                 >Продолжить</button>
                <button className="btn enter"
                 style={{ display: isSuccess ? "block" : "none" }}
                  type="button" onClick={handleClickSendCode}
                  disabled={!isValidCode || isAuthroized ? true : false}
                  >Войти</button>
                <p className="code-timer" style={{ display: isSuccess && currentTime !== 0 &&
                     !isAuthroized ? "block" : "none" }}>
                    Запросить код повторно можно через {currentTime} секунд
                </p>
                <div className="infa-block" style={{ display: currentTime === 0 && !isAuthroized ? "block" : "none" }}>
                    <p className="again-send-code" onClick={handleClickSendPhone}>Запросить код ещё раз</p>
                </div>
                <p className="result-message"
                    style={{display: isAuthroized || isError ? "block" : "none",
                color: isAuthroized ? "green" : "red"}}
                    >{isAuthroized ? "Добро пожаловать!" : "Ошибка!"}</p>
            </div>
        </form>
    );
}

export default Form;