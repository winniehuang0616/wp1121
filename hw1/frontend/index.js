const itemTemplate = document.querySelector("#item-template");
const diaryList = document.querySelector("#diarys");
const apiRoot = "http://localhost:8000/api";
const daylist = ["日", "一", "二", "三", "四", "五", "六"];
let edit = false;
let cur_click;

async function main() {
  setupEventListeners();
  try {
    const diarys = await getDiarys();
    diarys.forEach((diary) => renderDiary(diary));
  } catch (error) {
    alert("Failed to load diarys!");
  }
}

function setupEventListeners() {
  const addIcon = document.querySelector("#icon-add");
  const searchTopic = document.getElementById("search-topic");
  const searchEmotion = document.getElementById("search-emotion");
  const searchAdd = document.getElementById("search-add");
  const diaryTime = document.querySelector("#input-time");
  const diaryTopic = document.querySelector("#input-topic");
  const diaryEmotion = document.querySelector("#input-emotion");
  const diaryContent = document.querySelector("#input-content");
  const createBtn = document.querySelector("#input-add");
  const cancleBtn = document.querySelector("#input-cancle");

  addIcon.addEventListener("click", () => {
    edit = false;
    diaryTime.value = getTime();
    document.getElementById("diary-container").style.display = "block";
  });

  searchAdd.addEventListener("click", async () => {
    const diarySearch = await search(searchTopic.value, searchEmotion.value);
    //delete all element
    const divs = diaryList.querySelectorAll("div");
    divs.forEach((div) => div.remove());
    console.log("diarySearch: ", diarySearch);
    if (diarySearch.length === 0) {
      document.getElementById("none").style = "block";
    }
    diarySearch.forEach((diary) => renderDiary(diary));
  });

  diaryTime.addEventListener("change", function () {
    const dateObj = diaryTime.value.split(/[./ ]+/); //list
    console.log(dateObj[0], dateObj[1], dateObj[2], dateObj[3]);
    var limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //每月日期上限
    var theYear = parseInt(dateObj[0]);
    var theMonth = parseInt(dateObj[1]);
    var theDay = parseInt(dateObj[2]);
    var isLeap = new Date(theYear, 1, 29).getDate() === 29; // 是否為閏年?

    if (isLeap) {
      limitInMonth[1] = 29;
    } // 若為閏年，最大日期限制改為 29

    // 比對該日是否超過每個月份最大日期限制
    if (
      theDay > limitInMonth[theMonth - 1] ||
      theYear > 2023 ||
      theMonth < 1 ||
      theMonth > 12
    ) {
      alert("無效日期，請修正");
      diaryTime.value = getTime();
    } else if (!theYear || !theMonth || !theDay || !dateObj[3]) {
      diaryTime.value = getTime();
    } else {
      var year = theYear.toString();
      var month = theMonth.toString().padStart(2, "0");
      var day = theDay.toString().padStart(2, "0");
      var weekday = dateObj[3];
      diaryTime.value = `${year}.${month}.${day} ${weekday}`;
    }
  });

  cancleBtn.addEventListener("click", () => {
    diaryTime.value = "";
    diaryTopic.value = "";
    diaryEmotion.value = "";
    diaryContent.value = "";
    document.getElementById("diary-container").style.display = "none";
  });

  createBtn.addEventListener("click", async () => {
    if (edit == false) {
      const time = diaryTime.value;
      const topic = diaryTopic.value;
      const mood = diaryEmotion.value;
      const content = diaryContent.value;
      if (!time) {
        alert("Please enter a diary time!");
        return;
      }
      if (!topic) {
        alert("Please select a diary topic!");
        return;
      }
      if (!mood) {
        alert("Please select a diary mood!");
        return;
      }
      if (!content) {
        alert("Please enter some diary content!");
        return;
      }
      document.getElementById("diary-container").style.display = "none";
      try {
        const diary = await createDiary({ time, topic, mood, content });
        renderDiary(diary);
      } catch (error) {
        alert("Failed to create diary!");
        return;
      }
      diaryTime.value = "";
      diaryTopic.value = "";
      diaryEmotion.value = "";
      diaryContent.value = "";
    }
  });
}

