import { Era, ComparisonItem, IconicWebsite, InternetFact } from '../types';

export const MUSEUM_ERAS: Era[] = [
  {
    id: 'era-1960s',
    year: '1960s',
    period: '1960 – 1969',
    title: 'ARPANET & The Spark of Packet Switching',
    subtitle: 'From centralized telephone lines to resilient, decentralized packet routing.',
    category: 'origins',
    shortExplanation: 'The Defense Advanced Research Projects Agency (DARPA) commissioned ARPANET to create a robust communication network that could survive node failures.',
    detailedStory: 'In the late 1960s, computing meant room-sized mainframe computers connected to dumb terminals. Researchers Paul Baran, Donald Davies, and Leonard Kleinrock theorized that breaking messages into small blocks called "packets" and routing them dynamically would prevent single points of failure. On October 29, 1969, the first ARPANET transmission took place between UCLA and Stanford Research Institute. Researcher Charley Kline attempted to type "LOGIN"—the system crashed after sending "L" and "O", making "LO" the first message ever sent across what would become the global internet.',
    interestingFact: 'The first transmitted internet message was "LO"—short for LOGIN before the UCLA Sigma 7 computer crashed on the letter "G". Within an hour, the bug was fixed and the full word was sent.',
    keyMilestones: [
      '1962: J.C.R. Licklider conceives the "Intergalactic Computer Network"',
      '1965: First packet-switched network experiment conducted',
      '1969: First Interface Message Processor (IMP) installed at UCLA',
      'Oct 29, 1969: First host-to-host transmission between UCLA & Stanford'
    ],
    relatedTechnologies: ['Packet Switching', 'Interface Message Processor (IMP)', 'Network Measurement Center', 'ASCII Standard', 'BBN Terminal'],
    pioneers: ['J.C.R. Licklider', 'Leonard Kleinrock', 'Paul Baran', 'Charley Kline', 'Larry Roberts'],
    accentColor: '#06b6d4', // Cyan
    iconName: 'Cpu',
    interactiveType: 'terminal'
  },
  {
    id: 'era-1970s',
    year: '1970s',
    period: '1970 – 1979',
    title: 'Early Networking, The @ Symbol & Ethernet',
    subtitle: 'Connecting disparate networks and inventing personal digital correspondence.',
    category: 'protocol',
    shortExplanation: 'The 1970s transformed laboratory experiments into functional networks with the invention of network email, the ubiquitous @ sign, Ethernet, and early TCP concepts.',
    detailedStory: 'In 1971, computer engineer Ray Tomlinson created SNDMSG, allowing users on different ARPANET computers to send text messages to each other. He selected the "@" sign on the Model 33 Teletype keyboard to designate "user AT host", establishing an address format that persists to this day. Meanwhile, Robert Metcalfe at Xerox PARC invented Ethernet in 1973, bringing local high-speed cabling to office computers. By 1974, Vint Cerf and Bob Kahn published the landmark paper "A Protocol for Packet Network Intercommunication", outlining the architecture of the Transmission Control Protocol.',
    interestingFact: 'Ray Tomlinson picked the "@" symbol simply because it was rarely used in computer names and conveyed the preposition "located at". He later recalled: "It seemed like a good idea at the time."',
    keyMilestones: [
      '1971: Ray Tomlinson invents ARPANET network email and introduces "@"',
      '1972: First public demonstration of ARPANET with 40 terminals in Washington D.C.',
      '1973: Bob Metcalfe invents Ethernet at Xerox PARC',
      '1974: Vint Cerf and Bob Kahn publish the foundational TCP paper',
      '1979: Usenet is established at Duke University and UNC'
    ],
    relatedTechnologies: ['Email Protocol (SNDMSG)', 'Ethernet (10BASE5)', 'ARPA Gateway', 'File Transfer Protocol (FTP)', 'Telnet (RFC 318)'],
    pioneers: ['Ray Tomlinson', 'Vint Cerf', 'Bob Kahn', 'Bob Metcalfe', 'Radia Perlman'],
    accentColor: '#3b82f6', // Blue
    iconName: 'Mail',
    interactiveType: 'packets'
  },
  {
    id: 'era-1980s',
    year: '1980s',
    period: '1980 – 1989',
    title: 'TCP/IP, The Domain Name System & NSFNET',
    subtitle: 'The birth of the official Internet architecture and human-friendly domain names.',
    category: 'protocol',
    shortExplanation: 'On January 1, 1983 ("Flag Day"), ARPANET officially migrated all nodes to TCP/IP. The Domain Name System (DNS) replaced unwieldy numeric address books with dot-coms.',
    detailedStory: 'Prior to DNS, every host on the ARPANET had to be manually recorded in a centralized text file called HOSTS.TXT maintained by Elizabeth Feinler at the Stanford Network Information Center. As connections skyrocketed, this became impossible to maintain. In 1983, Paul Mockapetris invented the Domain Name System (DNS), introducing hierarchical domains (.com, .org, .edu, .gov). The National Science Foundation established NSFNET in 1985, creating a high-speed backbone connecting supercomputing centers across the United States and laying the commercial groundwork for the open Internet.',
    interestingFact: 'The very first .com domain name ever registered in history was "symbolics.com" on March 15, 1985, by the Symbolics Computer Corporation in Massachusetts.',
    keyMilestones: [
      'Jan 1, 1983: Flag Day—ARPANET adopts TCP/IP as its official standard',
      '1983: Paul Mockapetris creates the Domain Name System (DNS)',
      '1985: symbolics.com registered as the first commercial domain',
      '1986: NSFNET backbone created with 56 kbps links',
      '1988: The Morris Worm strikes, causing the first major global internet outage'
    ],
    relatedTechnologies: ['TCP/IP v4', 'DNS (Domain Name System)', 'NSFNET Backbone', 'Internet Relay Chat (IRC)', 'SMTP (RFC 821)'],
    pioneers: ['Paul Mockapetris', 'Elizabeth Feinler', 'Jon Postel', 'David Mills', 'Robert Tappan Morris'],
    accentColor: '#8b5cf6', // Violet
    iconName: 'Globe',
    interactiveType: 'dns'
  },
  {
    id: 'era-1990s',
    year: '1990s',
    period: '1990 – 1999',
    title: 'The World Wide Web & Dot-Com Explosion',
    subtitle: 'Tim Berners-Lee invents HTML, web browsers arrive, and the web goes public.',
    category: 'web',
    shortExplanation: 'While working at CERN in 1989-1990, Sir Tim Berners-Lee invented HTML, HTTP, and URLs. Graphical browsers like Mosaic and Netscape brought the web to homes worldwide.',
    detailedStory: 'Before 1990, navigating the internet required command-line knowledge of FTP, Gopher, and Usenet. Sir Tim Berners-Lee envisioned a universal information space where hyperlinked documents could be shared across any computer platform. Using a black NeXTcube computer at CERN, he authored the first web server, client browser, and the HTML language. In 1993, CERN released the source code of the World Wide Web into the public domain with no royalties. Marc Andreessen and Eric Bina created the Mosaic browser in 1993, which soon spawned Netscape Navigator, ushering in the golden dot-com boom.',
    interestingFact: 'The sticker on Tim Berners-Lee’s NeXTcube computer warned colleagues: "This machine is a server. DO NOT POWER IT DOWN!" Turning it off would have taken down the entire World Wide Web.',
    keyMilestones: [
      '1990: Tim Berners-Lee writes WorldWideWeb on a NeXTcube at CERN',
      '1991: The first public website goes live (info.cern.ch)',
      '1993: CERN places the Web in the public domain for all humanity',
      '1994: Netscape Navigator launches; Yahoo! is founded',
      '1995: Amazon sells its first book; eBay launches as AuctionWeb',
      '1998: Google is incorporated in a Menlo Park garage'
    ],
    relatedTechnologies: ['HTML 1.0 & 2.0', 'HTTP Protocol', 'URLs / URIs', 'Mosaic & Netscape', 'JavaScript (invented 1995 by Brendan Eich)', 'CSS (invented 1996)'],
    pioneers: ['Sir Tim Berners-Lee', 'Marc Andreessen', 'Brendan Eich', 'Håkon Wium Lie', 'Jerry Yang'],
    accentColor: '#ec4899', // Pink
    iconName: 'Layout',
    interactiveType: 'html'
  },
  {
    id: 'era-2000s',
    year: '2000s',
    period: '2000 – 2009',
    title: 'Web 2.0, Social Networks & Broadband',
    subtitle: 'From passive brochure-ware to interactive user-generated digital communities.',
    category: 'social',
    shortExplanation: 'Broadband replaced screeching 56k dial-up modems. Platforms shifted from static read-only websites to dynamic, interactive applications powered by user-generated content.',
    detailedStory: 'Following the dot-com crash of 2000-2001, a resilient and participatory internet emerged under the banner of "Web 2.0". Technologies like AJAX enabled seamless in-page updates without reloading the entire screen. Suddenly, every visitor became a creator. Wikipedia launched in 2001, democratizing universal knowledge. MySpace and Facebook reimagined social bonds, while YouTube (2005) democratized video publishing, transforming everyday internet users into global broadcasters.',
    interestingFact: 'The first video ever uploaded to YouTube was titled "Me at the zoo", uploaded by co-founder Jawed Karim on April 23, 2005. It was only 19 seconds long and filmed in front of elephants.',
    keyMilestones: [
      '2001: Wikipedia is launched by Jimmy Wales and Larry Sanger',
      '2003: MySpace launches, quickly becoming the cultural epicentre of music',
      '2004: Mark Zuckerberg launches "TheFacebook" from Harvard dorm room',
      '2005: YouTube founded; "Me at the zoo" is published',
      '2006: Twitter launches with the famous "just setting up my twttr" tweet',
      '2007: Apple introduces the original iPhone, igniting mobile browsing'
    ],
    relatedTechnologies: ['AJAX (Asynchronous JavaScript & XML)', 'RSS Feeds', 'Flash Player', 'REST APIs', 'DSL & Cable Broadband', 'Cloud Infrastructure (AWS launched 2006)'],
    pioneers: ['Jimmy Wales', 'Mark Zuckerberg', 'Chad Hurley & Steve Chen', 'Jack Dorsey', 'Tim O’Reilly'],
    accentColor: '#10b981', // Emerald
    iconName: 'Users',
    interactiveType: 'web2'
  },
  {
    id: 'era-2010s',
    year: '2010s',
    period: '2010 – 2019',
    title: 'Smartphones, 4G LTE & The Streaming Cloud',
    subtitle: 'The internet leaves the desktop and enters our pockets 24 hours a day.',
    category: 'mobile',
    shortExplanation: 'The proliferation of 4G LTE and touch smartphones turned the internet into an always-on ambient fabric powering ridesharing, instant photo-sharing, and streaming.',
    detailedStory: 'The 2010s marked the great migration from desktops to pocket supercomputers. High-speed 4G LTE networks, GPS chips, and high-resolution cameras in smartphones enabled entirely new industries: ridesharing (Uber, Lyft), instant visual sharing (Instagram, Snapchat), and on-demand streaming (Netflix, Spotify). Cloud giants Amazon AWS, Microsoft Azure, and Google Cloud became the invisible infrastructure underpinning the entire global economy. By 2016, mobile web traffic officially surpassed desktop traffic globally.',
    interestingFact: 'In 2010, worldwide mobile data traffic was estimated at 0.2 exabytes per month. By 2019, it surged past 32 exabytes per month—a mind-boggling 160x increase within a single decade.',
    keyMilestones: [
      '2010: Instagram launches on iOS; 4G networks begin global deployment',
      '2012: Facebook reaches 1 Billion active users and acquires Instagram',
      '2014: HTML5 finalized as a W3C recommendation, deprecating Flash',
      '2016: Mobile internet usage surpasses desktop internet usage worldwide',
      '2017: TikTok launches internationally, pioneering algorithm-driven short video',
      '2018: Global internet population officially surpasses 4 Billion people'
    ],
    relatedTechnologies: ['4G LTE & VoLTE', 'Responsive Web Design (CSS3 Media Queries)', 'Single Page Applications (React, Vue)', 'GraphQL', 'Docker & Kubernetes', 'WebRTC'],
    pioneers: ['Kevin Systrom', 'Zhang Yiming', 'Reed Hastings', 'Satya Nadella', 'Guido van Rossum'],
    accentColor: '#f59e0b', // Amber
    iconName: 'Smartphone',
    interactiveType: 'mobile'
  },
  {
    id: 'era-2020s',
    year: '2020s',
    period: '2020 – Present',
    title: 'The AI Era, 5G & Synthetic Intelligence',
    subtitle: 'From retrieving pre-written information to generating thoughts, answers, and code in real time.',
    category: 'ai',
    shortExplanation: 'The modern web has evolved from indexation to generation. Large Language Models, generative AI, edge computing, and real-time synthesis are redefining human-computer interaction.',
    detailedStory: 'The 2020s catalyzed unprecedented transformation. The global lockdowns accelerated cloud workflows, telemedicine, and remote collaboration. In late 2022, the launch of ChatGPT and subsequent breakthrough multimodal systems fundamentally shifted how humans interface with digital information. Rather than clicking through ten blue search result links, users now converse with reasoning models that read, write, summarize, generate code, and produce synthetic media in milliseconds. The internet is no longer merely an archive of human text; it is an active cognitive workspace.',
    interestingFact: 'ChatGPT reached 100 million active monthly users within just 2 months of launch in 2022—making it the fastest-growing consumer internet application in recorded history.',
    keyMilestones: [
      '2020: 5G rollouts accelerate; remote work tools see 1000% surges during pandemic',
      '2022: OpenAI launches ChatGPT; generative AI reaches the mass consumer market',
      '2023: Multimodal frontier models process text, audio, images, and video natively',
      '2024: WebAssembly, WebGPU, and client-side browser AI deliver localized neural networks',
      '2025-2026: Agentic workflows, autonomous code synthesis, and spatial computing redefine the digital frontier'
    ],
    relatedTechnologies: ['Large Language Models (LLMs)', 'WebGPU & Browser Inference', 'HTTP/3 & QUIC', 'Edge Compute & Serverless', 'Generative Diffusion Models', 'Decentralized Identity'],
    pioneers: ['Sam Altman', 'Demis Hassabis', 'Ilya Sutskever', 'Jensen Huang', 'Fei-Fei Li'],
    accentColor: '#6366f1', // Indigo/Neon Purple
    iconName: 'Sparkles',
    interactiveType: 'neural'
  }
];

