// lib/languages.ts

export const en = {
  title: 'Book Trial Class with alex mahito',
  description: 'Users are permitted to take one trial class within a 2-week period of booking. To book a trial class, select an available slot from the schedule, confirm your details, and proceed with the booking. You will receive an email confirmation with further details upon successful booking.',
  regularDescription: 'You may schedule regular 60-minute classes, with the flexibility to choose a preferred day and time. The number of classes available to book is based on your active subscription. Subsequent classes will automatically recur at the same time each week.',
  fields: {
    timezone: 'Timezone',
    date: 'Date',
    time: 'Time',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    notes: 'Notes',
  },
  placeholders: {
    date: 'Pick a date',
    time: 'Select a date/timezone first',
    selectTime: 'Select a meeting time',
    notes: 'This session is a trial, so feel free to ask questions about our services and let us know your expectations. We want to ensure you get the most out of this experience.',
    regularNotes: 'This is a regular session, and we will be focusing on the planned classes and topics.', // Added this line
  },
  exampleInput: {
    name: 'Trang',
    email: 't16718282@gmail.com',
  },
  fieldOptions: {
    timezone: 'Asia/Bangkok (GMT+7)',
  },
  buttons: {
    cancel: 'Cancel',
    schedule: 'Schedule',
  },
   page: {
    metaTitle: 'Book a trial',
    trialClass: 'Trial Class',
    regularClass: 'Regular Class',
    bookWith: 'Book {eventName} with {teacherName}',
    noTrial: "You don't have a trial class",
    noSlots: '{teacherName} is currently booked up. Please check back later or choose a shorter event.',
    chooseAnotherEvent: 'Choose Another Event',
    notFound: {
      event: 'No events related to the proved information',
      user: 'User not found',
      teacher: 'Teacher not found',
      calendarUser: 'Calendar user not found',
      class: 'Please book the correct class',
    }
  },
  
};

export const vi = {
  title: 'Đặt Lớp Học Thử với alex mahito',
  description: 'Người dùng được phép tham gia một buổi học thử trong vòng 2 tuần kể từ ngày đặt. Để đặt lớp học thử, hãy chọn một khung giờ có sẵn trong lịch, xác nhận thông tin của bạn và tiến hành đặt lịch. Sau khi đặt thành công, bạn sẽ nhận được email xác nhận kèm chi tiết.',
  regularDescription: 'Bạn có thể đặt lịch các buổi học thông thường kéo dài 60 phút, linh hoạt lựa chọn ngày và giờ học ưa thích. Số lượng buổi học có thể đặt phụ thuộc vào gói đăng ký đang hoạt động của bạn. Các buổi học tiếp theo sẽ tự động lặp lại vào cùng thời điểm mỗi tuần.',
  fields: {
    timezone: 'Múi giờ',
    date: 'Ngày',
    time: 'Thời gian',
    yourName: 'Tên của bạn',
    yourEmail: 'Thư điện tử của bạn',
    notes: 'Ghi chú',
  },
  placeholders: {
    date: 'Chọn ngày',
    time: 'Vui lòng chọn ngày/múi giờ trước',
    selectTime: 'Chọn giờ hẹn',
    notes: 'Đây là buổi học thử, vì vậy bạn hãy thoải mái đặt câu hỏi về dịch vụ và cho chúng tôi biết kỳ vọng của bạn. Chúng tôi muốn đảm bảo bạn tận dụng được tối đa trải nghiệm này.',
    regularNotes: 'Đây là buổi học thông thường, và chúng ta sẽ tập trung vào các lớp học và chủ đề đã được lên kế hoạch.', // Added this line
  },
  exampleInput: {
    name: 'Trang',
    email: 't16718282@gmail.com',
  },
  fieldOptions: {
    timezone: 'Châu Á/Bangkok (GMT+7)',
  },
  buttons: {
    cancel: 'Hủy',
    schedule: 'Đặt lịch',
  },
  page: {
    metaTitle: 'Đặt buổi học thử',
    trialClass: 'Lớp Học Thử',
    regularClass: 'Lớp Học Thông Thường', 
    bookWith: 'Đặt {eventName} với {teacherName}',
    noTrial: 'Bạn không có buổi học thử',
    noSlots: '{teacherName} hiện đã kín lịch. Vui lòng kiểm tra lại sau hoặc chọn một sự kiện ngắn hơn.',
    chooseAnotherEvent: 'Chọn Sự kiện Khác',
    notFound: {
      event: 'Không có sự kiện nào liên quan đến thông tin đã cung cấp',
      user: 'Không tìm thấy người dùng',
      teacher: 'Không tìm thấy giáo viên',
      calendarUser: 'Không tìm thấy người dùng lịch',
      class: 'Vui lòng đặt đúng lớp học',
    }
  },
};