import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE } from '../../../services/config'; 

const ForgotPWCode = () => {
    const [code, setCode] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to verify the code
        console.log('Code submitted:', code);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text>A verification code has been sent to your email/phone number.</Text>
            <Text style={styles.subtitle}>
                A verification code has been sent to your email/phone number.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter code"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={8}
            />

            <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#333' }]} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20, 
        backgroundColor: '#E3FAEC' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: '600', 
        marginBottom: 8, 
        textAlign: 'center' 
    },
    subtitle: { 
        fontSize: 14, 
        color: '#444', 
        marginBottom: 16, 
        textAlign: 'center' 
    },
    input: { 
        width: '100%', 
        height: 50, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5, 
        addingHorizontal: 10, 
        backgroundColor: '#fff', 
        marginBottom: 12 
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
    }
});

export default ForgotPWCode;