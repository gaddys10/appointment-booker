import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { API_BASE } from '../../../services/config'; 


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Verify() {
    const router = useRouter(); // ✅ Create router object
    const params = useLocalSearchParams(); // ✅ Get the params from the URL

    const [code, setCode] = useState(['', '', '', '', '', '']);

    const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
    const LOCAL_BASE = 'http://localhost:3000';

    // Create a ref to store the input elements
    // This will allow us to focus on the next input when the user types a digit
    const inputs = useRef([]);

    // Create a function to handle the change in the input fields
    // When the user types a digit, we update the code state and focus on the next input
    // If the user deletes a digit, we focus on the previous input
    // We also check if all 6 digits are filled and if so, we submit the form
    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length > 0 && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };
    
    // Create a function to handle the key press event
    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    // rehydrate your formData
    const formData = {
        email:       params.email,
        phone:       params.phone,
        password:    params.password,
        offersServices: params.isProvider === 'true',
    };

     // ✅ Check if all 6 digits are filled
    useEffect(() => {
        const allFilled = code.every(digit => digit !== '');
        if (!allFilled) return;

        console.log(params.securityCode);
        const otp = code.join('');

        if (otp !== params.securityCode){
            Alert.alert('Invalid code', 'The verification code you entered is incorrect. Please try again.');
            //clear code inputs
            setCode(['', '', '', '', '', '']);
            inputs.current[0].focus();
            return;
        }

        const submitSignUp = async () => {
            // Create account
            try {
                console.log("otp:", otp);
                const res = await fetch(`${LOCAL_BASE}/api/auth/sign-up`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email:  formData.email,
                        phone: formData.phone,
                        password: formData.password,
                        isProvider: formData.offersServices,
                        code: otp
                    })
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log('Signup failed:', res.status, data);
                    Alert.alert('Signup failed', data?.error || 'Please try again.');
                    return; // don't navigate
                }
                console.log('User created:', data); // ideally includes userId or token

                router.push('./verification-complete');
            } catch (error) {
                console.error('Error creating account:', error);
                Alert.alert('Network error', 'Please try again.');
            }
        };
            // ✅ Navigate to verification-complete page
            
        submitSignUp();
    }, [code]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Verify Account</Text>
                <Text> A code was sent to phone number or email and expires in 15 minutes</Text>
                <View style={styles.twofaContainer}>
                    {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => inputs.current[index] = ref}
                                style={styles.twofa}
                                keyboardType="number-pad"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={text => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                value={digit}
                            />
                        ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E3FAEC',
    },
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight - 250,
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
        marginBottom: 10

    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    twofaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
    },
    
    twofa: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 60,
        width: 40,
        marginHorizontal: 5,
        paddingLeft: 15 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        width: screenWidth - 40
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
