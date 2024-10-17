import { useState } from "react";
import "../styles/form-style.css"
import { checkPhoneNumber } from "../logic/checkValidation.ts";
import { request } from "../logic/request.ts";

function Form(){

    const [phoneNumber, setPhone] = useState<string>('');
    // const [otpCode, setCode] = useState<string>('');
    const [nameClass, setNameClass] = useState<string>("error-message");

    const changeInputPhoneState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    } 

    return (
        <>
            <form action="" className="form" method="post">
                <h2 className="title">Вход</h2>
                <p className="description">Введите номер телефона для входа в личный кабинет</p>
                <input type="text" className="input-field" placeholder="Телефон" onChange={changeInputPhoneState}/>
                <input type="text" className="input-field code" placeholder="Проверочный код"/>
                <div className="actions">
                    <button className="btn send-phone-number" onClick={() => !checkPhoneNumber(phoneNumber) ? setNameClass("error-message active"): (setNameClass("error-message"), request(phoneNumber))} type="button">Продолжить</button>
                    <button className="btn enter">Войти</button>
                    <p className="code-timer">Запросить код повторно можно через 39 секунд</p>
                    <div className="send-block">
                        <p className="again-send-code">Запросить код ещё раз</p>
                    </div>
                    <p className={nameClass}>Неверные данные!</p>
                </div>
            </form>
        </>
    )
}

export default Form;