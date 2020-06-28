const weeks = ['日', '月', '火', '水', '木', '金', '土'];

// 現在の日時を取得
const date = new Date();
const year = date.getFullYear();
// 月は1月を0と数える
const month = date.getMonth() + 1;
// 月の最初の日を取得
const startDate = new Date(year, month - 1, 1);
// 月の最後の日を取得
const endDate = new Date(year, month, 0);
// 月の末日
const endDayCount = endDate.getDate();
// 前月の最後の日の情報
const lastMonthEndDate = new Date(year, month - 1, 0);
// 前月の末日
const lastMonthendDayCount = lastMonthEndDate.getDate();
//月の最初の日の曜日を取得 0から6で，日曜日なら0，土曜日なら6を取得
const startDay = startDate.getDay();
// 日にちのカウント
let dayCount = 1;
// HTMLを組み立てる変数
let calendarHtml = '';

calendarHtml += '<h1>' + year + '/' + month + '</h1>';
calendarHtml += '<table>';
console.log(calendarHtml);

// 曜日の行を作成
for (let i = 0; i < weeks.length; i++){
  calendarHtml += '<td>' + weeks[i] + '</td>';
}
console.log(calendarHtml);

for (let w = 0; w < 6; w++){
  calendarHtml += '<tr>';

  for (let d = 0; d < 7; d++){
    if (w == 0 && d < startDay){
      // 1行目で1日の曜日の前
      let num = lastMonthendDayCount - startDay + d + 1;
      calendarHtml += '<td class="is-disabled">' + num + '</td>';
    } else if (dayCount > endDayCount){
      // 末尾の日数を超えた
      let num = dayCount - endDayCount;
      calendarHtml += '<td class="is-disabled">' + num + '</td>';
      dayCount++;
    } else {
      calendarHtml += '<td>' + dayCount + '</td>';
      dayCount++;
    }
            
  }
  
  calendarHtml += '<tr>';
}
calendarHtml += '</table>';

let calendar = document.querySelector('#calendar');
calendar.innerHTML = calendarHtml;

