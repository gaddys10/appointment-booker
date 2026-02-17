import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { API_BASE } from '../../../services/config'; 
import * as SecureStore from 'expo-secure-store';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// This is where user actually logs in upon sign up 
export default function Verify() {
    const router = useRouter(); // ✅ Create router object

    const params  = useLocalSearchParams(); // ✅ Get the params from the URL

    const [code, setCode] = useState(['', '', '', '', '', '']);

    const [signupPassword, setSignupPassword] = useState(null); // ✅ will hold the temp password

    // Fetch the temp password from secure store
    useEffect(() => {
        // Fetch the temp password from secure store via async function returning a promise
        (async () => {
            // ✅ Pull the temp password from SecureStore (created on the previous screen)
            const pw = await SecureStore.getItemAsync('bookitySignupPassword');
            setSignupPassword(pw); // pw can be null if something went wrong
        })();
    }, []);

    const LOCAL_BASE = 'http://localhost:3000';

    // Create a ref to store the input elements so we can focus on next input on type
    const inputs = useRef([]);

    // function to handle input field change
    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length > 0 && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };
    
    // function to handle the key press event
    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

     // Check if all 6 digits are filled
    useEffect(() => {
        if (!signupPassword) return; // ✅ wait until password is loaded
        const allFilled = code.every(digit => digit !== '');
        if (!allFilled) return;

        console.log("Security Code: " + params.securityCode);

        const codeEntered = code.join('');
        console.log("Code Entered: " + codeEntered);

        // if (codeEntered !== params.securityCode){
        //     Alert.alert('Invalid code', 'The verification code you entered is incorrect. Please try again.');
        //     //clear code inputs
        //     setCode(['', '', '', '', '', '']);
        //     inputs.current[0].focus();
        //     return;
        // }

        const submitSignUp = async () => {
            // Create account
            try {
                const res = await fetch(`${LOCAL_BASE}/api/auth/sign-up`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email:  params.email,
                        phone: params.phone,
                        password: signupPassword, // Use the temp password we fetched earlier
                        isProvider: params.offersServices,
                        code: codeEntered
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    console.log('Signup failed:', res.status, data);
                    Alert.alert('Signup failed', data?.error || 'Please try again.');
                    return; // don't navigate
                }

                console.log('User created:', data); // ideally includes userId or token

                // 🔒 Pull token & user off the response (adjust keys to match your API)
                const token = data.tokens
                const user = data.user

                if (!token) {
                    console.warn('No token returned from sign-up response:', data);
                    Alert.alert(
                        'Signup error',
                        'Account created but no login token was returned. Please try logging in manually.'
                    );
                    return;
                } else {
                    try {
                        // ✅ Persist token (and optionally user) for login persistence
                        await SecureStore.setItemAsync('bookity_access', token.access);
                        if (user) {
                            await SecureStore.setItemAsync('bookity_user', JSON.stringify(user));
                        }

                        console.log('Token saved to SecureStore'); 
                    } catch (storageError) {
                        console.error('Error saving auth token:', storageError);
                        // not fatal, but good to know
                    }
                }

                // ✅ cleanup: delete the temp password now that signup succeeded
                await SecureStore.deleteItemAsync('bookitySignupPassword');
                
                router.push({
                    pathname: './verification-complete'
                });
            } catch (error) {
                console.error('Error creating account:', error);
                Alert.alert('Network error', 'Please try again.');
            }
        };
            // ✅ Navigate to verification-complete page
            
        submitSignUp();
    }, [code, signupPassword]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.label}>Alright, one last step</Text>
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
        height: screenHeight - 420,
    },
    vendorText: {
        marginRight: 10,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 60,
        textAlign: 'center',
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
