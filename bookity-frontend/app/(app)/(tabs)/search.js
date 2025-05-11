import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

export default function Search(){

    const providers = [
        {
            id: 1,
            name: 'Fade House',
            latitude: 35.2271,
            longitude: -80.8431,
        },
        {
            id: 2,
            name: 'Edge Studio',
            latitude: 35.2290,
            longitude: -80.8400,
        }
    ];

    return(
            <ScrollView style={searchstyle.container}>
                <Text style={searchstyle.dHeader}>Search for Services</Text>
                <TextInput style={searchstyle.searchBox}placeholder='Search for business or service..'/>
                
                <TouchableOpacity style={searchstyle.advancedContainer}>
                    <Text style={searchstyle.advanced}>Advanced Search</Text>
                </TouchableOpacity>


                <View style={searchstyle.boxGrid}>
                    <TouchableOpacity style={searchstyle.RCDBox} >
                        <Text style={searchstyle.subheader}>Restaurants, Catering, & Dining</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.PCBBox} >
                        <Text style={searchstyle.subheader}>Personal Care & Beauty </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.ELBox} >
                        <Text style={searchstyle.subheader}>Education & Learning</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.PSBox} >
                        <Text style={searchstyle.subheader}>Professional Services</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.HPBox} >
                        <Text style={searchstyle.subheader}>Home & Personal Services</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.EEBox} >
                        <Text style={searchstyle.subheader}>Entertainment & Events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.HWBox} >
                        <Text style={searchstyle.subheader}>Health & Wellness</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={searchstyle.ATBox} >
                        <Text style={searchstyle.subheader}>Automotive & Transnportation</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
}

const searchstyle = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#E3FAEC',
    },
    boxGrid: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    subheader: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    RCDBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#F19494',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        
    },
    PCBBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#94F1F0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',

        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    ELBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#94C0F1',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    

    PSBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#F194EB',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',

        marginBottom: screenheight * .02,
        alignContent:"center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    HPBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#94F19A',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    EEBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#E6F194',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    HWBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#AB94F1',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    ATBox: {
        height: screenheight *.13,
        width: screenWidth * .45,
        backgroundColor: '#F1BE94',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: screenheight * .02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    
    dHeader: {
        marginTop: 15,
        fontSize: 36,
        marginBottom: screenheight * .02
    },
    searchBox: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        width: screenWidth-20,
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: screenheight * .02,
        backgroundColor: '#fff'
    },
    advancedContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
        // marginRight: 14,
    },
    advanced: {
        textDecorationLine: 'underline',
    }
})