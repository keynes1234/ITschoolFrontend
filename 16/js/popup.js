function openPopup() {
  let newWin = window.open("notice.html", "pop", "width=500", "height=400");
  // newWin이 null이면 팝업을 실행하지 못하므로 알림을 띄운다
  if (newWin == null) {
    alert("팝업이 차단되어 있습니다. 팝업 차단을 해제해 주세요.");
  }
  // 팝업창을 좌상단으로부터 100 , 100만큼 띄운다
  newWin.moveBy(100, 100);
}

function getCookie(name) {
  // nameeq = popupShown =
  let nameEq = name + "=";
  // ['popupShown=n']
  let cookieArray = document.cookie.split("; ");

  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    // 'popupShown ='는 'popupShown = n' 을 포함함
    if (c.indexOf(nameEq) === 0) {
      // 'popupShown = n'에서 'popupShown ='를 빼면 n만남음 n을 return
      return c.substring(nameEq.length, c.length);
    }
  }

  return null;
}

function setCookie(name, value, days) {
  let date = new Date();
  // 오늘 날짜에서 하루 더한값을 받아와 set해준다
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  // 받아온 날짜를 UTC 표준시 기준으로 변경, 문자열 취급한다
  let expires = "expires" + date.toUTCString();
  // 쿠키값을 세팅해준다
  document.cookie = name + "=" + value + ";Expires=" + expires + ";path=/";
}
