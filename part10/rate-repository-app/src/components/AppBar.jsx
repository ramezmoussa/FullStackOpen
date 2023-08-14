import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { me } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
  // ...
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const { data } = useQuery(me);
  const logged_in = data ? data.me : undefined;
  console.log("me result appbar: ", data);
  return <View style={styles.container}>
    <ScrollView horizontal>

        <Link to="/" component={Pressable}>
            <Text style={styles.text}> Repositories</Text>
        </Link>

        {
            logged_in ? 
            <View style={{flexDirection: "row"}}>
              <Link to="/review" component={Pressable}>
                  <Text style={styles.text}> Create a review</Text>
              </Link>

            <Link to="/reviews" component={Pressable}>
                <Text style={styles.text}> My reviews</Text>
            </Link>
            <Pressable onPress={() => {
                authStorage.removeAccessToken();
                apolloClient.resetStore();
            }}>
                <Text style={styles.text}> Sign out</Text>
            </Pressable>
            </View>
            :
            <View style={{flexDirection: "row"}}>
            <Link to="/signin" component={Pressable}>
                <Text style={styles.text}> Sign in</Text>
            </Link>
            <Link to="/signup" component={Pressable}>
                <Text style={styles.text}> Sign up</Text>
            </Link>
            </View>
        }

    </ScrollView>
  </View>;
};

export default AppBar;