export const THEN_VS_NOW: ComparisonItem[] = [
  {
    id: 'comp-1',
    category: 'Web Experience',
    title: 'Early Web vs. Modern Web',
    then: {
      title: 'Early Web (1991–1996)',
      era: '1990s',
      speedOrStat: 'Plain text & grey background',
      description: 'Static, read-only pages with Times New Roman font, default blue hyperlinks, and HTML <table> layouts. No CSS, no responsive layouts, no client scripts.',
      visualDetail: '<table bgcolor="#C0C0C0"><tr><td><font face="Times">WELCOME TO MY HOMEPAGE</font></td></tr></table>',
      icon: 'FileCode'
    },
    now: {
      title: 'Modern Web (2020s)',
      era: '2020s',
      speedOrStat: 'Fluid 3D, WebGL & 60 FPS',
      description: 'Real-time collaborative applications with hardware-accelerated 3D graphics, fluid animations, instant state syncing, and localized machine learning.',
      visualDetail: 'const canvas = createWebGPURenderer({ pbrShading: true, multiSampling: 4 });',
      icon: 'Layers'
    },
    impactHighlight: 'Websites transformed from digital flyers into software engines as powerful as native operating system software.'
  },
  {
    id: 'comp-2',
    category: 'Connectivity',
    title: 'Dial-up vs. Fiber / 5G',
    then: {
      title: 'Dial-up Modem',
      era: '1995',
      speedOrStat: '56 kbps (0.056 Mbps)',
      description: 'Connected over copper landlines with ear-piercing frequency handshake tones. Downloading a single 3-megabyte MP3 took 25 to 45 minutes; incoming calls disconnected the web.',
      visualDetail: 'ATDT 555-0199 ... *screeech-ksshhh-ding-ding* ... CONNECT 56000',
      icon: 'PhoneCall'
    },
    now: {
      title: 'Gigabit Fiber & 5G',
      era: 'Today',
      speedOrStat: '1,000+ Mbps (<5ms latency)',
      description: 'Glass fiber optics shooting photons around the planet and low-latency millimeter waves. A 4K movie downloads in under 30 seconds with millions of simultaneous streams.',
      visualDetail: 'Ping: 2ms | Download: 1,240 Mbps | Upload: 980 Mbps | Jitter: 0.4ms',
      icon: 'Zap'
    },
    impactHighlight: 'Bandwidth multiplied by over 20,000x, turning the internet into an imperceptible, always-on utility like oxygen.'
  },
  {
    id: 'comp-3',
    category: 'Architecture',
    title: 'Static Websites vs. Web Applications',
    then: {
      title: 'Static Webpages',
      era: '1990s - 2000s',
      speedOrStat: 'Full-page reloads on every click',
      description: 'Hardcoded .html files saved on an Apache server. Editing content required downloading files via FTP, editing in Notepad, and re-uploading. Zero user collaboration.',
      visualDetail: 'ftp://ftp.geocities.com/neighborhoods/siliconvalley/upload index.html',
      icon: 'Monitor'
    },
    now: {
      title: 'Reactive Web Applications',
      era: 'Today',
      speedOrStat: 'Zero-reload instant state syncing',
      description: 'Distributed cloud backends with WebSockets, optimistic UI updates, multi-user multiplayer cursors (Figma, Google Docs), and offline-first service workers.',
      visualDetail: 'presenceChannel.broadcast({ cursor: [x, y], change: deltaCRDT });',
      icon: 'Cloud'
    },
    impactHighlight: 'The browser became the universal OS where millions collaborate on high-stakes designs, spreadsheets, and video production.'
  },
  {
    id: 'comp-4',
    category: 'Information Discovery',
    title: 'Search Engines vs. AI Assistants',
    then: {
      title: 'Directory & Keyword Search',
      era: '1994 - 2010',
      speedOrStat: '10 Blue Links & Exact Keyword Match',
      description: 'Directories curated by hand (like early Yahoo!) or crawler indexing matching exact strings. Users had to open dozens of tabs, read through articles, and synthesize answers manually.',
      visualDetail: 'Query: "define packet switching 1969" -> Found 14,200 results (0.42 seconds)',
      icon: 'Search'
    },
    now: {
      title: 'Reasoning AI Assistants',
      era: 'Today',
      speedOrStat: 'Direct synthesized answers & code',
      description: 'Context-aware multimodal neural networks that read research papers, compare historical documents, write and debug software, explain complex analogies, and reason across languages.',
      visualDetail: 'Assistant: "Here is a breakdown of packet switching with an interactive diagram..."',
      icon: 'Bot'
    },
    impactHighlight: 'Search changed from finding where information resides to synthesizing and explaining the exact solution on demand.'
  },
  {
    id: 'comp-5',
    category: 'Device & Mobility',
    title: 'Desktop Internet vs. Mobile Ubiquity',
    then: {
      title: 'Tethered CRT Desktops',
      era: '1990s',
      speedOrStat: 'Fixed at heavy physical desks',
      description: 'Beige desktop computer towers weighing 30 lbs with bulky cathode-ray tube monitors. Internet was an intentional destination you "logged on" to for 30 minutes in the evening.',
      visualDetail: '15" CRT monitor, 640x480 resolution, 256 colors, heavy grey tower',
      icon: 'HardDrive'
    },
    now: {
      title: 'Pocket Supercomputers & IoT',
      era: 'Today',
      speedOrStat: 'Always-on 24/7 global connection',
      description: 'Thin glass slabs with 120Hz OLED displays, neural engines, satellite emergency links, smartwatch biometrics, and billions of ambient smart sensors seamlessly woven into society.',
      visualDetail: '6.7" OLED, 120Hz ProMotion, 3nm Bionic Chip, 5G Ultra Wideband, GPS',
      icon: 'TabletSmartphone'
    },
    impactHighlight: 'We no longer "go online"—we live inside the network, carrying the sum of human knowledge in our pockets.'
  }
];

