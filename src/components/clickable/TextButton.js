import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { alignItems } from "../../constants/tailwindMappings";
import CText from "../common/CText";

const TextButton = ({ text, onClick, isEnabled, color, align }) => {
  align = align || 'center';
  isEnabled = isEnabled && onClick !== undefined;
  color = color || "bg-fill-buttonOn";
  const fillColor = isEnabled ? color : "bg-fill-buttonOff";
  const className = `flex ${fillColor} ${alignItems[align]} justify-center w-full rounded-lg px-3 py-3 drop-shadow`;
  const textElem = <CText>{text}</CText>;

  if (!isEnabled) return <View
    className={className}
  >
    {textElem}
  </View>;
  
  return <TouchableOpacity
    onPress={() => onClick()}
    className={className}
  >
    {textElem}
  </TouchableOpacity>;
};

export default TextButton;
