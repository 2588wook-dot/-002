import { Project } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Villa Solitaire",
    description: "A monolithic concrete residence perched gracefully on coastal cliffs. Designed to dissolve boundaries between nature and inhabitant, it features expansive glazing, raw concrete finishes, and a seamless visual connection to the marine horizon.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 1
  },
  {
    id: "p2",
    title: "Forest Observatory",
    description: "A dark-stained cedar pavilion hidden in old-growth pine forests. Built on a elevated timber structure to minimize ecological disruption, the observatory acts as a quiet sanctuary for star-gazing and forest meditation.",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 2
  },
  {
    id: "p3",
    title: "Brutalist Atelier",
    description: "An artist's studio characterized by board-formed concrete and soaring double-height volumes. Flooded with nord-oriented light, the space is designed to foster unfiltered creativity in an atmosphere of radical silence.",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 3
  },
  {
    id: "p4",
    title: "Nordic Conservatory",
    description: "A bright glass and pale-ash retreat situated along the shores of Sweden. Focusing on thermal craftsmanship and passive heating, it offers year-round comfort with stunning, uninterrupted views of the changing seasons.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 4
  },
  {
    id: "p5",
    title: "Aesop Inspired Gallery",
    description: "A luxury retail concept emphasizing raw elements and mineral plaster walls. Inspired by ancient micro-cement systems, it features smooth curved monoliths, brass detailing, and curated soft downlighting.",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 5
  },
  {
    id: "p6",
    title: "Terrazzo Espresso Bar",
    description: "A modernist cafe combining custom pink-aggregate terrazzo slabs with brushed aluminum furniture. The design maximizes limited indoor area through clever built-in seating and high-contrast geometrical lines.",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 6
  },
  {
    id: "p7",
    title: "Kiyomizu Townhouse",
    description: "A deeply respectful restoration of a historic wooden townhouse in Kyoto. Marrying traditional cedar screen details with modernist structural reinforcement, it creates a peaceful interior courtyard.",
    coverImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 7
  },
  {
    id: "p8",
    title: "Modernist Waterfront",
    description: "A luxury beach pavilion celebrating linear architecture and horizontal plane structures. A massive cantilevered flat roof keeps the glass facade shaded from direct noon heat while framing clean ocean vistas.",
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 8
  },
  {
    id: "p9",
    title: "Desert Palms Villa",
    description: "An elegant sand-hued low-profile villa integrated seamlessly into the desert rocks of Palm Springs. It prioritizes passive ventilation, natural light, and an expansive courtyard centered around a lone palm tree.",
    coverImage: "https://images.unsplash.com/photo-1541123437800-1bb1317babca?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317babca?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 9
  },
  {
    id: "p10",
    title: "Stone Arch Courtyard",
    description: "A modern home built on the ruins of a historic limestone estate. Blending historical stone arched openings with sharp carbon-black steel frames, it symbolizes the contrast of past and future.",
    coverImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 10
  },
  {
    id: "p11",
    title: "Minimal Solid Oak Kitchen",
    description: "A culinary studio where appliances disappear into hidden seamless oak panels. A massive single slab of dark Belgian bluestone forms the center cooking station.",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 11
  },
  {
    id: "p12",
    title: "Brutalist Timber Roof",
    description: "An experimental canopy structure employing complex interlocking timber logic. It offers shade and shelter for a public pavilion, creating beautiful light grids on the ground.",
    coverImage: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 12
  },
  {
    id: "p13",
    title: "Wabi-Sabi Sanctuary",
    description: "A private apartment that utilizes textured plaster walls, organic linen textiles, and raw reclaimed wood panels to create an atmosphere of serene, earthy shelter.",
    coverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 13
  },
  {
    id: "p14",
    title: "Glasshouse Conservatory",
    description: "A dramatic glass structure celebrating the integration of tropical plants and modernist architecture. Large sliding screens open the lounge to warm climate winds.",
    coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 14
  },
  {
    id: "p15",
    title: "Monolithic Art Gallery",
    description: "An exhibition center designed in raw limestone blocks. It sits as a quiet, solid sculptural entity in the city, with a single skylight casting a blade of natural light across raw concrete.",
    coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 15
  },
  {
    id: "p16",
    title: "The Kyoto Atrium",
    description: "A private wellness club crafted with a modern, high-contrast black grid structure surrounding peaceful, tranquil gravel and moss gardens.",
    coverImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 16
  },
  {
    id: "p17",
    title: "Warm Hearth Lounge",
    description: "A sunken lounge prioritizing the fire element. A custom plaster fireplace column forms the structural and visual anchor of the master seating area.",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 17
  },
  {
    id: "p18",
    title: "Terrazzo Spa Bath",
    description: "A subterranean bathing space carved out of solid charcoal terrazzo. Water cascades down texturized basalt columns to create an immersive auditory experience.",
    coverImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 18
  },
  {
    id: "p19",
    title: "Kyoto Bamboo Teahouse",
    description: "An elegant minimal structure utilizing local bamboo structures and rice-paper screens for the ultimate tea ceremony atmosphere.",
    coverImage: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 19
  },
  {
    id: "p20",
    title: "Shadowline Forest Cabin",
    description: "An eco-conscious cabin fully clad in charred Yakisugi cedar wood. The black monolithic volume recedes seamlessly into the forest shadows.",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 20
  },
  {
    id: "p21",
    title: "Glass Courtyard House",
    description: "A family villa organized around a central maple tree courtyard. Double-insulated structural glass ensures extreme energy efficiency.",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 21
  },
  {
    id: "p22",
    title: "Circular Skylight Hall",
    description: "An expansive hallway featuring an organic circular ceiling cutout that paints a slow-moving spotlight of pure light across raw textured walls.",
    coverImage: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 22
  },
  {
    id: "p23",
    title: "Obsidian Vault Lounge",
    description: "A dark moody library lounge configured with bespoke carbon-stained ash furniture, micro-cement flooring, and subtle library shelf light accents.",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 23
  },
  {
    id: "p24",
    title: "Oak Slat Studio Loft",
    description: "An architect's personal loft workspace, fully wrapped in warm acoustic timber slats that filter city noise and yield perfect geometric shadows.",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 24
  },
  {
    id: "p25",
    title: "Minimal Concrete Staircase",
    description: "A sculptural self-supporting spiral staircase cast in high-performance liquid concrete. Designed as the primary architectural focal point.",
    coverImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 25
  },
  {
    id: "p26",
    title: "Minimal Sunken Lounge",
    description: "A custom living room design featuring micro-cement bench structures and comfortable off-white cushions arranged around a central flame vessel.",
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 26
  },
  {
    id: "p27",
    title: "Floating Oak Conservatory",
    description: "An elevated wooden pavilion overlooking a calm pond, celebrating the principles of modern modular prefabricated architecture.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 27
  },
  {
    id: "p28",
    title: "Shadow & Stone Passage",
    description: "An external gallery walkthrough employing deep concrete pillars that cast beautiful architectural shadow plays throughout the afternoon.",
    coverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 28
  },
  {
    id: "p29",
    title: "Raw Stucco Beach Villa",
    description: "A sculptural white plaster residence situated direct on sand dunes, utilizing curved organic contours and soft curved openings for a natural coastal feel.",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 29
  },
  {
    id: "p30",
    title: "Oceanview Concrete Cantilever",
    description: "A daring architectural statement extending over an infinity pool overlooking the pacific ocean. Features full post-tensioned structural glass railing floors.",
    coverImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
    ],
    order: 30
  }
];
