import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS

export default function BookingsOrganization({orgName, orgType, orgAddress, routerAddress}) {
    const router = useRouter(); // ✅ Create router object

    return (
        <TouchableOpacity style={orgStyle.optionContainer} onPress={() => router.push({pathname: routerAddress})}>
            <View style={orgStyle.iconContainer}></View>
            <View style={orgStyle.contentContainer}>
                <Text style={orgStyle.orgOption1}>{orgName}</Text>
                <Text style={orgStyle.type}>{orgType}</Text>
                <Text style={orgStyle.addr}>{orgAddress}</Text>
            </View>
            <View style={orgStyle.selectButton}  onPress={() => router.back()}>
                <Ionicons name='chevron-forward' size={28} color="black" />
            </View>
        </TouchableOpacity>
    );
}

const orgStyle = StyleSheet.create({
    addr:{
        // marginTop: 45,
        // marginLeft: -80,
        fontSize: 12,
        marginLeft: 10,
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
        marginleft: 10,
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
    selectButton:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },
    type: {
        fontSize: 12,
        marginTop: 2,
        // marginLeft: -105,
        marginLeft: 10,
        color: '#333',
    }
})