
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInContainer from './SignInContainer';
  

const SignIn = () => {

    const navigate = useNavigate();

    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
    
        try {
          const { data } = await signIn({ username, password });
          console.log(data);
          navigate('/');
        } catch (e) {
          console.log(e);
        }
      };
    
  return (
    <SignInContainer onSubmit={onSubmit}/> 
  )
};


export default SignIn;