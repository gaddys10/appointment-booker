import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Bookity() {

    const router = useRouter();

    return (
        <View style={bStyles.container}>
            <Image source={require('../assets/bb222.png')} style={bStyles.logo} />

            <TextInput style={[bStyles.box, bStyles.email]} placeholder="E-mail"/>

            <TextInput style={[bStyles.box, bStyles.password]} secureTextEntry={true}kjn placeholder="Password"/>

            <TouchableOpacity onPress={() => console.log('Forgot password? pressed')} style={bStyles.forgotContainer}>
                <Text style={bStyles.forget}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={() => {
                console.log('Sign in pressed');
                router.push('./(tabs)/dashboard');
            }}>
                <Text style={bStyles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={() => {
                console.log('Sign in with Google pressed')
                router.push('/(tabs)/dashboard');
            }}>
                <Text style={bStyles.loginButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bStyles.loginButton} onPress={() => {
                console.log('Get Started for Free pressed')
                router.push('./signup/sign-up')
            }}>
                <Text style={bStyles.loginButtonText}>Get started for free </Text>
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