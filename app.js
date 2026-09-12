const SOURCES = {
  fed: { label: "Federal Reserve · FOMC", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },
  fedCalendar: { label: "Federal Reserve · calendar", url: "https://www.federalreserve.gov/newsevents/calendar.htm" },
  bls: { label: "BLS · calendar 2026", url: "https://www.bls.gov/schedule/2026/" },
  bea: { label: "BEA · release schedule", url: "https://www.bea.gov/news/schedule" },
  census: { label: "U.S. Census · indicators", url: "https://www.census.gov/economic-indicators/calendar-listview.html" },
  ism: { label: "ISM · PMI calendar", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" },
  dol: { label: "U.S. DOL · weekly claims", url: "https://www.dol.gov/newsroom/releases/eta" },
  cme: { label: "CME · holiday hours", url: "https://www.cmegroup.com/trading-hours.html" },
  roll: { label: "CME · equity roll dates", url: "https://www.cmegroup.com/trading/equity-index/rolldates.html" },
  nyse: { label: "NYSE · holidays & hours", url: "https://www.nyse.com/markets/hours-calendars" },
  michigan: { label: "U. Michigan · 2026 dates", url: "https://data.sca.isr.umich.edu/fetchdoc.php?docid=79628" },
  confidence: { label: "Conference Board · confidence", url: "https://www.conference-board.org/topics/consumer-confidence" },
  election: { label: "FEC · election dates", url: "https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/" },
  g17: { label: "Federal Reserve · industrial production", url: "https://www.federalreserve.gov/releases/g17/" }
};

const DETAILS = {
  fedDecision: {
    title: "Decizie FOMC + conferință",
    impact: "critical", category: "Fed", source: "fed",
    summary: "Fed publică decizia de dobândă și comunicatul la 14:00 ET; conferința începe de regulă la 14:30 ET.",
    watch: "Dobânda, formularea despre inflație și muncă, voturile, plus proiecțiile/dot plot la ședințele marcate SEP.",
    plan: "Risc de două impulsuri și whipsaw. Evită să tratezi prima lumânare ca direcție confirmată; urmărește reacția randamentelor și a dolarului."
  },
  fedDay1: {
    title: "FOMC — ziua 1",
    impact: "high", category: "Fed", source: "fed",
    summary: "Prima zi a ședinței FOMC. Nu apare încă decizia, dar poziționarea și lichiditatea pot deveni defensive.",
    watch: "Schimbări bruște în așteptările de dobândă și reducerea apetitului pentru risc înaintea comunicatului de a doua zi.",
    plan: "Nu există release programat din ședință. Tratează mișcările de final de sesiune cu prudență."
  },
  fedMinutes: {
    title: "Minutele FOMC",
    impact: "high", category: "Fed", source: "fedCalendar",
    summary: "Procesul-verbal detaliază dezbaterea din ședința precedentă și poate schimba interpretarea comunicatului.",
    watch: "Cât de împărțit a fost comitetul, riscurile dominante și discuțiile despre traiectoria ratelor sau bilanț.",
    plan: "Volatilitatea apare la 14:00 ET; impactul e mai mare dacă mesajul diferă de narațiunea deja prețuită."
  },
  blackout: {
    title: "Blackout Fed",
    impact: "medium", category: "Fed", source: "fed",
    summary: "Perioadă în care participanții FOMC își limitează comunicarea publică înainte și imediat după ședință.",
    watch: "Mai puține discursuri care să corecteze așteptările pieței; datele macro pot avea greutate mai mare.",
    plan: "Nu este un catalizator cu oră fixă. Este un context pentru sensibilitate crescută la date și zvonuri."
  },
  cpi: {
    title: "CPI — inflația consumatorilor",
    impact: "critical", category: "Inflație", source: "bls",
    summary: "Cea mai urmărită citire lunară a inflației la consumator; componentele core pot muta rapid ratele și indicii.",
    watch: "Headline și core, lunar și anual. Serviciile, locuințele și inflația mai persistentă contează pentru Fed.",
    plan: "Release de 08:30 ET cu risc extrem de slippage. Reacția NQ este adesea amplificată de mișcarea randamentelor."
  },
  ppi: {
    title: "PPI — inflația producătorilor",
    impact: "high", category: "Inflație", source: "bls",
    summary: "Măsoară prețurile la nivel de producător și poate modifica estimările pentru componente ale PCE.",
    watch: "Core PPI și serviciile; comparația cu consensul și revizuirile lunii precedente.",
    plan: "Poate extinde sau inversa mișcarea creată de CPI, mai ales când surpriza schimbă așteptările pentru PCE."
  },
  pce: {
    title: "Core PCE + venituri și cheltuieli",
    impact: "critical", category: "Inflație", source: "bea",
    summary: "PCE este măsura de inflație preferată de Fed, publicată împreună cu veniturile și consumul personal.",
    watch: "Core PCE lunar/anual, consumul real și revizuirile. O abatere mică poate conta când politica Fed este la limită.",
    plan: "Release de 08:30 ET. Compară reacția indicilor cu randamentul Treasury pe 2 ani."
  },
  nfp: {
    title: "NFP — Employment Situation",
    impact: "critical", category: "Muncă", source: "bls",
    summary: "Raportul lunar include payrolls, șomajul și câștigul salarial mediu — toate relevante pentru mandatul Fed.",
    watch: "Payrolls, rata șomajului, salariile, participarea și revizuirile celor două luni anterioare.",
    plan: "Release de 08:30 ET cu reacții rapide și uneori contradictorii. Nu interpreta doar cifra headline."
  },
  claims: {
    title: "Cereri inițiale de șomaj",
    impact: "medium", category: "Muncă", source: "dol",
    summary: "Indicator săptămânal, rapid, pentru deteriorarea sau reziliența pieței muncii.",
    watch: "Initial claims, continuing claims și media pe 4 săptămâni; trendul contează mai mult decât un punct izolat.",
    plan: "De obicei 08:30 ET joia. Impactul crește când piața este concentrată pe mandatul de ocupare al Fed."
  },
  jolts: {
    title: "JOLTS — locuri de muncă vacante",
    impact: "high", category: "Muncă", source: "bls",
    summary: "Arată cererea de muncă, angajările și demisiile; un input urmărit pentru echilibrul pieței muncii.",
    watch: "Job openings, quits rate și revizuirile. Raportul este întârziat, dar surprizele mari pot muta ratele.",
    plan: "Release la 10:00 ET, după cash open. Ai grijă la inversări ale mișcării inițiale de la 09:30."
  },
  retail: {
    title: "Retail Sales",
    impact: "high", category: "Creștere", source: "census",
    summary: "Semnal important despre consumatorul american, principalul motor al economiei SUA.",
    watch: "Headline, ex-auto și control group, ultima fiind relevantă pentru estimările PIB.",
    plan: "Date mai tari pot susține creșterea, dar pot urca randamentele; reacția indicilor depinde de regimul Fed."
  },
  gdp: {
    title: "GDP — Produsul Intern Brut SUA",
    impact: "high", category: "Creștere", source: "bea",
    summary: "Estimarea trimestrială a activității economice; „advance” produce de regulă cea mai mare surpriză.",
    watch: "Creșterea reală, consumul, deflatorul și revizuirile. Separă cererea finală de acumularea stocurilor.",
    plan: "GDP și PCE pot apărea simultan. Dacă semnalele se contrazic, așteaptă ca ratele să arate ce domină."
  },
  ismMfg: {
    title: "ISM Manufacturing PMI",
    impact: "high", category: "Creștere", source: "ism",
    summary: "Sondaj rapid al industriei, publicat în prima zi lucrătoare a lunii.",
    watch: "Indicele general față de 50, new orders, employment și prices paid.",
    plan: "Release la 10:00 ET. Prices paid poate domina reacția dacă tema pieței este inflația."
  },
  ismServices: {
    title: "ISM Services PMI",
    impact: "high", category: "Creștere", source: "ism",
    summary: "Sondaj al sectorului de servicii, partea dominantă a economiei SUA.",
    watch: "Business activity, new orders, employment și prices paid; pragul 50 separă expansiunea de contracție.",
    plan: "Release la 10:00 ET, capabil să schimbe impulsul de după cash open."
  },
  durable: {
    title: "Comenzi de bunuri de folosință îndelungată",
    impact: "medium", category: "Creștere", source: "census",
    summary: "Indicator volatil al cererii pentru bunuri și al investițiilor companiilor.",
    watch: "Headline este influențat de aviație; urmărește comenzile core de capital fără apărare și aeronave.",
    plan: "Revizuirile sunt frecvente. O surpriză mare poate ajusta estimările de PIB înainte de cash open."
  },
  housing: {
    title: "Housing Starts + Building Permits",
    impact: "medium", category: "Creștere", source: "census",
    summary: "Măsoară construcțiile rezidențiale și autorizațiile, sectoare sensibile la dobânzi.",
    watch: "Permits sunt mai anticipative; separă single-family de clădirile multifamiliale volatile.",
    plan: "De obicei secundar, dar reacția poate crește când dobânzile ipotecare sunt tema dominantă."
  },
  industrial: {
    title: "Producție industrială",
    impact: "medium", category: "Creștere", source: "g17",
    summary: "Fed publică producția industrială și utilizarea capacității la 09:15 ET.",
    watch: "Manufacturing, mining, utilities și capacity utilization.",
    plan: "Apare între datele de 08:30 și cash open; poate modifica tonul premarket-ului."
  },
  regional: {
    title: "Sondaj regional de producție",
    impact: "medium", category: "Creștere", source: "fedCalendar",
    summary: "Empire State și Philly Fed oferă semnale rapide despre activitatea, comenzile, angajările și prețurile din industrie.",
    watch: "Indicele general, new orders, employment și prices paid; seriile sunt volatile, iar direcția comună contează mai mult.",
    plan: "La 08:30 ET poate amplifica reacția altor date publicate simultan, dar rareori domină singur întreaga sesiune."
  },
  newHomes: {
    title: "New Home Sales",
    impact: "medium", category: "Creștere", source: "census",
    summary: "Vânzările de locuințe noi sunt un indicator volatil, sensibil la dobânzile ipotecare și încrederea consumatorilor.",
    watch: "Ritmul anualizat, oferta în luni, prețurile și revizuirile, care pot fi mari.",
    plan: "Release la 10:00 ET. Impactul crește când piața caută efectele dobânzilor asupra economiei reale."
  },
  confidence: {
    title: "Consumer Confidence",
    impact: "medium", category: "Creștere", source: "confidence",
    summary: "Sondajul Conference Board urmărește percepția consumatorilor despre situația curentă și așteptări.",
    watch: "Expectations, present situation și diferențele față de sentimentul University of Michigan.",
    plan: "Release la 10:00 ET; reacția este mai puternică la surprize mari sau deteriorare rapidă."
  },
  michigan: {
    title: "U. Michigan Consumer Sentiment",
    impact: "medium", category: "Inflație", source: "michigan",
    summary: "Sondaj de sentiment care include așteptări de inflație urmărite atent de piață și Fed.",
    watch: "Sentimentul headline, condițiile curente și așteptările de inflație la 1 și 5–10 ani.",
    plan: "Release la 10:00 ET; componenta de inflație poate conta mai mult decât sentimentul."
  },
  fomcContext: {
    title: "Beige Book",
    impact: "medium", category: "Fed", source: "fedCalendar",
    summary: "Rezumat calitativ al condițiilor economice din districtele Fed, publicat înainte de FOMC.",
    watch: "Schimbări de limbaj despre prețuri, angajări, consum și credit.",
    plan: "La 14:00 ET. De obicei impact moderat, dar poate influența narațiunea pentru următoarea ședință."
  },
  sloos: {
    title: "Senior Loan Officer Survey",
    impact: "medium", category: "Fed", source: "fedCalendar",
    summary: "Sondaj trimestrial despre înăsprirea standardelor de credit și cererea de împrumuturi.",
    watch: "Credit comercial, consumatori și imobiliare; înăsprirea poate semnala frână economică viitoare.",
    plan: "Nu are mereu oră fixă; este mai important când riscul de credit intră în prim-plan."
  },
  trade: {
    title: "Balanța comercială SUA",
    impact: "medium", category: "Creștere", source: "bea",
    summary: "Importurile și exporturile influențează estimările de PIB și oferă context pentru cererea globală.",
    watch: "Deficitul total, exporturile și revizuirile.",
    plan: "De regulă nu domină sesiunea, exceptând surprize mari sau teme comerciale active."
  },
  eci: {
    title: "Employment Cost Index",
    impact: "high", category: "Inflație", source: "bls",
    summary: "Măsură trimestrială amplă a salariilor și beneficiilor, urmărită de Fed pentru presiunile salariale.",
    watch: "Costurile totale și salariile din sectorul privat, trimestrial și anual.",
    plan: "Release de 08:30 ET; surprizele pot mișca randamentele înainte de cash open."
  },
  roll: {
    title: "Rollover trimestrial ES/NQ/MES/MNQ",
    impact: "schedule", category: "Piață", source: "roll",
    summary: "CME marchează lunea dinaintea celei de-a treia vineri ca dată uzuală de roll către contractul următor.",
    watch: "Volumul se mută treptat din contractul expirat în cel nou; compară volumele înainte de a schimba simbolul.",
    plan: "Actualizează charturile, nivelurile și simbolul folosit. Diferența dintre contracte este normală, nu un gap real."
  },
  expiry: {
    title: "Expirare trimestrială futures & opțiuni",
    impact: "high", category: "Piață", source: "roll",
    summary: "Expiră contractele trimestriale pe indici; settlement-ul folosește prețurile de deschidere ale componentelor indicelui.",
    watch: "Dezechilibre la open, volum ridicat, fluxuri de hedging și rebalansarea trimestrială S&P după close.",
    plan: "Nu mai tranzacționa din inerție contractul vechi. Verifică lichiditatea și settlement-ul pozițiilor rămase."
  },
  holiday: {
    title: "Sărbătoare / program de piață modificat",
    impact: "schedule", category: "Piață", source: "cme",
    summary: "Programul cash, futures sau al pieței de obligațiuni este închis ori scurtat.",
    watch: "Orele exacte CME, redeschiderea Globex, settlement-ul și dacă piața Treasury este închisă.",
    plan: "Așteaptă lichiditate mai mică și spread mai larg. Confirmă programul final la CME și broker."
  },
  dst: {
    title: "Schimbare de oră — decalaj RO/US",
    impact: "schedule", category: "Piață", source: "nyse",
    summary: "România și SUA schimbă ora în weekenduri diferite; pentru o săptămână cash open-ul se mută local.",
    watch: "Orele locale pentru 08:30 ET, 09:30 ET și 14:00 ET.",
    plan: "Folosește selectorul de fus orar din calendar; conversia se face automat."
  },
  election: {
    title: "Alegeri midterm SUA",
    impact: "critical", category: "Piață", source: "election",
    summary: "Alegerile federale pot schimba controlul Congresului și așteptările privind taxe, cheltuieli și reglementare.",
    watch: "Rezultatele pot veni după cash close și în sesiunea Globex; cursele strânse pot prelungi incertitudinea.",
    plan: "Risc de gap și headline peste noapte. Dimensiunea și ordinele lăsate deschise merită reevaluate."
  }
};

const schedule = [
  ["2026-09-12", null, "blackout", "Blackout Fed în desfășurare", "confirmat"],
  ["2026-09-14", null, "roll", "Roll oficial: Sep → Dec", "confirmat"],
  ["2026-09-15", "08:30", "regional", "Empire State Manufacturing", "confirmat"],
  ["2026-09-15", null, "fedDay1", "FOMC — ziua 1 (SEP)", "confirmat"],
  ["2026-09-16", "08:30", "retail", "Retail Sales · august", "confirmat"],
  ["2026-09-16", "14:00", "fedDecision", "FOMC + SEP + dot plot", "confirmat"],
  ["2026-09-17", "08:30", "claims", null, "recurent"],
  ["2026-09-17", "08:30", "housing", "Housing Starts · august", "confirmat"],
  ["2026-09-17", "08:30", "regional", "Philly Fed Manufacturing", "recurent"],
  ["2026-09-18", "09:15", "industrial", "Producție industrială · august", "confirmat"],
  ["2026-09-18", "09:30", "expiry", "Expirare trimestrială Sep", "confirmat"],
  ["2026-09-24", "08:30", "claims", null, "recurent"],
  ["2026-09-24", "10:00", "newHomes", "New Home Sales · august", "confirmat"],
  ["2026-09-25", "08:30", "durable", "Durable Goods · august", "confirmat"],
  ["2026-09-25", "10:00", "michigan", "U. Michigan · final septembrie", "confirmat"],
  ["2026-09-29", "10:00", "jolts", "JOLTS · august", "confirmat"],
  ["2026-09-29", "10:00", "confidence", "Consumer Confidence · septembrie", "confirmat"],
  ["2026-09-30", "08:30", "gdp", "GDP Q2 · estimarea a 3-a", "confirmat"],
  ["2026-09-30", "08:30", "pce", "Core PCE · august", "confirmat"],
  ["2026-10-01", "08:30", "claims", null, "recurent"],
  ["2026-10-01", "10:00", "ismMfg", "ISM Manufacturing · septembrie", "confirmat"],
  ["2026-10-02", "08:30", "nfp", "NFP · septembrie", "confirmat"],
  ["2026-10-05", "10:00", "ismServices", "ISM Services · septembrie", "confirmat"],
  ["2026-10-06", "08:30", "trade", "Balanța comercială · august", "confirmat"],
  ["2026-10-07", "14:00", "fedMinutes", "Minute FOMC · ședința din septembrie", "confirmat"],
  ["2026-10-08", "08:30", "claims", null, "recurent"],
  ["2026-10-09", "10:00", "michigan", "U. Michigan · preliminar octombrie", "confirmat"],
  ["2026-10-12", null, "holiday", "Columbus Day — obligațiuni închise", "confirmat", "NYSE și futures pe indici rămân deschise; piața Treasury/repo este închisă. Posibil volum mai slab."],
  ["2026-10-14", "08:30", "cpi", "CPI · septembrie", "confirmat"],
  ["2026-10-14", "14:00", "fomcContext", null, "confirmat"],
  ["2026-10-15", "08:30", "ppi", "PPI · septembrie", "confirmat"],
  ["2026-10-15", "08:30", "retail", "Retail Sales · septembrie", "confirmat"],
  ["2026-10-15", "08:30", "claims", null, "recurent"],
  ["2026-10-15", "08:30", "regional", "Empire State + Philly Fed", "confirmat"],
  ["2026-10-16", "09:15", "industrial", "Producție industrială · septembrie", "confirmat"],
  ["2026-10-20", "08:30", "housing", "Housing Starts · septembrie", "confirmat"],
  ["2026-10-22", "08:30", "claims", null, "recurent"],
  ["2026-10-23", "10:00", "michigan", "U. Michigan · final octombrie", "confirmat"],
  ["2026-10-25", null, "dst", "România trece la ora de iarnă", "confirmat", "Între 26–30 octombrie, cash open SUA este la 15:30 în București, nu 16:30."],
  ["2026-10-27", "08:30", "durable", "Durable Goods · septembrie", "confirmat"],
  ["2026-10-27", "10:00", "newHomes", "New Home Sales · septembrie", "confirmat"],
  ["2026-10-27", "10:00", "confidence", "Consumer Confidence · octombrie", "recurent"],
  ["2026-10-27", null, "fedDay1", "FOMC — ziua 1", "confirmat"],
  ["2026-10-28", "14:00", "fedDecision", "Decizie FOMC + conferință", "confirmat"],
  ["2026-10-29", "08:30", "gdp", "GDP Q3 · estimare advance", "confirmat"],
  ["2026-10-29", "08:30", "pce", "Core PCE · septembrie", "confirmat"],
  ["2026-10-29", "08:30", "claims", null, "recurent"],
  ["2026-10-30", "08:30", "eci", "Employment Cost Index · Q3", "confirmat"],
  ["2026-11-01", null, "dst", "SUA trece la ora de iarnă", "confirmat", "Din 2 noiembrie, cash open revine la 16:30 în București."],
  ["2026-11-02", "10:00", "ismMfg", "ISM Manufacturing · octombrie", "confirmat"],
  ["2026-11-02", null, "sloos", null, "confirmat"],
  ["2026-11-03", "10:00", "jolts", "JOLTS · septembrie", "confirmat"],
  ["2026-11-03", null, "election", "Alegeri midterm SUA", "confirmat"],
  ["2026-11-04", "08:30", "trade", "Balanța comercială · septembrie", "confirmat"],
  ["2026-11-04", "10:00", "ismServices", "ISM Services · octombrie", "confirmat"],
  ["2026-11-05", "08:30", "claims", null, "recurent"],
  ["2026-11-06", "08:30", "nfp", "NFP · octombrie", "confirmat"],
  ["2026-11-06", "10:00", "michigan", "U. Michigan · preliminar noiembrie", "confirmat"],
  ["2026-11-10", "08:30", "cpi", "CPI · octombrie", "confirmat"],
  ["2026-11-11", null, "holiday", "Veterans Day — obligațiuni închise", "confirmat", "Cash equities sunt deschise, dar Treasury/repo este închis. Corelațiile cu ratele și volumul pot fi atipice."],
  ["2026-11-12", "08:30", "claims", null, "recurent"],
  ["2026-11-13", "08:30", "ppi", "PPI · octombrie", "confirmat"],
  ["2026-11-16", "08:30", "regional", "Empire State Manufacturing", "confirmat"],
  ["2026-11-17", "08:30", "retail", "Retail Sales · octombrie", "confirmat"],
  ["2026-11-17", "09:15", "industrial", "Producție industrială · octombrie", "confirmat"],
  ["2026-11-18", "08:30", "housing", "Housing Starts · octombrie", "confirmat"],
  ["2026-11-18", "14:00", "fedMinutes", "Minute FOMC · ședința din octombrie", "confirmat"],
  ["2026-11-19", "08:30", "claims", null, "recurent"],
  ["2026-11-19", "08:30", "regional", "Philly Fed Manufacturing", "recurent"],
  ["2026-11-20", "10:00", "michigan", "U. Michigan · final noiembrie", "confirmat"],
  ["2026-11-24", "10:00", "confidence", "Consumer Confidence · noiembrie", "recurent"],
  ["2026-11-25", "08:30", "gdp", "GDP Q3 · estimarea a 2-a", "confirmat"],
  ["2026-11-25", "08:30", "pce", "Core PCE · octombrie", "confirmat"],
  ["2026-11-25", "08:30", "durable", "Durable Goods · octombrie", "confirmat"],
  ["2026-11-25", "08:30", "claims", "Cereri șomaj · release anticipat", "recurent"],
  ["2026-11-25", "10:00", "newHomes", "New Home Sales · octombrie", "confirmat"],
  ["2026-11-25", "14:00", "fomcContext", null, "confirmat"],
  ["2026-11-26", "13:00", "holiday", "Thanksgiving — cash închis / CME scurt", "provizoriu", "NYSE/Nasdaq sunt închise. CME publică programul final pe produs aproape de sărbătoare; pentru indici este așteptată o închidere timpurie."],
  ["2026-11-27", "13:00", "holiday", "Sesiune cash scurtă — 13:00 ET", "confirmat", "NYSE și Nasdaq închid la 13:00 ET. Volumul este de regulă mult sub normal; evită să presupui că futures urmează exact programul cash."],
  ["2026-11-28", null, "blackout", "Începe blackout-ul Fed", "confirmat"],
  ["2026-12-01", "10:00", "jolts", "JOLTS · octombrie", "confirmat"],
  ["2026-12-01", "10:00", "ismMfg", "ISM Manufacturing · noiembrie", "confirmat"],
  ["2026-12-03", "08:30", "claims", null, "recurent"],
  ["2026-12-03", "10:00", "ismServices", "ISM Services · noiembrie", "confirmat"],
  ["2026-12-04", "08:30", "nfp", "NFP · noiembrie", "confirmat"],
  ["2026-12-04", "10:00", "michigan", "U. Michigan · preliminar decembrie", "confirmat"],
  ["2026-12-08", "08:30", "trade", "Balanța comercială · octombrie", "confirmat"],
  ["2026-12-08", null, "fedDay1", "FOMC — ziua 1 (SEP)", "confirmat"],
  ["2026-12-09", "14:00", "fedDecision", "FOMC + SEP + dot plot", "confirmat"],
  ["2026-12-10", "08:30", "cpi", "CPI · noiembrie", "confirmat"],
  ["2026-12-10", "08:30", "claims", null, "recurent"],
  ["2026-12-14", null, "roll", "Roll oficial: Dec → Mar 2027", "confirmat"],
  ["2026-12-15", "08:30", "ppi", "PPI · noiembrie", "confirmat"],
  ["2026-12-15", "08:30", "regional", "Empire State Manufacturing", "confirmat"],
  ["2026-12-16", "08:30", "retail", "Retail Sales · noiembrie", "confirmat"],
  ["2026-12-16", "09:15", "industrial", "Producție industrială · noiembrie", "confirmat"],
  ["2026-12-17", "08:30", "claims", null, "recurent"],
  ["2026-12-17", "08:30", "housing", "Housing Starts · noiembrie", "confirmat"],
  ["2026-12-17", "08:30", "regional", "Philly Fed Manufacturing", "recurent"],
  ["2026-12-18", "09:30", "expiry", "Expirare trimestrială Dec", "confirmat"],
  ["2026-12-18", "10:00", "michigan", "U. Michigan · final decembrie", "confirmat"],
  ["2026-12-21", null, "holiday", "Începe lichiditatea de sărbători", "context", "CME marchează 21 decembrie–1 ianuarie ca perioadă de sărbători pentru unele programe operaționale. Volumele se pot subția progresiv."],
  ["2026-12-23", "08:30", "gdp", "GDP Q3 · estimarea a 3-a", "confirmat"],
  ["2026-12-23", "08:30", "pce", "Core PCE · noiembrie", "confirmat"],
  ["2026-12-23", "08:30", "durable", "Durable Goods · noiembrie", "confirmat"],
  ["2026-12-23", "10:00", "newHomes", "New Home Sales · noiembrie", "confirmat"],
  ["2026-12-24", "08:30", "claims", null, "recurent"],
  ["2026-12-24", "13:00", "holiday", "Ajun — cash close 13:00 ET", "confirmat", "NYSE/Nasdaq închid la 13:00 ET. CME are program special 24–26 decembrie și poate finaliza orele exacte mai aproape de dată."],
  ["2026-12-25", null, "holiday", "Crăciun — piețe închise", "confirmat", "Cash equities sunt închise. CME Globex are program de sărbătoare; sesiunea normală revine după weekend conform calendarului CME."],
  ["2026-12-29", "10:00", "confidence", "Consumer Confidence · decembrie", "recurent"],
  ["2026-12-30", "14:00", "fedMinutes", "Minute FOMC · ședința din decembrie", "confirmat"],
  ["2026-12-31", "08:30", "claims", null, "recurent"],
  ["2026-12-31", null, "holiday", "Ajun de Anul Nou — verifică CME", "provizoriu", "Cash equities au program normal planificat; CME include 31 decembrie–1 ianuarie în programul special și confirmă orele finale mai aproape de dată."],
  ["2027-01-01", null, "holiday", "Anul Nou — piețe închise", "confirmat", "NYSE/Nasdaq sunt închise, iar CME Globex este închis pentru ziua de tranzacționare. Redeschiderea este duminică seara, conform programului final CME."]
];

const etOffset = date => date < "2026-11-01" ? "-04:00" : "-05:00";
const events = schedule.map(([date, time, type, title, status, note], index) => ({
  id: `event-${index}`,
  date, time, type, status, note,
  ...DETAILS[type],
  title: title || DETAILS[type].title,
  instant: time ? new Date(`${date}T${time}:00${etOffset(date)}`) : null
}));

const months = [
  [2026, 8], [2026, 9], [2026, 10], [2026, 11], [2027, 0]
];

const state = {
  monthIndex: 0,
  view: "calendar",
  timezone: localStorage.getItem("calendar-timezone") || "Europe/Bucharest",
  impacts: new Set(["critical", "high", "medium", "schedule"]),
  categories: new Set(["Fed", "Inflație", "Muncă", "Creștere", "Piață"])
};

const els = {
  monthTitle: document.querySelector("#monthTitle"),
  grid: document.querySelector("#calendarGrid"),
  calendarView: document.querySelector("#calendarView"),
  agendaView: document.querySelector("#agendaView"),
  agendaList: document.querySelector("#agendaList"),
  timezone: document.querySelector("#timezoneSelect"),
  prev: document.querySelector("#prevMonth"),
  next: document.querySelector("#nextMonth"),
  dialog: document.querySelector("#eventDialog"),
  dialogContent: document.querySelector("#dialogContent"),
  nextEvent: document.querySelector("#nextEventButton"),
  countdown: document.querySelector("#countdown"),
  toast: document.querySelector("#toast")
};

function applyTheme(theme = document.documentElement.dataset.theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === "light";
  document.querySelector("#themeIcon").textContent = light ? "☾" : "☀";
  document.querySelector("#themeLabel").textContent = light ? "Mod întunecat" : "Mod luminos";
  document.querySelector("#themeButton").setAttribute("aria-label", light ? "Activează modul întunecat" : "Activează modul luminos");
  document.querySelector('meta[name="theme-color"]').content = light ? "#f2f4f0" : "#0a0d0f";
}

const monthFormatter = new Intl.DateTimeFormat("ro-RO", { month: "long", year: "numeric" });
const dayFormatter = new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long" });
const fullFormatter = new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function formatTime(event) {
  if (!event.instant) return "TOATĂ ZIUA";
  const value = new Intl.DateTimeFormat("ro-RO", {
    timeZone: state.timezone, hour: "2-digit", minute: "2-digit", hour12: false
  }).format(event.instant);
  return `${value} ${state.timezone === "America/New_York" ? "ET" : "RO"}`;
}

function filteredEvents() {
  return events.filter(event => state.impacts.has(event.impact) && state.categories.has(event.category));
}

function monthEvents() {
  const [year, month] = months[state.monthIndex];
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return filteredEvents().filter(event => event.date.startsWith(prefix));
}

function render() {
  const [year, month] = months[state.monthIndex];
  els.monthTitle.textContent = monthFormatter.format(new Date(year, month, 1));
  els.monthTitle.textContent = els.monthTitle.textContent[0].toUpperCase() + els.monthTitle.textContent.slice(1);
  els.prev.disabled = state.monthIndex === 0;
  els.next.disabled = state.monthIndex === months.length - 1;
  renderCalendar(year, month);
  renderAgenda();
}

function renderCalendar(year, month) {
  const first = new Date(year, month, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((mondayOffset + totalDays) / 7) * 7;
  const start = new Date(year, month, 1 - mondayOffset);
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const visible = filteredEvents();

  els.grid.innerHTML = Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const dayEvents = visible.filter(event => event.date === key);
    const classes = ["day"];
    if (date.getMonth() !== month) classes.push("day--outside");
    if (key < todayKey) classes.push("day--past");
    if (key === todayKey) classes.push("day--today");
    const shown = dayEvents.map(eventChip).join("");
    return `<article class="${classes.join(" ")}" data-date="${key}">
      <div class="day__number"><span>${date.getDate()}</span>${key === todayKey ? '<span class="day__today">ASTĂZI</span>' : ""}</div>
      <div class="day__events">${shown}</div>
    </article>`;
  }).join("");
}

