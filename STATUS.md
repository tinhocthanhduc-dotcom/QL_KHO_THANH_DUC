# Kho 145 — sửa tổng nhập/xuất ngày từ App 58 (2026-10-17)

## Phạm vi

Bản vá V10.10.5.2 dựa trên main bb25855, nhánh fix/warehouse145-daily-counters. Không sửa AI_KHO, Finance hoặc Điều phối; chưa ghi dữ liệu Kho thật, không thay tồn hoặc số lượng phiếu cũ.

Nguyên nhân trong code: Transaction Engine vẫn ghi F nhưng chỉ cộng D/E khi ngày đọc từ tiêu đề A1 bằng ngày phiếu. Tiêu đề cũ/trống làm bỏ qua D/E. Chưa trực tiếp xác nhận giá trị A1 hoặc nhật ký thực của 85A trên Google.

## Thay đổi

- Sau khi ghi nhật ký Kho 145, trong cùng ScriptLock, tính lại toàn bộ D/E theo ngày Việt Nam từ NHAT_KY_XNT và NHAT_KY_XNT_BACKUP; dùng quy tắc loại bản trùng hiện có. Không dựa vào ngày tiêu đề, không cộng trên tổng cũ.
- Gồm nhập/xuất/điều chuyển và chênh lệch kiểm kho; phiếu lùi ngày sửa tồn nhưng không cộng vào tổng hôm nay. Các mặt hàng không phát sinh hôm nay có D/E = 0.
- Tiêu đề text có ngày được đổi sang ngày hiện tại, giữ nội dung khác; tiêu đề công thức được giữ nguyên. Không sửa cột F trong thao tác tính lại tổng.
- Chụp toàn bộ D/E và tiêu đề trước cập nhật; lỗi sau projection thì khôi phục cùng tồn và nhật ký. Nếu khôi phục tổng thất bại, đánh dấu NEEDS_RECONCILIATION.
- Hàm ghi Kho 145 kiểu cũ, không có caller, được chặn; mọi phiếu đi qua Transaction Engine hiện có.
- Tên hàng legacy trùng dòng có phát sinh bị chặn để không cộng nhầm. Dòng nhật ký không tìm thấy tên ở TONKHO được đếm trong unmatchedJournalRows của kết quả sửa tổng, không tự đoán theo tên/mã.

## Kiểm chứng

`node --check code.js` và `node --test test/*.test.cjs`: 12/12 đạt. Mô hình chạy các hàm production, gồm Transaction Engine, với sheet/lock/ledger giả lập; không phải số đo hoặc lần ghi Google.

Ca 85A TOPZON: nhật ký xuất 4 và phiếu chuyển xuất 20 cho E = 24; tính lại nhiều lần không cộng trùng. Transfer làm F 100→80; replay giữ F80/E24. Kiểm phiếu nhập, backup trùng, ngày cũ/mới, kiểm kho, tiêu đề trống/công thức, quyền, rollback sau projection và rollback thất bại.

## Áp dụng sau khi chủ duyệt riêng Kho thật

1. Sao lưu code project App Kho 58 và D/E/A1 kho 145; giữ nguyên nhật ký. Triển khai code.js mới cùng Index.html/appsscript.json hiện có (hai file này không đổi).
2. Đăng nhập tài khoản ADMIN của App Kho. Chạy `rebuildWarehouse145DailyCounters` trong editor để sửa các phiếu đã ghi thiếu. Hàm dùng quyền RECONCILE và ScriptLock, không tạo phiếu mới và không sửa F.
3. Kiểm result.success, date, unmatchedJournalRows; đối chiếu D/E với nhật ký hôm nay. Nếu 4 và 20 cùng ngày thì E phải 24. Nếu điều chuyển thuộc ngày trước, không cộng 20 vào hôm nay.
4. Thử phiếu TEST trên bản sao trước, kiểm hai kho, nhật ký, D/E và replay. Chưa chạy Google UAT hoặc sửa số thực 85A trong lượt này.

Quay lại: dùng phiên bản deployment cũ. Nếu cần khôi phục projection D/E, dùng bản sao lưu D/E/A1 và đối chiếu nhật ký; không sửa F, không tạo lại phiếu điều chuyển. Chưa deploy hoặc sửa dữ liệu Kho thật theo yêu cầu trước của chủ.
