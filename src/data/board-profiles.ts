import type { Candidate, PlatformItem } from "./types.js";

/** Sources read October 14. These summaries describe promises, not verified delivery. */
type Profile = {
    summary: string;
    platform: PlatformItem[];
    website?: string;
    recordNote?: string;
    openQuestions?: string[];
};

function item(
    title: string,
    detail: string,
    sourceUrl: string,
    sourceLabel: string,
    scope: "candidate" | "slate" = "slate",
): PlatformItem {
    return { title, detail, sourceUrl, sourceLabel, scope, for: [], against: [] };
}

const ABC = "https://abcvancouver.ca/2026/09/raising-vancouver-completes-abcs-policy-launch/";
const LIB = "https://www.vancouverliberals.com/platform";
const GREEN = "https://www.vangreens.ca/platform";
const OC_PARK = "https://www.onecityvancouver.ca/news/parks-pipes-pools";
const OC_SCHOOL = "https://www.onecityvancouver.ca/news/better-schools";
const COPE = "https://www.votecope.ca/the-cope-team";
const TEAM_PARK = "https://www.voteteam.ca/our-positions-home-2026/parks-and-recreation-2026";
const TEAM_SCHOOL = "https://www.voteteam.ca/our-positions-home-2026/schools-2026";
const VV =
    "https://static1.squarespace.com/static/68c32de4e593ea3b0dc880d9/t/6aa9d80a8fa26e07376070ad/1789515786990/VV-PolicyPriorities_260915.pdf";
const TB = "https://truebluevancouver.com/downloads/trueblue-vancouver-2026-full-platform.pdf";
const BCA = "https://burrardview.org/2026-vancouver-park-board-candidate-questionnaire/";

const SHARED_PARK: Record<string, Profile> = {
    "ABC Vancouver": {
        summary:
            "ABC's shared parks plan emphasizes swimming lessons, recreation access, new pools and playground improvements.",
        platform: [
            item(
                "Swimming and recreation",
                "Offer children aged 3–12 the first three levels of swimming lessons free. Give children under 18 in care free access to pools and community centres.",
                ABC,
                "ABC Raising Vancouver",
            ),
            item(
                "Pools and community spaces",
                "Build outdoor pools in Sunset and Marpole, deliver the River District Community Centre, and create a playground improvement fund.",
                ABC,
                "ABC Raising Vancouver",
            ),
            item(
                "Parks and childcare",
                "Double designated dog parks and off-leash areas, restore the Stanley Park train, and expand childcare and after-school programs with partners.",
                ABC,
                "ABC Raising Vancouver",
            ),
        ],
    },
    "Vancouver Liberals": {
        summary:
            "The Vancouver Liberals' shared parks plan combines an elected board, facility renewal and more affordable access.",
        platform: [
            item(
                "Elected board and renewal",
                "Keep the board elected and restore its authority. Propose $1.35 billion for parks and recreation, with funding extending into the 2031–2034 capital plan.",
                LIB,
                "Vancouver Liberals parks platform",
            ),
            item(
                "Pools and community centres",
                "Renew pools and community centres, including the Aquatic Centre's 50-metre pool. Prioritize River District and Renfrew and restore beach lifeguards.",
                LIB,
                "Vancouver Liberals parks platform",
            ),
            item(
                "Access and nature",
                "Remove beach and community-centre parking fees, expand low-income recreation access, add washrooms, and restore habitat and community gardens.",
                LIB,
                "Vancouver Liberals parks platform",
            ),
        ],
    },
    "Green Party of Vancouver": {
        summary:
            "The Greens' shared parks plan emphasizes trees, affordable recreation and renewed facilities under an independent elected board.",
        platform: [
            item(
                "Trees and ecosystems",
                "Replace 5,000 stumps with trees toward 30% citywide canopy. Prioritize underserved areas and pilot three small forests.",
                GREEN,
                "Green Park Board platform",
            ),
            item(
                "Affordable recreation",
                "Subsidize swimming lessons, field bookings and ice rentals. Expand recreation assistance and make programs and facilities more inclusive.",
                GREEN,
                "Green Park Board platform",
            ),
            item(
                "Facilities and independence",
                "Renew community centres and pools, including a new 50-metre pool at Hastings or Kensington. Preserve the elected board and strengthen public funding.",
                GREEN,
                "Green Park Board platform",
            ),
        ],
    },
    OneCity: {
        summary:
            "OneCity's shared parks plan focuses on dependable funding, more green space and staffed pools and beaches.",
        platform: [
            item(
                "Board revenue",
                "Keep earned parks revenue with the board and pilot park gift shops to raise funds without increasing fees.",
                OC_PARK,
                "OneCity Parks, Pipes & Pools",
            ),
            item(
                "More nature",
                "Target 40% tree canopy, increase parkland from 11% to 12% of city land, and uncover up to three buried creeks.",
                OC_PARK,
                "OneCity Parks, Pipes & Pools",
            ),
            item(
                "Pools and lifeguards",
                "Keep pools open and beaches staffed with qualified lifeguards. Build pools at Mount Pleasant, Hastings and Marpole, including a new 50-metre pool.",
                OC_PARK,
                "OneCity Parks, Pipes & Pools",
            ),
        ],
    },
    "TEAM for a Livable Vancouver": {
        summary:
            "TEAM's shared parks plan emphasizes board independence, permanent park protection and facility investment.",
        platform: [
            item(
                "Board independence",
                "Keep the elected board and return finance, operations and facilities to its jurisdiction.",
                TEAM_PARK,
                "TEAM parks platform",
            ),
            item(
                "Protecting parks",
                "Give temporary and informal parks permanent designations, and plan park expansion alongside population growth.",
                TEAM_PARK,
                "TEAM parks platform",
            ),
            item(
                "Recreation investment",
                "Pledge $739 million over four years for parks and recreation. Include a 50-metre pool in the Aquatic Centre replacement.",
                TEAM_PARK,
                "TEAM parks platform",
            ),
        ],
    },
    "Independent Parks Party": {
        summary:
            "The Independent Parks Party's published neighbourhood questionnaire response emphasizes consultation and elected-board oversight of park uses.",
        platform: [
            item(
                "Consultation and oversight",
                "Require public board decisions, written agreements and neighbour consultation for park-use proposals. Assess cumulative impacts before approval.",
                BCA,
                "Burrardview questionnaire — confirmed party response",
            ),
            item(
                "Burrard View review",
                "Seek a report on the Burrard View food forest and fire pit within 90 days, considering neighbourhood impacts.",
                BCA,
                "Burrardview questionnaire — confirmed party response",
            ),
        ],
        openQuestions: [
            "How would these consultation and review requirements affect existing programs and partnerships?",
        ],
    },
};

