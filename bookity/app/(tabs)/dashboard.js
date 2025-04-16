import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

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
            </View>
            <View style={dStyle.iBooked}>
                <View style={dStyle.ibHeader}>
                    <Text style={dStyle.ibHeaderText}>Appointments I've Booked</Text>
                </View>

            </View>
        </ScrollView>
    )
}

const dStyle = StyleSheet.create({
    container:{
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#E3FAEC',

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
    iBooked:{
        height: 275,
        width: screenWidth - 20,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff'

    },
    ibHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 25,
        marginTop: 8,
        paddingLeft: 10
    },
    bwmHeaderText: {
        
    },
    dHeader: {
        marginTop: 55,
        fontSize: 36,
        marginBottom: 10
    },
    searchBox: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        width: screenWidth-20,
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    advancedContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
        marginRight: 14,
    },
    advanced: {
        textDecorationLine: 'underline',
    }
})