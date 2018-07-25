function KeyboardInputManager() {
    this.events = {}, window.navigator.msPointerEnabled ? (this.eventTouchstart = "MSPointerDown", this.eventTouchmove = "MSPointerMove", this.eventTouchend = "MSPointerUp") : (this.eventTouchstart = "touchstart", this.eventTouchmove = 4 > androidVersion ? "touchend" : "touchmove", this.eventTouchend = "touchend"), this.listen()
}

function HTMLActuator() {
    this.tileContainer = document.querySelector(".tile-container"), this.scoreContainer = document.querySelector(".score-container"), this.bestContainer = document.querySelector(".best-container"), this.messageContainer = document.querySelector(".game-message"), this.score = 0
}

function Grid(t, e) {
    this.size = t, this.cells = e ? this.fromState(e) : this.empty()
}

function Tile(t, e) {
    this.x = t.x, this.y = t.y, this.value = e || 2, this.previousPosition = null, this.mergedFrom = null
}

function LocalStorageManager() {
    this.bestScoreKey = "bestScore", this.gameStateKey = "gameData";
    var t = this.localStorageSupported();
    this.storage = t ? window.localStorage : window.fakeStorage
}

function GameManager(t, e, n, i) {
    this.size = t, this.inputManager = new e, this.storageManager = new i, this.actuator = new n, this.startTiles = 2, this.inputManager.on("share", this.share.bind(this)), this.inputManager.on("move", this.move.bind(this)), this.inputManager.on("restart", this.restart.bind(this)), this.inputManager.on("keepPlaying", this.keepPlaying.bind(this)), this.setup()
}
var Zepto = function() {
    function t(t) {
        return null == t ? String(t) : V[X.call(t)] || "object"
    }

    function e(e) {
        return "function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function i(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function r(e) {
        return "object" == t(e)
    }

    function o(t) {
        return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function a(t) {
        return "number" == typeof t.length
    }

    function s(t) {
        return A.call(t, function(t) {
            return null != t
        })
    }

    function u(t) {
        return t.length > 0 ? S.fn.concat.apply([], t) : t
    }

    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in G ? G[t] : G[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function h(t, e) {
        return "number" != typeof e || N[c(t)] ? e : e + "px"
    }

    function f(t) {
        var e, n;
        return j[t] || (e = L.createElement(t), L.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), j[t] = n), j[t]
    }

    function p(t) {
        return "children" in t ? _.call(t.children) : S.map(t.childNodes, function(t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e, n) {
        for (T in e) n && (o(e[T]) || J(e[T])) ? (o(e[T]) && !o(t[T]) && (t[T] = {}), J(e[T]) && !J(t[T]) && (t[T] = []), d(t[T], e[T], n)) : e[T] !== x && (t[T] = e[T])
    }

    function m(t, e) {
        return null == e ? S(t) : S(t).filter(e)
    }

    function g(t, n, i, r) {
        return e(n) ? n.call(t, i, r) : n
    }

    function v(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function y(t, e) {
        var n = t.className,
            i = n && n.baseVal !== x;
        return e === x ? i ? n.baseVal : n : void(i ? n.baseVal = e : t.className = e)
    }

    function w(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? S.parseJSON(t) : t : e) : t
        } catch (n) {
            return t
        }
    }

    function b(t, e) {
        e(t);
        for (var n in t.childNodes) b(t.childNodes[n], e)
    }
    var x, T, S, M, C, E, P = [],
        _ = P.slice,
        A = P.filter,
        L = window.document,
        j = {}, G = {}, N = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, O = /^\s*<(\w+|!)[^>]*>/,
        z = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        k = /^(?:body|html)$/i,
        D = /([A-Z])/g,
        q = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        I = ["after", "prepend", "before", "append"],
        R = L.createElement("table"),
        Z = L.createElement("tr"),
        H = {
            tr: L.createElement("tbody"),
            tbody: R,
            thead: R,
            tfoot: R,
            td: Z,
            th: Z,
            "*": L.createElement("div")
        }, $ = /complete|loaded|interactive/,
        B = /^[\w-]*$/,
        V = {}, X = V.toString,
        K = {}, U = L.createElement("div"),
        Y = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, J = Array.isArray || function(t) {
            return t instanceof Array
        };
    return K.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var i, r = t.parentNode,
            o = !r;
        return o && (r = U).appendChild(t), i = ~K.qsa(r, e).indexOf(t), o && U.removeChild(t), i
    }, C = function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, E = function(t) {
        return A.call(t, function(e, n) {
            return t.indexOf(e) == n
        })
    }, K.fragment = function(t, e, n) {
        var i, r, a;
        return z.test(t) && (i = S(L.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(F, "<$1></$2>")), e === x && (e = O.test(t) && RegExp.$1), e in H || (e = "*"), a = H[e], a.innerHTML = "" + t, i = S.each(_.call(a.childNodes), function() {
            a.removeChild(this)
        })), o(n) && (r = S(i), S.each(n, function(t, e) {
            q.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
        })), i
    }, K.Z = function(t, e) {
        return t = t || [], t.__proto__ = S.fn, t.selector = e || "", t
    }, K.isZ = function(t) {
        return t instanceof K.Z
    }, K.init = function(t, n) {
        var i;
        if (!t) return K.Z();
        if ("string" == typeof t)
            if (t = t.trim(), "<" == t[0] && O.test(t)) i = K.fragment(t, RegExp.$1, n), t = null;
            else {
                if (n !== x) return S(n).find(t);
                i = K.qsa(L, t)
            } else {
                if (e(t)) return S(L).ready(t);
                if (K.isZ(t)) return t;
                if (J(t)) i = s(t);
                else if (r(t)) i = [t], t = null;
                else if (O.test(t)) i = K.fragment(t.trim(), RegExp.$1, n), t = null;
                else {
                    if (n !== x) return S(n).find(t);
                    i = K.qsa(L, t)
                }
            }
        return K.Z(i, t)
    }, S = function(t, e) {
        return K.init(t, e)
    }, S.extend = function(t) {
        var e, n = _.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {

            d(t, n, e)
        }), t
    }, K.qsa = function(t, e) {
        var n, r = "#" == e[0],
            o = !r && "." == e[0],
            a = r || o ? e.slice(1) : e,
            s = B.test(a);
        return i(t) && s && r ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : _.call(s && !r ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, S.contains = function(t, e) {
        return t !== e && t.contains(e)
    }, S.type = t, S.isFunction = e, S.isWindow = n, S.isArray = J, S.isPlainObject = o, S.isEmptyObject = function(t) {
        var e;
        for (e in t) return !1;
        return !0
    }, S.inArray = function(t, e, n) {
        return P.indexOf.call(e, t, n)
    }, S.camelCase = C, S.trim = function(t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, S.uuid = 0, S.support = {}, S.expr = {}, S.map = function(t, e) {
        var n, i, r, o = [];
        if (a(t))
            for (i = 0; i < t.length; i++) n = e(t[i], i), null != n && o.push(n);
        else
            for (r in t) n = e(t[r], r), null != n && o.push(n);
        return u(o)
    }, S.each = function(t, e) {
        var n, i;
        if (a(t)) {
            for (n = 0; n < t.length; n++)
                if (e.call(t[n], n, t[n]) === !1) return t
        } else
            for (i in t)
                if (e.call(t[i], i, t[i]) === !1) return t; return t
    }, S.grep = function(t, e) {
        return A.call(t, e)
    }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        V["[object " + e + "]"] = e.toLowerCase()
    }), S.fn = {
        forEach: P.forEach,
        reduce: P.reduce,
        push: P.push,
        sort: P.sort,
        indexOf: P.indexOf,
        concat: P.concat,
        map: function(t) {
            return S(S.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return S(_.apply(this, arguments))
        },
        ready: function(t) {
            return $.test(L.readyState) && L.body ? t(S) : L.addEventListener("DOMContentLoaded", function() {
                t(S)
            }, !1), this
        },
        get: function(t) {
            return t === x ? _.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(t) {
            return P.every.call(this, function(e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function(t) {
            return e(t) ? this.not(this.not(t)) : S(A.call(this, function(e) {
                return K.matches(e, t)
            }))
        },
        add: function(t, e) {
            return S(E(this.concat(S(t, e))))
        },
        is: function(t) {
            return this.length > 0 && K.matches(this[0], t)
        },
        not: function(t) {
            var n = [];
            if (e(t) && t.call !== x) this.each(function(e) {
                t.call(this, e) || n.push(this)
            });
            else {
                var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? _.call(t) : S(t);
                this.forEach(function(t) {
                    i.indexOf(t) < 0 && n.push(t)
                })
            }
            return S(n)
        },
        has: function(t) {
            return this.filter(function() {
                return r(t) ? S.contains(this, t) : S(this).find(t).size()
            })
        },
        eq: function(t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
            var t = this[0];
            return t && !r(t) ? t : S(t)
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !r(t) ? t : S(t)
        },
        find: function(t) {
            var e, n = this;
            return e = "object" == typeof t ? S(t).filter(function() {
                var t = this;
                return P.some.call(n, function(e) {
                    return S.contains(e, t)
                })
            }) : 1 == this.length ? S(K.qsa(this[0], t)) : this.map(function() {
                return K.qsa(this, t)
            })
        },
        closest: function(t, e) {
            var n = this[0],
                r = !1;
            for ("object" == typeof t && (r = S(t)); n && !(r ? r.indexOf(n) >= 0 : K.matches(n, t));) n = n !== e && !i(n) && n.parentNode;
            return S(n)
        },
        parents: function(t) {
            for (var e = [], n = this; n.length > 0;) n = S.map(n, function(t) {
                return (t = t.parentNode) && !i(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return m(e, t)
        },
        parent: function(t) {
            return m(E(this.pluck("parentNode")), t)
        },
        children: function(t) {
            return m(this.map(function() {
                return p(this)
            }), t)
        },
        contents: function() {
            return this.map(function() {
                return _.call(this.childNodes)
            })
        },
        siblings: function(t) {
            return m(this.map(function(t, e) {
                return A.call(p(e.parentNode), function(t) {
                    return t !== e
                })
            }), t)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(t) {
            return S.map(this, function(e) {
                return e[t]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = f(this.nodeName))
            })
        },
        replaceWith: function(t) {
            return this.before(t).remove()
        },
        wrap: function(t) {
            var n = e(t);
            if (this[0] && !n) var i = S(t).get(0),
            r = i.parentNode || this.length > 1;
            return this.each(function(e) {
                S(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i)
            })
        },
        wrapAll: function(t) {
            if (this[0]) {
                S(this[0]).before(t = S(t));
                for (var e;
                    (e = t.children()).length;) t = e.first();
                S(t).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            var n = e(t);
            return this.each(function(e) {
                var i = S(this),
                    r = i.contents(),
                    o = n ? t.call(this, e) : t;
                r.length ? r.wrapAll(o) : i.append(o)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                S(this).replaceWith(S(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(t) {
            return this.each(function() {
                var e = S(this);
                (t === x ? "none" == e.css("display") : t) ? e.show() : e.hide()
            })
        },
        prev: function(t) {
            return S(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function(t) {
            return S(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function(t) {
            return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
                var n = this.innerHTML;
                S(this).empty().append(g(this, t, e, n))
            })
        },
        text: function(t) {
            return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                this.textContent = t === x ? "" : "" + t
            })
        },
        attr: function(t, e) {
            var n;
            return "string" == typeof t && e === x ? 0 == this.length || 1 !== this[0].nodeType ? x : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : this.each(function(n) {
                if (1 === this.nodeType)
                    if (r(t))
                        for (T in t) v(this, T, t[T]);
                    else v(this, t, g(this, e, n, this.getAttribute(t)))
            })
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && v(this, t)
            })
        },
        prop: function(t, e) {
            return t = Y[t] || t, e === x ? this[0] && this[0][t] : this.each(function(n) {
                this[t] = g(this, e, n, this[t])
            })
        },
        data: function(t, e) {
            var n = this.attr("data-" + t.replace(D, "-$1").toLowerCase(), e);
            return null !== n ? w(n) : x
        },
        val: function(t) {
            return 0 === arguments.length ? this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value) : this.each(function(e) {
                this.value = g(this, t, e, this.value)
            })
        },
        offset: function(t) {
            if (t) return this.each(function(e) {
                var n = S(this),
                    i = g(this, t, e, n.offset()),
                    r = n.offsetParent().offset(),
                    o = {
                        top: i.top - r.top,
                        left: i.left - r.left
                    };
                "static" == n.css("position") && (o.position = "relative"), n.css(o)
            });
            if (0 == this.length) return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function(e, n) {
            if (arguments.length < 2) {
                var i = this[0],
                    r = getComputedStyle(i, "");
                if (!i) return;
                if ("string" == typeof e) return i.style[C(e)] || r.getPropertyValue(e);
                if (J(e)) {
                    var o = {};
                    return S.each(J(e) ? e : [e], function(t, e) {
                        o[e] = i.style[C(e)] || r.getPropertyValue(e)
                    }), o
                }
            }
            var a = "";
            if ("string" == t(e)) n || 0 === n ? a = c(e) + ":" + h(e, n) : this.each(function() {
                this.style.removeProperty(c(e))
            });
            else
                for (T in e) e[T] || 0 === e[T] ? a += c(T) + ":" + h(T, e[T]) + ";" : this.each(function() {
                    this.style.removeProperty(c(T))
                });
            return this.each(function() {
                this.style.cssText += ";" + a
            })
        },
        index: function(t) {
            return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
            return t ? P.some.call(this, function(t) {
                return this.test(y(t))
            }, l(t)) : !1
        },
        addClass: function(t) {
            return t ? this.each(function(e) {
                M = [];
                var n = y(this),
                    i = g(this, t, e, n);
                i.split(/\s+/g).forEach(function(t) {
                    S(this).hasClass(t) || M.push(t)
                }, this), M.length && y(this, n + (n ? " " : "") + M.join(" "))
            }) : this
        },
        removeClass: function(t) {
            return this.each(function(e) {
                return t === x ? y(this, "") : (M = y(this), g(this, t, e, M).split(/\s+/g).forEach(function(t) {
                    M = M.replace(l(t), " ")
                }), void y(this, M.trim()))
            })
        },
        toggleClass: function(t, e) {
            return t ? this.each(function(n) {
                var i = S(this),
                    r = g(this, t, n, y(this));
                r.split(/\s+/g).forEach(function(t) {
                    (e === x ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t)
                })
            }) : this
        },
        scrollTop: function(t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === x ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                    this.scrollTop = t
                } : function() {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function(t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === x ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                    this.scrollLeft = t
                } : function() {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var t = this[0],
                    e = this.offsetParent(),
                    n = this.offset(),
                    i = k.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                return n.top -= parseFloat(S(t).css("margin-top")) || 0, n.left -= parseFloat(S(t).css("margin-left")) || 0, i.top += parseFloat(S(e[0]).css("border-top-width")) || 0, i.left += parseFloat(S(e[0]).css("border-left-width")) || 0, {
                    top: n.top - i.top,
                    left: n.left - i.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || L.body; t && !k.test(t.nodeName) && "static" == S(t).css("position");) t = t.offsetParent;
                return t
            })
        }
    }, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function(t) {
        var e = t.replace(/./, function(t) {
            return t[0].toUpperCase()
        });
        S.fn[t] = function(r) {
            var o, a = this[0];
            return r === x ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                a = S(this), a.css(t, g(this, r, e, a[t]()))
            })
        }
    }), I.forEach(function(e, n) {
        var i = n % 2;
        S.fn[e] = function() {
            var e, r, o = S.map(arguments, function(n) {
                    return e = t(n), "object" == e || "array" == e || null == n ? n : K.fragment(n)
                }),
                a = this.length > 1;
            return o.length < 1 ? this : this.each(function(t, e) {
                r = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null, o.forEach(function(t) {
                    if (a) t = t.cloneNode(!0);
                    else if (!r) return S(t).remove();
                    b(r.insertBefore(t, e), function(t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, S.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
            return S(t)[e](this), this
        }
    }), K.Z.prototype = S.fn, K.uniq = E, K.deserializeValue = w, S.zepto = K, S
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto),
function(t) {
    function e(t) {
        return t._zid || (t._zid = f++)
    }

    function n(t, n, o, a) {
        if (n = i(n), n.ns) var s = r(n.ns);
        return (g[e(t)] || []).filter(function(t) {
            return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a)
        })
    }

    function i(t) {
        var e = ("" + t).split(".");
        return {
            e: e[0],
            ns: e.slice(1).sort().join(" ")
        }
    }

    function r(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function o(t, e) {
        return t.del && !y && t.e in w || !! e
    }

    function a(t) {
        return b[t] || y && w[t] || t
    }

    function s(n, r, s, u, l, f, p) {
        var d = e(n),
            m = g[d] || (g[d] = []);
        r.split(/\s/).forEach(function(e) {
            if ("ready" == e) return t(document).ready(s);
            var r = i(e);
            r.fn = s, r.sel = l, r.e in b && (s = function(e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? r.fn.apply(this, arguments) : void 0
            }), r.del = f;
            var d = f || s;
            r.proxy = function(t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = d.apply(n, t._args == h ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                }
            }, r.i = m.length, m.push(r), "addEventListener" in n && n.addEventListener(a(r.e), r.proxy, o(r, p))
        })
    }

    function u(t, i, r, s, u) {
        var c = e(t);
        (i || "").split(/\s/).forEach(function(e) {
            n(t, e, r, s).forEach(function(e) {
                delete g[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
            })
        })
    }

    function c(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(M, function(t, i) {
            var r = n[t];
            e[t] = function() {
                return this[i] = x, r && r.apply(n, arguments)
            }, e[i] = T
        }), (n.defaultPrevented !== h ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
    }

    function l(t) {
        var e, n = {
                originalEvent: t
            };
        for (e in t) S.test(e) || t[e] === h || (n[e] = t[e]);
        return c(n, t)
    }
    var h, f = 1,
        p = Array.prototype.slice,
        d = t.isFunction,
        m = function(t) {
            return "string" == typeof t
        }, g = {}, v = {}, y = "onfocusin" in window,
        w = {
            focus: "focusin",
            blur: "focusout"
        }, b = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
        add: s,
        remove: u
    }, t.proxy = function(n, i) {
        if (d(n)) {
            var r = function() {
                return n.apply(i, arguments)
            };
            return r._zid = e(n), r
        }
        if (m(i)) return t.proxy(n[i], n);
        throw new TypeError("expected function")
    }, t.fn.bind = function(t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function(t, e) {
        return this.off(t, e)
    }, t.fn.one = function(t, e, n, i) {
        return this.on(t, e, n, i, 1)
    };
    var x = function() {
        return !0
    }, T = function() {
            return !1
        }, S = /^([A-Z]|returnValue$|layer[XY]$)/,
        M = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    t.fn.delegate = function(t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function(t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function(e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function(e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function(e, n, i, r, o) {
        var a, c, f = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
            f.on(t, n, i, e, o)
        }), f) : (m(n) || d(r) || r === !1 || (r = i, i = n, n = h), (d(i) || i === !1) && (r = i, i = h), r === !1 && (r = T), f.each(function(h, f) {
            o && (a = function(t) {
                return u(f, t.type, r), r.apply(this, arguments)
            }), n && (c = function(e) {
                var i, o = t(e.target).closest(n, f).get(0);
                return o && o !== f ? (i = t.extend(l(e), {
                    currentTarget: o,
                    liveFired: f
                }), (a || r).apply(o, [i].concat(p.call(arguments, 1)))) : void 0
            }), s(f, e, r, i, n, c || a)
        }))
    }, t.fn.off = function(e, n, i) {
        var r = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
            r.off(t, n, e)
        }), r) : (m(n) || d(i) || i === !1 || (i = n, n = h), i === !1 && (i = T), r.each(function() {
            u(this, e, i, n)
        }))
    }, t.fn.trigger = function(e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function() {
            "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function(e, i) {
        var r, o;
        return this.each(function(a, s) {
            r = l(m(e) ? t.Event(e) : e), r._args = i, r.target = s, t.each(n(s, e.type || e), function(t, e) {
                return o = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), o
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
            return t ? this.bind(e, t) : this.trigger(e)
        }
    }), ["focus", "blur"].forEach(function(e) {
        t.fn[e] = function(t) {
            return t ? this.bind(e, t) : this.each(function() {
                try {
                    this[e]()
                } catch (t) {}
            }), this
        }
    }), t.Event = function(t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(v[t] || "Events"),
            i = !0;
        if (e)
            for (var r in e) "bubbles" == r ? i = !! e[r] : n[r] = e[r];
        return n.initEvent(t, i, !0), c(n)
    }
}(Zepto),
function(t) {
    function e(e, n, i) {
        var r = t.Event(n);
        return t(e).trigger(r, i), !r.isDefaultPrevented()
    }

    function n(t, n, i, r) {
        return t.global ? e(n || y, i, r) : void 0
    }

    function i(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart")
    }

    function r(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }

    function o(t, e) {
        var i = e.context;
        return e.beforeSend.call(i, t, e) === !1 || n(e, i, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, i, "ajaxSend", [t, e])
    }

    function a(t, e, i, r) {
        var o = i.context,
            a = "success";
        i.success.call(o, t, a, e), r && r.resolveWith(o, [t, a, e]), n(i, o, "ajaxSuccess", [e, i, t]), u(a, e, i)
    }

    function s(t, e, i, r, o) {
        var a = r.context;
        r.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), n(r, a, "ajaxError", [i, r, t || e]), u(e, i, r)
    }

    function u(t, e, i) {
        var o = i.context;
        i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i)
    }

    function c() {}

    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == S ? "html" : t == T ? "json" : b.test(t) ? "script" : x.test(t) && "xml") || "text"
    }

    function h(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function f(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = h(e.url, e.data), e.data = void 0)
    }

    function p(e, n, i, r) {
        return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {
            url: e,
            data: n,
            success: i,
            dataType: r
        }
    }

    function d(e, n, i, r) {
        var o, a = t.isArray(n),
            s = t.isPlainObject(n);
        t.each(n, function(n, u) {
            o = t.type(u), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? d(e, u, i, n) : e.add(n, u)
        })
    }
    var m, g, v = 0,
        y = window.document,
        w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        b = /^(?:text|application)\/javascript/i,
        x = /^(?:text|application)\/xml/i,
        T = "application/json",
        S = "text/html",
        M = /^\s*$/;
    t.active = 0, t.ajaxJSONP = function(e, n) {
        if (!("type" in e)) return t.ajax(e);
        var i, r, u = e.jsonpCallback,
            c = (t.isFunction(u) ? u() : u) || "jsonp" + ++v,
            l = y.createElement("script"),
            h = window[c],
            f = function(e) {
                t(l).triggerHandler("error", e || "abort")
            }, p = {
                abort: f
            };
        return n && n.promise(p), t(l).on("load error", function(o, u) {
            clearTimeout(r), t(l).off().remove(), "error" != o.type && i ? a(i[0], p, e, n) : s(null, u || "error", p, e, n), window[c] = h, i && t.isFunction(h) && h(i[0]), h = i = void 0
        }), o(p, e) === !1 ? (f("abort"), p) : (window[c] = function() {
            i = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function() {
            f("timeout")
        }, e.timeout)), p)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: T,
            xml: "application/xml, text/xml",
            html: S,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function(e) {
        var n = t.extend({}, e || {}),
            r = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
        i(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), f(n), n.cache === !1 && (n.url = h(n.url, "_=" + Date.now()));
        var u = n.dataType,
            p = /\?.+=\?/.test(n.url);
        if ("jsonp" == u || p) return p || (n.url = h(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, r);
        var d, v = n.accepts[u],
            y = {}, w = function(t, e) {
                y[t.toLowerCase()] = [t, e]
            }, b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
            x = n.xhr(),
            T = x.setRequestHeader;
        if (r && r.promise(x), n.crossDomain || w("X-Requested-With", "XMLHttpRequest"), w("Accept", v || "*/*"), (v = n.mimeType || v) && (v.indexOf(",") > -1 && (v = v.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(v)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && w("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)
            for (g in n.headers) w(g, n.headers[g]);
        if (x.setRequestHeader = w, x.onreadystatechange = function() {
            if (4 == x.readyState) {
                x.onreadystatechange = c, clearTimeout(d);
                var e, i = !1;
                if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == b) {
                    u = u || l(n.mimeType || x.getResponseHeader("content-type")), e = x.responseText;
                    try {
                        "script" == u ? (1, eval)(e) : "xml" == u ? e = x.responseXML : "json" == u && (e = M.test(e) ? null : t.parseJSON(e))
                    } catch (o) {
                        i = o
                    }
                    i ? s(i, "parsererror", x, n, r) : a(e, x, n, r)
                } else s(x.statusText || null, x.status ? "error" : "abort", x, n, r)
            }
        }, o(x, n) === !1) return x.abort(), s(null, "abort", x, n, r), x;
        if (n.xhrFields)
            for (g in n.xhrFields) x[g] = n.xhrFields[g];
        var S = "async" in n ? n.async : !0;
        x.open(n.type, n.url, S, n.username, n.password);
        for (g in y) T.apply(x, y[g]);
        return n.timeout > 0 && (d = setTimeout(function() {
            x.onreadystatechange = c, x.abort(), s(null, "timeout", x, n, r)
        }, n.timeout)), x.send(n.data ? n.data : null), x
    }, t.get = function() {
        return t.ajax(p.apply(null, arguments))
    }, t.post = function() {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function() {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function(e, n, i) {
        if (!this.length) return this;
        var r, o = this,
            a = e.split(/\s/),
            s = p(e, n, i),
            u = s.success;
        return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function(e) {
            o.html(r ? t("<div>").html(e.replace(w, "")).find(r) : e), u && u.apply(o, arguments)
        }, t.ajax(s), this
    };
    var C = encodeURIComponent;
    t.param = function(t, e) {
        var n = [];
        return n.add = function(t, e) {
            this.push(C(t) + "=" + C(e))
        }, d(n, t, e), n.join("&").replace(/%20/g, "+")
    }
}(Zepto),
function(t) {
    t.fn.serializeArray = function() {
        var e, n = [];
        return t([].slice.call(this.get(0).elements)).each(function() {
            e = t(this);
            var i = e.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && n.push({
                name: e.attr("name"),
                value: e.val()
            })
        }), n
    }, t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function(e) {
        if (e) this.bind("submit", e);
        else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto),
function(t) {
    "__proto__" in {} || t.extend(t.zepto, {
        Z: function(e, n) {
            return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
        },
        isZ: function(e) {
            return "array" === t.type(e) && "__Z" in e
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function(t) {
            try {
                return n(t)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto),
function(t, e) {
    function n(t) {
        return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function i(t) {
        return r ? r + t : t.toLowerCase()
    }
    var r, o, a, s, u, c, l, h, f, p, d = "",
        m = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        }, g = window.document,
        v = g.createElement("div"),
        y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        w = {};
    t.each(m, function(t, n) {
        return v.style[t + "TransitionProperty"] !== e ? (d = "-" + t.toLowerCase() + "-", r = n, !1) : void 0
    }), o = d + "transform", w[a = d + "transition-property"] = w[s = d + "transition-duration"] = w[c = d + "transition-delay"] = w[u = d + "transition-timing-function"] = w[l = d + "animation-name"] = w[h = d + "animation-duration"] = w[p = d + "animation-delay"] = w[f = d + "animation-timing-function"] = "", t.fx = {
        off: r === e && v.style.transitionProperty === e,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: d,
        transitionEnd: i("TransitionEnd"),
        animationEnd: i("AnimationEnd")
    }, t.fn.animate = function(n, i, r, o, a) {
        return t.isFunction(i) && (o = i, r = e, i = e), t.isFunction(r) && (o = r, r = e), t.isPlainObject(i) && (r = i.easing, o = i.complete, a = i.delay, i = i.duration), i && (i = ("number" == typeof i ? i : t.fx.speeds[i] || t.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(n, i, r, o, a)
    }, t.fn.anim = function(i, r, d, m, g) {
        var v, b, x, T = {}, S = "",
            M = this,
            C = t.fx.transitionEnd,
            E = !1;
        if (r === e && (r = t.fx.speeds._default / 1e3), g === e && (g = 0), t.fx.off && (r = 0), "string" == typeof i) T[l] = i, T[h] = r + "s", T[p] = g + "s", T[f] = d || "linear", C = t.fx.animationEnd;
        else {
            b = [];
            for (v in i) y.test(v) ? S += v + "(" + i[v] + ") " : (T[v] = i[v], b.push(n(v)));
            S && (T[o] = S, b.push(o)), r > 0 && "object" == typeof i && (T[a] = b.join(", "), T[s] = r + "s", T[c] = g + "s", T[u] = d || "linear")
        }
        return x = function(e) {
            if ("undefined" != typeof e) {
                if (e.target !== e.currentTarget) return;
                t(e.target).unbind(C, x)
            } else t(this).unbind(C, x);
            E = !0, t(this).css(w), m && m.call(this)
        }, r > 0 && (this.bind(C, x), setTimeout(function() {
            E || x.call(M)
        }, 1e3 * r + 25)), this.size() && this.get(0).clientLeft, this.css(T), 0 >= r && setTimeout(function() {
            M.each(function() {
                x.call(this)
            })
        }, 0), this
    }, v = null
}(Zepto),
function(t, e) {
    function n(n, i, r, o, a) {
        "function" != typeof i || a || (a = i, i = e);
        var s = {
            opacity: r
        };
        return o && (s.scale = o, n.css(t.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, i, null, a)
    }

    function i(e, i, r, o) {
        return n(e, i, 0, r, function() {
            a.call(t(this)), o && o.call(this)
        })
    }
    var r = window.document,
        o = (r.documentElement, t.fn.show),
        a = t.fn.hide,
        s = t.fn.toggle;
    t.fn.show = function(t, i) {
        return o.call(this), t === e ? t = 0 : this.css("opacity", 0), n(this, t, 1, "1,1", i)
    }, t.fn.hide = function(t, n) {
        return t === e ? a.call(this) : i(this, t, "0,0", n)
    }, t.fn.toggle = function(n, i) {
        return n === e || "boolean" == typeof n ? s.call(this, n) : this.each(function() {
            var e = t(this);
            e["none" == e.css("display") ? "show" : "hide"](n, i)
        })
    }, t.fn.fadeTo = function(t, e, i) {
        return n(this, t, e, null, i)
    }, t.fn.fadeIn = function(t, e) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, o.call(this).fadeTo(t, n, e)
    }, t.fn.fadeOut = function(t, e) {
        return i(this, t, null, e)
    }, t.fn.fadeToggle = function(e, n) {
        return this.each(function() {
            var i = t(this);
            i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](e, n)
        })
    }
}(Zepto),
function(t) {
    function e(t, e, n, i) {
        return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
    }

    function n() {
        l = null, f.last && (f.el.trigger("longTap"), f = {})
    }

    function i() {
        l && clearTimeout(l), l = null
    }

    function r() {
        s && clearTimeout(s), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l), s = u = c = l = null, f = {}
    }

    function o(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }

    function a(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }
    var s, u, c, l, h, f = {}, p = 750;
    t(document).ready(function() {
        var d, m, g, v, y = 0,
            w = 0;
        "MSGesture" in window && (h = new MSGesture, h.target = document.body), t(document).bind("MSGestureEnd", function(t) {
            var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
            e && (f.el.trigger("swipe"), f.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown", function(e) {
            (!(v = a(e, "down")) || o(e)) && (g = v ? e : e.touches[0], e.touches && 1 === e.touches.length && f.x2 && (f.x2 = void 0, f.y2 = void 0), d = Date.now(), m = d - (f.last || d), f.el = t("tagName" in g.target ? g.target : g.target.parentNode), s && clearTimeout(s), f.x1 = g.pageX, f.y1 = g.pageY, m > 0 && 250 >= m && (f.isDoubleTap = !0), f.last = d, l = setTimeout(n, p), h && v && h.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function(t) {
            (!(v = a(t, "move")) || o(t)) && (g = v ? t : t.touches[0], i(), f.x2 = g.pageX, f.y2 = g.pageY, y += Math.abs(f.x1 - f.x2), w += Math.abs(f.y1 - f.y2))
        }).on("touchend MSPointerUp pointerup", function(n) {
            (!(v = a(n, "up")) || o(n)) && (i(), f.x2 && Math.abs(f.x1 - f.x2) > 30 || f.y2 && Math.abs(f.y1 - f.y2) > 30 ? c = setTimeout(function() {
                f.el.trigger("swipe"), f.el.trigger("swipe" + e(f.x1, f.x2, f.y1, f.y2)), f = {}
            }, 0) : "last" in f && (30 > y && 30 > w ? u = setTimeout(function() {
                var e = t.Event("tap");
                e.cancelTouch = r, f.el.trigger(e), f.isDoubleTap ? (f.el && f.el.trigger("doubleTap"), f = {}) : s = setTimeout(function() {
                    s = null, f.el && f.el.trigger("singleTap"), f = {}
                }, 250)
            }, 0) : f = {}), y = w = 0)
        }).on("touchcancel MSPointerCancel pointercancel", r), t(window).on("scroll", r)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
        t.fn[e] = function(t) {
            return this.on(e, t)
        }
    })
}(Zepto);
var _share_fixed = "";
Function.prototype.bind = Function.prototype.bind || function(t) {
    var e = this;
    return function(n) {
        n instanceof Array || (n = [n]), e.apply(t, n)
    }
},
function() {
    function t(t) {
        this.el = t;
        for (var e = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), n = 0; n < e.length; n++) i.call(this, e[n])
    }

    function e(t, e, n) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            get: n
        }) : t.__defineGetter__(e, n)
    }
    if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
        var n = Array.prototype,
            i = n.push,
            r = n.splice,
            o = n.join;
        t.prototype = {
            add: function(t) {
                this.contains(t) || (i.call(this, t), this.el.className = this.toString())
            },
            contains: function(t) {
                return -1 != this.el.className.indexOf(t)
            },
            item: function(t) {
                return this[t] || null
            },
            remove: function(t) {
                if (this.contains(t)) {
                    for (var e = 0; e < this.length && this[e] != t; e++);
                    r.call(this, e, 1), this.el.className = this.toString()
                }
            },
            toString: function() {
                return o.call(this, " ")
            },
            toggle: function(t) {
                return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
            }
        }, window.DOMTokenList = t, e(HTMLElement.prototype, "classList", function() {
            return new t(this)
        })
    }
}(),
function() {
    for (var t = 0, e = ["webkit", "moz"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
        var n = (new Date).getTime(),
            i = Math.max(0, 16 - (n - t)),
            r = window.setTimeout(function() {
                e(n + i)
            }, i);
        return t = n + i, r
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    })
}(), getAndroidVersion = function(t) {
    var e;
    return t = t || navigator.userAgent, e = t.match(/Android\s([0-9\.]*)/), e ? e[1] : !1
};
var androidVersion = parseFloat(getAndroidVersion());
KeyboardInputManager.prototype.on = function(t, e) {
    this.events[t] || (this.events[t] = []), this.events[t].push(e)
}, KeyboardInputManager.prototype.emit = function(t, e) {
    var n = this.events[t];
    n && n.forEach(function(t) {
        t(e)
    })
}, KeyboardInputManager.prototype.listen = function() {
    var t = this,
        e = {
            38: 0,
            39: 1,
            40: 2,
            37: 3,
            75: 0,
            76: 1,
            74: 2,
            72: 3,
            87: 0,
            68: 1,
            83: 2,
            65: 3
        };
    document.addEventListener("keydown", function(n) {
        var i = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey,
            r = e[n.which];
        i || void 0 !== r && (n.preventDefault(), t.emit("move", r)), i || 82 !== n.which || t.restart.call(t, n)
    }), this.bindButtonPress(".retry-button", this.share), this.bindButtonPress(".keep-playing-button", this.keepPlaying);
    var n, i, r = document.getElementsByClassName("game-container")[0];
    r.addEventListener(this.eventTouchstart, function(t) {
        window.touch_move = !1, !window.navigator.msPointerEnabled && t.touches.length > 1 || t.targetTouches > 1 || (window.navigator.msPointerEnabled ? (n = t.pageX, i = t.pageY) : (n = t.touches[0].clientX, i = t.touches[0].clientY), t.preventDefault())
    }), r.addEventListener(this.eventTouchmove, function(t) {
        t.preventDefault()
    }), r.addEventListener(this.eventTouchmove, function(e) {
        if (!(window.touch_move || !window.navigator.msPointerEnabled && e.touches.length > 1 || e.targetTouches > 0)) {
            var r, o;
            window.navigator.msPointerEnabled ? (r = e.pageX, o = e.pageY) : (r = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY);
            var a = r - n,
                s = Math.abs(a),
                u = o - i,
                c = Math.abs(u);
            Math.max(s, c) > 10 && t.emit("move", s > c ? a > 0 ? 1 : 3 : u > 0 ? 2 : 0)
        }
    })
}, KeyboardInputManager.prototype.share = function(t) {
    t.preventDefault(), this.emit("share")
}, KeyboardInputManager.prototype.restart = function(t) {
    t.preventDefault(), this.emit("restart")
}, KeyboardInputManager.prototype.keepPlaying = function(t) {
    t.preventDefault(), this.emit("keepPlaying")
}, KeyboardInputManager.prototype.bindButtonPress = function(t, e) {
    var n = document.querySelector(t);
    n.addEventListener(this.eventTouchend, e.bind(this))
}, HTMLActuator.prototype.actuate = function(t, e) {
    var n = this;
    window.requestAnimationFrame(function() {
        n.clearContainer(n.tileContainer), t.cells.forEach(function(t) {
            t.forEach(function(t) {
                t && n.addTile(t)
            })
        }), n.updateScore(e.score), n.updateBestScore(_my_list[e.bestScore]), e.terminated && (e.over ? n.message(!1) : e.won && n.message(!0))
    })
}, HTMLActuator.prototype.continueGame = function() {
    this.clearMessage()
}, HTMLActuator.prototype.clearContainer = function(t) {
    for (; t.firstChild;) t.removeChild(t.firstChild)
}, HTMLActuator.prototype.addTile = function(t) {
    var e = this,
        n = document.createElement("div"),
        i = document.createElement("div"),
        r = t.previousPosition || {
            x: t.x,
            y: t.y
        }, o = this.positionClass(r),
        a = ["tile", "tile-" + t.value, o];
    t.value > 2048 && a.push("tile-super"), this.applyClasses(n, a), i.classList.add("tile-inner"), window._my_list && (i.textContent = _my_list[t.value], "http" == i.textContent.substring(0, 4) && (i.innerHTML = '<img src="' + i.textContent + '" class="tile-inner"/>'), i.style.fontSize = 2 - .4 * (i.textContent.length - 1) + "rem", i.style.fontFamily = "microsoft yahei", i.style.overflow = "hidden"), t.previousPosition ? window.requestAnimationFrame(function() {
        a[2] = e.positionClass({
            x: t.x,
            y: t.y
        }), e.applyClasses(n, a)
    }) : t.mergedFrom ? (a.push("tile-merged"), this.applyClasses(n, a), t.mergedFrom.forEach(function(t) {
        e.addTile(t)
    })) : (a.push("tile-new"), this.applyClasses(n, a)), n.appendChild(i), this.tileContainer.appendChild(n)
}, HTMLActuator.prototype.applyClasses = function(t, e) {
    t.setAttribute("class", e.join(" "))
}, HTMLActuator.prototype.normalizePosition = function(t) {
    return {
        x: t.x + 1,
        y: t.y + 1
    }
}, HTMLActuator.prototype.positionClass = function(t) {
    return t = this.normalizePosition(t), "tile-position-" + t.x + "-" + t.y
};
ih5game.setShare({
	
    desc: "2048情侣版"
});
var _nowbest = 0;
HTMLActuator.prototype.updateScore = function(t) {
    this.clearContainer(this.scoreContainer);
    var e = t - this.score;
    if (this.score = t, this.scoreContainer.textContent = _my_list[_nowbest], e > 0) {
        var n = document.createElement("div");
        n.classList.add("score-addition"), n.textContent = "+" + e
    }
}, HTMLActuator.prototype.updateBestScore = function(t) {
    this.bestContainer.textContent = t
}, HTMLActuator.prototype.message = function(t) {
    var e = t ? "game-won" : "game-over",
        n = t ? _my_win || "You win!" : _my_mark[_nowbest] || "Game over!";
    this.messageContainer.classList.add(e), this.messageContainer.getElementsByTagName("p")[0].textContent = n, ih5game.setShare({
        desc: _my_mark[_nowbest]
    })
}, HTMLActuator.prototype.clearMessage = function() {
    this.messageContainer.classList.remove("game-won"), this.messageContainer.classList.remove("game-over")
}, Grid.prototype.empty = function() {
    for (var t = [], e = 0; e < this.size; e++)
        for (var n = t[e] = [], i = 0; i < this.size; i++) n.push(null);
    return t
}, Grid.prototype.fromState = function(t) {
    for (var e = [], n = 0; n < this.size; n++)
        for (var i = e[n] = [], r = 0; r < this.size; r++) {
            var o = t[n][r];
            i.push(o ? new Tile(o.position, o.value) : null)
        }
    return e
}, Grid.prototype.randomAvailableCell = function() {
    var t = this.availableCells();
    return t.length ? t[Math.floor(Math.random() * t.length)] : void 0
}, Grid.prototype.availableCells = function() {
    var t = [];
    return this.eachCell(function(e, n, i) {
        i || t.push({
            x: e,
            y: n
        })
    }), t
}, Grid.prototype.eachCell = function(t) {
    for (var e = 0; e < this.size; e++)
        for (var n = 0; n < this.size; n++) t(e, n, this.cells[e][n])
}, Grid.prototype.cellsAvailable = function() {
    return !!this.availableCells().length
}, Grid.prototype.cellAvailable = function(t) {
    return !this.cellOccupied(t)
}, Grid.prototype.cellOccupied = function(t) {
    return !!this.cellContent(t)
}, Grid.prototype.cellContent = function(t) {
    return this.withinBounds(t) ? this.cells[t.x][t.y] : null
}, Grid.prototype.insertTile = function(t) {
    this.cells[t.x][t.y] = t
}, Grid.prototype.removeTile = function(t) {
    this.cells[t.x][t.y] = null
}, Grid.prototype.withinBounds = function(t) {
    return t.x >= 0 && t.x < this.size && t.y >= 0 && t.y < this.size
}, Grid.prototype.serialize = function() {
    for (var t = [], e = 0; e < this.size; e++)
        for (var n = t[e] = [], i = 0; i < this.size; i++) n.push(this.cells[e][i] ? this.cells[e][i].serialize() : null);
    return {
        size: this.size,
        cells: t
    }
}, Tile.prototype.savePosition = function() {
    this.previousPosition = {
        x: this.x,
        y: this.y
    }
}, Tile.prototype.updatePosition = function(t) {
    this.x = t.x, this.y = t.y
}, Tile.prototype.serialize = function() {
    return {
        position: {
            x: this.x,
            y: this.y
        },
        value: this.value
    }
}, window.fakeStorage = {
    _data: {},
    setItem: function(t, e) {
        return this._data[t] = String(e)
    },
    getItem: function(t) {
        return this._data.hasOwnProperty(t) ? this._data[t] : void 0
    },
    removeItem: function(t) {
        return delete this._data[t]
    },
    clear: function() {
        return this._data = {}
    }
}, LocalStorageManager.prototype.localStorageSupported = function() {
    var t = "test",
        e = window.localStorage;
    try {
        return ih5game.storage.set(t, "1"), ih5game.remove(t), !0
    } catch (n) {
        return !1
    }
}, LocalStorageManager.prototype.getBestScore = function() {
    return ih5game.storage.get(this.bestScoreKey) || 0
}, LocalStorageManager.prototype.setBestScore = function(t) {
    console.dir(t);
    ih5game.storage.set(this.bestScoreKey, t)
}, LocalStorageManager.prototype.getGameState = function() {}, LocalStorageManager.prototype.setGameState = function() {}, LocalStorageManager.prototype.clearGameState = function() {
    ih5game.storage.remove(this.gameStateKey)
}, GameManager.prototype.share = function() {
		try{parent.moregame();}catch(e){}
   // window.location.href="http://h.7k7k.com/";
}, GameManager.prototype.restart = function() {
    this.storageManager.clearGameState(), this.actuator.continueGame(), this.setup()
}, GameManager.prototype.keepPlaying = function() {
    this.keepPlaying = !0, this.actuator.continueGame(), this.over && (initScore(), _nowbest = 0, this.setup())
}, GameManager.prototype.isGameTerminated = function() {
    return this.over || this.won && !this.keepPlaying
}, GameManager.prototype.setup = function() {
    var t = this.storageManager.getGameState();
    t ? (this.grid = new Grid(t.grid.size, t.grid.cells), _nowbest = this.score = t.score, this.over = t.over, this.won = t.won, this.keepPlaying = t.keepPlaying) : (this.grid = new Grid(this.size), this.score = 0, this.over = !1, this.won = !1, this.keepPlaying = !1, this.addStartTiles(), this.storageManager.setBestScore(_best_score.score_number)), this.actuate()
}, GameManager.prototype.addStartTiles = function() {
    for (var t = 0; t < this.startTiles; t++) this.addRandomTile()
}, GameManager.prototype.addRandomTile = function() {
    if (this.grid.cellsAvailable()) {
        var t = Math.random() < .9 ? 2 : 4,
            e = new Tile(this.grid.randomAvailableCell(), t);
        this.grid.insertTile(e)
    }
}, GameManager.prototype.actuate = function() {
    parseInt(this.storageManager.getBestScore()) < parseInt(_nowbest) && this.storageManager.setBestScore(_nowbest), this.over ? (setScore(_nowbest), this.storageManager.clearGameState()) : this.storageManager.setGameState(this.serialize()), this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won,
        bestScore: this.storageManager.getBestScore(),
        terminated: this.isGameTerminated()
    })
}, GameManager.prototype.serialize = function() {
    return {
        grid: this.grid.serialize(),
        score: this.score,
        over: this.over,
        won: this.won,
        keepPlaying: this.keepPlaying
    }
}, GameManager.prototype.prepareTiles = function() {
    this.grid.eachCell(function(t, e, n) {
        n && (n.mergedFrom = null, n.savePosition())
    })
}, GameManager.prototype.moveTile = function(t, e) {
    this.grid.cells[t.x][t.y] = null, this.grid.cells[e.x][e.y] = t, t.updatePosition(e)
}, GameManager.prototype.move = function(t) {
    window.touch_move = !0;
    var e = this;
    if (!this.isGameTerminated()) {
        var n, i, r = this.getVector(t),
            o = this.buildTraversals(r),
            a = !1;
        this.prepareTiles(), o.x.forEach(function(t) {
            o.y.forEach(function(o) {
                if (n = {
                    x: t,
                    y: o
                }, i = e.grid.cellContent(n)) {
                    var s = e.findFarthestPosition(n, r),
                        u = e.grid.cellContent(s.next);
                    if (u && u.value === i.value && !u.mergedFrom) {
                        var c = new Tile(s.next, 2 * i.value);
                        c.mergedFrom = [i, u], e.grid.insertTile(c), e.grid.removeTile(i), i.updatePosition(s.next), e.score = _nowbest, c.value === _my_goal && (e.won = !0), 4096 === c.value && (e.over = !0), c.value > _nowbest && (_nowbest = c.value)
                    } else e.moveTile(i, s.farthest);
                    e.positionsEqual(n, i) || (a = !0)
                }
            })
        }), a && (this.addRandomTile(), this.movesAvailable() || (this.over = !0), this.actuate())
    }
}, GameManager.prototype.getVector = function(t) {
    var e = {
        0: {
            x: 0,
            y: -1
        },
        1: {
            x: 1,
            y: 0
        },
        2: {
            x: 0,
            y: 1
        },
        3: {
            x: -1,
            y: 0
        }
    };
    return e[t]
}, GameManager.prototype.buildTraversals = function(t) {
    for (var e = {
        x: [],
        y: []
    }, n = 0; n < this.size; n++) e.x.push(n), e.y.push(n);
    return 1 === t.x && (e.x = e.x.reverse()), 1 === t.y && (e.y = e.y.reverse()), e
}, GameManager.prototype.findFarthestPosition = function(t, e) {
    var n;
    do n = t, t = {
        x: n.x + e.x,
        y: n.y + e.y
    }; while (this.grid.withinBounds(t) && this.grid.cellAvailable(t));
    return {
        farthest: n,
        next: t
    }
}, GameManager.prototype.movesAvailable = function() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable()
}, GameManager.prototype.tileMatchesAvailable = function() {
    for (var t, e = this, n = 0; n < this.size; n++)
        for (var i = 0; i < this.size; i++)
            if (t = this.grid.cellContent({
                x: n,
                y: i
            }))
                for (var r = 0; 4 > r; r++) {
                    var o = e.getVector(r),
                        a = {
                            x: n + o.x,
                            y: i + o.y
                        }, s = e.grid.cellContent(a);
                    if (s && s.value === t.value) return !0
                }
            return !1
}, GameManager.prototype.positionsEqual = function(t, e) {
    return t.x === e.x && t.y === e.y
};