const SHARED_SCHOOL: Record<string, Profile> = {
    "ABC Vancouver": {
        summary:
            "ABC's shared schools plan emphasizes classroom resources, police liaison officers, childcare and swimming programs.",
        platform: [
            item(
                "Classroom resources",
                "Advocate for more provincial school-tax funding for Vancouver classrooms, educational assistants and support for diverse learners.",
                ABC,
                "ABC Raising Vancouver",
            ),
            item(
                "School safety",
                "Maintain the School Liaison Officer program.",
                ABC,
                "ABC Raising Vancouver",
            ),
            item(
                "Childcare and activities",
                "Expand childcare and after-school programming with partners, and bring swimming classes back into the school day.",
                ABC,
                "ABC Raising Vancouver",
            ),
        ],
    },
    "Vancouver Liberals": {
        summary:
            "The Vancouver Liberals' shared schools plan emphasizes safe buildings, public school land and student supports.",
        platform: [
            item(
                "Buildings and school land",
                "Prioritize seismic upgrades and overcrowding. Keep neighbourhood schools open, retain school land publicly, and expand childcare at suitable sites.",
                LIB,
                "Vancouver Liberals school platform",
            ),
            item(
                "Learning and wellbeing",
                "Protect learning supports, expand meals, and prioritize counsellors. Renew the Indigenous Education Enhancement Agreement.",
                LIB,
                "Vancouver Liberals school platform",
            ),
            item(
                "Police and technology",
                "Keep the reformed School Liaison Officer program. Set age-appropriate AI rules with privacy safeguards and teacher training, consulting families before expansion.",
                LIB,
                "Vancouver Liberals school platform",
            ),
        ],
    },
    "Green Party of Vancouver": {
        summary:
            "The Greens' shared schools plan emphasizes frontline supports, accessible learning and transparent budgets.",
        platform: [
            item(
                "Learning and staffing",
                "Protect frontline staff, reduce financial barriers, and revisit cuts to music teachers and librarians. Pause AI chatbots pending review.",
                GREEN,
                "Green School Board platform",
            ),
            item(
                "Wellbeing and buildings",
                "Expand meals and mental-health supports, continue SOGI 123 inclusion resources, and prioritize seismic upgrades and healthier buildings.",
                GREEN,
                "Green School Board platform",
            ),
            item(
                "Funding and participation",
                "Advocate for stable provincial funding, publish understandable budgets, review management salaries, and strengthen student and family consultation.",
                GREEN,
                "Green School Board platform",
            ),
        ],
    },
    OneCity: {
        summary:
            "OneCity's shared schools plan emphasizes public land, childcare, meals and protected learning programs.",
        platform: [
            item(
                "Public land and community hubs",
                "Keep school land publicly owned. Rebuild Kingsgate and Britannia with schools, childcare, recreation and affordable homes through public partnerships.",
                OC_SCHOOL,
                "OneCity Better Schools",
            ),
            item(
                "Meals and learning",
                "Develop universal school meals and public/non-profit childcare. Protect arts, music, physical education and libraries, and improve disability supports.",
                OC_SCHOOL,
                "OneCity Better Schools",
            ),
            item(
                "Governance and technology",
                "Restore public participation at board meetings and expand mental-health supports. Limit AI chatbot access to Grades 10–12 with safeguards and human supervision.",
                OC_SCHOOL,
                "OneCity Better Schools",
            ),
        ],
    },
    "TEAM for a Livable Vancouver": {
        summary:
            "TEAM's shared schools plan emphasizes classroom spending, neighbourhood schools, music and swimming.",
        platform: [
            item(
                "Classroom spending",
                "Redirect resources from administration toward classrooms and programs focused on student learning.",
                TEAM_SCHOOL,
                "TEAM schools platform",
            ),
            item(
                "Neighbourhood schools",
                "Keep existing schools open and prioritize new schools in underserved communities.",
                TEAM_SCHOOL,
                "TEAM schools platform",
            ),
            item(
                "Music and swimming",
                "Restore music at every elementary school and develop an integrated swimming program for Vancouver children.",
                TEAM_SCHOOL,
                "TEAM schools platform",
            ),
        ],
    },
    "Vote Vancouver": {
        summary:
            "Vote Vancouver's shared schools plan emphasizes student supports, meals, school facilities and rules for technology.",
        platform: [
            item(
                "Student supports and programs",
                "Improve mental-health and neurodivergent learning supports, expand school nutrition, and protect arts, music and physical education from cuts.",
                VV,
                "Vote Vancouver Policy Priorities, pp. 26–27",
            ),
            item(
                "Technology and police",
                "Consult students, families and staff before new AI tools. Use out-of-uniform liaison officers alongside counsellors, youth workers and independent equity reviews.",
                VV,
                "Vote Vancouver Policy Priorities, pp. 26–27",
            ),
            item(
                "Buildings and student voice",
                "Prioritize seismic renewal, assess repairs without selling public assets, and accelerate Olympic Village School. Expand opportunities for student representation.",
                VV,
                "Vote Vancouver Policy Priorities, pp. 26–27",
            ),
        ],
    },
    "TrueBlue Vancouver": {
        summary:
            "TrueBlue's shared schools plan emphasizes police liaison programs, individual learning supports and parent and student participation.",
        platform: [
            item(
                "Safety and learning supports",
                "Support police liaison programs, enforce anti-bullying rules, and provide accommodations based on each student's learning needs.",
                TB,
                "TrueBlue full platform, pp. 39–41",
            ),
            item(
                "History and critical thinking",
                "End mandatory land acknowledgements. Teach source evaluation and respectful debate; the party also calls for changes to how Canadian and Indigenous history are taught.",
                TB,
                "TrueBlue full platform, pp. 39–40",
            ),
            item(
                "Student participation",
                "Give students input on school issues while keeping elected trustees accountable to parents and voters.",
                TB,
                "TrueBlue full platform, p. 41",
            ),
        ],
    },
};

