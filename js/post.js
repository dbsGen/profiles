/**
 * Created by mac on 2018/5/17.
 */

var Account = require('./account');
require('./profile_switch');
var GIXI = require('./gixi-module').default;
var LoadingSpinner = require('./loading_spinner');

var $myAvatar = $('#myAvatar'), $myName = $('#myName');
var $mySummary = $('#mySummary'), $bgButton = $('#bgButton');
var $textButton = $('#textButton'), $avatar = $('#avatar');
var $name = $('#name'), $hash = $('#hash'), $des = $('#des');
var $preview = $('.preview'), $buttonButton = $('#buttonButton');
var $myButtonColor = $('#myButtonColor'), $switchButton = $('.switch-button');
var $qrCode = $('#qrCode'), $checkAccount = $('#checkAccount');
var $postForm = $('#postForm'), $myBackground = $('#myBackground');
var $myColor = $('#myColor');
var imageData;

setTimeout(function () {
    if (!Account.account) {
        $checkAccount.slideDown();
    }
}, 1000);

$myName.change(function () {
    $name.text(this.value);

    if (!$myAvatar.attr('data-url')) {
        $avatar.attr('src', imageData);
    }
});
$mySummary.change(function () {
    $des.text(this.value);
});
$myAvatar.change(function () {
    if (this.value.match(/^https?\:\/\//)) {
        $avatar.attr('src', this.value);
        $myAvatar.attr('data-url', 'true');
    }else {
        $myAvatar.removeAttr('data-url');
        $avatar.attr('src', imageData);
    }
});

var bgPicker;

var $wallet = $('.wallet');
var textPicker;

var switchStyle = document.createElement('style');
document.body.appendChild(switchStyle);
var buttonPicker;


Account.onAccount = function (account) {
    imageData = new GIXI(300, account).getImage();
    $hash.text(account);
    $qrCode.attr('src', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+account);

    Account.locCall('fetch', account).then(function (res) {

        bgPicker = new CP($bgButton[0]);
        bgPicker.on('change', function (color) {
            var c = '#' + color, btC = $myButtonColor.val();
            $bgButton.css('background-color', c);
            $preview.css('background-color', c);
            $myBackground.val(c);
            switchStyle.innerHTML ='button.switch-button { border: solid 1px '+btC+';color: '+btC+';} button.switch-button:hover {background: '+btC+';color: #'+c+';}';
        });
        textPicker = new CP($textButton[0]);
        textPicker.on('change', function (color) {
            var c = '#' + color;
            $textButton.css('background-color', c);
            $name.css('color', c);
            $des.css('color', c);
            $wallet.css('color', c);
            $hash.css('color', c);
            $myColor.val(c);
        });
        buttonPicker = new CP($buttonButton[0]);
        buttonPicker.on('change', function (color) {
            var c = '#' + color, bgC = $myBackground.val();
            $buttonButton.css('background-color', c);
            switchStyle.innerHTML ='button.switch-button { border: solid 1px #'+color+';color: #'+color+';} button.switch-button:hover {background: #'+color+';color: '+bgC+';}';
            $myButtonColor.val(c);
        });
        bgPicker.set('#fff');
        textPicker.set('#666');
        buttonPicker.set('#007bff');
        var data = JSON.parse(res.result);
        if (data) {
            $myAvatar.val(data.avatar);
            $myAvatar.change();
            $myName.val(data.name);
            $myName.change();
            $mySummary.val(data.summary);
            $mySummary.change();

            bgPicker.set(data.backgroundColor);
            textPicker.set(data.textColor);
            buttonPicker.set(data.buttonColor);
        }else {
            $avatar.attr('src', imageData);
        }
    });
};

$postForm.on('submit', function () {
    if ( $myName.val().length === 0) {
        LoadingSpinner.show(LoadingSpinner.FAILED, "Lack of Name");
        LoadingSpinner.miss(1600);
        return false;
    }
    if ( $mySummary.val().length === 0) {
        LoadingSpinner.show(LoadingSpinner.FAILED, "Lack of Summary");
        LoadingSpinner.miss(1600);
        return false;
    }
    LoadingSpinner.show(LoadingSpinner.LOADING);
    Account.transaction('post', {
        name: $myName.val(),
        summary: $mySummary.val(),
        avatar: $myAvatar.val(),
        backgroundColor: $myBackground.val(),
        textColor: $myColor.val(),
        buttonColor: $myButtonColor.val()
    }).then(function (res) {
        LoadingSpinner.setStatus(LoadingSpinner.CHECKED);
        LoadingSpinner.miss(1600);
    }).catch(function (err) {
        LoadingSpinner.setStatus(LoadingSpinner.FAILED);
        LoadingSpinner.miss(1600);
    });
    return false;
});
