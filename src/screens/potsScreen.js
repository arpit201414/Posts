import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import axios from "../api/axios";

const PostScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    useEffect(() => {
        callApi();

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handlePage();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentPage])



    const callApi = async () => {
        const response = await axios.get("/search_by_date", {
            params: {
                tags: "story",
                page: currentPage
            }
        });
        setData(response.data.hits);
    }

    const handlePage = async () => {
        console.log("postScreen");
        setCurrentPage(current => current + 1)
        console.log("currentPage-->>>", currentPage, data.length)
        const response = await axios.get("/search_by_date", {
            params: {
                tags: "story",
                page: currentPage
            }
        });
        let array = [...data]
        setData(array.concat(response.data.hits))

    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate("detailsScreen", { item: item })
                } >
                    <Text>Title-{item.title}</Text>
                    <Text>Url-{item.url}</Text>
                    <Text>Created at-{item.created_at}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <FlatList
                    data={data}
                    extraData
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    onEndReached={handlePage}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,

    },
    viewStyle: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        height: 120
    },
    view: {
        paddingHorizontal: 10
    }
})

export default PostScreen;