export const ICONIC_WEBSITES: IconicWebsite[] = [
  {
    id: 'site-google',
    name: 'Google',
    launchYear: 1998,
    originalPurpose: 'A minimalist academic search engine born at Stanford that ranked pages based on citation backlinks (the PageRank algorithm).',
    evolution: 'Evolved from a search box into the largest advertising platform, creator of Android, Chrome, YouTube parent, and leading AI research powerhouse.',
    currentRole: 'Processes over 8.5 billion searches per day; underpins modern mobile computing, enterprise cloud, and multimodal intelligence.',
    category: 'Search',
    accentColor: '#38bdf8',
    iconSymbol: 'G',
    trafficStat: '8.5B+ searches per day',
    funFact: 'In 1999, Google founders Sergey Brin and Larry Page tried to sell Google to Excite for $750,000. Excite CEO rejected the offer.'
  },
  {
    id: 'site-youtube',
    name: 'YouTube',
    launchYear: 2005,
    originalPurpose: 'A video dating and casual video-sharing platform created by three former PayPal employees to easily share home video clips.',
    evolution: 'Quickly shed its dating concept to become the universal repository for all video: tutorials, music, news, documentaries, and internet culture.',
    currentRole: 'The world’s second most visited website; over 500 hours of video are uploaded every single minute.',
    category: 'Video',
    accentColor: '#ef4444',
    iconSymbol: 'YT',
    trafficStat: '2.5B+ monthly active users',
    funFact: 'YouTube co-founders registered the domain on Valentine’s Day, February 14, 2005. It was purchased by Google 18 months later for $1.65 Billion.'
  },
  {
    id: 'site-wikipedia',
    name: 'Wikipedia',
    launchYear: 2001,
    originalPurpose: 'An open-source experiment to supplement Nupedia, an online encyclopedia written exclusively by vetted academic experts with a slow peer-review process.',
    evolution: 'Crowdsourced by volunteer editors worldwide using Wiki software, it quickly outpaced every commercial encyclopedia including Encarta and Britannica.',
    currentRole: 'The largest non-profit repository of human knowledge in history, with over 62 million articles across 330 languages, completely free of ads.',
    category: 'Knowledge',
    accentColor: '#94a3b8',
    iconSymbol: 'W',
    trafficStat: '15B+ pageviews per month',
    funFact: 'If printed into standard encyclopedia volumes, the English Wikipedia alone would fill more than 3,200 large hardcover books.'
  },
  {
    id: 'site-facebook',
    name: 'Facebook',
    launchYear: 2004,
    originalPurpose: 'A closed directory for Harvard University students to find classmates, check relationship statuses, and post on a shared "Wall".',
    evolution: 'Expanded to all universities, high schools, and eventually the entire world; acquired Instagram and WhatsApp to become Meta.',
    currentRole: 'Connects more than 3 billion people monthly; acts as the primary identity layer and social fabric across multiple continents.',
    category: 'Social',
    accentColor: '#2563eb',
    iconSymbol: 'f',
    trafficStat: '3.0B+ monthly active users',
    funFact: 'Al Pacino’s face was subtly hidden in the original Facebook header logo back when the service was named "TheFacebook" in 2004.'
  },
  {
    id: 'site-amazon',
    name: 'Amazon',
    launchYear: 1994,
    originalPurpose: 'An online storefront operated from a Bellevue garage branded as "Earth’s Biggest Bookstore", offering millions of book titles.',
    evolution: 'Diversified into electronics, media, cloud computing (Amazon Web Services), digital streaming, and automated robotics logistics.',
    currentRole: 'Powers the infrastructure of the internet via AWS (which hosts a third of top web apps) and handles over 40% of US e-commerce.',
    category: 'Commerce',
    accentColor: '#f59e0b',
    iconSymbol: 'A',
    trafficStat: '$575B+ annual net sales',
    funFact: 'Jeff Bezos originally wanted to name the company "Cadabra" (as in Abracadabra), but his lawyer misheard it as "Cadaver".'
  },
  {
    id: 'site-myspace',
    name: 'MySpace',
    launchYear: 2003,
    originalPurpose: 'A customizable social networking site where users could build personal profiles with custom HTML/CSS and autoplaying songs.',
    evolution: 'Became the most visited website in the United States in 2006, surpassing Google, and launched careers for musicians like Lily Allen and Calvin Harris.',
    currentRole: 'An iconic cultural nostalgia monument that taught an entire generation of teenagers how to write basic HTML and CSS code.',
    category: 'Social',
    accentColor: '#0ea5e9',
    iconSymbol: 'MS',
    trafficStat: 'Peak: 100M+ active users (2007)',
    funFact: 'Every new MySpace user automatically had co-founder "Tom" (Tom Anderson) as their very first friend, making him an internet icon.'
  },
  {
    id: 'site-yahoo',
    name: 'Yahoo!',
    launchYear: 1994,
    originalPurpose: '"Jerry and David’s Guide to the World Wide Web"—a hierarchical directory of cool websites manually cataloged by two Stanford PhD students.',
    evolution: 'Grew into the supreme web portal of the late 1990s featuring Yahoo! Mail, Messenger, Finance, Sports, and Games.',
    currentRole: 'Still a high-traffic news and finance media portal; played a seminal role in commercializing the early consumer internet.',
    category: 'Portal',
    accentColor: '#a855f7',
    iconSymbol: 'Y!',
    trafficStat: '700M+ monthly visitors to news/finance',
    funFact: 'The name "Yahoo" was an acronym for "Yet Another Hierarchical Officious Oracle", inspired by the uncivilized Yahoos in Gulliver’s Travels.'
  }
];

