/**
 * Created by mac on 2018/5/17.
 */

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