const SURVEY_BASE = "https://vancouverpublicspace.ca/our-work/2026-park-board-candidate-survey/";
type Survey = { path: string; summary: string; priorities: [string, string][] };
const SURVEYS: Record<number, Survey> = {
    200: {
        path: "stephen-menon-200-vote-vancouver/",
        summary:
            "Stephen Menon prioritizes tree care, reliable facilities and transparent funding under an independent elected board.",
        priorities: [
            [
                "Tree care and climate refuge",
                "Plant shade trees at Renfrew Park with five years of care. Expand in-house forestry capacity and provide cooling and clean-air spaces.",
            ],
            [
                "Funding and accountability",
                "Support planned tax increases and parks borrowing rather than service cuts. Retain earned parks revenue and publish funded projects and service standards.",
            ],
            [
                "Community access",
                "Simplify small-event permits, fund stewardship groups, improve affordable drop-in access, and aim to respond to community inquiries within 10 days.",
            ],
        ],
    },
    202: {
        path: "leonard-vanderstar-202/",
        summary:
            "Leonard Vanderstar prioritizes tree protection, parks that grow with neighbourhoods and more public involvement.",
        priorities: [
            [
                "Stanley Park trees",
                "Limit tree removal to imminent hazards assessed using certified methods, and restore native forest canopy.",
            ],
            [
                "Park protection",
                "Expand green space alongside growth and seek to reverse approval for the Nelson Park electrical substation.",
            ],
            [
                "Public participation",
                "Convene monthly town halls and keep recreation affordable, with support for multicultural events.",
            ],
        ],
    },
    206: {
        path: "tamiko-suzuki-206-cope/",
        summary:
            "Tamiko Suzuki prioritizes accessible washrooms, facility renewal and Indigenous partnerships in park stewardship.",
        priorities: [
            [
                "Washrooms and renewal",
                "Improve washroom hours and maintenance, use portable toilets where needed, and renew facilities according to assessed needs.",
            ],
            [
                "Independence and partnership",
                "Preserve the elected board with predictable funding. Pursue Indigenous co-management, restoration, cultural programs and training opportunities.",
            ],
            [
                "Community stewardship",
                "Offer small grants, simpler permits and staff help for neighbourhood groups caring for public spaces.",
            ],
        ],
    },
    210: {
        path: "summit-ambeault-wannamaker-210-vote-vancouver/",
        summary:
            "Summit Wannamaker prioritizes accessible parks, climate-ready facilities and an independent board working with community partners.",
        priorities: [
            [
                "Accessibility",
                "Improve washrooms, paths and seating at Memorial South Park. Plan new green spaces alongside neighbourhood growth.",
            ],
            [
                "Climate resilience",
                "Maintain the 30% canopy goal, track mature trees and new plantings, and extend community-centre hours during extreme weather.",
            ],
            [
                "Independent, connected board",
                "Keep the elected board, simplify event permits, fund stewardship groups, and work with Host Nations on park planning.",
            ],
        ],
    },
    211: {
        path: "shayla-bird-211/",
        summary:
            "Shayla Bird prioritizes recreation in Strathcona, climate resilience and easier access for community organizers.",
        priorities: [
            [
                "Strathcona recreation",
                "Find temporary recreational court space while Strathcona's tennis courts await permanent reopening.",
            ],
            [
                "Climate and access",
                "Expand shade, biodiversity and stormwater measures. Equip community centres as cooling and clean-air refuges.",
            ],
            [
                "Community participation",
                "Simplify permits, offer small activation grants, and make consultation accessible in more languages, times and locations.",
            ],
        ],
    },
    213: {
        path: "10490-2/",
        summary:
            "Cam Rothery prioritizes tree protection, public control of recreation and affordable access.",
        priorities: [
            [
                "Trees and public parks",
                "Restrict logging to independently assessed unsafe trees. Establish an expert canopy office and oppose park commercialization and private facility management.",
            ],
            [
                "Fees and participation",
                "Return Spanish Banks parking to $1 per hour and hold monthly town halls. Review playground and sports-court safety.",
            ],
        ],
    },
    214: {
        path: "tyler-petersen-214-onecity/",
        summary:
            "Tyler Petersen prioritizes park lighting, climate-ready community facilities and dependable parks funding.",
        priorities: [
            [
                "Lighting and climate refuge",
                "Improve lighting at Andy Livingstone Park and elsewhere. Add cooling and air filtration to community facilities.",
            ],
            [
                "Funding and community access",
                "Keep earned parks revenue with the board, pursue external grants, and prepare projects for construction. Support cultural programming and Host Nation partnerships.",
            ],
        ],
    },
    215: {
        path: "sacia-burton-215/",
        summary:
            "Sacia Burton prioritizes public washrooms, climate-ready facilities, food access and equitable use of parks.",
        priorities: [
            [
                "Washrooms and climate safety",
                "Pilot 24-hour washrooms in Stanley Park. Improve cooling and warming centres and explore heat protections for outdoor workers.",
            ],
            [
                "Community food and stewardship",
                "Simplify garden licensing, support farmers' markets and fieldhouses, and create grants for stewardship groups.",
            ],
            [
                "Inclusive public space",
                "Offer multilingual booking help, prevent discriminatory events in public venues, and improve walkable access to off-leash spaces.",
            ],
        ],
    },
    216: {
        path: "breanne-smart-216-green-party/",
        summary:
            "Breanne Smart prioritizes an East Vancouver pool, lower-emission facilities and community programs that bring people together.",
        priorities: [
            [
                "Pools and climate",
                "Support a 50-metre pool at Hastings or Kensington. Reuse rink waste heat for pools and expand plant-based food in recreation facilities.",
            ],
            [
                "Community connection",
                "Simplify event permits, reach out to underfunded groups, and support gardens, food forests and community meals.",
            ],
        ],
    },
    217: {
        path: "john-irwin-217/",
        summary:
            "John Irwin prioritizes washrooms, neighbourhood parks and community facilities prepared for heat and smoke.",
        priorities: [
            [
                "Neighbourhood facilities",
                "Implement the washroom strategy, turn suitable street ends into pocket parks, and follow the community-centre renewal strategy.",
            ],
            [
                "Climate and partnerships",
                "Electrify the parks fleet and improve cooling and air filtration. Hold annual government-to-government meetings with Host Nations and support community gardens.",
            ],
        ],
    },
    221: {
        path: "amanda-bains-221/",
        summary:
            "Amanda Bains prioritizes public washrooms, accountable facility investment and easier community access.",
        priorities: [
            [
                "CRAB Park washroom",
                "Install an accessible, staffed washroom at CRAB Park that stays open around the clock.",
            ],
            [
                "Growth and governance",
                "Plan parks alongside housing and preserve an elected board with transparent capital plans, measurable standards and Indigenous partnerships.",
            ],
            [
                "Community events",
                "Simplify permits, offer small activation grants and give organizers a single point of contact.",
            ],
        ],
    },
    222: {
        path: "tom-digby-222/",
        summary:
            "Tom Digby prioritizes a new East Vancouver pool, tree care and climate-ready facilities under an elected board.",
        priorities: [
            [
                "Pools and investment",
                "Seek consensus on a 50-metre pool at Hastings or Kensington. Support borrowing for recreation infrastructure.",
            ],
            [
                "Trees and climate refuge",
                "Increase planting and tree care, and install effective air filtration in recreation facilities and libraries.",
            ],
            [
                "Independent board",
                "Preserve the elected board, seek regular meetings with the mayor, and continue park planning with Host Nations.",
            ],
        ],
    },
    226: {
        path: "michael-robert-caditz-226/",
        summary:
            "Michael Robert Caditz prioritizes tree protection, elected-board oversight and lower parking costs.",
        priorities: [
            [
                "Trees and park uses",
                "Restrict Stanley Park removals to certified imminent hazards. Establish a canopy office and seek to reverse the Nelson Park substation approval.",
            ],
            [
                "Access and maintenance",
                "Restore $1-per-hour Spanish Banks parking and remove farmers' market parking fees. Assess Trout Lake maintenance, playgrounds and sports courts.",
            ],
            ["Public governance", "Oppose park commercialization and convene monthly public town halls."],
        ],
    },
    229: {
        path: "tricia-barker-229/",
        summary:
            "Tricia Barker prioritizes seniors, people with disabilities and preserving an elected Park Board.",
        priorities: [
            [
                "Accessible washrooms",
                "Improve the cleanliness and accessibility of Spanish Banks washrooms and consider seniors and disability access in park decisions.",
            ],
            [
                "Seniors and independence",
                "Preserve the elected board and address social isolation among seniors without lengthy delays.",
            ],
        ],
    },
    230: {
        path: "dominic-denofrio-230-onecity/",
        summary:
            "Dominic Denofrio prioritizes South Vancouver maintenance, fair facility investment and climate-ready recreation spaces.",
        priorities: [
            [
                "Maintenance and growth",
                "Restore the Fraser River Park boardwalk and prioritize facilities in growing neighbourhoods according to evidence of need.",
            ],
            [
                "Climate and community",
                "Equip recreation facilities as cooling centres, expand gardens and pollinator meadows, and simplify community-event processes.",
            ],
        ],
    },
    231: {
        path: "niknaz-alemi-231/",
        summary:
            "Niknaz Alemi prioritizes evidence-based investment, climate adaptation and community stewardship.",
        priorities: [
            [
                "Equitable investment",
                "Use VanPlay's underserved-area priorities to direct tree planting and accessible green-space investment.",
            ],
            [
                "Climate and stewardship",
                "Expand canopy and rain gardens, protect habitats, and offer community groups grants, equipment and staff expertise for restoration and citizen science.",
            ],
        ],
    },
};

