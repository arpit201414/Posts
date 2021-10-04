import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from '../screens/potsScreen';
import DetailsScreen from '../screens/detailsScreen';

const Stack = createNativeStackNavigator();

const PostStack = () => {
    return (
        <Stack.Navigator initialRouteName="postScreen">
            <Stack.Screen name="postScreen" component={PostScreen} />
            <Stack.Screen name="detailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default PostStack;