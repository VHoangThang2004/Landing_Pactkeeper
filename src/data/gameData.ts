export type Lang = 'en' | 'vi';

export interface LocalizedText {
  en: string;
  vi: string;
}

export interface UnitClassData {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  sprite: string;
  frame: string;
  accentColor: string;
  starter: boolean;
  stats: {
    hp: string;
    speed: string;
    sp: string;
  };
  passive: {
    name: string;
    description: LocalizedText;
  };
  moveSkill: {
    name: string;
    description: LocalizedText;
    /** Coordinates relative to center (2,2) on a 5x5 mini grid */
    cells: [number, number][];
  };
  classSkill: {
    name: string;
    spCost: number;
    type: 'Instant' | 'Half-Instant';
    icon: string;
    description: LocalizedText;
  };
  weapons: {
    name: string;
    skill: string;
    bonus: string;
    icon: string;
  }[];
  /** Example attack cells relative to center (2,2) on a 5x5 mini grid */
  attackCells: [number, number][];
}

export const UNIT_CLASSES: UnitClassData[] = [
  {
    id: 'assassin',
    name: { en: 'Assassin', vi: 'Sát Thủ (Assassin)' },
    role: { en: 'High-Speed Burst Striker', vi: 'Sát thương dồn tốc độ cao' },
    sprite: '/assets/units/assassin.png',
    frame: '/assets/frames/AssassinFrame.png',
    accentColor: '#A855F7',
    starter: true,
    stats: { hp: '1 / 3', speed: '130 / 140', sp: '2 / 3' },
    passive: {
      name: 'Ambush',
      description: {
        en: 'Attacking a cell directly below the Assassin triggers Critical Hit (x2 damage) for that instant.',
        vi: 'Tấn công mục tiêu ở ô phía dưới Sát Thủ sẽ kích hoạt Đòn Chí Mạng (x2 sát thương) trong Instant đó.',
      },
    },
    moveSkill: {
      name: 'Sneaky Steps',
      description: {
        en: 'L-shaped jumps like a chess knight (up to 8 target cells).',
        vi: 'Nhảy hình chữ L như quân Mã cờ vua (tối đa 8 ô đích).',
      },
      cells: [
        [0, 1], [0, 3], [1, 0], [1, 4],
        [3, 0], [3, 4], [4, 1], [4, 3],
      ],
    },
    classSkill: {
      name: 'Limit Break',
      spCost: 1,
      type: 'Instant',
      icon: '/assets/skills/Adrenaline.png',
      description: {
        en: 'Self-empowerment granting +15 Speed and +1 Attack Multiplier for 1 instant.',
        vi: 'Tự cường hóa bản thân: +15 Tốc độ và +1 hệ số sát thương trong 1 Instant.',
      },
    },
    weapons: [
      { name: 'Dagger', skill: 'Dagger Thrust', bonus: 'Starter', icon: '/assets/skills/Dagger.png' },
      { name: 'Sharp Dagger', skill: 'Dagger Thrust', bonus: '+5 Speed', icon: '/assets/skills/Dagger.png' },
    ],
    attackCells: [
      [1, 2], [3, 2], [2, 1], [2, 3],
    ],
  },
  {
    id: 'tank',
    name: { en: 'Tank (Paladin)', vi: 'Đỡ Đòn (Paladin)' },
    role: { en: 'Frontline Protector', vi: 'Lá chắn tuyến đầu' },
    sprite: '/assets/units/paladin.png',
    frame: '/assets/frames/TankFrame.png',
    accentColor: '#3B82F6',
    starter: true,
    stats: { hp: '3 / 5', speed: '100 / 110', sp: '2 / 4' },
    passive: {
      name: 'The Guardian',
      description: {
        en: 'If commanded during an instant, gains Iron Body: caps the next hit taken to 1 damage.',
        vi: 'Khi được ra lệnh trong Instant, nhận Iron Body: chặn sát thương đòn đánh tiếp theo xuống tối đa 1 HP.',
      },
    },
    moveSkill: {
      name: 'Tanky Movement',
      description: {
        en: 'Moves up to 2 cells left/right or 1 cell up/down.',
        vi: 'Di chuyển tối đa 2 ô trái/phải hoặc 1 ô lên/xuống.',
      },
      cells: [
        [2, 0], [2, 1], [2, 3], [2, 4],
        [1, 2], [3, 2],
      ],
    },
    classSkill: {
      name: 'Guard',
      spCost: 1,
      type: 'Instant',
      icon: '/assets/skills/Shield.png',
      description: {
        en: 'Swaps positions with an adjacent ally and grants them 50% damage reduction for 2 instants.',
        vi: 'Hoán đổi vị trí với đồng minh kế bên và giúp họ giảm 50% sát thương trong 2 Instant.',
      },
    },
    weapons: [
      { name: 'Sword & Shield', skill: 'Defensive Slash', bonus: 'Starter', icon: '/assets/skills/Sword.png' },
      { name: 'Kite Shield', skill: 'Defensive Slash', bonus: '+1 HP', icon: '/assets/skills/Shield.png' },
    ],
    attackCells: [
      [1, 2], [3, 2], [2, 1], [2, 3],
    ],
  },
  {
    id: 'warrior',
    name: { en: 'Warrior (Viking)', vi: 'Chiến Binh (Viking)' },
    role: { en: 'Combo Bruiser & Displacer', vi: 'Đấu sĩ tạo combo đẩy lùi' },
    sprite: '/assets/units/viking.png',
    frame: '/assets/frames/FighterFrame.png',
    accentColor: '#EF4444',
    starter: true,
    stats: { hp: '2 / 4', speed: '115 / 125', sp: '2 / 4' },
    passive: {
      name: 'Assault',
      description: {
        en: 'After using its movement skill, gains Momentum: x2 damage per stack (up to 3 stacks) for that instant.',
        vi: 'Sau khi dùng kỹ năng di chuyển, tích Momentum: x2 sát thương mỗi tầng (tối đa 3 tầng) trong Instant đó.',
      },
    },
    moveSkill: {
      name: "Warrior's Movement",
      description: {
        en: 'Steps into any of the 3 cells in the column immediately left or right.',
        vi: 'Bước vào bất kỳ ô nào trong 3 ô thuộc cột liền kề bên trái hoặc bên phải.',
      },
      cells: [
        [1, 1], [2, 1], [3, 1],
        [1, 3], [2, 3], [3, 3],
      ],
    },
    classSkill: {
      name: 'Push',
      spCost: 1,
      type: 'Instant',
      icon: '/assets/skills/Axe.png',
      description: {
        en: 'Shoves an adjacent enemy unit back by 2 grid cells — setting up deadly team kill-zones.',
        vi: 'Đẩy lùi kẻ địch kế bên ra xa 2 ô — mở góc bắn và tạo combo tiêu diệt cùng đồng đội.',
      },
    },
    weapons: [
      { name: 'Axe', skill: 'Axe Swing', bonus: 'Starter', icon: '/assets/skills/Axe.png' },
      { name: 'War Axe', skill: 'Axe Swing', bonus: '+1 HP', icon: '/assets/skills/Axe.png' },
    ],
    attackCells: [
      [1, 1], [2, 1], [3, 1],
      [1, 3], [2, 3], [3, 3],
    ],
  },
  {
    id: 'archer',
    name: { en: 'Archer', vi: 'Xạ Thủ (Archer)' },
    role: { en: 'Long-Range Marksman', vi: 'Sát thương tầm xa chính xác' },
    sprite: '/assets/units/crossbowman.png',
    frame: '/assets/frames/ArcherFrame.png',
    accentColor: '#F59E0B',
    starter: true,
    stats: { hp: '1 / 3', speed: '120 / 130', sp: '2 / 3' },
    passive: {
      name: 'Steady Aim',
      description: {
        en: 'Every resolved attack adds 1 charge. At 2 charges, converts into Piercing Shot (x2 damage on next hit).',
        vi: 'Mỗi đòn tấn công tích 1 điểm. Đủ 2 điểm chuyển hóa thành Piercing Shot (x2 sát thương cho phát bắn kế tiếp).',
      },
    },
    moveSkill: {
      name: "Archer's Movement",
      description: {
        en: 'Slides diagonally 1 or 2 cells away to kite and line up clean shots.',
        vi: 'Di chuyển chéo 1 hoặc 2 ô để giữ khoảng cách và căn góc bắn.',
      },
      cells: [
        [0, 0], [1, 1], [0, 4], [1, 3],
        [3, 1], [4, 0], [3, 3], [4, 4],
      ],
    },
    classSkill: {
      name: 'Focused Aim',
      spCost: 2,
      type: 'Instant',
      icon: '/assets/skills/Aim.png',
      description: {
        en: 'Extends attack and skill reach by +2 cells along primary axes for 5 instants.',
        vi: 'Mở rộng tầm đánh và kỹ năng thêm +2 ô theo các trục chính trong 5 Instant.',
      },
    },
    weapons: [
      { name: 'CrossBow', skill: 'Accurate Shot', bonus: 'Starter', icon: '/assets/skills/Bow.png' },
      { name: 'Compound Bow', skill: 'Accurate Shot', bonus: '+5 Speed', icon: '/assets/skills/Bow.png' },
    ],
    attackCells: [
      [0, 2], [1, 2], [3, 2], [4, 2],
      [2, 0], [2, 1], [2, 3], [2, 4],
    ],
  },
  {
    id: 'physician',
    name: { en: 'Physician', vi: 'Y Sư (Physician)' },
    role: { en: 'Tactical Healer & Timeline Manipulator', vi: 'Hồi máu & thao túng nhịp độ' },
    sprite: '/assets/units/physician.png',
    frame: '/assets/frames/healerFrame.png',
    accentColor: '#10B981',
    starter: true,
    stats: { hp: '1 / 3', speed: '110 / 120', sp: '3 / 5' },
    passive: {
      name: 'The Physician',
      description: {
        en: 'After a heal that restores HP, regains 1 SP (up to max) for sustained tempo control.',
        vi: 'Sau mỗi lần hồi máu thành công, hồi lại 1 SP để duy trì nhịp hỗ trợ liên tục.',
      },
    },
    moveSkill: {
      name: "Physician's Movement",
      description: {
        en: 'Moves up to 2 cells up/down or 1 cell left/right.',
        vi: 'Di chuyển tối đa 2 ô lên/xuống hoặc 1 ô trái/phải.',
      },
      cells: [
        [0, 2], [1, 2], [3, 2], [4, 2],
        [2, 1], [2, 3],
      ],
    },
    classSkill: {
      name: 'Triage',
      spCost: 3,
      type: 'Half-Instant',
      icon: '/assets/skills/Triage.png',
      description: {
        en: 'Heals a targeted ally for 2 HP and bends timeline recovery so allies can re-engage faster.',
        vi: 'Hồi 2 HP cho đồng minh mục tiêu và hỗ trợ nhịp hồi chiêu giúp đồng đội lập tức trở lại giao tranh.',
      },
    },
    weapons: [
      { name: 'Holy Book', skill: 'Heal! (1 HP)', bonus: 'Starter', icon: '/assets/skills/Book.png' },
      { name: 'Sacred Tome', skill: 'Heal! (1 HP)', bonus: '+1 Max SP', icon: '/assets/skills/Book.png' },
    ],
    attackCells: [
      [1, 2], [3, 2], [2, 1], [2, 3],
    ],
  },
  {
    id: 'druid',
    name: { en: 'Druid', vi: 'Pháp Sư Rừng (Druid)' },
    role: { en: 'Area Control & Displacement', vi: 'Khống chế vùng & kéo mục tiêu' },
    sprite: '/assets/units/druid.png',
    frame: '/assets/frames/DruidFrame.png',
    accentColor: '#22C55E',
    starter: false,
    stats: { hp: '3 / 4', speed: '120 / 130', sp: '2 / 3' },
    passive: {
      name: "Nature's Force",
      description: {
        en: 'After using Pull, the next weapon attack cleaves every non-allied cell in reach at once.',
        vi: 'Sau khi dùng kỹ năng Pull, đòn tấn công vũ khí kế tiếp sẽ quét toàn bộ các ô địch trong tầm cùng lúc.',
      },
    },
    moveSkill: {
      name: "Druid's Movement",
      description: {
        en: 'Steps into any of the 3 cells in the row immediately above or below.',
        vi: 'Bước vào bất kỳ ô nào trong 3 ô thuộc hàng liền kề phía trên hoặc phía dưới.',
      },
      cells: [
        [1, 1], [1, 2], [1, 3],
        [3, 1], [3, 2], [3, 3],
      ],
    },
    classSkill: {
      name: 'Pull',
      spCost: 1,
      type: 'Half-Instant',
      icon: '/assets/skills/Pull.png',
      description: {
        en: 'Drags a targeted unit 2 cells toward the Druid, breaking enemy formations.',
        vi: 'Kéo đơn vị mục tiêu lại gần Druid 2 ô, phá vỡ hoàn toàn đội hình đối phương.',
      },
    },
    weapons: [
      { name: 'Staff of the Druid', skill: 'Thorns Attack!', bonus: 'Starter', icon: '/assets/skills/Wand.png' },
      { name: 'Ancient Staff', skill: 'Thorns Attack!', bonus: '+1 HP', icon: '/assets/skills/Wand.png' },
    ],
    attackCells: [
      [2, 0], [2, 1], [2, 3], [2, 4],
    ],
  },
];

