import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router'; // ✅ ADD THIS

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignUp() {
    const router = useRouter(); // ✅ Create router object

    //Create sign up form state
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
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
            const res = await fetch('http://192.168.0.2:3000/api/auth/request-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    isProvider: formData.offersServices
                })
            });
        
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            router.push('./verify');
        } catch (err) {
            Alert.alert('Signup Error', err.message);
        }
        console.log('Form submitted:', formData);

        // Add your form submission logic here
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.bodyContainer}>

                <Text style={styles.title}>Sign Up</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />
                <Text style={styles.or}> or </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="oneTimeCode"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    textContentType="oneTimeCode"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
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
                    // router.push('./verify')
                }}>
                    <Text style={styles.loginButtonText}>Verify Account </Text>
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E3FAEC',
    },
    bodyContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: screenHeight - 250,
        //move this to the top
        marginTop: -110
    },
    or: {
        marginBottom: 15,
    },
    vendorText: {
        marginRight: 10,
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
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 140
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        width: screenWidth - 40,
        height: 40
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});
