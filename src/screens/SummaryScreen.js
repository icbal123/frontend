import { useState } from "react";
import { View } from "react-native";
import CText from "../components/common/CText";
import { Resume } from "../constants/keys";
import Accordion from "../components/layouts/Accordion";
import SubtitledText from "../components/text/SubtitledText";

const SummaryScreen = ({ profile }) => {
    const [ opened, setOpened ] = useState();

    return <View
        className="flex flex-col w-full h-full items-stretch p-9 bg-fill-background space-y-6 overflow-auto"
    >
        <SubtitledText 
            text='name'
            subtitle='quick summary'
        />
        <View
            className="flex flex-col w-full space-y-4"
        >
            <View> 
                <Accordion
                    title='Personal Information'
                    isExpanded={opened == Resume.PERSONAL_INFORMATION}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.PERSONAL_INFORMATION : undefined)}
                >
                    <CText>pi</CText>
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Work Experience'
                    isExpanded={opened == Resume.WORK_EXPERIENCE}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.WORK_EXPERIENCE : undefined)}
                >
                    <CText>pi</CText>

                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Education'
                    isExpanded={opened == Resume.EDUCATION}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.EDUCATION : undefined)}
                >

                    <CText>pi</CText>
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Skills'
                    isExpanded={opened == Resume.SKILLS}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.SKILLS : undefined)}
                >

                    <CText>pi</CText>
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Interests'
                    isExpanded={opened == Resume.INTERESTS}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.INTERESTS : undefined)}
                >

                    <CText>pi</CText>
                </Accordion>
            </View>
        </View>
    </View>;
};

export default SummaryScreen;