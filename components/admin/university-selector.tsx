"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// IDs must match the `id` field in each university's class in data/universities/
const KNOWN_UNIVERSITIES = [
  { id: "uct", name: "University of Cape Town" },
  { id: "wits", name: "University of the Witwatersrand" },
  { id: "up", name: "University of Pretoria" },
  { id: "su", name: "Stellenbosch University" },
  { id: "ukzn", name: "University of KwaZulu-Natal" },
  { id: "uj", name: "University of Johannesburg" },
  { id: "nwu", name: "North-West University" },
  { id: "ru", name: "Rhodes University" },
  { id: "ufs", name: "University of the Free State" },
  { id: "nmu", name: "Nelson Mandela University" },
  { id: "uwc", name: "University of the Western Cape" },
  { id: "unisa", name: "University of South Africa" },
  { id: "tut", name: "Tshwane University of Technology" },
  { id: "cput", name: "Cape Peninsula University of Technology" },
  { id: "dut", name: "Durban University of Technology" },
  { id: "cut", name: "Central University of Technology" },
  { id: "vut", name: "Vaal University of Technology" },
  { id: "mut", name: "Mangosuthu University of Technology" },
  { id: "ufh", name: "University of Fort Hare" },
  { id: "ul", name: "University of Limpopo" },
  { id: "univen", name: "University of Venda" },
  { id: "unizulu", name: "University of Zululand" },
  { id: "ump", name: "University of Mpumalanga" },
  { id: "smu", name: "Sefako Makgatho Health Sciences University" },
  { id: "wsu", name: "Walter Sisulu University" },
  { id: "spu", name: "Sol Plaatje University" },
]

interface UniversitySelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function UniversitySelector({ value, onChange, disabled }: UniversitySelectorProps) {
  return (
    <Select value={value || "__none__"} onValueChange={(v) => onChange(v === "__none__" ? "" : v)} disabled={disabled}>
      <SelectTrigger className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
        <SelectValue placeholder="Select institution (optional)..." />
      </SelectTrigger>
      <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl max-h-72 overflow-y-auto">
        <SelectItem value="__none__" className="text-white/50">None (auto-detect from PDF)</SelectItem>
        {KNOWN_UNIVERSITIES.map((uni) => (
          <SelectItem
            key={uni.id}
            value={uni.id}
            className="text-white/80 hover:text-white focus:text-white focus:bg-white/10"
          >
            {uni.name} ({uni.id.toUpperCase()})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
