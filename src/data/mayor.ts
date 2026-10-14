import type { Candidate } from "./types.js";

const P = "https://vancouver.ca/plan-your-vote/index.aspx";

const ABC = "https://abcvancouver.ca/platform/";
const ABC_HOUSING =
    "https://abcvancouver.ca/2026/10/abc-vancouver-calls-for-provincial-action-unveils-plan-to-build-more-homes/";
const GREEN = "https://petefry.ca/";
const VV = "https://www.votevancouver.ca/rebecca-bligh";
const LIB_PLAN = "https://www.vancouverliberals.com/vancouver_liberals_148_plan_full_platform";
const LIB_ISSUES = "https://www.vancouverliberals.com/issues";
const TEAM = "https://www.voteteam.ca/candidates-2026/colleen-for-mayor";
const BRIGHT = "https://www.brightfuturevancouver.com/blueprint";

export const MAYOR: Candidate[] = [
    {
        id: "ken-sim",
        ballot: 54,
        name: "Ken Sim",
        office: "mayor",
        party: "ABC Vancouver",
        incumbent: true,
        incumbentDetail: "Mayor since 2022",
        gist: "Incumbent mayor. More enforcement, a tax freeze, and city land for rentals.",
        website: "https://abcvancouver.ca/",
        platform: [
            {
                title: "Public safety and drug use",
                detail: "He would ban open drug use in public places. He also promises over 100 treatment beds, faster police seizure powers, and drug-use sites moved away from schools and parks.",
                delivery: "Treatment is provincial, so the beds need provincial approval and funding.",
                for: [
                    "Supporters say open drug use makes parks and transit stops feel unsafe.",
                    "Supporters say a clear ban is easier to enforce than the current rules.",
                    "Supporters say more beds would help people too unwell to consent.",
                ],
                against: [
                    "Critics say a ban pushes drug use into alleys where nobody can reverse an overdose.",
                    "Critics say the city cannot open involuntary-care beds, because health care is provincial.",
                    "Critics say moving sites away from people can break the link to treatment.",
                ],
                sourceLabel: "ABC Vancouver platform",
                sourceUrl: ABC,
            },
            {
                title: "Property taxes and parking",
                detail: "He promises no property tax increase in 2027. He would also make residential parking permits free, and end paid parking at parks and community centres.",
                delivery:
                    "A freeze means covering rising costs elsewhere, and the Park Board runs parking at parks.",
                for: [
                    "Supporters say a 0% increase helps households stretched by the cost of living.",
                    "Supporters say free parking makes parks and community centres easier to use.",
                ],
                against: [
                    "Critics say a freeze means cuts or delayed repairs, because costs keep rising.",
                    "Critics say the city has not shown how it pays for the freeze.",
                    "Critics say dropping parking fees removes money for upkeep.",
                ],
                sourceLabel: "ABC Vancouver platform",
                sourceUrl: ABC,
            },
            {
                title: "Middle-income rentals on city land",
                detail: "His Keep Building Vancouver plan promises 4,200 middle-income rentals on city land. It would speed up permits, replace single-room-occupancy buildings (small rooms, shared bathrooms), and share supportive housing across the region.",
                delivery: "City land and permits are city business, but the homes need construction money.",
                for: [
                    "Supporters say a specific number gives voters something to check.",
                    "Supporters say the plan pairs street enforcement with new housing.",
                    "Supporters say a regional share stops one city carrying the whole load.",
                ],
                against: [
                    "Critics say the city has announced housing targets before and missed them.",
                    "Critics say replacing single-room-occupancy buildings can push out the poorest tenants.",
                    "Critics say the region cannot force other cities to take a share.",
                ],
                sourceLabel: "ABC Vancouver housing plan",
                sourceUrl: ABC_HOUSING,
            },
        ],
        analysis: {
            summary:
                "Ken Sim is the incumbent mayor and runs on continuity. He promises more enforcement, a property tax freeze, and city land for middle-income rentals.",
            recordNote:
                "Sim has been mayor since 2022. Check his record on the budget, homes built, the supportive-housing freeze, and the attempt to dissolve the Park Board.",
            openQuestions: [
                "How would the city pay for a 0% increase while spending more?",
                "The province controls treatment, so the bed promise is not the city's alone.",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "pete-fry",
        ballot: 51,
        name: "Pete Fry",
        office: "mayor",
        party: "Green Party of Vancouver",
        incumbent: true,
        incumbentDetail: "City councillor since 2018, running for mayor",
        gist: "Councillor running for mayor. Longest platform, focused on renters and city-owned homes.",
        website: GREEN,
        platform: [
            {
                title: "Renters and city-owned housing",
                detail: "He promises homes renting for no more than 30% of median income. He would fund them with a city housing bond, a fund to buy older rentals, and pre-approved designs.",
                delivery: "The bond's size, cost and whether voters must approve it are not public.",
                for: [
                    "Supporters say a clear rent target is easy for renters to check.",
                    "Supporters say buying older buildings keeps sitting tenants in place.",
                    "Supporters say factory-built designs cut months off approvals.",
                ],
                against: [
                    "Critics say the plan does not give the bond a size or a cost.",
                    "Critics say 30% of median income is still out of reach on minimum wage.",
                    "Critics say the city cannot build at this scale without matching money.",
                ],
                sourceLabel: "Green Party platform (71 pages)",
                sourceUrl: GREEN,
            },
            {
                title: "Climate and streets",
                detail: "He would build Broadway bike lanes and convert 11% of city roads to walking, cycling or transit. He would also buy Canadian lumber for city projects.",
                delivery:
                    "Road changes affect parking, loading and accessibility, so the city would plan street by street.",
                for: [
                    "Supporters say a percentage target is clear enough to check.",
                    "Supporters say safer streets reduce injuries and cut traffic.",
                    "Supporters say buying Canadian lumber supports local mills.",
                ],
                against: [
                    "Critics say the plan does not name the streets, so residents cannot judge it.",
                    "Critics say taking road space slows deliveries and can hinder mobility aids.",
                    "Critics say the target has no budget, timeline or statement of who pays.",
                ],
                sourceLabel: "Green Party platform",
                sourceUrl: GREEN,
            },
            {
                title: "How the city makes decisions",
                detail: "He would allow ranked ballots for mayor, create a public lobbyist registry, and end the freeze on new supportive housing.",
                delivery:
                    "Ranked ballots need a change to the Vancouver Charter, which only the province can make.",
                for: [
                    "Supporters say ranked ballots let people vote for who they prefer.",
                    "Supporters say a registry shows residents who influences city decisions.",
                    "Supporters say ending the freeze gets people indoors.",
                ],
                against: [
                    "Critics say the city cannot adopt ranked ballots on its own.",
                    "Critics say a registry records lobbying but does not limit it.",
                    "Critics say lifting the freeze needs sites, and the plan names none.",
                ],
                sourceLabel: "Green Party platform",
                sourceUrl: GREEN,
            },
        ],
        analysis: {
            summary:
                "Pete Fry is a councillor running for mayor on the longest platform in the race. He is clearest on renters, and his plan reverses several ABC policies.",
            recordNote: "Fry has sat on council since 2018. You can check his votes on housing and climate.",
            openQuestions: [
                "How large would the housing bond be, and who approves it?",
                "Which streets would change, and who pays for the work?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "rebecca-bligh",
        ballot: 52,
        name: "Rebecca Bligh",
        office: "mayor",
        party: "Vote Vancouver",
        incumbent: true,
        incumbentDetail:
            "City councillor since 2018. Elected with the NPA in 2018, sat with ABC Vancouver from 2022 to 2025, and has sat with Vote Vancouver since 2025.",
        gist: "Councillor who left ABC in 2025. Middle-income homes, childcare, service standards.",
        website: VV,
        platform: [
            {
                title: "Homes on public land, with childcare",
                detail: "She promises permanently affordable homes for middle-income renters on public land. New buildings would include childcare run by non-profit groups.",
                delivery: "The city owns the land, but the homes need money from the province or Ottawa.",
                for: [
                    "Supporters say pairing homes with childcare helps working families twice over.",
                    "Supporters say permanently affordable means the homes stay affordable later.",
                    "Supporters say public land is the cheapest place to build.",
                ],
                against: [
                    "Critics say the plan gives no number of homes and no rents.",
                    "Critics say middle-income homes do not help the lowest-income renters.",
                    "Critics say new childcare spaces need staff the city already lacks.",
                ],
                sourceLabel: "Vote Vancouver",
                sourceUrl: VV,
            },
            {
                title: "Small business and jobs",
                detail: "She would create a single city contact to help small businesses get permits and licences. She also wants to grow defence and technology companies in the region.",
                delivery: "Permit help is city business, but industry growth depends on others.",
                for: [
                    "Supporters say one named contact saves small businesses time.",
                    "Supporters say technology and defence jobs pay well.",
                ],
                against: [
                    "Critics say one contact does not fix slow permit rules.",
                    "Critics say the city has little say over which industries grow.",
                ],
                sourceLabel: "Vote Vancouver",
                sourceUrl: VV,
            },
            {
                title: "Transit and service standards",
                detail: "She promises free transit for people under 18, an all-electric ferry, and published service standards such as fixing streetlights within 72 hours.",
                delivery:
                    "TransLink runs transit, so free youth fares need TransLink and the province to agree.",
                for: [
                    "Supporters say free transit for young people builds the habit early.",
                    "Supporters say a published standard lets residents check the city.",
                    "Supporters say an electric ferry cuts emissions on an existing route.",
                ],
                against: [
                    "Critics say free youth transit costs money TransLink does not have.",
                    "Critics say the campaign has published no purchase or operating costs for the ferry.",
                    "Critics say service standards only matter if the city reports against them.",
                ],
                sourceLabel: "Vote Vancouver",
                sourceUrl: VV,
            },
        ],
        analysis: {
            summary:
                "Rebecca Bligh is a councillor who left ABC Vancouver in 2025 and now runs with Vote Vancouver. She focuses on middle-income housing, childcare and service standards.",
            recordNote:
                "Bligh has been on council since 2018. She won a seat with the NPA, sat with ABC, then left.",
            openQuestions: [
                "What would the ferry cost to buy and run?",
                "Has TransLink agreed to free youth fares, and who pays?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "kareem-allam",
        ballot: 57,
        name: "Kareem Allam",
        office: "mayor",
        party: "Vancouver Liberals",
        incumbent: false,
        incumbentDetail: "Former chief of staff to Mayor Sim, dismissed in February 2025",
        gist: "Former chief of staff to Mayor Sim. Most detailed plan, at 148 points.",
        website: LIB_ISSUES,
        platform: [
            {
                title: "Housing rules and city departments",
                detail: "His 148-point plan would use the provincial building code instead of Vancouver's own. It would merge 12 housing departments, lift the supportive-housing freeze, and extend co-op leases.",
                delivery: "Most of this is city business, but lifting the freeze needs sites and operators.",
                for: [
                    "Supporters say one building code removes delay for builders.",
                    "Supporters say merging departments ends the approvals runaround.",
                    "Supporters say longer co-op leases let co-ops borrow to repair.",
                ],
                against: [
                    "Critics say Vancouver's code exists for local seismic and energy standards.",
                    "Critics say merging departments takes years and speeds up nothing.",
                    "Critics say lifting the freeze does not say where housing goes.",
                ],
                sourceLabel: "Vancouver Liberals 148-point plan",
                sourceUrl: LIB_PLAN,
            },
            {
                title: "Safety and city spending",
                detail: "He would hire 400 frontline workers and 15 financial-crime investigators, and cap tax increases at inflation. He opposes the public-safety plebiscite and would cancel the $800-million second City Hall.",
                delivery: "The city hires its own staff, but treatment and health care are provincial.",
                for: [
                    "Supporters say more frontline workers target what residents report most.",
                    "Supporters say cancelling a new City Hall frees money for services.",
                    "Supporters say tying taxes to inflation keeps costs predictable.",
                ],
                against: [
                    "Critics say the city cannot fund the hires, bike lanes and tax cap together.",
                    "Critics say addiction treatment is provincial, so a city plan cannot deliver it.",
                    "Critics say cancelling a signed project can leave the city paying penalties.",
                ],
                sourceLabel: "Vancouver Liberals plan",
                sourceUrl: LIB_ISSUES,
            },
            {
                title: "Bike lanes and transit",
                detail: "He promises 400 kilometres of protected bike lanes. He makes SkyTrain to UBC the city's top transit priority.",
                delivery:
                    "The city builds bike lanes, but SkyTrain to UBC is a TransLink and provincial project.",
                for: [
                    "Supporters say a connected network is safer than a patchwork.",
                    "Supporters say SkyTrain to UBC would serve a busy route.",
                ],
                against: [
                    "Critics say 400 kilometres far exceeds what the city has built.",
                    "Critics say the city cannot decide on SkyTrain to UBC.",
                    "Critics say the bike network and the tax cap pull against each other.",
                ],
                sourceLabel: "Vancouver Liberals plan",
                sourceUrl: LIB_ISSUES,
            },
        ],
        analysis: {
            summary:
                "Kareem Allam was Ken Sim's chief of staff until February 2025 and now runs against him. His 148-point plan is the most detailed in the race.",
            recordNote:
                "Allam's public record is his time as chief of staff to Mayor Sim, where he served until February 2025.",
            openQuestions: [
                "Where does the money come from for 400 hires and 400 km of lanes?",
                "Which sites and operators would take the supportive housing?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "colleen-hardwick",
        ballot: 50,
        name: "Colleen Hardwick",
        office: "mayor",
        party: "TEAM for a Livable Vancouver",
        incumbent: false,
        incumbentDetail: "City councillor from 2018 to 2022; ran for mayor in 2022",
        gist: "Former councillor. Would repeal recent city plans and protect existing rentals.",
        website: TEAM,
        platform: [
            {
                title: "Neighbourhood planning",
                detail: "She would repeal the Vancouver Plan, the Broadway Plan, the Jericho Lands plan and the Rupert–Renfrew plan. She would restore neighbourhood planning offices and add 20% more park space.",
                delivery: "Council can repeal its own plans, but some sites are already approved.",
                for: [
                    "Supporters say the repeal list is specific and easy to check.",
                    "Supporters say neighbourhood planning gives residents a real say.",
                    "Supporters say more park space improves daily life in dense areas.",
                ],
                against: [
                    "Critics say repeal removes approved housing capacity the region needs.",
                    "Critics say the province can override the city on housing targets.",
                    "Critics say the city has not explained the cost or existing projects.",
                ],
                sourceLabel: "TEAM nine-plank platform",
                sourceUrl: TEAM,
            },
            {
                title: "Protecting existing rentals",
                detail: "She would stop rezoning that puts affordable rental buildings of 10 or more units at risk. She would restore parking minimums and allow small buildings that match the street.",
                delivery:
                    "Council controls zoning and parking, so the trade-off is fewer homes on those sites.",
                for: [
                    "Supporters say the city loses affordable rentals when older buildings come down.",
                    "Supporters say small buildings that match the street are easier to accept.",
                    "Supporters say parking rules matter for residents who cannot use transit.",
                ],
                against: [
                    "Critics say blocking redevelopment freezes the supply of homes.",
                    "Critics say parking requirements make every new home costlier.",
                    "Critics say the policy protects some renters and hurts others.",
                ],
                sourceLabel: "TEAM platform",
                sourceUrl: TEAM,
            },
            {
                title: "Public safety",
                detail: "She wants strict enforcement against open drug use and community policing by district. She would name a lead for women's safety and favour recovery homes that require sobriety.",
                delivery: "Policing is city business, but addiction treatment is provincial.",
                for: [
                    "Supporters say residents and businesses want open drug use enforced.",
                    "Supporters say a named lead makes women's safety somebody's job.",
                    "Supporters say sobriety-based homes work for people ready to stop.",
                ],
                against: [
                    "Critics say enforcement moves the problem instead of solving it.",
                    "Critics say requiring sobriety leaves the sickest people outside.",
                    "Critics say the plan gives no number of beds and no funder.",
                ],
                sourceLabel: "TEAM safety plan",
                sourceUrl: TEAM,
            },
        ],
        analysis: {
            summary:
                "Colleen Hardwick was a councillor from 2018 to 2022 and ran for mayor in 2022. Her platform stops and undoes recent city plans.",
            recordNote:
                "Hardwick sat on council from 2018 to 2022, so her votes from that term are on the record.",
            openQuestions: [
                "How would repeal affect the province's housing targets?",
                "What happens to projects already approved under those plans?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "muhammad-ahmad",
        ballot: 53,
        name: "Muhammad Ahmad",
        office: "mayor",
        party: "Bright Future Vancouver",
        incumbent: false,
        gist: "New candidate aimed at renters, shift workers and tradespeople.",
        website: "https://www.brightfuturevancouver.com/muhammad-ahmad",
        platform: [
            {
                title: "A city for workers and renters",
                detail: "His blueprint promises safer neighbourhoods, better public spaces, chances for young people, and homes for working families rather than investors. He would speed up permits.",
                delivery:
                    "Permits and public spaces are city business, but the homes need money and partners.",
                for: [
                    "Supporters say the plan speaks to workers and renters who feel overlooked.",
                    "Supporters say faster permits get homes built sooner.",
                ],
                against: [
                    "Critics say the promises are broad and give no home numbers.",
                    "Critics say the plan does not name the rule it would change.",
                ],
                sourceLabel: "Bright Future blueprint",
                sourceUrl: BRIGHT,
            },
            {
                title: "Rent that builds ownership, and free transit",
                detail: "He would let renters put 20% of each rent payment toward owning their home. He also promises free transit for Vancouver residents.",
                delivery: "Both promises need a funding design, and TransLink sets fares.",
                for: [
                    "Supporters say rent equity helps renters who cannot save a down payment.",
                    "Supporters say free transit helps people who cannot afford fares.",
                ],
                against: [
                    "Critics say the plan does not say who funds the equity.",
                    "Critics say the city cannot set transit fares on its own.",
                    "Critics say neither promise has a published cost.",
                ],
                sourceLabel: "Bright Future blueprint",
                sourceUrl: BRIGHT,
            },
        ],
        analysis: {
            summary:
                "Muhammad Ahmad is a new candidate with Bright Future Vancouver, aiming at renters, shift workers and tradespeople. His two headline promises have no published design or price.",
            openQuestions: [
                "Who pays for the rent-to-ownership credit, and who qualifies?",
                "Has TransLink agreed to free fares, and who covers the cost?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-13",
        },
    },
    {
        id: "amauri-caliman",
        ballot: 55,
        name: "Amauri Caliman",
        office: "mayor",
        party: "Independent",
        incumbent: false,
        gist: "Independent. No reviewed platform on file.",
        website: P,
        platform: [
            {
                title: "Campaign material",
                detail: "The City's Plan Your Vote page lists this candidate's card, contact details and campaign links.",
                for: [],
                against: [],
                sourceLabel: "Plan Your Vote",
                sourceUrl: P,
            },
        ],
        analysis: {
            summary:
                "Amauri Caliman is running as an independent. We have not reviewed a platform yet, which is a gap in our coverage.",
            openQuestions: ["What does this candidate promise? Check the official card before you vote."],
            reviewed: false,
        },
    },
    {
        id: "scott-gilbert",
        ballot: 56,
        name: "Scott Gilbert",
        office: "mayor",
        party: "Independent",
        incumbent: false,
        gist: "Independent. No reviewed platform on file.",
        website: P,
        platform: [
            {
                title: "Campaign material",
                detail: "The City's Plan Your Vote page lists this candidate's card, contact details and campaign links.",
                for: [],
                against: [],
                sourceLabel: "Plan Your Vote",
                sourceUrl: P,
            },
        ],
        analysis: {
            summary:
                "Scott Gilbert is running as an independent. We have not reviewed a platform yet, which is a gap in our coverage.",
            openQuestions: ["What does this candidate promise? Check the official card before you vote."],
            reviewed: false,
        },
    },
];
