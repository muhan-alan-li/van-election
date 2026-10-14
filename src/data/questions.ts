import type { OfficeId } from "./types.js";

/**
 * A position that candidates actually state in the platforms we have read.
 * We only ever record a stance that a source states. Silence is recorded as "none",
 * never as disagreement.
 */
export interface QuestionOption {
    /** Plain-language name for this position. */
    label: string;
    /** One line on what a candidate who takes this position promises. */
    detail: string;
}

export interface Question {
    id: string;
    /** Short topic name, reused as a label in the results. */
    topic: string;
    /** The question put to the voter. */
    prompt: string;
    /** The positions we found. One or two entries. */
    options: QuestionOption[];
    /**
     * The opposing position, for questions where only one position exists in our
     * sources. Lets a reader say they want the opposite even though nobody campaigns on it.
     */
    opposite?: QuestionOption;
    /** Slate ids that state options[0]. */
    slatesA: string[];
    /** Slate ids that state options[1], when a second position exists. */
    slatesB?: string[];
    /** Mayors whose own platform states options[0]. Mayors never fall back to a slate. */
    candidatesA?: string[];
    /** Mayors whose own platform states options[1]. */
    candidatesB?: string[];
    /** Races this issue bears on. */
    offices: OfficeId[];
    /** A limit readers should know before they weigh the promise. */
    note?: string;
    sourceLabel: string;
    sourceUrl: string;
}

