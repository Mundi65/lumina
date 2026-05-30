/* ============================================================
   Lumina · Decoración de artículos  (v2 — más vistosa)
   Portada con las tres cartas celestes del tarot (La Luna,
   La Estrella, El Sol) dibujadas en arte vectorial, + medallones
   dorados grandes antes de cada sección.
   Un solo archivo decora TODOS los artículos.
   ============================================================ */
(function () {
  if (window.__lumDeco) return;
  window.__lumDeco = true;

  function star(cx, cy, r, fill, pts) {
    pts = pts || 4; var v = pts * 2, out = [];
    for (var i = 0; i < v; i++) {
      var ang = (i * (360 / v) - 90) * Math.PI / 180;
      var rr = (i % 2 === 0) ? r : r * 0.42;
      out.push((cx + Math.cos(ang) * rr).toFixed(1) + ',' + (cy + Math.sin(ang) * rr).toFixed(1));
    }
    return '<polygon points="' + out.join(' ') + '" fill="' + fill + '"/>';
  }

  function card(type) {
    var title, num, mid = "";
    if (type === "sol") {
      title = "EL SOL"; num = "XIX";
      var rays = "";
      for (var a = 0; a < 12; a++) {
        var ang = a * 30 * Math.PI / 180;
        var x1 = 90 + Math.cos(ang) * 40, y1 = 132 + Math.sin(ang) * 40;
        var x2 = 90 + Math.cos(ang) * 60, y2 = 132 + Math.sin(ang) * 60;
        rays += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#d8b46a" stroke-width="1.6" stroke-linecap="round" stroke-opacity="0.85"/>';
      }
      mid = rays + '<circle cx="90" cy="132" r="32" fill="url(#sun_' + type + ')"/>';
    } else if (type === "estrella") {
      title = "LA ESTRELLA"; num = "XVII";
      mid = star(90, 120, 36, 'url(#sun_' + type + ')', 8)
        + star(48, 92, 9, '#d8b46a') + star(134, 98, 9, '#d8b46a')
        + star(58, 172, 7, '#d8b46a') + star(126, 170, 7, '#d8b46a') + star(90, 200, 8, '#d8b46a');
    } else {
      title = "LA LUNA"; num = "XVIII";
      mid = '<mask id="cm_' + type + '"><rect x="0" y="0" width="180" height="280" fill="white"/><circle cx="104" cy="118" r="30" fill="black"/></mask>'
        + '<circle cx="90" cy="128" r="34" fill="url(#sun_' + type + ')" mask="url(#cm_' + type + ')"/>'
        + star(122, 82, 8, '#d8b46a') + star(54, 168, 7, '#d8b46a') + star(132, 170, 6, '#d8b46a') + star(70, 96, 5, '#d8b46a');
    }
    return '<svg viewBox="0 0 180 280" xmlns="http://www.w3.org/2000/svg">'
      + '<defs>'
      + '<linearGradient id="bg_' + type + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#241a52"/><stop offset="100%" stop-color="#0c0a25"/></linearGradient>'
      + '<radialGradient id="sun_' + type + '" cx="40%" cy="35%" r="75%"><stop offset="0%" stop-color="#fff8e6"/><stop offset="50%" stop-color="#d8b46a"/><stop offset="100%" stop-color="#7a5e28"/></radialGradient>'
      + '</defs>'
      + '<rect x="3" y="3" width="174" height="274" rx="16" fill="url(#bg_' + type + ')" stroke="#d8b46a" stroke-width="2"/>'
      + '<rect x="11" y="11" width="158" height="258" rx="10" fill="none" stroke="#d8b46a" stroke-opacity="0.45" stroke-width="1"/>'
      + '<text x="90" y="42" text-anchor="middle" fill="#ecd9ac" font-family="Cormorant Garamond, serif" font-size="14" letter-spacing="1.5">' + title + '</text>'
      + mid
      + '<text x="90" y="252" text-anchor="middle" fill="#ecd9ac" font-family="Cormorant Garamond, serif" font-size="18" letter-spacing="3">' + num + '</text>'
      + '</svg>';
  }

  function run() {
    var article = document.querySelector("article");
    if (!article) return;

    // --- PORTADA: trío de cartas ---
    var cover = document.createElement("div");
    cover.className = "lum-cover";
    cover.innerHTML = '<div class="lum-trio">'
      + '<div class="lum-tc left">' + card("luna") + '</div>'
      + '<div class="lum-tc center">' + card("estrella") + '</div>'
      + '<div class="lum-tc right">' + card("sol") + '</div>'
      + '</div>';
    var h1 = article.querySelector("h1");
    if (h1) article.insertBefore(cover, h1); else article.insertBefore(cover, article.firstChild);

    // --- MEDALLONES antes de cada sección ---
    var glyphs = ["\u2609", "\u263D", "\u2726", "\u263F", "\u2640", "\u2643", "\u2736", "\u2644", "\u263E", "\u2727"];
    var h2s = article.querySelectorAll("h2");
    Array.prototype.forEach.call(h2s, function (h2, i) {
      var orn = document.createElement("div");
      orn.className = "lum-orn";
      orn.innerHTML = '<span class="l"></span><span class="badge">' + glyphs[i % glyphs.length] + '</span><span class="l r"></span>';
      h2.parentNode.insertBefore(orn, h2);
    });

    var css = document.createElement("style");
    css.textContent =
      ".lum-cover{position:relative;display:flex;justify-content:center;margin:10px 0 14px}" +
      ".lum-cover::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;height:300px;background:radial-gradient(ellipse,rgba(216,180,106,.16),transparent 70%);pointer-events:none}" +
      ".lum-trio{position:relative;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 12px 30px rgba(0,0,0,.55))}" +
      ".lum-tc{width:124px}.lum-tc svg{width:100%;height:auto;display:block}" +
      ".lum-tc.left{transform:rotate(-9deg) translateY(10px);margin-right:-26px;z-index:1}" +
      ".lum-tc.right{transform:rotate(9deg) translateY(10px);margin-left:-26px;z-index:1}" +
      ".lum-tc.center{z-index:2;transform:translateY(-8px) scale(1.07)}" +
      ".lum-orn{display:flex;align-items:center;justify-content:center;gap:18px;margin:48px 0 10px}" +
      ".lum-orn .l{height:1px;flex:0 0 80px;background:linear-gradient(90deg,transparent,#d8b46a)}" +
      ".lum-orn .l.r{background:linear-gradient(90deg,#d8b46a,transparent)}" +
      ".lum-orn .badge{width:54px;height:54px;border:1px solid #d8b46a;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#d8b46a;font-size:27px;box-shadow:0 0 18px rgba(216,180,106,.25);background:radial-gradient(circle,rgba(216,180,106,.08),transparent)}" +
      "@media(max-width:560px){.lum-tc{width:90px}.lum-orn .l{flex-basis:48px}}";
    document.head.appendChild(css);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
