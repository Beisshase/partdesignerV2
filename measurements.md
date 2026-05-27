# Measurements – Parameterbeschreibung

Alle Maße (außer `technicUnit`, `lipSubdivisions` und `subdivisionsPerQuarter`) sind als
Bruchteile der `technicUnit` gespeichert. Beim STL-Export werden sie mit `technicUnit`
multipliziert, um reale Millimeterwerte zu erhalten.

---

## Basiseinheit

### technicUnit (Standard: 8 mm)
Die Grundeinheit des gesamten Systems. Entspricht einem LEGO-Technic-Raster (Lochabstand =
8 mm). Alle anderen Maße werden intern durch diesen Wert geteilt und sind damit
dimensionslos (Vielfache der Einheit). Beim Export in STL wird mit `technicUnit`
zurückskaliert.

---

## Geometrie-Qualität

### subdivisionsPerQuarter (Standard: 8)
Anzahl der Polygonsegmente pro Viertelkreis (90°). Steuert die Auflösung aller runden
Geometrien: Zylinder, Kreisscheiben, Kugeln, Kreisbögen. Muss eine gerade Zahl ≥ 2 sein.
Höhere Werte = glattere Kurven, aber mehr Dreiecke.

### lipSubdivisions (Standard: 6)
Anzahl der Segmente, in die der Umfang des Pin-Randes (Riffelung) unterteilt wird. Muss
≥ 2 sein. Beeinflusst nur die Riffelstruktur auf Pins.

---

## Außengeometrie

### edgeMargin (Standard: 0,2 mm / 0,025)
Randabstand an allen Außenkanten der Blöcke. Definiert, wie weit die Außenwand von der
theoretischen Blockkante zurückgesetzt ist, und erzeugt damit die abgerundeten Kanten.
Beeinflusst als Grundmaß viele weitere Parameter:
- `interiorRadius` ≤ 0,5 − edgeMargin
- `pinHoleOffset` ≤ 0,5 − edgeMargin
- `pinRadius` ≤ 0,5 − edgeMargin
- `attachmentAdapterSize` ≤ (0,5 − edgeMargin) / 2

Maximum: 0,49.

---

## Pin-Loch (BlockType: PinHole)

### interiorRadius (Standard: 3,2 mm / 0,4)
Radius des zylindrischen Innenkanals im Pin-Loch-Block. Definiert den sichtbaren
Lochöffnungs-Durchmesser auf der Blockoberfläche sowie den Übergangsbereich zwischen
Außengeometrie und eigentlichem Pin-Loch. Muss ≤ 0,5 − edgeMargin sein.

### pinHoleRadius (Standard: 2,475 mm / ~0,309)
Radius der eigentlichen zylindrischen Bohrung, in die ein LEGO-Pin gesteckt wird. Kleiner
als `interiorRadius` – der Kanal verjüngt sich von `interiorRadius` auf `pinHoleRadius`.
Muss ≤ `interiorRadius` sein.

### pinHoleOffset (Standard: 0,89 mm / ~0,111)
Axialer Abstand vom Blockrand bis zum Beginn des verengten Pin-Lochs. Erzeugt eine kurze
zylindrische Vorkammer mit `interiorRadius`, bevor die Bohrung auf `pinHoleRadius`
übergeht. Muss ≤ 0,5 − edgeMargin sein.

### interiorEndMargin (Standard: 0,2 mm / 0,025)
Minimalwandstärke an den Abschlusskappen der Innenkanäle (Pin-Loch und Axle-Loch).
Verhindert, dass die Bohrungen vollständig durch den Block durchgehen. Maximum: 0,49.

---

## Achsloch (BlockType: AxleHole)

### axleHoleSize (Standard: 1,01 mm / ~0,126)
Halbe Breite der quadratischen Achsbohrung. Das Achsloch ist (wie bei LEGO) quadratisch,
um Drehung zu verhindern. Dieser Wert definiert die Hälfte der Seitenlänge des Querschnitts.
Muss ≤ `interiorRadius` / 2 sein.

---

