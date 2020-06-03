function getTime(cle) {let Time = 0;for(var i=0;i<cle.length;i++)Time+=Number(cle[i].innerText.substr(0,2))*60+Number(cle[i].innerText.substr(-2));return Time;}
const format = Time => (`${Math.floor(Time/3600)}時間${Math.floor((Time%3600)/60)}分${(Time%60)}秒`)
let goodtime = getTime(document.querySelectorAll(".good .movie-length"));
let time      = getTime(document.getElementsByClassName('movie-length'));

let hyouji = document.getElementsByClassName('description');

if(hyouji === undefined) location.reload();

let movieCount = document.getElementsByClassName('movie').length;
let evaluationTestCount = {
	all :document.getElementsByClassName('evaluation-test').length,
	good: document.querySelectorAll('.good.evaluation-test').length
}
let essayTestCount = {
	all :document.getElementsByClassName('essay-test').length,
	good: document.querySelectorAll('.good.essay-test').length
}

let timesStyle = document.createElement('style');
	timesStyle.type = "text/css";
document.getElementsByTagName('head').item(0).appendChild(timesStyle);

let sheet = timesStyle.sheet,
	idx   = sheet.length
sheet.insertRule(`
table.times td {
	border-bottom: 1px solid #e9e9e9;
	padding: 5px;
}
`,idx)

hyouji[0].innerHTML+=`
<div class='u-card'>
	<div class='u-list-header typo-list-title'>この単元の進捗状況</div>
	<div class='u-card-inner'>
		<table class='times'>
			<tr>
				<td>すべての授業</td><td>${format(time)}</td>
			</tr>
			<tr>
				<td>視聴済み</td>    <td>${format(goodtime)}（${Math.round((goodtime / time) * 100)}%）</td>
			</tr>
			<tr>
				<td>未視聴</td>      <td>${format(time-goodtime)}</td>
			</tr>
			<tr>
				<td>授業動画数</td>   <td>${movieCount}</td>
			</tr>
			<tr>
				<td>すべてのテスト</td><td>${evaluationTestCount.good+essayTestCount.good}/${evaluationTestCount.all+essayTestCount.all}（${Math.round(((evaluationTestCount.good+essayTestCount.good)/(evaluationTestCount.all+essayTestCount.all))*100)}%）</td>
			</tr>
			<tr>
				<td>記述/選択テスト</td><td>${evaluationTestCount.good}/${evaluationTestCount.all}（${Math.round(((evaluationTestCount.good)/(evaluationTestCount.all))*100)}%）</td>
			</tr>
			<tr>
				<td>論述テスト</td><td>${essayTestCount.good}/${essayTestCount.all}（${Math.round(((essayTestCount.good)/(essayTestCount.all))*100)}%）</td>
			</tr>
		</table>
	</div>
</div>`;