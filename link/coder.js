const urlCoder = {
  decoder: (s) => {
    let chars = {'https://':'᧤', 'http://':'᧥', '/':'᎓', '.':'᎐', '.com':'᧱', '.ru':'᧴'};
    s = s.replace(/((https|http):\/\/|\.(com|ru)|[\/]|\.)/g, m => chars[m]);
    console.log(s);
    return s;
  },
  encoder: (s) => {
    var ch = {'᧤':'https://', '᧥':'http://', '᎓':'/', '᎐':'.', '᧱':'.com', '᧴':'.ru'};
    s = s.replace(/[᧤᧥^᧱᧴᎓᎐]/g, m => ch[m]);
    console.log(s);
    return s;
  }
};
