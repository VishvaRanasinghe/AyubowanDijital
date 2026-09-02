export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  link: string | null;
  featured: boolean;
  created_at: string;
};

export type Review = {
  id: string;
  client_name: string;
  rating: number;
  comment: string;
  published: boolean;
  created_at: string;
};

export const SUPPORT_AREAS = [
  {
    title: "Academic & Research",
    detail: "Research Support, Tutoring, Editing, Referencing",
  },
  {
    title: "Technology",
    detail: "Websites, Software, Mobile Apps, AI Solutions",
  },
  {
    title: "Data & Analytics",
    detail: "Data Analysis, Python, SQL, Dashboards",
  },
  {
    title: "Projects & Development",
    detail: "Planning, Documentation, Presentations, Prototypes",
  },
  {
    title: "Business Solutions",
    detail: "Research, Analysis, Documentation, Digital Solutions",
  },
  {
    title: "Creative & Digital",
    detail: "Design, Branding, Content, Social Media",
  },
] as const;

export const WHY_US = [
  { title: "Expert Network", detail: "Specialists across multiple fields" },
  {
    title: "Multi-Disciplinary",
    detail: "Academic, technical, creative & business",
  },
  { title: "Custom Solutions", detail: "Built around your needs" },
  { title: "One Point of Contact", detail: "We coordinate the right expertise" },
] as const;
