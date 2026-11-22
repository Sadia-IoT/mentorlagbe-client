import {
  Atom,
  BookOpen,
  Briefcase,
  Calculator,
  Code2,
  Dna,
  FlaskConical,
  Globe2,
  Landmark,
  Languages,
  MonitorSmartphone,
  PenTool,
} from "lucide-react";

const icons = {
  Mathematics: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: Dna,
  English: Languages,
  ICT: MonitorSmartphone,
  Programming: Code2,
  IELTS: Globe2,
  Accounting: Landmark,
  "Business Studies": Briefcase,
  Science: FlaskConical,
  Bangla: PenTool,
};

export function subjectIcon(name) {
  return icons[name] || BookOpen;
}