function eventChip(event) {
  return `<button class="event-chip event-chip--${event.impact}" type="button" data-event-id="${event.id}" aria-label="${event.title}">
    <span class="event-chip__bar"></span>
    <span class="event-chip__copy"><span class="event-chip__time">${formatTime(event)}</span><span class="event-chip__title">${event.title}</span></span>
  </button>`;
}

function renderAgenda() {
  const grouped = Object.groupBy ? Object.groupBy(monthEvents(), event => event.date) : monthEvents().reduce((all, event) => {
    (all[event.date] ||= []).push(event); return all;
  }, {});
  const entries = Object.entries(grouped);
  els.agendaList.innerHTML = entries.length ? entries.map(([date, dayEvents]) => {
    const label = dayFormatter.format(new Date(`${date}T12:00:00`));
    const [weekday, ...rest] = label.split(" ");
    return `<article class="agenda-day">
      <div class="agenda-date">${weekday.toUpperCase()}<small>${rest.join(" ")}</small></div>
      <div class="agenda-events">${dayEvents.map(event => `<button class="agenda-event agenda-event--${event.impact}" type="button" data-event-id="${event.id}">
        <span class="agenda-event__time">${formatTime(event)}</span><i class="agenda-event__mark"></i><span class="agenda-event__title">${event.title}</span><span class="agenda-event__category">${event.category}</span>
      </button>`).join("")}</div>
    </article>`;
  }).join("") : '<div class="empty-state">Niciun eveniment cu filtrele selectate.</div>';
}

