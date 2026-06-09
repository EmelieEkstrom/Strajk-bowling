User Stories & Acceptanskriterier

User Story 1: Boka datum, tid och antal spelare
Som användare vill jag kunna boka datum och tid samt ange antal spelare så att jag kan reservera 1 eller flera baner i bowlinghallen.

**Acceptanskriterier:**
-  Användaren kan välja ett datum via datumfält
-  Användaren kan välja en tid via tidsfält  
-  Användaren kan ange antal spelare (1+)
-  Användaren kan ange antal baner (1+)
-  Alla fält är synliga och märkta på bokningssidan
-  Formuläret uppdateras när användaren skriver in värden

Testfall: `BookingInfo.test.jsx` - Tests för att alle input-fält renderas och uppdateras korrekt

User Story 2: Välja skostorlek för varje spelare
Som användare vill jag kunna välja skostorlek för varje spelare så varje spelare får skor som passar.**

**Acceptanskriterier:**
-  En skostorleksfält läggs till för varje spelare som bokas
-  Användaren kan fylla i skostorleken för varje spelare
-  Skostorleken accepteras endast för 2-siffriga värden (37-46)
-  Varje skofält är markerat med spelarens ID

Testfall: `Shoes.test.jsx` - Tests för att skofält renderas och updateSize anropas

User Story 3: Ta bort skostorlek
Som användare vill jag kunna ta bort ett fält för skostorlek om jag råkade klicka i ett för mycket så jag inte boka skor i onödan.**

Acceptanskriterier:
-  Det finns en "-" knapp för varje skofält
-  När "-" klickas tas motsvarande skofält bort
- removeShoe-funktionen anropas med korrekt shoe ID

Testfall: `Shoes.test.jsx` - Tests för att "-" knappen anropar removeShoe med korrekt ID

User Story 4: Skicka reservation och få bokningsnummer + totalsumma
**Som användare vill jag kunna skicka iväg min reservation och få tillbaka ett bokningsnummer och totalsumma så jag vet hur mycket jag ska betala. (120 kr / person + 100 kr / bana).**

Acceptanskriterier:
-  POST-anrop skickas med alla bokningsdetaljer
-  Prisberäkning är korrekt: (personer × 120 kr) + (baner × 100 kr)
-  Ett unikt bokningsnummer returneras
-  Totalpriset visas i bekräftelsen
-  Alla obligatoriska fält måste vara ifyllda innan bokningsbegäran
- Antalet skor måste matcha antalet spelare

Testfall: `Booking.test.jsx` - Tests för POST-anrop med MSW mock, prisberäkning

User Story 5: Navigera tillbaka efter bekräftelse
**Som användare vill jag kunna navigera tillbaka till bokningsvyn efter bekräftelse.**

Acceptanskriterier:
-  En knapp "Sweet, let's go!" visas på bekräftelsesidan
-  Klick på knappen nollställer bekräftelsen och visar bokningsvyn igen
-  Användaren kan sedan göra en ny bokning

Testfall:`Confirmation.test.jsx` - Tests för att knappklick anropar setConfirmation med tomt objekt


