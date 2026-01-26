export interface SubjectOption {
    value: string;
    label: string;
}

export interface SubjectCategory {
    label: string;
    options: SubjectOption[];
}

export const SUBJECT_CATEGORIES: SubjectCategory[] = [
    {
        label: "Languages",
        options: [
            { value: "English Home Language", label: "English Home Language" },
            { value: "English First Additional Language", label: "English First Additional Language" },
            { value: "Afrikaans Home Language", label: "Afrikaans Home Language" },
            { value: "Afrikaans First Additional Language", label: "Afrikaans First Additional Language" },
            { value: "IsiZulu Home Language", label: "IsiZulu Home Language" },
            { value: "IsiZulu First Additional Language", label: "IsiZulu First Additional Language" },
            { value: "IsiXhosa Home Language", label: "IsiXhosa Home Language" },
            { value: "IsiXhosa First Additional Language", label: "IsiXhosa First Additional Language" },
            { value: "Sepedi Home Language", label: "Sepedi Home Language" },
            { value: "Sepedi First Additional Language", label: "Sepedi First Additional Language" },
            { value: "Setswana Home Language", label: "Setswana Home Language" },
            { value: "Setswana First Additional Language", label: "Setswana First Additional Language" },
            { value: "Sesotho Home Language", label: "Sesotho Home Language" },
            { value: "Sesotho First Additional Language", label: "Sesotho First Additional Language" },
            { value: "Xitsonga Home Language", label: "Xitsonga Home Language" },
            { value: "Xitsonga First Additional Language", label: "Xitsonga First Additional Language" },
            { value: "SiSwati Home Language", label: "SiSwati Home Language" },
            { value: "SiSwati First Additional Language", label: "SiSwati First Additional Language" },
            { value: "Tshivenda Home Language", label: "Tshivenda Home Language" },
            { value: "Tshivenda First Additional Language", label: "Tshivenda First Additional Language" },
            { value: "isiNdebele Home Language", label: "isiNdebele Home Language" },
            { value: "isiNdebele First Additional Language", label: "isiNdebele First Additional Language" },
        ]
    },
    {
        label: "Mathematics",
        options: [
            { value: "Mathematics", label: "Mathematics" },
            { value: "Mathematical Literacy", label: "Mathematical Literacy" },
            { value: "Technical Mathematics", label: "Technical Mathematics" },
        ]
    },
    {
        label: "Sciences",
        options: [
            { value: "Physical Sciences", label: "Physical Sciences" },
            { value: "Life Sciences", label: "Life Sciences" },
            { value: "Agricultural Sciences", label: "Agricultural Sciences" },
            { value: "Technical Sciences", label: "Technical Sciences" },
        ]
    },
    {
        label: "Commerce",
        options: [
            { value: "Accounting", label: "Accounting" },
            { value: "Business Studies", label: "Business Studies" },
            { value: "Economics", label: "Economics" },
        ]
    },
    {
        label: "Humanities",
        options: [
            { value: "History", label: "History" },
            { value: "Geography", label: "Geography" },
            { value: "Religion Studies", label: "Religion Studies" },
            { value: "Life Orientation", label: "Life Orientation" },
        ]
    },
    {
        label: "Other",
        options: [
            { value: "Consumer Studies", label: "Consumer Studies" },
            { value: "Tourism", label: "Tourism" },
            { value: "Computer Applications Technology", label: "Computer Applications Technology" },
            { value: "Information Technology", label: "Information Technology" },
            { value: "Engineering Graphics & Design", label: "Engineering Graphics & Design" },
            { value: "Visual Arts", label: "Visual Arts" },
            { value: "Music", label: "Music" },
            { value: "Dramatic Arts", label: "Dramatic Arts" },
        ]
    }
];