function openEvent(id) {
  const event = events.find(item => item.id === id);
  if (!event) return;
  const source = SOURCES[event.source];
  const date = fullFormatter.format(new Date(`${event.date}T12:00:00`));
  const impactLabels = { critical: "Impact critic", high: "Impact ridicat", medium: "Impact mediu", schedule: "Program de piață" };
  els.dialogContent.innerHTML = `<div class="dialog-body">
    <div class="dialog-kicker dialog-kicker--${event.impact}"><i></i>${impactLabels[event.impact]} · ${event.category}</div>
    <h2>${event.title}</h2>
    <p class="dialog-time">${date.toUpperCase()} · ${formatTime(event)}</p>
    <p class="dialog-summary">${event.note || event.summary}</p>
    <div class="dialog-grid">
      <section><h3>Ce urmărești</h3><p>${event.watch}</p></section>
      <section><h3>Implicație pentru sesiune</h3><p>${event.plan}</p></section>
    </div>
    <div class="dialog-meta"><span class="status-badge">${event.status}</span><a class="dialog-source" href="${source.url}" target="_blank" rel="noopener">Sursa oficială ↗</a></div>
  </div>`;
  els.dialog.showModal();
}

function updateNextEvent() {
  const now = new Date();
  const next = events.filter(event => ["critical", "high"].includes(event.impact))
    .map(event => ({ event, when: event.instant || new Date(`${event.date}T12:00:00${etOffset(event.date)}`) }))
    .filter(item => item.when > now)
    .sort((a, b) => a.when - b.when)[0];
  if (!next) {
    els.nextEvent.textContent = "Perioada calendarului s-a încheiat";
    els.countdown.textContent = "—";
    return;
  }
  els.nextEvent.textContent = `${next.event.title} · ${formatTime(next.event)}`;
  els.nextEvent.dataset.eventId = next.event.id;
  const ms = next.when - now;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  els.countdown.textContent = days ? `ÎN ${days}Z ${hours}H` : `ÎN ${hours}H`;
}

