import { useEffect, useState } from "react";
import "../styles/form-style.css";
import { otp } from "../API/otp.ts";
import { PHONE_MASK } from "../constants/contants.ts";

function Form() {
    const [phoneNumber, setPhone] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [buttonDisables, setButtonDisabled] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(120);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [requestFlag, setRequestFlag] = useState<boolean>(false);
    const isValidPhone: boolean = PHONE_MASK.test(phoneNumber);

    const changeInputPhoneState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
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

    useEffect(() => {
        if (currentTime > 0 && requestFlag) {
            console.log(requestFlag);
            const timer = setInterval(() => {
                setCurrentTime((time) => time - 1);
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
                style={{ border: !isSuccess && phoneNumber.length !== 0 ? "1px solid red" : "1px solid #CED2DA" }}
            />
            <input type="text" className="input-field code" placeholder="Проверочный код"
            style={{ display: isSuccess ? "block" : "none" }} />
            <div className="actions">
                <button className="btn send-phone-number" onClick={handleClickSendPhone} type="button"
                 disabled={buttonDisables ? true : false}>Продолжить</button>
                <button className="btn enter" style={{ display: isSuccess ? "block" : "none" }} type="button">Войти</button>
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