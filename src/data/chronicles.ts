import type { LocalizedText } from './gameData';

export type ChronicleCategory = 'patch' | 'event' | 'dev';

export interface ChronicleArticle {
  id: string;
  category: ChronicleCategory;
  date: string;
  featured?: boolean;
  image: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: { en: string[]; vi: string[] };
}

export const CHRONICLES: ChronicleArticle[] = [
  {
    id: 'demo-0901',
    category: 'patch',
    date: '2026-11-18',
    featured: true,
    image: '/assets/showcase/Background_Image_MainMenu.png',
    title: {
      en: 'Demo 0.901 Windows PC Build Now Available (~128 MB)',
      vi: 'Ra Mắt Bản Cài Đặt Windows PC Demo 0.901 (~128 MB)',
    },
    summary: {
      en: 'Lightweight Unity 6 client with complete 6-class combat, Chapter 0–3 story campaign, and headless dedicated PvP servers.',
      vi: 'Client Unity 6 siêu nhẹ tích hợp đầy đủ 6 hệ tướng, chiến dịch Chương 0–3 và máy chủ PvP độc lập chống gian lận.',
    },
    body: {
      en: [
        'Demo 0.901 packages the full Pactkeeper experience into a compact 127.73 MB Windows PC build — well under our 150 MB install-size goal.',
        'All 6 core classes (Assassin, Paladin Tank, Viking Warrior, Archer, Physician, Druid), 12 swappable weapons, and 8 reach-modifying trinkets are live with server-side passive hooks.',
        'Simply extract Demo 0.901.zip, launch PACTKEEPER.exe, and sign in with Google OAuth 2.0 to start Chapter 0.',
      ],
      vi: [
        'Bản Demo 0.901 đóng gói trọn vẹn trải nghiệm Pactkeeper chỉ trong 127.73 MB cho Windows PC — tối ưu gọn nhẹ dưới mục tiêu 150 MB.',
        'Toàn bộ 6 hệ tướng cốt lõi (Assassin, Paladin Tank, Viking Warrior, Archer, Physician, Druid), 12 vũ khí và 8 trinket đều chạy nội tại trực tiếp trên server.',
        'Chỉ cần giải nén Demo 0.901.zip, mở PACTKEEPER.exe và đăng nhập Google OAuth 2.0 để bắt đầu Chương 0.',
      ],
    },
  },
  {
    id: 'ranked-elo-ladder',
    category: 'event',
    date: '2026-11-15',
    featured: true,
    image: '/assets/story/bg_c0_heavenly_eye.png',
    title: {
      en: 'Ranked 1v1 PvP Ladder: Climb 7 Tiers From Beginner to Union',
      vi: 'Đấu Trường Ranked 1v1 PvP: Chinh Phục 7 Bậc Rank Từ Beginner Đến Union',
    },
    summary: {
      en: 'Compete on the 9×7 tactical arena with K=32 Elo scoring, +24–25 LP wins, 0 LP hard floor, and dynamic ±100 LP matchmaking.',
      vi: 'Đọ trí trên bàn cờ 9×7 với hệ thống Elo K=32, thắng +24–25 LP, bảo vệ sàn 0 LP và ghép trận công bằng ±100 LP.',
    },
    body: {
      en: [
        'Every Ranked PvP match spawns an isolated Headless Unity Dedicated Server so both players compete under identical, tamper-proof rules.',
        'Players start at 0 LP (Beginner) and advance every 100 LP through Master, Captain, Pactkeeper, Warlord, Grand Commander, and the pinnacle Union tier (600+ LP).',
        'Milestone Rewards are active: Win 3 matches for 500 Gems, or Win 10 matches to unlock the Druid unit for free.',
      ],
      vi: [
        'Mỗi trận Ranked PvP đều khởi tạo một Headless Unity Dedicated Server riêng biệt, đảm bảo luật chơi minh bạch tuyệt đối.',
        'Người chơi khởi đầu từ 0 LP (Beginner) và thăng hạng mỗi 100 LP qua Master, Captain, Pactkeeper, Warlord, Grand Commander đến đỉnh cao Union (600+ LP).',
        'Chuỗi thưởng mốc đang mở: Thắng 3 trận nhận 500 Gem, thắng 10 trận mở khóa miễn phí tướng Druid.',
      ],
    },
  },
  {
    id: 'story-campaign-guide',
    category: 'dev',
    date: '2026-11-12',
    featured: true,
    image: '/assets/story/bg_c0_reinhardt_briefing.png',
    title: {
      en: 'Dev Diary: Inside the 0.3s Instant Timeline & Story Campaign',
      vi: 'Nhật Ký Dev: Thiết Kế Dòng Thời Gian 0.3s Instant & Chiến Dịch Cốt Truyện',
    },
    summary: {
      en: 'How Chapter 0–3 teaches real PvP combos — from Warrior Push kill-zones to Physician Triage and Druid Pull cleaves.',
      vi: 'Cách chiến dịch Chương 0–3 hướng dẫn combo PvP thực chiến — từ đẩy lùi mở góc bắn đến Triage và kéo lan của Druid.',
    },
    body: {
      en: [
        'Unlike scripted fake tutorials, every Pactkeeper story battle runs on the exact same server combat engine as Ranked PvP.',
        'Commander Reinhardt guides you step-by-step through real tactical puzzles: swapping with Guard + Iron Body, stacking Steady Aim charges, and finishing a 4-HP boss in a single Paused-Instant.',
        'Chapter 0 takes just 2–5 minutes and rewards 200 Gems upon completion.',
      ],
      vi: [
        'Khác với các màn hướng dẫn giả lập, mọi trận cốt truyện của Pactkeeper đều chạy trên chính combat server của Ranked PvP.',
        'Chỉ huy Reinhardt dẫn dắt bạn qua các bài toán chiến thuật thực thụ: hoán đổi Guard + Iron Body, tích điểm Steady Aim và kết liễu boss 4 HP trong đúng 1 Paused-Instant.',
        'Chương 0 chỉ mất 2–5 phút và tặng ngay 200 Gem khi hoàn thành.',
      ],
    },
  },
  {
    id: 'fair-play-economy',
    category: 'dev',
    date: '2026-11-08',
    image: '/assets/story/bg_c0_pactkeeper_awaken.png',
    title: {
      en: 'Fair Play Commitment: Zero Pay-to-Win & Transparent Gacha Rates',
      vi: 'Cam Kết Công Bằng: Không Pay-to-Win & Minh Bạch Tỷ Lệ Gacha',
    },
    summary: {
      en: 'New accounts receive 5 of 6 units, 6 starter weapons, and 3 trinkets on first login. Paid items never alter combat rules.',
      vi: 'Tài khoản mới nhận sẵn 5/6 tướng, 6 vũ khí và 3 trinket ngay lần đăng nhập đầu tiên. Không có gói nạp nào thay đổi luật chiến đấu.',
    },
    body: {
      en: [
        'Pactkeeper is built around pure tactical mastery. Every class passive, movement pattern, and combat rule is 100% identical for free and paying players.',
        'Duplicate Gacha pulls automatically convert into Gems (30 / 80 / 150 Gems by tier), and optional Gem top-ups in VND are verified cleanly via PayOS VietQR.',
      ],
      vi: [
        'Pactkeeper đặt tư duy chiến thuật lên hàng đầu. Mọi nội tại lớp, kiểu di chuyển và luật giao tranh đều công bằng 100% cho mọi người chơi.',
        'Vật phẩm Gacha trùng tự động quy đổi thành Gem (30 / 80 / 150 Gem theo bậc), và cổng nạp Gem VND tùy chọn được xác thực an toàn qua PayOS VietQR.',
      ],
    },
  },
  {
    id: 'weekly-shop-rotation',
    category: 'event',
    date: '2026-11-04',
    image: '/assets/showcase/chapter3.png',
    title: {
      en: 'Weekly Class Bundles & Milestone Quests Live Rotation',
      vi: 'Xoay Vòng Gói Lớp Tướng Hàng Tuần & Nhiệm Vụ Cột Mốc',
    },
    summary: {
      en: 'Every Monday introduces curated Weekly Class Bundles and Daily Special Deals purchasable with earned in-game Gems.',
      vi: 'Mỗi thứ Hai cập nhật Gói Lớp Tướng Hàng Tuần và Ưu Đãi Ngày có thể mua trực tiếp bằng Gem cày trong game.',
    },
    body: {
      en: [
        'Complete server-tracked action milestones — such as winning with 3+ units alive to earn the Sharp Dagger (+5 Speed) or spending 1,000 Gems to unlock Steel Heels.',
        'All shop rotations and reward rules are live-configured by moderators without requiring client downloads.',
      ],
      vi: [
        'Hoàn thành các mốc hành động được server ghi nhận — như thắng trận còn từ 3 tướng sống sót để nhận Sharp Dagger (+5 Speed).',
        'Toàn bộ lịch xoay vòng Shop và nhiệm vụ đều được cập nhật trực tiếp từ hệ thống quản trị mà không cần tải lại bản cài đặt.',
      ],
    },
  },
];