export const TRINKETS = [
  {
    name: 'Far Sight',
    items: 'Monocle / Jeweled Monocle',
    sp: '0 SP',
    icon: '/assets/skills/Monocle.png',
    effect: {
      en: 'Extends weapon & class-skill reach +1 cell horizontally for 10 Instants.',
      vi: 'Mở rộng tầm vũ khí & kỹ năng thêm +1 ô theo chiều ngang trong 10 Instant.',
    },
  },
  {
    name: 'Sharp Sight',
    items: 'Spyglass / Brass Spyglass',
    sp: '1 SP',
    icon: '/assets/skills/Spyglass.png',
    effect: {
      en: 'Extends weapon & class-skill reach +1 cell vertically for 10 Instants.',
      vi: 'Mở rộng tầm vũ khí & kỹ năng thêm +1 ô theo chiều dọc trong 10 Instant.',
    },
  },
  {
    name: 'Turbo',
    items: 'Strong Boots / Iron Boots',
    sp: '0 SP',
    icon: '/assets/skills/LongBoots.png',
    effect: {
      en: 'Extends movement skill reach +1 cell on both axes for 10 Instants.',
      vi: 'Mở rộng phạm vi di chuyển thêm +1 ô theo cả 2 trục trong 10 Instant.',
    },
  },
];

