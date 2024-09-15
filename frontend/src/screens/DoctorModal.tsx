import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../components/context/AuthContext";

export function DoctorModal () {

    const { marcarConsulta } = useAuth()

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const route = useRoute<any>();
    const [selectedDay, setSelectedDay] = useState<null | string>(null);
    const { doctorName, doctorDescription, doctorRole } = route.params;

    function getNextHalfHourDate(): Date {
        const now = new Date();
        const nextHalfHour = new Date();
    
        nextHalfHour.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
        nextHalfHour.setSeconds(0);
        nextHalfHour.setMilliseconds(0);
    
        if (nextHalfHour <= now) {
            nextHalfHour.setHours(nextHalfHour.getHours() + 1);
            nextHalfHour.setMinutes(0);
        }
    
        return nextHalfHour;
    }

    function generateFutureTimes(interval: number, count: number): Date[] {
        const times: Date[] = [];
        let current = getNextHalfHourDate();
    
        for (let i = 0; i < count; i++) {
            times.push(new Date(current));
            current.setMinutes(current.getMinutes() + interval);
        }
    
        return times;
    }

    function formatTime(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
    
    // Gera uma lista de horários no futuro, começando na próxima meia hora
    const futureTimes = generateFutureTimes(30, 20); // Gera 10 horários, por exemplo
    const formattedTimes = futureTimes.map(formatTime);



    return (
        <View style={{backgroundColor: "#fefeff", flex: 1, paddingHorizontal: 20}}>

            <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                <View style={styles.user}>
                    <Ionicons name="person-outline" size={50} />
                </View>

                <View style={{ gap: 10, flex: 1 }}>
                    <Text style={{ fontWeight: "500" }}>{doctorName}</Text>
                    <Text style={{ flexShrink: 1, flexWrap: "wrap" }}>{doctorDescription}</Text>

                    <View style={{ backgroundColor: "#000000", paddingHorizontal: 12, paddingVertical: 5, alignSelf: "flex-start", borderRadius: 20 }}>
                        <Text style={{ color: "#fff" }}>{doctorRole}</Text>
                    </View>
                </View>

            </View>

            <View style={{marginTop: 30}}>
                <Text style={{textAlign: "center", fontWeight: 500, marginBottom: 20}}>Horarios disponiveis</Text>

                <ScrollView>
                    {
                        formattedTimes.map((item, key) => {
                            return (
                                <Pressable key={key} style={{...styles.hourButton, borderWidth: (selectedDay == item) ? 1 : 0 }} onPress={() => {
                                    setSelectedDay(item)
                                    Alert.alert("Marcar horario",`Tem certeza que deseja marcar sua consulta para ${item}?`,
                                        [
                                            {
                                                text: "Sim",
                                                onPress: () => {

                                                    marcarConsulta({
                                                        doctorName, 
                                                        doctorDescription, 
                                                        doctorRole,
                                                        horario: item
                                                    })

                                                    Alert.alert("Consulta marcada","", [{
                                                        text: "Ok",
                                                        onPress: () => {
                                                            navigation.goBack()
                                                            navigation.navigate("Scheduled")
                                                        }
                                                    }])
                                                    console.log("Consulta marcada")
                                                }
                                            },
                                            {
                                                text: "Nao"
                                            }
                                        ]
                                    )
                                }}>
                                    <View style={{ height: 50, width: 50, backgroundColor: "#e6e6e6", borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name="time" size={33} />
                                    </View>
                                    <Text>
                                        {item}
                                    </Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
                <Pressable style={{ flex: 1 }}>
                    <Text>Confirmar consulta</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    profileInformation: {

    },
    user: {
        backgroundColor: "#ebebeb",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    hourButton: {
        height: 70,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5"
        
    }
});