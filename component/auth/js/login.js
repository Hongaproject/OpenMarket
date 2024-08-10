const form = document.querySelector("form");
const warning = document.getElementById("warning");
const id = document.getElementById("id");
const pw = document.getElementById("pw");

const userLogin = async (username, password, login_type) => {
  try {
    const res = await axios.post('https://openmarket.weniv.co.kr/accounts/login/', {
      username,
      password,
      login_type
    });
    const status = res.status;
    const data = res.data;
    return {status, data};
  } catch (err) {
    return { status: null, data: null }; 
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = id.value.trim();
  const password = pw.value.trim();

  if (username === ""){
    warning.textContent = "아이디를 입력해주세요.";
    id.focus();
    return;
  }
  if (password === ""){
    warning.textContent = "비밀번호를 입력해주세요.";
    pw.focus();
    return;
  }

  const login_type = "BUYER";
  const { status, data } = await userLogin(username, password, login_type);

  if (status === 200 && data.user_type === "BUYER"){
    localStorage.setItem('token', data.token);
    window.alert("로그인이 되었습니다.");
  } else {
    warning.textContent = "아이디 또는 비밀번호가 틀립니다.";
    pw.value = '';
    pw.focus();
    return;
  }
});
