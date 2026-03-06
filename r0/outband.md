

__________ФАЗИ КОРОТКО

#￹​‌​‌​‌‌​​‌‌‌‌​‌‌‌​​​‌‌​​​​‌​​​​​‌‌​​‌‌​‌​‌​​‌‌​​‌​​‌‌​​‌‌​‌‌‌​‌‌‌​‌​​​​​‌‌​‌‌‌​​​‌​‌​‌‌‌​‌​​‌‌​‌​‌​‌​​​‌​​​​‌​​​​​‌​‌‌‌​​‌​​​​​​￺# CLAN OUTBAND — Фази розробки

---

### Фаза 1 — Базове ядро
**Головний результат:** Захищений текстовий зв'язок

Текст (LXMF), ролі (MEMBER/OFFICER/ADMIN), provisioning
(.clan / QR / NFC / USB / BLE), Panic PIN + локальний wipe,
локальний Blacklist. Працює з Legacy RNode.

---

### Фаза 2 — Голос та QoS
**Головний результат:** Повноцінний PTT

Стрімінг Codec2 (SF9), Voice Messages (SF11),
пріоритизація трафіку (Voice > Text > Beacon),
Airtime Budget, оптимізація BLE MTU.

---

### Фаза 3 — Безпека та виживання
**Головний результат:** Повна модель безпеки

Succession (планова + emergency), Group Rekeying,
Remote Kill-switch, READ MODE (Radio Silence),
Smart Beacon, BLE Gateway, розширений Blacklist.

---

### Фаза 4 — Anti-EW (РЕБ)
**Головний результат:** Невидимість мережі

FHSS (стрибки по 5–8 частотах), Slot Model,
IFAC апаратний фільтр, синхронізація RTC,
повний захист від РЕР.

____________________ФУЛ ТЗ

🛡️ ПОВНЕ ТЕХНІЧНЕ ЗАВДАННЯ ЕКОСИСТЕМИ «CLAN» (v.2.0)

0. ГОЛОВНИЙ ПРИНЦИП v2.0
Single Frequency зараз. Channel Abstraction з першого дня. FHSS — окремий реліз, не hotfix.
Система розробляється фазово. Кожна фаза є робочим продуктом, а не проміжним станом. Архітектурні абстракції закладаються з фази 1 так, щоб фаза 4 була еволюцією, а не переписуванням.
Компоненти:

Додаток: OUTBAND (Android, форк Sideband на Python/Kivy)
Прошивка: COREBAND (ESP32 + LoRa, SX1262)
Принцип: «Залізо визначає фізику, Роль визначає логіку»

Модель сумісності:
Всі вузли (COREBAND та Legacy RNode) працюють на одній фізиці. COREBAND має розширені можливості. FHSS — стратегічний апгрейд усієї мережі у фазі 4, не поточний диференціатор.
Матриця можливостей по фазах
ФункціяCOREBANDLegacy RNodeФазаТекст (LXMF)✅✅1Ролі (MEMBER/OFFICER/ADMIN)✅✅1Provisioning (.clan/QR/USB/NFC/BLE)✅✅1Panic PIN + локальний wipe✅❌1Локальний Blacklist✅❌1Голос PTT✅❌2QoS (Voice > Text)✅❌2Succession (планова + emergency)✅❌3Group Rekeying✅❌3Remote Kill-switch✅❌3READ MODE (Radio Silence)✅❌3Smart Beacon✅❌3BLE Gateway (датчики)✅❌3FHSS✅❌4

1. АРХІТЕКТУРА ФІЗИЧНОГО ТА MAC РІВНЯ (L1–L2)
Цей розділ описує фундамент — закладається повністю у фазі 1 і не переписується у наступних.
1.1. Радіо

Чіп: SX1262 (основний). SX1278 — альтернатива.
Діапазон: 433 MHz
Бібліотека: RadioLib
Поточна конфігурація: single active frequency (channel_0)

1.2. Channel Abstraction Layer ⚠️ обов'язково з фази 1
MAC рівень ніколи не звертається до частоти напряму. Вся взаємодія з радіо — через абстракцію:
get_active_channel(timestamp) → frequency
Фаза 1–3:
pythondef get_active_channel(timestamp):
    return channel_0