## Pin-Verbinder (BlockType: Pin)

### pinRadius (Standard: 2,315 mm / ~0,289)
Radius des zylindrischen Pin-Schafts, der aus dem Block herausragt. Entspricht dem
LEGO-Standard-Pin-Durchmesser. Muss ≤ 0,5 − edgeMargin sein.

### pinLipRadius (Standard: 0,17 mm / ~0,021)
Amplitudenradius der Riffelung auf dem Pin-Schaft. Erzeugt die charakteristische
sinusförmige Riefenstruktur auf LEGO-Pins (für Griffigkeit und Verrastung). Wird
additiv auf `pinRadius` angewendet.

---

## Achsverbinder (BlockType: Axle)

### axleSizeInner (Standard: 0,86 mm / ~0,108)
Innere Kantenlänge (Halbbreite) des kreuzförmigen Achsprofils. Definiert die schmale
Mittelzone des Kreuz-Querschnitts. Muss ≤ `axleSizeOuter` sein.

### axleSizeOuter (Standard: 2,15 mm / ~0,269)
Äußere Kantenlänge (Halbbreite) des kreuzförmigen Achsprofils. Definiert die Gesamtbreite
der Achsarme. Wird geometrisch durch `attachmentAdapterRadius` und `axleSizeInner`
begrenzt (Pythagoras-Bedingung).

---

## Übergangsadapter

### attachmentAdapterSize (Standard: 0,4 mm / 0,05)
Axiale Tiefe der Übergangszonen zwischen verschiedenen Verbindertypen (z. B. Pin→Solid,
Axle→PinHole). Erzeugt eine kurze zylindrische „Schulter" als sanften Übergang.
Muss ≤ (0,5 − edgeMargin) / 2 sein.

### attachmentAdapterRadius (Standard: 3,0 mm / 0,375)
Radius der zylindrischen Übergangszonen. Definiert, wie breit (radial) diese
Übergangsschultern sind. Wird von Pin-, Achsen- und Kugelgelenk-Adaptern verwendet.

---

## Kugelgelenk (BlockType: BallJoint)

### ballBaseRadius (Standard: 1,6 mm / 0,2)
Radius der zylindrischen Basis des Kugelgelenks – der Bereich zwischen Block und
Kugelkopf. Muss ≤ `interiorRadius` sein.

### ballRadius (Standard: 3,0 mm / 0,375)
Radius der Kugel des Kugelgelenks. Bestimmt die Größe des sphärischen Kopfes.
Der Öffnungswinkel der Kugel ergibt sich aus: `acos(ballBaseRadius / ballRadius)`.
Muss ≥ `ballBaseRadius` und ≤ 0,5 − `attachmentAdapterSize` sein.

---

## Abhängigkeiten auf einen Blick

```
technicUnit
    └─ alle anderen Werte (gespeichert als Vielfache)

edgeMargin (max 0.49)
    ├─ interiorRadius      ≤ 0.5 - edgeMargin
    ├─ pinHoleOffset       ≤ 0.5 - edgeMargin
    ├─ pinRadius           ≤ 0.5 - edgeMargin
    └─ attachmentAdapterSize ≤ (0.5 - edgeMargin) / 2

interiorRadius
    ├─ pinHoleRadius       ≤ interiorRadius
    ├─ axleHoleSize        ≤ interiorRadius / 2
    └─ ballBaseRadius      ≤ interiorRadius

attachmentAdapterRadius + axleSizeInner
    └─ axleSizeOuter       ≤ sqrt(attachmentAdapterRadius² - axleSizeInner²)

axleSizeOuter
    └─ axleSizeInner       ≤ axleSizeOuter

ballBaseRadius + attachmentAdapterSize
    └─ ballRadius          ∈ [ballBaseRadius, 0.5 - attachmentAdapterSize]

interiorEndMargin (max 0.49)   – unabhängig
pinLipRadius                   – unabhängig
lipSubdivisions    (min 2)     – unabhängig
subdivisionsPerQuarter (min 2, gerade) – unabhängig
```
