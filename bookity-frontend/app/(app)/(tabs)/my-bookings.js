import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyBookings() {

        const router = useRouter();
    return (
        <ScrollView style={mbstyle.container}>
        <Text style={mbstyle.header}>My Bookings</Text>

        {/* Upcoming Bookings */}
        <TouchableOpacity style={mbstyle.section} onPress={() => router.push('/bookings/upcoming-bookings')}>
            <Text style={mbstyle.sectionText}>Upcoming bookings</Text>
            <View style={[mbstyle.notification, { backgroundColor: '#3498db' }]}>
            <Text style={mbstyle.notificationText}>4</Text>
            </View>
        </TouchableOpacity>

        {/* Submitted Bookings to Confirm */}
        <TouchableOpacity style={mbstyle.section} onPress={() => router.push('/bookings/choose-organization')}>
            <Text style={mbstyle.sectionText}>Submitted Bookings to Confirm</Text>
            <View style={[mbstyle.notification, { backgroundColor: '#e74c3c' }]}>
            <Text style={mbstyle.notificationText}>2</Text>
            </View>
        </TouchableOpacity>

        {/* My Services */}
        <TouchableOpacity style={mbstyle.section} onPress={() => router.push('/services/business-list')}>
            <Text style={mbstyle.sectionText}>My Services</Text>
            <View style={[mbstyle.notification, { backgroundColor: '#000' }]}>
            <Text style={mbstyle.notificationText}>6</Text>
            </View>
        </TouchableOpacity>

        {/* Previous Bookings */}
        <TouchableOpacity style={mbstyle.section} onPress={() => router.push('/bookings/previous-bookings')}>
            <Text style={mbstyle.sectionText}>Previous bookings</Text>
        </TouchableOpacity>

        {/* Favorites */}
        <TouchableOpacity style={mbstyle.section} onPress={() => router.push('/bookings/favorites')}>
            <Text style={mbstyle.sectionText}>Favorites</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const mbstyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
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
});
