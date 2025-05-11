import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Organizations(){

    const router = useRouter(); // ✅ Create router object

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
            <Text style={orgStyle.header}>My Services</Text>
            <Text style={orgStyle.selectOrg}>Select Organization</Text>

            <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push('/signup/services/business-info')}>
                <View style={orgStyle.iconContainer}></View>
                <View style={orgStyle.contentContainer}>
                    <Text style={orgStyle.orgOption1}>Organization 1</Text>
                    <Text style={orgStyle.type}>Business Type</Text>
                    <Text style={orgStyle.addr}>1234 Address Drive City, State, Country</Text>
                </View>
                <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                    <Ionicons name='chevron-forward' size={28} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push('/signup/services/business-info')}>
                <View style={[orgStyle.iconContainer, {backgroundColor: 'blue'}]}></View>
                <View style={orgStyle.contentContainer}>
                    <Text style={orgStyle.orgOption1}>Organization 2</Text>
                    <Text style={orgStyle.type}>Business Type</Text>
                    <Text style={orgStyle.addr}>1234 Address Drive City, State, Country</Text>
                </View>
                <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                    <Ionicons name='chevron-forward' size={28} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push('signup/services/business-info')}>
            <View style={[orgStyle.iconContainer, {backgroundColor: 'red'}]}></View>
                <View style={orgStyle.contentContainer}>
                    <Text style={orgStyle.orgOption1}>Organization 3</Text>
                    <Text style={orgStyle.type}>Business Type</Text>
                    <Text style={orgStyle.addr}>1234 Address Drive City, State, Country</Text>
                </View>
                <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                    <Ionicons name='chevron-forward' size={28} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push('signup/services/business-info')}>
                <View style={orgStyle.contentContainer}>
                    <Text style={orgStyle.orgOption1}>Add New Business</Text>
                </View>
                <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                    <Ionicons name='chevron-forward' size={28} color="black" />
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    )
}

const orgStyle = StyleSheet.create({
    addr:{
        // marginTop: 45,
        // marginLeft: -80,
        fontSize: 12,
        marginLeft: 10,
    },
    container:{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#E3FAEC',
    },
    header:{
        fontSize: 24,
        marginTop: 20,
        marginLeft: 5,
        color: '#333',
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
        textDecorationLine: 'underline',
    },
    orgOption1:{
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        color: '#333',
        textDecorationLine: 'underline',
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
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },
    selectOrg:{
        fontSize: 16,
        marginTop: 20,
        marginLeft: 5,
        color: '#333',
        fontWeight: 'bold',
        // alignItems: 'flex-end',  
    },
    type: {
        fontSize: 12,
        marginTop: 2,
        // marginLeft: -105,
        marginLeft: 10,
        color: '#333',
    },

    advancedContainer:{
        alignItems:'flex-end',
    },
    advanced:{
        fontSize: 16,
        color:'#5ED2AA',
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
        width: screenWidth - 280,
        height: 40,
        // marginLeft: 20
    },
})