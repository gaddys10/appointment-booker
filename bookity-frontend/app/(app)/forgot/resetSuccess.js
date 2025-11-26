import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API_BASE } from '../../../services/config'; 

const ResetSuccess = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Reset Successful!</Text>
            <Text style={styles.message}>Your password has been successfully reset. You can now log in with your new password.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Go to Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ResetSuccess;