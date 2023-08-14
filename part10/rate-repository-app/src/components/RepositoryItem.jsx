import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from "expo-linking";

const NumberComponent = ( {number, text} ) => {
    const styles = StyleSheet.create({
        numberContainer: {
            flexDirection: 'column',
            fontWeight:"bold",
            alignItems: 'center',
        },
        numberText: {
            fontWeight:"bold",
        },
        });
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{number}</Text>
            <Text>{text}</Text>
        </View>
    );
};

const RepositoryItem = ( {item} ) => {

    const convertNumber = (number) => {
        if (number < 1000) {
            return number;
        } else {
            return (number/1000).toFixed(1) + 'k';
        }
    };

    const id = item.id;
    const fullName = item.fullName;
    const description = item.description;
    const language = item.language;
    const forksCount = item.forksCount;
    const stargazersCount = item.stargazersCount;
    const ratingAverage = item.ratingAverage;
    const reviewCount = item.reviewCount;
    const ownerAvatarUrl = item.ownerAvatarUrl;
    const url = item.url;

    const styles = StyleSheet.create({
        wholeItem: {
            padding: 5,
            backgroundColor: 'white',
        },
        image: {
            width: 50,
            height: 50,
        },
        upperPart: {
            flexDirection: 'row',
        },
        lowerPart: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        languageBox: {
            marginTop: 10,
            flexDirection: 'row',
        },
        language: {
        color: 'white',
        backgroundColor: '#0366d6',
        flexGrow: 0,
        paddingVertical: 3,
        paddingHorizontal: 6,
        },
        button: {
            backgroundColor: '#0366d6',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
        },

      });


    return (
        <View testID="repositoryItem" style={styles.wholeItem}>
            <View style={styles.upperPart}> 
                <View >
                    <Image
                        style={styles.image}
                        source={{uri: ownerAvatarUrl}}
                    />
                </View>
                <View>
                    <Text style={{fontWeight:"bold", padding: 5}}>{fullName}</Text>
                    <Text style={{padding: 5}}>{description}</Text>
                    <View style={styles.languageBox}>
                        <Text style={styles.language}>{language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lowerPart}>
                <NumberComponent number={convertNumber(stargazersCount)} text='Stars'/>
                <NumberComponent number={convertNumber(forksCount)} text='Forks'/>
                <NumberComponent number={convertNumber(reviewCount)} text='Reviews'/>
                <NumberComponent number={convertNumber(ratingAverage)} text='Rating'/>
            </View>
            {
                url ?
                <View style={{padding: 5}}>
                    <Pressable
                        onPress={() => Linking.openURL(url)}
                        style={styles.button}
                    >
                        <Text style={styles.language}>Open in GitHub</Text>
                    </Pressable>
                </View>
                        
                : null
            }

      </View>  
    );
  };
  
  export default RepositoryItem;