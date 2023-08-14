
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import ReviewFormContainer from './ReviewFormContainer';

const ReviewForm = () => {

    const navigate = useNavigate();

    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { text, repositoryName, rating, ownerName } = values;
    
        try {
          const { data } = await createReview({ text, repositoryName, rating, ownerName });
          console.log(data);
          navigate(`/repository/${data.createReview.repositoryId}`)
        } catch (e) {
          console.log(e);
        }
      };
    
  return (
    <ReviewFormContainer onSubmit={onSubmit}/> 
  )
};


export default ReviewForm;