function toggleFilter(button, key, collection) {
  const value = button.dataset[key];
  if (collection.has(value) && collection.size === 1) return;
  collection.has(value) ? collection.delete(value) : collection.add(value);
  button.classList.toggle("is-active", collection.has(value));
  render();
}

function exportIcs() {
  const body = filteredEvents().map(event => {
    const date = event.date.replaceAll("-", "");
    const start = event.instant ? event.instant.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "") : `${date}`;
    const endDate = new Date(`${event.date}T12:00:00`); endDate.setDate(endDate.getDate() + 1);
    const end = event.instant ? new Date(event.instant.getTime() + 3600000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "") : endDate.toISOString().slice(0, 10).replaceAll("-", "");
    const timing = event.instant ? `DTSTART:${start}\r\nDTEND:${end}` : `DTSTART;VALUE=DATE:${start}\r\nDTEND;VALUE=DATE:${end}`;
    return `BEGIN:VEVENT\r\nUID:${event.id}@us-index-desk\r\n${timing}\r\nSUMMARY:${event.title}\r\nDESCRIPTION:${(event.note || event.summary).replaceAll(",", "\\,")}\r\nURL:${SOURCES[event.source].url}\r\nEND:VEVENT`;
  }).join("\r\n");
  const file = new Blob([`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//US Index Desk//RO\r\nCALSCALE:GREGORIAN\r\n${body}\r\nEND:VCALENDAR`], { type: "text/calendar" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file); link.download = "us-index-desk-2026.ics"; link.click(); URL.revokeObjectURL(link.href);
  showToast("Calendarul filtrat a fost exportat.");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
}

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-event-id]");
  if (trigger) openEvent(trigger.dataset.eventId);
});

