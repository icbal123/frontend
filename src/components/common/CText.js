import { Text } from "react-native";

const CText = ({ styles, color, children }) => {
    color = color || 'text-text-primary';
    let baseStyles = `font-display ${color}`;
    if (styles) baseStyles += " " + styles;
    return <Text className={baseStyles}>{children}</Text>;
};

export default CText;