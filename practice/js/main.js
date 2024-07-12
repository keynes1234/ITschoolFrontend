const storage = window.localStorage;
document.querySelector("#saveButton").addEventListener("click", saveDiary);

window.onload = function () {
  const diaryContent = $("#diaryContent");

  diaryContent.summernote({
    lang: "ko-KR",
    height: 250,
  });
  setTodayDate();
};

function saveDiary() {
  const date = document.querySelector("#diaryDate").value;
  const title = document.querySelector("#diaryTitle").value;
  const content = diaryContent.val();

  if (date && title && content) {
    const diaryEntry = {
      title: title,
      content: content,
      createdAt: new Date().toLocaleString(),
    };

    if (storage.getItem(date)) {
      if (!confirm("해당 날짜에 이미 일기가 있습니다. 덮어쓰시겠습니까?")) {
        return;
      }
    }

    storage.setItem(date, JSON.stringify(diaryEntry));
    alert("저장 성공");
  } else {
    alert("날짜, 제목과 내용은 필수 입니다.");
  }
}

function setTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  document.getElementById("diaryDate").value = formattedDate;
}
