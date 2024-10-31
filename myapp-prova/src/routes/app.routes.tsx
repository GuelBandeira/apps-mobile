import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Dashboard } from '../pages/Dashboard'
import { ListExpenses } from '../pages/ListExpenses'
import { SearchExpenses } from '../pages/SearchExpenses'
import { TotalExpenses } from '../pages/TotalExpenses'
import { useTheme } from "styled-components"

type AppRoutes = {
  dashboard: undefined;
  listExpenses: undefined;
  searchExpenses: undefined;
  totalExpenses: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
const theme = useTheme()

  return (
    <Navigator screenOptions={{
      headerShown: false, tabBarLabel: '', tabBarActiveBackgroundColor: theme.colors.primary, tabBarInactiveTintColor: theme.colors.text,
      tabBarStyle: {
        height: 55,
        borderRadius: 500,
        position: 'absolute',
        bottom: 40,
        left: 95,
        right: '50%',
        backgroundColor: 'transparent',
        flex: 1,
        shadowColor: 'grey',
        shadowRadius: 0,
        shadowOpacity: 0,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        width: '50%',
      }, tabBarItemStyle: {
        borderRadius: 50,
        paddingTop: 10,
        flex: 1,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
      },
      tabBarAllowFontScaling: true,
      tabBarActiveTintColor: 'white',
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
        options={{
        // tabBarLabel: 'Dashboard',

        tabBarIcon: (({ size, color }) =>
          <Ionicons name="add-circle" size={size} color={color} />
        ),
      }}
      />

      <Screen
        name='listExpenses'
        component={ListExpenses}
        options={{
          // tabBarLabel: 'Dashboard',

          tabBarIcon: (({ size, color }) =>
            <FontAwesome name="list-ol" size={size} color={color} />),

        }}
      />

      <Screen
        name='searchExpenses'
        component={SearchExpenses}
        options={{
          tabBarIcon: (({ size, color }) =>
<AntDesign name="search1" size={size} color={color} />          ),
        }}
      />

<Screen
        name='totalExpenses'
        component={TotalExpenses}
        options={{
          tabBarIcon: (({ size, color }) =>
<FontAwesome name="money" size={size} color={color} />
         ),
        }}
      />

    </Navigator>
  )
}