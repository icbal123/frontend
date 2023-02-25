import { Text } from "react-native";

const CText = ({ styles, color, children }) => {
    color = color || 'text-text-primary';
    let baseStyles = `font-display ${color}`;
    if (styles) baseStyles += " " + styles;
    return children.toString().split('\n').map((text, i) => <Text key={i} className={baseStyles}>{text}</Text>);
};

export default CText;