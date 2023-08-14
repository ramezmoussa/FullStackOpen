import { FlatList, View, StyleSheet } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { Route, Routes, Navigate, useParams, useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const RepositoryView = () => {

    const { id } = useParams();
    console.log("id is this:", id)
    const { repository } = useRepository(id);
    
    if (!repository) {
        return null;
    }
    console.log('repository', repository)

    return (
        <RepositoryItem item={repository} />
    )
};

export default RepositoryView;