async function search(topic, mood) {
  const response = await fetch(
    `${apiRoot}/diarys/search?topic=${topic}&mood=${mood}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  console.log("search result:", data);
  return data;
}

function getTime() {
  let today = new Date();
  let year = today.getFullYear();
  // 至少有兩位數，不足補 0
  let month = (today.getMonth() + 1).toString().padStart(2, "0");
  let day = today.getDate().toString().padStart(2, "0");
  let weekday = daylist[today.getDay()];
  let todaystr = `${year}.${month}.${day} (${weekday})`;
  return todaystr;
}

function renderDiary(diary) {
  const item = createDiaryElement(diary);
  diaryList.appendChild(item);
  console.log("adding element");
}

function createDiaryElement(diary) {
  const item = itemTemplate.content.cloneNode(true);
  console.log("cloning node");
  const container = item.querySelector(".diary-item");
  container.id = diary.id;
  const time = item.querySelector("div.diary-time");
  time.innerText = diary.time;
  time.dataset.id = diary.id;
  const topic = item.querySelector("div.diary-topic");
  topic.innerText = diary.topic;
  topic.dataset.id = diary.id;
  const mood = item.querySelector("div.diary-emotion");
  mood.innerText = diary.mood;
  mood.dataset.id = diary.id;
  const content = item.querySelector("div.diary-content");
  content.innerText = diary.content;
  content.dataset.id = diary.id;
  const edit = item.querySelector("button.diary-edit");
  edit.dataset.id = diary.id;
  edit.addEventListener("click", () => {
    cur_click = diary.id;
    editDiaryElement(diary.id);
    return;
  });
  console.log("creating element");
  return item;
}

async function editDiaryElement(id) {
  console.log("which diary:", id);
  edit = true;
  //把要編輯的日記本內容放進 input 欄位
  const item = document.getElementById(`${id}`);
  const time = item.querySelector(".diary-time");
  const topic = item.querySelector(".diary-topic");
  const mood = item.querySelector(".diary-emotion");
  const content = item.querySelector(".diary-content");
  const editTime = document.querySelector("#input-time");
  const editTopic = document.querySelector("#input-topic");
  const editEmotion = document.querySelector("#input-emotion");
  const editContent = document.querySelector("#input-content");
  const editcreateBtn = document.querySelector("#input-add");
  const editcancleBtn = document.querySelector("#input-cancle");
  editTime.value = time.innerText;
  editTopic.value = topic.innerText;
  editEmotion.value = mood.innerText;
  editContent.value = content.innerText;
  document.getElementById("diary-container").style.display = "block";

  editcancleBtn.addEventListener("click", () => {
    editTime.value = "";
    editTopic.value = "";
    editEmotion.value = "";
    editContent.value = "";
    document.getElementById("diary-container").style.display = "none";
  });

  //把 input 的內容傳給後端
  editcreateBtn.addEventListener("click", async () => {
    if (edit == true && id == cur_click) {
      document.getElementById("diary-container").style.display = "none";
      let time_e = editTime.value;
      let topic_e = editTopic.value;
      let mood_e = editEmotion.value;
      let content_e = editContent.value;
      if (!time_e) {
        alert("Please enter a diary time!");
        return;
      }
      if (!topic_e) {
        alert("Please select a diary topic!");
        return;
      }
      if (!mood_e) {
        alert("Please select a diary mood!");
        return;
      }
      if (!content_e) {
        alert("Please enter some diary content!");
        return;
      }
      console.log("cur:", cur_click);

      try {
        console.log("edit:", id);
        const response = await fetch(`${apiRoot}/diarys/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ time_e, topic_e, mood_e, content_e }),
        });

        //把後端返回的資料寫進前端日記本
        const diary = await response.json();
        time.innerText = diary.time;
        topic.innerText = diary.topic;
        mood.innerText = diary.mood;
        content.innerText = diary.content;
      } catch (error) {
        alert("Failed to edit diary!");
        return;
      }
      editTime.value = "";
      editTopic.value = "";
      editEmotion.value = "";
      editContent.value = "";
      edit = false;
    }
  });
  return;
}

async function getDiarys() {
  const response = await fetch(`${apiRoot}/diarys`);
  const data = await response.json();
  console.log("getting diarys");
  return data;
}

async function createDiary(diary) {
  const response = await fetch(`${apiRoot}/diarys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diary),
  });
  const data = await response.json();
  return data;
}

main();
