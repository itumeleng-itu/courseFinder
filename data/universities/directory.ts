/**
 * Institution DIRECTORY metadata only -- name, short name, website, logo,
 * city/province. Deliberately NOT admission data: no APS thresholds, no
 * subject requirements, no course lists. That distinction is the whole
 * point of this file existing separately from the 26 per-university
 * classes that used to live in this directory and were deleted outright
 * (see git history around "Remove all local university course data") --
 * this app carries no course-matching data of its own any more, but a
 * university's name/location/website is a display concern, not an
 * eligibility one, and coursefind-data's API doesn't (and has no reason
 * to) expose marketing/contact metadata like this. Restoring it here is
 * not a partial reversal of that removal.
 *
 * Used by app/universities (the institution browsing page) and by
 * hooks/use-course-matcher.ts to label API-returned results with a real
 * name/location instead of an all-caps institution id.
 */

export interface UniversityDirectoryEntry {
  id: string;
  name: string;
  shortName: string;
  website: string;
  logo: string;
  city: string;
  province: string;
}

export const UNIVERSITY_DIRECTORY: UniversityDirectoryEntry[] = [
  { id: "cput", name: "Cape Peninsula University of Technology", shortName: "CPUT", website: "https://www.cput.ac.za", logo: "/logos/cput.png", city: "Cape Town", province: "Western Cape" },
  { id: "cut", name: "Central University of Technology", shortName: "CUT", website: "https://www.cut.ac.za", logo: "/logos/cut.png", city: "Bloemfontein", province: "Free State" },
  { id: "dut", name: "Durban University of Technology", shortName: "DUT", website: "https://www.dut.ac.za", logo: "/logos/dut.png", city: "Durban", province: "KwaZulu-Natal" },
  { id: "mut", name: "Mangosuthu University of Technology", shortName: "MUT", website: "https://www.mut.ac.za", logo: "/logos/mut.png", city: "Durban", province: "KwaZulu-Natal" },
  { id: "nmu", name: "Nelson Mandela University", shortName: "NMU", website: "https://www.mandela.ac.za", logo: "/logos/nmu.png", city: "Port Elizabeth", province: "Eastern Cape" },
  { id: "nwu", name: "North-West University", shortName: "NWU", website: "https://www.nwu.ac.za", logo: "/logos/nwu.png", city: "Potchefstroom", province: "North West" },
  { id: "ru", name: "Rhodes University", shortName: "Rhodes", website: "https://www.ru.ac.za", logo: "/logos/rhodes.png", city: "Makhanda (Grahamstown)", province: "Eastern Cape" },
  { id: "smu", name: "Sefako Makgatho Health Sciences University", shortName: "SMU", website: "https://www.smu.ac.za", logo: "/logos/smu.png", city: "Pretoria", province: "Gauteng" },
  { id: "spu", name: "Sol Plaatje University", shortName: "SPU", website: "https://www.spu.ac.za", logo: "/logos/spu.png", city: "Kimberley", province: "Northern Cape" },
  { id: "su", name: "Stellenbosch University", shortName: "SU", website: "https://www.sun.ac.za", logo: "/logos/stellenbosch.png", city: "Stellenbosch", province: "Western Cape" },
  { id: "tut", name: "Tshwane University of Technology", shortName: "TUT", website: "https://www.tut.ac.za", logo: "/logos/tut.png", city: "Pretoria", province: "Gauteng" },
  { id: "uct", name: "University of Cape Town", shortName: "UCT", website: "https://www.uct.ac.za", logo: "/logos/uct.png", city: "Cape Town", province: "Western Cape" },
  { id: "ufh", name: "University of Fort Hare", shortName: "UFH", website: "https://www.ufh.ac.za", logo: "/logos/ufh.png", city: "Alice", province: "Eastern Cape" },
  { id: "ufs", name: "University of the Free State", shortName: "UFS", website: "https://www.ufs.ac.za", logo: "/logos/ufs.png", city: "Bloemfontein", province: "Free State" },
  { id: "uj", name: "University of Johannesburg", shortName: "UJ", website: "https://www.uj.ac.za", logo: "/logos/uj.png", city: "Johannesburg", province: "Gauteng" },
  { id: "ukzn", name: "University of KwaZulu-Natal", shortName: "UKZN", website: "https://www.ukzn.ac.za", logo: "/logos/ukzn.png", city: "Durban", province: "KwaZulu-Natal" },
  { id: "ul", name: "University of Limpopo", shortName: "UL", website: "https://www.ul.ac.za", logo: "/logos/ul.png", city: "Polokwane", province: "Limpopo" },
  { id: "ump", name: "University of Mpumalanga", shortName: "UMP", website: "https://www.ump.ac.za", logo: "/logos/ump.png", city: "Mbombela", province: "Mpumalanga" },
  { id: "unisa", name: "University of South Africa", shortName: "UNISA", website: "https://www.unisa.ac.za", logo: "/logos/unisa.png", city: "Pretoria", province: "Gauteng" },
  { id: "univen", name: "University of Venda", shortName: "UNIVEN", website: "https://www.univen.ac.za", logo: "/logos/univen.png", city: "Thohoyandou", province: "Limpopo" },
  { id: "unizulu", name: "University of Zululand", shortName: "UniZulu", website: "https://www.unizulu.ac.za", logo: "/logos/unizulu.png", city: "KwaDlangezwa", province: "KwaZulu-Natal" },
  { id: "up", name: "University of Pretoria", shortName: "UP", website: "https://www.up.ac.za", logo: "/logos/up.png", city: "Pretoria", province: "Gauteng" },
  { id: "uwc", name: "University of the Western Cape", shortName: "UWC", website: "https://www.uwc.ac.za", logo: "/logos/uwc.png", city: "Cape Town", province: "Western Cape" },
  { id: "vut", name: "Vaal University of Technology", shortName: "VUT", website: "https://www.vut.ac.za", logo: "/logos/vut.png", city: "Vanderbijlpark", province: "Gauteng" },
  { id: "wits", name: "University of the Witwatersrand", shortName: "Wits", website: "https://www.wits.ac.za", logo: "/logos/wits.png", city: "Johannesburg", province: "Gauteng" },
  { id: "wsu", name: "Walter Sisulu University", shortName: "WSU", website: "https://www.wsu.ac.za", logo: "/logos/wsu.png", city: "Mthatha", province: "Eastern Cape" },
];
