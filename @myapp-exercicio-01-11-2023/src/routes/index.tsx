import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
// import { AuthRoutes } from "./Auth.routes";

export function Routes() {
  return (
    <NavigationContainer>
      {/* <AuthRoutes /> */}
      <AppRoutes />
    </NavigationContainer>
  )
}