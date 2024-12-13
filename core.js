const core_vars = {
    version: "0.0.1"
};

var modal_rules_content = `
	<modal-header>
		<span class="close">&times;</span>
		<h4>Zasady</h4>
	</modal-header>
	<modal-content>
		<span>Runda 1</span>
		<ul>
			<li>Stawka początkowa to 100 punktów</li>
			<li>Stawka zwiększa się o 10 punktów co 1.5 sekundy, do 200 punktów</li>
			<li>Za poprawne odgadnięcie tytułu do wyniku końcowego doliczana jest liczba naliczonych punktów</li>
			<li>Odpowiedzi pojawią się dopiero po wciśnięciu przycisku "STOP"</li>
			<li>Po wciśnięciu przycisku "STOP" zaczyna się 5 sekundowe odliczanie na zaznaczenie poprawnego tytułu</li>
			<li>Przy pomyłce, lub po upłynięciu czasu, naliczone punkty przepadają</li>
		</ul>
		<span>Runda 2</span>
		<ul>
			<li>Stawka początkowa to 200 punktów</li>
			<li>Stawka zmniejsza się o 10 punktów co 1.5 sekundy, do 100 punktów</li>
			<li>Za poprawne odgadnięcie tytułu do wyniku końcowego doliczana jest liczba naliczonych punktów</li>
			<li>Odpowiedzi pojawią się dopiero po wciśnięciu przycisku "STOP"</li>
			<li>Po wciśnięciu przycisku "STOP" zaczyna się 5 sekundowe odliczanie na zaznaczenie poprawnego tytułu</li>
			<li>Przy pomyłce, lub po upłynięciu czasu, naliczone punkty przepadają</li>
		</ul>
		<span>Runda 3</span>
		<ul>
			<li>Przy zagadce o wartości 200 punktów jest podpowiedź, przy wartości 400 punktów podpowiedzi nie ma</li>
			<li>Gracz wybiera ilość nutek potrzebną mu do odgadnięcia (w tym przypadku ilość sekund)</li>
			<li>Za poprawne odgadnięcie tytułu do wyniku końcowego doliczana jest wartość zagadki</li>
			<li>Po osiągnięciu 600 punktów w tej rundzie, gracz przechodzi do finału</li>
			<li>Jeżeli gracz nie osiągnie 600 punktów, gra się kończy</li>
		</ul>
		<span>Runda 4 (Finał)</span>
		<ul>
			<li>Gracz dostaje 30 sekund na odgadnięcie 7 zagadek</li>
			<li>Odpowiedzi do każdego fragmentu pojawią się dopiero po wciśnięciu przycisku "STOP"</li>
			<li>Po wciśnięciu przycisku "STOP" zaczyna się 5 sekundowe odliczanie na zaznaczenie poprawnego tytułu lub pominięcie</li>
			<li>Za każdą odgadniętą zagadkę gracz dostaje 250 punktów</li>
			<li>W przypadku błędu gra się automatycznie kończy</li>
			<li>W przypadku odgadnięcia wszystkich zagadek, do końcowego wyniku doliczane jest 10 tys. punktów</li>
		</ul>
		<span><i>Źródło: wikipedia.org, zmodyfikowane na potrzeby gry</i></span>
	</modal-content>
`;

var modal_about_content = `
	<modal-header>
		<span class="close">&times;</span>
		<h4>O projekcie</h4>
	</modal-header>
	<modal-content>
		<span>Pomysł na ten projekt pojawił się któregoś pięknego grudniowego wieczoru roku 2024, po tym jak w Internecie znalazłem tylko jedną grę tego typu, która w dodatku miała tylko jeden działający tryb (łączenie w pary czy coś takiego). Dlatego ten projekt zacząłem, i może uda się go skończyć w pełni bez żadnego pozwu w międzyczasie.</span><br><br>
		<span>Repozytorium z kodem źródłowym można znaleźć tutaj: <a href="https://github.com/tomeczeklmaooo/jtm" target="_blank">GitHub</a></span><br><br>
		<span>Specjalne podziękowania dla:</span>
		<ul>
			<li>Mnie za zrobienie tej gry całej</li>
			<li>osoba 2</li>
			<li>osoba 3</li>
		</ul>
	</modal-content>
`;

var modal_songs_content = `
	<modal-header>
		<span class="close">&times;</span>
		<h4>Lista piosenek</h4>
	</modal-header>
	<modal-content>
		<span>Lista w formacie JSON: <a href="songs_list.json" target="_blank">songs_list.json</a></span>
	</modal-content>
`;

var player_vars = {
	 current_points: 0,
	 r1_points: 0,
	 r2_points: 0,
	 r3_points: 0,
	 r4_points: 0,
	 total_points: 0
}

// this will be in a separate JSON file
var song_template = {
	artist: "band/singer",
	title: "title",
	year: "release year",
	sound_file: "path",
	r3_reward: 200, // or 400
	coverup_title: "example: Zespół - Zagraniczny przebój", // only if r3_reward is 400
}

function show_modal(_modal_id)
{
	var modal = document.getElementsByTagName('modal-container')[0];
	var modal_content = document.getElementsByTagName('modal-box')[0];
	switch (_modal_id)
	{
		case 0:
			modal_content.innerHTML = modal_rules_content;
			break;
		case 1:
			modal_content.innerHTML = modal_about_content;
			break;
		case 2:
			modal_content.innerHTML = modal_songs_content;
			break;
	}

	var close = document.getElementsByClassName('close')[0];
	modal.style.visibility = 'visible';
	close.onclick = function()
	{
		modal.style.visibility = 'hidden';
	}
	window.onclick = function(event)
	{
		if (event.target == modal) modal.style.visibility = 'hidden';
	}
}

function game_begin()
{
	fetch('songs_list.json').then((res) => res.json()).then((json) => {
		console.log(json);
		for (var i = 0; i < json['songs'].length; i++)
		{
			console.log(`${i + 1}: ${json['songs'][i]['artist']} - ${json['songs'][i]['title']} [${json['songs'][i]['year']}] | ${json['songs'][i]['r3_reward']} pkt. | ${json['songs'][i]['coverup_title']}`);
		}
	}).catch((e) => console.error(e));
}

window.onload = function()
{
	document.getElementsByTagName('footer')[0].innerHTML = `<span>Projekt na licencji open-source MIT &mdash; Wersja ${core_vars.version}</span>`;
}