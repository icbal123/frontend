import { Image } from "react-native";

const CircularImage = ({ url, width }) => {
    url = url || 'https://iaftm.tmgrup.com.tr/5e6834/1200/627/0/31/1200/658?u=https://iftm.tmgrup.com.tr/2022/12/31/son-dakika-transfer-haberi-cristiano-ronaldo-resmen-al-nassrda-1672435192436.jpeg';
    return <Image
        source={{
            uri: url,
        }}
        className={`rounded-full ${width || 'w-full'} aspect-square object-cover`}
    />;

};

export default CircularImage;