import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { useRouter } from 'expo-router';

export default function Dashboard(){

    return(
        <ScrollView style={dStyle.container}>
            <Text style={dStyle.dHeader}>Welcome, Syrus</Text>
            <TextInput style={dStyle.searchBox}placeholder='Search for business or service..'/>

            <TouchableOpacity style={dStyle.advancedContainer}>
                <Text style={dStyle.advanced}>Advanced Search</Text>
            </TouchableOpacity>

            <View style={dStyle.bookedWithMe}>
                <View style={dStyle.bwmHeader}>
                    <Text style={dStyle.bwmHeaderText}>Appointments Booked with Me</Text>
                </View>
                <View style={dStyle.leftSection}></View>
                <View style={dStyle.rightSection}></View>

            </View>

            <View style={dStyle.iBooked}>
                <View style={dStyle.ibHeader}>
                    <Text style={dStyle.ibHeaderText}>Appointments I've Booked</Text>
                </View>
                <View style={dStyle.leftSection}></View>
                <View style={dStyle.rightSection}></View>
            </View>

            <View style={dStyle.booknow}>
                <Text> Book Appointment Now </Text>
            </View>

            <View style={dStyle.iBooked}>
                <View style={dStyle.ibHeader}>
                    <Text style={dStyle.ibHeaderText}>Service Suggestions</Text>
                </View>
            </View>

        </ScrollView>
    )
}

const dStyle = StyleSheet.create({
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