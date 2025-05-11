import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyAccount(){

    const router = useRouter();
    return (
        <ScrollView style={aStyle.container}>
            <Text style={aStyle.header}>My Account</Text>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/personal-information')}>
                    <Text style={aStyle.sectionText}>Personal Information</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/change-password')}>
                    <Text style={aStyle.sectionText}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/faq')}>
                    <Text style={aStyle.sectionText}>FAQ</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/about-us')}>
                    <Text style={aStyle.sectionText}>About Us</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/contact-us')}>
                    <Text style={aStyle.sectionText}>Contact Us</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/terms-and-conditions')}>
                    <Text style={aStyle.sectionText}>Terms and Conditions</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/account/privacy-policy')}>
                    <Text style={aStyle.sectionText}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.section}>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text style={aStyle.sectionText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={aStyle.lastSection}>
                <TouchableOpacity onPress={() => router.push('/account/delete-account')}>
                    <Text style={aStyle.sectionText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

const aStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#E3FAEC',
    },
    header: {
        marginVertical: 15,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
    },
    section: {
        width: screenWidth - 20,
        height: screenHeight / 15,
        // backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        // alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    lastSection: {
        width: screenWidth - 20,
        height: screenHeight / 15,
        // backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    sectionText: {
        fontSize: 18,
        color: '#000',
    },
    notification: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
}})