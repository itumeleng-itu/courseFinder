import { BaseUniversity } from "./base-university";
import type { Course } from "@/lib/types";

/**
 * University of the Free State (UFS) class
 */
export class UFS extends BaseUniversity {
  readonly id = "ufs";
  readonly name = "University of the Free State";
  readonly shortName = "UFS";
  readonly website = "https://www.ufs.ac.za";
  readonly logo = "/logos/ufs.png";
  readonly location = {
    city: "Bloemfontein",
    province: "Free State",
    coordinates: {
      latitude: -29.1076,
      longitude: 26.1857,
    },
  };

  protected readonly _courses: Course[] = [
    // Faculty of Education
    {
      id: "ufs-bed-foundation-phase",
      name: "BEd Foundation Phase",
      faculty: "Faculty of Education",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
      },
      careerOpportunities: ["Educator"],
    },

    // Faculty of Economic and Management Sciences
    {
      id: "ufs-bcom",
      name: "Bachelor of Commerce (BCom)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Private Sector Management"],
    },
    {
      id: "ufs-bcom-economics",
      name: "BCom with specialisation in Economics",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Economics", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-finance",
      name: "BCom with specialisation in Finance",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Finance", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-business-analytics",
      name: "BCom with specialisation in Business Analytics",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Business Analytics", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-marketing",
      name: "BCom with specialisation in Marketing",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Marketing", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-business",
      name: "BCom with specialisation in Business Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Business Management", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-hr",
      name: "BCom with specialisation in Human Resource Management",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Human Resource Management", "Private Sector Management"],
    },
    {
      id: "ufs-bcom-law",
      name: "BCom (Law)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Law", "Private Sector Management"],
    },
    {
      id: "ufs-badmin",
      name: "Bachelor of Administration (BAdmin)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Public Sector Management"],
    },
    {
      id: "ufs-bacc",
      name: "Bachelor of Accounting (BAcc)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      additionalRequirements: ["SAICA accredited", "Selection based on merit and space availability"],
      careerOpportunities: ["Chartered Accountant (SA)"],
    },
    {
      id: "ufs-bcom-accounting",
      name: "BCom (Accounting)",
      faculty: "Faculty of Economic and Management Sciences",
      apsMin: 28,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["AGA(SA)", "SAIPA", "ACCA", "CIMA"],
    },

    // Faculty of Law
    {
      id: "ufs-llb",
      name: "Bachelor of Laws (LLB)",
      faculty: "Faculty of Law",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 6,
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 4 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
      },
      additionalRequirements: ["Selection based on merit and space availability"],
      careerOpportunities: ["Advocate", "Attorney", "Legal Advisor", "Magistrate", "Prosecutor"],
    },

    // Faculty of Natural and Agricultural Sciences
    {
      id: "ufs-bsc-biological",
      name: "Bachelor of Science specialising in Biological Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Behavioural Genetics", "Biochemistry", "Botany", "Entomology", "Genetics", "Microbiology", "Physiology", "Statistics", "Zoology", "Biodiversity and Conservation Ecology", "Plant Health Ecology", "Plant Health Management"],
    },
    {
      id: "ufs-bsc-forensic",
      name: "Bachelor of Science specialising in Forensic Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
        "Life Sciences": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Selection process required", "Cumulative AP score of at least 17 for Mathematics, Life Sciences, and Physical Sciences"],
      careerOpportunities: ["Forensic Science"],
    },
    {
      id: "ufs-bsc-mathematical",
      name: "Bachelor of Science specialising in Mathematical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Mathematics and Applied Mathematics", "Mathematics and Chemistry", "Mathematics and Mathematical Statistics", "Mathematics and Physics"],
    },
    {
      id: "ufs-bsc-actuarial",
      name: "Bachelor of Science specialising in Actuarial Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
      },
      additionalRequirements: ["Selection process required"],
      careerOpportunities: ["Actuarial Science"],
    },
    {
      id: "ufs-bsc-mathematical-statistics",
      name: "Bachelor of Science specialising in Mathematical Statistics and Applied Statistics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": {
          alternatives: [
            { subject: "mathematics", level: 6 },
            { subject: "mathematics", level: 5 },
          ],
        },
        "physical sciences": 5,
      },
      careerOpportunities: ["Climate Sciences", "Econometrics", "Mathematical Statistics and Psychometrics", "Statistics and Economics", "Statistics and Psychology"],
    },
    {
      id: "ufs-bsc-chemical",
      name: "Bachelor of Science specialising in Chemical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Chemistry and Biochemistry", "Chemistry and Botany", "Chemistry and Microbiology", "Chemistry and Physics"],
    },
    {
      id: "ufs-bsc-physical",
      name: "Bachelor of Science specialising in Physical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Physics and Agrometeorology", "Physics and Astrophysics"],
    },
    {
      id: "ufs-bsc-physical-sciences-engineering",
      name: "Bachelor of Science specialising in Physical Science with Engineering Subjects",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      careerOpportunities: ["Physics and Engineering Subjects"],
    },
    {
      id: "ufs-beng-agricultural-biosystems",
      name: "BENG Agricultural and Biosystems Engineering",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 6,
        "physical sciences": 5,
      },
      additionalRequirements: ["Subject to selection"],
      careerOpportunities: ["Agricultural and Biosystems Engineering"],
    },
    {
      id: "ufs-bsc-geography-soil-science",
      name: "Bachelor of Science specialising in Geography and Environmental Soil Science",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
        "life sciences": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Geography and Environmental Science", "Geography Specialisation", "Environmental Soil Science"],
    },
    {
      id: "ufs-bsc-geology",
      name: "Bachelor of Science specialising in Geology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Geology and Chemistry", "Environmental Geology", "Geochemistry", "Geology", "Geology and Physics"],
    },
    {
      id: "ufs-bsc-agric-econ",
      name: "Bachelor of Science in Agricultural Economics",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      careerOpportunities: ["Agricultural Economics"],
    },
    {
      id: "ufs-bsc-it",
      name: "Bachelor of Science in Information Technology",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Subject to selection"],
      careerOpportunities: ["Computer Science and Chemistry", "Computer Science and Mathematical Statistics", "Computer Science and Mathematics", "Computer Science and Physics", "Data Science", "Computer Science and Business Management"],
    },
    {
      id: "ufs-bcis",
      name: "Bachelor of Computer Information Systems",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 33,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      careerOpportunities: ["Computer Information Systems"],
    },
    {
      id: "ufs-bsfs",
      name: "Bachelor of Sustainable Food Systems",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 2,
      },
      careerOpportunities: ["Sustainable Food Systems"],
    },
    {
      id: "ufs-bagric",
      name: "Bachelor of Agriculture",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 3,
      },
      additionalRequirements: ["Mathematical Literacy Level 7 accepted if AP is 31 or above"],
      careerOpportunities: ["Agricultural Extension", "Animal Production Management", "Crop Production", "Mixed Farming Management", "Irrigation Management", "Agricultural Economics", "Agricultural Management"],
    },
    {
      id: "ufs-bsc-agric",
      name: "Bachelor of Science in Agriculture",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 32,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Physical Sciences and Mathematics are compulsory"],
      careerOpportunities: ["Animal Science", "Agrometeorology", "Agronomy", "Plant Breeding", "Plant Pathology", "Soil Science"],
    },
    {
      id: "ufs-barch",
      name: "Bachelor of Architecture",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Subject to selection"],
      careerOpportunities: ["Architectural draughtsperson", "Architectural technologist", "Professional architect"],
    },
    {
      id: "ufs-bsc-construction",
      name: "Bachelor of Science in Construction Economics and Management",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      additionalRequirements: ["Selection process"],
      careerOpportunities: ["Quantity Surveyor", "Construction Manager"],
    },
    {
      id: "ufs-bsc-construction-management-compact",
      name: "Bachelor of Science specialising in Construction Management (Compact Learning)",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
        "economics or business studies or accounting or physical sciences": 4,
      },
      additionalRequirements: ["Selection process", "Minimum 22 years of age", "Proof of full-time employment in the construction industry"],
      careerOpportunities: ["Construction Manager"],
    },
    {
      id: "ufs-bsc-quantity-surveying-compact",
      name: "Bachelor of Science specialising in Quantity Surveying (Compact Learning)",
      faculty: "Faculty of Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
        "economics or business studies or accounting or physical sciences": 4,
      },
      additionalRequirements: ["Selection process", "Minimum 22 years of age", "Proof of full-time employment in the construction industry"],
      careerOpportunities: ["Quantity Surveyor"],
    },

    // Faculty of Natural and Agricultural Sciences (Qwaqwa)
    {
      id: "ufs-bsc-chemical-physical-sciences",
      name: "Bachelor of Science specialising in Chemical and Physical Sciences",
      faculty: "Faculty of Natural and Agricultural Sciences (Qwaqwa)",
      apsMin: 32,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
        "mathematics": 5,
        "physical sciences": 5,
      },
      careerOpportunities: ["Chemist", "Physicist"],
    },
    {
      id: "ufs-bsc-geography",
      name: "Bachelor of Science specialising in Geography",
      faculty: "Faculty of Natural and Agricultural Sciences (Qwaqwa)",
      apsMin: 32,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      careerOpportunities: ["Geographer", "Environmental Consultant"],
    },

    // Faculty of The Humanities
    {
      id: "ufs-hcert-music",
      name: "Higher Certificate in Music Performance",
      faculty: "Faculty of The Humanities",
      apsMin: 20,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Compulsory audition", "Musical aptitude test"],
      careerOpportunities: ["Musician"],
    },
    {
      id: "ufs-dip-music",
      name: "Diploma in Music",
      faculty: "Faculty of The Humanities",
      apsMin: 25,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Grade 5 instrument/voice", "Audition", "Theory proficiency test"],
      careerOpportunities: ["Musician"],
    },
    {
      id: "ufs-ba-language-practice",
      name: "BA (Language Practice)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["Selection process"],
      careerOpportunities: ["Translator", "Language Practitioner"],
    },
    {
      id: "ufs-ba-governance",
      name: "BA (Governance and Political Transformation)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Political Analyst", "Public Administrator"],
    },
    {
      id: "ufs-ba-communication",
      name: "BA (Integrated Organisational Communication)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Communications Officer", "Public Relations Specialist"],
    },
    {
      id: "ufs-ba-journalism",
      name: "BA (Journalism)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Journalist", "Media Specialist"],
    },
    {
      id: "ufs-ba-fine-arts",
      name: "BA (Fine Arts)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Portfolio of creative work", "Selection process"],
      careerOpportunities: ["Artist", "Curator"],
    },
    {
      id: "ufs-ba-drama",
      name: "BA (Drama and Theatre Arts)",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Audition", "Interview", "Selection process"],
      careerOpportunities: ["Actor", "Theatre Practitioner"],
    },
    {
      id: "ufs-bmusic",
      name: "Bachelor of Music",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Music Theory Grade 5", "Performance Grade 7", "Audition", "Theory proficiency test"],
      careerOpportunities: ["Musician", "Music Teacher"],
    },
    {
      id: "ufs-bsocsci",
      name: "Bachelor of Social Sciences",
      faculty: "Faculty of The Humanities",
      apsMin: 30,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
      },
      careerOpportunities: ["Psychologist", "Sociologist", "Social Researcher"],
    },
    {
      id: "ufs-bsocwork",
      name: "Bachelor of Social Work",
      faculty: "Faculty of The Humanities",
      apsMin: 35,
      duration: "Not specified",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["Selection process"],
      careerOpportunities: ["Social Worker"],
    },

    // Faculty of Theology and Religion
    {
      id: "ufs-b-divinity",
      name: "Bachelor of Divinity",
      faculty: "Faculty of Theology and Religion",
      apsMin: 28,
      duration: "Not specified",
      subjectRequirements: {
        "english home language": 4,
      },
      additionalRequirements: ["Selection form", "UFS test of academic literacy"],
      careerOpportunities: ["Minister of Religion", "Theologian"],
    },

    // Kovsie Phahamisa Academy
    {
      id: "ufs-slp-french-1",
      name: "French Foreign Language Acquisition for Beginners Part 1",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "16 weeks",
      additionalRequirements: ["National Senior Certificate or equivalent", "Basic computer skills", "Access to internet and electronic device", "Proficiency in English"],
    },
    {
      id: "ufs-slp-french-2",
      name: "French Foreign Language Acquisition for Beginners Part 2",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "16 weeks",
      additionalRequirements: ["National Senior Certificate or equivalent", "Successfully completed French Foreign Language Acquisition for Beginners part 1", "Proficiency in English", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-entrepreneurship",
      name: "Entrepreneurship and Innovation",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "6 weeks",
      additionalRequirements: ["Relevant work experience", "Letter of motivation", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-financial-management",
      name: "Financial Management and Cost Accounting",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "6 weeks",
      additionalRequirements: ["Relevant work experience", "Letter of motivation", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-gen-management",
      name: "General Management and Communication",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "6 weeks",
      additionalRequirements: ["Relevant work experience", "Letter of motivation", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-marketing",
      name: "Marketing and Digital Marketing",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "6 weeks",
      additionalRequirements: ["Relevant work experience", "Letter of motivation", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-operations",
      name: "Operations and Logistics Management",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "6 weeks",
      additionalRequirements: ["Relevant work experience", "Letter of motivation", "Basic computer skills", "Access to internet and electronic device"],
    },
    {
      id: "ufs-slp-building-quantities",
      name: "Introduction to Building Quantities",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "4 weeks",
      additionalRequirements: ["National Senior Certificate or higher education qualification or currently employed in the construction industry", "Standard of competence sufficient for degree study", "Recognition of prior learning considered"],
    },
    {
      id: "ufs-slp-building-economics",
      name: "Introduction to Building Economics",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "4 weeks",
      additionalRequirements: ["Standard of competence sufficient for degree study", "Recognition of prior learning considered"],
    },
    {
      id: "ufs-slp-property-dev",
      name: "Introduction to Property Development",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "4 weeks",
      additionalRequirements: ["National Senior Certificate or higher education qualification or currently employed in the construction industry", "Standard of competence sufficient for degree study", "Recognition of prior learning considered"],
    },
    {
      id: "ufs-slp-building-materials",
      name: "Introduction to Building Materials",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "4 weeks",
      additionalRequirements: ["National Senior Certificate or higher education qualification or currently employed in the construction industry", "Standard of competence sufficient for degree study", "Recognition of prior learning considered"],
    },
    {
      id: "ufs-slp-construction-project-mgmt",
      name: "Introduction to Construction Project Management",
      faculty: "Kovsie Phahamisa Academy",
      apsMin: 0,
      duration: "4 weeks",
      additionalRequirements: ["National Senior Certificate or higher education qualification or currently employed in the construction industry", "Standard of competence sufficient for degree study", "Recognition of prior learning considered"],
    },

    // Economic and Management Sciences
    {
      id: "ufs-bcom-analytics",
      name: "BCom with specialisation in Business and Financial Analytics",
      faculty: "Economic and Management Sciences",
      apsMin: 34,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 5,
      },
      careerOpportunities: ["Data Analytics", "Business Intelligence", "Financial Modeling", "Quantitative Analysis", "Risk Analytics"],
    },

    // Education
    {
      id: "ufs-bed-foundation",
      name: "Bachelor of Education in Foundation Phase Teaching",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Specialisation options: Afrikaans HL, Sesotho HL, isiZulu HL, English HL"],
      careerOpportunities: ["Foundation Phase Teacher (Grades R-3)", "Early Childhood Development", "Educational Specialist", "Curriculum Development", "Educational Management"],
    },
    {
      id: "ufs-bed-intermediate",
      name: "Bachelor of Education in Intermediate Phase Teaching",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 4,
      },
      additionalRequirements: ["Various specialisation combinations available"],
      careerOpportunities: ["Intermediate Phase Teacher (Grades 4-6)", "Subject Specialist", "Educational Coordinator", "Curriculum Advisor", "School Management"],
    },
    {
      id: "ufs-bed-senior",
      name: "Bachelor of Education in Senior and FET Phase Teaching",
      faculty: "Education",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Subject combinations include Mathematics, Sciences, Languages, and Social Sciences"],
      careerOpportunities: ["High School Teacher (Grades 7-12)", "Subject Head", "Educational Leadership", "Curriculum Development", "Educational Research"],
    },

    // Health Sciences
    {
      id: "ufs-mbchb",
      name: "Bachelor of Medicine and Bachelor of Surgery (MB ChB)",
      faculty: "Health Sciences",
      apsMin: 36,
      duration: "6 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Medical Doctor", "Specialist Physician", "Surgeon", "General Practitioner", "Medical Research"],
    },
    {
      id: "ufs-bmedsci",
      name: "Bachelor of Medical Science with specialisation in Radiation Science (BMedSc)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 5,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Subject to selection"],
      careerOpportunities: ["Radiographer", "Medical Imaging Specialist", "Radiation Therapy", "Nuclear Medicine", "Medical Technology"],
    },
    {
      id: "ufs-boptom",
      name: "Bachelor of Optometry (BOptom)",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Life Sciences": 5,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Optometrist", "Eye Care Specialist", "Vision Therapy", "Contact Lens Specialist", "Low Vision Rehabilitation"],
    },
    {
      id: "ufs-bsc-physio",
      name: "Bachelor of Science in Physiotherapy",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Physiotherapist", "Sports Rehabilitation", "Neurological Rehabilitation", "Pediatric Physiotherapy", "Private Practice"],
    },
    {
      id: "ufs-bsc-dietetics",
      name: "Bachelor of Science in Dietetics",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Dietitian", "Clinical Nutrition", "Sports Nutrition", "Community Nutrition", "Food Service Management"],
    },
    {
      id: "ufs-boccther",
      name: "Bachelor of Occupational Therapy (BOccTher)",
      faculty: "Health Sciences",
      apsMin: 33,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Occupational Therapist", "Rehabilitation Specialist", "Pediatric Therapy", "Mental Health Therapy", "Community Health"],
    },
    {
      id: "ufs-bbiok",
      name: "Bachelor of Biokinetics (BBiok)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 5,
        "Mathematics": 4,
        "Life Sciences": 4,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Biokineticist", "Exercise Specialist", "Sports Science", "Rehabilitation", "Wellness Programs"],
    },
    {
      id: "ufs-bsportcoach",
      name: "Bachelor of Sport Coaching (B SportCoach)",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 May 2025"],
      careerOpportunities: ["Sports Coach", "Athletic Development", "Sports Management", "Performance Analysis", "Youth Development"],
    },
    {
      id: "ufs-bnursing",
      name: "Bachelor of Nursing",
      faculty: "Health Sciences",
      apsMin: 30,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
        "Math": {
          alternatives: [
            { subject: "Mathematics", level: 3 },
            { subject: "Mathematical Literacy", level: 6 },
          ],
        },
        "Life Sciences": 5,
        "Physical Sciences": 4,
      },
      additionalRequirements: ["Subject to selection. Closing date: 31 July 2025"],
      careerOpportunities: ["Professional Nurse", "Clinical Specialist", "Community Health Nurse", "Nurse Manager", "Nurse Educator"],
    },

    // Natural and Agricultural Sciences
    {
      id: "ufs-bsc-engineering",
      name: "Bachelor of Science specialising in Physical Sciences with Engineering Subjects",
      faculty: "Natural and Agricultural Sciences",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
        "Mathematics": 6,
        "Physical Sciences": 5,
      },
      additionalRequirements: ["Subject to selection"],
      careerOpportunities: ["Engineering Physics", "Technical Consulting", "Research and Development", "Industrial Physics", "Technology Development"],
    },

    // The Humanities
    {
      id: "ufs-ba-general",
      name: "Bachelor of Arts (General)",
      faculty: "The Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Various major combinations available including Languages, History, Philosophy, Psychology, Political Science"],
      careerOpportunities: ["Education", "Media and Communications", "Public Service", "Research", "Cultural Heritage"],
    },
    {
      id: "ufs-ba-languages",
      name: "BA specialising in Languages",
      faculty: "The Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 4,
      },
      careerOpportunities: ["Translator", "Interpreter", "Language Teaching", "Publishing", "International Relations"],
    },    {
      id: "ufs-bcommdev",
      name: "Bachelor of Community Development (BCommDev)",
      faculty: "The Humanities",
      apsMin: 30,
      duration: "3 years",
      subjectRequirements: {
        "English": 5,
      },
      additionalRequirements: ["Subject to selection. AP 30 OR Diploma in Vocational Skills with Level 4 English"],
      careerOpportunities: ["Community Development Practitioner", "Project Manager", "NGO Management", "Rural Development", "Social Development"],
    },

    // Theology and Religion
    {
      id: "ufs-bdiv",
      name: "Bachelor of Divinity (BDiv)",
      faculty: "Theology and Religion",
      apsMin: 28,
      duration: "4 years",
      subjectRequirements: {
        "English": 4,
      },
      additionalRequirements: ["Selection form required. All applicants must complete selection form"],
      careerOpportunities: ["Minister/Pastor", "Chaplain", "Religious Education", "Theological Research", "Community Ministry"],
    },
  ];

  /**
   * Calculate APS using UFS method
   * Uses 6 best subjects (excluding Life Orientation) + 1 point for Life Orientation if Level 5+
   */
  calculateAPS(subjects: Record<string, number>): number {
    // Convert percentage-based subjects to UFS levels
    const convertToLevel = (percentage: number): number => {
      if (percentage >= 90) return 8;
      if (percentage >= 80) return 7;
      if (percentage >= 70) return 6;
      if (percentage >= 60) return 5;
      if (percentage >= 50) return 4;
      if (percentage >= 40) return 3;
      if (percentage >= 30) return 2;
      return 0;
    };

    const levels: number[] = [];
    let lifeOrientationPoints = 0;

    for (const [subject, mark] of Object.entries(subjects)) {
      const level = convertToLevel(mark);

      if (subject === "Life Orientation") {
        // Life Orientation: 1 point if Level 5 (60%) or higher
        lifeOrientationPoints = level >= 5 ? 1 : 0;
      } else if (level >= 2) {
        // Only include subjects with Level 2 (30%) or higher
        levels.push(level);
      }
    }

    // Take the 6 best subjects (excluding Life Orientation)
    const bestSix = levels.sort((a, b) => b - a).slice(0, 6);

    // Calculate total APS
    const totalAPS =
      bestSix.reduce((sum, level) => sum + level, 0) + lifeOrientationPoints;

    return totalAPS;
  }

  /**
   * UFS-specific APS calculation
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
