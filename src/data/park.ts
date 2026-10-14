import type { Candidate } from "./types.js";
import { withBoardProfile } from "./board-profiles.js";

const P = "https://vancouver.ca/plan-your-vote/index.aspx";

type Row = [ballot: number, name: string, party: string, note?: string];

const ROWS: Row[] = [
    [200, "Stephen Menon", "Vote Vancouver"],
    [201, "Allan Fawley", "TEAM for a Livable Vancouver"],
    [202, "Leonard Vanderstar", "Independent Parks Party"],
    [203, "T'uy't'tanat Cease Wyss", "COPE"],
    [204, "Jon Girard", "TEAM for a Livable Vancouver"],
    [205, "Jamie Han", "COPE"],
    [206, "Tamiko Suzuki", "COPE"],
    [207, "Stephen Molnar", "ABC Vancouver"],
    [208, "Mark Halyk", "Vancouver Liberals"],
    [209, "Marie Rogers", "ABC Vancouver"],
    [210, "Summit Wannamaker", "Vote Vancouver"],
    [211, "Shayla Bird", "Vancouver Liberals"],
    [212, "Spencer Van Vloten", "Green Party of Vancouver"],
    [213, "Cam Rothery", "Independent Parks Party"],
    [214, "Tyler Petersen", "OneCity"],
    [215, "Sacia Burton", "COPE"],
    [216, "Breanne Smart", "Green Party of Vancouver"],
    [217, "John Irwin", "OneCity", "Former commissioner (2018–2022)"],
    [218, "Christian Kyle", "ABC Vancouver"],
    [219, "Mayeli Alvarez", "TEAM for a Livable Vancouver"],
    [220, "Scott Jensen", "Vancouver Liberals", "Incumbent commissioner; first Indigenous chair"],
    [221, "Amanda Bains", "Vancouver Liberals"],
    [222, "Tom Digby", "Green Party of Vancouver", "Incumbent commissioner; current chair"],
    [223, "Amir Bajehkian", "Vancouver Liberals"],
    [224, "Brynja Marshall", "Independent Parks Party"],
    [225, "Alex Tkach", "TEAM for a Livable Vancouver"],
    [226, "Michael Robert Caditz", "Independent Parks Party"],
    [227, "Chris Qiu", "ABC Vancouver"],
    [228, "Jas Virdi", "ABC Vancouver", "Incumbent commissioner"],
    [229, "Tricia Barker", "Vancouver Liberals", "Former commissioner (2018–2022)"],
    [230, "Dominic Denofrio", "OneCity"],
    [231, "Niknaz Alemi", "Independent Parks Party"],
    [232, "Cheryl Grant", "ABC Vancouver"],
    [233, "Wah Gee", "TEAM for a Livable Vancouver"],
    [234, "Jay Bailey", "ABC Vancouver"],
];

function slug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export const PARK: Candidate[] = ROWS.map<Candidate>(([ballot, name, party, note]) => ({
    id: `park-${slug(name)}`,
    ballot,
    name,
    office: "park",
    party,
    // A "former commissioner" is not an incumbent. Only a sitting commissioner counts.
    incumbent: /^incumbent commissioner/i.test(note ?? ""),
    incumbentDetail: note,
    website: P,
    platform: [
        {
            title: "Parks platform",
            detail: "Individual parks platform under review. Start from the official Plan Your Vote candidate card.",
            for: [],
            against: [],
            sourceLabel: "Plan Your Vote",
            sourceUrl: P,
        },
    ],
    analysis: {
        summary: note
            ? `We have not reviewed this candidate's own platform yet. Their recorded experience: ${note}. Start with the official candidate card.`
            : "We have not reviewed a platform for this candidate yet. Start with the official candidate card.",
        openQuestions: ["Individual commitments not yet separately reviewed."],
        reviewed: false,
    },
})).map(withBoardProfile);
