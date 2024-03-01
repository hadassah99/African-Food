import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import ProfileSreen from "../screens/ProfileSreen";
import AddRecipe from "../screens/AddRecipe";
import SignupScreen from "../screens/SignupScreen";

import SigninScreen from "../screens/SigninScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import PasswordUpdateScreen from '../screens/PasswordUpdateScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function AppNavigator(){
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
                <AuthStack.Screen
                    name="SignIn"
                    component={SigninScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="UpdatePasword"
                    component={PasswordUpdateScreen}
                    options={{
                        headerShown: false
                    }}
                />
                
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'AddRecipe') {
                        iconName = 'add-circle';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#FFA576',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    headerShown: false
                }}
            />
            
            <Tab.Screen 
            name="AddRecipe" 
            component={AddRecipe}
            options={{
                headerTitleAlign: 'center',
                title: 'New Recipe',
                tabBarOpions: {activeTinColor: 'orange',
            },
            }} 
            />
            <Tab.Screen 
            name="Profile" 
            component={ProfileSreen}
            options={{
                headerTitleAlign: 'center'
            }} 
            />
        </Tab.Navigator>
    );
};

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
                title: 'Home Screen',
                animation: 'none',
                headerBackTitleVisible: true,
                headerShown: false,
            }}
        />
        <HomeStack.Screen
            name="AddRecipe"
            component={AddRecipe}
            options={{
                title: 'Create Recipe',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />

    <HomeStack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen}
            options={{
                title: '',
                animation: 'none',
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerShadowVisible: false
            }}
        />
    </HomeStack.Navigator>
);

export default AppNavigator;