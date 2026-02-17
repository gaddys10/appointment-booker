import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { useState } from 'react'; 

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function VerificationComplete() {
    const router = useRouter();
    const params  = useLocalSearchParams();
    
    // Signed in user data
    const formData = {
        email:       params.email,
        phone:       params.phone,
        offersServices: params.isProvider === 'true',
        firstName:  params.firstName,
        lastName:   params.lastName,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.message}>You have successfully activated your account.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push({
                    pathname: '/(tabs)/dashboard'
                })}
            >
                <Text style={styles.buttonText}>Continue to Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push({
                    pathname: '/signup/services/signupBusinessList'
                })}
            >
                <Text style={styles.buttonText}>Register Business and Services</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5ED2AA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E3FAEC',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
});