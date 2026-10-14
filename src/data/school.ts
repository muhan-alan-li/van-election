import type { Candidate } from "./types.js";

const P = "https://vancouver.ca/plan-your-vote/index.aspx";

type Row = [ballot: number, name: string, party: string, note?: string];

const ROWS: Row[] = [
    [300, "Darren Boidman", "Vancouver Liberals"],
    [301, "Krista Sigurdson", "OneCity"],
    [302, "Rory Brown", "OneCity"],
    [303, "Alisha Masongsong", "Green Party of Vancouver"],
    [304, "Suzie Mah", "COPE", "Incumbent trustee (2022–present)"],
    [305, "Alfred Chien", "ABC Vancouver"],
    [306, "Tasha Doucas", "Vote Vancouver"],
    [307, "Travers Fenton", "TrueBlue Vancouver"],
    [308, "Isabel Ochoa Prieto", "Vancouver Liberals"],
    [309, "Blair Coleman", "TrueBlue Vancouver"],
    [310, "Shirley Sio", "ABC Vancouver"],
    [311, "Maria Kritikos", "ABC Vancouver"],
    [312, "Matt Kroeker", "ABC Vancouver"],
    [313, "Noosha Mehdian", "Vancouver Liberals"],
    [314, "Melanie Cheng", "COPE"],
    [315, "Mandy Potter", "Vote Vancouver"],
    [316, "Rob Nijjar", "ABC Vancouver"],
    [317, "Christopher JK Richardson", "Independent", "Incumbent trustee running as independent"],
    [318, "Naomi Chocyk", "TrueBlue Vancouver", "Also running for council"],
    [319, "Amarys Joseph", "Vote Vancouver"],
    [320, "Preeti Faridkot", "ABC Vancouver"],
    [321, "Sherry Breshears", "OneCity"],
    [322, "Kat Nystedt", "TEAM for a Livable Vancouver"],
    [323, "Derrick O'Keefe", "COPE"],
    [324, "Gwen Giesbrecht", "COPE", "Former park commissioner (2018–2022)"],
    [325, "Christopher Lee", "OneCity"],
    [326, "Ishi Dinim", "Vancouver Liberals"],
    [327, "Lina Vargas", "ABC Vancouver"],
    [328, "Steve Cardwell", "OneCity", "Former VSB superintendent"],
    [329, "Joshua Cameron", "Vancouver Liberals"],
    [330, "Julie Strilesky", "Green Party of Vancouver"],
];

function slug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "")
        .replace(/(^-|-$)/g, "");
}

export const SCHOOL: Candidate[] = ROWS.map(([ballot, name, party, note]) => ({
    id: `school-${slug(name)}`,
    ballot,
    name,
    office: "school",
    party,
    // "Former park commissioner" and "former superintendent" are not incumbency.
    incumbent: /^incumbent trustee/i.test(note ?? ""),
    incumbentDetail: note,
    website: P,
    platform: [
        {
            title: "Schools platform",
            detail: "Individual schools platform under review. Start from the official Plan Your Vote candidate card and VSB trustee info.",
            for: [],
            against: [],
            sourceLabel: "Plan Your Vote",
            sourceUrl: P,
        },
    ],
    analysis: {
        summary: note
            ? `We have not reviewed this candidate's own platform yet. Their recorded experience: ${note}. Start with the official candidate card and VSB trustee information.`
            : "We have not reviewed a platform for this candidate yet. Start with the official candidate card and VSB trustee information.",
        openQuestions: ["Individual commitments not yet separately reviewed."],
        reviewed: false,
    },
}));
