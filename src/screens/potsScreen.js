import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "../api/axios";

const PostScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    console.log("currentPage-->>", currentPage, data.length)

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

        console.log("response-->>", response.data.hits)
        setData(response.data.hits);
    }

    const handlePage = async () => {
        setCurrentPage(current => current + 1)
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
        <View style={styles.container}>
            <FlatList
                data={data}
                extraData
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                onEndReached={handlePage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        flex: 1
    },
    viewStyle: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10
    }
})

export default PostScreen;