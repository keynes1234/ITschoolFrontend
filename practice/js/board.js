const pageSize = 10; // 한 페이지에 10개 게시물
const pagesPerSet = 10; //한 세트당 페이지 수

let posts;
let totalPage = Number.MAX_VALUE;
let currentPage;
let startPage;
let endPage;

const $tbody = $("tbody");
const $pagination = $(".pagination");

$(document).ready(function () {
  loadPage(1);
});

function reset() {
  $tbody.empty();
  $pagination.empty();
}

function loadPage(number) {
  if (number >= 1 && number <= totalPage) {
    currentPage = number;
  } else if (number < 1) {
    alert("이전 페이지가 없습니다.");
  } else {
    alert("다음 페이지가 없습니다.");
  }

  //버전 1
  $.ajax({
    type: "get",
    //  async: false,     기본값 true(비동기)
    url: "https://koreanjson.com/posts",
    success: function (data) {
      // console.log("callback 함수 종료");
      // data.sort((a, b) => data.id - a.id);
      posts = data.reverse();

      if (posts) {
        reset(); //버전 3
        setBoard(); //버전 1
        setPagination(); //버전 2
      }
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });

  // console.log("loadPage 함수 종료");
}

function setBoard() {
  totalPage = Math.ceil(posts.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  posts.slice(startIndex, endIndex).forEach((post) => {
    const $tr = $("<tr></tr>");
    const $tdId = $("<td></td>").text(post.id);
    const $tdTitle = $("<td></td>").text(post.title);
    const $tdCreatedAt = $("<td></td>").text(
      new Date(post.createdAt).toLocaleDateString()
    );
    const $tdDelete = $(
      '<td><button class="btn btn-danger" onclick="deleteRow(this)">삭제</a></td>'
    );

    $tr.append($tdId, $tdTitle, $tdCreatedAt, $tdDelete);
    $tbody.append($tr);
  });
}

function deleteRow(e) {
  // e.parentElement.parentElement.remover;
  $(e).closest("tr").remove();
}

function setPagination() {
  startPage = Math.max(
    1,
    Math.floor((currentPage - 1) / pagesPerSet) * pagesPerSet + 1
  );
  endPage = Math.min(totalPage, startPage + pagesPerSet - 1);

  const $previous = $(`<li><a href="javascript:loadPage(${startPage - 10})"
    aria-label="Previous"><span aria-hidden="true">&laquo;</span></a><li>`);
  const $next = $(`<li><a href="javascript:loadPage(${endPage + 1})"
    aria-label="Next"><span aria-hidden="true">&raquo;</span></a><li>`);

  for (let i = startPage; i <= endPage; i++) {
    const $page = $(
      `<li ${
        currentPage === i ? 'class="active"' : ""
      }><a href="javascript:loadPage(${i})">${i}</a></li>
        `
    );

    $pagination.append($page);
  }
  $pagination.prepend($previous);
  $pagination.append($next);
}
