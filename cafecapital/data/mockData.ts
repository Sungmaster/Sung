import type {
  MenuItem,
  MarketIndex,
  NewsArticle,
  QuickNews,
  ReportCard,
  StockSignal,
  PricingPlan,
  MediaItem,
  AboutCard,
} from "@/types";

export const menuItems: MenuItem[] = [
  {
    label: "Tin mới",
    href: "/tin-moi",
    children: [
      { label: "Kinh tế vĩ mô", href: "/tin-moi/kinh-te-vi-mo" },
      { label: "Thị trường", href: "/tin-moi/thi-truong" },
      { label: "Doanh nghiệp", href: "/tin-moi/doanh-nghiep" },
    ],
  },
  {
    label: "Báo cáo",
    href: "/bao-cao",
    children: [
      { label: "Báo cáo ngày", href: "/bao-cao/ngay" },
      { label: "Báo cáo nhanh", href: "/bao-cao/nhanh" },
      { label: "Báo cáo tuần", href: "/bao-cao/tuan" },
    ],
  },
  {
    label: "Phân tích",
    href: "/phan-tich",
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Livestream", href: "/media/livestream" },
      { label: "Bản tin định kỳ", href: "/media/ban-tin-dinh-ky" },
    ],
  },
  {
    label: "Về chúng tôi",
    href: "/ve-chung-toi",
    children: [
      { label: "Cafe Cap News", href: "/ve-chung-toi/news" },
      { label: "Tuyển dụng", href: "/ve-chung-toi/tuyen-dung" },
      { label: "Chuyện nghề", href: "/ve-chung-toi/chuyen-nghe" },
    ],
  },
];

export const marketIndexes: MarketIndex[] = [
  { symbol: "VNINDEX", name: "VN-Index", value: "1,285.63", changePercent: 0.82 },
  { symbol: "VN30", name: "VN30", value: "1,342.20", changePercent: 0.65 },
  { symbol: "HNX", name: "HNX", value: "243.18", changePercent: -0.21 },
  { symbol: "UPCOM", name: "UPCOM", value: "98.45", changePercent: 0.34 },
  { symbol: "GOLD", name: "Vàng (oz)", value: "2,365", changePercent: 0.41 },
  { symbol: "BRENT", name: "Dầu Brent", value: "84.20", changePercent: -0.32 },
  { symbol: "DXY", name: "DXY", value: "104.50", changePercent: 0.12 },
  { symbol: "USD/VND", name: "USD/VND", value: "25,390", changePercent: -0.08 },
  { symbol: "BTC", name: "Bitcoin", value: "68,420", changePercent: 1.94 },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    category: "Thị trường",
    title: "VN-Index giữ nền tích lũy, dòng tiền tiếp tục xoay vòng sang nhóm vốn hóa lớn",
    summary:
      "Phiên giao dịch hôm nay chứng kiến lực cầu duy trì ổn định tại vùng 1.280 – 1.290 điểm. Dòng tiền nội ngành ngân hàng và bất động sản là hai trụ chính neo giữ chỉ số.",
    publishedAt: "09:42, 24/05/2026",
    author: "Nhóm Phân tích Cafe Capital",
    source: "Cafe Capital",
  },
  {
    id: "2",
    category: "Kinh tế vĩ mô",
    title: "Tỷ giá ổn định trở lại, áp lực nhập khẩu hạ nhiệt trong ngắn hạn",
    summary:
      "Sau giai đoạn biến động mạnh đầu tháng, tỷ giá USD/VND đã quay về vùng ổn định. Áp lực từ phía nhập khẩu giảm nhờ cán cân thương mại cải thiện.",
    publishedAt: "08:15, 24/05/2026",
    author: "Bộ phận Vĩ mô",
    source: "Cafe Capital",
  },
  {
    id: "3",
    category: "Doanh nghiệp",
    title: "Nhóm ngân hàng duy trì vai trò neo chỉ số trong mùa báo cáo quý",
    summary:
      "Kết quả kinh doanh Q1/2026 của các ngân hàng lớn tiếp tục ghi nhận tăng trưởng lợi nhuận hai chữ số. Chất lượng tài sản cải thiện là điểm sáng đáng chú ý.",
    publishedAt: "07:30, 24/05/2026",
    author: "Phân tích ngành",
    source: "Cafe Capital",
  },
  {
    id: "4",
    category: "Thị trường",
    title: "Khối ngoại mua ròng phiên thứ 5 liên tiếp, tập trung vào VHM và CTG",
    summary:
      "Nhà đầu tư nước ngoài tiếp tục giải ngân vào nhóm bluechip với giá trị mua ròng đạt 320 tỷ đồng. Xu hướng này cho thấy dòng tiền ngoại đang quay lại thị trường.",
    publishedAt: "15:10, 23/05/2026",
    author: "Nhóm Phân tích",
    source: "Cafe Capital",
  },
  {
    id: "5",
    category: "Kinh tế vĩ mô",
    title: "FED giữ nguyên lãi suất, thị trường toàn cầu phản ứng tích cực",
    summary:
      "FOMC quyết định giữ lãi suất ở mức 5.25-5.50% trong cuộc họp tháng 5. Phát biểu của Chủ tịch Powell mang tín hiệu trung lập, thị trường định giá 60% khả năng cắt giảm vào tháng 9.",
    publishedAt: "10:00, 23/05/2026",
    author: "Bộ phận Vĩ mô",
    source: "Cafe Capital",
  },
];

