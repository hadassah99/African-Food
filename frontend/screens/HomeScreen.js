import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, Alert } from "react-native";
import { MaterialCommunityIcons, Feather, EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';


import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../constants";

function HomeScreen({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Use useFocusEffect hook to fetch task list every time the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchRecipe();
        }, [])
    );
    1
    const fetchRecipe = async () => {
        try {
            // Retrieve access token from AsyncStorage
            const UserData = await AsyncStorage.getItem('userData');
            // console.log(UserData)

            // Make a request to get user tasks with the JWT token in the headers
            const response = await axios.get(`${URL}/all-recipes`, {
                headers: {
                    headers: { 'Content-Type': 'application/json' }
                }
            });
            console.log("response:", response.data)

            // setCurrentUserName(userName)
            setRecipes(response.data.reverse());
            setIsLoading(false);

        } catch (error) {
            console.log(error.response)

            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Failed to load Recipes. Please try again later.');
            };
        }
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Text style={styles.smallText}>Hi Amie</Text>
                        <Text style={styles.headerText} >What would you love to cook today?</Text>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search recipes"
                        />
                    </View>

                    {
                        isLoading ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : (

                            <ScrollView ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    recipes.map((recipeData, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => navigation.navigate('RecipeDetails', { recipe: recipeData })
                                            }>
                                            <View
                                                style={styles.reciCotianer}

                                            >
                                                <Image
                                                    style={styles.reciImage}
                                                    source={{ uri: recipeData.image }}
                                                    resizeMode="cover"
                                                />
                                                <View style={styles.reciDetails}>
                                                    <Text style={styles.reciTitle}>{recipeData.title}</Text>

                                                    <View style={styles.subContainer}>
                                                        <View style={styles.minServing}>
                                                            <Feather name="clock" size={16} color="black" />
                                                            <Text>{recipeData.minute} min</Text>
                                                        </View>

                                                        <View style={styles.minServing}>
                                                            <MaterialCommunityIcons name="food-takeout-box-outline" size={17} color="black" />
                                                            <Text>{recipeData.serving} Servings</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }

                            </ScrollView>
                        )
                    }

                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        // backgroundColor: '#fff'
    },
    header: {
        gap: 5,
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%'
    },
    bigText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    reciImage: {
        width: "30%",
        height: 100,
        borderRadius: 20,
    },
    reciCotianer: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: '#F5F7F8',
        borderRadius: 10
    },
    reciDetails: {
        padding: 20,
        gap: 10
    },
    reciTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },

    minServing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    subContainer: {
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        gap: 10
    },

    searchInput: {
        backgroundColor: '#F5F7F8',
        padding: 13,
        marginVertical: 20,
        borderRadius: 15
    }
})
export default HomeScreen;