els.prev.addEventListener("click", () => { if (state.monthIndex) { state.monthIndex--; render(); } });
els.next.addEventListener("click", () => { if (state.monthIndex < months.length - 1) { state.monthIndex++; render(); } });
els.timezone.value = state.timezone;
els.timezone.addEventListener("change", event => {
  state.timezone = event.target.value;
  localStorage.setItem("calendar-timezone", state.timezone);
  render(); updateNextEvent();
});
document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => {
  state.view = button.dataset.view;
  document.querySelectorAll("[data-view]").forEach(item => item.classList.toggle("is-active", item === button));
  els.calendarView.hidden = state.view !== "calendar";
  els.agendaView.hidden = state.view !== "agenda";
}));
document.querySelectorAll("[data-impact]").forEach(button => button.addEventListener("click", () => toggleFilter(button, "impact", state.impacts)));
document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => toggleFilter(button, "category", state.categories)));
document.querySelector("#exportButton").addEventListener("click", exportIcs);
document.querySelector("#themeButton").addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("calendar-theme", theme);
  applyTheme(theme);
});
els.nextEvent.addEventListener("click", () => openEvent(els.nextEvent.dataset.eventId));
els.dialog.addEventListener("click", event => {
  const rect = els.dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) els.dialog.close();
});

document.querySelector("#sourceLinks").innerHTML = Object.values(SOURCES).map(source => `<a href="${source.url}" target="_blank" rel="noopener">${source.label} ↗</a>`).join("");
applyTheme();
render();
updateNextEvent();
setInterval(updateNextEvent, 60000);

// Ponytail check: one executable assertion catches malformed or out-of-range source data.
console.assert(events.every(event => event.date >= "2026-09-12" && event.date <= "2027-01-01" && DETAILS[event.type]), "Calendarul conține un eveniment invalid");
