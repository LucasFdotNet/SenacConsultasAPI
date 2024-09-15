import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

interface ListRootProps {
    doctorName: string
    doctorDescription: string
    doctorRole: string
    horario: string

}

export function ListRoot ({ doctorName, horario }: ListRootProps) {

    const navigation = useNavigation<any>()

    return (
        <Pressable style={styles.container}
            onPress={() => {
                navigation.navigate("HistoricModal")
            }}
        >
            <View style={styles.icon}>
                <Ionicons name="ticket" size={33} color={"#4d4d4d"} />
            </View>
            <Text style={styles.title}>{doctorName}</Text>
            <Text>{horario}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5"
    },
    icon: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ebebeb",
        borderRadius: 12
    },
    title: {

    },

    hourButton: {
       
        
    }

})