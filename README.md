# skjalftaleit
Lokaverkefni í Vefforritun - Jarðskjálftasíða

# Vefsíða með grafíska rauntímaframsetningu á gögnum um jarðskjálfta #

## Verkefni ##

Nauðsynlegt var að skipta verkefninu niður í viðráðanlega hluta svo hver og einn
gæti einbeitt sér að sínu. Ákveðið var að skipta verkefninu í útlit á framenda,
virkni á framenda og bakendavirkni. Þessu var svo enn frekar skipt í:

* Ná tengingu við vefþjóna til að ná í gögn um jarðskjálfta.
* Geyma bæði eldri og ný gögn inn á vefþjóni til notkunar.
* Vinna úr gögnum frá bakenda og koma yfir á framenda.
* Koma gögnum yfir á grafískt form á framenda.
* Útbúa viðmót fyrir notanda til að stýra sýnileika á gögnum.
* Hanna skýrt og skalanlegt útlit fyrir síðuna.

Bakendavinnsla notaðist aðallega við PostgreSQL og Express til að ná tengingu við
[apis.is](http://docs.apis.is/#) og [usgs.gov](http://www.usgs.gov/) til
að fá hrá gögn. Express er svo notað til að vinna úr gögnunum í bakendanum og koma þeim
svo yfir á framendann. Í framendanum er Javascript notað til að vinna úr JSON gögnum
og þeim komið fyrir á kort sem er myndað með Google Maps API. Notandi hefur svo kost
á að breyta sýnileika gagna með framendanum. Útlit og uppbygging á framenda notar
Bootstrap og ýmsa Node.js pakka til að útfæra skalanlega vefsíðu.

## Vonir og væntingar ##

Takmarkið var að gera vel hannaða síðu, með bæði útlit og virkni í huga, sem sýndi
gögnin með ásættanlegum hraða og án villna. Að okkar mati hefur allt ofangreint
tekist ágætlega og ekkert athugavert við síðuna eins og hún stendur. Eina sem
hefði mátt betur fara er hraðinn. Með nægilegri þekkingu væri mögulega hægt að
gera Google Maps kortið eilítið hraðari (asynchronous virkni t.d.) þegar það er
að eiga við mikið af grafískum gögnum.

## Niðurstaða ##
Síðan hefur heppnast ágætlega og engar alvarlegar villur eiga sér stað
við notkun.
