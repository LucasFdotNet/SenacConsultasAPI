import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { ButtonRoot } from "../components/Button/ButtonRoot";
import { Header } from "../components/Header";
import { useAuth } from "../components/context/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function ScheduledAppointmentsScreen() {

    const { consulta, marcarConsulta } = useAuth();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return(
        <View style={styles.container}>
            <Header.Root title="Consultas marcadas" bgColor="#6135be" secondaryColor="#7042cf" >
                <Header.Icon iconName="timer" bottom={-50} color="#7042cf" right={-20} size={200} />
            </Header.Root>

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>

                {

                }
                

                {
                    consulta === null ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{}}>Nenhuma consulta marcada</Text>
                        </View>
                    ) : (
                        <>
                            <View style={{alignItems: "center", gap: 10, marginBottom: 20}}>
                                <View style={styles.userContainer}>
                                    <Ionicons name="person-outline" size={100} />
                                </View>
                                <Text>{consulta.doctorName}</Text>
                            </View>

                            <Text>{consulta.doctorDescription}</Text>
                            <Text>{consulta.doctorRole}</Text>

                            <Pressable style={{...styles.hourButton}}>
                                <View style={{ height: 50, width: 50, backgroundColor: "#e6e6e6", borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="time" size={33} />
                                </View>
                                <Text>
                                    {consulta.horario}
                                </Text>
                            </Pressable>

                            <View style={{ flexDirection: "row", gap: 8, height: 65 }}>
                                <Pressable style={{...styles.button, backgroundColor: "#ED0800"}} onPress={() => {
                                    Alert.alert("Desmarcar consulta", "Tem certeza que deseja desmarcar a consulta?", [
                                        {
                                            text: "Sim",
                                            onPress: () => marcarConsulta(null)
                                        },
                                        {
                                            text: "Nao",
                                            
                                        }
                                    ])
                                    
                                }}>
                                    <Text style={{color: "#fff", fontWeight: 500}}>Desmarcar</Text>
                                </Pressable>
                                <Pressable style={{...styles.button, backgroundColor: "#5783db"}} onPress={() => {
                                    navigation.navigate("DoctorModal", {
                                        doctorName: consulta.doctorName,
                                        doctorRole: consulta.doctorRole,
                                        doctorDescription: consulta.doctorDescription,
                                    })
                                }}>
                                    <Text style={{color: "#fff", fontWeight: 500}}>Remarcar</Text>
                                </Pressable>
                            </View>
                        </>
                    )
                }

                
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {

    },
    userContainer: {
        height: 200,
        width: 200,
        backgroundColor: "#ccc",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",

    },

    hourButton: {
        height: 70,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5",
        marginTop: 20
        
    },
    button: {
        flex: 1,
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    }
})