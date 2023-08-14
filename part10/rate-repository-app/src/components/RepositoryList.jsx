import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import {RepositoryListContainer} from './RepositoryListContainer';
import { useState } from 'react';
import { useDebounce } from "use-debounce";
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const [order, setOrder] = useState({ type: "CREATED_AT", direction: "DESC" });
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 500);
  const navigate = useNavigate();

  const { repositories } = useRepositories({
    orderBy: order.type,
    orderDirection: order.direction,
    searchKeyword: debounceSearch
  });

  if (!repositories || repositories.edges.length === 0)
   return null;
  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} search={search} setSearch={setSearch} navigate={navigate}/>;
};

export default RepositoryList;