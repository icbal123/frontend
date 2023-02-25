import { useState } from "react";
import { View } from "react-native";
import CText from "../components/common/CText";
import { Resume } from "../constants/keys";
import Accordion from "../components/layouts/Accordion";
import SubtitledText from "../components/text/SubtitledText";
import { getDateStr } from "../functions/date";
import CircularImage from "../components/common/CircularImage";
import { storage } from "../utils/firebase";
import { ref } from "@firebase/storage";

const BlankView = () => <CText>nothing here.</CText>;
const BoldLabel = ({ label, content }) => <CText styles='text-sm'><CText styles='text-sm font-bold'>{label}</CText> {content}</CText>;

const PInfoView = ({ email, pInfo }) => {
    return <View
        className="flex flex-col items-start"
    >
        <BoldLabel label='email' content={email} />
        <BoldLabel label='phone' content={pInfo.phone} />
        {pInfo.linkedin && <BoldLabel label='linkedin' content={pInfo.linkedin} />}
        {pInfo.github && <BoldLabel label='github' content={pInfo.github} />}
    </View>
};

const SingleExp = ({ exp }) => {
    return <View className="flex flex-col">
        <CText styles='text-sm'><CText styles='text-sm font-bold'>{exp.title}</CText> at <CText styles='text-sm font-bold'>{exp.company}</CText>: {getDateStr(exp.from)} - {getDateStr(exp.to)}</CText>
        {exp.description.map((desc, i) => <CText key={i} styles='text-xs italic'>{desc}</CText>)}
        <BoldLabel label='skilled at' content={exp.skills.join(', ')} />
    </View>
};

const ExperienceView = ({ experience }) => {
    if (!experience) return <BlankView />;

    return <View
        className="flex flex-col space-y-3"
    >
        {experience.map((exp, i) => <View key={i}>
            <SingleExp exp={exp} />
        </View>)}
    </View>;
};

const SingleEd = ({ ed }) => {
    return <View className="flex flex-col">
        <CText styles='text-sm'><CText styles='text-sm font-bold'>{ed.institution}</CText> {`(${ed.country})`}: {getDateStr(ed.from)} - {getDateStr(ed.to)}</CText>
        {ed.gpa && <BoldLabel label='with a GPA of' content={ed.gpa} />}
        {ed.relevant_coursework && <View>
            <CText styles='text-xs font-bold'>relevant coursework includes</CText>
            {ed.relevant_coursework.map((cw, i) => <CText styles='text-xs italic'>{cw}</CText>)}
        </View>}
    </View>
}
const EducationView = ({ education }) => {
    if (!education) return <BlankView />;

    return <View
        className="flex flex-col space-y-3"
    >
        {education.map((ed, i) => <View key={i}>
            <SingleEd ed={ed} />
        </View>)}
    </View>;
};

const SingleSkill = ({ skill }) => {
    return <View className="flex flex-col">
        <View className="flex flex-row w-full">
            <CText><CText styles='text-sm font-bold'>{skill.name}</CText> <CText styles='text-xs italic'>({skill.category})</CText></CText>
            <View className="grow" />
            <CText>{Array.from(Array(Math.round(skill.proficiency))).map((_, __) => '*').join('')}</CText>
        </View>
    </View>;
};

const SkillsView = ({ skills }) => {
    if (!skills) return <BlankView />;

    return <View
        className="flex flex-col space-y-3"
    >
        {skills.sort((a, b) => b.proficiency - a.proficiency).sort((a, b) => a.category.toLowerCase() < b.category.toLowerCase() ? -1 : 1).map((skill, i) => <View key={i}>
            <SingleSkill skill={skill} />
        </View>)}
    </View>;
};

const InterestsView = ({ interests }) => {
    if (!interests) return <BlankView />;

    return <CText styles='text-sm'>{interests.join(', ')}</CText>
};

const SummaryScreen = ({ navigation, route }) => {
    const { email, data } = route.params;
    
    const [ opened, setOpened ] = useState();

    const [ imageLoading, setImageLoading ] = useState(true);
    const [ imageURL, setImageURL ] = useState();
    
    useEffect(() => {
        setImageLoading(true);
        getDownloadURL(ref(storage, data.photoURL))
            .then((url) => {
                setImageURL(url);
                setImageLoading(false);
            })
            .catch((e) => setImageLoading(false));
    }, [ data ]);

    return <View
        className="flex flex-col w-full h-full items-stretch p-9 bg-fill-background space-y-6 overflow-auto"
    >
        <CircularImage 
            width='w-1/2'
            isLoading={imageLoading}
            url={imageURL}
        />
        <SubtitledText 
            text={`${data.p_info.first_name} ${data.p_info.last_name}`}
            subtitle='a quick summary'
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
                    <PInfoView email={email} pInfo={data.p_info} />
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Work Experience'
                    isExpanded={opened == Resume.WORK_EXPERIENCE}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.WORK_EXPERIENCE : undefined)}
                >
                    <ExperienceView experience={data.experience} />
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Education'
                    isExpanded={opened == Resume.EDUCATION}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.EDUCATION : undefined)}
                >

                    <EducationView education={data.education} />
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Skills'
                    isExpanded={opened == Resume.SKILLS}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.SKILLS : undefined)}
                >

                    <SkillsView skills={data.skills} />
                </Accordion>
            </View>
            <View>
                <Accordion
                    title='Interests'
                    isExpanded={opened == Resume.INTERESTS}
                    setIsExpanded={(newIsExpanded) => setOpened(newIsExpanded ? Resume.INTERESTS : undefined)}
                >

                    <InterestsView interests={data.interests} />
                </Accordion>
            </View>
        </View>
        <View
            className='absolute top-4 right-4'
        >
            <CircleButton 
                isEnabled
                char='X'
                color='bg-text-errorRed'
                onClick={() => navigation.pop()}
            />
        </View>
    </View>;
};

export default SummaryScreen;