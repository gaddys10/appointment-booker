import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router';        

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function UpcomingBookings(){
    const router = useRouter(); // ✅ Create router object


    return(
        <ScrollView style={ubStyle.container}>

             {/* Back Button */}
            <TouchableOpacity style={ubStyle.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <Text style={ubStyle.dHeader}> Upcoming Bookings</Text>

            <View style={ubStyle.bookedWithMe}>
                <View style={ubStyle.bwmHeader}>
                    <Text style={ubStyle.bwmHeaderText}>Appointments Booked with Me</Text>
                </View>
                <View style={ubStyle.leftSection}></View>
                <View style={ubStyle.rightSection}></View>

            </View>

            <View style={ubStyle.iBooked}>
                <View style={ubStyle.ibHeader}>
                    <Text style={ubStyle.ibHeaderText}>Appointments I've Booked</Text>
                </View>
                <View style={ubStyle.leftSection}></View>
                <View style={ubStyle.rightSection}></View>
            </View>

        </ScrollView>
    )
}


const ubStyle = StyleSheet.create({
    advanced: {
        textDecorationLine: 'underline',
    },
    advancedContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
        marginRight: 10,
    },
    booknow: {
        width: screenWidth - 20,
        borderColor: '#aaa',
        borderWidth: 7,
        height: 100,
        borderStyle: 'dotted',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        alignContent: "center",
        alignItems: "center",
        justifyContent: 'center',
    },
    bookedWithMe:{
        height: 275,
        width: screenWidth - 20,

        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginBottom: 10

    },
    bwmHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 25,
        marginTop: 8,
        paddingLeft: 10
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#E3FAEC',
    },
    dHeader: {
        marginTop: 15,
        fontSize: 36,
        marginBottom: screenHeight * 0.02,
    },
    iBooked:{
        height: 275,
        width: screenWidth - 20,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    ibHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 25,
        marginTop: 8,
        paddingLeft: 10
    },
    leftSection: {
        height: 240,
        borderRightWidth: 1,
        borderColor: '#aaa',
        width: (screenWidth-20)/2.5
    },
    searchBox: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        width: screenWidth-20,
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: screenHeight * .02,
        backgroundColor: '#fff'
    },
})