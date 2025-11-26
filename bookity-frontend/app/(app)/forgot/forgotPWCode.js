import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API_BASE } from '../../../services/config'; 

const ForgotPWCode = () => {
    const router = useRouter();
    const { identifier, securityCode } = useLocalSearchParams(); // this is the email/phone
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(['', '', '', '', '', '']);
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

     // ✅ Check if all 6 digits are filled
    useEffect(() => {
        const allFilled = code.every(digit => digit !== '');

        
        if (!allFilled) return;

        if (code.join('') !== securityCode){
            Alert.alert('Invalid code', 'The verification code you entered is incorrect. Please try again.');
            //clear code inputs
            setCode(['', '', '', '', '', '']);
            inputs.current[0].focus();
            return;
        }

        // const otp = code.join('');
        const submitPWReset = async () => {
            try {
                //verify if it's the correct code

                // take user to reset password page
                console.log('Reset password security code verified'); // ideally includes userId or token

                router.push({
                    pathname: './resetPW',
                    params: { identifier }
                });
            } catch (error) {
                console.error('Error verifying code:', error);
                Alert.alert('Network error', 'Please try again.');
            }
        };
            // ✅ Navigate to verification-complete page
            
        submitPWReset();
    }, [code]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to verify the code
        console.log('Code submitted:', code);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>A code has been sent to {identifier}</Text>
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
        paddingLeft: 15,
        marginBottom: 35
    },
    title: { 
        fontSize: 32, 
        fontWeight: '600', 
        marginBottom: 25, 
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
        marginBottom: 12,
        paddingLeft: 10
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