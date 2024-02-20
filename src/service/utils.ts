export const CODE = {
    SUCCESS: 200,
    ERROR: 500,
}

export const generateDuplicateName = () => {
    const nameArr = ['陈','金', '花', '飞', '鼠', '牛', '羊','蛇','马','猴','鸡','龙','兔','虎','猪','狗', '浩', '浪', '朗', '赫', '罗', '洛']
    const random =  nameArr[Math.floor(Math.random() * nameArr.length)]
    return `${random}${random}`
}

export const generateDuplicateAvatar = () => {
    const avatarArr = ['https://s1.vika.cn/space/2023/11/10/1a25d779e95a400193b7a84d1ba835a4', 'https://s1.vika.cn/space/2023/11/10/2db01aaf732445a3b81e45f1b7cd09b8', 'https://s1.vika.cn/space/2023/11/10/1a25d779e95a400193b7a84d1ba835a4', 'https://s1.vika.cn/space/2023/11/10/5453d95a22f343e1b2e6470164c46931', 'https://s1.vika.cn/space/2023/11/10/f83ef113185748f4ac2a825ed684ffee', 'https://s1.vika.cn/space/2023/11/10/e32ee6e5e2ac4a7da9392d2912fc7937', 'https://s1.vika.cn/space/2023/11/10/e9192d33f82c449e99b61b5487583997', 'https://s1.vika.cn/space/2023/11/10/358a1ac12cb64ba9815dc2133d70049a', 'https://s1.vika.cn/space/2023/11/10/d29f646374c547a3aa960576e6609608', 'https://s1.vika.cn/space/2023/11/10/d2ad4cefe4b245418dd8a752926894a6', 'https://s1.vika.cn/space/2023/11/10/15fe6e9cb333414ba275171e36f4315d', 'https://s1.vika.cn/space/2023/11/10/96ca8b79273b45ff9b266c9acd804448', 'https://s1.vika.cn/space/2023/11/10/2e802639747041f888868ba2259f5d1a', 'https://s1.vika.cn/space/2023/11/10/fc7a1539a1c249e5909a22c124c09c0f', 'https://s1.vika.cn/space/2023/11/10/d9dcad106ec34d6893e7c981e46ab101', 'https://s1.vika.cn/space/2023/11/10/6b7a6f071dd34fb4893d4fb15e1cc1e7']
    return avatarArr[Math.floor(Math.random() * avatarArr.length)]
}

export const generateRoomNumber = () => {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var letter = letters[Math.floor(Math.random() * letters.length)];
    var number = [];
    for (var i = 0; i < 9; i++) {
      number.push(Math.floor(Math.random() * 10));
    }
    return letter + number.join('');
  }