!function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([/*!**********************!*\
 !*** ./lib/index.js ***!
 \**********************/
function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(/*! ./gixi */1),o=n(i);"undefined"!=typeof jQuery&&jQuery?!function(t){t.fn.gixi=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];t.seed=t.seed||this.data("gixiseed"),t.size=t.size||this.data("gixisize")||this.height(),t.size=Math.round(t.size),t.color=t.color||this.data("gixicolor");var e=new o["default"](t.size,t.seed);"undefined"!==t.color&&(e.fillStyle=t.color);var r=e.getImage();"IMG"!==this.prop("tagName")?this.css({"background-image":"url("+r+")"}):this.attr("src",r)}}(jQuery):(false);"undefined"!=typeof window?window.GIXI=o["default"]:t.exports=o["default"],e["default"]=o["default"]},/*!*********************!*\
 !*** ./lib/gixi.js ***!
 \*********************/
function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=function(){function t(e){r(this,t),this.r=Math.floor(200*e.random()),this.g=Math.floor(200*e.random()),this.b=Math.floor(200*e.random()),this.t=1}return n(t,[{key:"rgba",value:function(){return"rgba("+this.r+","+this.g+","+this.b+","+this.t+")"}}]),t}(),o=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?60:arguments[0],n=arguments.length<=1||void 0===arguments[1]?Math.random():arguments[1];r(this,t),this.w=e,this.h=e,this.PARTITIONS=3,this.LESS_SEED=6,this.BASE_SEED=5,this.SEED_H=this.h/this.BASE_SEED,this.SEED_W=this.w/this.BASE_SEED,this.random_seed=0,n=n.toString();for(var i=0;i<n.length;i++)this.random_seed+=n.charCodeAt(i)}return n(t,[{key:"random",value:function(){return this.random_seed=Math.sin(34812*this.random_seed+.3),Math.abs(this.random_seed)}},{key:"getImage",value:function(){var t=document.createElement("canvas"),e=null;if(t.width=this.w,t.height=this.h,!t&&!t.getContext)throw new Error("Canvas does not supported");return this.drw=t.getContext("2d"),this.drw.fillStyle=this.fillStyle||new i(this).rgba(),this.map(this.grid()),e=t.toDataURL(),t=null,e}},{key:"draw",value:function(){this.drw.fillRect.apply(this.drw,arguments)}},{key:"map",value:function(t){for(var e=0;e<t.length;e++)for(var r=0;r<t[e].length;r++)t[e][r]===!0&&(this.draw(this.SEED_H*e,this.SEED_W*r,this.SEED_W,this.SEED_H),e<this.PARTITIONS-1&&this.draw(this.SEED_H*(this.PARTITIONS+1-e),this.SEED_W*r,this.SEED_W,this.SEED_H))}},{key:"grid",value:function(){for(var t=this,e=function(){for(var e=[],r=0;r<t.PARTITIONS;r++){e[r]=[];for(var n=0;n<t.BASE_SEED;n++)e[r][n]=!!Math.floor(2*t.random())}return e[t.PARTITIONS-1]=e[t.PARTITIONS-1].map(function(r,n){return e[t.PARTITIONS-2][n]!==r&&!!Math.floor(2*t.random())}),{map:e,dots:function(){return e.map(function(t){return t.reduce(function(t,e){return e?t+e:t})}).reduce(function(t,e){return e+t})},isFilledTop:function(){return e.map(function(t){return t[0]}).reduce(function(t,e){return!(!t&&!e)})},isFilledBottom:function(){return e.map(function(t){return t[t.length-1]}).reduce(function(t,e){return!(!t&&!e)})}}},r=e();r.dots()<this.LESS_SEED||!r.isFilledTop()||!r.isFilledBottom();)r=e();return r.map}}]),t}();e["default"]=o}]);
//# sourceMappingURL=gixi-min.js.map

