(function () {
  "use strict";

  if (window.HiveTrack) return;

  var script = document.currentScript || document.getElementById("hive-track-script");
  var configuredBase =
    (window.HIVE_TRACK && window.HIVE_TRACK.crmBase) ||
    (script && script.getAttribute("data-crm-base")) ||
    "";
  var crmBase = String(configuredBase).replace(/\/+$/, "");
  var endpoint = crmBase ? crmBase + "/api/track/event" : "";
  var cookieName = "hs_session_id";
  var cookieMaxAge = 365 * 24 * 60 * 60;
  var flushIntervalMs = 2500;
  var queue = [];
  var lastUrl = window.location.href;
  var scrollDepths = {};

  function noop() {}

  if (!crmBase) {
    console.warn("[HiveTrack] Missing crmBase; tracking is disabled.");
    window.HiveTrack = {
      getSessionId: function () { return ""; },
      bindForm: noop,
      trackPageview: noop,
      flush: noop,
    };
    return;
  }

  function readCookie(name) {
    var prefix = name + "=";
    var cookies = document.cookie ? document.cookie.split(";") : [];
    for (var i = 0; i < cookies.length; i += 1) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(prefix) === 0) {
        try {
          return decodeURIComponent(cookie.slice(prefix.length));
        } catch (_error) {
          return cookie.slice(prefix.length);
        }
      }
    }
    return "";
  }

  function getSessionId() {
    var existing = readCookie(cookieName);
    if (existing) return existing;

    var sessionId = window.crypto.randomUUID();
    var secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      cookieName +
      "=" +
      encodeURIComponent(sessionId) +
      "; Max-Age=" +
      cookieMaxAge +
      "; Path=/; SameSite=Lax" +
      secure;
    return sessionId;
  }

  var sessionId = getSessionId();
  var firstQuery = new URLSearchParams(window.location.search);
  var referrerUrl = document.referrer || null;

  function queryValue(name) {
    return firstQuery.get(name) || null;
  }

  function deviceType() {
    if (/Mobi|Android|iPhone|iPod/i.test(navigator.userAgent)) return "mobile";
    if (/iPad|Tablet/i.test(navigator.userAgent) || window.innerWidth < 1024) return "tablet";
    return "desktop";
  }

  function browserName() {
    var userAgent = navigator.userAgent;
    if (/Edg\//.test(userAgent)) return "Edge";
    if (/OPR\//.test(userAgent)) return "Opera";
    if (/Chrome\//.test(userAgent)) return "Chrome";
    if (/Firefox\//.test(userAgent)) return "Firefox";
    if (/Safari\//.test(userAgent)) return "Safari";
    return "Other";
  }

  function osName() {
    var userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/Windows/.test(userAgent)) return "Windows";
    if (/Mac OS X/.test(userAgent)) return "macOS";
    if (/Linux/.test(userAgent)) return "Linux";
    return "Other";
  }

  var attribution = {
    referrer_url: referrerUrl,
    utm_source: queryValue("utm_source"),
    utm_medium: queryValue("utm_medium"),
    utm_campaign: queryValue("utm_campaign"),
    utm_content: queryValue("utm_content"),
    utm_term: queryValue("utm_term"),
    fbclid: queryValue("fbclid"),
    gclid: queryValue("gclid"),
    li_fat_id: queryValue("li_fat_id"),
    ttclid: queryValue("ttclid"),
    device_type: deviceType(),
    browser: browserName(),
    os: osName(),
  };

  function eventPayload(eventType, details) {
    details = details || {};
    return {
      session_id: sessionId,
      event_type: eventType,
      page_url: details.page_url || window.location.href,
      page_title: document.title || null,
      element_selector: details.element_selector || null,
      x: typeof details.x === "number" ? Math.round(details.x) : null,
      y: typeof details.y === "number" ? Math.round(details.y) : null,
      viewport_width: Math.round(window.innerWidth),
      viewport_height: Math.round(window.innerHeight),
      referrer_url: attribution.referrer_url,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      fbclid: attribution.fbclid,
      gclid: attribution.gclid,
      li_fat_id: attribution.li_fat_id,
      ttclid: attribution.ttclid,
      device_type: attribution.device_type,
      browser: attribution.browser,
      os: attribution.os,
    };
  }

  function send(event, preferBeacon) {
    var body = JSON.stringify(event);

    if (preferBeacon && navigator.sendBeacon) {
      var sent = navigator.sendBeacon(
        endpoint,
        new Blob([body], { type: "application/json" }),
      );
      if (sent) return;
    }

    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: body,
      keepalive: Boolean(preferBeacon),
    }).catch(function (error) {
      console.warn("[HiveTrack] Event request failed.", error);
    });
  }

  function flush(preferBeacon) {
    if (!queue.length) return;
    var pending = queue.splice(0, queue.length);
    for (var i = 0; i < pending.length; i += 1) {
      send(pending[i], Boolean(preferBeacon));
    }
  }

  function trackPageview() {
    send(eventPayload("pageview"), false);
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function stableSelector(target) {
    var element =
      target.closest &&
      target.closest("a,button,input,select,textarea,label,[role='button'],[data-track]");
    if (!element) element = target;

    var parts = [];
    while (element && element !== document.body && parts.length < 4) {
      if (element.id) {
        parts.unshift("#" + cssEscape(element.id));
        break;
      }

      var trackedName =
        element.getAttribute("data-track") ||
        element.getAttribute("data-testid") ||
        element.getAttribute("name");
      if (trackedName) {
        var attribute = element.hasAttribute("data-track")
          ? "data-track"
          : element.hasAttribute("data-testid")
            ? "data-testid"
            : "name";
        parts.unshift(
          element.tagName.toLowerCase() +
            "[" +
            attribute +
            '="' +
            cssEscape(trackedName) +
            '"]',
        );
        break;
      }

      var part = element.tagName.toLowerCase();
      var classNames = Array.prototype.slice
        .call(element.classList || [])
        .filter(function (name) {
          return name.length < 48 && name.indexOf(":") === -1 && name.indexOf("[") === -1;
        })
        .slice(0, 2);
      if (classNames.length) {
        part +=
          "." +
          classNames
            .map(function (name) {
              return cssEscape(name);
            })
            .join(".");
      }

      var parent = element.parentElement;
      if (parent) {
        var sameTag = Array.prototype.filter.call(parent.children, function (child) {
          return child.tagName === element.tagName;
        });
        if (sameTag.length > 1) {
          part += ":nth-of-type(" + (sameTag.indexOf(element) + 1) + ")";
        }
      }

      parts.unshift(part);
      element = parent;
    }
    return parts.join(" > ").slice(0, 500) || null;
  }

  function bindForm(form) {
    if (!form || form.nodeName !== "FORM") return;
    var input = form.querySelector('input[name="session_id"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = "session_id";
      form.appendChild(input);
    }
    input.value = sessionId;
  }

  function bindForms(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var forms = scope.querySelectorAll(
      'form[data-hive-track], form#admissions-form, form[action*="leads/website"]',
    );
    for (var i = 0; i < forms.length; i += 1) bindForm(forms[i]);
    if (
      root &&
      root.matches &&
      root.matches(
        'form[data-hive-track], form#admissions-form, form[action*="leads/website"]',
      )
    ) {
      bindForm(root);
    }
  }

  function handleUrlChange() {
    if (window.location.href === lastUrl) return;
    lastUrl = window.location.href;
    scrollDepths = {};
    window.setTimeout(trackPageview, 0);
  }

  function patchHistory(method) {
    var original = window.history[method];
    if (typeof original !== "function") return;
    window.history[method] = function () {
      var result = original.apply(this, arguments);
      handleUrlChange();
      return result;
    };
  }

  patchHistory("pushState");
  patchHistory("replaceState");
  window.addEventListener("popstate", handleUrlChange);

  document.addEventListener(
    "click",
    function (event) {
      if (!(event.target instanceof Element)) return;
      queue.push(
        eventPayload("click", {
          element_selector: stableSelector(event.target),
          x: event.clientX,
          y: event.clientY,
        }),
      );
    },
    true,
  );

  window.addEventListener(
    "scroll",
    function () {
      var root = document.documentElement;
      var maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
      if (!maxScroll) return;
      var percent = Math.min(100, (window.scrollY / maxScroll) * 100);
      var thresholds = [25, 50, 75, 100];

      for (var i = 0; i < thresholds.length; i += 1) {
        var threshold = thresholds[i];
        if (percent >= threshold && !scrollDepths[threshold]) {
          scrollDepths[threshold] = true;
          queue.push(
            eventPayload("scroll_depth", {
              element_selector: "scroll:" + threshold + "%",
            }),
          );
        }
      }
    },
    { passive: true },
  );

  window.setInterval(function () {
    flush(false);
  }, flushIntervalMs);

  window.addEventListener("pagehide", function () {
    flush(true);
  });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flush(true);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindForms(document);
    });
  } else {
    bindForms(document);
  }

  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i += 1) {
        for (var j = 0; j < mutations[i].addedNodes.length; j += 1) {
          var node = mutations[i].addedNodes[j];
          if (node.nodeType === 1) bindForms(node);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  window.HiveTrack = {
    getSessionId: getSessionId,
    bindForm: bindForm,
    trackPageview: trackPageview,
    flush: function () {
      flush(false);
    },
  };

  trackPageview();
})();
