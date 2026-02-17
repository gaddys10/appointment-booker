import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_BASE } from '../services/config';

export default function Bookity() {

    const router = useRouter();

    // state for email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSignIn() {
        try {
            setError('');

            console.log('Login Pressed: 🔑 Attempting login with', { email, password });
            // send login request to backend
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // parse response
            const data = await res.json().catch(() => ({}));

            console.log('Login response:', res.status, data);

            // handle errors
            if (!res.ok) {
                setError(data?.error || 'Login failed');
                return;
            }
            // Store tokens (React Native path)
            if (data?.tokens?.access) {
                await SecureStore.setItemAsync('bookity_access', data.tokens.access);
            }
            if (data?.tokens?.refresh) {
                await SecureStore.setItemAsync('bookity_refresh', data.tokens.refresh);
            }
            // Optional: store minimal user
            if (data?.user) {
                await SecureStore.setItemAsync('bookity_user', JSON.stringify(data.user));
            }

            // navigate to dashboard
            router.push('./(tabs)/dashboard');

            // you can also log success
            console.log('✅ Login successful', data);
        } catch (e) {
            setError(e.message || 'Network error');
        }
    }

    return (
        <View style={bStyles.container}>
            <Image source={require('../assets/bb222.png')} style={bStyles.logo} />

            <TextInput 
                style={[bStyles.box, bStyles.email]} 
                placeholder="E-mail"
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                style={[bStyles.box, bStyles.password]} 
                secureTextEntry={true} 
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />

            {!!error && <Text style={{ color: 'crimson', marginBottom: 8 }}>{error}</Text>}

            <TouchableOpacity 
                onPress={() => {
                    console.log('Forgot password? pressed')
                    router.push('./(app)/forgot/forgotPW')
                }} 
                    style={bStyles.forgotContainer}
            >
                <Text style={bStyles.forget}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={handleSignIn}>
                <Text style={bStyles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={() => {
                console.log('Sign in with Google pressed')
                router.push('/(tabs)/dashboard');
            }}>
                <Text style={bStyles.loginButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={() => {
                console.log('Sign Up pressed')
                router.push('./signup/sign-up-enter-name');
            }}>
                <Text style={bStyles.loginButtonText}>Sign Up </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
        
    );
}

const bStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3FAEC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    email: {
        height: 50,
        width:300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    forgotContainer: {
        width: 300,
        alignItems: 'flex-end',
        marginBottom: 10
    },
    forget: {
        textDecorationLine: 'underline',
        alignItems: 'flex-end',
        color:'#1B2A4E'

    },
    password: {
        height: 50,
        width:300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    logo:{
        height: 290,
        resizeMode: 'contain'
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
});