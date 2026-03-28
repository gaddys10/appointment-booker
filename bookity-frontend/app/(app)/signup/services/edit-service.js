import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { Dimensions } from 'react-native';
import { useState } from 'react';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function EditService(){
    const [serviceName, setServiceName] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDays, setSelectedDays] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const router = useRouter(); // ✅ Create router object

    const handleSaveService = () => {
        const durationMinutes =
            (parseInt(hours || '0', 10) * 60) + parseInt(minutes || '0', 10);

        const newService = {
            id: Date.now().toString(),
            name: serviceName || 'New Service',
            description: description || '',
            price: Number(price || 0),
            durationMinutes: durationMinutes || 60,
            daysAvailable: Object.keys(selectedDays).filter((day) => selectedDays[day]),
        };

        router.push({
            pathname: '/signup/services/signup-business-info',
            params: {
                newService: JSON.stringify(newService),
            },
        });
    };

    return(
        <View style={{ flex: 1, backgroundColor: '#E3FAEC' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrow}  onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveService} style={styles.saveButton}>
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>Save</Text>
                    <Ionicons name="checkmark" size={16} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                <Text style={styles.header}>My Services</Text>

                <Text style={styles.subheader}>Service Name</Text>
                <TextInput style={styles.textBox} placeholder='Enter name of service...' value={serviceName} onChangeText={setServiceName}></TextInput>

                <Text style={styles.subheader}>Service length</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-start' }}>
                    <TextInput style={styles.lengthBox} placeholder='hours' keyboardType="numeric" value={hours} onChangeText={setHours}></TextInput>
                    <TextInput style={styles.lengthBox} placeholder='minutes' value={minutes} keyboardType="numeric" onChangeText={setMinutes}></TextInput>
                </View>


                <Text style={styles.subheader}>Service Price</Text>
                <TextInput style={styles.textBox} placeholder='Enter price of service...' value={price} keyboardType="numeric" onChangeText={setPrice}></TextInput>

                <Text style={styles.subheader}>Service Description</Text>
                <TextInput style={styles.bigtextBox} multiline={true} placeholder='Enter a detailed description of this service...' value={description} onChangeText={setDescription}></TextInput>
                <Text style={styles.subheader}> Days Available  </Text>
                <View style={{ flexDirection: 'column', gap: 3, flex: 1, paddingTop: 5, justifyContent: 'flex-start' }}>
                    <CheckBox
                        title="Sunday" 
                        checked={selectedDays.sunday}
                        onPress={() => setSelectedDays({...selectedDays, sunday: !selectedDays.sunday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Monday"
                        checked={selectedDays.monday}
                        onPress={() => setSelectedDays({...selectedDays, monday: !selectedDays.monday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Tuesday"
                        checked={selectedDays.tuesday}
                        onPress={() => setSelectedDays({...selectedDays, tuesday: !selectedDays.tuesday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Wednesday"
                        checked={selectedDays.wednesday}
                        onPress={() => setSelectedDays({...selectedDays, wednesday: !selectedDays.wednesday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Thursday"
                        checked={selectedDays.thursday}
                        onPress={() => setSelectedDays({...selectedDays, thursday: !selectedDays.thursday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Friday"
                        checked={selectedDays.friday}
                        onPress={() => setSelectedDays({...selectedDays, friday: !selectedDays.friday})}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Saturday"
                        checked={selectedDays.saturday}
                        onPress={() => setSelectedDays({...selectedDays, saturday: !selectedDays.saturday})}
                        style={styles.checkbox}
                    />
                </View>
                
            </ScrollView>
        </View>
    )}

    const styles = StyleSheet.create({
        backArrow: {
            marginLeft: -5
        }, 
        saveButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 10,
            marginVertical: 20,
            width: screenWidth - 300,
            height: 40,
            // marginLeft: 20
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            height: 50,
            backgroundColor: '#fff'
        },
        container:{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: '#E3FAEC',
        },
        header: {
            fontSize: 24,
            marginTop: 20,
            marginLeft: 5
        },
        subheader: {
            // fontSize: 18,
            marginTop: 20,
            marginLeft: 5
        },
        lengthBox: {
            width: screenWidth - 300,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
        },
        textBox: {
            width: screenWidth - 50,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
        },
        bigtextBox: {
            width: screenWidth - 50,
            height: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 20,
            textAlignVertical: 'top',
        }
    })