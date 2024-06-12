const userapi = Array.from({ length: 40 }, (v, i) => ({
  id: i + 1,
  name: `Nguyễn Gia Bảo ${i + 1}`,
  description: `Quận ${Math.floor(Math.random() * 12) + 1}, TP HCM`,
  phone_number: `0865${Math.floor(100000 + Math.random() * 900000)}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i + 1}`,
}));

export default userapi;
