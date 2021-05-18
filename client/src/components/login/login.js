import './login.css';

const Login = () => {
    
    return (
            <div className="login-page">
                <div className="login-page__header">
                    <h1 className="login-page__heading">Login</h1>
                </div>


                <form className="login-form" >

                    <label htmlFor="usernmae">Username</label>
                    <input id="username" className="login-input-field" type="text" name="username" placeholder="Username..." />

                    <label htmlFor="usernmae">Password</label>
                    <input id="password" className="login-input-field" type="password" name="password" placeholder="********" />

                    <button type="submit" className="main-btn">Login</button>
                </form>
            </div>
    )
}

export default Login;
