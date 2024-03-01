import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { TextInput, Button, } from 'react-native-paper';
import { URL } from '../constants';
import axios from 'axios';

function AddRecipe({ navigation }) {
    const [title, setTitle] = useState('');
    const [directions, setDirections] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState('');
    const [minute, setMinute] = useState('');
    const [serving, setServing] = useState('');

    const handleSubmit = async () => {
        // Package the form data and submit it
        const recipeData = {
            title,
            directions,
            ingredients,
            image,
            minute: parseInt(minute, 10),
            serving: parseInt(serving, 10),
            user_id: 1
        };

        try {
            const response = await axios.post(`${URL}/recipe`, recipeData)
            console.log('Recipe created successfully:', response.data);
            Alert.alert('Success', 'Recipe created successfully');

            navigation.navigate('HomeStack');

        } catch (error) {
            console.error('Error creating Recipe:', error);
            Alert.alert('Error', 'Failed to create Recipe');
        };
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"
                />
                <TextInput
                    label="Directions"
                    value={directions}
                    onChangeText={(text) => setDirections(text)}
                    placeholder="Cook spaghetti according to package instructions. In a skillet, cook pancetta until crispy. ..."
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"

                />
                <TextInput
                    label="Ingredients"
                    value={ingredients}
                    onChangeText={(text) => setIngredients(text)}
                    placeholder="200g spaghetti, 100g pancetta, 2 large eggs, ..."
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"
                />
                <TextInput
                    label="Image URL"
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"
                />
                <TextInput
                    label="Prep Time"
                    value={minute}
                    onChangeText={(text) => setMinute(text)}
                    keyboardType="numeric"
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"
                />
                <TextInput
                    label="Servings"
                    value={serving}
                    onChangeText={(text) => setServing(text)}
                    keyboardType="numeric"
                    style={styles.input}
                    mode='outlined'
                    outlineColor="#eee"
                    activeOutlineColor="#FC6736"
                />
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    // loading={true}
                    buttonColor="#FC6736"
                >
                    Add
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default AddRecipe;