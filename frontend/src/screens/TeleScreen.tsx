import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { ButtonRoot } from "../components/Button/ButtonRoot";
import { Header } from "../components/Header";
import { DoctorModel } from "../components/DoctorModel";
import { Input } from "../components/Input";

import { doctorList } from "../data/doctorList";

export function TeleScreen () {



    return(
        <View style={styles.container}>
            <Header.Root title="Telemedicina" bgColor="#97db45" secondaryColor="#ace457" >
                <Header.Icon iconName="laptop-outline" bottom={-25} color="#ace457" right={-20} size={200} />
            </Header.Root>

            <View style={{gap: 10, marginTop: 20, paddingHorizontal: 20}}>
                <Text style={{marginBottom: 15}}>Selecione alguns de nossos medicos disponiveis</Text>
                {/* <Input.Root label="Nome ou especialidade"/> */}
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 20}}>

                    {
                        doctorList.map(({doctorName, doctorRole, doctorDescription}: any) => {
                            return (

                                <DoctorModel.Root 
                                    key={doctorName}
                                    doctorInformation={{
                                        doctorName,
                                        doctorRole,
                                        doctorDescription
                                    }}
                                >
                                    <DoctorModel.Title>{doctorName}</DoctorModel.Title>
                                    <DoctorModel.Description>{doctorRole}</DoctorModel.Description>
                                </DoctorModel.Root>
        
                            )
                        })
                    }

                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {

    }
})