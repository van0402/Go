// Tạm ẩn các mục chưa thiết kế khỏi menu admin.
// Muốn hiện lại tất cả: đặt ADMIN_SHOW_ALL=true trong .env (hoặc xoá dòng `hidden` ở từng mục).
// Lưu ý: chỉ ẩn khỏi menu, vẫn vào được bằng địa chỉ trực tiếp, dữ liệu không bị ảnh hưởng.
export const hiddenInAdmin = (): boolean => process.env.ADMIN_SHOW_ALL !== 'true'