Фаза 4 (FHSS):
pythondef get_active_channel(timestamp):
    return hop_table[slot_index(timestamp)]
```

Правила:
- `setFrequency()` викликається **тільки** з Channel Abstraction Layer
- Жодного прямого виклику частоти з бізнес-логіки, QoS, provisioning або UI
- Частота — не поле конфігурації, а результат функції

### 1.3. MAC Scheduler — мінімальна версія ⚠️ обов'язково з фази 1

Навіть без FHSS вводиться абстракція планувальника:

- **Frame tick** — внутрішній тайм-крок
- **Guard time** — захисний інтервал між передачами
- **TX window abstraction** — логіка "чи можна зараз передавати"

Це дозволить у фазі 4 додати слоти без переписування QoS та PTT логіки.

### 1.4. LBT + Random Backoff

- RSSI check перед кожною передачею
- Random Backoff: 100–500 мс якщо канал зайнятий
- Працює поверх single frequency, повністю сумісний з FHSS у фазі 4

### 1.5. BLE (з'єднання телефон ↔ донгл)

- Протокол: Bluetooth LE
- Обов'язкова оптимізація MTU для потокового аудіо Codec2 (фаза 2)
- Енергоспоживання в режимі очікування: < 50mA (Light Sleep / Deep Sleep)
- Автоматична корекція RTC донгла через BLE при кожному з'єднанні

### 1.6. Legacy RNode — повна сумісність

Сторонній RNode (стандартна прошивка Mark Qvist / Heltec / LILYGO) працює як рівноправний вузол на channel_0. Немає спеціального "деградованого режиму" на рівні L1/L2. Обмеження — тільки на рівні функціоналу (голос, wipe, succession — вимагають COREBAND).

---

## 2. МЕРЕЖЕВА АРХІТЕКТУРА

- **Транспорт:** Wi-Fi + LoRa + raw RF.
- **Протокол маршрутизації:** Reticulum (RNS) + custom lightweight UDP-like datagram
- **TTL:** 7 хопів
- **Транспортний пріоритет (автоматичний вибір):**
```
LoRa (COREBAND/RNode) → WiFi → BLE
```


Вузол з донглом стає gateway для вузлів без нього.

---

## 3. РОЛІ ТА СТАТУСИ

### Ролі (логічні права — визначаються підписом)

| Роль | Права |
|------|-------|
| `ROLE_MEMBER` | Чат, мапи, PTT (фаза 2), SOS Mode |
| `ROLE_OFFICER` | + Voice Priority Override, Tactical Wipe, Telemetry Force |
| `ROLE_ADMIN` | + Керування параметрами мережі, Group Rekeying (фаза 3), Consensus Wipe |

### Статуси (апаратні можливості — визначаються залізом)

| Статус | Залізо | Можливості |
|--------|--------|------------|
| `STATUS_RECRUIT` | будь-яке | текст, базові функції |
| `STATUS_RANGER` | тільки COREBAND | + голос, beacon, wipe, succession |

> Роль і статус — незалежні поняття. OFFICER з Legacy RNode має повні права на підписання пакетів та управління групою, але не може використовувати PTT або Smart Beacon.

---

## 4. ТЕХНІЧНИЙ СТЕК

- **App:** Python (Kivy), rNS SDK, bleak, pyserial
- **Firmware:** C++ (RadioLib, mbedtls)
- **Голос:** Codec2 (700C) + VAD — фаза 2
- **Шифрування:** Curve25519 + AES-256-GCM (текст), AES-128 (голос — фаза 2)

**Два режими донглу:**
- **COREBAND mode:** власний протокол, повний запис параметрів у NVS
- **Legacy RNode mode:** стандартний RNode Firmware через `pyserial`, параметри зберігаються лише в OUTBAND

**Автоматичне визначення типу донглу:**
При підключенні по BLE або USB-OTG OUTBAND виконує handshake-запит.
- COREBAND відповідає ідентифікатором (firmware version + CLAN signature) →
  OUTBAND встановлює COREBAND mode
- Сторонній RNode не відповідає на CLAN handshake або відповідає стандартним
  RNode протоколом → OUTBAND встановлює Legacy RNode mode
- UI відображає тип підключеного донглу. Якщо автовизначення не спрацювало —
  доступний ручний вибір режиму як fallback.

---

## 5. ФАЗА 1 — БАЗОВЕ ЯДРО

*Результат: захищений текстовий зв'язок, ролі, provisioning, локальна безпека.*
*Орієнтовний термін: 3–4 місяці.*

### 5.1. Текст (LXMF)

- Single frequency (channel_0 через Channel Abstraction Layer)
- TTL = 7
- FIFO черга (QoS з'явиться у фазі 2)
- Офлайн-карти .mbtiles, відображення вузлів

### 5.2. Офлайн-режим OUTBAND (без донглу)

**WiFi режим:**
- Reticulum через TCP/UDP поверх WiFi
- Повний текстовий чат, файли, мапи
- Обмеження: немає LoRa-дальності

### 5.3. Визначення типу донглу

Виконується автоматично при кожному підключенні по BLE або USB-OTG.
Результат визначає шлях provisioning (розділ 5.7) та доступний функціонал.
Без успішного визначення типу provisioning не запускається.

**BLE-Only режим:**
- Reticulum через BLE між двома телефонами напряму
- Дальність ~10–30 м
- Для передачі ключів при provisioning, екстреного зв'язку впритул

### 5.4. Ролі (спрощені)

MEMBER / OFFICER / ADMIN — без succession логіки. Без emergency vote. Призначення ролей — підписаним пакетом від ADMIN.

### 5.5. Криптомодель v1

- Curve25519 для E2EE між Identity
- Один груповий session key
- AES-256-GCM для тексту, обов'язковий nonce counter
- Без rekey (з'явиться у фазі 3)
- Без forward secrecy на цьому етапі

### 5.6. Panic PIN + Локальний Wipe

- **Нормальний PIN:** вхід як ROLE_ADMIN
- **Skip при вході:** запуск як ROLE_OFFICER
- **Panic PIN (код під примусом):** вхід як ROLE_MEMBER, додаток імітує нормальну роботу, тихо виконує:
  - Zeroization RAM
  - NVS erase
  - Видалення локальних ключів
  - Надсилання пакета «Компрометація вузла» (обробка — фаза 3)
- Без віддаленого kill-switch у фазі 1

### 5.7. Локальний Blacklist

Мінімальна версія для фази 1:

- Локальний список заблокованих Identity на кожному пристрої
- ADMIN або OFFICER може додати Identity до локального Blacklist
- Пакети від заблокованих Identity ігноруються на рівні OUTBAND
- Розповсюдження по мережі (signed revoke packet) — фаза 3

> Це дозволяє реагувати на компрометацію пристрою навіть без повної інфраструктури безпеки фази 3.

### 5.8. Provisioning (повна версія з фази 1)

#### Ключовий принцип
Система є канало-агностичною. Будь-яка стадія онбордингу можлива через будь-який цифровий або візуальний канал.

#### Методи передачі

- **Файл (.clan):** SD-карти, флешки, «цифрові кур'єри», сторонні месенджери
- **QR-код:** передача публічних ключів або конфігурацій через сканування екрана
- **NFC (Tap-to-Join):** миттєвий обмін при фізичному контакті (максимальна скритність)
- **USB-OTG / Кабель:** пряме з'єднання в умовах повного радіомовчання
- **BLE / Wi-Fi Hotspot:** тимчасове локальне з'єднання для групового онбордингу

#### Bootstrap — перший запуск (нова мережа)

1. **Генерація ADMIN Identity:** Ed25519 keypair на пристрої ADMIN
2. **Визначення параметрів:** Group Name, базова частота (channel_0), IFAC ключ
3. **Експорт пакета:** ADMIN обирає метод (QR, файл або NFC)
4. **Верифікація:** обов'язкова звірка fingerprint — перші **8 символів** публічного ключа ADMIN. Єдиний захист від MITM при першому контакті.

#### Онбординг нових учасників

1. **Запит:** новий учасник генерує Identity в OUTBAND, передає публічний ключ ADMIN-у (файл / QR / USB / NFC)
2. **Підпис:** ADMIN (або OFFICER) валідує ключ, підписує provisioning-пакет під цей Identity
3. **Передача пакета:**
   - *Пряма:* USB / NFC / QR при зустрічі
   - *Асинхронна:* файл через CLAN мережу або сторонні канали
4. **Синхронізація з донглом:**
   - *COREBAND:* OUTBAND записує параметри в NVS → STATUS_RANGER
   - *Legacy RNode:* параметри зберігаються тільки в OUTBAND, фіксована channel_0 через `pyserial` → STATUS_RECRUIT. UI: ⚠️ **Legacy Mode**

#### Re-provisioning (після втрати пристрою)

- ADMIN додає втрачений Identity до локального Blacklist
- Учасник отримує новий пристрій та проходить онбординг заново
- Стара Identity інвалідується назавжди

#### Provisioning без ADMIN (деградований режим)

- Два OFFICER спільно підписують тимчасовий пакет
- Учасник отримує статус MEMBER
- Підтвердження ADMIN-ом — при першій можливості
- Методи: USB-кабель, файл, Wi-Fi Direct

---

## 6. ФАЗА 2 — ГОЛОС ТА QoS

*Результат: повноцінний PTT, голосові повідомлення, пріоритизація трафіку.*
*Орієнтовний термін: +2–3 місяці після фази 1.*

### 6.1. Голос

- **Кодек:** Codec2 700C + VAD (стиснення пауз)
- **PTT (Stream):** SF9/250kHz. TOT — 10 сек (з countdown). Guard Time — 3 сек.
- **Voice Messages:** запис до 10 сек, SF11 для надійності доставки. Fragmentation layer.
- **Шифрування голосу:** AES-128

### 6.2. QoS Layer

- Priority queue: **Голос (Stream) > Текст (LXMF) > Beacon**
- При вхідному аудіо-стрімі прошивка призупиняє обробку інших черг
- Starvation protection (текст не блокується голосом нескінченно)

MAC Scheduler розширюється:
- TX reservation
- Soft preemption
- Token model (два PTT не стартують одночасно)

### 6.3. Airtime Budget Control

- Rate limit per identity
- Flood protection
- Beacon suppression при congestion

---

## 7. ФАЗА 3 — БЕЗПЕКА ТА ВИЖИВАННЯ

*Результат: повна модель безпеки — succession, rekey, remote wipe, READ MODE, розширений beacon.*
*Орієнтовний термін: +3 місяці після фази 2.*

### 7.1. Succession — планова спадкоємність

Передача прав ADMIN після 24 годин «тиші» або через Check-in Request (1 година на введення PIN).

> **«Тиша»** відраховується від останнього валідно підписаного пакета від ADMIN-ідентифікатора. В READ MODE таймер не запускається — ADMIN надсилає heartbeat раз на 6 годин.

### 7.2. Emergency Succession — після компрометації

При отриманні будь-яким вузлом пакета «Компрометація вузла» (від Panic PIN або вручну від OFFICER):

1. **Заморожування:** скомпрометований ADMIN додається до Blacklist на всіх вузлах. Всі його пакети ігноруються.
2. **Emergency Vote:** підписаний голос від **+2 OFFICER** або **+1 OFFICER + +3 MEMBER**. Голосування діє 2 години.
3. **Передача повноважень:** OFFICER підвищується до ADMIN. Виконується Group Rekeying.
4. **Якщо OFFICER недостатньо:** група працює в режимі «без ADMIN» (тільки текст через існуючі ключі) до появи кворуму або фізичної зустрічі.

### 7.3. Rekey Engine

- Group key versioning
- Key epoch number
- Signed rekey packets
- Replay protection
- Consensus Wipe: кворум +1 ADMIN або +2 OFFICER

### 7.4. Розширений Blacklist

Апгрейд локального Blacklist з фази 1:

- Signed revoke packet — розповсюджується по меш-мережі
- Identity invalidation на всіх вузлах
- Epoch-bound validity

### 7.5. Remote Kill-switch

- Дистанційне затирання пам'яті NVS цільового вузла
- Ініціюється підписаним пакетом від ADMIN (або кворуму OFFICER)
- Вузол після отримання: Zeroization RAM → NVS erase → перезавантаження

### 7.6. READ MODE (Radio Silence)

Спеціальний перемикач в UI:

- **TX OFF:** Beacon, текст та голос не надсилаються в ефір
- **RX ON:** пристрій залишається на прийомі — невидимий для РЕР
- **Heartbeat виняток:** раз на 6 годин надсилається мінімальний підписаний пакет присутності для запобігання помилкового спрацювання Succession

### 7.7. Smart Beacon

Динамічна телеметрія для STATUS_RANGER (тільки COREBAND):

- Базова частота: 15 хв
- Jitter: ±60 сек для запобігання broadcast storm (оптимізація для 200+ вузлів)
- Відображення на мапі: роль + заряд батареї
- Автоматичне пригнічення при congestion (Airtime Budget Control)

### 7.8. BLE Gateway

Тільки COREBAND:

- Автономне опитування датчиків руху/розтяжок через BLE
- Самостійна генерація тривожного пакета без участі телефону
- Service Diagnostics: візуалізація Noise Floor та SNR

### 7.9. UI/UX розширення фази 3

- **Firmware Manager:** Legacy Backup (USB-OTG), Snapshot, Rollback (N-1)
- Відображення статусу Succession таймера
- Індикатор READ MODE
- Відображення epoch номера групового ключа

---

## 8. ФАЗА 4 — FHSS

*Результат: frequency hopping, повний захист від РЕБ/РЕР.*
*Орієнтовний термін: +4–6 місяців після фази 3.*

> **Передумова:** якщо Channel Abstraction Layer і MAC Scheduler реалізовані правильно у фазах 1–3 — фаза 4 є заміною однієї функції і розширенням планувальника. Жодна бізнес-логіка не переписується.

### 8.1. Slot Model

- Fixed slot duration
- Global time model
- OTA time sync між вузлами
- Drift compensation

### 8.2. Hop Table

- Seed → детермінована hop sequence (на основі групового ключа)
- Guard window між стрибками
- Channel settle time для SX1262

### 8.3. MAC Scheduler — повна версія
```
for each slot:
    tune_radio(get_active_channel(now))
    LBT()
    transmit_if_window()
