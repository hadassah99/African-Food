import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';


const RecipeDetailsScreen = ({ route }) => {
    const { recipe } = route.params;

    // Split ingredients into an array for display
    const ingredientsArray = recipe.ingredients.split(', ');

    // Split directions into an array for display
    const directionsArray = recipe.directions.split('. ');

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.reciImageContainer}>
                    <Image
                        style={styles.reciImage}
                        source={{ uri: recipe.image }}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.reciDetails}>
                    <Text style={styles.title}>{recipe.title}</Text>

                    <View style={styles.subContainer}>
                        <View style={styles.minServing}>
                            <Feather name="clock" size={19} color="black" />
                            <Text>{recipe.minute} minutes</Text>
                        </View>

                        <View style={styles.minServing}>
                            <MaterialCommunityIcons name="food-takeout-box-outline" size={21} color="black" />
                            <Text>{recipe.serving} Servings</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>Ingredients:</Text>
                    <View>
                        {ingredientsArray.map((ingredient, index) => (
                            <Text key={index} style={styles.listItem}>
                                • {ingredient}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.subtitle}>Directions:</Text>
                    <View>
                        {directionsArray.map((step, index) => (
                            <Text key={index} style={styles.listItem}>
                                {index + 1}. {step}
                            </Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 8,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    listItem: {
        marginLeft: 16,
        marginBottom: 4,
    },

    reciDetails: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    reciImageContainer: {
        // height: "40%",
        width: "100%",
    },
    reciImage: {
        width: "100%",
        // height: "100%",
        height: 250,
    },

    minServing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    subContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        gap: 50
    }
});

export default RecipeDetailsScreen;