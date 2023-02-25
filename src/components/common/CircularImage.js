import { View, ActivityIndicator, Image } from "react-native";

const CircularImage = ({ url, width, isLoading }) => {
    if (isLoading) return <View
        className={`rounded-full ${width || 'w-full'} aspect-square items-center justify-center flex`}
    >
        <ActivityIndicator size='large' />
    </View>;

    return <Image
        source={{
            uri: url,
        }}
        className={`rounded-full ${width || 'w-full'} aspect-square object-cover`}
    />;

};

export default CircularImage;