export const quickNews: QuickNews[] = [
  {
    id: "q1",
    content: "VN-Index +10.5 điểm (+0.82%), thanh khoản HoSE đạt 18,340 tỷ đồng phiên sáng.",
    publishedAt: "11:30",
  },
  {
    id: "q2",
    content: "HPG tăng mạnh 3.2% sau thông tin giá thép xây dựng trong nước điều chỉnh tăng.",
    publishedAt: "10:55",
  },
  {
    id: "q3",
    content: "Ngân hàng Nhà nước bơm 8,500 tỷ qua kênh OMO kỳ hạn 7 ngày, lãi suất 4.5%.",
    publishedAt: "10:20",
  },
  {
    id: "q4",
    content: "Chỉ số PMI sản xuất tháng 5 đạt 52.3, cao nhất trong 8 tháng – tín hiệu tích cực cho ngành xuất khẩu.",
    publishedAt: "09:45",
  },
  {
    id: "q5",
    content: "VCB và MBB dẫn đầu nhóm ngân hàng tăng, bổ sung tích cực cho chỉ số buổi sáng.",
    publishedAt: "09:10",
  },
];

export const reportCards: ReportCard[] = [
  {
    id: "r1",
    title: "Báo cáo ngày",
    access: "Free",
    description: "Tóm tắt phiên giao dịch, diễn biến chỉ số và điểm nhấn dòng tiền nổi bật trong ngày.",
    features: [
      "Tóm tắt phiên hôm nay",
      "Diễn biến VN-Index, VN30, HNX",
      "Dòng tiền nổi bật",
      "Top tăng/giảm mạnh",
    ],
    cta: "Đọc báo cáo",
    locked: false,
  },
  {
    id: "r2",
    title: "Báo cáo nhanh",
    access: "Silver+",
    description: "Phân tích nhanh doanh nghiệp, chính sách và sự kiện thị trường phát sinh trong ngày.",
    features: [
      "Phân tích doanh nghiệp theo sự kiện",
      "Cập nhật chính sách ảnh hưởng thị trường",
      "Sự kiện nóng & tác động ngắn hạn",
      "Vùng hành động gợi ý",
    ],
    cta: "Nâng cấp để xem",
    locked: true,
  },
  {
    id: "r3",
    title: "Báo cáo tuần",
    access: "Silver+",
    description: "Góc nhìn chiến lược tuần: thị trường, vĩ mô, ngành và cổ phiếu trọng điểm.",
    features: [
      "Phân tích thị trường toàn diện",
      "Phân tích vĩ mô trong & ngoài nước",
      "Phân tích ngành nổi bật tuần",
      "Điểm nhấn cổ phiếu đáng theo dõi",
    ],
    cta: "Xem bản demo",
    locked: true,
  },
];

