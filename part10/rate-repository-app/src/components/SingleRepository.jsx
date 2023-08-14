import { FlatList, View, StyleSheet, Text } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { Route, Routes, Navigate, useParams, useNavigate } from 'react-router-native';


const RepositoryInfo = ({ repository }) => {
    return (
        <RepositoryItem item={repository} showButton={true} />
    )  
};
  
  const ReviewItem = ({ review }) => {
    const styles = StyleSheet.create({
        wholeContainer: {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
        },
        ratingContainer: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            borderRadius: 25,
            borderColor: '#0366d6',
            borderWidth: 2,
            marginRight: 10,
            alignItems: 'center',

        },
        review: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: 50,
        },
        dateText: {
            color: 'grey',
        },
    });

    let date = new Date(review.createdAt).toDateString();
    return (
        <View style={styles.wholeContainer}> 
            <View style={styles.ratingContainer}>
                    <Text style={{color: "#0366d6"}}>{review.rating}</Text>
            </View>
            <View style={styles.review}>
                <Text style={{fontWeight: "bold"}} >{review.user.username}</Text>
                <Text style={styles.dateText}>{date}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
  };
  


  const SingleRepository = () => {
    const { id } = useParams();
    const { repository, reviews } = useRepository(id);
    
    if (!repository) {
        return null;
    }    

    if (!reviews) {
        return null;
    }    

    const styles = StyleSheet.create({
        separator: {
            height: 10,
        },
    });

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
      <FlatList
        ItemSeparatorComponent={ItemSeparator}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    );
  };
  
  export default SingleRepository;
