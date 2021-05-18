import './register.css';

const Register = () => {
    return (

        <div className="register-page">
            <div className="register-page__header">
                <h1 className="register-page__heading">Register</h1>
            </div>

            <form className="register-form">
                <label htmlFor="usernmae">Username</label>
                <input id="username" type="text" name="username" placeholder="Username..." />

                <label htmlFor="usernmae">Password</label>
                <input id="password" type="password" name="password" placeholder="******" />

                <label htmlFor="repeat-password">Repeat Password</label>
                <input id="repeat-password" type="password" name="rePassword" placeholder="******" />

                <button type="submit" className="main-btn">Register</button>
            </form>
        </div>
    )
}

export default Register;
