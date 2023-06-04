import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login( { updateUserName } ) {
    return (
        <LoginForm updateUserName={updateUserName}>
        </LoginForm>
    )

}