export interface LoreCodexEntry {
  id: string;
  tag: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon: string;
  description: LocalizedText;
}

export const LORE_CODEX: LoreCodexEntry[] = [
  {
    id: 'time-sight',
    tag: 'DIVINE GIFT',
    title: { en: 'Time Sight (The Eye)', vi: 'Thời Nhãn (Time Sight)' },
    subtitle: { en: '0.3-Second Tactical Foresight', vi: 'Tiên tri dòng thời gian 0.3 giây' },
    icon: '/assets/ui/OpenedEye.png',
    description: {
      en: 'Granted to Varek through his pact with the Gods, Time Sight fractures chaotic warfare into crisp 0.3-second Instants. In battle, the Timeline Ready Queue is Varek’s vision — revealing exact turn order before any command is committed.',
      vi: 'Món quà từ giao ước với Thần linh giúp Varek phân tách chiến trường hỗn loạn thành từng nhịp 0.3 giây sắc nét. Trong trận đấu, thanh Ready Queue chính là tầm nhìn Thời Nhãn — hé lộ chính xác thứ tự hành động trước khi khóa lệnh.',
    },
  },
  {
    id: 'varek',
    tag: 'PROTAGONIST',
    title: { en: 'Varek, The Pactkeeper', vi: 'Varek — Người Giữ Giao Ước' },
    subtitle: { en: 'From War Orphan to Unifier', vi: 'Từ Đứa Trẻ Mồ Côi Đến Người Thống Nhất' },
    icon: '/assets/ui/pactkeeper_logo.png',
    description: {
      en: 'Raised amid the endless conflicts of the Divine Eye Realm, Varek forged a perilous pact to save his people. Every Ranked tier — from Beginner to Union — traces his ascent from nameless survivor to supreme commander.',
      vi: 'Lớn lên giữa chiến tranh triền miên tại Divine Eye Realm, Varek đánh cược số phận lập giao ước để cứu lấy dân tộc. Mỗi bậc xếp hạng từ Beginner đến Union chính là dấu ấn trên hành trình thống nhất của anh.',
    },
  },
  {
    id: 'reinhardt',
    tag: 'MENTOR',
    title: { en: 'Commander Reinhardt', vi: 'Chỉ Huy Reinhardt' },
    subtitle: { en: 'Master of Grid Formations', vi: 'Bậc Thầy Đội Hình Bàn Cờ' },
    icon: '/assets/skills/Shield.png',
    description: {
      en: 'A veteran tactician who drills Varek in the unforgiving geometry of the 9×7 battlefield — teaching Guard swaps, diagonal Archer lines, Half-Instant Triage timing, and multi-unit Focus Fire.',
      vi: 'Vị chỉ huy lão luyện rèn giũa Varek từng đường đi nước bước trên bàn cờ 9×7 — từ hoán đổi Guard, căn góc bắn chéo, nhịp Triage Half-Instant đến pha dồn sát thương nhiều tướng.',
    },
  },
  {
    id: 'realm',
    tag: 'SETTING',
    title: { en: 'Divine Eye Realm', vi: 'Vùng Đất Divine Eye Realm' },
    subtitle: { en: 'A Fractured 9×7 Arena of Factions', vi: 'Đấu Trường 9×7 Của Những Giao Ước' },
    icon: '/assets/skills/Monocle.png',
    description: {
      en: 'A medieval realm scarred by rival warlords, corrupt tacticians, and ancient forest pacts. Victory belongs not to raw numbers, but to commanders who read the timeline and outmaneuver their opponent.',
      vi: 'Một vùng đất trung cổ bị chia cắt bởi các lãnh chúa, chiến thuật gia sa ngã và giao ước rừng cổ xưa. Chiến thắng không thuộc về số đông mà thuộc về kẻ đọc vị được dòng thời gian.',
    },
  },
];
