import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .required("Password is required"),
  });

const initialValues = {
    username: '',
    password: '',
  };


const SignInContainer = ({ onSubmit }) => {

       const styles = StyleSheet.create({
        whole: {
            backgroundColor: 'white',
        },
        input: {
            padding: 5,
            margin: 5,
            borderWidth: 1,
            borderRadius: 5,

        },
        SignInButton: {
            backgroundColor: 'blue',
            padding: 5,
            margin: 5,
            borderRadius: 5,
        },
        text: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
        }
    });


    return (
        <Formik testID="signInForm" initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => 
            <View style={styles.whole}>
                <FormikTextInput testID="username" style={styles.input} name="username" placeholder="Username" />
                <FormikTextInput testID="password" style={styles.input} name="password" placeholder="Password" secureTextEntry />
                <Pressable testID="signInButton" style={styles.SignInButton} onPress={handleSubmit}>
                    <Text style={styles.text}>Sign in</Text>
                </Pressable>
            </View>
        }
        </Formik>
    )
    }


export default SignInContainer;