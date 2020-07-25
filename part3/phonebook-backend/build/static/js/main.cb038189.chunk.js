(this.webpackJsonpreactjs = this.webpackJsonpreactjs || []).push([[0], {
    14: function (e, n, t) {},
    16: function (e, n, t) {
        e.exports = t(38)
    },
    38: function (e, n, t) {
        "use strict";
        t.r(n);
        var a = t(0),
            r = t.n(a),
            u = t(15),
            o = t.n(u),
            c = t(4),
            l = t(3),
            i = function (e) {
                return r.a.createElement("form", {
                    onSubmit: e.onsubmit
                }, r.a.createElement("h2", null, "add new number"), r.a.createElement("div", null, "name: ", r.a.createElement("input", {
                    value: e.newname,
                    onChange: e.handlename
                })), r.a.createElement("div", null, "number: ", r.a.createElement("input", {
                    value: e.newnumber,
                    onChange: e.handlenumber
                })), r.a.createElement("div", null, r.a.createElement("button", {
                    type: "submit"
                }, "add")))
            },
            m = function (e) {
                return e.del ? r.a.createElement("li", null, e.name, " ", e.number, r.a.createElement("button", {
                    id: e.id,
                    key: e.id,
                    onClick: e.deletePerson
                }, " delete")) : r.a.createElement("li", null, e.name, " ", e.number)
            },
            s = function (e) {
                return r.a.createElement("div", null, r.a.createElement("h2", null, e.heading), r.a.createElement("ul", null, e.arr.map((function (n) {
                    return r.a.createElement(m, {
                        id: n.id,
                        deletePerson: e.deletePerson,
                        key: n.name,
                        name: n.name,
                        number: n.number,
                        del: e.del
                    })
                }))))
            },
            d = t(2),
            f = t.n(d),
            p = "/api/persons/",
            b = function (e) {
                return f.a.post(p, e).then((function (e) {
                    return e.data
                }))
            },
            h = function (e) {
                return f.a.delete(p + e).then((function (e) {
                    return e.data
                }))
            },
            g = function () {
                return f.a.get(p).then((function (e) {
                    return e.data
                }))
            },
            E = function (e) {
                return f.a.put(p + e.id, e).then((function (e) {
                    return e.data
                }))
            },
            v = (t(14), function (e) {
                return null === e.props ? null : r.a.createElement("div", {
                    className: e.props.type
                }, e.props.msg)
            }),
            w = function () {
                var e = Object(a.useState)([]),
                    n = Object(l.a)(e, 2),
                    t = n[0],
                    u = n[1],
                    o = Object(a.useState)(""),
                    d = Object(l.a)(o, 2),
                    f = d[0],
                    p = d[1],
                    w = Object(a.useState)(""),
                    y = Object(l.a)(w, 2),
                    O = y[0],
                    j = y[1],
                    C = Object(a.useState)([]),
                    k = Object(l.a)(C, 2),
                    S = k[0],
                    P = k[1],
                    T = Object(a.useState)({}),
                    J = Object(l.a)(T, 2),
                    L = J[0],
                    N = J[1];
                Object(a.useEffect)((function () {
                     g().then((function (e) {
                        return u(e)
                    })).catch((function (e) {
                        N({
                            msg: "Could not get data. Please check your internet connection",
                            type: "red"
                        }), setTimeout((function () {
                            N(null)
                        }), 5e3)
                    }))
                }), []);
                return r.a.createElement("div", null, r.a.createElement(v, {
                    props: L
                }), " ", r.a.createElement("h2", null, " Phonebook "), " ", r.a.createElement("div", null, "filter shown with ", r.a.createElement("input", {
                    onChange: function (e) {
                        if (e.target.value.replace(" ", "").length > 0) {
                            var n = e.target.value,
                                a = [];
                            t.map((function (e) {
                                e.name.toLowerCase().includes(n.toLowerCase()) && a.push({
                                    name: e.name,
                                    number: e.number
                                }), P(a)
                            }))
                        } else P([])
                    }
                }), " "), r.a.createElement("ul", null, " ", S.map((function (e) {
                    return r.a.createElement(m, {
                        key: e.name,
                        name: e.name,
                        number: e.number,
                        del: !1
                    })
                })), " "), " ", r.a.createElement(i, {
                    onsubmit: function (e) {
                        if (e.preventDefault(), a = f, !(t.map((function (e) {
                                return e.name.toLowerCase() === a.toLowerCase()
                            })).indexOf(!0) + 1) && f.length > 0) {
                            b({
                                name: f,
                                number: O
                            }).then((function (e) {
                             u(t.concat(e)), N({
                                    msg: "".concat(e.name, " has been added to the server"),
                                    type: "green"
                                }), setTimeout((function () {
                                    N(null)
                                }), 5e3)
                            })).catch((function (e) {
                                N({
                                    msg: JSON.parse(e.response.request.response).error.message,
                                    type: "red"
                                }), setTimeout((function () {
                                    N(null)
                                }), 5e3)
                            })), j(""), p("")
                        } else {
                            if (window.confirm("".concat(f, " already exists. Do you want to update it?"))) {
                                var n = t.find((function (e) {
                                    return e.name == f
                                }));
                                E(Object(c.a)(Object(c.a)({}, n), {}, {
                                    number: O
                                })).then((function (e) {
                                    u(t.map((function (n) {
                                        return n.id == e.id ? e : n
                                    })))
                                })).catch((function (e) {
                                    N({
                                        msg: JSON.parse(e.response.request.response).error.message,
                                        type: "red"
                                    }), setTimeout((function () {
                                        N(null)
                                    }), 5e3)
                                })), p(""), j("")
                            }
                            p(""), j("")
                        }
                        var a
                    },
                    newname: f,
                    newnumber: O,
                    handlename: function (e) {
                        p(e.target.value)
                    },
                    handlenumber: function (e) {
                        j(e.target.value)
                    }
                }), " ", r.a.createElement(s, {
                    arr: t,
                    heading: "Numbers",
                    deletePerson: function (e) {
                        var n = e.target.id;
                        window.confirm("Delete ".concat(t.find((function (n) {
                            return n.id == e.target.id
                        })).name, "?")) && h(e.target.id).then((function (e) {
                            var a = t.filter((function (e) {
                                return e.id != n
                            }));
                            u(a), N({
                                msg: "".concat(t.find((function (e) {
                                    return e.id == n
                                })).name, " has been removed from the server"),
                                type: "green"
                            }), setTimeout((function () {
                                N(null)
                            }), 5e3)
                        })).catch((function (e) {
                            console.log(e), N({
                                msg: "Person ".concat(t.find((function (e) {
                                    return e.id == n
                                })).name, " has already been removed from the server"),
                                type: "red"
                            }), setTimeout((function () {
                                N(null)
                            }), 5e3)
                        }))
                    },
                    del: !0
                }), " ")
            };
        o.a.render(r.a.createElement(w, null), document.getElementById("root"))
    }
}, [[16, 1, 2]]]);
//# sourceMappingURL=main.cb038189.chunk.js.map
