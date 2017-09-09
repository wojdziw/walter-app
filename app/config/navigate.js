import { Platform } from 'react-native';

export default function navigate(destinationScreen, props, isBack = false) {
  if (isBack) {
    return Platform.OS == 'web' ? props.chooseScreen(destinationScreen) : props.navigation.goBack()
  }
  return Platform.OS == 'web' ? props.chooseScreen(destinationScreen) : props.navigation.navigate(destinationScreen)
}