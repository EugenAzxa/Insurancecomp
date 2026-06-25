export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;        // ISO
  dateLabel: string;   // human
  readMins: number;
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "how-much-does-a-funeral-cost",
    title: "How Much Does a Funeral Actually Cost in 2026?",
    excerpt:
      "The real numbers behind funerals today — what drives the price, where the surprises hide, and how families can avoid a five-figure bill in their hardest week.",
    category: "Planning",
    date: "2026-06-01",
    dateLabel: "June 1, 2026",
    readMins: 6,
    body: [
      { type: "p", text: "A funeral is one of the largest expenses most families will ever face on the shortest notice. The average cost now sits between $9,000 and $15,000 once every line item is added up — and it is almost always due within days." },
      { type: "h2", text: "Where the money goes" },
      { type: "p", text: "The headline price of a casket or cremation is only the beginning. Families are routinely surprised by the supporting costs that stack on top." },
      { type: "ul", items: [
        "Funeral home service fee — often $2,000–$3,500 on its own",
        "Casket or urn — anywhere from $1,000 to $10,000+",
        "Transportation and transfer of the body",
        "Cemetery plot, opening and closing, and a headstone",
        "Death certificates, permits, and filing fees",
        "The memorial: venue, flowers, catering, printing, livestream",
      ] },
      { type: "h2", text: "Why it hits so hard" },
      { type: "p", text: "Unlike most big purchases, a funeral is bought under grief and time pressure. There is rarely time to compare providers, and few people know what is optional versus required. That combination is exactly why costs balloon." },
      { type: "quote", text: "The worst time to make a five-figure financial decision is the week you lose someone you love." },
      { type: "h2", text: "Planning ahead changes everything" },
      { type: "p", text: "When choices are made calmly in advance — cremation or burial, the kind of service, who to call — the family is left to grieve instead of negotiate. That is the entire reason end-of-life planning exists: to move the decisions, and the cost, off the worst week of someone's life." },
    ],
  },
  {
    slug: "cremation-vs-burial-vs-aquamation",
    title: "Cremation vs. Burial vs. Aquamation: A Simple Guide",
    excerpt:
      "Four common ways to be laid to rest, what each one means, and the questions worth asking before you decide.",
    category: "Guides",
    date: "2026-05-20",
    dateLabel: "May 20, 2026",
    readMins: 5,
    body: [
      { type: "p", text: "There is no single right way to say goodbye. The best choice is the one that reflects your beliefs, your family, and your wishes. Here is a plain-language look at the most common options." },
      { type: "h2", text: "Traditional burial" },
      { type: "p", text: "The body is prepared, placed in a casket, and buried in a cemetery plot. It is familiar, supports a graveside gathering, and gives families a physical place to return to. It is also typically the most expensive option once the plot, vault, and headstone are included." },
      { type: "h2", text: "Cremation" },
      { type: "p", text: "The body is reduced to ashes, which are returned to the family to keep, scatter, or inter. Cremation is flexible and generally more affordable, and it can still be paired with a full memorial service." },
      { type: "h2", text: "Green burial" },
      { type: "p", text: "A natural burial with no embalming chemicals, in a biodegradable shroud or casket, often in a dedicated conservation ground. It appeals to those who want the simplest, most earth-friendly farewell." },
      { type: "h2", text: "Aquamation" },
      { type: "p", text: "Also called water cremation, aquamation uses water and alkalinity instead of flame. It uses far less energy than fire cremation and is gaining popularity as a gentle, low-impact choice." },
      { type: "h2", text: "Questions worth asking" },
      { type: "ul", items: [
        "Does my faith or tradition guide this decision?",
        "Do I want a place my family can visit?",
        "How important is environmental impact to me?",
        "What feels right for the people I'm leaving behind?",
      ] },
    ],
  },
  {
    slug: "best-age-to-plan-ahead",
    title: "Why Your 30s and 40s Are the Best Time to Plan Ahead",
    excerpt:
      "Planning for the end of life isn't morbid — it's one of the most considerate things you can do for the people you love. And starting young costs less.",
    category: "Planning",
    date: "2026-05-08",
    dateLabel: "May 8, 2026",
    readMins: 4,
    body: [
      { type: "p", text: "Most people assume end-of-life planning is something to think about \"later.\" But the math, and the peace of mind, both favor starting sooner." },
      { type: "h2", text: "Locking in a lower rate" },
      { type: "p", text: "Coverage is priced by age. The younger and healthier you are when you start, the lower your rate — and a good plan locks that rate for life. Someone who starts at 32 keeps that 32-year-old rate decades later." },
      { type: "h2", text: "Sparing your family the scramble" },
      { type: "p", text: "When your wishes are documented and your arrangements are pre-decided, your family isn't left guessing during the hardest week of their lives. They simply follow the plan you left them." },
      { type: "quote", text: "Planning ahead isn't about expecting the worst. It's about making sure the people you love never have to improvise." },
      { type: "h2", text: "It's easier than you think" },
      { type: "p", text: "Modern end-of-life planning takes minutes, not appointments. No medical exam, no agent at your kitchen table — just a few clear choices saved in a secure profile you can update anytime." },
    ],
  },
  {
    slug: "what-to-put-in-your-end-of-life-profile",
    title: "What to Put in Your End-of-Life Profile",
    excerpt:
      "A simple checklist of the choices and documents that make everything easier for your family — and that you can set once and forget.",
    category: "Guides",
    date: "2026-04-22",
    dateLabel: "April 22, 2026",
    readMins: 5,
    body: [
      { type: "p", text: "A complete end-of-life profile is a gift to your family: every important decision in one place, so nothing has to be guessed. Here is what belongs in it." },
      { type: "h2", text: "Your funeral wishes" },
      { type: "ul", items: [
        "Cremation, burial, green burial, or aquamation",
        "The kind of service you want — or none at all",
        "Music, readings, or traditions that matter to you",
        "Whether you'd like the memorial live-streamed",
      ] },
      { type: "h2", text: "Your legal preferences" },
      { type: "ul", items: [
        "A will naming who receives what",
        "Power of attorney and an advance directive",
        "Where key documents are stored",
        "Your chosen beneficiary and their contact details",
      ] },
      { type: "h2", text: "Practical details" },
      { type: "ul", items: [
        "Who to notify first",
        "Accounts and subscriptions to close",
        "Any transportation or repatriation needs",
        "A personal message to the people you love",
      ] },
      { type: "p", text: "The point isn't to fill out everything at once. Start with the choices you're sure of, save them securely, and refine over time. A little done today saves your family a great deal tomorrow." },
    ],
  },
  {
    slug: "talking-to-family-about-death",
    title: "A Gentle Guide to Talking to Your Family About Death",
    excerpt:
      "It's the conversation everyone avoids — and the one that brings the most relief once it's had. Here's how to start it with warmth.",
    category: "Family",
    date: "2026-04-05",
    dateLabel: "April 5, 2026",
    readMins: 4,
    body: [
      { type: "p", text: "Talking about death feels heavy until you do it — and then most families describe it as one of the most connecting conversations they've ever had. The trick is to make it about care, not fear." },
      { type: "h2", text: "Pick a calm, ordinary moment" },
      { type: "p", text: "You don't need a somber sit-down. A walk, a drive, or a quiet evening works better. Low pressure invites honesty." },
      { type: "h2", text: "Lead with love, not logistics" },
      { type: "p", text: "Start with why it matters: \"I want to make sure you're never left guessing.\" When the framing is protection, the conversation softens immediately." },
      { type: "h2", text: "Keep it small and ongoing" },
      { type: "p", text: "You don't have to cover everything in one talk. Share one wish, ask one question, and let it become a normal, returning conversation rather than a single difficult event." },
      { type: "quote", text: "The families who talk about it early are the ones who grieve without regret later." },
    ],
  },
  {
    slug: "green-burials-explained",
    title: "Green Burials Explained: Eco-Friendly End-of-Life Options",
    excerpt:
      "For those who want their final act to be gentle on the planet, here's how natural burial and water cremation actually work.",
    category: "Guides",
    date: "2026-03-18",
    dateLabel: "March 18, 2026",
    readMins: 5,
    body: [
      { type: "p", text: "More people are asking for a farewell that reflects how they lived — lightly on the earth. Eco-friendly options have grown from a niche request into a mainstream choice." },
      { type: "h2", text: "What makes a burial \"green\"" },
      { type: "p", text: "Green burial skips embalming chemicals, metal caskets, and concrete vaults. The body is laid to rest in a biodegradable shroud or simple wooden casket, allowing a natural return to the soil." },
      { type: "h2", text: "Water cremation (aquamation)" },
      { type: "p", text: "Aquamation uses water and alkali instead of flame. It uses roughly a tenth of the energy of flame cremation and produces no direct emissions, while still returning ashes to the family." },
      { type: "h2", text: "Is it right for you?" },
      { type: "ul", items: [
        "You value a low environmental footprint",
        "You prefer simplicity over ceremony",
        "You want a natural setting for your resting place",
      ] },
      { type: "p", text: "Whatever you choose, the most important thing is that it's documented. A wish only helps your family if they know about it — which is exactly what a secure end-of-life profile is for." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
