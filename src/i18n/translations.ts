import type { Lang } from '../data/gameData';

export const TRANSLATIONS = {
  en: {
    nav: {
      mechanics: 'Time Sight',
      classes: 'Classes',
      modes: 'Modes & Rank',
      story: 'Lore',
      fairness: 'Fair Play',
      faq: 'FAQ',
      download: 'Download PC',
    },
    hero: {
      badge: 'v0.901 Windows PC Build • Free-to-Play',
      titleLine1: 'MASTER TIME.',
      titleLine2: 'COMMAND THE 9×7 GRID.',
      subtitle:
        'Pactkeeper is a 2-player online 2D Strategy RPG where time flows in 0.3-second Instants. Read enemy intent, chain multi-unit combos, and climb the server-authoritative PvP ladder.',
      ctaPrimary: 'Download Free for PC',
      ctaSub: 'Demo 0.901 • ~128 MB',
      ctaSecondary: 'Explore Gallery',
      trust: [
        'Free-to-Play',
        'Under 150 MB Install',
        '100% Server-Authoritative',
        'Google Sign-In',
      ],
      showcaseCaption: 'In-Game Artwork Showcase',
    },
    timeline: {
      eyebrow: 'SIGNATURE MECHANIC',
      title: 'Time Sight & The Instant Timeline',
      subtitle:
        'Forget slow alternating turns. Every unit has a Speed-driven step counter ticking every 0.3s Instant. When a unit hits 0, time pauses — issue multiple commands, inspect enemy reach, and trigger devastating combos.',
      stepHint: 'Interactive Preview: Click "Advance Instant" or select a Ready unit below.',
      advanceBtn: 'Advance 1 Instant (0.3s)',
      resetBtn: 'Reset Timeline',
      readyTag: 'READY — PAUSED INSTANT',
      waitingTag: 'steps left',
      legendMove: 'Blue — Movement Reach',
      legendAttack: 'Red — Attack / Skill Reach',
      legendBuff: 'Orange — Trinket / Buff Extended Reach',
      pillars: [
        {
          title: '0.3s Instant Precision',
          desc: 'Speed directly determines how frequently your units act. Faster classes like Assassin (130+ SPD) cycle turns ahead of heavy Tanks.',
        },
        {
          title: 'Multi-Command Paused Instants',
          desc: 'Chain Movement + Instant Class Skill + Weapon Attack in a single paused instant by balancing step-cost multipliers.',
        },
        {
          title: 'Zero Hidden RNG',
          desc: 'Both players see exact turn order, HP, SP pools, and highlighted reach tiles before locking in commands — pure tactical skill.',
        },
      ],
    },
    classes: {
      eyebrow: '6 CLASSES • 12 WEAPONS • 8 TRINKETS',
      title: 'Build Your 5-Unit Tactical Squad',
      subtitle:
        'Combine 6 distinct classes — each with a unique server-hooked Passive, custom movement pattern, class skill, swappable weapons, and reach-altering trinkets.',
      starterBadge: 'Unlocked at Login',
      unlockBadge: 'Collectible / Win 10 Matches',
      passiveLabel: 'Unique Passive',
      moveLabel: 'Movement Skill (0 SP • Instant)',
      classSkillLabel: 'Class Skill',
      weaponsLabel: 'Swappable Weapons',
      patternToggleMove: 'Movement Pattern',
      patternToggleAttack: 'Weapon Reach',
      trinketsTitle: 'Universal Trinkets (4th Equipment Slot)',
      trinketsSub: 'Reshape any unit’s reach for 10 Instants — choose between striking further or leaping further.',
    },
    modes: {
      eyebrow: 'COMPETITIVE & CAMPAIGN',
      title: '4 Game Modes & 7-Tier Elo Ladder',
      subtitle:
        'Every match — PvP or Story — runs on its own on-demand Headless Dedicated Server, ensuring identical rules and zero client-side tampering.',
      list: [
        {
          name: 'Ranked PvP (1v1)',
          tag: 'Elo / LP Competitive',
          desc: 'Battle human tacticians on the 9×7 arena. Earn +24–25 LP per win with dynamic matchmaking (±100 LP expanding every 10s) and a 0 LP hard floor.',
        },
        {
          name: 'Unranked PvP',
          tag: 'Casual Practice',
          desc: 'Test new 5-unit team loadouts, weapon swaps, and trinket combos against live opponents with zero LP risk.',
        },
        {
          name: 'Friendly Match',
          tag: 'Real-Time Invite',
          desc: 'Add friends, check online presence, chat in-game, and challenge rivals directly with instant match invites.',
        },
        {
          name: 'Story Campaign (Ch.0 – Ch.4)',
          tag: 'PvE vs Server AI',
          desc: 'Follow Varek & Commander Reinhardt through guided tactical lessons and 4-behavior server AI encounters.',
        },
      ],
      ladderTitle: 'Climb From Beginner to Union',
      ladderSub: '7 competitive tiers (100 LP per tier) mirroring Varek’s ascent across the Divine Eye Realm.',
    },
    story: {
      eyebrow: 'WORLD & LORE',
      title: 'Chronicles of the Divine Eye Realm',
      subtitle:
        'Step into a war-torn realm where seeing 0.3 seconds ahead means the difference between annihilation and victory.',
    },
    howItWorks: {
      eyebrow: 'READY IN UNDER 3 MINUTES',
      title: 'How to Start Playing Pactkeeper',
      steps: [
        {
          num: '01',
          title: 'Download Lightweight PC Build',
          desc: 'Grab Demo 0.901 (~128 MB ZIP). Extract and launch PACTKEEPER.exe — no bloated 20 GB launcher required.',
        },
        {
          num: '02',
          title: 'One-Click Google Sign-In',
          desc: 'Sign in securely via Google OAuth 2.0. Instantly receive 5 starter units, 6 weapons, and 3 trinkets ready for Ranked.',
        },
        {
          num: '03',
          title: 'Master Chapter 0 & Enter PvP',
          desc: 'Finish the 2–5 minute guided tutorial with Reinhardt, customize your 5-unit loadout, and queue into 1v1 Ranked.',
        },
      ],
    },
    fairness: {
      eyebrow: 'FAIR PLAY & ARCHITECTURE',
      title: 'Zero Pay-to-Win. 100% Server-Authoritative.',
      subtitle:
        'Designed from the ground up as a fair competitive strategy RPG backed by ASP.NET Core, MongoDB, and headless Unity combat servers.',
      cards: [
        {
          title: 'Equal Combat Rules',
          desc: 'No purchase ever alters combat rules. Every class, skill, and passive is accessible to all players — 5 of 6 units are free on day one.',
        },
        {
          title: 'Transparent Gacha & Rewards',
          desc: 'Earn Gems through milestone quests (Win 3 matches → 500 Gems; Win 10 matches → Druid unit). Server-side rolls with clear rates & duplicate Gem conversion.',
        },
        {
          title: 'Dedicated Anti-Cheat Server',
          desc: 'Every match spawns an isolated headless Unity server that validates every move, passive hook, and damage calculation.',
        },
        {
          title: '60s Seamless Reconnect',
          desc: 'Dropped connection? Reopen the client within 60 seconds to re-sync your exact MongoDB board snapshot without losing the match.',
        },
      ],
      topupNote: 'Optional Gem Top-Up in VND supported safely via PayOS VietQR.',
      topupBtn: 'Open Top-Up Portal',
    },
    faq: {
      eyebrow: 'SPECS & QUESTIONS',
      title: 'System Requirements & FAQ',
      specsTitle: 'Windows PC Requirements',
      specs: [
        { label: 'Operating System', value: 'Windows 10 / 11 (64-bit)' },
        { label: 'Install Size', value: '~128 MB (Target < 150 MB)' },
        { label: 'Engine', value: 'Unity 6 (2D Lightweight Build)' },
        { label: 'Controls', value: 'Mouse Left-Click (Action) & Right-Click (Inspect)' },
        { label: 'Network', value: 'Broadband Internet (Online PvP & Story Sync)' },
        { label: 'Account', value: 'Google Account (OAuth 2.0)' },
      ],
      items: [
        {
          q: 'Is Pactkeeper really free to play?',
          a: 'Yes! You can download and play both the Story Campaign and Ranked 1v1 PvP completely free. New accounts start with 5 of 6 units, 6 starter weapons, and 3 trinkets immediately.',
        },
        {
          q: 'How long does an average PvP match take?',
          a: 'A typical 1v1 PvP match lasts 15–30 minutes (with a 15s-per-unit turn timer plus a 200s overtime bank). The Chapter 0 tutorial takes just 2–5 minutes.',
        },
        {
          q: 'Can I play with my friends?',
          a: 'Yes! Add friends via the in-game social menu, see who is online, chat in real time, and send Friendly Match invites.',
        },
        {
          q: 'What happens if my internet disconnects mid-match?',
          a: 'Pactkeeper gives you a 60-second reconnect window. Restarting the game automatically pulls your ongoing match state from the server so you can resume right where you left off.',
        },
        {
          q: 'Is there a mobile or macOS version?',
          a: 'Currently Pactkeeper targets Windows PC (Unity 6) with mouse-driven Left/Right-Click tactical controls. Future platform expansion may be considered after Capstone release.',
        },
      ],
    },
    finalCta: {
      title: 'Ready to Forge Your Pact?',
      subtitle: 'Download the 128 MB Windows PC build and prove your tactical mastery on the 9×7 arena today.',
      btn: 'Download Pactkeeper v0.901',
    },
    footer: {
      tagline: 'A real-time tactical PvP strategy RPG with server-authoritative combat.',
      capstone: 'FPT University — SEP490 Capstone Project • Group GFA26SE91 • Project FA26SE046',
      team: 'Studio Lomzom: Nguyen Bach Hiep, Le Vu Van, Vo Hoang Thang, Le Cao Khanh Hoang, Le Nguyen Tuan Khoa',
      supervisor: 'Supervisor: Pham Thanh Tri',
      rights: '© 2026 Pactkeeper / Studio Lomzom. Built for SEP490.',
    },
    downloadModal: {
      title: 'Download Pactkeeper (Windows PC)',
      version: 'Version Demo 0.901 • 127.73 MB (.zip)',
      readyMsg: 'Your direct download link is configured and ready.',
      noLinkMsg:
        'Public CDN download URL (VITE_DOWNLOAD_URL) is not configured yet for this preview. You can run the local build directly from SEP490/Demo/Demo 0.901.zip or set VITE_DOWNLOAD_URL in .env before deploying to Vercel.',
      stepsTitle: 'Quick Install Guide:',
      steps: [
        'Download & extract Demo 0.901.zip to any folder on Windows 10/11.',
        'Run PACTKEEPER.exe (under 150 MB total footprint).',
        'Sign in with Google and complete Chapter 0 to unlock Ranked PvP.',
      ],
      directBtn: 'Start Download Now',
      closeBtn: 'Close',
    },
  },
  vi: {
    nav: {
      mechanics: 'Time Sight',
      classes: '6 Hệ Tướng',
      modes: 'Chế Độ & Rank',
      story: 'Cốt Truyện',
      fairness: 'Công Bằng',
      faq: 'Hỏi Đáp',
      download: 'Tải Game PC',
    },
    hero: {
      badge: 'Bản PC Windows v0.901 • Miễn Phí 100%',
      titleLine1: 'LÀM CHỦ THỜI GIAN.',
      titleLine2: 'ĐỊNH ĐOẠT BÀN CỜ 9×7.',
      subtitle:
        'Pactkeeper là game 2D Chiến Thuật RPG 1v1 Online nơi thời gian trôi theo từng Instant 0.3 giây. Đọc trước ý đồ đối thủ, nối chuỗi combo 5 tướng và leo hạng trên máy chủ chống gian lận.',
      ctaPrimary: 'Tải Miễn Phí Cho PC',
      ctaSub: 'Bản Demo 0.901 • ~128 MB',
      ctaSecondary: 'Xem Thư Viện Ảnh',
      trust: [
        'Miễn Phí (Free-to-Play)',
        'Siêu Nhẹ < 150 MB',
        '100% Server-Authoritative',
        'Đăng Nhập Google',
      ],
      showcaseCaption: 'Trình chiếu hình ảnh trong game',
    },
    timeline: {
      eyebrow: 'CƠ CHẾ ĐỘC QUYỀN',
      title: 'Time Sight & Dòng Thời Gian Instant',
      subtitle:
        'Không còn cảnh chờ lượt nhàm chán. Mỗi tướng sở hữu bộ đếm Step theo chỉ số Speed, giảm dần mỗi 0.3s Instant. Khi về 0, thời gian tạm dừng — bạn có thể tung nhiều lệnh liên tiếp để tạo combo hủy diệt.',
      stepHint: 'Tương tác thử: Nhấn "Tiến 1 Instant" hoặc chọn tướng đang Sẵn Sàng bên dưới.',
      advanceBtn: 'Tiến 1 Instant (0.3s)',
      resetBtn: 'Đặt lại Timeline',
      readyTag: 'SẴN SÀNG — PAUSED INSTANT',
      waitingTag: 'step nữa',
      legendMove: 'Xanh Dương — Ô Di Chuyển',
      legendAttack: 'Đỏ — Tầm Tấn Công / Kỹ Năng',
      legendBuff: 'Cam — Tầm Mở Rộng Từ Trinket / Buff',
      pillars: [
        {
          title: 'Chuẩn Xác Từng 0.3s Instant',
          desc: 'Chỉ số Speed quyết định tần suất hành động. Các lớp tốc độ cao như Sát Thủ (130+ SPD) ra đòn thường xuyên hơn Tank.',
        },
        {
          title: 'Combo Đa Lệnh Trong 1 Nhịp',
          desc: 'Kết hợp Di chuyển + Kỹ năng Instant + Tấn công vũ khí trong cùng một Paused-Instant bằng cách tối ưu hệ số step-cost.',
        },
        {
          title: 'Minh Bạch — Thuần Tư Duy',
          desc: 'Cả hai người chơi đều thấy rõ thứ tự hành động, HP, SP và vùng tầm đánh trước khi khóa lệnh. Thắng thua do chiến thuật.',
        },
      ],
    },
    classes: {
      eyebrow: '6 HỆ TƯỚNG • 12 VŨ KHÍ • 8 TRINKET',
      title: 'Xây Dựng Đội Hình 5 Tướng Chiến Thuật',
      subtitle:
        'Phối hợp 6 lớp nhân vật riêng biệt — mỗi lớp có Nội tại xử lý trên server, kiểu di chuyển riêng, kỹ năng lớp, vũ khí thay đổi linh hoạt và Trinket bẻ cong tầm đánh.',
      starterBadge: 'Tặng Sẵn Khi Đăng Nhập',
      unlockBadge: 'Sưu Tầm / Thắng 10 Trận',
      passiveLabel: 'Nội Tại Độc Quyền',
      moveLabel: 'Kỹ Năng Di Chuyển (0 SP • Instant)',
      classSkillLabel: 'Kỹ Năng Hệ',
      weaponsLabel: 'Vũ Khí Chuyển Đổi',
      patternToggleMove: 'Sơ Đồ Di Chuyển',
      patternToggleAttack: 'Tầm Đánh Vũ Khí',
      trinketsTitle: 'Trang Bị Trinket Đa Dụng (Ô Trang Bị Thứ 4)',
      trinketsSub: 'Thay đổi tầm ảnh hưởng của bất kỳ tướng nào trong 10 Instant — chọn đánh xa hơn hay cơ động hơn.',
    },
    modes: {
      eyebrow: 'ĐẤU TRƯỜNG & CHIẾN DỊCH',
      title: '4 Chế Độ Chơi & Thang 7 Bậc Rank Elo',
      subtitle:
        'Mọi trận đấu — từ PvP đến Cốt truyện — đều chạy trên Headless Dedicated Server khởi tạo riêng, đảm bảo luật chơi đồng nhất và không thể can thiệp từ client.',
      list: [
        {
          name: 'Ranked PvP (1v1)',
          tag: 'Đấu Hạng Elo / LP',
          desc: 'Đọ trí 1v1 trên bàn cờ 9×7. Thắng cộng +24–25 LP, ghép trận công bằng (±100 LP mở rộng mỗi 10s) và bảo vệ sàn 0 LP.',
        },
        {
          name: 'Unranked PvP',
          tag: 'Đấu Thường Tự Do',
          desc: 'Thử nghiệm đội hình 5 tướng, vũ khí và combo Trinket mới với người chơi thật mà không lo mất điểm Rank.',
        },
        {
          name: 'Friendly Match',
          tag: 'Mời Bạn Real-Time',
          desc: 'Kết bạn, xem trạng thái online, chat trực tiếp trong game và gửi lời mời giao hữu tức thì.',
        },
        {
          name: 'Story Campaign (Ch.0 – Ch.4)',
          tag: 'PvE Đấu Bot AI Server',
          desc: 'Đồng hành cùng Varek & Chỉ huy Reinhardt qua các màn hướng dẫn trực quan và thử thách AI 4 nhóm hành vi.',
        },
      ],
      ladderTitle: 'Chinh Phục 7 Bậc Rank Từ Beginner Đến Union',
      ladderSub: 'Mỗi bậc cách nhau 100 LP, tái hiện hành trình thống nhất Divine Eye Realm của Varek.',
    },
    story: {
      eyebrow: 'THẾ GIỚI & CỐT TRUYỆN',
      title: 'Biên Niên Sử Divine Eye Realm',
      subtitle:
        'Bước vào vùng đất chìm trong chiến tranh, nơi nhìn trước dòng thời gian 0.3 giây quyết định sinh tử của cả đội quân.',
    },
    howItWorks: {
      eyebrow: 'SẴN SÀNG TRONG 3 PHÚT',
      title: 'Cách Bắt Đầu Chơi Pactkeeper',
      steps: [
        {
          num: '01',
          title: 'Tải Bản PC Siêu Nhẹ',
          desc: 'Tải gói Demo 0.901 (~128 MB ZIP). Giải nén và mở PACTKEEPER.exe chơi ngay — không cần launcher nặng nề.',
        },
        {
          num: '02',
          title: 'Đăng Nhập Google 1 Chạm',
          desc: 'Xác thực an toàn qua Google OAuth 2.0. Nhận ngay 5 tướng khởi đầu, 6 vũ khí và 3 trinket sẵn sàng đánh Rank.',
        },
        {
          num: '03',
          title: 'Qua Chương 0 & Leo Rank PvP',
          desc: 'Hoàn thành hướng dẫn 2–5 phút cùng Reinhardt, xếp đội hình 5 tướng và bước vào đấu trường 1v1.',
        },
      ],
    },
    fairness: {
      eyebrow: 'CÔNG BẰNG & HẠ TẦNG',
      title: 'Không Pay-to-Win. 100% Xử Lý Phía Server.',
      subtitle:
        'Được thiết kế chuẩn mực cho game chiến thuật đối kháng trên nền tảng ASP.NET Core, MongoDB và Unity Dedicated Server.',
      cards: [
        {
          title: 'Luật Chiến Đấu Bình Đẳng',
          desc: 'Không có gói nạp nào thay đổi luật combat. Mọi lớp tướng, kỹ năng, nội tại đều mở cho tất cả — tặng sẵn 5/6 tướng ngày đầu.',
        },
        {
          title: 'Gacha & Nhiệm Vụ Minh Bạch',
          desc: 'Cày Gem miễn phí qua chuỗi nhiệm vụ (Thắng 3 trận → 500 Gem; Thắng 10 trận → Tướng Druid). Quay Gacha phía server, công khai tỷ lệ & quy đổi đồ trùng.',
        },
        {
          title: 'Dedicated Server Chống Hack',
          desc: 'Mỗi trận đấu khởi tạo 1 máy chủ Unity độc lập kiểm duyệt toàn bộ nước đi, nội tại và sát thương.',
        },
        {
          title: 'Kết Nối Lại Trong 60 Giây',
          desc: 'Rớt mạng giữa trận? Mở lại game trong 60 giây để đồng bộ nguyên trạng bàn cờ từ MongoDB và chiến tiếp.',
        },
      ],
      topupNote: 'Hỗ trợ nạp Gem bằng VND an toàn, minh bạch qua PayOS VietQR.',
      topupBtn: 'Mở Cổng Nạp Gem',
    },
    faq: {
      eyebrow: 'CẤU HÌNH & GIẢI ĐÁP',
      title: 'Yêu Cầu Hệ Thống & Câu Hỏi Thường Gặp',
      specsTitle: 'Cấu Hình Windows PC',
      specs: [
        { label: 'Hệ Điều Hành', value: 'Windows 10 / 11 (64-bit)' },
        { label: 'Dung Lượng', value: '~128 MB (Mục tiêu < 150 MB)' },
        { label: 'Engine', value: 'Unity 6 (Bản 2D tối ưu nhẹ)' },
        { label: 'Điều Khiển', value: 'Chuột Trái (Thao tác) & Chuột Phải (Xem chi tiết)' },
        { label: 'Kết Nối', value: 'Internet ổn định (PvP Online & Đồng bộ cốt truyện)' },
        { label: 'Tài Khoản', value: 'Tài khoản Google (OAuth 2.0)' },
      ],
      items: [
        {
          q: 'Pactkeeper có thực sự miễn phí không?',
          a: 'Có! Bạn có thể tải và chơi cả chế độ Cốt truyện lẫn Ranked 1v1 PvP hoàn toàn miễn phí. Tài khoản mới nhận ngay 5/6 tướng, 6 vũ khí và 3 trinket để vào đấu hạng ngay lập tức.',
        },
        {
          q: 'Mỗi trận PvP kéo dài bao lâu?',
          a: 'Trung bình từ 15–30 phút (15 giây/tướng sẵn sàng + quỹ 200 giây Overtime). Riêng màn hướng dẫn Chương 0 chỉ mất 2–5 phút.',
        },
        {
          q: 'Mình có thể rủ bạn bè đánh riêng không?',
          a: 'Hoàn toàn được! Bạn có thể kết bạn, xem trạng thái online, chat trực tiếp trong game và gửi lời mời Friendly Match tức thì.',
        },
        {
          q: 'Nếu bị mất mạng giữa trận thì sao?',
          a: 'Hệ thống giữ trận trong 60 giây. Chỉ cần mở lại game trong thời gian này, client sẽ tự động đồng bộ lại chính xác bàn cờ hiện tại từ server.',
        },
        {
          q: 'Game có bản điện thoại hay macOS chưa?',
          a: 'Hiện tại Pactkeeper tối ưu cho Windows PC (Unity 6) với thao tác chuột Trái/Phải chuẩn chiến thuật. Các nền tảng khác sẽ được cân nhắc ở giai đoạn mở rộng.',
        },
      ],
    },
    finalCta: {
      title: 'Sẵn Sàng Lập Giao Ước?',
      subtitle: 'Tải ngay bản Windows PC siêu nhẹ (~128 MB) và khẳng định bản lĩnh chiến thuật trên bàn cờ 9×7 hôm nay.',
      btn: 'Tải Pactkeeper v0.901 Ngay',
    },
    footer: {
      tagline: 'Game 2D Chiến Thuật PvP Thời Gian Thực với cơ chế xử lý hoàn toàn phía Server.',
      capstone: 'Đại học FPT — Đồ án tốt nghiệp SEP490 • Nhóm GFA26SE91 • Mã dự án FA26SE046',
      team: 'Studio Lomzom: Nguyễn Bách Hiệp, Lê Vũ Văn, Võ Hoàng Thắng, Lê Cao Khánh Hoàng, Lê Nguyễn Tuấn Khoa',
      supervisor: 'Giảng viên hướng dẫn: Phạm Thành Trí',
      rights: '© 2026 Pactkeeper / Studio Lomzom. Đồ án SEP490.',
    },
    downloadModal: {
      title: 'Tải Pactkeeper (Windows PC)',
      version: 'Phiên bản Demo 0.901 • 127.73 MB (.zip)',
      readyMsg: 'Đường dẫn tải trực tiếp đã sẵn sàng.',
      noLinkMsg:
        'Biến môi trường VITE_DOWNLOAD_URL chưa được cấu hình cho bản xem trước này. Bạn có thể giải nén trực tiếp file SEP490/Demo/Demo 0.901.zip hoặc gắn link GitHub Releases / Google Drive vào .env trước khi deploy Vercel.',
      stepsTitle: 'Hướng dẫn cài đặt nhanh:',
      steps: [
        'Tải và giải nén file Demo 0.901.zip vào thư mục bất kỳ trên Windows 10/11.',
        'Chạy file PACTKEEPER.exe (tổng dung lượng nhẹ dưới 150 MB).',
        'Đăng nhập bằng Google và hoàn thành Chương 0 để mở khóa Ranked PvP.',
      ],
      directBtn: 'Bắt Đầu Tải Xuống',
      closeBtn: 'Đóng',
    },
  },
} as const;

export type TranslationDict = (typeof TRANSLATIONS)[Lang];
