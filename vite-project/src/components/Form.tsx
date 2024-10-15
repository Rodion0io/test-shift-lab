import "../styles/form-style.css"

function Form(){

    return (
        <>
            <form action="" className="form" method="post">
                <h2 className="title">Вход</h2>
                <p className="description">Введите номер телефона для входа в личный кабинет</p>
                <input type="text" className="input-field" placeholder="Телефон"/>
                <input type="text" className="input-field code" placeholder="Проверочный код"/>
                <div className="actions">
                    <button className="btn send-phone-number">Продолжить</button>
                    <button className="btn enter">Войти</button>
                    <p className="code-timer">Запросить код повторно можно через 39 секунд</p>
                    <div className="send-block">
                        <p className="again-send-code">Запросить код ещё раз</p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form;