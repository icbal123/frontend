import { View } from "react-native";
import { alignItems } from "../../constants/tailwindMappings";
import CText from "../common/CText";

const SubtitledText = ({
  align,
  text,
  textColor,
  textStyles,
  subtitle,
  subtitleColor,
  subtitleStyles,
}) => {
    align = align || 'center';
    textColor = textColor || 'text-text-primary';
    textStyles = textStyles || 'text-3xl font-bold';
    subtitleColor = subtitleColor || 'text-text-primary';
    subtitleStyles = subtitleStyles || '';

  return (
    <View className={`flex flex-col w-full ${alignItems[align]}`}>
      <CText styles={textStyles} color={textColor}>
        {text}
      </CText>
      <CText styles={subtitleStyles} color={subtitleColor}>
        {subtitle}
      </CText>
    </View>
  );
};

export default SubtitledText;
