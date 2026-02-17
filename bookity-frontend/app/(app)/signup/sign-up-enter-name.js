import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router'; // ✅ ADD THIS
import { API_BASE } from '../../../services/config'; 

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignUpEnterName() {
    const router = useRouter(); // ✅ Create router object

    //Sign up form state
    const [nameData, setNameData] = useState({
        firstName: '',
        lastName: '',
    });

    //Function to handle form state on change
    const handleChange = (name, value) => {
        setNameData({
            ...nameData,
            [name]: value,
        });
    };

    //Function to handle sign up submission
    const handleNameSubmit = async() => {
        try {
            // If the response is ok, navigate to the verification screen & pass name
            router.push({
                pathname: './sign-up-credentials',
                params: {
                    firstName: nameData.firstName,
                    lastName: nameData.lastName,   
                },
            })
            console.log('Name submitted:', nameData);
        } catch (err) {
            Alert.alert('Signup Error', err.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.bodyContainer}>

                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter Name</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name*"
                    value={nameData.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name*"
                    value={nameData.lastName}
                    onChangeText={(value) => handleChange('lastName', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />

                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    console.log('Next button from name to sign up credentials pressed')
                    handleNameSubmit();
                }}>
                    <Text style={styles.loginButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        height: 40,
        width: 40,
    },
    bodyContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: screenHeight - 250,
        //move this to the top
        marginTop: -110
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E3FAEC',
    },
    loginButton: {
        backgroundColor: '#5ED2AA', // Bookity blue?
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: 300,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 35,
        fontSize: 16,
        backgroundColor: '#fff',
        width: screenWidth - 40,
        height: 40
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    or: {
        marginBottom: 15,
    },
    subtitle: {
        alignSelf: 'flex-start',
        marginBottom: 7,
        fontSize: 24,
        fontWeight: '500',
        marginTop: 100,
        marginBottom: 50
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 112
    },
    vendorText: {
        marginRight: 10,
    },
});
