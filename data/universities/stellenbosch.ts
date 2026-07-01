import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * Stellenbosch University (SU) class
 */
export class Stellenbosch extends BaseUniversity {
  readonly id = "su";
  readonly name = "Stellenbosch University";
  readonly shortName = "SU";
  readonly website = "https://www.sun.ac.za";
  readonly logo = "/logos/stellenbosch.png";
  readonly location = {
    city: "Stellenbosch",
    province: "Western Cape",
    coordinates: {
      latitude: -33.9328,
      longitude: 18.8644,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of AgriSciences
    {
      id: "su-bagric-agribusiness",
      name: "BAgric in Agribusiness Management",
      faculty: "Faculty of AgriSciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Manager in agribusinesses, focusing on crop or animal production", "Agricultural economist at a financial institution (feasibility studies, business plans, cash flow planning)"],
    },
    {
      id: "su-bscagric-agricultural-economics",
      name: "BScAgric in Agricultural Economics",
      faculty: "Faculty of AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      careerOpportunities: ["Researcher in macroeconomic analysis (impact assessment and design of agricultural and food policy)", "Agricultural economist at a financial institution or marketing organisation (valuations, risk analyses, business plans, cash flow)", "Manager and specialist at public sector or international organisations dealing with economic development (e.g. the World Bank)", "Manager of food-processing concerns"],
    },

    // Faculty of Economic and Management Sciences
    {
      id: "su-bcom-economic-sciences",
      name: "BCom (Economic Sciences)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 65% (excluding Life Orientation)", "To register for the Econometrics and Financial Sector focal areas, a Grade 12 Mathematics final mark of 70% (Level 6) or higher is required for Actuarial Science 112."],
      careerOpportunities: ["Manager", "Journalist", "Business Analyst", "Investment Analyst", "Entrepreneur", "Diplomat", "Civil Servant", "Researcher", "Consultant", "Academic", "Public Sector Professional", "Teacher"],
    },
    {
      id: "su-ba-ppe",
      name: "BA in Political, Philosophical and Economic Studies (PPE)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 63% (excluding Life Orientation)"],
      careerOpportunities: ["Manager", "Journalist", "Business Analyst", "Investment Analyst", "Entrepreneur", "Diplomat", "Civil Servant", "Researcher", "Consultant", "Academic"],
    },

    // Engineering
    {
      id: "su-beng-mechanical",
      name: "BEng (Mechanical)",
      faculty: "Engineering",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 70% (excluding Life Orientation).", "Applicants must meet one of the following language requirements: English Home Language 50% (Level 4), OR English First Additional Language 60% (Level 5), OR English First Additional Language 50% (Level 4) with Afrikaans Home Language 50% (Level 4), OR English First Additional Language 50% (Level 4) with Afrikaans Second Additional Language 60% (Level 5).", "Applicants are also subject to selection according to selection criteria (selection mark calculated using Mathematics percentage + Physical Sciences percentage + (6 x Matric average))."],
      careerOpportunities: ["Mechanical engineering is characterised by the motion and transfer of energy, for example in vehicles, aeroplanes, vessels, missiles, cooling systems, power stations and engines, but also includes machines used in all branches of the economy, such as process plants and manufacturing industries."],
    },
    {
      id: "su-beng-mechatronic",
      name: "BEng (Mechatronic)",
      faculty: "Engineering",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 70% (excluding Life Orientation).", "Applicants must meet one of the following language requirements: English Home Language 50% (Level 4), OR English First Additional Language 60% (Level 5), OR English First Additional Language 50% (Level 4) with Afrikaans Home Language 50% (Level 4), OR English First Additional Language 50% (Level 4) with Afrikaans Second Additional Language 60% (Level 5).", "Applicants are also subject to selection according to selection criteria (selection mark calculated using Mathematics percentage + Physical Sciences percentage + (6 x Matric average))."],
      careerOpportunities: ["Mechatronic engineers focus on systems characterised by close integration of mechanical components, electronic sensors, mechanical and electrical actuators and computer controllers. Examples of mechatronic systems include electronic engine control systems, robot systems and automated assembly lines."],
    },
    {
      id: "su-beng-chemical",
      name: "BEng (Chemical)",
      faculty: "Engineering",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 70% (excluding Life Orientation).", "Applicants must meet one of the following language requirements: English Home Language 50% (Level 4), OR English First Additional Language 60% (Level 5), OR English First Additional Language 50% (Level 4) with Afrikaans Home Language 50% (Level 4), OR English First Additional Language 50% (Level 4) with Afrikaans Second Additional Language 60% (Level 5).", "Applicants are also subject to selection according to selection criteria (selection mark calculated using Mathematics percentage + Physical Sciences percentage + (6 x Matric average))."],
      careerOpportunities: ["Chemical engineers specialise in the large-scale operation of processes by which various consumer products are produced, such as chemicals, pharmaceutical products, fertilisers, fuels, metals and other materials. They are also involved where effluents and waste materials are processed and recycled."],
    },
    {
      id: "su-beng-civil",
      name: "BEng (Civil)",
      faculty: "Engineering",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An NSC aggregate of at least 70% (excluding Life Orientation).", "Applicants must meet one of the following language requirements: English Home Language 50% (Level 4), OR English First Additional Language 60% (Level 5), OR English First Additional Language 50% (Level 4) with Afrikaans Home Language 50% (Level 4), OR English First Additional Language 50% (Level 4) with Afrikaans Second Additional Language 60% (Level 5).", "Applicants are also subject to selection according to selection criteria (selection mark calculated using Mathematics percentage + Physical Sciences percentage + (6 x Matric average))."],
      careerOpportunities: ["Civil engineers are responsible for large, permanent works such as irrigation systems, bridges, dams, harbours, canals, airports, roads and streets, pipelines, sewerage systems, railways, structures of various kinds and structure foundations, stormwater systems, tunnels, towers, water supply systems, and various kinds of heavy construction work."],
    },
    {
      id: "su-beng-electrical-electronic",
      name: "BEng (Electrical and Electronic)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-beng-industrial",
      name: "BEng (Industrial)",
      faculty: "Engineering",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },

    // Law
    {
      id: "su-bcom-law",
      name: "BCom (Law)",
      faculty: "Law",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Write the NBTs AQL and MAT before 31 July.", "An aggregate of at least 70% (excluding Life Orientation) in the NSC or IEB school-leaving certificate."],
      careerOpportunities: ["The degree provides the necessary background for a career in the business world and commercial law. The BCom (Law) degree also provides entry to the 2-year LLB degree, which you must complete if you wish to become a legal practitioner (attorney or advocate)."],
    },
    {
      id: "su-baccllb",
      name: "BAccLLB",
      faculty: "Law",
      apsMin: 42,
      duration: "5 years",
      subjectRequirements: {
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 5 },
          ],
        },
      },
      additionalRequirements: ["Write the NBTs AQL and MAT before 31 July.", "An aggregate of at least 80% (excluding Life Orientation) in the NSC or IEB school-leaving certificate.", "Selection is based on final Grade 11 (or if available final Grade 12 results) and the National Benchmark Test results in an 80:20 ratio."],
      careerOpportunities: ["Graduates can therefore choose to pursue a career in either law or accounting or any related field. The LLB enables you to enter the legal profession, after having completed practical training and passed the prescribed examinations. The BAcc gives you access to a postgraduate qualification in accounting which is required for becoming a chartered accountant."],
    },
    {
      id: "su-llb-four-year",
      name: "LLB (four-year)",
      faculty: "Law",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "language": {
          alternatives: [
            { subject: "english home language", level: 5 },
            { subject: "afrikaans home language", level: 5 },
            { subject: "english first additional language", level: 6 },
            { subject: "afrikaans first additional language", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Write the NBTs AQL before 31 July.", "An aggregate of at least 70% (excluding Life Orientation) in the NSC or IEB school-leaving certificate.", "If you wish to take Economics as a university subject, then also: Mathematics 60% (Level 5).", "If you wish to take a university subject from another faculty, please make sure that you meet its requirements."],
      careerOpportunities: ["Legal practitioner (attorney or advocate) after having completed the prescribed practical training and passing the entrance examinations set by the profession", "Judge (Magistrate, Regional Magistrate, High Court Judge, Appeal Court Judge, Constitutional Court Judge)", "Public Prosecutor", "Deeds Office examiner or registrar", "Master of the High Court: clerk or registrar", "Legal advisor (in-house legal counsel)", "Compliance manager", "Mediator or arbitrator", "Public Protector", "Academic (lecturer)", "Non-governmental organisation (NGO) work", "Entrepreneur", "Business manager", "Journalist", "National or provincial government"],
    },
    {
      id: "su-llb-three-year",
      name: "LLB (three-year)",
      faculty: "Law",
      apsMin: 36,
      duration: "3 years",
      additionalRequirements: ["This degree is only available as a second bachelor’s degree and is aimed at bachelor graduates from disciplines other than law.", "Selection is based on the prior bachelor’s degree and only applicants that have achieved at least a 60% aggregate in the prior degree are considered for selection."],
      careerOpportunities: ["Legal practitioner (attorney or advocate) after having completed the prescribed practical training and passing the entrance examinations set by the profession", "Judge (Magistrate, Regional Magistrate, High Court Judge, Appeal Court Judge, Constitutional Court Judge)", "Public Prosecutor", "Deeds Office examiner or registrar", "Master of the High Court: clerk or registrar", "Legal advisor (in-house legal counsel)", "Compliance manager", "Mediator or arbitrator", "Public Protector", "Academic (lecturer)", "Non-governmental organisation (NGO) work", "Entrepreneur", "Business manager", "Journalist", "National or provincial government"],
    },
    {
      id: "su-ba-law",
      name: "BA (Law)",
      faculty: "Law",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
      additionalRequirements: ["Write the NBTs AQL before 31 July.", "An aggregate of at least 70% (excluding Life Orientation) in the NSC or IEB school-leaving certificate.", "If you wish to take Economics as a university subject, then also: Mathematics 60% (Level 5).", "If you wish to take a university subject from another faculty, please make sure that you meet its requirements."],
      careerOpportunities: ["The degree enriches one’s understanding of languages, human behavior and social issues. The BA (Law) degree also provides entry to the 2-year LLB degree, which you must complete if you wish to become a legal practitioner (attorney or advocate)."],
    },
    {
      id: "su-llb",
      name: "LLB (4-year)",
      faculty: "Law",
      apsMin: 35,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
    },

    // Medicine and Health Sciences
    {
      id: "su-boccupational-therapy",
      name: "Bachelor of Occupational Therapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 3,
        "Life Sciences": 3,
      },
      additionalRequirements: ["An aggregate of at least 60% for the NSC or an equivalent qualification (excluding Life Orientation)."],
      careerOpportunities: ["After a year of community service, you may register at the HPCSA as an Occupational Therapist."],
    },
    {
      id: "su-bsc-physiotherapy",
      name: "BSc in Physiotherapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
      },
      additionalRequirements: ["An aggregate of at least 60% for the NSC or an equivalent qualification (excluding Life Orientation)."],
      careerOpportunities: ["After a year of community service, you may register at the HPCSA as a Physiotherapist."],
    },
    {
      id: "su-bspeech-language",
      name: "Bachelor of Speech-Language and Hearing Therapy",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Science": {
          alternatives: [
            { subject: "Physical Sciences", level: 3 },
            { subject: "Life Sciences", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An aggregate of at least 60% for the NSC or an equivalent qualification (excluding Life Orientation).", "At least TWO of the following THREE languages (Home Language or First Additional Language) 60% (Level 5): English AND/OR Afrikaans AND/OR a third South African language."],
      careerOpportunities: ["After a year of community service, you may register at the HPCSA as a Speech-Language Therapist."],
    },
    {
      id: "su-mbchb",
      name: "MBChB",
      faculty: "Medicine and Health Sciences",
      apsMin: 36,
      duration: "6 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Life Sciences": 3,
      },
      additionalRequirements: ["An aggregate of at least 75% for the NSC or an equivalent qualification (excluding Life Orientation)."],
      careerOpportunities: ["After an internship of two years and a community service year, you will be eligible to register at the HPCSA in the category Independent Medical Practitioner."],
    },
    {
      id: "su-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Life Sciences": 3,
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
      },
      additionalRequirements: ["An aggregate of at least 60% for the NSC or an equivalent qualification (excluding Life Orientation)."],
      careerOpportunities: ["After a year of community service, you may register with SANC as a Nurse and Midwife."],
    },
    {
      id: "su-bsc-dietetics",
      name: "BSc in Dietetics",
      faculty: "Medicine and Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 3,
        "Physical Sciences": 3,
        "Life Sciences": 3,
      },
      additionalRequirements: ["An aggregate of at least 60% for the NSC or an equivalent qualification (excluding Life Orientation)."],
      careerOpportunities: ["After a year of community service, you may register at the HPCSA as a Dietitian."],
    },

    // Science
    {
      id: "su-bsc-biodiversity",
      name: "BSc Biodiversity and Ecology",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An aggregate of at least 65% for the NSC (excluding Life Orientation)."],
      careerOpportunities: ["botanist", "zoologist", "plant biotechnologist", "conservation scientist", "forensic scientist", "marine scientist", "environmental assessment practitioner", "conservation technician", "ecologist", "laboratory analyst", "environmental consultant", "environmental impact expert", "land-use planner", "agricultural advisor", "environmental educator", "life sciences teacher (after completion of Postgraduate Certificate in Education)"],
    },
    {
      id: "su-bsc-human-life",
      name: "BSc Human Life Sciences",
      faculty: "Science",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      additionalRequirements: ["An aggregate of at least 65% for the NSC (excluding Life Orientation).", "Mathematics requirement depends on your subject combination in your first year at university: 70% (Level 6) if you take Mathematics and Physics as first-year subjects; 60% (Level 5) if you take Mathematics (Bio) and Physics (Bio) as first-year subjects."],
      careerOpportunities: ["forensic scientist", "physiologist", "stem cell researcher", "laboratory analyst", "medical representative", "biomedical scientist", "exercise physiologist", "nutritionist", "clinical researcher", "biochemist", "human geneticist", "forensic or clinical psychologist (with the necessary postgraduate qualification)", "life sciences teacher (after completion of Postgraduate Certificate in Education)", "anthropometrist", "biotechnologist: work on human cells, development of new medicines", "science journalist (with the necessary postgraduate qualification)"],
    },
    {
      id: "su-bsc-molecular-biology",
      name: "BSc Molecular Biology and Biotechnology",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-sport-science",
      name: "BSc Sport Science",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-chemistry",
      name: "BSc Chemistry",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-earth-science",
      name: "BSc Earth Science",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-geoinformatics",
      name: "BSc GeoInformatics",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-physics",
      name: "BSc Physics",
      faculty: "Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },

    // Faculty of Science
    {
      id: "su-bsc-mathematical-sciences",
      name: "BSc Mathematical Sciences",
      faculty: "Faculty of Science",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      careerOpportunities: ["actuarial analyst", "quantitative analyst", "credit analyst", "risk manager", "risk product developer", "business intelligence analyst", "forensic computer analyst", "computer systems analyst", "database administrator", "financial analyst", "mathematician", "operations research analyst", "acoustic consultant", "data analyst", "investment analyst", "software tester", "games designer and developer", "CAD designer", "financial manager", "mathematics teacher (after completion of Postgraduate Certificate in Education)", "operations researcher", "supply chain analyst", "data scientist", "lecturer", "researcher in interdisciplinary scientific fields which rely more on structural mathematics rather than analytical mathematics", "consultant in the engineering industry", "programmer", "expert in the modelling of dynamic processes", "image processing", "numerical methods and flow modelling in banking or the engineering or computer industry", "careers requiring sophisticated quantitative skills, such as in the banking, investment and insurance sectors", "process or system optimiser", "logistics expert in the transportation and provisioning sectors", "project developer", "planner", "application possibilities in company farming", "mining", "forestry", "the manufacturing sector", "product marketing", "systems designer", "software developer in the security and banking industries", "network specialist", "designer of mobile applications for smartphones and tablets", "3D animator for the film industry"],
    },
    {
      id: "su-bsc-computer-science",
      name: "BSc Computer Science",
      faculty: "Faculty of Science",
      apsMin: 36,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
      careerOpportunities: ["actuarial analyst", "quantitative analyst", "credit analyst", "risk manager", "risk product developer", "business intelligence analyst", "forensic computer analyst", "computer systems analyst", "database administrator", "financial analyst", "mathematician", "operations research analyst", "acoustic consultant", "data analyst", "investment analyst", "software tester", "games designer and developer", "CAD designer", "financial manager", "mathematics teacher (after completion of Postgraduate Certificate in Education)", "operations researcher", "supply chain analyst", "data scientist", "lecturer", "researcher in interdisciplinary scientific fields which rely more on structural mathematics rather than analytical mathematics", "consultant in the engineering industry", "programmer", "expert in the modelling of dynamic processes", "image processing", "numerical methods and flow modelling in banking or the engineering or computer industry", "careers requiring sophisticated quantitative skills, such as in the banking, investment and insurance sectors", "process or system optimiser", "logistics expert in the transportation and provisioning sectors", "project developer", "planner", "application possibilities in company farming", "mining", "forestry", "the manufacturing sector", "product marketing", "systems designer", "software developer in the security and banking industries", "network specialist", "designer of mobile applications for smartphones and tablets", "3D animator for the film industry"],
    },
    {
      id: "sun-bsc-interdisciplinary",
      name: "BSc (Interdisciplinary Programmes)",
      faculty: "Faculty of Science",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "mathematics": 6,
        "afrikaans home language": {
          alternatives: [
            { subject: "afrikaans home language", level: 4 },
            { subject: "english home language", level: 4 },
            { subject: "afrikaans first additional language", level: 4 },
            { subject: "english first additional language", level: 4 },
          ],
        },
        "physical sciences": 4,
      },
      careerOpportunities: ["analyst", "development chemist", "research assistant", "onsite chemist", "medical chemist", "data scientist", "machine learning engineer", "machine learning scientist", "applications architect", "business intelligence (BI) developer", "statistician", "data analyst", "medical science liaison", "pharmaceutical scientist", "clinical trial associate", "regulatory affairs specialist", "pharmacovigilance officer", "quality assurance specialist", "medical representative", "medical epidemiologist", "biomedical engineer", "personalised medicine analyst", "researcher in systems biology"],
    },
    {
      id: "sun-bsc-ecp",
      name: "BSc Extended Curriculum Programmes",
      faculty: "Faculty of Science",
      apsMin: 30,
      duration: "4 years",
    },

    // Interfaculty
    {
      id: "su-bdatsci",
      name: "Bachelor of Data Science (BDatSci)",
      faculty: "Interfaculty",
      apsMin: 36,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
      careerOpportunities: ["analyst", "development chemist", "research assistant", "onsite chemist", "medical chemist", "data scientist", "machine learning engineer", "machine learning scientist", "applications architect", "business intelligence (BI) developer", "statistician", "data analyst", "medical science liaison", "pharmaceutical scientist", "clinical trial associate", "regulatory affairs specialist", "pharmacovigilance officer", "quality assurance specialist", "medical representative", "medical epidemiologist", "biomedical engineer", "personalised medicine analyst", "researcher in systems biology"],
    },

    // Faculty of Theology
    {
      id: "su-bth",
      name: "BTh (Bachelor of Theology)",
      faculty: "Faculty of Theology",
      apsMin: 30,
      duration: "3 years",
      careerOpportunities: ["youth worker", "counsellor", "community worker"],
    },
    {
      id: "su-bdiv",
      name: "BDiv (Bachelor of Divinity)",
      faculty: "Faculty of Theology",
      apsMin: 30,
      duration: "4 years",
      careerOpportunities: ["ministerial training (first step)", "minister in the Dutch Reformed Church (DRC) (after BDiv and MDiv, and Postgraduate Diploma in Theology (Christian Ministry))", "minister in the Uniting Reformed Church (URC) (after BDiv and MDiv)", "Presbyterian ministry candidate", "Anglican ministry candidate", "Volkskerk ministry candidate"],
    },

    // AgriSciences
    {
      id: "su-bscfor",
      name: "BSc in Forestry (Forestry and Wood Sciences)",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bscagric-plant-soil",
      name: "BScAgric in Plant and Soil Science",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bscagric-viticulture",
      name: "BScAgric in Viticulture and Oenology",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bscagric-animal",
      name: "BScAgric in Animal Production Systems",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-conservation",
      name: "BSc in Conservation Ecology",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsc-food-science",
      name: "BSc in Food Science",
      faculty: "AgriSciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Physical Sciences": 3,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },

    // Arts and Social Sciences
    {
      id: "su-ba-humanities",
      name: "BA in Humanities",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-language-culture",
      name: "BA in Language and Culture",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-development-environment",
      name: "BA in Development and the Environment",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-music",
      name: "BA in Music",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-drama",
      name: "BA in Drama and Theatre Studies",
      faculty: "Arts and Social Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
    },
    {
      id: "su-ba-hr",
      name: "BA in Human Resource Management",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 5 },
          ],
        },
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-international",
      name: "BA in International Studies",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bmus",
      name: "Bachelor of Music (BMus)",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bsw",
      name: "Bachelor of Social Work",
      faculty: "Arts and Social Sciences",
      apsMin: 32,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-ba-visual-arts",
      name: "BA in Visual Arts",
      faculty: "Arts and Social Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },

    // Economic and Management Sciences
    {
      id: "su-bcom-management-sciences",
      name: "BCom (Management Sciences)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bcom-mathematical-sciences",
      name: "BCom (Mathematical Sciences)",
      faculty: "Economic and Management Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 5,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bcom-international-business",
      name: "BCom (International Business)",
      faculty: "Economic and Management Sciences",
      apsMin: 40,
      duration: "4 years",
      subjectRequirements: {
        "Mathematics": 5,
        "English": 5,
      },
    },
    {
      id: "su-bcom-actuarial-science",
      name: "BCom (Actuarial Science)",
      faculty: "Economic and Management Sciences",
      apsMin: 40,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 6,
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
    },
    {
      id: "su-bcom-industrial-psychology",
      name: "BCom (Industrial Psychology)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bacc",
      name: "BAcc",
      faculty: "Economic and Management Sciences",
      apsMin: 35,
      duration: "3 years",
      subjectRequirements: {
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 5 },
            { subject: "Accounting", level: 5 },
          ],
        },
      },
    },
    {
      id: "su-bcom-management-accounting",
      name: "BCom (Management Accounting)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },
    {
      id: "su-bcom-financial-accounting",
      name: "BCom (Financial Accounting)",
      faculty: "Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "Mathematics": 4,
        "Language": {
          alternatives: [
            { subject: "English", level: 3 },
            { subject: "Afrikaans", level: 3 },
          ],
        },
      },
    },

    // Education
    {
      id: "su-bed-foundation",
      name: "BEd (Foundation Phase Education)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
    },
    {
      id: "su-bed-intermediate",
      name: "BEd (Intermediate Phase Education)",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 4 },
          ],
        },
        "Language": {
          alternatives: [
            { subject: "English", level: 4 },
            { subject: "Afrikaans", level: 4 },
          ],
        },
      },
    },
  ];

  /**
   * Stellenbosch-specific APS calculation
   * Uses standard South African APS system
   * - Best 6 subjects excluding Life Orientation
   * - Standard 7-point NSC scale
   */
  calculateApsScore(subjects: Record<string, number>): number {
    const subjectScores: number[] = [];

    for (const [subjectName, percentage] of Object.entries(subjects)) {
      if (subjectName.toLowerCase().includes("life orientation")) {
        continue;
      }

      let points = 0;
      if (percentage >= 80) points = 7;
      else if (percentage >= 70) points = 6;
      else if (percentage >= 60) points = 5;
      else if (percentage >= 50) points = 4;
      else if (percentage >= 40) points = 3;
      else if (percentage >= 30) points = 2;
      else if (percentage >= 0) points = 1;

      subjectScores.push(points);
    }

    subjectScores.sort((a, b) => b - a);
    const top6 = subjectScores.slice(0, 6);

    return top6.reduce((sum, score) => sum + score, 0);
  }
}
