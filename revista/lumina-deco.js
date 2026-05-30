/* ============================================================
   Lumina · Decoración de artículos
   Añade una portada celeste (arte vectorial) y un símbolo dorado
   antes de cada sección, en cualquier artículo de la Revista.
   Un solo archivo decora TODOS los artículos.
   ============================================================ */
(function () {
  if (window.__lumDeco) return;
  window.__lumDeco = true;

  function run() {
    var article = document.querySelector("article");
    if (!article) return;
    var GOLD = "#d8b46a";

    // --- helpers de arte ---
    function dot(x, y, r, op) {
      return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + GOLD + '" fill-opacity="' + op + '"/>';
    }
    function sparkle(x, y, s, op) {
      return '<path d="M' + x + ' ' + (y - s) + ' L' + (x + s * 0.22) + ' ' + (y - s * 0.22) +
        ' L' + (x + s) + ' ' + y + ' L' + (x + s * 0.22) + ' ' + (y + s * 0.22) +
        ' L' + x + ' ' + (y + s) + ' L' + (x - s * 0.22) + ' ' + (y + s * 0.22) +
        ' L' + (x - s) + ' ' + y + ' L' + (x - s * 0.22) + ' ' + (y - s * 0.22) +
        ' Z" fill="' + GOLD + '" fill-opacity="' + op + '"/>';
    }

    // constelaciones a izquierda y derecha
    var stars = "";
    var L = [[150, 60], [195, 82], [235, 52], [268, 88], [245, 125]];
    var Rt = [[650, 140], [605, 118], [565, 148], [532, 112], [555, 75]];
    [L, Rt].forEach(function (set) {
      set.forEach(function (p) { stars += dot(p[0], p[1], 2, 0.85); });
      stars += '<polyline points="' + set.map(function (p) { return p.join(","); }).join(" ") +
        '" fill="none" stroke="' + GOLD + '" stroke-opacity="0.32" stroke-width="1"/>';
    });
    // destellos y polvo de estrellas
    stars += sparkle(330, 55, 5, 0.9) + sparkle(470, 150, 4, 0.8) + sparkle(360, 162, 3, 0.7) +
      sparkle(452, 48, 3.5, 0.8) + sparkle(300, 142, 3, 0.6) + sparkle(500, 60, 3, 0.6);
    stars += dot(345, 120, 1.3, 0.6) + dot(455, 95, 1.3, 0.5) + dot(420, 152, 1.2, 0.5) +
      dot(380, 45, 1.2, 0.5) + dot(515, 130, 1.2, 0.5) + dot(285, 70, 1.2, 0.5);

    var svg =
      '<svg viewBox="0 0 800 200" width="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
      '<radialGradient id="lumMoon" cx="38%" cy="32%" r="75%"><stop offset="0%" stop-color="#fff8e6"/><stop offset="45%" stop-color="#d8b46a"/><stop offset="100%" stop-color="#6b5320"/></radialGradient>' +
      '<radialGradient id="lumGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d8b46a" stop-opacity="0.30"/><stop offset="100%" stop-color="#d8b46a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="lumLine"><stop offset="0%" stop-color="#d8b46a" stop-opacity="0"/><stop offset="50%" stop-color="#d8b46a" stop-opacity="0.7"/><stop offset="100%" stop-color="#d8b46a" stop-opacity="0"/></linearGradient>' +
      "</defs>" +
      '<circle cx="400" cy="100" r="120" fill="url(#lumGlow)"/>' +
      '<rect x="90" y="99.4" width="210" height="1.2" fill="url(#lumLine)"/>' +
      '<rect x="500" y="99.4" width="210" height="1.2" fill="url(#lumLine)"/>' +
      '<ellipse cx="400" cy="100" rx="66" ry="66" fill="none" stroke="#d8b46a" stroke-opacity="0.30" stroke-width="1"/>' +
      '<ellipse cx="400" cy="100" rx="98" ry="34" fill="none" stroke="#d8b46a" stroke-opacity="0.18" stroke-width="1" transform="rotate(-18 400 100)"/>' +
      stars +
      '<circle cx="400" cy="100" r="29" fill="url(#lumMoon)"/>' +
      "</svg>";

    var cover = document.createElement("div");
    cover.className = "lum-cover";
    cover.innerHTML = svg;
    var h1 = article.querySelector("h1");
    if (h1) article.insertBefore(cover, h1); else article.insertBefore(cover, article.firstChild);

    // símbolo dorado antes de cada sección
    var glyphs = ["\u2609", "\u263D", "\u2726", "\u263F", "\u2640", "\u2643", "\u2736", "\u2644", "\u263E", "\u2727"];
    var h2s = article.querySelectorAll("h2");
    Array.prototype.forEach.call(h2s, function (h2, i) {
      var orn = document.createElement("div");
      orn.className = "lum-orn";
      orn.innerHTML = '<span class="g">' + glyphs[i % glyphs.length] + '</span><span class="l"></span>';
      h2.parentNode.insertBefore(orn, h2);
    });

    var css = document.createElement("style");
    css.textContent =
      ".lum-cover{margin:0 0 4px;filter:drop-shadow(0 0 24px rgba(216,180,106,.18))}" +
      ".lum-orn{display:flex;align-items:center;gap:13px;margin:40px 0 2px}" +
      ".lum-orn .g{color:#d8b46a;font-size:22px;line-height:1}" +
      ".lum-orn .l{height:1px;flex:0 0 90px;background:linear-gradient(90deg,#d8b46a,rgba(216,180,106,0))}";
    document.head.appendChild(css);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
