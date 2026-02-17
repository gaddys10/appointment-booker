import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams} from 'expo-router';
import { API_BASE } from '../../../services/config'; 
import * as SecureStore from 'expo-secure-store'; // Import SecureStore for secure storage

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignUp() {
    const router = useRouter();
    const params  = useLocalSearchParams();

        // rehydrate your formData
    const name = {
        firstName:  params.firstName,
        lastName:   params.lastName,
    };

    //Create sign up form state
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        firstName: params.firstName,
        lastName: params.lastName,
        password: '',
        confirmPassword: '',
        offersServices: false,
    });

    //Create a function to handle form state on change
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //Create a function to handle sign up submission
    const handleSubmit = async() => {

        // Make sure email and phone are provided
        if (!formData.email && !formData.phone) {
            Alert.alert('Error', 'Email or phone number is required!');
            return;
        }

        // Make sure passwords match
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        try {
            // Send a POST request to the server to generate a verification code
            const res = await fetch(`${API_BASE}/api/auth/sign-up/request-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    isProvider: formData.offersServices,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                })
            });
        
            // Capture response data
            const data = await res.json();
            console.log('Verification code POST response:', data);

            // Check if response is ok
            if (!res.ok) throw new Error(data.error);

            // ✅ Save password temporarily in SecureStore so it doesn't travel via route params / URLs
            await SecureStore.setItemAsync('bookitySignupPassword', formData.password);

            // If the response is ok, navigate to the verification screen & pass entire user data WITHOUT pw
            router.push({
                pathname: './verify',
                params: {
                    email: formData.email,
                    phone: formData.phone,

                    // remove password & keep from leaking into params
                    // password: formData.password,
                    isProvider: formData.offersServices ? 'true' : 'false',
                    securityCode: data.message,
                    firstName: formData.firstName,
                    lastName: formData.lastName,   
                },
            })
            
        } catch (err) {
            Alert.alert('Signup Error', err.message);
        }
        console.log('User account form submitted:', formData);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.bodyContainer}>

                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.intro}>Nice to meet you, {name.firstName} {name.lastName}</Text>

                <Text style={styles.subtitle}>Enter Email or Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email*"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />
                
                <Text style={styles.subtitle}>Enter Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password*"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    textContentType="oneTimeCode"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Reenter Password*"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    textContentType="oneTimeCode"
                    secureTextEntry
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.vendorText}>I want to offer services and accept bookings </Text>
                    <Switch
                        value={formData.offersServices}
                        onValueChange={(value) => handleChange('offersServices', value)}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    console.log('Verify Account pressed')
                    handleSubmit();
                }}>
                    <Text style={styles.loginButtonText}>Verify Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 40,
        width: 40,
        left: 20,
        position: 'absolute',
        top: 20,
        zIndex: 1,
    },
    bodyContainer: {
        height: screenHeight - 250,
        marginTop: -110,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        padding: 20,
        backgroundColor: '#E3FAEC',
        flex: 1,
    },
    loginButton: {
        width: 300,
        marginTop: 15,
        paddingVertical: 14,
        paddingHorizontal: 30,
        alignItems: 'center',
        backgroundColor: '#5ED2AA', // Bookity blue?
        borderRadius: 12,
        elevation: 3, //Android only style? 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    input: {
        height: 40,
        marginBottom: 15,
        width: screenWidth - 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
    },
    intro: {
        marginBottom: 10,
        marginTop: 30,
        fontSize: 16,
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
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    title: {
        marginBottom: 30,
        marginTop: 112,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    vendorText: {
        marginRight: 10
    },
});
