export const PAST_PAPER_SUBJECTS = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "English",
    "Afrikaans",
    "IsiZulu",
    "IsiXhosa",
    "Sepedi",
    "Sesotho",
    "Setswana",
    "Tshivenda",
    "Xitsonga",
    "SiSwati",
    "Accounting",
    "Agricultural Sciences",
    "Business Studies",
    "Computer Applications Technology",
    "Consumer Studies",
    "Dramatic Arts",
    "Economics",
    "Electrical Technology",
    "Engineering Graphics and Design",
    "Geography",
    "History",
    "Hospitality Studies",
    "Information Technology",
    "Life Orientation",
    "Mathematical Literacy",
    "Mechanical Technology",
    "Music",
    "Religion Studies",
    "Tourism",
    "Visual Arts",
    "HL",
    "FAL"
];

export const PAST_PAPER_YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i);

export const getYearCardStyles = (year: number): string => {
    if (year >= 2023) return "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40";
    if (year >= 2020) return "bg-green-500/10 border-green-500/20 hover:border-green-500/40";
    if (year >= 2017) return "bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40";
    if (year >= 2014) return "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40";
    return "bg-red-500/10 border-red-500/20 hover:border-red-500/40";
};

export const getYearBadgeStyles = (year: number): string => {
    if (year >= 2023) return "bg-blue-500 text-white";
    if (year >= 2020) return "bg-green-500 text-white";
    if (year >= 2017) return "bg-yellow-500 text-white";
    if (year >= 2014) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
};
