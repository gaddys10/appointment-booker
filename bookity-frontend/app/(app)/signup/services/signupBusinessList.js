import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { Dimensions } from 'react-native';
import BookingsOrganization from '../../bookings/components/bookings-organization';
import * as SecureStore from 'expo-secure-store';
const screenWidth = Dimensions.get('window').width;
import { useEffect, useState } from 'react';

export default function Organizations(){

    const router = useRouter(); // ✅ Create router object
    const params  = useLocalSearchParams(); // ✅ Get the params from the URL
    const [token, setToken] = useState(null);
    const [businesses, setBusinesses] = useState([]);

    const checkToken = async () => {
        const token = await SecureStore.getItemAsync('bookity_access');
        console.log('User Token:', token);
        setToken(token);
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log('current user response:', data);
        } catch (err) {
            console.error('fetch current user error:', err);
        }
    };

    const fetchBusinesses = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/businesses/mine', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log('businesses response:', data);
            setBusinesses(data.items || []);
        } catch (err) {
            console.error('fetch businesses error:', err);
        }
    };
    
    useEffect(() => {
        checkToken();
    }, []);
    
    useEffect(() => {
        if(!token) return;
        console.log('token state changed:', token);
        // fetchCurrentUser();
        fetchBusinesses();
    }, [token]);
    
    // rehydrate your formData
    // const formData = {
    //     email:       params.email,
    //     phone:       params.phone,
    //     password:    params.password,
    //     offersServices: params.isProvider === 'true',
    //     firstName:  params.firstName,
    //     lastName:   params.lastName,
    // };

    return(
        <ScrollView style={orgStyle.container}>
            <View style={orgStyle.headerContainer}>
                <TouchableOpacity style={orgStyle.backArrow}  onPress={() => router.push('/signup/verification-complete')}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/dashboard')} style={orgStyle.saveButton}>
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>Continue</Text>
                    <Ionicons name="checkmark" size={16} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={orgStyle.header}>My Businesses</Text>
            <Text style={orgStyle.selectOrg}>Select Business</Text>

            {businesses.map((business) => (
                <BookingsOrganization
                    key={business._id}
                    orgName={business.name}
                    orgType={business.type}
                    orgAddress={business.address}
                    routerAddress="/signup/services/signup-business-info"
                />
            ))}

            <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push('signup/services/signup-create-business')}>
                <View style={orgStyle.contentContainer}>
                    <Text style={orgStyle.addBusinessLabel}>Add New Business</Text>
                </View>
                <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                    <Ionicons name='chevron-forward' size={22} color="black" />
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const orgStyle = StyleSheet.create({
    addBusinessLabel: {
        fontSize: 16,
        marginTop: 38,
        marginLeft: 15,
        color: '#333',
        fontWeight: 'bold',
    },
    addr: {
        fontSize: 12,
        marginLeft: 10,
    },
    advanced: {
        fontSize: 16,
        color:'#5ED2AA',
    },
    advancedContainer:{
        alignItems:'flex-end',
    },
    BookingsOrganization: {
        marginLeft: 20,
    },
    container:{
        flex: 1,
        backgroundColor: '#E3FAEC',
    },
    header:{
        fontSize: 24,
        marginTop: 20,
        marginLeft: 5,
        color: '#333',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: 75,
        width: screenWidth,
        backgroundColor: '#fff'
    },
    iconContainer: {
        height: 75,
        width: 75,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 12,
        borderColor: '#ccc',
        backgroundColor: '#000',
    },
    optionContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: screenWidth - 20,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
    orgOption:{
        fontSize: 16,
        marginTop: 30,
        marginLeft: 25,
        color: '#333',
        // textDecorationLine: 'underline',
    },
    orgOption1:{
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        color: '#333',
        textDecorationLine: 'underline',
    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#5ED2AA',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        width: screenWidth - 280,
        height: 40,
        // marginLeft: 20
    },
    searchBox:{
        height: 50,
        width:300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 20,
        marginBottom: 20,
    },
    selectButton:{
        marginLeft: 'auto',   // <-- this is the “sticky right” part
        justifyContent: 'center',
        alignItems: 'center',
        width: 32, 
    },
    selectOrg:{
        fontSize: 16,
        marginTop: 20,
        marginLeft: 5,
        color: '#333',
        fontWeight: 'bold',
    },
    type: {
        fontSize: 12,
        marginTop: 2,
        marginLeft: 10,
        color: '#333',
    }
})