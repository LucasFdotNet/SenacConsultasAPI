import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { ExamScreen } from "../screens/ExamScreen";
import { ClinicScreen } from "../screens/ClinicScreen";
import { TeleScreen } from "../screens/TeleScreen";
import { HistoricScreen } from "../screens/HistoricScreen";
import { ScheduledAppointmentsScreen } from "../screens/ScheduledAppointmentsScreen";
import { DoctorModal } from "../screens/DoctorModal";
import { HistoricModal } from "../screens/HistoricModal";

const HomeStack = createNativeStackNavigator();

export function HomeStackSreen () {

    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Group>
                <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
                <HomeStack.Screen name="Tele" component={TeleScreen} options={{ title: "Telemedicina", headerShown: false }}/>
                <HomeStack.Screen name="Exam" component={ExamScreen} options={{ title: "Exames", headerShown: false }}/>
                <HomeStack.Screen name="Clinic" component={ClinicScreen} options={{ title: "Clinico geral", headerShown: false }}/>
                <HomeStack.Screen name="Scheduled" component={ScheduledAppointmentsScreen} options={{ title: "Consultas marcadas", headerShown: false }}/>
                <HomeStack.Screen name="Historic" component={HistoricScreen} options={{ title: "Historico", headerShown: false }}/>
            </HomeStack.Group>
            <HomeStack.Group screenOptions={{presentation: "modal"}}>
                <HomeStack.Screen name="DoctorModal" component={DoctorModal} options={{ title: "Agendamento" }} />
                <HomeStack.Screen name="HistoricModal" component={HistoricModal} options={{ title: "Historico" }} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );

}