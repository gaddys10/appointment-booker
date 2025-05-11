import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router';        

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function ChooseOrganization(){
    const router = useRouter(); // ✅ Create router object


    return(
        <ScrollView style={ubStyle.container}>

             {/* Back Button */}
            <TouchableOpacity style={ubStyle.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <Text style={ubStyle.header}>Bookings to Confirm</Text>

            <Text style={ubStyle.subheader}>Choose Organization</Text>
            {/* My Services */}
            <TouchableOpacity style={ubStyle.section} onPress={() => router.push('/bookings/submitted-bookings')}>
                <Text style={ubStyle.sectionText}>Platinum Kutz Barbershop</Text>
                <View style={[ubStyle.notification, { backgroundColor: '#000' }]}>
                <Text style={ubStyle.notificationText}>6</Text>
                </View>
            </TouchableOpacity>
            {/* My Services */}
            <TouchableOpacity style={ubStyle.section} onPress={() => router.push('/bookings/submitted-bookings')}>
                <Text style={ubStyle.sectionText}>Business 2</Text>
                <View style={[ubStyle.notificastion, { backgroundColor: '#000' }]}>
                <Text style={ubStyle.notificationText}>6</Text>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}


const ubStyle = StyleSheet.create({
    subheader: {
        fontWeight: 500,
        fontSize: 16,
        marginBottom: screenHeight - 830
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#E3FAEC',
    }, 
    header: {
        marginTop: 15,
        fontSize: 36,
        marginBottom: screenHeight * 0.02,
        // fontWeight: 'bold',
    },
    section: {
        height: 80,
        width: screenWidth - 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    sectionText: {
        fontSize: 16,
    },
    notification: {
        minWidth: 30,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    notificationText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})