export const RANK_TIERS = [
  { name: 'Beginner', lp: '0 – 99 LP', color: '#94A3B8', badge: 'I' },
  { name: 'Master', lp: '100 – 199 LP', color: '#38BDF8', badge: 'II' },
  { name: 'Captain', lp: '200 – 299 LP', color: '#34D399', badge: 'III' },
  { name: 'Pactkeeper', lp: '300 – 399 LP', color: '#F5C451', badge: 'IV' },
  { name: 'Warlord', lp: '400 – 499 LP', color: '#FB923C', badge: 'V' },
  { name: 'Grand Commander', lp: '500 – 599 LP', color: '#F43F5E', badge: 'VI' },
  { name: 'Union', lp: '600+ LP', color: '#E879F9', badge: 'VII' },
];

export const HERO_SLIDES = [
  {
    src: '/assets/showcase/Background_Image_MainMenu.png',
    tag: 'MAIN MENU',
    caption: {
      en: 'Divine Eye Realm — Tactical Command Hub',
      vi: 'Divine Eye Realm — Đại Sảnh Chiến Thuật',
    },
  },
  {
    src: '/assets/story/bg_c0_pactkeeper_awaken.png',
    tag: 'CHAPTER 0',
    caption: {
      en: 'Awakening of Time Sight — Forge the Pact',
      vi: 'Thức Tỉnh Thời Nhãn — Lập Giao Ước Thần Linh',
    },
  },
  {
    src: '/assets/story/bg_c0_heavenly_eye.png',
    tag: 'TIME SIGHT',
    caption: {
      en: 'The Heavenly Eye — Read Every 0.3s Instant',
      vi: 'Thiên Nhãn — Nhìn Thấu Từng Nhịp 0.3s Instant',
    },
  },
  {
    src: '/assets/story/bg_c0_reinhardt_briefing.png',
    tag: 'CHAPTER 1',
    caption: {
      en: "Commander Reinhardt's Tactical Briefing",
      vi: 'Huấn Luyện Chiến Thuật Cùng Chỉ Huy Reinhardt',
    },
  },
  {
    src: '/assets/story/bg_c0_ambush.png',
    tag: 'CHAPTER 2',
    caption: {
      en: 'Ambush in the Mire — Master Reach & Combos',
      vi: 'Phục Kích Đầm Lầy — Làm Chủ Tầm Đánh & Combo',
    },
  },
  {
    src: '/assets/showcase/chapter3.png',
    tag: 'CHAPTER 3',
    caption: {
      en: "The Forest Pact — Unifier's Final Trial",
      vi: 'Giao Ước Rừng Sâu — Thử Thách Cuối Cùng',
    },
  },
];

