import type { Candidate } from "./types.js";

const P = "https://vancouver.ca/plan-your-vote/index.aspx";

type Row = [ballot: number, name: string, party: string, note?: string];

const ROWS: Row[] = [
    [100, "Jarrett Hagglund", "OneCity"],
    [101, "Joyce Gillespie", "ABC Vancouver"],
    [102, "Annette Reilly", "Green Party of Vancouver"],
    [103, "Mike Klassen", "ABC Vancouver", "Incumbent councillor (2022–present)"],
    [104, "John Jones", "Independent"],
    [105, "Geoff Teoli", "Vote Vancouver"],
    [106, "Keerit Jutla", "Vote Vancouver"],
    [107, "Victoria Jung", "Vancouver Liberals", "Incumbent school trustee running for council"],
    [108, "Job Zhao", "Independent"],
    [109, "Peter Meiszner", "ABC Vancouver", "Incumbent councillor"],
    [110, "Amanda Boggan", "TEAM for a Livable Vancouver"],
    [111, "Sean Orr", "COPE", "Incumbent councillor (by-election Apr 2025)"],
    [112, "Steve Jedreicich", "Vote Vancouver"],
    [113, "Iona Bonamis", "OneCity"],
    [114, "Rebecca Hasdell", "Vote Vancouver"],
    [115, "Bhavna Solecki", "Vote Vancouver"],
    [116, "Yadwinder Mangat", "Bright Future Vancouver"],
    [117, "Charles Kelly", "TEAM for a Livable Vancouver"],
    [118, "Jessica Walton", "Vancouver Liberals"],
    [119, "Camil Dumont", "Green Party of Vancouver", "Former park commissioner (2018–2022)"],
    [120, "Judith Kasiama", "Bright Future Vancouver"],
    [121, "Devyani Singh", "COPE"],
    [122, "Bilal Khan", "Bright Future Vancouver"],
    [123, "Kathleen Larsen", "TEAM for a Livable Vancouver"],
    [124, "Chloe Leslie", "COPE"],
    [125, "Armor Valor", "Vancouver Liberals"],
    [126, "Arezo Zarrabian", "ABC Vancouver"],
    [127, "Jonathan Weisman", "TEAM for a Livable Vancouver"],
    [128, "Devin Clemens", "Vancouver Liberals"],
    [129, "Lorraine Lowe", "ABC Vancouver"],
    [130, "Raj Mundra", "TEAM for a Livable Vancouver"],
    [131, "Lucy Maloney", "OneCity", "Incumbent councillor (by-election Apr 2025)"],
    [132, "John Boychuk", "Vote Vancouver"],
    [133, "ROLLERGIRL", "Independent"],
    [134, "John Coupar", "Vancouver Liberals", "Former park commissioner"],
    [135, "Sarah Kirby-Yung", "ABC Vancouver", "Incumbent councillor"],
    [136, "Eric Redmond", "Affordable Housing"],
    [137, "Lisa Dominato", "ABC Vancouver", "Incumbent councillor"],
    [138, "David Grewal", "ABC Vancouver"],
    [139, "Moira Stilwell", "Vancouver Liberals", "Former MLA/cabinet minister"],
    [140, "Andy Lin", "Bright Future Vancouver"],
    [141, "Bridget Burns", "Green Party of Vancouver"],
    [142, "Patrick Sauriol", "TEAM for a Livable Vancouver"],
    [143, "Parris J. Williams", "Independent"],
    [144, "Lenny Zhou", "ABC Vancouver", "Incumbent councillor"],
    [145, "Michael Wu", "Vancouver Liberals"],
    [146, "Frances Bula", "OneCity", "Civic journalist"],
    [147, "Stephanie Smith", "Green Party of Vancouver"],
    [148, "Ibrahima Cisse", "Bright Future Vancouver"],
    [149, "Caitlin Stockwell", "OneCity"],
    [150, "Josh Gordon", "TEAM for a Livable Vancouver"],
    [151, "Guy Dubé", "Independent"],
    [152, "Mohadeseh Gharib P. Arasi", "Bright Future Vancouver"],
    [153, "Noi Soudarack", "Independent"],
    [154, "Naomi Chocyk", "TrueBlue Vancouver", "Also running for school trustee"],
    [155, "Solomon Yi-Kieran", "COPE"],
];

function slug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export const COUNCIL: Candidate[] = ROWS.map(([ballot, name, party, note]) => ({
    id: `council-${slug(name)}`,
    ballot,
    name,
    office: "council",
    party,
    // The fourth column also records experience that is not incumbency, such as
    // "Former park commissioner". Only a sitting councillor counts as an incumbent.
    incumbent: /^incumbent councillor/i.test(note ?? ""),
    incumbentDetail: note,
    website: P,
    platform: [
        {
            title: `${party} slate platform`,
            detail: "Individual platform under review. Start from the slate platform and the candidate's official Plan Your Vote card.",
            for: [],
            against: [],
            sourceLabel: "Plan Your Vote",
            sourceUrl: P,
        },
    ],
    analysis: {
        summary: note
            ? `We have not reviewed this candidate's own platform yet. Their recorded experience: ${note}. Start with the slate platform and the official candidate card.`
            : "We have not reviewed a platform for this candidate yet. Start with the slate platform and the official candidate card.",
        openQuestions: ["Individual commitments not yet separately reviewed."],
        reviewed: false,
    },
}));
