# Website Bán Vợt Cầu Lông
## Công nghệ sử dụng
- NodeJS
- ExpressJS
- MongoDB
- Handlebars
- Bootstrap
## Chức năng
Khách hàng
- Login, đăng ký logout, xem sản phẩm, tra cứu sản phẩm, xem giỏ hàng, xóa sản phâm khỏi giỏ, đặt hàng, xem đơn hàng, hủy đơn
Nhân viên
- Quản lý sản phẩm (thêm sửa xóa)
- Quản lý đơn hàng (cập nhật đơn hàng)
Quản trị viên
- Quản lý tài khoản người dùng
- Xem báo cáo thống kê
## Cài đặt
```bash
npm.cmd install express morgan express-handlebars express-session connect-mongo connect-flash mongoose
npm.cmd install --save-dev nodemon
## chạy dự án
npm start
