import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Services = () => {
    // Static list of business offerings
    const services = [
        { id: 1, name: 'Haircut', description: 'Professional haircut services.', price: 25 },
        { id: 2, name: 'Massage Therapy', description: 'Relaxing massage therapy sessions.', price: 50 },
        { id: 3, name: 'Manicure', description: 'Nail care and manicure services.', price: 20 },
    ];

    const router = useRouter(); // ✅ Create router object

    return (

        <View style={{ flex: 1, backgroundColor: '#E3FAEC' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrow}  onPress={() => router.push('/signup/services/business-list')}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/signup/services/business-list')} style={styles.saveButton}>
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
                <TextInput style={styles.box} placeholder='Enter Business Name..'></TextInput>
                
                <Text style={styles.selectOrg}>Business Location</Text>
                <TextInput style={styles.box} placeholder='Enter Business Address..'></TextInput>
                
                <Text style={styles.selectOrg}>Business Type</Text>
                <TextInput style={styles.box} placeholder='Enter Business Type..'></TextInput>

                <Text style={styles.selectOrg}>Business Description</Text>
                <TextInput 
                    style={styles.dbox} 
                    placeholder='Enter Business Description..' 
                    multiline={true}
                    >
                </TextInput>

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
                


                <Text style={styles.secondTitle}>Business Services</Text>
                {services.map((service) => (
                    <TouchableOpacity key={service.id} style={styles.card} onPress={() => router.push('/signup/services/edit-service')}>
                        <View>
                            <Text style={styles.name}>{service.name}</Text>
                            <Text style={styles.description}>{service.description}</Text>
                            <Text style={styles.price}>Price: ${service.price}</Text>
                        </View>
                        <View style={styles.selectButton}  onPress={() => router.back()}>
                            <Ionicons name='pencil' size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backArrow: {
        marginBottom: 10,
        marginLeft: -5
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
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        width: screenWidth - 300,
        height: 40,
        // marginLeft: 20
    },
    photoContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
        alignContent: 'center',
    },
    daytext: {
        fontSize: 16,
        marginTop: -12,
        marginHorizontal: 5
        // marginLeft: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    dayContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'flex-end', // 👈 new: push content to the right
        alignItems: 'center',       // 👈 new: vertically align everything nicely
        marginBottom: 5,
        gap: 6,                     // 👈 optional: add some spacing between elements
    },
    secondTitle: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
    },
    photoText: {
        fontSize: 16,
        marginBottom: 40,
        marginTop: 30,
        marginLeft: 30,
        textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E3FAEC',
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
    box: {

        height: 40,
        width:300,
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
    dbox: {

        height: 120,
        width:300,
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
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Services;
