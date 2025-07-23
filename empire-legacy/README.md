# Empire Legacy - Minecraft Website

Trang web Minecraft với chủ đề Block grass được tạo bởi **RotY**.

## 🌱 Tính năng

- **Thiết kế hiện đại**: Giao diện đẹp mắt với chủ đề khối cỏ xanh mướt
- **Responsive**: Tương thích với mọi thiết bị (desktop, tablet, mobile)
- **Animations**: Hiệu ứng động mượt mà và hấp dẫn
- **Interactive**: Các tính năng tương tác như copy server IP, menu mobile
- **Performance**: Tối ưu hóa tốc độ tải trang

## 📁 Cấu trúc thư mục

```
empire-legacy/
├── index.html          # Trang chủ chính
├── styles.css          # File CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Thư mục chứa hình ảnh
│   └── grass-block.svg # Logo khối cỏ
└── README.md           # File hướng dẫn này
```

## 🚀 Cách sử dụng

1. **Mở trực tiếp**: Double-click vào file `index.html` để mở trong trình duyệt
2. **Local Server**: Sử dụng Live Server extension trong VS Code hoặc chạy local server
3. **Deploy**: Upload toàn bộ thư mục lên hosting để đưa lên internet

## 🎨 Tùy chỉnh

### Thay đổi màu sắc chủ đề
Trong file `styles.css`, tìm và thay đổi các biến màu:
```css
/* Màu chính - xanh lá */
#4CAF50, #2E7D32, #8BC34A

/* Màu phụ - cam */
#FF6B35
```

### Cập nhật thông tin server
Trong file `index.html`, tìm và thay đổi:
```html
<code>play.empirelegacy.net</code>  <!-- Server IP -->
<span>Online - 127/500 người chơi</span>  <!-- Trạng thái server -->
```

### Thêm sections mới
Thêm sections mới vào HTML và styling tương ứng trong CSS.

## 🔧 Tính năng JavaScript

- **Smooth scrolling**: Cuộn mượt giữa các sections
- **Mobile menu**: Menu hamburger cho mobile
- **Parallax effects**: Hiệu ứng parallax cho floating blocks
- **Copy IP**: Click vào server IP để copy
- **Dynamic blocks**: Tạo khối cỏ bay động
- **Keyboard shortcuts**: 
  - `H`: Về trang chủ
  - `Ctrl+Shift+C`: Copy server IP

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🌟 Animations

- **fadeInUp**: Hiệu ứng fade in từ dưới lên
- **float**: Khối cỏ bay lơ lửng
- **pulse**: Hiệu ứng nhấp nháy cho status dot
- **rotate3d**: Xoay 3D cho khối cỏ
- **ripple**: Hiệu ứng sóng khi click button

## 🎯 SEO & Performance

- Semantic HTML structure
- Optimized images (SVG)
- Minified CSS animations
- Fast loading times
- Mobile-first approach

## 📞 Liên hệ

- **Tác giả**: RotY
- **Email**: admin@empirelegacy.net
- **Discord**: EmpireLegacy#1234

## 📄 License

Dự án này được tạo cho mục đích giáo dục và có thể tự do sử dụng và chỉnh sửa.

---

**Lưu ý**: Đây là template website tĩnh. Để có server Minecraft thực sự, bạn cần setup Minecraft server riêng và cập nhật thông tin tương ứng.
