import { ReactNode } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

interface DoctorModelProrps {
    children?: ReactNode
    doctorInformation: any
}

export function DoctorModelRoot ({ children, doctorInformation }: DoctorModelProrps) {

    const navigation = useNavigation<any>()
    
    return (
        <Pressable style={ styles.container } onPress={() => {
            navigation.navigate("DoctorModal", doctorInformation)
        }}>
            <View style={styles.userContainer}>
                <Ionicons name="person-outline" size={25} />
            </View>
            <View style={styles.textContainer}>
                { children }
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        gap: 18
    },
    userContainer: {
        height: 50,
        width: 50,
        backgroundColor: "#ccc",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        gap: 5
    }
})