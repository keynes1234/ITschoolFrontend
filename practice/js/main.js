let myStorage = window.localStorage;

window.onload = function () {
  assignToday();
  document.querySelector("#submit-btn").addEventListener("click", saveData);
};

function saveData() {
  let key = document.querySelector("#targetDate").value;

  if(
    // '' 인 경우 false로 간주
    document.querySelector("#title").value &&
   document.querySelector("#content").value &&
   document.querySelector("#targetDate").value
    ){
      let data = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        createdBy: new Date().toLocaleString(),
      };
      
    alert(createContent(key, JSON.stringify(data)) ? "저장 성공" : "저장 실패");

  }else{
    alert("날짜, 제목과 내용은 필수 입니다.");
  }
}

function assignToday() {
  // 오늘 날짜
  const today = new Date();

  // 연도, 월, 일 추출하기
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  // yyyy-mm-dd형식의 문자열로 변환
  const formattedDate = `${year}-${month}-${day}`;

  // input id='targetDate'에 오늘 날짜로 기본 설정
  document.getElementById("targetDate").value = formattedDate;
}

//일기 생성
function createContent(key, value) {
  if (readContent(key)) {
      // 해당 날짜에 데이터가 이미 있을 때
    let needOverwrite = confirm(
      "이미 해당 날짜에 일기가 있습니다. 덮어쓰시겠습니까?"
    );

    if (needOverwrite) {
      //확인을 눌렀을 때
      myStorage.setItem(key, value);
      return true;
    } else {
      //취소를 눌렀을 때
      return false;
    }
  } else {
    // 해당 날짜에 기존 데이터가 없을때
    myStorage.setItem(key, value);
    return true;
  }
  console.log("데이터 저장에 성공했습니다.");
}

//일기 가져오기
function readContent(key) {
  // 해당 키가 존재 하지 않을 때
  if (myStorage.getItem(key) === null) {
    alert("해당 날짜에 일기가 존재하지 않습니다.");
    return null;
  } else {
    return myStorage.getItem(key);
  }
}

//일기 수정하기
function updateContent(key, value) {
  if (!readContent(key)) {
    //수정 -> 덮어쓰기
    console.log("수정할 날짜에 일기가 없습니다. 일기를 생성합니다.");
  }
  return createContent(key, value);
}

//일기 삭제하기
function deleteContent(key) {
  let needDelete = confirm("정말 삭제하시겠습니까?");

  if (needDelete) {
    myStorage.removeItem(key);
    return true;
  } else {
    return false;
  }
}
