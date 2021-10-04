import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsScreen = ({ route }) => {
    const receivedData = route.params.item
    console.log("receivedData-->>", receivedData)
    return (
        <View style={styles.container}>
            <Text>Title-{receivedData.title}</Text>
            <Text>Url-{receivedData.url}</Text>
            <Text>Created at-{receivedData.created_at}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})

export default DetailsScreen;