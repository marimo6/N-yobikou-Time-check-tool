function getTime(cle) {let Time = 0;for(var i=0;i<cle.length;i++)Time+=Number(cle[i].innerText.substr(0,2))*60+Number(cle[i].innerText.substr(-2));return Time;}
function getCount(className) { return {all :document.getElementsByClassName(className).length,good: document.querySelectorAll(`.good.${className}`).length}}
const format = Time => (`${Math.floor(Time/3600)}時間${Math.floor((Time%3600)/60)}分${(Time%60)}秒`)

var sections = JSON.parse(
				document
					.querySelectorAll("div[data-react-class='App.Chapter']")[0]
					.getAttribute("data-react-props")
			).chapter.chapter.sections


// let goodtime = getTime(document.querySelectorAll(".good .movie-length"));
// let time     = getTime(document.getElementsByClassName('movie-length'));
let goodtime             = sections.reduce((prev, current) => current.resource_type=="movie" && current.passed                                     ?prev+current.length:prev, 0);
let time                 = sections.reduce((prev, current) => current.resource_type=="movie"                                                       ?prev+current.length:prev, 0);
let supplement_time      = sections.reduce((prev, current) => current.resource_type=="movie" && current.material_type=="supplement"                ?prev+current.length:prev, 0);
let good_supplement_time = sections.reduce((prev, current) => current.resource_type=="movie" && current.material_type=="supplement"&&current.passed?prev+current.length:prev, 0);

let hyouji = document.getElementsByClassName('description');

if(hyouji === undefined) location.reload();

let movieCount = {
	all: getCount("movie"),
	supplement: getCount("movie supplement"),
	good_supplement: getCount("movie good supplement")
}
let testCount  = {
	essay : getCount("essay-test"),
	evaluation: getCount("evaluation-test")
}
let reportCount= {
	essay: getCount("essay-report"),
	evaluation: getCount("evaluation-report")
}

let timesStyle = document.createElement('style');
	timesStyle.type = "text/css";
document.getElementsByTagName('head').item(0).appendChild(timesStyle);

let sheet = timesStyle.sheet,
	idx   = sheet.length
sheet.insertRule(`
table.counts td {
	border-bottom: 1px solid #BDBDBD;
	padding: 5px;
}
`,idx)
sheet.insertRule(`
table.counts th {
	border-bottom: 1px solid #424242;
	padding: 5px;
	background-color: #EEEEEE;
}
`,idx+1)
let counts = {
	test: testCount.evaluation.all+testCount.essay.all,
	report: reportCount.evaluation.all+reportCount.essay.all,
	goods: {
		test: testCount.evaluation.good+testCount.essay.good,
		report: reportCount.evaluation.good+reportCount.essay.good,
	}
}
counts.main_all        = counts.test+counts.report+movieCount.all.all-movieCount.supplement.all
counts.supplement_all  = movieCount.supplement.all
counts.all             = counts.test+counts.report+movieCount.all.all
counts.main_good       = counts.goods.test+counts.goods.report+movieCount.all.good-movieCount.good_supplement.all
counts.supplement_good = movieCount.good_supplement.all
counts.good            = counts.goods.test+counts.goods.report+movieCount.all.good

hyouji[0].innerHTML+=`
<div class='u-card'>
	<div class='u-list-header typo-list-title'>この単元の進捗状況</div>
	<div class='u-card-inner'>
		<table class='counts'>
			<tr>
				<th>全体</th><th>${counts.good}/${counts.all}（${Math.round(counts.good/counts.all*100)}%）</th>
				<th>必修授業</th><th>${counts.main_good}/${counts.main_all}（${Math.round(counts.main_good/counts.main_all*100)}%）</th>
				<th>Nプラス授業</th><th>${counts.supplement_good}/${counts.supplement_all}（${Math.round(counts.supplement_good/counts.supplement_all*100)}%）</th>
			</tr>
			<tr>
				<th>すべての授業</th><th>${format(time)}</th>
				<th>すべての必修授業</th><th>${format(time-supplement_time)}</th>
				<th>すべてのNプラス授業</th><th>${format(supplement_time)}</th>
			</tr>
			<tr>
				<td>視聴済み</td><td>${format(goodtime)}（${Math.round((goodtime / time) * 100)}%）</td>
				<td>視聴済み</td><td>${format(goodtime-good_supplement_time)}（${Math.round(((goodtime-good_supplement_time) / (time-supplement_time)) * 100)}%）</td>
				<td>視聴済み</td><td>${format(good_supplement_time)}（${Math.round((good_supplement_time / supplement_time) * 100)}%）</td>
			</tr>
			<tr>
				<td>未視聴</td><td>${format(time-goodtime)}</td>
				<td>未視聴</td><td>${format((time-supplement_time)-(goodtime-good_supplement_time))}</td>
				<td>未視聴</td><td>${format(supplement_time-good_supplement_time)}</td>
			</tr>
			<tr>
				<td>授業動画数</td><td>${movieCount.all.good}/${movieCount.all.all}（${Math.round((movieCount.all.good / movieCount.all.all) * 100)}%）</td>
				<td>必修授業動画数</td><td>${movieCount.all.good-movieCount.good_supplement.all}/${movieCount.all.all-movieCount.supplement.all}（${Math.round(((movieCount.all.good-movieCount.good_supplement.all) / (movieCount.all.all-movieCount.supplement.all)) * 100)}%）</td>
				<td>Nプラス授業動画数</td><td>${movieCount.good_supplement.all}/${movieCount.supplement.all}（${Math.round((movieCount.good_supplement.all / movieCount.supplement.all) * 100)}%）</td>
			</tr>
			<tr>
				<td>動画平均時間</td><td>${format(Math.round(time/movieCount.all.all+movieCount.supplement.all))}</td>
				<td>必修動画平均時間</td><td>${format(Math.round((time-supplement_time)/(movieCount.all.all-movieCount.supplement.all)))}</td>
				<td>Nプラス動画平均時間</td><td>${format(Math.round(supplement_time/movieCount.supplement.all))}</td>
			</tr>
			<tr>
				<th>すべてのテスト</th><th>${testCount.evaluation.good+testCount.essay.good}/${testCount.evaluation.all+testCount.essay.all}（${Math.round(((testCount.evaluation.good+testCount.essay.good)/(testCount.evaluation.all+testCount.essay.all))*100)}%）</th>
			</tr>
			<tr>
				<td>記述/選択テスト</td><td>${testCount.evaluation.good}/${testCount.evaluation.all}（${Math.round(((testCount.evaluation.good)/(testCount.evaluation.all))*100)}%）</td>
			</tr>
			<tr>
				<td>論述テスト</td><td>${testCount.essay.good}/${testCount.essay.all}（${Math.round(((testCount.essay.good)/(testCount.essay.all))*100)}%）</td>
			</tr>
			<tr>
				<th>すべてのレポート</th><th>${counts.goods.report}/${counts.report}（${Math.round(((counts.goods.report)/(counts.report))*100)}%）</th>
			</tr>
			<tr>
				<td>記述/選択レポート</td><td>${reportCount.evaluation.good}/${reportCount.evaluation.all}（${Math.round(((reportCount.evaluation.good)/(reportCount.evaluation.all))*100)}%）</td>
			</tr>
			<tr>
				<td>論述レポート</td><td>${reportCount.essay.good}/${reportCount.essay.all}（${Math.round(((reportCount.essay.good)/(reportCount.essay.all))*100)}%）</td>
			</tr>
		</table>
	</div>
</div>`;
