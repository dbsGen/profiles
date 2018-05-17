/**
 * Created by mac on 2018/5/17.
 */

//var avatar = document.getElementById('avatar');
//var image = new GIXI(300, "12333").getImage();
//avatar.setAttribute('src', image);


var config = {
    host: "https://mainnet.nebulas.io",
    address: 'n1zv4YirpBMxsUKNx525q1V5Gzub94nYumQ'
};
var nebulas = require("nebulas");
var NebAccount = nebulas.Account;
var neb = new nebulas.Neb();
var nonce = 0;
neb.setRequest(new nebulas.HttpRequest(config.host));

var containerElem = document.getElementsByClassName('container')[0];
var avatarElem = document.getElementById('avatar');
var nameElem = document.getElementById('name'),
    hashElem = document.getElementById('hash'),
    desElem = document.getElementById('des'),
    walletElem = document.getElementsByClassName('wallet')[0],
    qrElem = document.getElementById('qrCode');

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


var h = location.hash.replace(/^#/, '');
if (h.length != null) {
    neb.api.getAccountState({address:h}).then(function (state) {
        locCall('fetch', h)
            .then(function (res) {
                containerElem.classList.remove('placeholder');
                var data = JSON.parse(res.result);
                if (data) {
                    nameElem.innerText = data.name;
                    hashElem.innerText = data.hash;
                    desElem.innerText = data.summary;
                    if (data.avatar.match(/https?\:\/\//)) {
                        avatarElem.setAttribute('src', data.avatar);
                    }else {
                        var imageData = new GIXI(96, data.hash).getImage();
                        avatarElem.setAttribute('src', imageData);
                    }

                    qrElem.setAttribute('src', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + data.hash);

                    var bgC = containerElem.style.backgroundColor = data.backgroundColor;
                    hashElem.style.color = walletElem.style.color = desElem.style.color = nameElem.style.color = data.textColor;
                    var switchStyle = document.createElement('style');
                    document.body.appendChild(switchStyle);
                    var btC = data.buttonColor;
                    switchStyle.innerHTML ='button.switch-button { border: solid 1px '+btC+';color: '+btC+';} button.switch-button:hover {background: '+btC+';color: '+bgC+';}';
                }else {
                    hashElem.innerText = h;
                    qrElem.setAttribute('src', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + h);

                    profile.style.transform = 'none';
                    profile.style.display = 'none';
                    hashCode.style.transform = 'none';
                    hashCode.style.display = 'block';
                    var bts = document.getElementsByClassName('switch-button');
                    for (var i = 0, t = bts.length; i < t; ++i) {
                        bts[i].style.display = 'none';
                    }
                }
            })
            .catch(function (err) {

            });
    }).catch(function (err) {

    });
}

var changeCode = document.getElementById('changeCode');
var changeProfile = document.getElementById('changeProfile');
var profile = document.getElementById('profile');
var hashCode = document.getElementById('hashCode');

changeCode.onclick = function () {
    profile.style.transform = 'perspective(500px) rotateX(90deg)';
    hashCode.style.transform = 'perspective(500px) rotateX(90deg)';
    hashCode.style.display = 'block';
    setTimeout(function () {
        hashCode.style.transform = 'none';
        setTimeout(function () {
            profile.style.display = 'none';
        }, 400);
    }, 400);
};


changeProfile.onclick = function () {
    profile.style.transform = 'perspective(500px) rotateX(90deg)';
    hashCode.style.transform = 'perspective(500px) rotateX(90deg)';
    profile.style.display = 'block';
    setTimeout(function () {
        profile.style.transform = 'none';
        setTimeout(function () {
            hashCode.style.display = 'none';
        }, 400);
    }, 400);
};
