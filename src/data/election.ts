import type { ElectionMeta, Office, Slate } from "./types.js";

export const ELECTION: ElectionMeta = {
    id: "vancouver-municipal-2026",
    title: "Vancouver 2026 Municipal Election",
    jurisdiction: "City of Vancouver, British Columbia",
    votingDay: "Saturday, October 17, 2026 (8am–8pm)",
    advanceVoting: ["Oct 3", "Oct 7", "Oct 10", "Oct 13 (8am–8pm)"],
    nominationClose: "September 11, 2026",
    officialHub: "https://vancouver.ca/your-government/2026-election.aspx",
    candidateListUrl: "https://vancouver.ca/files/cov/2026-vancouver-election-candidates-list.pdf",
    planYourVoteUrl: "https://vancouver.ca/plan-your-vote/index.aspx",
    totalCandidates: 130,
    generatedOn: "2026-10-14",
    coverageNote:
        "All 130 ballot entries are included. Profiles contain published individual priorities for 7 mayoral, 39 council, 22 park and 20 school candidates. Another 37 profiles contain only labelled shared commitments; 5 have no individual policy detail in the reviewed source set. Research closed October 14, 2026. Campaign record claims and delivery costs are not independently verified; questionnaire matching remains a separate, partial set of sourced positions.",
};

export const OFFICES: Office[] = [
    {
        id: "mayor",
        title: "Mayor",
        seats: 1,
        voteFor: "Vote for 1",
        description:
            "City-wide. Chairs Council, sets direction on budget, housing, public safety and major projects.",
    },
    {
        id: "council",
        title: "City Council",
        seats: 10,
        voteFor: "Vote for up to 10",
        description: "At-large (no wards). Passes bylaws, budget, land-use and housing policy.",
    },
    {
        id: "park",
        title: "Park Board",
        seats: 7,
        voteFor: "Vote for up to 7",
        description:
            "Elected board unique to Vancouver. Runs parks, recreation, pools and community centres.",
    },
    {
        id: "school",
        title: "School Trustees",
        seats: 9,
        voteFor: "Vote for up to 9",
        description: "Vancouver School Board trustees set policy and budget for public schools.",
    },
];

