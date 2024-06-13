import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import store from "./database/store";
import DrawerComponent from "./components/CustomDrawer";
import HomeScreen from "./screen/HomeScreen";
import LabelManage from "./screen/ManageLabelsScreen";
import TrashScreen from "./screen/TrashScreen";
import LabelsScreen from "./screen/LabelsScreen";
import NewNoteScreen from "./screen/NewNoteScreen";
import EditNoteScreen from "./screen/EditNoteScreen";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              style={{ marginRight: 30 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
          title: "Notes",
        }}
      />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen
        name="ManageLabels"
        component={LabelManage}
        options={{
          title: "Manage Labels",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerComponent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen name="Labels" component={LabelsScreen} />
          <Drawer.Screen name="Trash" component={TrashScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
