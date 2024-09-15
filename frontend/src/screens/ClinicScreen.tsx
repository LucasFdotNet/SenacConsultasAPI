import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { DoctorModel } from "../components/DoctorModel";
import { doctorList } from "../data/doctorList";

export function ClinicScreen () {
    return(
        <View style={styles.container}>
            <Header.Root title="Clinico geral" bgColor="#fe6868" secondaryColor="#fb8380" >
                <Header.Icon iconName="archive" bottom={-100} color="#fb8380" right={-20} size={200} />
            </Header.Root>

            <View style={{gap: 10, marginTop: 20, paddingHorizontal: 20}}>
                <Text style={{marginBottom: 15}}>Selecione alguns de nossos medicos disponiveis</Text>
                
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
})