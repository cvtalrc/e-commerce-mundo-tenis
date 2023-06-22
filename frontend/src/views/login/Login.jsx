import LoginForm from "../../components/LoginForm/LoginForm";
import UserContext from "../../context/UserContext";

export default function Login() {
    const { handleLogin } = useContext(UserContext);
    return (
        <LoginForm handleLogin={handleLogin}>
        </LoginForm>
    )

}