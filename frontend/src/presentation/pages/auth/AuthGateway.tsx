
import AuthForm from '../../components/auth/AuthForm';

interface Props {
    mode: "login" | "signup";
}

const AuthGateway = ({ mode }: Props) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <AuthForm mode={mode}/>
    </div>
  )
}

export default AuthGateway
