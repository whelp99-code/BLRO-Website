/* v2.2. Opacity, transform, stroke-dashoffset, class toggles. No layout reads on scroll.
   Capture aid: ?y=NNNN scrolls after load and reveals elements already in view. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var params = new URLSearchParams(location.search);
  var timeline = !!(window.CSS && CSS.supports("animation-timeline: view()"));
  document.documentElement.classList.add("js");
  if (reduce) return;

  if (timeline) document.documentElement.classList.add("js-timeline");

  var groups = new Map();
  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    var parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    var i = groups.get(parent);
    groups.set(parent, i + 1);
    el.style.setProperty("--stagger", String(Math.min(i, 5)));
  });

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-io");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        if (entry.target.classList.contains("life-step")) markLife();
      });
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0.08 });
    document.querySelectorAll("[data-reveal], [data-step]").forEach(function (el) { io.observe(el); });

    var stageIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("data-stage");
        document.querySelectorAll("[data-stage-row]").forEach(function (row) {
          row.classList.toggle("is-active", row.getAttribute("data-stage-row") === id);
        });
        var live = document.querySelector("[data-stage-live]");
        var title = entry.target.querySelector("h3");
        if (live && title) live.textContent = title.textContent;
      });
    }, { rootMargin: "-35% 0px -45% 0px", threshold: 0.15 });
    document.querySelectorAll("[data-stage]").forEach(function (el) { stageIo.observe(el); });
  }

  function markLife() {
    if (document.documentElement.classList.contains("js-timeline")) return;
    var steps = document.querySelectorAll(".life-step");
    var lit = 0;
    steps.forEach(function (step) { if (step.classList.contains("is-in")) lit += 1; });
    var path = document.querySelector(".life-progress");
    if (!path) return;
    path.style.strokeDashoffset = String(100 - (lit / Math.max(steps.length, 1)) * 100);
    if (lit === steps.length) path.classList.add("is-drawn");
  }

  if (params.has("y")) {
    var y = parseInt(params.get("y"), 10) || 0;
    window.addEventListener("load", function () {
      window.scrollTo(0, y);
      document.querySelectorAll("[data-reveal], [data-step]").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in");
      });
      markLife();
    });
  }
})();
