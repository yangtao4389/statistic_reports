/**
 * Copyright 2014 51h5.com All rights reserved.
 */
! function(e, t) {
    function n(e) {
        var t = Jt[e],
            n = Array.prototype.slice.call(arguments, 1);
        if (t) {
            t = t.slice(0);
            for (var i = 0, o = t.length; o > i; i++) t[i].apply(Lt, n)
        }
    }

    function i() {
        if (!Mt && !Rt) {
            Rt = !0, Ht.gameId = W("gameid"), Ht.appBanner = W("appbanner"), Lt.get("init", function() {
                Rt = !1, zt = localStorage.getItem(qt + "guid");
                var e = W("key");
                return e && (Ot = e, Ft = Ot + "_"), Ot ? void Lt.get("bt", function(e) {
                    return e ? (At = e.token, zt = e.guid, localStorage.setItem(qt + "guid", zt), void Lt.get("vt", function(e) {
                        return e ? (Ct = e, Mt = !0, a(), Pt.forEach(function(e) {
                            l.apply(null, e)
                        }), void(Pt = null)) : void n("error", {
                            type: "init",
                            code: 102
                        })
                    })) : void n("error", {
                        type: "init",
                        code: 101
                    })
                }) : void n("error", {
                    type: "init",
                    code: 100
                })
            }), Ht.channelLogo = !! pt[ct], Ht.channelAloneLogo = Ht.channelLogo && pt[ct][6];
            var e = W("splashscreen");
            return e && (Bt = parseInt(e, 10) || 0), Bt && Lt.splashscreen(Bt), "function" == typeof onHoowuReady && onHoowuReady(), Lt
        }
    }

    function o() {
        if (!Lt.is("wechat") && !(pt[ct] && pt[ct][4] || "no" === (W("toolbar") || "").toLowerCase())) {
            var e = O(Gt);
            if (!e) {
                var t = [Gt + " {text-shadow:none;font-family:'Microsoft Yahei', Arial, 'Helvetica Neue', sans-serif;-webkit-font-smoothing: antialiased;z-index: 99990;text-align: left;height: 0;width: 0;font-size: 13px;}", Gt + " * {padding: 0; margin: 0; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}", Gt + " .hw-bar {width: 170px; box-sizing: border-box; position: fixed; z-index: 99990; top: 10px; left: -190px; background-color: #FFF; box-shadow: 0 0 3px rgba(0,0,0,0.3);transition-property: left; transition-timing-function: ease-in; transition-duration: .3s;}", Gt + " .hw-bar.hw-bar-expand {left:0;}", Gt + " .hw-bar header {width: 100%; height: 36px; text-align: center; color: #FFF; background-color: #1399d2;}", Gt + " .hw-bar h4 {display: inline; line-height: 38px;}", Gt + " .hw-bar .hw-clip {display: block; position: absolute; z-index: 3000; height: 38px; width: 60px; top: 0; right: -60px; background-color: transparent;}", Gt + " .hw-bar .hw-clip-btn {height: 36px; background-color: #1399d2; box-shadow: 3px 0 3px rgba(0,0,0,0.2); position: relative; transition-property: width; transition-timing-function: ease-in; transition-duration: .3s;}", Gt + " .hw-bar .hw-clip-btn img {height: 30px; position: absolute; top: 3px; right: 5px;}", Gt + " .hw-bar nav ul {list-style: none; text-align: center;}", Gt + " .hw-bar nav a {font-size: 14px; line-height: 34px; text-decoration: none; display: block; font-weight: 700; color: #666; border-top: 1px solid #E5E5E5;}", Gt + " .hw-bar nav em {font-style: normal; color: #0080ff; margin: 0 2px;}", Gt + " .hw-bar nav strong {color: #f0404f;}", Gt + " .hw-bar nav .hw-btn-app {font-size: 12px; background: #F7F6F6;}", Gt + " .hw-bar nav .hw-btn-resume {font-size: 18px; font-weight: 900; color: #fff; background: #1399d2;}"];
               /* x(t.join("")), e = Z.createElement("div"), e.id = Gt.slice(1), e.innerHTML = ['<div id="hw-bar" class="hw-bar">', "<header>", "<h4>7724游戏，为未来而生</h4>", '<div class="hw-clip">', '<div class="hw-clip-btn"><img src="' + ht + '/images/home/logo200.png"></div>', "</div>", "</header>", "<nav>", "<ul>", Lt.env.app ? "" : '<li><a href="#" class="hw-btn-app" data-action="app">安装<strong>7724APP</strong>，体验精品游戏</a></li>', Lt.env.wechat ? '<li><a href="#" data-action="share">挑战好友</a></li>' : "", '<li><a href="#" data-action="more">更多游戏</a></li>', '<li><a href="#" class="hw-btn-resume" data-action="close">返回游戏</a></li>', "</ul>", "</nav>", "</div>"].join(" "),*/ e.addEventListener(nt, M), e.addEventListener(ot, M), O("header", e).addEventListener(nt, function() {
                    B("toolbar", "click", "toggle"), r()
                }), O("nav", e).addEventListener(it, function(e) {
                    var t = e.target.getAttribute("data-action");
                    t && (e.preventDefault(), B("toolbar", "click", t)), "app" === t ? Lt.download() : "share" === t ? (Lt.share(), r(!1)) : "follow" === t ? Lt.follow() : "more" === t ? Lt.more() : "close" === t && r(!1)
                }), O("body").appendChild(e), Ht.toolbarExpand = !1
            }
            return e
        }
    }

    function r(e) {
        var t = "boolean" === k(e) ? e : !Ht.toolbarExpand;
        t !== Ht.toolbarExpand && (Ht.toolbarExpand = t, O(Gt + " .hw-bar").className = "hw-bar" + (t ? " hw-bar-expand" : ""))
    }

    function a() {
        var e = O($t);
        e || (e = Z.createElement("iframe"), e.width = e.height = 1, e.style.display = "none", O("head").appendChild(e)), e.src = H(mt + "/apis-sso.html", {
            id: zt,
            t: Ot,
            bt: At,
            vt: Ct,
            _: Date.now()
        })
    }

    function s(e, t, n) {
        new Image(1, 1).src = H(gt + "/tj.gif", L({
            act: e,
            aop: t,
            id: zt || "",
            t: Ot || ""
        }, n || {}))
    }

    function l(e, t, n, i) {
        var o = jt[t];
        if (o && !(0 === o & It[e])) {
            if (!Mt && "init" !== t && "bt" !== t && "vt" !== t) return void Pt.push(Array.prototype.slice.call(arguments));
            E(n) && (i = n, n = null);
            var r = Dt[t];
            if (r) {
                try {
                    r.abort()
                } catch (a) {}
                r = null, delete Dt[t]
            }
            Dt[t] = b(tt, c(t, e), n, i)
        }
    }

    function c(e, t) {
        return mt + wt + (t === et ? "get" : "set") + e + ".html"
    }

    function u(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function d(e) {
        var t, n = Ht.share.descCustom;
        e && n && (e.hasOwnProperty("level") && (t = (t || n).replace(/\{l\}/g, e.level || 1)), e.hasOwnProperty("score") && (t = (t || n).replace(/\{s\}/g, e.score || 0)), e.hasOwnProperty("time") && (t = (t || n).replace(/\{t\}/g, e.time || 0)), e.hasOwnProperty("title") && (t = (t || n).replace(/\{tt\}/g, e.title || ""))), t && Lt.setShare({
            desc: t
        })
    }

    function p(e) {
        var t = null,
            i = h(),
            o = "none" !== i.style.display;
        if ("boolean" === k(e) ? e !== o && (t = e ? 1 : 0) : t = o ? 0 : 1, null !== t) {
            i.style.display = t ? "block" : "none", n("splashscreen." + (t ? "show" : "hide"));
            var r = A(".inner", i);
            r[0].style.display = t ? "block" : "none", Ht.channelAloneLogo && t && r.length > 1 && (clearTimeout(Qt), Qt = setTimeout(function() {
                r[1].style.display = "block", r[0].parentNode.removeChild(r[0]), r = null
            }, Ut))
        }
    }

    function h() {
        var e = O(Zt);
        if (!e) {
            var t = W("author");
            t && (t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            var n = [Zt + " {position:fixed;left:0;top:0;z-index:9947483646;width:100%;height:100%;box-sizing:border-box;color:#fff;text-shadow:none;font-family:'Microsoft Yahei', Arial, 'Helvetica Neue', sans-serif;-webkit-font-smoothing: antialiased;}", Zt + " .inner {display:none;position:relative;top:0;width:100%;height:100%;padding-top:80px;pointer-events:none;background: #167de6;}", Zt + " .inner.alone {padding-top:0;background: #fff;}", Zt + " .inner.alone img {width: auto;height: auto;position: absolute;top: 40%;left: 50%;margin:-100px auto auto -130px;}", Zt + " img {display:block;margin:10px auto 30px;height:80px;width:auto;}", Zt + " p {font-size:16px;line-height:24px;text-align:center;margin:10px auto;padding:0 10px;}", Zt + " .hw_info {font-size: 12px;color: rgba(255,255,255,.7);}", Zt + " .progress {height:20px;overflow:hidden;margin: 5px 10px;background-color:#f5f5f5;border-radius:4px;box-sizing:border-box;box-shadow:inset 0 1px 2px rgba(0,0,0,.1);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);}", Zt + " .progress .bar {float:left;min-width:20px;height:100%;line-height:20px;font-size:12px;text-align:center;color:#fff;box-sizing:border-box;background-color:#428bca;box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);transition:width .6s ease;-webkit-transition:width .6s ease;-o-transition:width .6s ease;}"];
            /*x(n.join("")), e = Z.createElement("div"), e.id = Zt.slice(1), e.style.display = "none";
            var i = (new Date).getHours();
            e.innerHTML = Ht.channelLogo ? [Ht.channelAloneLogo ? '<div class="inner alone"><img src="' + ht + "/images/home/loading_" + ct + '.png"></div>' : "", '<div class="inner"' + (6 > i || i > 20 ? ' style="background: #2c2a2a;"' : "") + ">", '<img src="' + ht + '/images/home/logo_wr_220x100_black.png" height="80">', '<img src="' + ht + "/images/home/logo_" + ct + '.png" height="80">', t ? "<p>" + (pt[ct][3] ? "“<strong>" + pt[ct][0] + "</strong>”" : "<strong>7724</strong> &bull; <strong>" + t + "</strong>") + " 原创出品</p><p>授权" + (pt[ct][3] ? "<strong>7724</strong>" : "“<strong>" + pt[ct][0] + "</strong>”") + (pt[ct][5] || "联合发布") + "</p><p>转载请经过授权，侵权必究</p>" : "<p>" + (pt[ct][3] ? "“<strong>" + pt[ct][0] + "</strong>”出品, 授权<strong>7724</strong>" + (pt[ct][5] || "联合发布") : "<strong>7724</strong>出品, 授权“<strong>" + pt[ct][0] + "</strong>”" + (pt[ct][5] || "联合发布")) + "</p>", '<p class="hw_info">游戏载入中...</p>', '<div class="progress" style="display:none;"><div class="bar">0%</div></div>', "</div>"].join("") : ['<div class="inner"' + (6 > i || i > 20 ? ' style="background: #2c2a2a;"' : "") + ">", '<img src="' + ht + '/images/home/logo_wr_220x100_black.png" height="80">', t ? "<p><strong>7724游戏</strong> &bull; <strong>" + t + "</strong> 原创出品</p><p>转载请经过授权，侵权必究</p>" : "<p>7724游戏 &bull; 为未来而生</p>", '<p class="hw_info">游戏载入中...</p>', '<div class="progress" style="display:none;"><div class="bar">0%</div></div>', "</div>"].join(""),*/ e.addEventListener(nt, M), e.addEventListener(ot, M), O("body").appendChild(e)
        }
        return e
    }

    function g(e) {
        var t, i = f(),
            o = "none" !== i.style.display;
        "boolean" === k(e) ? e !== o && (t = e ? "block" : "none") : t = o ? "none" : "block", t && (i.style.display = t, n("orientation." + ("none" === t ? "hide" : "show")))
    }

    function f() {
        var e = O(nn);
        if (!e) {
            var t = [nn + " {position:fixed;left:0;top:0;z-index:9999;width:100%;height:100%;box-sizing:border-box;background:#fff;}", nn + " .inner {width:100%;height:100%;padding-top:200px;pointer-events:none;}", nn + " .tip {position:absolute;top:80px;left:50%;margin-left:-64px;width:128px;z-index:9999;}", nn + " p {color:#4a87ee;font-size:16px;line-height:24px;text-align:center;margin:10px auto;padding:0 10px;}"];
            x(t.join("")), e = Z.createElement("div"), e.id = nn.slice(1), e.style.display = "none", e.innerHTML = ['<div class="inner">', '<img src="' + ht + '/images/orientation.gif" class="tip">', "<p>请旋转手机屏幕，以达到最佳效果</p>", "</div>"].join(" "), e.addEventListener(nt, M), e.addEventListener(ot, M), O("body").appendChild(e)
        }
        return e
    }

    function m() {
        clearTimeout(rn), rn = setTimeout(function() {
            var t = !0,
                i = e.orientation;
            if (0 === i || 180 === i) t = !0;
            else if (-90 === i || 90 === i) t = !1;
            else {
                var o = R();
                t = o.h > o.w
            }

            null === en ? en = t : en !== t && (en = t, n("orientation", t)), "boolean" == typeof tn && g(t !== tn)
        }, on)
    }

    function v(t, i) {
        t && i && !Ht.banner && (_(i) && (i = O("#" + i)), Z.documentElement.contains(i) && ((e.BAIDU_DUP = e.BAIDU_DUP || []).push(["fillAsync", t, i]), Ht.banner = !0, n("banner.set")))
    }

    function b(t, n, i, o) {
        var r = new XMLHttpRequest;
        return t === et && i && (n = H(n, i), i = null), r.open(t, n, !0), Ot && r.setRequestHeader("X-KEY", Ot), (At || Ct) && r.setRequestHeader("X-TOKEN", Ct || At), zt && r.setRequestHeader("X-GUID", zt), t === tt && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o && (r.onerror = r.onabort = function() {
            w(r), o(null, 500, r)
        }, r.onload = function() {
            w(r);
            var t = r.status;
            if (t >= 200 && 300 > t || 304 == t) {
                var n, i = r.responseText;
                try {
                    n = JSON.parse(i)
                } catch (a) {
                    e[St](i)
                }
                if (n && n.url) return void(location.href = n.url);
                n && 1 === n.status ? o(n.data || "", n.status, r) : o(null, n.status, r)
            } else o(null, t, r)
        }), r.send(e.FormData && i instanceof FormData ? i : _(i) ? i : P(i)), r
    }

    function w(e) {
        e.onload = e.onabort = e.onerror = e.ontimeout = null
    }

    function x(e, t) {
        var n;
        t = t || Z, n = t.createElement("style"), n.type = "text/css", t.getElementsByTagName("head")[0].appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(t.createTextNode(e))
    }

    function y(e, t) {
        var n;
        t = t || Z, n = t.createElement("script"), n.type = "text/javascript", n.src = e, t.getElementsByTagName("head")[0].appendChild(n)
    }

    function k(e) {
        return null == e ? String(e) : Tt[Object.prototype.toString.call(e)] || "object"
    }

    function _(e) {
        return "string" === k(e)
    }

    function E(e) {
        return "function" === k(e)
    }

    function S(e) {
        return "object" === k(e) && Object.getPrototypeOf(e) === Object.prototype
    }

    function T(e, t) {
        Object.keys(e).forEach(function(n) {
            t(n, e[n])
        })
    }

    function L(e, t) {
        return T(t, function(t, n) {
            e[t] = n
        }), e
    }

    function O(e, t) {
        return _(e) ? (t = t || Z, t.querySelector(e)) : e
    }

    function A(e, t) {
        if (_(e)) {
            var n = Z.querySelectorAll(e, O(t) || Z.body);
            return [].slice.call(n, 0)
        }
        return e
    }

    function C(e) {
        return !!e && /^(?:(?:http|https|file)\:)?\/\/(?:\d+\.){3}\d+/.test(e)
    }

    function z(e) {
        return "string" == typeof e && "" !== e
    }

    function I(e) {
        return z(e)
    }

    function j(e, t) {
        if (z(e)) {
            var n = String(Z.cookie).match(new RegExp("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)"));
            if (n) return (n = n[1]) ? t ? decodeURIComponent(n) : n : ""
        }
        return null
    }

    function D(e, t) {
        return t = t || {}, j(I(e) ? e : "", !t.raw)
    }

    function P(e) {
        var t = [];
        return T(e || {}, function(e, n) {
            Array.isArray(n) || (n = [n]), n.forEach(function(n) {
                t.push(e + "=" + encodeURIComponent(n))
            })
        }), t.join("&")
    }

    function H(e, t) {
        _(t) || (t = P(t)), e = e.split("#");
        var n = e[1];
        return e = e[0], t && (e += e.indexOf("?") >= 0 ? "&" : "?", e += t + (n ? "#" + n : "")), e
    }

    function M(e) {
        e && (e.preventDefault(), e.stopPropagation())
    }

    function R() {
        return {
            w: e.innerWidth,
            h: e.innerHeight
        }
    }

    function W(e, t) {
        var n = O('meta[name="x-' + e + '"]');
        return n ? (n.getAttribute(t ? "data-" + t : "content") || "").trim() : null
    }

    function B(t) {
        var n = e[J + "hmt"];
        n && n.push([J + "trackEvent", t].concat(Array.prototype.slice.call(arguments, 1).map(function(e) {
            return t + J + e
        })))
    }
    for (var U = ":", q = "/", F = ".", N = "-", J = "_", G = "1", Y = "5", X = [], K = 97; 122 > K; K++) X.push(String.fromCharCode(K));
    var V = X[7] + X[19] + X[19] + X[15] + U + q + q,
        Q = F + X[2] + X[14] + X[12],
        Z = e.document,
        et = "GET",
        tt = "POST",
        nt = "touchstart",
        it = "touchend",
        ot = "mousedown",
        rt = location.protocol,
        at = location.hostname,
        st = location.pathname,
        lt = e.navigator.userAgent,
        ct = /(?:^|\.)(5iwebgame|7k7k|ishanku|baohulove|miaopai|yixia|weibo|4399|aiweiyou|qiniudn|chaoshenxy|cmbchina)\.com$/.exec(at);
    ct = ct && ct[1], ct || (ct = /(?:^|\.)(360|game6|wishstart|90fan|2144|twan|play)\.cn$/.exec(at), ct = ct && ct[1]);
    var ut = V + Y + G + X[7] + Y + Q,
        dt = X[6] + F + X[22] + X[0] + X[13] + X[7] + Y + Q !== at && X[3] + X[14] + X[22] + X[13] + F + Y + G + X[7] + Y + Q !== at && !ct,
        pt = {
            "4399": ["4399", "http://h.4399.com/", "", !1],
/*            baohulove: ["保护爱", "http://v.baohulove.com/HotGame.aspx"],
            ishanku: ["爱闪酷"],
            360: ["爱闪酷"],
            miaopai: ["秒拍"],
            weibo: ["秒拍"],
            yixia: ["秒拍"],
            game6: ["9G", "http://9g.game6.cn/top.html"],
            4399: ["4399", "http://h.4399.com"],
            wishstart: ["全球游戏排行榜", "http://www.wishstart.cn/top.html"],
            aiweiyou: ["爱微游", "", "", !0],
            aawap: ["趣味测试", "http://ceshi.aawap.net/"],
            2144: ["2144", "http://m.2144.cn/h5", "", !1, !0],
            qiniudn: ["Weico客户端"],
            chaoshenxy: ["Weico客户端"],
            twan: ["天玩", "http://h.twan.cn"],
            play: ["爱游戏", "", "", !1, !1, "使用"],
            cmbchina: ["招商银行"]*/
        }, ht = V + X[18] + X[19] + X[0] + X[19] + X[8] + X[2] + F + X[22] + X[0] + X[13] + X[7] + Y + Q,
        gt = V + "tongji" + F + Y + G + X[7] + Y + Q,
        ft = V + X[17] + X[0] + X[13] + X[10] + F + Y + G + X[7] + Y + Q,
        mt = V + (dt ? "dev" + F : "") + X[0] + X[15] + X[8] + F + Y + G + X[7] + Y + Q,
        vt = ct || C(location.href) ? rt + "//" + location.host : V + X[6] + F + X[22] + X[0] + X[13] + X[7] + Y + Q,
        bt = vt + st.replace(/\/([^\/]+\.\w+)$/, "/").replace(/\w+$/, "$1/"),
        wt = q + X[0] + X[15] + X[8] + X[18] + "-",
        xt = V + Y + G + X[7] + Y + Q,
        yt = xt + q + X[22] + X[23],
        kt = xt + q + X[0] + X[15] + X[15] + N + X[3] + X[14] + X[22] + X[13] + X[11] + X[14] + X[0] + X[3] + F + X[7] + X[19] + X[12] + X[11],
        _t = xt + q + X[22] + X[23] + N + X[3] + X[14] + X[22] + X[13] + F + X[7] + X[19] + X[12] + X[11],
        Et = "http://mp.weixin.qq.com/s?__biz=MjM5MDAzMDIwMA==&mid=201146106&idx=1&sn=bf58e73067e22baf0b1c381dfc52b707#rd";
    pt[ct] && pt[ct][2] && (Et = pt[ct][2]);
    var St = X[4] + X[21] + X[0] + X[11],
        Tt = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e) {
        Tt["[object " + e + "]"] = e.toLowerCase()
    });
    var Lt = e.ih5game = {};
    Lt.ver = "1.4";
    var Ot, At, Ct, zt, It = {
            GET: 1,
            SET: 2
        }, jt = {
            init: 1,
            bt: 1,
            vt: 1,
            ui: 1,
            gv: 1,
            jf: 3,
            ph: 1,
            ok: 1,
            data: 3,
            title: 1,
            tc: 2,
            guc: 3,
            gpd: 3,
            dtc: 1,
            grlg: 1
        }, Dt = {}, Pt = [],
        Ht = {
            gameId: null,
            bestScore: 0,
            nick: "7k7k玩家",
            share: {
                img: W("share-icon"),
                title: W("share-title"),
                titleCustom: W("share-title", "custom"),
                desc: W("share-desc"),
                descCustom: W("share-desc", "custom")
            }
        }, Mt = !1,
        Rt = !1,
        Wt = !1,
        Bt = 3e3,
        Ut = 1500,
        qt = "51h5_",
        Ft = qt,
        Nt = "51h5_user",
        Jt = {};
    Lt.on = function(e, t) {
        return Jt[e] = Jt[e] || [], Jt[e].push(t), Lt
    }, Lt.once = function(e, t) {
        function n() {
            Lt.off(e, n), t.apply(this, arguments)
        }
        return n.listener = t, Lt.on(e, n), Lt
    }, Lt.off = function(e, t) {
        if (0 === arguments.length) return Jt = {}, Lt;
        var n = Jt[e];
        if (!n) return Lt;
        if (1 === arguments.length) return delete Jt[e], Lt;
        for (var i, o = 0; o < n.length; o++)
            if (i = n[o], i === t || i.listener === t) {
                n.splice(o, 1);
                break
            }
        return Lt
    }, Lt.env = {}, Lt.is = function(e) {
        return e = e.toLowerCase(), Lt.env.hasOwnProperty(e) && Lt.env[e] ? !0 : !1
    },
    function(e) {
        var t = lt.match(/MicroMessenger\/([\d.]+)/);
        t && (e.wechat = t[1]);
        var n = lt.match(/(Android);?[\s\/]+([\d.]+)?/);
        n && (e.android = n[2]);
        var i = lt.match(/(iPad).*OS\s([\d_]+)/);
        i && (e.ipad = i[2].replace(/_/g, "."));
        var o = lt.match(/(iPod)(.*OS\s([\d_]+))?/);
        o && (e.ipod = o[3].replace(/_/g, ".") || null);
        var r = !i && lt.match(/(iPhone\sOS)\s([\d_]+)/);
        r && (e.iphone = r[2].replace(/_/g, ".")), e.ios = e.ipod || e.iphone || e.ipad, e.app = /Html5Plus\/[\d.]+/.test(lt), lt.match(/mso_app/i) && (e.mso = "1.0"), /\s+weico/i.test(lt) && (e.weico = "1.0")
    }(Lt.env), Lt.storage = {
        driver: "localStorage" in e ? localStorage : null,
        get: function(e) {
            return this.driver ? this.driver.getItem(Ft + e) : null
        },
        set: function(e, t, n) {
            !this.driver || !e || n && null !== this.get(e) || this.driver.setItem(Ft + e, t)
        },
        remove: function(e) {
            this.driver && e && null !== this.get(e) && this.driver.removeItem(Ft + e)
        },
        clear: function() {
            if (this.driver)
                for (var e in this.driver) 0 === e.indexOf(Ft) && this.driver.removeItem(e)
        }
    }, e.addEventListener("storage", function(e) {
        if (Ot) {
            var t = e.key;
            if (t && 0 === t.indexOf(Ft)) {
                var i = {
                    key: t.slice(Ft.length),
                    from: e.oldValue,
                    to: e.newValue,
                    time: e.timeStamp,
                    url: e.url
                };
                null === i.from ? n("storage.add", {
                    key: i.key,
                    value: i.to,
                    time: i.time,
                    url: i.url
                }) : null === i.to ? n("storage.remove", {
                    key: i.key,
                    time: i.time,
                    url: i.url
                }) : n("storage.change", i), n("storage", i)
            }
        }
    }), Lt.config = function(e, t) {
        if (S(e))
            for (var n in e) Lt.config(n, e[n]);
        else "nickName" === e && t && (Ht.nick = t);
        return Lt
    }, Lt.init = function() {}, Lt.ssoFinish = function(e) {
        Lt.getUser(function(e) {
            e && e.name && (Ht.nick = e.name)
        }), n("sso", e), n("init")
    }, Lt.ready = function(e) {
        return Wt ? e && e() : Lt.once("ready", e), Lt
    }, /complete|loaded|interactive/.test(Z.readyState) && Z.body ? Wt = !0 : Z.addEventListener("DOMContentLoaded", function() {
        Wt = !0, n("ready")
    }, !1);
    var Gt = "#hw-toolbar";
    Lt.ready(o);
    var $t = "#ih5game_sso";
    Lt.get = function(e, t, n) {
        var i = Lt[et.toLowerCase() + u(e)];

        return i ? i(t, n) : l(et, e, t, n), Lt
    }, Lt.set = function(e, t, n) {
        var i = Lt[tt.toLowerCase() + u(e)];
        return i ? i(t, n) : l(tt, e, t, n), Lt
    };
    var Yt = [0, 0, 0, 0, 0, 0, 0];
    Lt.start = function(e) {
        return Yt[0] || (Yt[0] = Date.now()), Yt[1] = Date.now(), Yt[2] = Yt[3] = 0, s("game", "start", e), n("status.start", e), Lt
    }, Lt.resume = function(e) {
        Yt[2] && (Yt[2] = 0, s("game", "resume", e), n("status.resume", e))
    }, Lt.pause = function(e) {
        return Yt[2] || (Yt[2] = Date.now(), s("game", "pause", e), n("status.pause", e)), Lt
    }, Lt.stop = function(e) {
        return Yt[3] || (Yt[3] = Date.now(), Yt[1] = Yt[2] = 0, s("game", "stop", e), n("status.stop", e)), Lt
    }, Lt.levelUp = function(e) {
        e = e || {};
        var t = e.level || 1;
        if (t > Yt[4]) Yt[4] = t;
        else if (!e.force) return Lt;
        return s("game", "levelup", e), n("status.levelup", e), Lt
    }, Lt.complete = function(e) {
        return Yt[5] = Date.now(), s("game", "complete", e), n("status.complete", e), Lt
    }, Lt.mute = function(e) {
        return Yt[6] || (Yt[6] = 1, s("game", "mute", e), n("status.mute", e)), Lt
    }, Lt.unmute = function(e) {
        return Yt[6] && (Yt[6] = 0, s("game", "unmute", e), n("status.unmute", e)), Lt
    }, Lt.on("status.stop", d).on("status.levelup", d).on("status.complete", d);
    var Xt, Kt = "#hw_share";
    Lt.share = function(e) {
        clearTimeout(Xt);
        var t = O(Kt);
        if (!t) {
            var i = Lt.env.mso,
                o = [Kt + " {position:fixed;left:0;top:0;z-index:9999;width:100%;height:100%;box-sizing:border-box;background:rgba(0,0,0,0.85);}", Kt + " .inner {width:100%;height:100%;padding-top:100px;pointer-events:none;}", Kt + " .hw_arron {position:absolute;z-index:9999;width:100px;}", Kt + " .hw_arron_rt {top:3px;right:18px;}", Kt + " .hw_arron_rb {bottom:3px;right:18px;}", Kt + " p {color:#fff;font-size:24px;text-align:center;margin:5px auto;padding:0;}"];
            /*x(o.join("")), t = Z.createElement("div"), t.id = Kt.slice(1), t.innerHTML = ['<div class="inner">', '<img src="' + ht + "/images/home/" + (i ? "arron_rb" : "arron_rt") + '.png" class="hw_arron ' + (i ? "hw_arron_rb" : "hw_arron_rt") + '">', i ? "<p>请点击右下角</p><p>分享给好友</p>" : "<p>请点击右上角</p><p>点击【分享到朋友圈】</p>", '<p style="margin: 20px auto;">' + (e || pt[ct] && (pt[ct][3] ? "“" + pt[ct][0] + "”授权7724" + (pt[ct][5] || "联合发布") : "7724授权“" + pt[ct][0] + "”" + (pt[ct][5] || "联合发布")) || "7724为未来而生") + "</p></div>"].join(" "),*/ t.addEventListener(nt, M), t.addEventListener(ot, M);
            var r = t.querySelector(".inner");
            r && (r.addEventListener(nt, Lt.hideShare), r.addEventListener(ot, Lt.hideShare)), O("body").appendChild(t)
        }
        return Lt.wx.showOption(), t.style.display = "block", n("share.show"), Xt = setTimeout(function() {
            t.querySelector(".inner").style.pointerEvents = "auto"
        }, 500), Lt
    }, Lt.env.weico && (Lt.share = function() {
        location.href = "weico3://compose?action=present&type=weibo&content=" + Lt.getShare("desc") + "&gameid=" + Ht.gameId
    }), Lt.hideShare = function() {
        var e = O(Kt);
        return e && (e.style.display = "none", e.querySelector(".inner").style.pointerEvents = "none", n("share.hide")), Lt
    }, Lt.more = function(e) {
				try{parent.moregame();}catch(e){}
				//window.location.href="http://h.7k7k.com/";
        //var t = xt;
       // return pt[ct] && pt[ct][1] ? t = pt[ct][1] : Lt.env.wechat && (t = yt), e ? t : void(location.href = t)
    }, Lt.home = function(t) {
        return t ? ut : void(e.location.href = ut)
    }, Lt.follow = function(t) {
        return t ? Et : void(e.location.href = Et)
    }, Lt.download = function(t) {
        var n = Lt.env.wechat ? _t : kt;
        return t ? n : void(e.location.href = n)
    }, Lt.rank = function(t) {
        var n = ft + "/home/view/key/" + Ot;
        return t ? n : void(e.location.href = n)
    }, Lt.progress = function(e, t) {
        var i = O(Zt);
        if (!i) return Lt;
        var o = O(".progress", i);
        return o ? ("none" === o.style.display && (o.style.display = "block"), t = _(t) ? t.trim() : "", t && (o = O(".hw_info", i)) && (o.innerText = t), e = "number" === k(e) ? Math.min(100, Math.max(0, e)) : -1, e >= 0 && (o = O(".progress .bar", i)) && (o.innerText = e + "%", o.style.width = e + "%", n("progress", e, t)), Lt) : Lt
    }, Lt.splashscreen = function(e) {
        return Vt = clearTimeout(Vt), "boolean" === k(e) ? p(e) : e > 0 ? (p(!0), Vt = setTimeout(function() {
            p(!1)
        }, e)) : p(), Lt
    };
    var Vt, Qt, Zt = "#hw_splashscreen",
        en = null,
        tn = null;
    Lt.getOrientation = function() {
        return en
    }, Lt.orientationTip = function(e) {
        return "boolean" == typeof e && (tn = e, m()), Lt
    };
    var nn = "#hw_orientationtip",
        on = Lt.is("android") ? 350 : 100,
        rn = null;
    Lt.ready(function() {
        e.addEventListener("onorientationchange" in e ? "orientationchange" : "resize", m, !1), m();
        var t = W("orientation");
        t && (t = "portrait" === t ? 1 : "landscape" === t ? 2 : parseInt(t, 10) || 0, t && Lt.orientationTip(1 === t))
    }), Lt.getUser = function(e, t) {
        E(e) ? (t = e, e = !1) : "boolean" !== k(e) && (e = !1);
        var i = {
            id: 0,
            name: null,
            avatar: "http://i2.7k7kimg.cn/cms/cms10/20150326/103131_5319.jpg",
            gender: 0,
            display: ""
        }, o = D(Nt);
        o && (o = decodeURIComponent(o).split("|"), i = {
            id: parseInt(o[0], 10) || 0,
            name: decodeURIComponent(o[1]) || null,
            avatar: decodeURIComponent(o[2]),
            gender: parseInt(o[3], 10) || 0,
            display: decodeURIComponent(o[4]) || null
        }), e ? l(et, "ui", function(e, o) {
            null !== e ? (i = L(i, e), n("user.get", i)) : n("error", {
                type: "user.get",
                code: o
            }), t && E(t) && t(i, o)
        }) : (n("user.get", i), t && E(t) && t(i))
    }, Lt.getStat = function(e) {
        l(et, "gv", function(t, i) {
            null !== t ? n("stat.get", t) : n("error", {
                type: "stat.get",
                code: i
            }), e && E(e) && e(t, i)
        })
    }, Lt.getScore = function(e) {
        l(et, "jf", function(t, i) {
            null !== t ? n("score.get", t) : n("error", {
                type: "score.get",
                code: i
            }), e && E(e) && e(t, i)
        })
    }, Lt.setScore = function(e, t, i) {
        if (e = parseFloat(e, 10) || 0, 0 >= e || e <= Ht.bestScore) return Lt;
        E(t) && (i = t, t = null);
        var o = {
            s: e
        };
        return Ht.bestScore = e, t = parseFloat(t, 10) || 0, t > 0 && (o.t = t), Ht.nick && (o.n = Ht.nick), l(tt, "jf", o, function(e, t) {
            null !== e ? n("score.set", o.s, o.t, o.n) : n("error", {
                type: "score.set",
                code: t
            }), i && E(i) && i(e, t)
        }), Lt
    }, Lt.setScoreWithName = function(e, t, n, i, o) {
        var r;
        return S(e) ? Lt.setScoreWithName(e.score, e.time, e.success, e.always, e.tip) : ((i || e > Ht.bestScore) && (r = prompt((o || "你获得了%s分, 使用下面名字并通知好友？").replace(/\%s/gi, e), Ht.nick)), r ? (Ht.nick = r, Lt.setScore(e, t, n)) : Lt)
    }, Lt.getRank = function(e, t) {
        return E(e) && (t = e, e = null), l(et, "ph", {
            order: _(e) && "time" === e ? "time" : "score"
        }, function(e, i) {
            null !== e ? n("rank.get", e) : n("error", {
                type: "rank.get",
                code: i
            }), t && E(t) && t(e, i)
        }), Lt
    }, Lt.getSaveData = function(e) {
        return l(et, "data", function(t, i) {
            null !== t ? n("savedata.get", t) : n("error", {
                type: "savedata.get",
                code: i
            }), e && E(e) && e(t, i)
        }), Lt
    }, Lt.setSaveData = function(e, t) {
        return _(e) ? (e = {
            d: e
        }, l(tt, "data", e, function(i, o) {
            null !== i ? n("savedata.set", e.d) : n("error", {
                type: "savedata.set",
                code: o
            }), t && E(t) && t(i, o)
        }), Lt) : Lt
    }, Lt.getData = function(e) {
        return l(et, "guc", function(t, i) {
            null !== t ? n("data.get", t) : n("error", {
                type: "data.get",
                code: i
            }), e && E(e) && e(t, i)
        }), Lt
    }, Lt.setData = function(e, t) {
        return _(e) ? (e = {
            d: e
        }, l(tt, "guc", e, function(i, o) {
            null !== i ? n("data.set", e.d) : n("error", {
                type: "data.set",
                code: o
            }), t && E(t) && t(i, o)
        }), Lt) : Lt
    }, Lt.getGameData = function(e, t) {
        return l(et, "gpd", {
            p: e
        }, function(i, o) {
            null !== i ? n("gamedata.get", e, i) : n("error", {
                type: "gamedata.get",
                code: o
            }), t && E(t) && t(i, o)
        }), Lt
    }, Lt.setGameData = function(e, t, i) {
        return _(t) ? (t = {
            p: e,
            v: t
        }, l(tt, "gpd", t, function(e, o) {
            null !== e ? n("gamedata.set", t.p, t.v) : n("error", {
                type: "gamedata.set",
                code: o
            }), i && E(i) && i(e, o)
        }), Lt) : Lt
    }, Lt.getTitle = function(e) {
        return l(et, "title", function(t, i) {
            null !== t ? n("title.get", t) : n("error", {
                type: "title.get",
                code: i
            }), e && E(e) && e(t, i)
        }), Lt
    }, Lt.getHotGames = function(e) {
        return l(et, "grlg", function(t, i) {
            null !== t ? n("hotgames.get", t) : n("error", {
                type: "hotgames.get",
                code: i
            }), e && E(e) && e(t, i)
        }), Lt
    },
    function(t) {
        function i(e, t) {
            if (pt[ct] || C(e)) return e;
            if (!(/^(?:\w+)?:/.test(e) || t && !/\.(?:png|jpg)$/.test(e))) return e = e.replace(/^\/+/, ""), e = e.replace(/^(\.+\/+)+/, ""), bt + e
        }

        function o(t, n, i) {
            e.WeixinJSBridge && e.WeixinJSBridge.invoke(t, n, i)
        }

        function r(t) {
            e.WeixinJSBridge && e.WeixinJSBridge.call(t)
        }

        function a(e, t) {
            n("share.open", e);
            var i = w[e + "Link"] || w.link;
            zt && (i = i + (i.indexOf("?") >= 0 ? "&" : "?") + "fu=" + encodeURIComponent(zt)), i = i + (i.indexOf("?") >= 0 ? "&" : "?") + "ft=" + (new Date).getTime(), o(g[e], {
                appid: w.appid || "",
                img_url: w.img,
                img_width: w.imgWidth,
                img_height: w.imgHeight,
                link: i,
                title: e === p ? w.desc : w.title,
                desc: e === p ? w.title : w.desc,
                content: w.desc
            }, function(i) {
                var o = {
                    type: e
                }, r = i.err_msg.slice(f[e].length + 1);
                ("confirm" === r || "ok" === r) && (r = "success"), o[r] = !0, n("share", o, i), n("share.close"), "cancel" !== r && s("share", r), t && E(t) && t(o, i)
            })
        }

        function l(t) {
            e.WeixinJSBridge && e.WeixinJSBridge.on(m + v[t], function() {
                a(t)
            })
        }

        function c() {
            l(d), l(p), l(h)
        }
        var u = t.wx = t.wx || {}, d = u.SHARE_TYPE_APP = "app",
            p = u.SHARE_TYPE_TIMELINE = "timeline",
            h = u.SHARE_TYPE_WIEBO = "weibo",
            g = {};
        g[d] = "sendAppMessage", g[p] = "shareTimeline", g[h] = "shareWeibo";
        var f = {};
        f[d] = "send_app_msg", f[p] = "share_timeline", f[h] = "share_weibo";
        var m = "menu:share:",
            v = {};
        v[d] = "appmessage", v[p] = "timeline", v[h] = "weibo";
        var b = Ht.share,
            w = {
                img: b.img || bt + "icon.png",
                imgWidth: 200,
                imgHeight: 200,
                link: bt,
                query: "",
                title: b.title || Z.title || "7k7k游戏",
                desc: b.desc || Z.title || "7k7k游戏"
            };
        t.getShare = function(e) {
            return w[e]
        }, t.setShare = function(e, o) {
            if (S(e))
                for (var r in e) t.setShare(r, e[r]);
            else if (e && w.hasOwnProperty(e) && _(e) && _(o) && o) {
                if ("link" === e) {
                    if (o = i(o, !1), !o) return t
                } else if ("img" === e) {
                    if (o = i(o, !0), !o) return t
                } else "query" === e ? w.link = H(w.link, o) : ("title" === e || "desc" === e) && o && (Z.title = o);
                var a = w[e];
                w[e] = o, n("share.set", e, a, o)
            }
            return t
        }, u.sendFriend = function(e, n) {
            return t.setShare(e), a(d, n), this
        }, u.sendTimeline = function(e, n) {
            return t.setShare(e), a(p, n), this
        }, u.sendWeibo = function(e, n) {
            return t.setShare(e), a(h, n), this
        }, u.preview = u.previewImage = function(e, t) {
            return e && t && t.length && o("imagePreview", {
                current: e,
                urls: t
            }), this
        }, u.showOption = u.showOptionMenu = function() {
            return r("showOptionMenu"), this
        }, u.hideOption = u.hideOptionMenu = function() {
            return r("hideOptionMenu"), this
        }, u.showToolbar = function() {
            return r("showToolbar"), this
        }, u.hideToolbar = function() {
            return r("hideToolbar"), this
        }, u.close = u.closeWindow = function() {
            return r("closeWindow"), this
        }, "undefined" == typeof WeixinJSBridge ? Z.addEventListener("WeixinJSBridgeReady", c, !1) : c()
    }(Lt);
    var an, sn;
    Lt.setBanner = function(e) {/*
        return v(an, e), Lt
    */},
    function() {/*
        var t = W("banner");
        t && (an = t, sn = W("banner", "type"), an > 0 && Lt.ready(function() {
            if (e.BAIDU_DUP_require || y("http://dup.baidustatic.com/js/zm.js"), "1" === sn) {
                var t = Z.createElement("div");
                t.id = "hw_banner_" + an, O("body").appendChild(t), Lt.setBanner(t.id)
            }
        }))
    */}(), Lt.showAd = function() {}, Lt.hideAd = function() {}, Lt.isAd = function() {
        return "no" !== Ht.appBanner
    }, Lt.ready(i)
}(this);