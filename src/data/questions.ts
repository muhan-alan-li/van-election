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
    /** What supporters of options[0] say. One plain sentence each, from the campaign debate. */
    for: string[];
    /** What critics of options[0] say. */
    against: string[];
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
    /** Reputable pages that explain the issue. Never campaign platforms. */
    learnMore: { label: string; url: string }[];
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
        for: ["A freeze keeps bills stable for residents."],
        against: ["A freeze means service cuts or higher costs later."],
        offices: ["mayor", "council"],
        note: "The province and the police board also shape what the city has to spend.",
        learnMore: [
            {
                label: "How Vancouver sets property tax",
                url: "https://vancouver.ca/home-property-development/understand-your-notice.aspx",
            },
        ],
    },
    {
        id: "supportive-housing",
        topic: "Supportive housing",
        prompt: "Should new supportive housing go across the whole city?",
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
        for: ["Reversing the ban opens the whole city to new homes."],
        against: ["Supportive housing faces neighbourhood opposition and limited provincial money."],
        note: "Supportive housing also needs provincial money and non-profit operators.",
        learnMore: [
            {
                label: "What supportive housing is",
                url: "https://www.bchousing.org/housing-assistance/housing-with-support/supportive-housing",
            },
        ],
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
        for: [
            "A clear ban is easier to enforce than the current rules.",
            "Enforcing the rules restores order in public places.",
        ],
        against: [
            "Drug use is a health matter, not one for city hall.",
            "Enforcement alone does not treat addiction or reduce harm.",
        ],
        offices: ["mayor", "council"],
        note: "Treatment and health care are provincial, so they sit outside city control.",
        learnMore: [
            {
                label: "B.C.'s drug decriminalization pilot",
                url: "https://www2.gov.bc.ca/gov/content/overdose/decriminalization",
            },
        ],
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
        for: ["Giving more road space to bikes and walking cuts emissions."],
        against: ["Removing road space makes driving slower and more frustrating."],
        offices: ["mayor", "council"],
        note: "The city controls most street changes, but not transit funding.",
        learnMore: [
            {
                label: "How Vancouver's protected bike lanes work",
                url: "https://vancouver.ca/streets-transportation/protected-bicycle-lanes.aspx",
            },
        ],
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
        for: ["Protecting existing affordable rentals keeps current tenants housed."],
        against: ["Blocking new development on those sites reduces housing supply."],
        offices: ["mayor", "council"],
        note: "Council controls zoning, so this sits within city power.",
        learnMore: [
            {
                label: "Renter supports and protections",
                url: "https://vancouver.ca/people-programs/rental-and-renter-protection.aspx",
            },
        ],
    },
    {
        id: "free-transit",
        topic: "Transit fares",
        prompt: "Should transit be free for young people?",
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
        for: [
            "Free fares help young people get around the city.",
            "Free fares remove a barrier for low-income riders.",
        ],
        against: ["TransLink and the province set fares, not the city."],
        offices: ["mayor", "council"],
        note: "TransLink and the province set fares, so the city cannot do this alone.",
        learnMore: [
            {
                label: "How transit fares work",
                url: "https://www.translink.ca/fares",
            },
        ],
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
        for: ["Neighbourhood planning gives residents a real voice in local change."],
        against: ["Repealing city-wide plans delays homes the city badly needs."],
        offices: ["mayor", "council"],
        note: "The province sets housing targets the city has to meet.",
        learnMore: [
            {
                label: "What the Broadway Plan is",
                url: "https://vancouver.ca/home-property-development/broadway-plan.aspx",
            },
        ],
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
        for: ["Free parking makes parks and community centres easier to use."],
        against: ["The city loses parking revenue."],
        slatesA: ["abc"],
        offices: ["park"],
        note: "The elected Park Board runs parking at parks.",
        learnMore: [
            {
                label: "Parking at Vancouver parks",
                url: "https://vancouver.ca/parks-recreation-culture/parks-gardens-and-beaches.aspx",
            },
        ],
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
        for: ["More park space improves life in growing neighbourhoods."],
        against: [],
        slatesA: ["team"],
        offices: ["park"],
        note: "Park space depends on land the city already owns or can buy.",
        learnMore: [
            {
                label: "VanPlay, the parks master plan",
                url: "https://vancouver.ca/parks-recreation-culture/vanplay-parks-and-recreation-strategy.aspx",
            },
        ],
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
        for: ["Community food programs help residents who cannot afford groceries."],
        against: ["The city must balance these programs against a limited budget."],
        slatesA: ["cope"],
        offices: ["park"],
        note: "Food programs are run by community groups, often on city property.",
        learnMore: [
            {
                label: "Vancouver's food strategy",
                url: "https://vancouver.ca/people-programs/vancouver-food-strategy.aspx",
            },
        ],
    },
];
