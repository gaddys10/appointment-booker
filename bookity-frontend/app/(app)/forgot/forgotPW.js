import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE } from '../../../services/config'; 

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// const API_BASE = process.env.API_BASE || 'http://localhost:3000';

export default function ForgotPW() {

    const router = useRouter();
    const [input, setInput] = useState('');

    // loading state
    const [loading, setLoading] = useState(false);

    const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
    const isValidPhone = (s) => /^\+?[1-9]\d{1,14}$/.test(s.trim());

    const onSubmit = async () => {

        //accepting and formatting form value
        const value = input.trim();

        //base case validation
        if (!isValidEmail(value) && !isValidPhone(value)) {
            Alert.alert('Invalid phone number or email', 'Please enter a valid email address or phone number.');
            return;
        }

        try {
            // show loading indicator
            setLoading(true);

            const body = isValidEmail(value) ? { email: value } : { phone: value };
            // send request to backend to verify email/phone exists and send reset link
            const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            
            // parse response
            if (res.ok) {
                router.push('/(app)/forgot/forgotPWCode');
            }

            

            // show success message if request was successful
        } catch (e) {
            // Same message to avoid enumeration
            // Alert.alert(
            //     'Check your inbox',
            //     'If that account exists, a reset link has been sent.'
            // );
            Alert.alert(
                'Account doesn\'t exist',
                'There is no account associated with that email or phone number.'
            );
        } finally {
            // hide loading indicator
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot your password?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email or phone number"
                keyboardType="email-address"
                autoCapitalize="none"
                value = {input}
                onChangeText={setInput}
            />

            <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                    console.log('Back to Sign In pressed')
                    router.push('/')
                }}>
                <Text style={styles.buttonText}>
                    Back to Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E3FAEC',
    },
    title: {
        fontSize: 32,
        marginBottom: 50,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#5ED2AA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});