export const SLATES: Slate[] = [
    {
        id: "abc",
        name: "ABC Vancouver",
        summary:
            "Ban public drug use, freeze property taxes in 2027, and build middle-income rentals on city land.",
        website: "https://abcvancouver.ca/",
        running: { mayor: 1, council: 9, park: 7 },
        pillars: [
            {
                title: "Public safety",
                for: [
                    "Supporters say a clear ban is easier to enforce than the current rules.",
                    "Supporters say treatment beds and seizure tools would help police address street disorder.",
                ],
                against: [
                    "Critics say the city cannot open involuntary-care beds on its own.",
                    "Critics say hard drug use is a health matter, not one for city hall.",
                ],
                detail: "Ban open drug use in public places and move supervised drug-use sites away from schools and parks. Add more than 100 involuntary-care beds and give police faster powers to seize drugs.",
            },
            {
                title: "Affordability",
                for: [
                    "Supporters say a zero percent tax freeze keeps bills stable for residents.",
                    "Supporters say free parking makes parks and community centres easier to use.",
                ],
                against: [
                    "Critics say a tax freeze means service cuts or higher costs later.",
                    "Critics say the city loses parking revenue and drivers get more congestion.",
                ],
                detail: "Hold property taxes flat in 2027. Make residential parking permits free and remove paid parking at parks and community centres.",
            },
            {
                title: "Housing",
                for: [
                    "Supporters say city land is a rare chance to build below-market rentals.",
                    "Supporters say faster approvals get homes built sooner and cost less.",
                ],
                against: [
                    "Critics say building only middle-income rentals leaves the poorest residents out.",
                    "Critics say replacement takes years while residents lose their homes first.",
                ],
                detail: "Build 4,200 middle-income rentals on city land with faster approvals. Replace single-room-occupancy buildings (small rooms, shared bathrooms) and share supportive housing across the region.",
            },
        ],
        sourceUrl: "https://abcvancouver.ca/platform/",
    },
    {
        id: "green",
        name: "Green Party of Vancouver",
        summary:
            "Build city-owned affordable rentals, expand walking and cycling, and introduce ranked mayoral ballots and a lobbyist registry.",
        website: "https://petefry.ca/",
        running: { mayor: 1, council: 4, park: 3, school: 2 },
        pillars: [
            {
                title: "Housing at 30% of median income",
                for: [
                    "Supporters say a housing bond lets the city build below-market rentals directly.",
                    "Supporters say buying at-risk rentals keeps existing affordable homes in public hands.",
                ],
                against: [
                    "Critics say the city cannot set rents because the province controls tenancy law.",
                    "Critics say borrowing costs money and the city has limited revenue.",
                ],
                detail: "Rent city-built homes at no more than 30% of median income. Pay for them with a municipal housing bond, a fund for at-risk rentals, and stronger tenant relocation rules.",
            },
            {
                title: "Climate + transport",
                for: [
                    "Supporters say giving more road space to bikes and walking cuts emissions.",
                    "Supporters say Broadway bike lanes make cycling safer and more connected.",
                ],
                against: [
                    "Critics say removing road space makes driving slower and more frustrating.",
                    "Critics say bike lanes mostly serve people who already cycle.",
                ],
                detail: "Build Broadway bike lanes and convert 11% of roads to walking, cycling or transit. Buy Canadian lumber for city projects.",
            },
            {
                title: "Governance",
                for: [
                    "Supporters say ranked ballots let voters pick a mayor without splitting the vote.",
                    "Supporters say a lobbyist registry names the people paid to influence city hall.",
                ],
                against: [
                    "Critics say ranked ballots need provincial approval and may not change results.",
                    "Critics say the province sets the rules the city wants to change.",
                ],
                detail: "Allow ranked ballots for mayor and create a public lobbyist registry. End the freeze on new supportive housing.",
            },
        ],
        sourceUrl: "https://petefry.ca/",
    },
    {
        id: "vanlib",
        name: "Vancouver Liberals",
        summary:
            "Streamline housing approvals, hire more frontline safety workers, and expand protected bike lanes and transit.",
        website: "https://www.vancouverliberals.com/issues",
        running: { mayor: 1, council: 7, park: 6, school: 5 },
        pillars: [
            {
                title: "Housing supply",
                for: [
                    "Supporters say one housing department would cut delays and confusion.",
                    "Supporters say reversing the supportive-housing ban opens the whole city to new homes.",
                ],
                against: [
                    "Critics say merging departments does not by itself produce more homes.",
                    "Critics say supportive housing faces neighbourhood opposition and provincial funding limits.",
                ],
                detail: "Use the BC Building Code instead of Vancouver's own, and merge 12 housing departments into one. Reverse the supportive-housing ban and extend co-op leases.",
            },
            {
                title: "Public safety without plebiscite prison",
                for: [
                    "Supporters say more frontline workers help with street disorder and mental health calls.",
                    "Supporters say financial-crime investigators follow the money behind organized crime.",
                ],
                against: [
                    "Critics say the plan depends on money and decisions from other governments.",
                    "Critics say the city cannot run addiction treatment or recovery programs alone.",
                ],
                detail: "Hire 400 frontline workers and 15 financial-crime investigators. Fund a six-part addiction strategy through a Vancouver Accord.",
            },
            {
                title: "Transport",
                for: [
                    "Supporters say a large protected bike network makes cycling safer for everyone.",
                    "Supporters say SkyTrain to UBC would serve a busy, growing transit corridor.",
                ],
                against: [
                    "Critics say the city does not control SkyTrain funding or transit fares.",
                    "Critics say an inflation cap leaves little room to pay for new projects.",
                ],
                detail: "Build 400 kilometres of protected bike lanes. Make SkyTrain to UBC the top transit priority, and cap tax increases at inflation.",
            },
        ],
        sourceUrl: "https://www.vancouverliberals.com/vancouver_liberals_148_plan_full_platform",
    },
    {
        id: "votevan",
        name: "Vote Vancouver",
        summary:
            "Build affordable homes on public land, support local businesses, and make transit free for people under 18.",
        website: "https://www.votevancouver.ca/",
        running: { mayor: 1, council: 6, park: 2, school: 3 },
        pillars: [
            {
                title: "Affordable homes on public land",
                for: [
                    "Supporters say public land should create homes that stay affordable.",
                    "Supporters say childcare in new buildings helps working families.",
                ],
                against: [
                    "Critics say middle-income homes miss residents with the lowest incomes.",
                    "Critics say the city has little public land and should not spend it all this way.",
                ],
                detail: "Build permanently affordable middle-income homes on public land. Include non-profit childcare in new developments.",
            },
            {
                title: "Local economy",
                for: [
                    "Supporters say one city contact helps small-business owners get permits faster.",
                    "Supporters say attracting defence and tech firms brings jobs and investment.",
                ],
                against: [
                    "Critics say the city cannot create a defence industry on its own.",
                    "Critics say promising jobs to one sector ignores other local businesses.",
                ],
                detail: "Create a single city contact to help small businesses. Grow defence and technology companies in the region.",
            },
            {
                title: "Transit + City Hall",
                for: [
                    "Supporters say free transit for youth helps young people get around the city.",
                    "Supporters say an electric ferry gives people another way to cross the water.",
                ],
                against: [
                    "Critics say TransLink and the province set fares, not the city.",
                    "Critics say a ferry and free fares need money the city may not have.",
                ],
                detail: "Make transit free for people under 18 and add an all-electric passenger ferry. Publish service standards for city repairs.",
            },
        ],
        sourceUrl: "https://www.votevancouver.ca/rebecca-bligh",
    },
    {
        id: "team",
        name: "TEAM for a Livable Vancouver",
        summary:
            "Restore neighbourhood planning, protect existing affordable rentals, and expand community policing and recovery homes.",
        website: "https://www.voteteam.ca/",
        running: { mayor: 1, council: 7, park: 5, school: 1 },
        pillars: [
            {
                title: "Neighbourhood planning",
                for: [
                    "Supporters say neighbourhood planning gives residents a real voice in local change.",
                    "Supporters say more park space improves life in growing neighbourhoods.",
                ],
                against: [
                    "Critics say repealing city-wide plans delays homes the city badly needs.",
                    "Critics say tearing up approved plans creates uncertainty for builders and residents.",
                ],
                detail: "Repeal the city-wide, Broadway, Jericho Lands and Rupert-Renfrew plans. Restore neighbourhood planning offices and add 20% more neighbourhood park space.",
            },
            {
                title: "Rental protection",
                for: [
                    "Supporters say protecting existing affordable rentals keeps current tenants housed.",
                    "Supporters say restoring parking minimums helps residents who still need cars.",
                ],
                against: [
                    "Critics say blocking new development on those sites reduces housing supply.",
                    "Critics say parking rules raise building costs and rents.",
                ],
                detail: "Stop rezoning that puts affordable rental buildings of 10 or more units at risk. Allow small apartment buildings that fit the street, and restore parking minimums.",
            },
            {
                title: "Safety",
                for: [
                    "Supporters say enforcing rules against open drug use restores order in public places.",
                    "Supporters say district policing builds trust between officers and residents.",
                ],
                against: [
                    "Critics say enforcement alone does not treat addiction or reduce harm.",
                    "Critics say sobriety-based homes exclude people who are not ready to stop.",
                ],
                detail: "Enforce the rules against open drug use. Add district community policing, a lead for women's safety, and recovery homes that require sobriety.",
            },
        ],
        sourceUrl: "https://www.voteteam.ca/candidates-2026/colleen-for-mayor",
    },
    {
        id: "bright",
        name: "Bright Future Vancouver",
        summary:
            "Help renters build ownership equity, make transit free for residents, and invest in youth programs and community safety.",
        website: "https://www.brightfuturevancouver.com/",
        running: { mayor: 1, council: 6 },
        pillars: [
            {
                title: "Working-family housing",
                for: [
                    "Supporters say rent payments building equity helps renters get ahead.",
                    "Supporters say faster permits get homes built sooner for working people.",
                ],
                against: [
                    "Critics say tying rent to ownership equity is complicated and risky for renters.",
                    "Critics say faster permits do not lower the cost of building.",
                ],
                detail: "Let renters put 20% of rent toward owning their home. Build homes for workers rather than investors, with faster permits.",
            },
            {
                title: "Transit + youth",
                for: [
                    "Supporters say free transit for residents removes a barrier for low-income riders.",
                    "Supporters say youth programs give young people skills and opportunity.",
                ],
                against: [
                    "Critics say the city does not control fares or transit funding.",
                    "Critics say fare-free transit without more service will not solve crowding.",
                ],
                detail: "Make transit free for Vancouver residents. Fund youth opportunity programs.",
            },
            {
                title: "Safer neighbourhoods",
                for: [
                    "Supporters say community safety investments make streets feel safer.",
                    "Supporters say lively public spaces bring neighbours together.",
                ],
                against: [
                    "Critics say the plan offers little detail about what the money would buy.",
                    "Critics say parks and public spaces do not replace police and health services.",
                ],
                detail: "Invest in community safety and improve public spaces.",
            },
        ],
        sourceUrl: "https://www.brightfuturevancouver.com/blueprint",
    },
    {
        id: "onecity",
        name: "OneCity Vancouver",
        summary:
            "Strengthen renter protections, build housing for all incomes, and put homes near transit to cut emissions.",
        website: "https://vancouver.ca/plan-your-vote/index.aspx",
        running: { council: 5, park: 3, school: 5 },
        pillars: [
            {
                title: "Tenant protection",
                for: [
                    "Supporters say stronger renter protections keep tenants in their homes.",
                    "Supporters say inclusive communities need housing that serves all income levels.",
                ],
                against: [
                    "Critics say the city cannot control rent increases under provincial law.",
                    "Critics say the plan is short on specifics about what would change.",
                ],
                detail: "Strengthen protections for renters and build housing that serves all income levels.",
            },
            {
                title: "Climate",
                for: [
                    "Supporters say climate-forward land use puts homes near transit and services.",
                    "Supporters say transport policy is a practical way for the city to cut emissions.",
                ],
                against: [
                    "Critics say city emissions are small compared with the rest of the region.",
                    "Critics say the plan lacks detail on costs and timelines.",
                ],
                detail: "Put homes near transit and services, and use transport policy to cut emissions.",
            },
        ],
        sourceUrl: "https://vancouver.ca/plan-your-vote/index.aspx",
    },
    {
        id: "cope",
        name: "COPE",
        summary: "Protect tenants, improve transit access, and fund community food programs.",
        website: "https://vancouver.ca/plan-your-vote/index.aspx",
        running: { council: 4, park: 4, school: 4 },
        pillars: [
            {
                title: "Tenants + transit + food security",
                for: [
                    "Supporters say pro-tenant housing rules protect renters facing displacement.",
                    "Supporters say community food programs help residents who cannot afford groceries.",
                ],
                against: [
                    "Critics say the city must balance these programs against a limited budget.",
                    "Critics say the city does not control transit service or food policy levers.",
                ],
                detail: "Protect tenants, improve transit access, and fund community food programs.",
            },
        ],
        sourceUrl: "https://vancouver.ca/plan-your-vote/index.aspx",
    },
];