export const STORY_CHAPTERS = [
  {
    id: 'c0',
    tag: 'Chapter 0',
    title: { en: 'Awakening of Time Sight', vi: 'Thức Tỉnh Thời Nhãn (Time Sight)' },
    image: '/assets/story/bg_c0_pactkeeper_awaken.png',
    summary: {
      en: 'Amid the endless war of the Divine Eye Realm, orphan Varek forges a sacred pact with the Gods and awakens Time Sight — seeing the flow of battle in 0.3s Instants.',
      vi: 'Giữa chiến tranh triền miên của Divine Eye Realm, chàng mồ côi Varek lập giao ước với Thần linh và thức tỉnh Time Sight — nhìn thấu nhịp độ trận chiến theo từng Instant 0.3 giây.',
    },
  },
  {
    id: 'c1',
    tag: 'Chapter 1',
    title: { en: "Reinhardt's Tactical Crucible", vi: 'Lò Luyện Chiến Thuật của Reinhardt' },
    image: '/assets/story/bg_c0_reinhardt_briefing.png',
    summary: {
      en: 'Commander Reinhardt drills Varek in frontline Guard swaps, diagonal Archer calibration, and 3-unit Focus Fire kill zones.',
      vi: 'Chỉ huy Reinhardt huấn luyện Varek kỹ thuật hoán đổi Guard tuyến đầu, căn góc bắn chéo của Archer và combo 3 tướng dồn sát thương.',
    },
  },
  {
    id: 'c2',
    tag: 'Chapter 2',
    title: { en: 'Long Reach in the Mire', vi: 'Tầm Đánh Vượt Đầm Lầy' },
    image: '/assets/story/bg_c0_ambush.png',
    summary: {
      en: 'Master Half-Instant Physician Triage and 0-SP Trinkets (Far Sight & Turbo) to out-range heavily armored sentinels.',
      vi: 'Làm chủ kỹ năng Half-Instant Triage của Y Sư và bộ Trinket 0 SP (Far Sight & Turbo) để vượt tầm các pháo đài giáp nặng.',
    },
  },
  {
    id: 'c3',
    tag: 'Chapter 3',
    title: { en: "The Forest Pact & Unifier's Trial", vi: 'Giao Ước Rừng Sâu & Thử Thách Thống Nhất' },
    image: '/assets/story/bg_c0_heavenly_eye.png',
    summary: {
      en: "Unleash the Druid's Pull + Nature's Force cleave and execute a 4-HP single-instant combo against the Corrupt Tactician to claim your place in Ranked PvP.",
      vi: 'Giải phóng combo Pull + đánh lan của Druid và thực hiện pha dứt điểm 4 HP trong 1 Instant hạ gục Corrupt Tactician để bước vào đấu trường Ranked PvP.',
    },
  },
];