function personal(title: string, detail: string, url: string, label = "Candidate campaign profile") {
    return item(title, detail, url, label, "candidate");
}

/** Ballot numbers identify the office's roster; published name variants do not change IDs. */
const SCHOOL_PERSONAL: Record<number, Profile> = {
    303: {
        summary:
            "Alisha Masongsong emphasizes support for students and educators, with arts, music and access to nature as part of learning.",
        website: "https://www.vangreens.ca/alisha_masongsong",
        platform: [
            personal(
                "Learning opportunities",
                "Support students and educators inside and outside classrooms, including access to arts, music and nature.",
                "https://www.vangreens.ca/alisha_masongsong",
            ),
        ],
    },
    304: {
        summary:
            "Suzie Mah emphasizes access to education and support for families. Her campaign also describes her record on meals and school safety.",
        platform: [
            personal(
                "Education priorities",
                "Advocate for an education system where all students can access strong educational opportunities.",
                COPE,
                "COPE — Suzie Mah",
            ),
        ],
        recordNote:
            "COPE's biography describes Mah's work on meals, school defibrillators and youth transit. These campaign claims have not been checked against board minutes.",
    },
    306: {
        summary:
            "Tasha Doucas emphasizes safe, supported students and collaboration among families, educators and the community.",
        website: "https://www.votevancouver.ca/tasha-doucas",
        platform: [
            personal(
                "Collaboration and student support",
                "Build school decisions around collaboration, accountability and partnerships with students, families and educators.",
                "https://www.votevancouver.ca/tasha-doucas",
            ),
        ],
    },
    314: {
        summary:
            "Melanie Cheng emphasizes public school land, parent participation and transparent decision-making.",
        platform: [
            personal(
                "Public land and participation",
                "Protect school land, strengthen parents' role, and improve transparency and accountability in board decisions.",
                COPE,
                "COPE — Melanie Cheng",
            ),
        ],
    },
    315: {
        summary:
            "Mandy Potter emphasizes inclusive schools, student success and a practical community perspective in board decisions.",
        website: "https://www.votevancouver.ca/mandy-potter",
        platform: [
            personal(
                "Inclusive public education",
                "Strengthen public education and support student success in schools that welcome all families.",
                "https://www.votevancouver.ca/mandy-potter",
            ),
        ],
    },
    317: {
        summary:
            "Christopher JK Richardson prioritizes disability supports, safe school buildings and stronger community connections as an independent candidate.",
        website: "https://christopherrichardson.ca/",
        platform: [
            personal(
                "Learning supports",
                "Seek timely assessments, appropriate accommodations, trained support workers and inclusion advisors. Support specialized options based on individual learning needs.",
                "https://christopherrichardson.ca/",
            ),
            personal(
                "Safe, local schools",
                "Advocate for seismic upgrades and rebuilds. Bring targeted programs into neighbourhood school clusters and provide proactive counselling.",
                "https://christopherrichardson.ca/",
            ),
            personal(
                "Community hubs",
                "Use schools for community programs and expand daycare and before- and after-school care. Seek adequate, predictable provincial funding.",
                "https://christopherrichardson.ca/",
            ),
        ],
    },
    319: {
        summary:
            "Amarys Joseph emphasizes reliable, affordable childcare and improving services through the school system.",
        website: "https://www.votevancouver.ca/amarys-joseph",
        platform: [
            personal(
                "Childcare through schools",
                "Advocate for reliable, affordable daycare and improve how childcare and education services are offered through schools.",
                "https://www.votevancouver.ca/amarys-joseph",
            ),
        ],
    },
    323: {
        summary:
            "Derrick O'Keefe prioritizes learning supports, universal meals, accessible childcare and public-benefit use of school land.",
        platform: [
            personal(
                "Meals, childcare and inclusion",
                "Seek education that supports different learning needs, universal meals, accessible childcare and public land used for community benefit.",
                COPE,
                "COPE — Derrick O'Keefe",
            ),
        ],
    },
    324: {
        summary:
            "Gwen Giesbrecht emphasizes school meals and keeping public land focused on community needs.",
        platform: [
            personal(
                "Meals and school land",
                "Support school meals for every student and use public land for community benefit rather than covering budget shortfalls.",
                COPE,
                "COPE — Gwen Giesbrecht",
            ),
        ],
    },
    330: {
        summary:
            "Julie Strilesky emphasizes transparent school decisions, community benefits from public land and collaborative leadership.",
        website: "https://www.vangreens.ca/julie_strilesky",
        platform: [
            personal(
                "Governance and public land",
                "Improve transparency in school decisions and ensure public land benefits communities.",
                "https://www.vangreens.ca/julie_strilesky",
            ),
        ],
    },
};