export const INTERNET_FACTS: InternetFact[] = [
  {
    id: 1,
    title: 'The Unprecedented Scale of the Web',
    fact: 'More than 1.13 billion websites exist on the internet today, though only about 200 million of them are actively maintained.',
    category: 'Global Traffic',
    sourceHint: 'Netcraft Web Server Survey'
  },
  {
    id: 2,
    title: 'The First Real Message',
    fact: 'The first message ever sent on the internet was "LO" on October 29, 1969. The programmer was trying to type "LOGIN", but the computer crashed on the letter G.',
    category: 'History',
    sourceHint: 'UCLA Kleinrock Lab Records',
    yearContext: '1969'
  },
  {
    id: 3,
    title: 'Subsea Cable Superhighways',
    fact: 'Over 99% of international internet data travels not through satellites, but through more than 550 fiber-optic cables resting on the ocean floor.',
    category: 'Hardware',
    sourceHint: 'TeleGeography Submarine Cable Map'
  },
  {
    id: 4,
    title: 'Email That Launched a Convention',
    fact: 'Computer programmer Ray Tomlinson chose the "@" symbol in 1971 simply because it was an infrequently used character on the Teletype keyboard.',
    category: 'History',
    sourceHint: 'RFC Archive',
    yearContext: '1971'
  },
  {
    id: 5,
    title: 'The Webcam Was Invented for Coffee',
    fact: 'The world’s first live webcam was built at Cambridge University in 1991 for one purpose: to check if the Trojan Room coffee pot was empty without walking down the hall.',
    category: 'Culture',
    sourceHint: 'Cambridge Computer Laboratory',
    yearContext: '1991'
  },
  {
    id: 6,
    title: 'The First Commercial Dot-Com',
    fact: 'The very first .com domain name ever registered was symbolics.com on March 15, 1985, by Symbolics Inc., a computer manufacturer.',
    category: 'Milestone',
    sourceHint: 'VeriSign Domain History',
    yearContext: '1985'
  },
  {
    id: 7,
    title: 'The Weight of the Entire Internet',
    fact: 'Physicist Russell Seitz calculated that all the moving electrons that make up the active data in the global internet weigh approximately 50 grams—roughly the weight of a strawberry.',
    category: 'Hardware',
    sourceHint: 'Discover Magazine Physics Study'
  },
  {
    id: 8,
    title: 'The First Item Sold Online',
    fact: 'Depending on the definition, Stanford students used ARPANET to arrange a cannabis transaction with MIT students in 1972, making it the unofficial first online commercial sale.',
    category: 'History',
    sourceHint: 'What the Dormouse Said (John Markoff)',
    yearContext: '1972'
  },
  {
    id: 9,
    title: 'The First Banner Ad Click-Through',
    fact: 'The first clickable banner ad was launched on HotWired in 1994 by AT&T. It read: "Have you ever clicked your mouse right here? You will." It achieved an astonishing 44% click rate.',
    category: 'Culture',
    sourceHint: 'Wired Archive',
    yearContext: '1994'
  },
  {
    id: 10,
    title: 'Google’s Original Name',
    fact: 'Before choosing the name Google (a misspelling of "Googol", the number 1 followed by 100 zeros), Larry Page and Sergey Brin called their search engine "BackRub".',
    category: 'History',
    sourceHint: 'Stanford Computer Science Department',
    yearContext: '1996'
  },
  {
    id: 11,
    title: 'The Staggering Pace of Video',
    fact: 'More than 500 hours of video are uploaded to YouTube every minute of every day. To watch all videos uploaded in a single day would take you more than 80 years without sleeping.',
    category: 'Global Traffic',
    sourceHint: 'YouTube Platform Statistics'
  },
  {
    id: 12,
    title: 'CERN Gave the Web Away for Free',
    fact: 'On April 30, 1993, CERN issued a formal legal document placing the World Wide Web technology into the public domain royalty-free forever, enabling the explosion of modern society.',
    category: 'Milestone',
    sourceHint: 'CERN Historical Archives',
    yearContext: '1993'
  },
  {
    id: 13,
    title: 'The First Recorded Spam Email',
    fact: 'On May 3, 1978, Gary Thuerk sent an unsolicited marketing email to 393 ARPANET users promoting DEC computers. It provoked widespread outrage and created the concept of spam.',
    category: 'Culture',
    sourceHint: 'Computer History Museum',
    yearContext: '1978'
  },
  {
    id: 14,
    title: 'Global Connected Humans',
    fact: 'As of 2026, approximately 5.5 billion people use the internet—representing over 68% of the entire human species on Earth.',
    category: 'Global Traffic',
    sourceHint: 'International Telecommunication Union (ITU)'
  },
  {
    id: 15,
    title: 'JavaScript Was Created in 10 Days',
    fact: 'Brendan Eich created Mocha—which became LiveScript and then JavaScript—in just 10 days in May 1995 while working for Netscape Communications.',
    category: 'History',
    sourceHint: 'Computer History Museum Oral History',
    yearContext: '1995'
  }
];

export const MUSEUM_STATS = [
  { label: 'Historical Eras', value: '7 Eras', detail: '1960s to Present AI' },
  { label: 'Global Net Users', value: '5.5B+', detail: '68% of world population' },
  { label: 'Undersea Cables', value: '550+', detail: '1.4M kilometers of glass' },
  { label: 'Websites Online', value: '1.1B+', detail: 'From 1 site in 1991' }
];