(function (){
    var config = {
        website: 'http://127.0.0.1:8080/www/profile/',
        host: "https://mainnet.nebulas.io",
        address: 'n1zv4YirpBMxsUKNx525q1V5Gzub94nYumQ',
        card_width: 230,
        card_height: 110,
        animation_during: 400
    };
    var nebulas = require("nebulas");
    var NebAccount = nebulas.Account;
    var neb = new nebulas.Neb();
    var nonce = 0;
    neb.setRequest(new nebulas.HttpRequest(config.host));
    var mouse_listeners = [];

    document.body.onmousemove = function (e) {
        for (var i = 0, t = mouse_listeners.length; i < t; ++i) {
            mouse_listeners[i](e);
        }
    };

    var locCall = function () {
        if (arguments.length > 0) {
            var method = arguments[0];
            var args = [];
            for (var i = 1; i < arguments.length; ++i) {
                args.push(arguments[i]);
            }
            var ret = {
                then: function (func) {
                    this._then = func;
                    return this;
                },
                catch: function (func) {
                    this._catch = func;
                    return this;
                }
            };
            (function (ret) {
                var from;
                if (!from) {
                    from = NebAccount.NewAccount().getAddressString();
                }
                neb.api.call({
                    from: from,
                    to: config.address,
                    value: 0,
                    nonce: nonce++,
                    gasPrice: 1000000,
                    gasLimit: 2000000,
                    contract: {
                        function: method,
                        args: JSON.stringify(args)
                    }
                }).then(function (tx) {
                    if (ret._then) ret._then(tx);
                }).catch(function (err) {
                    if (ret._catch) ret._catch(err);
                });
            })(ret);
            return ret;
        }
    };

    function ElementControl(elem, data) {
        this.data = data;
        this.elem = elem;
        var self = this;
        this.is_display = false;
        elem.onmouseenter = function () {
            if (!self.card) {
                self.card = document.createElement('div');
                self.card.style.position = 'absolute';
                self.card.style.backgroundColor = '#fff';
                self.card.style.boxShadow = '0 0 2px #aaa';
                self.card.style.padding = '0';
                self.card.style.margin = '0';
                self.card.style.width = '240px';
                self.card.style.height = '110px';
                self.card.style.zIndex = 100;

                self.iframe = document.createElement('iframe');
                self.iframe.setAttribute('src', config.website + '#' + self.data.hash);
                self.iframe.style.border = 'none';
                self.iframe.style.padding = '0';
                self.iframe.style.margin = '0';
                self.iframe.style.width = '100%';
                self.iframe.style.height = '100%';
                self.card.appendChild(self.iframe);

                self.cover = document.createElement('div');
                self.cover.style.backgroundColor = '#fff';
                self.cover.style.position = 'absolute';
                self.cover.style.width = '100%';
                self.cover.style.height = '100%';
                self.cover.style.left = '0px';
                self.cover.style.top = '0px';
                self.cover.style.transition = 'opacity 300ms';
                self.card.appendChild(self.cover);

                self.iframe.onload = function () {
                    setTimeout(function () {
                        self.cover.style.opacity = 0;
                        setTimeout(function () {
                            self.cover.style.display = 'none';
                        }, 300);
                    }, 100);
                };

                var height = document.body.scrollHeight;
                var width = document.body.scrollWidth;
                document.body.appendChild(self.card);
                var rect = {
                    left: elem.offsetLeft,
                    top: elem.offsetTop,
                    right: elem.offsetLeft + elem.offsetWidth,
                    bottom: elem.offsetTop + elem.offsetHeight
                };
                var px = 'px';
                if (rect.bottom + config.card_height >= height && rect.top - config.card_height > 0) {
                    self.card.style.top = (rect.top - config.card_height) + px;
                }else {
                    self.card.style.top = rect.bottom + px;
                }
                if (rect.left + config.card_width > width) {
                    self.card.style.left = (rect.right - config.card_width) + px;
                }else {
                    self.card.style.left = rect.left + px;
                }
            }
            self.display();

        };

        function testRect(rect, point) {
            return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
        }

        this.onmousemove = function (e) {
            var rect1 = self.elem.getBoundingClientRect();
            var rect2 = self.card.getBoundingClientRect();
            var p = {x: e.clientX, y: e.clientY};
            if (!testRect(rect1, p) && !testRect(rect2, p)) {
                self.miss();
                var idx = mouse_listeners.indexOf(self.onmousemove);
                if (idx >= 0)
                    mouse_listeners.splice(idx, 1);
            }
        }
    }

    ElementControl.prototype.display = function() {
        if (this.is_display) return;
        this.is_display = true;
        this.startAnimation();

        mouse_listeners.push(this.onmousemove);

    };

    ElementControl.prototype.miss = function () {
        if (!this.is_display) return;
        this.is_display = false;
        this.startAnimation(true);
    };

    ElementControl.prototype.startAnimation = function (backwards) {
        var self = this;
        if (self.animationHandle) {
            cancelAnimationFrame(self.animationHandle);
        }
        var start_time = 0;
        self.card.style.display = 'block';
        function func(time) {
            if (!start_time) {
                start_time = time;
            }else {
                var p = (time - start_time) / config.animation_during;
                if (p > 1) {
                    p = 1;
                }
                self.update(backwards ? (1-p):p);
                if (p === 1) {
                    if (backwards) {
                        self.card.style.display = 'none';
                    }
                    return;
                }
            }
            self.animationHandle = requestAnimationFrame(func);
        }
        self.animationHandle = requestAnimationFrame(func);
    };
    ElementControl.prototype.update = function (p) {
        this.card.style.opacity = p;
    };

    window.Profiles = {
        init: function() {
            var nodes = document.querySelectorAll('[data-wallet]'), i, t, node;
            for (i = 0, t = nodes.length; i < t; ++i) {
                node = nodes[i];
                this.elem(node);
            }
            nodes = document.querySelectorAll('[data-wallet-image]');
            var self = this;
            for (i = 0, t = nodes.length; i < t; ++i) {
                node = nodes[i];
                (function (node) {
                    var wallet = node.getAttribute('data-wallet-image');
                    self.fetchImage(wallet).then(function (res) {
                        node.setAttribute('src', res);
                    });
                })(node);
            }
        },
        elem: function (elem) {
            var hash = elem.getAttribute('data-wallet');
            this.fetch(hash).then(function (res) {
                if (res) {
                    elem.innerText = res.name;
                    new ElementControl(elem, res);
                }else {
                    new ElementControl(elem, {hash: hash});
                }
            }).catch(function (err) {

            });
        },
        fetch: function (hash) {
            var ret = {
                then: function (func) {
                    this._then = func;
                    return this;
                },
                catch: function (func) {
                    this._catch = func;
                    return this;
                }
            };
            neb.api.getAccountState({address:hash}).then(function (state) {
                locCall('fetch', hash).then(function (res) {
                    if (ret._then) {
                        ret._then(JSON.parse(res.result));
                    }
                }).catch(function (err) {
                    if (ret._catch) {
                        ret._catch(err);
                    }
                });
            }).catch(function (err) {
                if (ret._catch) {
                    ret._catch(err);
                }
            });
            return ret;
        },
        fetchImage: function (hash) {
            var ret = {
                then: function (func) {
                    this._then = func;
                    return this;
                },
                catch: function (func) {
                    this._catch = func;
                    return this;
                }
            };
            this.fetch(hash).then(function (res) {
                if (res) {
                    if (ret._then) {
                        ret._then(res.avatar);
                    }
                }else {
                    if (ret._then) {
                        var imageData = new GIXI(96, hash).getImage();
                        ret._then(imageData);
                    }
                }
            }).catch(function (err) {
                if (ret._catch) {
                    ret._catch(err);
                }
            });
            return ret;
        }
    };
})();