const PARK_PERSONAL: Record<number, Profile> = {
    203: {
        summary:
            "Cease Wyss emphasizes sustainable parks, affordable recreation and support for vulnerable residents and families.",
        platform: [
            personal(
                "Parks and recreation",
                "Support sustainable green spaces, affordable recreation and access for vulnerable residents, families and children.",
                COPE,
                "COPE — Cease Wyss",
            ),
        ],
    },
    205: {
        summary:
            "Jamie Han emphasizes cycling infrastructure and investment in parks, pools and playgrounds.",
        platform: [
            personal(
                "Recreation investment",
                "Expand cycling infrastructure and invest in parks, recreation facilities, pools and playgrounds across neighbourhoods.",
                COPE,
                "COPE — Jamie Han",
            ),
        ],
    },
};

/** Enrich only these two offices; this does not infer questionnaire stances. */
export function withBoardProfile(c: Candidate): Candidate {
    if (c.office !== "park" && c.office !== "school") return c;
    const shared = (c.office === "park" ? SHARED_PARK : SHARED_SCHOOL)[c.party];
    const survey = c.office === "park" ? SURVEYS[c.ballot] : undefined;
    const individual: Profile | undefined = survey
        ? {
              summary: survey.summary,
              website: `${SURVEY_BASE}${survey.path}`,
              platform: survey.priorities.map(([title, detail]) =>
                  personal(title, detail, `${SURVEY_BASE}${survey.path}`, "Candidate's VPSN survey response"),
              ),
          }
        : (c.office === "park" ? PARK_PERSONAL : SCHOOL_PERSONAL)[c.ballot];
    const platform = [...(individual?.platform ?? []), ...(shared?.platform ?? [])];
    if (platform.length === 0) return c;
    return {
        ...c,
        website: individual?.website ?? platform[0].sourceUrl,
        platform,
        gist: individual?.summary ?? shared!.summary,
        analysis: {
            summary: individual
                ? `${individual.summary}${shared ? ` Also runs on ${c.party}'s shared ${c.office === "park" ? "parks" : "schools"} plan, shown below.` : ""}`
                : `${shared!.summary} We have reviewed the shared commitments, rather than a separate personal platform.`,
            recordNote: individual?.recordNote,
            openQuestions: [
                ...(individual?.openQuestions ?? shared?.openQuestions ?? []),
                ...(!individual
                    ? ["Which shared commitments would this candidate prioritize personally?"]
                    : []),
                "What funding, partners and timetable would deliver these commitments?",
            ],
            reviewed: true,
            reviewedOn: "2026-10-14",
        },
    };
}