export const QUESTIONS: Question[] = [
    {
        id: "property-tax-freeze",
        topic: "Property taxes",
        prompt: "Should property taxes stay flat in 2027?",
        options: [
            {
                label: "Keep them flat",
                detail: "No increase, or an increase capped at the rate of inflation.",
            },
        ],
        slatesA: ["abc", "vanlib"],
        candidatesA: ["ken-sim", "kareem-allam"],
        opposite: {
            label: "No, raise them if services need it",
            detail: "You would accept an increase to pay for services and repairs.",
        },
        offices: ["mayor", "council"],
        note: "The province and the police board also shape what the city has to spend.",
        sourceLabel: "ABC Vancouver and Vancouver Liberals platforms",
        sourceUrl: "https://abcvancouver.ca/platform/",
    },
    {
        id: "supportive-housing",
        topic: "Supportive housing",
        prompt: "Where should new supportive housing go?",
        options: [
            {
                label: "Across the whole city",
                detail: "End the freeze and build supportive housing in every part of Vancouver.",
            },
            {
                label: "Shared across the region",
                detail: "Ask every city in the region to take a share of it.",
            },
        ],
        slatesA: ["green", "vanlib"],
        slatesB: ["abc"],
        candidatesA: ["pete-fry", "kareem-allam"],
        candidatesB: ["ken-sim"],
        offices: ["mayor", "council"],
        note: "Supportive housing also needs provincial money and non-profit operators.",
        sourceLabel: "ABC, Green and Vancouver Liberals platforms",
        sourceUrl: "https://abcvancouver.ca/platform/",
    },
    {
        id: "open-drug-use",
        topic: "Open drug use",
        prompt: "Should the city ban open drug use in public places?",
        options: [
            {
                label: "Yes, ban and enforce it",
                detail: "A by-law ban, with police enforcing it.",
            },
        ],
        slatesA: ["abc", "team"],
        candidatesA: ["ken-sim", "colleen-hardwick"],
        opposite: {
            label: "No, treat it as a health issue",
            detail: "You would rather the city did not ban it in public places.",
        },
        offices: ["mayor", "council"],
        note: "Treatment and health care are provincial, so they sit outside city control.",
        sourceLabel: "ABC Vancouver and TEAM platforms",
        sourceUrl: "https://abcvancouver.ca/platform/",
    },
    {
        id: "road-space",
        topic: "Road space",
        prompt: "Should the city take road space for bike lanes and transit?",
        options: [
            {
                label: "Yes, convert road space",
                detail: "Move lanes and parking to walking, cycling and transit.",
            },
        ],
        slatesA: ["green", "vanlib"],
        candidatesA: ["pete-fry", "kareem-allam"],
        opposite: {
            label: "No, keep road space for cars",
            detail: "You would rather the city did not convert road space.",
        },
        offices: ["mayor", "council"],
        note: "The city controls most street changes, but not transit funding.",
        sourceLabel: "Green and Vancouver Liberals platforms",
        sourceUrl: "https://petefry.ca/",
    },
    {
        id: "rental-protection",
        topic: "Existing rentals",
        prompt: "Should the city protect existing affordable rental buildings from redevelopment?",
        options: [
            {
                label: "Yes, protect them",
                detail: "Block rezoning that puts affordable rental buildings at risk.",
            },
        ],
        slatesA: ["team", "green", "onecity", "cope"],
        candidatesA: ["pete-fry", "colleen-hardwick"],
        opposite: {
            label: "No, allow redevelopment",
            detail: "You would rather the city did not block these rezonings.",
        },
        offices: ["mayor", "council"],
        note: "Council controls zoning, so this sits within city power.",
        sourceLabel: "TEAM, Green, OneCity and COPE platforms",
        sourceUrl: "https://www.voteteam.ca/candidates-2026/colleen-for-mayor",
    },
    {
        id: "free-transit",
        topic: "Transit fares",
        prompt: "Should transit be free for young people or for all residents?",
        options: [
            {
                label: "Yes, make it free",
                detail: "Free fares for people under 18, or for everyone in Vancouver.",
            },
        ],
        slatesA: ["votevan", "bright"],
        candidatesA: ["rebecca-bligh", "muhammad-ahmad"],
        opposite: {
            label: "No, keep fares",
            detail: "You would rather the city did not make transit free.",
        },
        offices: ["mayor", "council"],
        note: "TransLink and the province set fares, so the city cannot do this alone.",
        sourceLabel: "Vote Vancouver and Bright Future platforms",
        sourceUrl: "https://www.votevancouver.ca/rebecca-bligh",
    },
    {
        id: "repeal-plans",
        topic: "City-wide plans",
        prompt: "Should the city repeal city-wide plans like the Broadway Plan?",
        options: [
            {
                label: "Yes, repeal them",
                detail: "Undo the Vancouver Plan, the Broadway Plan and similar plans.",
            },
        ],
        slatesA: ["team"],
        candidatesA: ["colleen-hardwick"],
        opposite: {
            label: "No, keep the plans",
            detail: "You would rather the city did not repeal them.",
        },
        offices: ["mayor", "council"],
        note: "The province sets housing targets the city has to meet.",
        sourceLabel: "TEAM platform",
        sourceUrl: "https://www.voteteam.ca/candidates-2026/colleen-for-mayor",
    },
    {
        id: "parking-at-parks",
        topic: "Parking fees",
        prompt: "Should paid parking be removed at parks and community centres?",
        options: [
            {
                label: "Yes, make it free",
                detail: "Remove the pay meters at parks and community centres.",
            },
        ],
        opposite: {
            label: "No, keep the fees",
            detail: "You would rather the fees stayed to help pay for upkeep.",
        },
        slatesA: ["abc"],
        offices: ["park"],
        note: "The elected Park Board runs parking at parks.",
        sourceLabel: "ABC Vancouver platform",
        sourceUrl: "https://abcvancouver.ca/platform/",
    },
    {
        id: "park-space",
        topic: "Park space",
        prompt: "Should the city add more park space in neighbourhoods?",
        options: [
            {
                label: "Yes, add 20% more",
                detail: "Add a fifth more neighbourhood park space.",
            },
        ],
        opposite: {
            label: "No, keep what we have",
            detail: "You would rather the city spent the money on upkeep.",
        },
        slatesA: ["team"],
        offices: ["park"],
        note: "Park space depends on land the city already owns or can buy.",
        sourceLabel: "TEAM platform",
        sourceUrl: "https://www.voteteam.ca/candidates-2026/colleen-for-mayor",
    },
    {
        id: "food-programs",
        topic: "Community food",
        prompt: "Should the city fund community food programs?",
        options: [
            {
                label: "Yes, fund them",
                detail: "Pay for community food programs through the city.",
            },
        ],
        opposite: {
            label: "No, leave it to others",
            detail: "You would rather the city did not fund these programs.",
        },
        slatesA: ["cope"],
        offices: ["park"],
        note: "Food programs are run by community groups, often on city property.",
        sourceLabel: "COPE platform",
        sourceUrl: "https://vancouver.ca/plan-your-vote/index.aspx",
    },
];
