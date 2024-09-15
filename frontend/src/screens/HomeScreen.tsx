import { Alert, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box } from "../components/Box";
import { ExamScreen } from "./ExamScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../components/context/AuthContext";

export function HomeScreen() {

    const { nome } = useAuth();

    const sections = [
        {
            title: "Telemedicina",
            description: "Faca uma consulta rapida e sem precisar sair de casa",
            size: 120,
            right: -60,
            bottom: 0,
            colors: {
                primary: "#97db45",
                secondary: "#ace457"
            }
        },
        {
            title: "",
            description: "",
            size: 120,
            right: -60,
            bottom: 0,
            colors: {
                primary: "#97db45",
                secondary: "#ace457"
            }
        },
        {
            title: "",
            description: "",
            size: 120,
            right: -60,
            bottom: 0,
            colors: {
                primary: "#97db45",
                secondary: "#ace457"
            }
        },
        {
            title: "",
            description: "",
            size: 120,
            right: -60,
            bottom: 0,
            colors: {
                primary: "#97db45",
                secondary: "#ace457"
            }
        },
        
    ]

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Ola, {nome}!</Text>
            <View style={styles.containerBox}>

                {/* <Stack.Navigator>
                    <Stack.Screen name="Exam" component={ExamScreen} />
                </Stack.Navigator> */}

                <Box.Root bgColor="#97db45" onClick={() => { navigation.navigate("Tele") }} >
                    <Box.Title>Telemedicina</Box.Title>
                    <Box.Description>Faca uma consulta rapida e sem precisar sair de casa</Box.Description>
                    <Box.Icon iconName="laptop-outline" size={120} right={-40} bottom={0} color="#ace457" />
                </Box.Root>

                <Box.Root bgColor="#2ac3ff" onClick={() => { navigation.navigate("Exam") }} >
                    <Box.Title>Exames</Box.Title>
                    <Box.Description>Realize um exame com horario, data e local</Box.Description>
                    <Box.Icon iconName="body" size={110} right={-40} bottom={10} color="#2fd9fa" />
                </Box.Root>

            </View>
            <View style={styles.containerBox}>

                <Box.Root bgColor="#fe6868" onClick={() => { navigation.navigate("Clinic") }}>
                    <Box.Title>Clinico geral</Box.Title>
                    <Box.Description>Nao sabe pelo o que esta passando? Realize uma consulta com um profissional que te ajudara a enterder sua situacao atual</Box.Description>
                    <Box.Icon iconName="archive" size={220} right={0} bottom={-100} color="#fb8380" />
                </Box.Root>  

            </View>

            <View style={styles.containerBox}>
                <Box.Root bgColor="#6135be" onClick={() => { navigation.navigate("Scheduled") }} >
                    <Box.Title>Consultas marcadas</Box.Title>
                    <Box.Description>Visualize todas as consultas que voce tem marcado ate o momento</Box.Description>
                    <Box.Icon iconName="timer" size={220} right={0} bottom={-100} color="#7042cf" />
                </Box.Root>
            </View>
            
            <View style={styles.containerBox}>

                

                <Box.Root bgColor="#fe8e61" onClick={() => { navigation.navigate("Historic") }} >
                    <Box.Title>Historico</Box.Title>
                    <Box.Description>Visualize o historico de todos os exames realizados, junto com as presquicoes medicas e receitas</Box.Description>
                    <Box.Icon iconName="ticket" size={220} right={0} bottom={-100} color="#fea675" />
                </Box.Root>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 20
    },
    mainContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: "#fffefe"
    },
    containerBox: {
        flexDirection: 'row', // Alinha as boxes horizontalmente
        justifyContent: 'space-between', // Espaça as boxes igualmente
        
        gap: 10,
        marginBottom: 10,
        overflow: "hidden"
    },
    
});