Уся логіка вище (QoS, PTT, Beacon) залишається незмінною.
8.4. IFAC — апаратний фільтр

4-байтовий апаратний фільтр пакетів на рівні SX1262
Seed базується на груповому ключі
Передається на COREBAND при provisioning (записується в NVS)
Legacy RNode: software IFAC в OUTBAND (як у фазах 1–3)

8.5. Наслідки для сумісності
При переході на фазу 4:

Legacy RNode залишається на channel_0 (фіксована частота)
COREBAND стрибає по сітці
UI відображає попередження: ⚠️ Мережа перейшла на FHSS. Legacy RNode не бачить FHSS-трафік.
Рішення про підтримку змішаного режиму — на момент розробки фази 4


9. ПЛАН ПО ЧАСУ
ФазаЗмістОрієнтовний термін1Текст, ролі, provisioning, Panic PIN, локальний Blacklist3–4 місяці2Голос, QoS, Airtime Budget+2–3 місяці3Succession, Rekey, Kill-switch, READ MODE, Smart Beacon, BLE Gateway+3 місяці4FHSS, Slot Model, IFAC hardware+4–6 місяцівРазом~12–16 місяців

10. АРХІТЕКТУРНІ ІНВАРІАНТИ — НЕ ПОРУШУВАТИ НІКОЛИ
Це умови, порушення яких робить фазу 4 болісним переписуванням:

setFrequency() викликається тільки з Channel Abstraction Layer
MAC не знає, що частота одна — він працює тільки з get_active_channel(timestamp)
PTT і Beacon враховують frame boundaries MAC Scheduler
Часова модель існує з фази 1 (навіть примітивна)
Частота — не поле конфігурації в UI або provisioning


