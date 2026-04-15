import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const screenWidth = Dimensions.get('window').width;

const Services = () => {
    const router = useRouter(); // ✅ Create router object
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState([]);

    const handleAddBusiness = async () => {
        const token = await SecureStore.getItemAsync('bookity_access');
        if (!token) {
            Alert.alert('Error', 'Not logged in');
            return;
        }

        const payload = {
            name: businessName,
            description,
            type: businessType,
            address,
            services: services.map(s => ({
                name: s.name,
                description: s.description,
                priceCents: s.price * 100,
                durationMinutes: s.durationMinutes || 60,
            }))
        };

        try {
            const res = await fetch('http://localhost:3000/api/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                Alert.alert('Success', 'Business created successfully');
                router.push('/signup/services/signupBusinessList');
            } else {
                const error = await res.json();
                Alert.alert('Error', error.error || 'Failed to create business');
                console.log(error);
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Network error');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#E3FAEC' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrow}  onPress={() => router.push('/signup/services/signupBusinessList')}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddBusiness} style={styles.saveButton}>
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>Save</Text>
                    <Ionicons name="checkmark" size={16} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Business Information</Text>

                <View style={styles.photoContainer}>
                    <View style={{ width: 100, height: 100, backgroundColor: '#ccc', borderRadius: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}></View>
                    <Text style={styles.photoText}>Update Photo</Text>
                </View>

                <Text style={styles.selectOrg}>Business Name</Text>
                <TextInput style={styles.box} placeholder='Enter Business Name..' value={businessName} onChangeText={setBusinessName}></TextInput>
                
                <Text style={styles.selectOrg}>Business Location</Text>
                <TextInput style={styles.box} placeholder='Enter Business Address..' value={address} onChangeText={setAddress}></TextInput>
                
                <Text style={styles.selectOrg}>Business Type</Text>
                <TextInput style={styles.box} placeholder='Enter Business Type..' value={businessType} onChangeText={setBusinessType}></TextInput>

                <Text style={styles.selectOrg}>Business Description</Text>
                <TextInput 
                    style={styles.dbox} 
                    placeholder='Enter Business Description..' 
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                    >
                </TextInput>

                <Text style={styles.secondTitle}>Business Services</Text>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push('/signup/services/edit-service')}
                >                    
                    <View>
                        <Text style={styles.name}>Add Service</Text>
                    </View>
                    <View style={styles.selectButton}  onPress={() => router.back()}>
                        <Ionicons name='pencil' size={24} color="black" />
                    </View>
                </TouchableOpacity>
                
                {services.map((service, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => router.push('/signup/services/edit-service')}>
                        <View>
                            <Text style={styles.name}>{service.name}</Text>
                            <Text style={styles.description}>{service.description}</Text>
                            <Text style={styles.price}>Price: ${service.price}</Text>
                            <Text style={styles.price}>Duration: {service.durationMinutes} minutes</Text>
                        </View>
                        <View style={styles.selectButton}  onPress={() => router.back()}>
                            <Ionicons name='pencil' size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                ))}


                <Text style={styles.secondTitle}>Business Hours</Text>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Sunday</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Monday</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Tuesday</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Wednesday</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Thursday</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Friday</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
                <View style={styles.dayContainer}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.daytext}>Saturday</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
                        <TextInput style={styles.hours} placeholder='' />
                        <Text style={styles.daytext}>to</Text>
                        <TextInput style={styles.hours} placeholder='' />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backArrow: {
        marginBottom: 10,
        marginLeft: -5
    },
    box: {
        height: 40,
        width:350,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 5
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E3FAEC',
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // 👈 new: push content to the right
        alignItems: 'center',       // 👈 new: vertically align everything nicely
        marginBottom: 5,
        gap: 6,                     // 👈 optional: add some spacing between elements
    },
    daytext: {
        fontSize: 16,
        marginTop: -12,
        marginHorizontal: 5
    },
    dbox: {
        height: 120,
        width:350,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 5
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: 50,
    },
    hours: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    photoContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
        alignContent: 'center',
    },
    photoText: {
        fontSize: 16,
        marginBottom: 40,
        marginTop: 30,
        marginLeft: 30,
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        width: screenWidth - 300,
        height: 40,
    },
    secondTitle: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
    },
    selectOrg: {
        fontSize: 18,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    }
});

export default Services;
