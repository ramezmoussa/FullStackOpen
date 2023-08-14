import useReviews from "../hooks/useReviews";
import { FlatList, View, StyleSheet } from "react-native";
import Text from './Text';

const ItemSeparator = () => <View style={{height: 10}} />;


const ReviewItem = ({ review, username }) => {
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
                <Text style={{fontWeight: "bold"}} >{username}</Text>
                <Text style={styles.dateText}>{date}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
  };



const ReviewList = () => {
    const data = useReviews()

    const reviews = data.reviews
    const username = data.username
    if (!reviews) 
    {
        return null;
    }


    const reviewNodes = reviews
    ? reviews.map((edge) => edge.node)
    : [];
    return (
        <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (
            <ReviewItem review={item} username={username} />
            )}
        />
  

    );
};

export default ReviewList;