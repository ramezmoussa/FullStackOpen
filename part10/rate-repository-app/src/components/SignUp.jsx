
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignUpContainer from './SignUpContainer';  

const SignUp = () => {

    const navigate = useNavigate();

    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
    
        try {
          const { data } = await signUp({ username, password });
          await signIn({ username, password });
          console.log(data);
          navigate('/');
        } catch (e) {
          console.log(e);
        }
      };
    
  return (
    <SignUpContainer onSubmit={onSubmit}/> 
  )
};


export default SignUp;