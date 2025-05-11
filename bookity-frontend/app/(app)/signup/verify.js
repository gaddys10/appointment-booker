import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router'; // ✅ ADD THIS

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Verify() {
    const router = useRouter(); // ✅ Create router object

    
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const inputs = useRef([]);

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length > 0 && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

     // ✅ Check if all 6 digits are filled
    useEffect(() => {
        const allFilled = code.every(digit => digit !== '');
        if (allFilled) {
            // ✅ Navigate to verification-complete page
            router.push('./verification-complete');
        }
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
