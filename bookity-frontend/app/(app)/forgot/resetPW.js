import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { API_BASE } from '../../../services/config'; 

import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter, useLocalSearchParams } from 'expo-router'; // ✅ ADD THIS

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function resetPW() {

    const router = useRouter();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { identifier } = useLocalSearchParams(); // this is the email/phone

    const submitReset = async () => {
        // check if passwords match
        if (input.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long!');
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/auth/forgot-password/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: identifier,
                    newPassword: input,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Password reset successful:', data.message);
                router.push({
                    pathname: './resetSuccess'
                });
            } else {
                console.error('❌ Error resetting password:', data.error);
                Alert.alert('Error', data.error || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            Alert.alert('Network error', 'Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (name, value) => {
        setInput(value);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Reset the password for {identifier}</Text>
            <View style={styles.resetContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    onChangeText={(value) => handleChange('password', value)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Reenter new password"
                    onChangeText={(value) => handleChange('password2', value)}
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity 
                style={[styles.button, loading && { opacity: 0.7 }]} 
                disabled={loading}
                onPress={submitReset}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#333' }]} 
                onPress={() => router.back()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
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
    button: { 
        width: '100%', 
        height: 50, 
        backgroundColor: '#5ED2AA', 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 6, 
        marginBottom: 12 
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 18 
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
    or: {
        marginBottom: 15,
    },
    resetContainer: {
        marginBottom: 50,
    },
    subtitle: { 
        fontSize: 14, 
        color: '#444', 
        marginBottom: 50, 
        textAlign: 'center' 
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 120,
        marginBottom: 100
    },
    vendorText: {
        marginRight: 10,
    },
});