export const stockSignals: StockSignal[] = [
  { ticker: "VCB", price: "92.4", changePercent: 1.2, volume: "2.1M", signal: "Tích cực" },
  { ticker: "FPT", price: "128.6", changePercent: 0.8, volume: "3.4M", signal: "Theo dõi" },
  { ticker: "HPG", price: "29.1", changePercent: -0.4, volume: "12.8M", signal: "Trung lập" },
  { ticker: "VHM", price: "48.7", changePercent: 2.1, volume: "8.6M", signal: "Tích cực" },
  { ticker: "MBB", price: "24.3", changePercent: 1.5, volume: "15.2M", signal: "Tích cực" },
  { ticker: "TCB", price: "38.9", changePercent: -1.2, volume: "6.3M", signal: "Rủi ro" },
  { ticker: "BID", price: "47.2", changePercent: 0.4, volume: "4.1M", signal: "Trung lập" },
  { ticker: "SSI", price: "31.5", changePercent: 3.2, volume: "9.7M", signal: "Tích cực" },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Bắt đầu tiếp cận thị trường với nội dung cơ bản.",
    features: [
      "5 tin mới nhất mỗi ngày",
      "Báo cáo ngày – tóm tắt phiên",
      "Ticker chỉ số thị trường",
      "Xem một phần phân tích kỹ thuật",
    ],
    cta: "Bắt đầu miễn phí",
    ctaHref: "/dang-ky",
  },
  {
    id: "silver",
    name: "Hạng Bạc",
    description: "Truy cập đầy đủ báo cáo, phân tích và dữ liệu kỹ thuật.",
    features: [
      "Tất cả quyền của gói Free",
      "Báo cáo nhanh không giới hạn",
      "Báo cáo tuần đầy đủ",
      "Tải PDF/DOCX báo cáo",
      "Phân tích kỹ thuật toàn bộ mã CP",
      "Lưu trữ tin tức 30 ngày",
    ],
    cta: "Đăng ký Hạng Bạc",
    ctaHref: "https://zalo.me/cafecapital",
    highlighted: true,
  },
  {
    id: "gold",
    name: "Hạng Vàng",
    description: "Chiến lược chuyên sâu và báo cáo theo yêu cầu.",
    features: [
      "Toàn bộ quyền Hạng Bạc",
      "Order tối thiểu 5 báo cáo/tháng theo yêu cầu",
      "Ưu tiên nhận nội dung chuyên sâu",
      "Cập nhật chiến lược riêng",
      "Hỗ trợ ưu tiên qua Zalo",
    ],
    cta: "Tư vấn gói Vàng",
    ctaHref: "https://zalo.me/cafecapital",
  },
  {
    id: "diamond",
    name: "Hạng Kim Cương",
    description: "Tư vấn 1:1 và chiến lược cá nhân hóa dành cho nhà đầu tư chuyên nghiệp.",
    features: [
      "Toàn bộ quyền Hạng Vàng",
      "Tư vấn 1:1 với chuyên gia Cafe Capital",
      "Chiến lược đầu tư cá nhân hóa",
      "Báo cáo độc quyền theo yêu cầu",
      "Ưu tiên xử lý 24/7",
    ],
    cta: "Liên hệ chuyên gia",
    ctaHref: "https://zalo.me/cafecapital",
    premium: true,
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "m1",
    type: "Livestream",
    title: "Nhận định thị trường tuần 22: Dòng tiền xoay chiều, VN-Index về đâu?",
    expert: "Chuyên gia Trần Minh Khoa",
    publishedAt: "Hôm nay · 20:00",
    duration: "60 phút",
    badge: "Live",
    featured: true,
  },
  {
    id: "m2",
    type: "Bản tin ngày",
    title: "Bản tin chiều 24/05: Nhóm ngân hàng giữ nền, dòng tiền xoay sang thép",
    expert: "Nhóm Phân tích Cafe Capital",
    publishedAt: "24/05/2026 · 15:30",
    duration: "18 phút",
    badge: "Replay",
  },
  {
    id: "m3",
    type: "Cafe chiến lược",
    title: "Chiến lược Q2/2026: Ngành nào dẫn sóng trong chu kỳ hạ lãi suất?",
    expert: "Nguyễn Thành Long, CFA",
    publishedAt: "22/05/2026",
    duration: "45 phút",
    badge: "Replay",
  },
  {
    id: "m4",
    type: "Bản tin định kỳ",
    title: "Bản tin vĩ mô tháng 5: FED, tỷ giá và kịch bản thị trường Việt Nam",
    expert: "Bộ phận Nghiên cứu Vĩ mô",
    publishedAt: "20/05/2026",
    duration: "30 phút",
    badge: "Bản tin",
  },
];

export const aboutCards: AboutCard[] = [
  {
    id: "a1",
    title: "Cafe Cap News",
    description: "Cập nhật từ nội bộ và chương trình dành riêng cho cộng đồng Cafe Capital.",
    items: ["Hoạt động nội bộ", "Chương trình ưu đãi khách hàng", "Sự kiện cộng đồng"],
    href: "/ve-chung-toi/news",
  },
  {
    id: "a2",
    title: "Tuyển dụng",
    description: "Cơ hội nghề nghiệp trong lĩnh vực tài chính, phân tích và truyền thông đầu tư.",
    items: ["Chuyên viên phân tích", "Môi giới chứng khoán", "Content & Truyền thông tài chính"],
    href: "/ve-chung-toi/tuyen-dung",
  },
  {
    id: "a3",
    title: "Chuyện nghề",
    description: "Triết lý đầu tư, kinh nghiệm thực chiến và câu chuyện từ người trong nghề.",
    items: ["Triết lý đầu tư", "Kinh nghiệm thị trường", "Câu chuyện nghề chứng khoán"],
    href: "/ve-chung-toi/chuyen-nghe",
  },
];
