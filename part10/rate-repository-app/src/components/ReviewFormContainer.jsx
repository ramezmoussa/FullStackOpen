import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({

    ownerName: yup
        .string()
        .required("Owner Name is required"),
    repositoryName: yup
        .string()
        .required("Repository Name is required"),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required("Rating is required"),
        
  });

const initialValues = {
    text: '',
    repositoryName: '',
    rating: '',
    ownerName: '',
  };


const ReviewFormContainer = ({ onSubmit }) => {

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
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => 
            <View style={styles.whole}>
                <FormikTextInput  style={styles.input} name="ownerName" placeholder="Repository owner name" />
                <FormikTextInput  style={styles.input} name="repositoryName" placeholder="Repository name"  />
                <FormikTextInput  style={styles.input} name="rating" placeholder="Rating between 0 and 100" />
                <FormikTextInput  style={styles.input} name="text" placeholder="Review" />
                <Pressable  style={styles.SignInButton} onPress={handleSubmit}>
                    <Text style={styles.text}>Create a Review</Text>
                </Pressable>
            </View>
        }
        </Formik>
    )
    }


export default ReviewFormContainer;