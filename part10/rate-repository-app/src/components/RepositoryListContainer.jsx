import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from "react-native-paper";
import React from 'react';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const HeaderComponent = ({order, setOrder, search, setSearch}) => {
    return (
      <View>
        <SearchbarComponent search={search} setSearch={setSearch}/>
        <PickerComponent order={order} setOrder={setOrder} />
      </View>
    )
};


const PickerComponent = ({order, setOrder}) => {
    return (
        <Picker
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) =>
              setOrder(itemValue)
            }>
            <Picker.Item label="Latest Repositories" value={
                {
                    type: "CREATED_AT",
                    direction: "DESC"
                }
            } />
            <Picker.Item label="Highest Rated Repositories" value={
                {
                    type: "RATING_AVERAGE",
                    direction: "DESC"
                }
            } />
            <Picker.Item label="Lowest Rated Repositories" value={
                {
                    type: "RATING_AVERAGE",
                    direction: "ASC"
                }
            } />

        </Picker>
    );
};

const SearchbarComponent = ({search, setSearch}) => {
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearch(query)}
            value={search}
        />
    );
};



const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {order, setOrder, search, setSearch} = this.props;    
    return (
      <HeaderComponent order={order} setOrder={setOrder} search={search} setSearch={setSearch}/>
    );
  }
  
  render() {
    const {repositories, navigate} = this.props;    
    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
              <RepositoryItem item={item} />
          </Pressable>
          )}
      ListHeaderComponent={this.renderHeader}
      />
    );
  }

};