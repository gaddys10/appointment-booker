import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

export default function BookNow(){
    return (
        <ScrollView>
            <ScrollView style={nowStyle.container}>
                <Text style={nowStyle.header}>Search for Services</Text>
                <TextInput style={nowStyle.searchBox}placeholder='Search for business or service..'/>
                
                <TouchableOpacity style={nowStyle.advancedContainer}>
                    <Text style={nowStyle.advanced}>Advanced Search</Text>
                </TouchableOpacity>

                <Text style={nowStyle.subheader}>Favorites</Text>
                <View style={nowStyle.catContainer}>
                    {/* TODO: Loop */}
                    <View style={nowStyle.bizContainer}>
                        <Text>Platinum Kutz Barbershop</Text>
                    </View>
                </View>
                <View style={nowStyle.seeAllContainer}>
                    <Text style={nowStyle.seeAll}>See All</Text>    
                </View>

                <Text style={nowStyle.subheader}>Recently Booked</Text>
                <View style={nowStyle.catContainer}>
                    {/* TODO: Loop */}
                    <View style={nowStyle.bizContainer}>
                        
                        <Text>Platinum Kutz Barbershop</Text>
                    </View>
                </View>
                <View style={nowStyle.seeAllContainer}>
                    <Text style={nowStyle.seeAll}>See All</Text>    
                </View>

                <Text style={nowStyle.subheader}>Popular in your Area</Text>
                <View style={nowStyle.catContainer}>
                    {/* TODO: Loop */}
                    <View style={nowStyle.bizContainer}>
                        <Text>Platinum Kutz Barbershop</Text>
                    </View>
                </View>
                <View style={nowStyle.seeAllContainer}>
                    <Text style={nowStyle.seeAll}>See All</Text>    
                </View>

                <Text style={nowStyle.subheader}>Open Availability Today</Text>
                <View style={nowStyle.catContainer}>
                    {/* TODO: Loop */}
                    <View style={nowStyle.bizContainer}>
                            <Text>Platinum Kutz Barbershop</Text>
                        </View>
                    </View>
                <View style={nowStyle.seeAllContainer}>
                    <Text style={nowStyle.seeAll}>See All</Text>    
                </View>
            </ScrollView>
        </ScrollView>
    )
}

const nowStyle = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#E3FAEC',

    },
    catContainer: {
        height: 100,
        
    },
    bizContainer: {
        height: 100,
        width: 120,
        backgroundColor:'#abc',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    header: {
        marginTop: 15,
        fontSize: 36,
        marginBottom: screenheight * .02
    },
    subheader: {
        marginTop: 10,
        fontSize: 24,
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
    seeAll: {
        textDecorationLine: 'underline',
    },
    seeAllContainer: {
        alignItems: 'flex-end',
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